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

// ============================================
// API URL 配置
// ============================================

/**
 * 获取主API地址（运行时注入）
 */
const getApiUrl = (): string => {
  return (window as any).__API_URL__ || "https://api.xrteeth.com";
};

/**
 * 获取备用API地址（运行时注入）
 */
const getBackupApiUrl = (): string => {
  return (window as any).__BACKUP_API_URL__ || "https://api.tmrpp.com";
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

/**
 * 登录
 * 如果缓存的API请求失败，会清除缓存重新检查并重试一次
 */
export const login = async (
  username: string,
  password: string,
): Promise<LoginResponse> => {
  const apiUrl = await getAvailableApiUrl();
  if (!apiUrl) {
    throw new Error("服务器不可用，请稍后重试");
  }

  try {
    return await doLogin(apiUrl, username, password);
  } catch (err: any) {
    // 如果是网络错误（非业务错误），清除缓存重试
    if (!err.response) {
      console.warn("authApi: 请求失败，重新检查API可用性...");
      cachedApiUrl = null;
      const newApiUrl = await discoverApiUrl();
      if (newApiUrl && newApiUrl !== apiUrl) {
        return await doLogin(newApiUrl, username, password);
      }
    }
    const message =
      err.response?.data?.message || err.message || "登录失败，请重试";
    console.error("authApi: 登录失败:", message);
    throw new Error(message);
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
    localStorage.setItem("accessToken", data.token.accessToken);
    localStorage.setItem("refreshToken", data.token.refreshToken);
    localStorage.setItem("tokenExpires", data.token.expires);
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
