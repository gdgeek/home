<template>
  <el-dialog
    :model-value="modelValue"
    :title="dialogTitle"
    width="420px"
    :close-on-click-modal="true"
    :close-on-press-escape="true"
    :append-to-body="true"
    :destroy-on-close="true"
    center
    class="login-modal"
    @update:model-value="(val) => emit('update:modelValue', val)"
    @closed="handleClosed"
  >
    <!-- Logo -->
    <div class="login-logo">
      <svg class="login-logo-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <span class="login-logo-text">{{ brandName }}</span>
    </div>

    <el-form
      ref="formRef"
      :model="loginForm"
      :rules="rules"
      label-position="top"
      size="large"
    >
      <el-form-item :label="isSimplified ? '用户名' : '用戶名'" prop="username">
        <el-input
          v-model="loginForm.username"
          :placeholder="isSimplified ? '请输入用户名 / 手机号 / 邮箱' : '請輸入用戶名 / 手機號 / 郵箱'"
          :prefix-icon="User"
          clearable
        />
      </el-form-item>
      
      <el-form-item :label="isSimplified ? '密码' : '密碼'" prop="password">
        <el-input
          v-model="loginForm.password"
          type="password"
          :placeholder="isSimplified ? '请输入密码' : '請輸入密碼'"
          :prefix-icon="Lock"
          show-password
          @keyup.enter="handleLogin"
        />
      </el-form-item>
      
      <div class="login-options">
        <el-checkbox v-model="loginForm.remember">{{ isSimplified ? '记住我' : '記住我' }}</el-checkbox>
        <a href="#" class="forgot-password">{{ isSimplified ? '忘记密码？' : '忘記密碼？' }}</a>
      </div>
    </el-form>
    
    <template #footer>
      <div class="login-footer">
        <el-button
          type="primary"
          size="large"
          style="width: 100%"
          :loading="loading"
          @click="handleLogin"
        >
          {{ isSimplified ? '登录' : '登錄' }}
        </el-button>
        <p class="login-hint">{{ isSimplified ? '支持学校统一身份认证' : '支持學校統一身份認證' }}</p>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
/**
 * 登錄模態窗口組件
 * 
 * @description 提供用戶名/密碼登錄功能的模態窗口
 *              支持記住我、忘記密碼等功能
 *              使用繁體中文，適配澳門用戶
 */
import { ref, reactive, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useBrand } from '@/composables/useBrand'

defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'login', data: { username: string; password: string }): void
}>()

// 品牌配置
const { brandName, loginUrl } = useBrand()

// 判断是否简体中文（星扣品牌）
const isSimplified = computed(() => brandName.value?.includes('星扣'))

// 对话框标题
const dialogTitle = computed(() => isSimplified.value ? `登录${brandName.value}` : `登錄${brandName.value}`)

const loading = ref(false)
const formRef = ref<FormInstance>()

const loginForm = reactive({
  username: '',
  password: '',
  remember: false
})

const rules = computed<FormRules>(() => ({
  username: [
    { required: true, message: isSimplified.value ? '请输入用户名' : '請輸入用戶名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: isSimplified.value ? '请输入密码' : '請輸入密碼', trigger: 'blur' },
    { min: 6, message: isSimplified.value ? '密码至少6位' : '密碼至少6位', trigger: 'blur' }
  ]
}))

const handleClosed = () => {
  formRef.value?.resetFields()
}

const handleLogin = async () => {
  if (!formRef.value) return
  
  // 如果配置了登錄URL，直接跳轉
  if (loginUrl.value) {
    window.location.href = loginUrl.value
    return
  }
  
  // 否則使用表單登錄
  await formRef.value.validate((valid) => {
    if (valid) {
      loading.value = true
      setTimeout(() => {
        loading.value = false
        ElMessage.success(isSimplified.value ? '登录成功！' : '登錄成功！')
        emit('login', {
          username: loginForm.username,
          password: loginForm.password
        })
        emit('update:modelValue', false)
      }, 1000)
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
    width: 48px;
    height: 48px;
    color: var(--el-color-primary);
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
