<template>
  <el-dialog :model-value="modelValue" :title="t('login.title', { brand: brandName })" width="420px"
    :close-on-click-modal="true" :close-on-press-escape="true" :append-to-body="true" :destroy-on-close="true" center
    class="login-modal" @update:model-value="(val) => emit('update:modelValue', val)" @closed="handleClosed">
    <!-- Logo -->
    <div class="login-logo">
      <img :src="theme.faviconPath" :alt="brandName" class="login-logo-icon" />
      <span class="login-logo-text">{{ brandName }}</span>
    </div>

    <el-form ref="formRef" :model="loginForm" :rules="rules" label-position="top" size="large">
      <el-form-item :label="t('login.username')" prop="username">
        <el-input v-model="loginForm.username" :placeholder="t('login.usernamePlaceholder')" :prefix-icon="User"
          clearable />
      </el-form-item>

      <el-form-item :label="t('login.password')" prop="password">
        <el-input v-model="loginForm.password" type="password" :placeholder="t('login.passwordPlaceholder')"
          :prefix-icon="Lock" show-password @keyup.enter="handleLogin" />
      </el-form-item>

      <div class="login-options">
        <el-checkbox v-model="loginForm.remember">{{ t('login.rememberMe') }}</el-checkbox>
        <a href="#" class="forgot-password">{{ t('login.forgotPassword') }}</a>
      </div>
    </el-form>

    <template #footer>
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
import { ElMessage } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useBrand } from '@/composables/useBrand'
import { login as authLogin } from '@/services/authApi'

defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'login', data: { username: string; password: string }): void
}>()

const { t } = useI18n()
const { brandName, theme } = useBrand()

const loading = ref(false)
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

const handleClosed = () => {
  formRef.value?.resetFields()
}

const handleLogin = async () => {
  if (!formRef.value) return

  await formRef.value.validate(async (valid) => {
    if (valid) {
      loading.value = true
      try {
        const result = await authLogin(loginForm.username, loginForm.password)
        if (result.success) {
          ElMessage.success(t('login.success'))
          emit('login', {
            username: loginForm.username,
            password: loginForm.password
          })
          emit('update:modelValue', false)

          // 登录成功后跳转到工作台 SSO
          const workbenchUrl = (window as any).__WORKBENCH_URL__ || import.meta.env.VITE_WORKBENCH_URL
          if (workbenchUrl) {
            // 移除末尾的斜杠（如果存在），避免生成 //sso
            const baseUrl = workbenchUrl.replace(/\/$/, '')
            const redirectUrl = `${baseUrl}/sso?refreshToken=${result.token.refreshToken}`
            console.log('Redirecting to Workbench SSO:', redirectUrl)
            // 使用 window.location.href 进行跳转
            window.location.href = redirectUrl
          }
        } else {
          ElMessage.error(result.message || t('login.failed'))
        }
      } catch (err: any) {
        ElMessage.error(err.message || t('error.serverUnavailable'))
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
    width: 64px;
    height: 64px;
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
</style>
