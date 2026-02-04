<template>
  <div class="home-page">
    <!-- Header Navigation with Login -->
    <HeaderNav @open-login="showLoginModal = true" />
    
    <!-- Login Modal -->
    <LoginModal v-model="showLoginModal" @login="handleLogin" />
    
    <!-- Hero Section - Requirements 1.1-1.6 -->
    <HeroSection
      :title="heroConfig.title"
      :subtitle="heroConfig.subtitle"
      :primary-button-text="heroConfig.primaryButton"
      :secondary-button-text="heroConfig.secondaryButton"
      :highlights="heroConfig.highlights"
      :login-url="baseInfo?.loginUrl ?? ''"
      @scroll-to-case="scrollToCase"
      @open-login="showLoginModal = true"
    />

    <!-- Value Section - Requirements 2.1-2.3 -->
    <ValueSection />

    <!-- Feature Section - Requirements 3.1-3.3 -->
    <FeatureSection />

    <!-- Scene Section - Requirements 4.1-4.3 -->
    <SceneSection />

    <!-- Case Section - Requirements 5.1-5.3 -->
    <CaseSection />

    <!-- CTA Section - Requirements 6.1-6.4 -->
    <CTASection :login-url="baseInfo?.loginUrl ?? ''" />

    <!-- Footer Section - Requirements 7.1-7.3 -->
    <FooterSection
      :navigation="footerNavigation"
      :copyright="baseInfo?.copyright ?? ''"
      :contact-info="baseInfo?.contactInfo ?? {}"
      :news="news ?? []"
      :news-loading="newsLoading ?? false"
      :news-error="newsError ?? null"
      @retry-news="handleRetryNews"
    />
  </div>
</template>

<script setup lang="ts">
/**
 * HomePage视图组件
 * 组合所有Section组件，集成composables获取数据
 * 
 * @description 星扣AR创作平台·教育版首页主视图
 * @requirements 1.1-7.3
 */
import { reactive, ref } from 'vue'

// Section Components
import HeaderNav from '@/components/sections/HeaderNav.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import ValueSection from '@/components/sections/ValueSection.vue'
import FeatureSection from '@/components/sections/FeatureSection.vue'
import SceneSection from '@/components/sections/SceneSection.vue'
import CaseSection from '@/components/sections/CaseSection.vue'
import CTASection from '@/components/sections/CTASection.vue'
import FooterSection from '@/components/sections/FooterSection.vue'
import LoginModal from '@/components/common/LoginModal.vue'

// Composables
import { useNews } from '@/composables/useNews'
import { useBaseInfo } from '@/composables/useBaseInfo'

// Types
import type { FooterNavGroup } from '@/types'

// ============================================
// Login Modal State
// ============================================
const showLoginModal = ref(false)

/**
 * 处理登录事件
 */
const handleLogin = (data: { username: string; password: string }) => {
  console.log('Login:', data)
  // TODO: 实际登录逻辑
}

// ============================================
// Composables Integration
// ============================================

/**
 * 新闻数据获取
 * _Requirements: 8.1, 8.2, 8.3, 8.4_
 */
const { news, loading: newsLoading, error: newsError, retry: retryNews } = useNews()

/**
 * 基础信息获取
 * _Requirements: 9.1, 9.2, 9.3_
 */
const { baseInfo } = useBaseInfo()

// ============================================
// Page Configuration Data
// ============================================

/**
 * Hero区配置
 * _Requirements: 1.1, 1.2, 1.3, 1.6_
 */
const heroConfig = reactive({
  title: '星扣AR创作平台 — 让知识"立"起来，让创意"活"起来',
  subtitle: '专为教育场景打造的AR内容创作平台，让教师轻松制作沉浸式教学内容，让学生在互动中探索知识的无限可能。',
  primaryButton: '立即开始创作',
  secondaryButton: '查看教学案例',
  highlights: [
    '课本变立体',
    '实验零风险',
    '创意可落地',
    '知识可互动'
  ]
})

/**
 * 底部导航配置
 * _Requirements: 7.1_
 */
const footerNavigation = reactive<FooterNavGroup[]>([
  {
    title: '平台服务',
    links: [
      { text: 'AR创作工具', url: '#' },
      { text: '素材资源库', url: '#' },
      { text: '作品管理', url: '#' },
      { text: '帮助中心', url: '#' }
    ]
  },
  {
    title: '关于我们',
    links: [
      { text: '公司介绍', url: '#' },
      { text: '联系我们', url: '#' },
      { text: '加入我们', url: '#' },
      { text: '合作伙伴', url: '#' }
    ]
  }
])

// ============================================
// Event Handlers
// ============================================

/**
 * 滚动到案例板块
 * _Requirement: 1.5_ - 点击"查看教学案例"按钮滚动到用户案例板块
 */
const scrollToCase = (): void => {
  const caseSection = document.getElementById('case-section')
  if (caseSection) {
    caseSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }
}

/**
 * 处理新闻重试事件
 * _Requirement: 8.3_ - 新闻加载失败时提供重试功能
 */
const handleRetryNews = (): void => {
  retryNews()
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.home-page {
  min-height: 100vh;
  background-color: $color-bg-page;
}
</style>
