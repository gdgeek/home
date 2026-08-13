<template>
  <el-dialog :model-value="modelValue" :title="loginSuccess ? '' : t('login.title', { brand: brandName })" width="420px"
    :close-on-click-modal="!loginSuccess" :close-on-press-escape="!loginSuccess" :append-to-body="true" :destroy-on-close="true" center
    :show-close="!loginSuccess"
    class="login-modal" @update:model-value="(val) => emit('update:modelValue', val)" @closed="handleClosed">

    <!-- 登錄成功載入動畫 -->
    <div v-if="loginSuccess" class="login-success">
      <div class="login-success__spinner">
        <div class="login-success__ring"></div>
        <svg class="login-success__check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <p class="login-success__text">{{ t('login.success') }}</p>
      <p class="login-success__sub">{{ t('login.redirecting') }}</p>
    </div>

    <!-- 登錄表單 -->
    <template v-else>
      <!-- Logo -->
      <div class="login-logo">
        <img :src="theme.faviconPath" :alt="brandName" class="login-logo-icon" width="160" loading="eager" />
        <span class="login-logo-text">{{ brandName }}</span>
      </div>

      <!-- 錯誤提示 -->
      <Transition name="error-slide">
        <div v-if="errorMessage" class="login-error" role="alert">
          <svg class="login-error__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>{{ errorMessage }}</span>
        </div>
      </Transition>

      <el-form ref="formRef" :model="loginForm" :rules="rules" label-position="top" size="large">
        <el-form-item :label="t('login.username')" prop="username">
          <el-input v-model="loginForm.username" :placeholder="t('login.usernamePlaceholder')" :prefix-icon="User"
            clearable @focus="clearError" />
        </el-form-item>

        <el-form-item :label="t('login.password')" prop="password">
          <el-input v-model="loginForm.password" type="password" :placeholder="t('login.passwordPlaceholder')"
            :prefix-icon="Lock" show-password @keyup.enter="handleLogin" @focus="clearError" />
        </el-form-item>

        <div class="login-options">
          <el-checkbox v-model="loginForm.remember">{{ t('login.rememberMe') }}</el-checkbox>
          <a href="#" class="forgot-password">{{ t('login.forgotPassword') }}</a>
        </div>
      </el-form>
    </template>

    <template v-if="!loginSuccess" #footer>
      <div class="login-footer">
        <el-button type="primary" size="large" style="width: 100%" :loading="loading" @click="handleLogin">
          {{ t('login.submit') }}
        </el-button>
        <p class="login-hint">{{ t('login.hint') }}</p>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
/**
 * 登錄模態窗口組件
 * 
 * @description 提供用戶名/密碼登錄功能的模態窗口
 *              使用 vue-i18n 支持多語言
 */
import { ref, reactive, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { User, Lock } from '@element-plus/icons-vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useBrand } from '@/composables/useBrand'
import { login as authLogin, AuthError } from '@/services/authApi'
import { buildWorkbenchSsoUrl, resolveWorkbenchUrl } from '@/utils/workbenchRedirect'

/** 将 AuthErrorCode 映射到 i18n key */
const AUTH_ERROR_I18N: Record<string, string> = {
  NO_USER: 'error.noUser',
  WRONG_PASSWORD: 'error.wrongPassword',
  INVALID_PASSWORD: 'error.invalidPassword',
  ACCOUNT_DISABLED: 'error.accountDisabled',
  TOO_MANY_ATTEMPTS: 'error.tooManyAttempts',
  SERVER_UNAVAILABLE: 'error.serverUnavailable',
  LOGIN_FAILED: 'error.loginFailed',
  NETWORK_ERROR: 'error.serverUnavailable',
}

defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'login', data: { username: string; password: string }): void
}>()

const { t, locale } = useI18n()
const { brandName, theme } = useBrand()

const loading = ref(false)
const loginSuccess = ref(false)
const errorMessage = ref('')
const formRef = ref<FormInstance>()

const loginForm = reactive({
  username: '',
  password: '',
  remember: false
})

const rules = computed<FormRules>(() => ({
  username: [
    { required: true, message: t('validation.usernameRequired'), trigger: 'blur' }
  ],
  password: [
    { required: true, message: t('validation.passwordRequired'), trigger: 'blur' },
    { min: 6, message: t('validation.passwordMinLength'), trigger: 'blur' }
  ]
}))

const clearError = () => {
  errorMessage.value = ''
}

