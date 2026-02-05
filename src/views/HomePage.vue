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
      :login-url="loginUrl"
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
    <CTASection :login-url="loginUrl" />

    <!-- Footer Section - Requirements 7.1-7.3 -->
    <FooterSection
      :navigation="footerNavigation"
      :copyright="copyright"
      :contact-info="contactInfo"
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
 * @description 多品牌架构首页主视图，根据品牌配置渲染对应内容
 * @requirements 1.1-7.3, 4.1, 4.4, 6.1, 6.2
 */
import { computed, ref } from 'vue'

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
import { useBrand } from '@/composables/useBrand'

// ============================================
// Brand Configuration
// ============================================

/**
 * 品牌配置
 * @requirements 4.1, 4.4
 */
const { hero, footer, loginUrl } = useBrand()

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

// ============================================
// Page Configuration Data (from Brand Config)
// ============================================

/**
 * Hero区配置 - 从品牌配置获取
 * _Requirements: 1.1, 1.2, 1.3, 1.6, 4.1_
 */
const heroConfig = computed(() => ({
  title: hero.value.title,
  subtitle: hero.value.subtitle,
  primaryButton: hero.value.primaryButtonText,
  secondaryButton: hero.value.secondaryButtonText,
  highlights: [...hero.value.highlights]
}))

/**
 * 底部导航配置 - 从品牌配置获取
 * _Requirements: 7.1, 6.2_
 */
const footerNavigation = computed(() => 
  footer.value.navigation.map(group => ({
    title: group.title,
    links: group.links.map(link => ({ text: link.text, url: link.url }))
  }))
)

/**
 * 版权信息 - 从品牌配置获取
 */
const copyright = computed(() => footer.value.copyright)

/**
 * 联系信息 - 从品牌配置获取
 */
const contactInfo = computed(() => footer.value.contactInfo)

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
