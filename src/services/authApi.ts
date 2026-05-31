/**
 * 认证API服务
 * 支持主备API自动切换：先检查主API健康状态，不可用时自动切换到备用API
 */

import axios from "axios";

// ============================================
// 类型定义
// ============================================

interface LoginResponse {
  success: boolean;
  message: string;
  token: {
    accessToken: string;
    expires: string;
    refreshToken: string;
  };
}

interface HealthResponse {
  status: string;
}

/**
 * 认证错误码，由调用方负责本地化处理
 */
export type AuthErrorCode =
  | "NO_USER"
  | "WRONG_PASSWORD"
  | "INVALID_PASSWORD"
  | "ACCOUNT_DISABLED"
  | "TOO_MANY_ATTEMPTS"
  | "SERVER_UNAVAILABLE"
  | "LOGIN_FAILED"
  | "NETWORK_ERROR";

/**
 * 认证错误，携带错误码供调用方本地化
 */
export class AuthError extends Error {
  constructor(
    public readonly code: AuthErrorCode,
    /** 原始 API 返回的英文消息（用于调试） */
    public readonly rawMessage?: string,
  ) {
    super(code);
    this.name = "AuthError";
  }
}

// ============================================
// API URL 配置
// ============================================

/**
 * 获取主API地址（运行时注入）
 */
const getApiUrl = (): string => {
  return window.__API_URL__ || "https://api.xrteeth.com";
};

/**
 * 获取备用API地址（运行时注入）
 */
const getBackupApiUrl = (): string => {
  return window.__BACKUP_API_URL__ || "https://api.tmrpp.com";
};

// ============================================
// 健康检查（带缓存）
// ============================================

/** 缓存的可用API地址，避免每次都做健康检查 */
let cachedApiUrl: string | null = null;

/**
 * 检查API是否可用
 */
const checkHealth = async (baseUrl: string): Promise<boolean> => {
  try {
    const response = await axios.get<HealthResponse>(`${baseUrl}/health`, {
      timeout: 5000,
    });
    return response.data?.status === "healthy";
  } catch (err) {
    console.warn(`API健康检查失败: ${baseUrl}`, err);
    return false;
  }
};

/**
 * 通过健康检查选择可用的API
 * 优先主API，不可用时切换到备用
 */
const discoverApiUrl = async (): Promise<string | null> => {
  const primaryUrl = getApiUrl();
  const backupUrl = getBackupApiUrl();

  console.log("authApi: 检查主API...", primaryUrl);
  if (await checkHealth(primaryUrl)) {
    console.log("authApi: 主API可用");
    cachedApiUrl = primaryUrl;
    return primaryUrl;
  }

  console.log("authApi: 主API不可用，检查备用API...", backupUrl);
  if (await checkHealth(backupUrl)) {
    console.log("authApi: 备用API可用");
    cachedApiUrl = backupUrl;
    return backupUrl;
  }

  console.error("authApi: 主备API均不可用");
  cachedApiUrl = null;
  return null;
};

/**
 * 获取可用的API地址（优先返回缓存）
 * 已缓存则直接返回，未缓存或已失效则重新检查
 */
const getAvailableApiUrl = async (): Promise<string | null> => {
  if (cachedApiUrl) return cachedApiUrl;
  return discoverApiUrl();
};

// ============================================
// 登录
// ============================================

/** API错误信息 -> 错误码 映射（调用方负责本地化） */
const ERROR_CODE_MAP: Record<string, AuthErrorCode> = {
  "no user": "NO_USER",
  "user not found": "NO_USER",
  "wrong password": "WRONG_PASSWORD",
  "password error": "WRONG_PASSWORD",
  "invalid password": "INVALID_PASSWORD",
  "account disabled": "ACCOUNT_DISABLED",
  "too many attempts": "TOO_MANY_ATTEMPTS",
};

/**
 * 将API错误信息映射为结构化错误码
 */
const resolveErrorCode = (msg: string): AuthErrorCode => {
  return ERROR_CODE_MAP[msg.toLowerCase()] ?? "LOGIN_FAILED";
};

/**
 * 登录
 * 如果缓存的API请求失败，会清除缓存重新检查并重试一次
 * @throws {AuthError} 携带错误码，调用方应使用 t(`error.${err.code.toLowerCase()}`) 本地化
 */
export const login = async (
  username: string,
  password: string,
): Promise<LoginResponse> => {
  const apiUrl = await getAvailableApiUrl();
  if (!apiUrl) {
    throw new AuthError("SERVER_UNAVAILABLE");
  }

  try {
    return await doLogin(apiUrl, username, password);
  } catch (err: unknown) {
    // 如果是网络错误（非业务错误），清除缓存重试
    if (err && typeof err === 'object' && !('response' in err)) {
      console.warn("authApi: 请求失败，重新检查API可用性...");
      cachedApiUrl = null;
      const newApiUrl = await discoverApiUrl();
      if (newApiUrl && newApiUrl !== apiUrl) {
        return await doLogin(newApiUrl, username, password);
      }
      const message = 'message' in err && typeof err.message === 'string' ? err.message : 'Network error';
      throw new AuthError("NETWORK_ERROR", message);
    }

    // 如果已经是 AuthError（来自 doLogin 重试），直接重新抛出
    if (err instanceof AuthError) throw err;

    // 处理 axios 错误
    const axiosError = err as { response?: { data?: { message?: string } }; message?: string };
    const rawMessage: string =
      axiosError.response?.data?.message || axiosError.message || "Unknown error";
    const code = resolveErrorCode(rawMessage);
    console.error("authApi: 登录失败:", rawMessage);
    throw new AuthError(code, rawMessage);
  }
};

/**
 * 执行登录请求
 */
const doLogin = async (
  apiUrl: string,
  username: string,
  password: string,
): Promise<LoginResponse> => {
  const url = `${apiUrl}/v1/auth/login`;
  console.log("authApi: 发送登录请求...", url);

  const response = await axios.post<LoginResponse>(url, {
    username,
    password,
  });

  const data = response.data;
  if (data.success && data.token) {
    console.log("authApi: 登录成功");
  }

  return data;
};

/**
 * 登出
 */
export const logout = (): void => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("tokenExpires");
};

/**
 * 获取当前token
 */
export const getAccessToken = (): string | null => {
  return localStorage.getItem("accessToken");
};

/**
 * 是否已登录
 */
export const isLoggedIn = (): boolean => {
  const token = getAccessToken();
  const expires = localStorage.getItem("tokenExpires");
  if (!token || !expires) return false;
  return new Date(expires) > new Date();
};

export default { login, logout, getAccessToken, isLoggedIn };
