<template>
  <el-dialog
    :model-value="modelValue"
    title="登录星扣AR创作平台"
    width="420px"
    :close-on-click-modal="false"
    :append-to-body="true"
    :destroy-on-close="true"
    center
    @update:model-value="(val) => emit('update:modelValue', val)"
    @closed="handleClosed"
  >
    <el-form
      ref="formRef"
      :model="loginForm"
      :rules="rules"
      label-position="top"
      size="large"
    >
      <el-form-item label="用户名" prop="username">
        <el-input
          v-model="loginForm.username"
          placeholder="请输入用户名"
          :prefix-icon="User"
        />
      </el-form-item>
      
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="loginForm.password"
          type="password"
          placeholder="请输入密码"
          :prefix-icon="Lock"
          show-password
        />
      </el-form-item>
      
      <el-form-item>
        <el-checkbox v-model="loginForm.remember">记住我</el-checkbox>
      </el-form-item>
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
          登录
        </el-button>
        <p class="login-hint">支持学校统一身份认证</p>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'
import type { FormInstance, FormRules } from 'element-plus'

defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'login', data: { username: string; password: string }): void
}>()

const loading = ref(false)
const formRef = ref<FormInstance>()

const loginForm = reactive({
  username: '',
  password: '',
  remember: false
})

const rules: FormRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码至少6位', trigger: 'blur' }
  ]
}

const handleClosed = () => {
  formRef.value?.resetFields()
}

const handleLogin = async () => {
  if (!formRef.value) return
  
  await formRef.value.validate((valid) => {
    if (valid) {
      loading.value = true
      setTimeout(() => {
        loading.value = false
        ElMessage.success('登录成功！')
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