const handleClosed = () => {
  formRef.value?.resetFields()
  errorMessage.value = ''
  loginSuccess.value = false
}

const handleLogin = async () => {
  if (!formRef.value) return
  errorMessage.value = ''

  await formRef.value.validate(async (valid) => {
    if (valid) {
      loading.value = true
      try {
        const result = await authLogin(loginForm.username, loginForm.password)
        if (result.success) {
          // 顯示成功動畫
          loginSuccess.value = true

          emit('login', {
            username: loginForm.username,
            password: loginForm.password
          })

          // 登录成功后跳转到工作台 SSO
          const configuredWorkbenchUrl = window.__WORKBENCH_URL__ || import.meta.env.VITE_WORKBENCH_URL
          const workbenchUrl = resolveWorkbenchUrl(
            configuredWorkbenchUrl,
            window.location.hostname,
          )

          if (workbenchUrl) {
            const redirectUrl = buildWorkbenchSsoUrl(
              workbenchUrl,
              result.token.refreshToken,
              locale.value
            )
            // 延遲跳轉，讓用戶看到成功動畫
            setTimeout(() => {
              window.location.href = redirectUrl
            }, 1500)
          } else {
            console.warn('Workbench URL not configured, skipping SSO redirect')
            setTimeout(() => {
              loginSuccess.value = false
              emit('update:modelValue', false)
            }, 1500)
          }
        } else {
          errorMessage.value = result.message || t('login.failed')
        }
      } catch (err: unknown) {
        if (err instanceof AuthError) {
          const i18nKey = AUTH_ERROR_I18N[err.code] ?? 'error.loginFailed'
          errorMessage.value = t(i18nKey)
        } else {
          errorMessage.value = t('error.serverUnavailable')
        }
      } finally {
        loading.value = false
      }
    }
  })
}
</script>

<style lang="scss" scoped>
.login-modal {
  :deep(.el-dialog__header) {
    padding-bottom: 0;
  }
}

.login-logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 24px;

  &-icon {
    width: 160px;
    height: auto;
    object-fit: contain;
    margin-bottom: 12px;
  }

  &-text {
    font-size: 20px;
    font-weight: 600;
    color: var(--el-text-color-primary);
  }
}

.login-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.forgot-password {
  font-size: 14px;
  color: var(--el-color-primary);
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}

.login-footer {
  text-align: center;
}

.login-hint {
  margin-top: 16px;
  margin-bottom: 0;
  font-size: 14px;
  color: #909399;
}

@media (max-width: 768px) {
  :deep(.el-dialog) {
    width: 100% !important;
    height: 100vh !important;
    max-height: 100vh !important;
    border-radius: 0 !important;
    margin: 0 !important;
    display: flex;
    flex-direction: column;
  }

  :deep(.el-dialog__body) {
    flex: 1;
    overflow-y: auto;
  }
}

// 錯誤提示
.login-error {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  margin-bottom: 16px;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 8px;
  color: #dc2626;
  font-size: 14px;
  line-height: 1.5;

  &__icon {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
    stroke: #dc2626;
  }
}

.error-slide-enter-active {
  transition: all 0.3s ease-out;
}
.error-slide-leave-active {
  transition: all 0.2s ease-in;
}
.error-slide-enter-from {
  opacity: 0;
  transform: translateY(-8px);
}
.error-slide-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

// 登錄成功動畫
.login-success {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;

  &__spinner {
    position: relative;
    width: 72px;
    height: 72px;
    margin-bottom: 24px;
  }

  &__ring {
    position: absolute;
    inset: 0;
    border: 3px solid #e5e7eb;
    border-top-color: var(--el-color-primary, #409eff);
    border-radius: 50%;
    animation: login-spin 1s linear infinite;
  }

  &__check {
    position: absolute;
    inset: 16px;
    width: 40px;
    height: 40px;
    stroke: var(--el-color-success, #67c23a);
    opacity: 0;
    animation: login-check-in 0.4s ease-out 0.6s forwards;
  }

  &__text {
    font-size: 18px;
    font-weight: 600;
    color: var(--el-text-color-primary);
    margin: 0 0 8px;
  }

  &__sub {
    font-size: 14px;
    color: #909399;
    margin: 0;
  }
}

@keyframes login-spin {
  to { transform: rotate(360deg); }
}

@keyframes login-check-in {
  from {
    opacity: 0;
    transform: scale(0.5);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
