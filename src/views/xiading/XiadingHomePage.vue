<script setup lang="ts">
/**
 * 夏鼎品牌首頁 - 教育AR創作平台（澳門版）
 * 專業藍色主題，繁體中文
 */
import { ref, onMounted, onUnmounted } from 'vue'
import { useBrand } from '@/composables/useBrand'
import { useNews } from '@/composables/useNews'
import { School, User, OfficeBuilding, FolderOpened, EditPen, Share, Monitor, VideoCamera, View } from '@element-plus/icons-vue'
import LoginModal from '@/components/common/LoginModal.vue'

const { footer } = useBrand()
const version = (window as any).__APP_VERSION__ || '1.0.0'
const buildTime = (window as any).__BUILD_TIME__ || new Date().toISOString().split('T')[0]

const showLoginModal = ref(false)
const showNewsModal = ref(false)
const selectedNews = ref<any>(null)
const animatedSections = ref<Set<HTMLElement>>(new Set())

// 使用 WordPress API 获取新闻
const { news, loading, error } = useNews()

const handleOpenLogin = () => {
  showLoginModal.value = true
}

const handleOpenNewsDetail = (item: any) => {
  selectedNews.value = item
  showNewsModal.value = true
}

const handleViewMoreNews = () => {
  window.open('http://localhost:8080/', '_blank')
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const isInViewport = (element: HTMLElement) => {
  const rect = element.getBoundingClientRect()
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85
  )
}

const handleScroll = () => {
  const elements = document.querySelectorAll('.animate-on-scroll')
  elements.forEach((el) => {
    const element = el as HTMLElement
    if (!animatedSections.value.has(element) && isInViewport(element)) {
      element.classList.add('animated')
      animatedSections.value.add(element)
    }
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

// 導航菜單
const navItems = [
  { text: '首頁', url: '#' },
  { text: '功能介紹', url: '#feature' },
  { text: '應用場景', url: '#scene' },
  { text: '客戶案例', url: '#case' },
  { text: '新聞動態', url: '#news' }
]

// 核心價值
const valueItems = [
  { icon: School, title: '教師專屬', description: '快速製作AR課件、互動實驗及教學模型，提升課堂吸引力與教學效率' },
  { icon: User, title: '學生友好', description: '通過AR創作表達學習成果，培養空間思維、創新能力與表達能力' },
  { icon: OfficeBuilding, title: '校園適配', description: '低成本搭建AR教學環境，開展STEAM教育、科創活動' }
]

// 核心功能
const featureItems = [
  { icon: FolderOpened, title: '教育專屬素材庫', description: '全學科課本同步模型，涵蓋生物、物理、化學、歷史、美術等學科', image: '/images/ar-platform/UGC场景编辑器界面.png' },
  { icon: EditPen, title: '零門檻編輯器', description: '所見即所得的操作邏輯，支持多元素組合創作', image: '/images/ar-platform/拖拽程序生成工具.png' },
  { icon: View, title: '三方視角投屏', description: '教師可通過平板查看學生AR視角，輔助課堂教學指導', image: '/images/ar-platform/三方视角，用户操作AR医疗头骨内容.png' },
  { icon: Monitor, title: '多終端支持', description: 'iPad、Rokid AR眼鏡全面適配', image: '/images/ar-platform/女士操作Rokid AR Studio.png' }
]

// 應用場景
const sceneItems = [
  { icon: Share, title: '醫療護理', description: '嬰幼兒護理、外傷處理等醫療科普', tag: '醫療', image: '/images/ar-platform/婴幼儿护理 外伤处理.png' },
  { icon: VideoCamera, title: '口腔教學', description: '窩溝封閉等口腔醫療操作培訓', tag: '口腔', image: '/images/ar-platform/AR医疗 窝沟封闭.png' },
  { icon: OfficeBuilding, title: '工業展示', description: '掘進機等大型設備1:1還原展示', tag: '工業', image: '/images/ar-platform/AR掘进机展示.png' },
  { icon: School, title: '互動遊戲', description: '多人AR遊戲，寓教於樂', tag: '遊戲', image: '/images/ar-platform/多人AR游戏，三方视角.png' }
]

// 用戶案例
const caseItems = [
  { company: '澳門培正中學', quote: '夏鼎AR創作平台讓我們的生物課堂煥然一新，學生學習興趣大幅提升。', author: '陳老師', role: '生物科教學組長' },
  { company: '澳門大學附屬應用學校', quote: '學生使用iPad和Rokid AR眼鏡進行創作，培養了創新思維和動手能力。', author: '李主任', role: 'STEAM教育負責人' },
  { company: '澳門聖若瑟教區中學', quote: '零門檻的操作讓每位老師都能輕鬆製作AR課件，大大提升了備課效率。', author: '黃校長', role: '教務主任' }
]

// 頁腳導航
const footerNavigation = [
  { title: '平台服務', links: [{ text: '創作指南', url: '#' }, { text: '幫助中心', url: '#' }, { text: '素材庫', url: '#' }] },
  { title: '關於我們', links: [{ text: '公司介紹', url: '#' }, { text: '聯繫我們', url: '#' }, { text: '合作夥伴', url: '#' }] }
]
</script>

<template>
  <div class="xiading-page">
    <!-- Header -->
    <header class="header">
      <div class="header__container">
        <div class="header__logo">
          <span class="header__logo-text">夏鼎</span>
          <span class="header__logo-sub">AR創作平台</span>
        </div>
        <nav class="header__nav">
          <a v-for="(item, index) in navItems" :key="index" :href="item.url" class="header__nav-link">
            {{ item.text }}
          </a>
        </nav>
        <button class="header__login-btn" @click="handleOpenLogin">登錄</button>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="hero">
      <div class="hero__container">
        <div class="hero__content">
          <h1 class="hero__title">夏鼎AR創作平台</h1>
          <p class="hero__subtitle">讓知識「立」起來</p>
          <p class="hero__desc">專為澳門教育場景打造的輕量化、零門檻AR創作工具，助力師生開啟沉浸式教學新體驗</p>
          <div class="hero__highlights">
            <span class="hero__tag">課本變立體</span>
            <span class="hero__tag">實驗零風險</span>
            <span class="hero__tag">創意可落地</span>
            <span class="hero__tag">知識可互動</span>
          </div>
          <div class="hero__actions">
            <button class="btn btn--primary" @click="handleOpenLogin">立即開始創作</button>
            <button class="btn btn--secondary">查看教學案例</button>
          </div>
        </div>
        <div class="hero__visual">
          <img src="/images/ar-platform/高中生操作AR内容，欢笑.png" alt="AR教育設備" class="hero__image" />
        </div>
      </div>
    </section>

    <!-- News Section - 仅在有数据时显示，API错误时隐藏 -->
    <section v-if="!error && !loading && news && news.length > 0" id="news" class="news animate-on-scroll">
      <div class="section-container">
        <h2 class="section-title">新聞動態</h2>
        <p class="section-subtitle">了解平台最新資訊與行業動態</p>
        
        <!-- News List -->
        <div class="news__grid">
          <div v-for="(item, index) in news" :key="item.id" class="news-card animate-delay" :style="{ animationDelay: `${index * 0.15}s` }" @click="handleOpenNewsDetail(item)">
            <span class="news-card__category">{{ item.category.name }}</span>
            <h3 class="news-card__title">{{ item.title }}</h3>
            <p v-if="item.excerpt" class="news-card__excerpt">{{ item.excerpt }}</p>
            <span class="news-card__date">{{ formatDate(item.date) }}</span>
          </div>
        </div>
        
        <div class="news__more">
          <a href="#" class="news__more-link" @click.prevent="handleViewMoreNews">查看更多新聞 →</a>
        </div>
      </div>
    </section>

    <!-- Value Section -->
    <section id="value" class="value animate-on-scroll">
      <div class="section-container">
        <h2 class="section-title">以AR之力，重構教育表達</h2>
        <p class="section-subtitle">我們為教育場景，重新定義AR創作</p>
        <div class="value__grid">
          <div v-for="(item, index) in valueItems" :key="index" class="value-card animate-delay" :style="{ animationDelay: `${index * 0.15}s` }">
            <div class="value-card__icon">
              <component :is="item.icon" :size="32" />
            </div>
            <h3 class="value-card__title">{{ item.title }}</h3>
            <p class="value-card__desc">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Feature Section -->
    <section id="feature" class="feature animate-on-scroll">
      <div class="section-container">
        <h2 class="section-title">簡單操作，解鎖教育AR無限可能</h2>
        <p class="section-subtitle">零門檻操作，讓每位師生都能輕鬆創作</p>
        <div class="feature__grid">
          <div v-for="(item, index) in featureItems" :key="index" class="feature-card animate-delay" :style="{ animationDelay: `${index * 0.2}s` }">
            <div class="feature-card__image">
              <img :src="item.image" :alt="item.title" />
            </div>
            <div class="feature-card__content">
              <div class="feature-card__icon">
                <component :is="item.icon" :size="24" />
              </div>
              <h3 class="feature-card__title">{{ item.title }}</h3>
              <p class="feature-card__desc">{{ item.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Scene Section -->
    <section id="scene" class="scene animate-on-scroll">
      <div class="section-container">
        <h2 class="section-title">AR賦能全學科，適配多元教學場景</h2>
        <p class="section-subtitle">從醫療到工業，從教育到娛樂，AR讓每個場景都生動起來</p>
        <div class="scene__grid">
          <div v-for="(item, index) in sceneItems" :key="index" class="scene-card animate-delay" :style="{ animationDelay: `${index * 0.12}s` }">
            <div class="scene-card__image">
              <img :src="item.image" :alt="item.title" />
              <span class="scene-card__tag">{{ item.tag }}</span>
            </div>
            <div class="scene-card__content">
              <div class="scene-card__icon">
                <component :is="item.icon" :size="32" />
              </div>
              <h3 class="scene-card__title">{{ item.title }}</h3>
              <p class="scene-card__desc">{{ item.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Case Section -->
    <section id="case" class="case animate-on-scroll">
      <div class="section-container">
        <h2 class="section-title">已有眾多澳門校園，用夏鼎解鎖AR教學新體驗</h2>
        <p class="section-subtitle">聽聽他們怎麼說</p>
        <div class="case__grid">
          <div v-for="(item, index) in caseItems" :key="index" class="case-card animate-delay" :style="{ animationDelay: `${index * 0.18}s` }">
            <p class="case-card__quote">"{{ item.quote }}"</p>
            <div class="case-card__author">
              <span class="case-card__name">{{ item.author }}</span>
              <span class="case-card__role">{{ item.role }}</span>
              <span class="case-card__company">{{ item.company }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta animate-on-scroll">
      <div class="section-container">
        <h2 class="cta__title">即刻上手，開啟AR教育創作之旅</h2>
        <p class="cta__subtitle">教師、學生、校園用戶通用，登錄後匹配對應功能與素材權益</p>
        <div class="cta__tags">
          <span class="cta__tag">無廣告</span>
          <span class="cta__tag">免費試用</span>
          <span class="cta__tag">專屬客服指導</span>
        </div>
        <button class="btn btn--primary btn--large" @click="handleOpenLogin">立即登錄</button>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="section-container">
        <div class="footer__grid">
          <div class="footer__brand">
            <h3 class="footer__logo">夏鼎AR創作平台</h3>
            <p class="footer__desc">專為澳門教育場景打造的AR創作工具</p>
            <div class="footer__contact">
              <p>電話：+853 2888 8888</p>
              <p>郵箱：contact@xiading.mo</p>
            </div>
          </div>
          <div v-for="(nav, index) in footerNavigation" :key="index" class="footer__nav">
            <h4 class="footer__nav-title">{{ nav.title }}</h4>
            <ul class="footer__nav-list">
              <li v-for="(link, linkIndex) in nav.links" :key="linkIndex">
                <a :href="link.url">{{ link.text }}</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="footer__bottom">
          <p>{{ footer.copyright || '© 2025 夏鼎科技（澳門）. 版權所有.' }}</p>
          <p style="font-size: 12px; opacity: 0.6; margin-top: 8px;">v{{ version }} ({{ buildTime }})</p>
        </div>
      </div>
    </footer>

    <!-- News Detail Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="showNewsModal" class="news-modal-overlay" @click.self="showNewsModal = false">
          <div class="news-modal-container">
            <button class="news-modal-close" @click="showNewsModal = false">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </button>
            <div v-if="selectedNews" class="news-modal-content">
              <div class="news-detail__header">
                <span class="news-detail__category">{{ selectedNews.category?.name || '新聞' }}</span>
                <span class="news-detail__date">{{ formatDate(selectedNews.date) }}</span>
              </div>
              <h2 class="news-detail__title">{{ selectedNews.title }}</h2>
              <div v-if="selectedNews.excerpt" class="news-detail__excerpt">{{ selectedNews.excerpt }}</div>
              <div v-if="selectedNews.content" class="news-detail__content" v-html="selectedNews.content"></div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Login Modal -->
    <LoginModal v-model="showLoginModal" />
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/xiading/variables' as *;
@use '@/assets/styles/xiading/animations';

.xiading-page {
  font-family: $xiading-font-family;
  color: $xiading-text-primary;
  background: $xiading-bg-primary;
  overflow-x: hidden;
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  ::selection {
    background: rgba($xiading-primary, 0.2);
    color: $xiading-text-primary;
  }
  
  ::-webkit-scrollbar {
    width: 10px;
  }
  
  ::-webkit-scrollbar-track {
    background: $xiading-bg-secondary;
  }
  
  ::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, $xiading-primary, $xiading-primary-light);
    border-radius: 5px;
    
    &:hover {
      background: linear-gradient(180deg, $xiading-primary-dark, $xiading-primary);
    }
  }
}

.section-container {
  max-width: $xiading-container-max-width;
  margin: 0 auto;
  padding: 0 $xiading-container-padding;
}

.section-title {
  font-size: $xiading-font-size-xxxl;
  font-weight: $xiading-font-weight-bold;
  text-align: center;
  margin-bottom: $xiading-spacing-md;
  color: $xiading-text-primary;
  position: relative;
  display: inline-block;
  width: 100%;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -12px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: $xiading-gradient-cta;
    border-radius: 2px;
  }
  
  @media (max-width: $xiading-breakpoint-mobile) { font-size: $xiading-font-size-xxl; }
}

.section-subtitle {
  font-size: $xiading-font-size-lg;
  text-align: center;
  color: $xiading-text-secondary;
  margin-bottom: $xiading-spacing-xxl;
  margin-top: $xiading-spacing-lg;
}

// Header
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid $xiading-border-color;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.05);
  transition: all $xiading-transition-base;
  
  &:hover {
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.08);
  }
  
  &__container {
    max-width: $xiading-container-max-width;
    margin: 0 auto;
    padding: $xiading-spacing-md $xiading-container-padding;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  &__logo {
    display: flex;
    align-items: baseline;
    gap: $xiading-spacing-xs;
    transition: transform $xiading-transition-fast;
    &:hover {
      transform: scale(1.02);
    }
  }
  
  &__logo-text {
    font-size: $xiading-font-size-xl;
    font-weight: $xiading-font-weight-bold;
    color: $xiading-primary;
    background: $xiading-gradient-cta;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  &__logo-sub {
    font-size: $xiading-font-size-sm;
    color: $xiading-text-secondary;
  }
  
  &__nav {
    display: flex;
    gap: $xiading-spacing-xl;
    @media (max-width: $xiading-breakpoint-tablet) { display: none; }
  }
  
  &__nav-link {
    font-size: $xiading-font-size-base;
    color: $xiading-text-secondary;
    text-decoration: none;
    transition: all $xiading-transition-fast;
    position: relative;
    padding: 4px 0;
    
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 2px;
      background: $xiading-primary;
      transition: width $xiading-transition-base;
    }
    
    &:hover { 
      color: $xiading-primary;
      &::after {
        width: 100%;
      }
    }
  }
  
  &__login-btn {
    padding: $xiading-spacing-sm $xiading-spacing-lg;
    background: $xiading-gradient-cta;
    color: $xiading-text-light;
    border: none;
    border-radius: $xiading-border-radius-md;
    font-size: $xiading-font-size-sm;
    cursor: pointer;
    transition: all $xiading-transition-fast;
    box-shadow: 0 4px 15px rgba($xiading-primary, 0.3);
    position: relative;
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
      transition: left 0.5s;
    }
    
    &:hover { 
      transform: translateY(-2px); 
      box-shadow: 0 6px 25px rgba($xiading-primary, 0.4);
      &::before {
        left: 100%;
      }
    }
    
    &:active {
      transform: translateY(0);
    }
  }
}

// Buttons
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: $xiading-spacing-md $xiading-spacing-xl;
  font-size: $xiading-font-size-base;
  font-weight: $xiading-font-weight-medium;
  border-radius: $xiading-border-radius-md;
  border: none;
  cursor: pointer;
  transition: all $xiading-transition-base $xiading-ease-out;
  min-height: $xiading-touch-target-min;
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
  }
  
  &:active::after {
    width: 300px;
    height: 300px;
  }
  
  &--primary {
    background: $xiading-gradient-cta;
    color: $xiading-text-light;
    box-shadow: 0 4px 20px rgba($xiading-primary, 0.3);
    
    &:hover { 
      transform: translateY(-3px); 
      box-shadow: 0 8px 30px rgba($xiading-primary, 0.4);
    }
    
    &:active {
      transform: translateY(-1px);
    }
  }
  
  &--secondary {
    background: $xiading-bg-card;
    color: $xiading-primary;
    border: 2px solid $xiading-primary;
    position: relative;
    z-index: 1;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 0;
      height: 100%;
      background: $xiading-gradient-cta;
      transition: width 0.3s ease;
      z-index: -1;
    }
    
    &:hover { 
      color: $xiading-text-light;
      &::before {
        width: 100%;
      }
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba($xiading-primary, 0.2);
    }
  }
  
  &--large {
    padding: $xiading-spacing-lg $xiading-spacing-xxl;
    font-size: $xiading-font-size-lg;
  }
}

// Hero Section
.hero {
  padding: calc($xiading-spacing-xxxl + 80px) 0 $xiading-spacing-xxxl;
  background: $xiading-gradient-hero;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba($xiading-primary, 0.05) 0%, transparent 70%);
    animation: float 20s ease-in-out infinite;
  }
  
  &__container {
    max-width: $xiading-container-max-width;
    margin: 0 auto;
    padding: 0 $xiading-container-padding;
    display: flex;
    align-items: center;
    gap: $xiading-spacing-xxxl;
    position: relative;
    z-index: 1;
    @media (max-width: $xiading-breakpoint-tablet) { flex-direction: column; text-align: center; }
  }
  
  &__content { 
    flex: 1; 
    animation: slideInLeft 0.8s ease-out;
  }
  
  &__title {
    font-size: $xiading-font-size-hero;
    font-weight: $xiading-font-weight-bold;
    background: linear-gradient(135deg, $xiading-primary-dark 0%, $xiading-primary 50%, $xiading-accent 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: $xiading-spacing-sm;
    line-height: 1.2;
    @media (max-width: $xiading-breakpoint-mobile) { font-size: $xiading-font-size-xxxl; }
  }
  
  &__subtitle {
    font-size: $xiading-font-size-xxl;
    color: $xiading-text-primary;
    margin-bottom: $xiading-spacing-lg;
    font-weight: $xiading-font-weight-semibold;
  }
  
  &__desc {
    font-size: $xiading-font-size-lg;
    color: $xiading-text-secondary;
    line-height: $xiading-line-height-relaxed;
    margin-bottom: $xiading-spacing-xl;
  }
  
  &__highlights {
    display: flex;
    flex-wrap: wrap;
    gap: $xiading-spacing-sm;
    margin-bottom: $xiading-spacing-xl;
    @media (max-width: $xiading-breakpoint-tablet) { justify-content: center; }
  }
  
  &__tag {
    padding: $xiading-spacing-xs $xiading-spacing-md;
    background: rgba($xiading-primary, 0.08);
    color: $xiading-primary-dark;
    border-radius: $xiading-border-radius-full;
    font-size: $xiading-font-size-sm;
    border: 1px solid rgba($xiading-primary, 0.2);
    transition: all $xiading-transition-fast;
    
    &:hover {
      background: rgba($xiading-primary, 0.15);
      transform: translateY(-2px);
      box-shadow: 0 2px 8px rgba($xiading-primary, 0.15);
    }
  }
  
  &__actions {
    display: flex;
    gap: $xiading-spacing-md;
    @media (max-width: $xiading-breakpoint-tablet) { justify-content: center; }
    @media (max-width: $xiading-breakpoint-mobile) { flex-direction: column; }
  }
  
  &__visual {
    flex: 1;
    max-width: 500px;
    animation: slideInRight 0.8s ease-out 0.2s both;
    position: relative;
  }
  
  &__image {
    width: 100%;
    border-radius: $xiading-border-radius-xl;
    box-shadow: $xiading-shadow-lg;
    transition: all $xiading-transition-base;
    position: relative;
    z-index: 2;
    
    &:hover {
      transform: scale(1.02) rotate(1deg);
      box-shadow: 0 20px 50px rgba($xiading-primary, 0.2);
    }
  }
  
  &__visual::before {
    content: '';
    position: absolute;
    top: -20px;
    right: -20px;
    width: 100%;
    height: 100%;
    background: $xiading-gradient-cta;
    border-radius: $xiading-border-radius-xl;
    z-index: 1;
    opacity: 0.3;
    filter: blur(30px);
  }
}

// Value Section
.value {
  padding: $xiading-section-padding-y 0;
  background: $xiading-bg-card;
  position: relative;
  
  &__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: $xiading-spacing-xl;
    @media (max-width: $xiading-breakpoint-tablet) { grid-template-columns: 1fr; }
  }
}

.value-card {
  text-align: center;
  padding: $xiading-spacing-xl;
  background: $xiading-gradient-card;
  border-radius: $xiading-border-radius-lg;
  border: 1px solid $xiading-border-color;
  transition: all $xiading-transition-base $xiading-ease-out;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: $xiading-gradient-cta;
    transform: scaleX(0);
    transition: transform 0.4s ease;
  }
  
  &:hover { 
    transform: translateY(-8px); 
    box-shadow: 0 20px 40px rgba($xiading-primary, 0.15);
    border-color: rgba($xiading-primary, 0.3);
    
    &::before {
      transform: scaleX(1);
    }
  }
  
  &__icon {
    width: 64px;
    height: 64px;
    margin: 0 auto $xiading-spacing-lg;
    display: flex;
    align-items: center;
    justify-content: center;
    background: $xiading-gradient-cta;
    border-radius: 50%;
    color: $xiading-text-light;
    box-shadow: 0 8px 20px rgba($xiading-primary, 0.3);
    transition: all $xiading-transition-base;
    position: relative;
    z-index: 1;
    
    svg {
      width: 32px !important;
      height: 32px !important;
    }
    
    .value-card:hover & {
      transform: scale(1.1) rotate(5deg);
      box-shadow: 0 12px 30px rgba($xiading-primary, 0.4);
    }
  }
  
  &__title {
    font-size: $xiading-font-size-xl;
    font-weight: $xiading-font-weight-semibold;
    margin-bottom: $xiading-spacing-sm;
    color: $xiading-text-primary;
    position: relative;
    z-index: 1;
  }
  
  &__desc {
    font-size: $xiading-font-size-base;
    color: $xiading-text-secondary;
    line-height: $xiading-line-height-relaxed;
    position: relative;
    z-index: 1;
  }
}

// Feature Section
.feature {
  padding: $xiading-section-padding-y 0;
  background: $xiading-bg-secondary;
  position: relative;
  
  &__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: $xiading-spacing-xl;
    @media (max-width: $xiading-breakpoint-tablet) { grid-template-columns: 1fr; }
  }
}

.feature-card {
  background: $xiading-bg-card;
  border-radius: $xiading-border-radius-lg;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  transition: all $xiading-transition-base $xiading-ease-out;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 2px solid transparent;
    border-radius: $xiading-border-radius-lg;
    transition: all $xiading-transition-base;
    pointer-events: none;
  }
  
  &:hover { 
    transform: translateY(-8px); 
    box-shadow: 0 20px 50px rgba($xiading-primary, 0.15);
    
    &::after {
      border-color: rgba($xiading-primary, 0.3);
    }
  }
  
  &__image {
    height: 220px;
    overflow: hidden;
    position: relative;
    
    img { 
      width: 100%; 
      height: 100%; 
      object-fit: cover;
      transition: transform 0.6s ease;
    }
    
    .feature-card:hover & img {
      transform: scale(1.1);
    }
  }
  
  &__content { 
    padding: $xiading-spacing-lg; 
    position: relative;
    z-index: 1;
  }
  
  &__icon {
    width: 40px;
    height: 40px;
    margin-bottom: $xiading-spacing-sm;
    display: flex;
    align-items: center;
    justify-content: center;
    background: $xiading-gradient-cta;
    border-radius: $xiading-border-radius-md;
    color: $xiading-text-light;
    box-shadow: 0 4px 12px rgba($xiading-primary, 0.25);
    transition: transform 0.3s ease;
    
    svg {
      width: 20px !important;
      height: 20px !important;
    }
    
    .feature-card:hover & {
      transform: scale(1.1);
    }
  }
  
  &__title {
    font-size: $xiading-font-size-lg;
    font-weight: $xiading-font-weight-semibold;
    margin-bottom: $xiading-spacing-sm;
    color: $xiading-text-primary;
  }
  
  &__desc {
    font-size: $xiading-font-size-base;
    color: $xiading-text-secondary;
    line-height: $xiading-line-height-relaxed;
  }
}

// Scene Section
.scene {
  padding: $xiading-section-padding-y 0;
  background: $xiading-bg-card;
  
  &__grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: $xiading-spacing-lg;
    @media (max-width: $xiading-breakpoint-desktop) { grid-template-columns: repeat(2, 1fr); }
    @media (max-width: $xiading-breakpoint-mobile) { grid-template-columns: 1fr; }
  }
}

.scene-card {
  background: $xiading-bg-card;
  border-radius: $xiading-border-radius-md;
  overflow: hidden;
  border: 1px solid $xiading-border-color;
  transition: all $xiading-transition-base $xiading-ease-out;
  cursor: pointer;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: $xiading-gradient-cta;
    opacity: 0;
    transition: opacity 0.4s ease;
    z-index: 1;
    pointer-events: none;
  }
  
  &:hover { 
    transform: translateY(-8px); 
    box-shadow: 0 20px 40px rgba($xiading-primary, 0.15);
    border-color: rgba($xiading-primary, 0.4);
    
    &::before {
      opacity: 0.05;
    }
  }
  
  &__image {
    position: relative;
    height: 160px;
    overflow: hidden;
    
    img { 
      width: 100%; 
      height: 100%; 
      object-fit: cover;
      transition: transform 0.5s ease;
    }
    
    .scene-card:hover & img {
      transform: scale(1.15);
    }
  }
  
  &__tag {
    position: absolute;
    top: $xiading-spacing-sm;
    left: $xiading-spacing-sm;
    padding: $xiading-spacing-xs $xiading-spacing-sm;
    background: $xiading-gradient-cta;
    color: $xiading-text-light;
    border-radius: $xiading-border-radius-sm;
    font-size: $xiading-font-size-xs;
    box-shadow: 0 2px 8px rgba($xiading-primary, 0.3);
    z-index: 2;
    font-weight: $xiading-font-weight-medium;
  }
  
  &__content { 
    padding: $xiading-spacing-md; 
    position: relative;
    z-index: 2;
  }
  
  &__icon {
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: $xiading-gradient-cta;
    border-radius: $xiading-border-radius-md;
    color: $xiading-text-light;
    margin-bottom: $xiading-spacing-sm;
    box-shadow: 0 4px 12px rgba($xiading-primary, 0.25);
    transition: all 0.3s ease;
    
    svg {
      width: 24px !important;
      height: 24px !important;
    }
    
    .scene-card:hover & {
      transform: scale(1.1) rotate(5deg);
      box-shadow: 0 6px 16px rgba($xiading-primary, 0.35);
    }
  }
  
  &__title {
    font-size: $xiading-font-size-base;
    font-weight: $xiading-font-weight-semibold;
    margin-bottom: $xiading-spacing-xs;
    color: $xiading-text-primary;
    transition: color 0.3s ease;
    
    .scene-card:hover & {
      color: $xiading-primary;
    }
  }
  
  &__desc {
    font-size: $xiading-font-size-sm;
    color: $xiading-text-secondary;
  }
}

// Case Section
.case {
  padding: $xiading-section-padding-y 0;
  background: $xiading-bg-secondary;
  
  &__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: $xiading-spacing-xl;
    @media (max-width: $xiading-breakpoint-tablet) { grid-template-columns: 1fr; }
  }
}

.case-card {
  background: $xiading-bg-card;
  padding: $xiading-spacing-xl;
  border-radius: $xiading-border-radius-lg;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  transition: all $xiading-transition-base;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '"';
    position: absolute;
    top: 10px;
    left: 20px;
    font-size: 80px;
    font-weight: bold;
    color: rgba($xiading-primary, 0.08);
    font-family: Georgia, serif;
    line-height: 1;
    pointer-events: none;
  }
  
  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 16px 40px rgba($xiading-primary, 0.12);
  }
  
  &__quote {
    font-size: $xiading-font-size-base;
    color: $xiading-text-secondary;
    line-height: $xiading-line-height-relaxed;
    margin-bottom: $xiading-spacing-lg;
    font-style: italic;
    position: relative;
    z-index: 1;
  }
  
  &__author { 
    display: flex; 
    flex-direction: column; 
    gap: $xiading-spacing-xs;
    position: relative;
    z-index: 1;
  }
  
  &__name { 
    font-weight: $xiading-font-weight-semibold; 
    color: $xiading-text-primary; 
    font-size: $xiading-font-size-lg;
  }
  
  &__role { 
    font-size: $xiading-font-size-sm; 
    color: $xiading-text-muted; 
  }
  
  &__company { 
    font-size: $xiading-font-size-sm; 
    color: $xiading-primary; 
    font-weight: $xiading-font-weight-medium;
  }
}

// News Section
.news {
  padding: $xiading-section-padding-y 0;
  background: $xiading-bg-card;
  
  &__loading {
    text-align: center;
    padding: $xiading-spacing-xxl 0;
    
    p {
      margin-top: $xiading-spacing-md;
      color: $xiading-text-muted;
    }
  }
  
  &__error {
    text-align: center;
    padding: $xiading-spacing-xxl 0;
    
    .error-message {
      color: #EF4444;
      margin-bottom: $xiading-spacing-lg;
    }
  }
  
  &__empty {
    text-align: center;
    padding: $xiading-spacing-xxl 0;
    
    p {
      color: $xiading-text-muted;
      font-size: $xiading-font-size-lg;
    }
  }
  
  &__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: $xiading-spacing-lg;
    margin-bottom: $xiading-spacing-xl;
    @media (max-width: $xiading-breakpoint-tablet) { grid-template-columns: 1fr; }
  }
  
  &__more {
    text-align: center;
  }
  
  &__more-link {
    color: $xiading-primary;
    text-decoration: none;
    font-weight: $xiading-font-weight-medium;
    position: relative;
    padding-bottom: 2px;
    transition: all 0.3s ease;
    
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 2px;
      background: $xiading-primary;
      transition: width 0.3s ease;
    }
    
    &:hover { 
      &::after {
        width: 100%;
      }
    }
  }
}

.loading-spinner {
  width: 48px;
  height: 48px;
  margin: 0 auto;
  border: 4px solid $xiading-border-color;
  border-top-color: $xiading-primary;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.news-card {
  background: $xiading-bg-secondary;
  padding: $xiading-spacing-lg;
  border-radius: $xiading-border-radius-md;
  border: 1px solid $xiading-border-color;
  transition: all $xiading-transition-base;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: $xiading-gradient-cta;
    transform: scaleY(0);
    transition: transform 0.3s ease;
  }
  
  &:hover { 
    border-color: $xiading-primary; 
    box-shadow: 0 8px 25px rgba($xiading-primary, 0.1);
    transform: translateX(4px);
    
    &::before {
      transform: scaleY(1);
    }
  }
  
  &__category {
    display: inline-block;
    padding: $xiading-spacing-xs $xiading-spacing-sm;
    background: $xiading-gradient-cta;
    color: $xiading-text-light;
    border-radius: $xiading-border-radius-sm;
    font-size: $xiading-font-size-xs;
    margin-bottom: $xiading-spacing-sm;
    font-weight: $xiading-font-weight-medium;
  }
  
  &__title {
    font-size: $xiading-font-size-base;
    font-weight: $xiading-font-weight-semibold;
    color: $xiading-text-primary;
    margin-bottom: $xiading-spacing-sm;
    line-height: $xiading-line-height-normal;
    transition: color 0.3s ease;
    
    .news-card:hover & {
      color: $xiading-primary;
    }
  }
  
  &__excerpt {
    font-size: $xiading-font-size-sm;
    color: $xiading-text-secondary;
    margin-bottom: $xiading-spacing-sm;
    line-height: $xiading-line-height-relaxed;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  &__date {
    font-size: $xiading-font-size-sm;
    color: $xiading-text-muted;
  }
}

// CTA Section
.cta {
  padding: $xiading-section-padding-y 0;
  background: $xiading-gradient-cta;
  text-align: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 60%);
    animation: rotate 30s linear infinite;
  }
  
  &__title {
    font-size: $xiading-font-size-xxxl;
    font-weight: $xiading-font-weight-bold;
    color: $xiading-text-light;
    margin-bottom: $xiading-spacing-md;
    position: relative;
    z-index: 1;
    @media (max-width: $xiading-breakpoint-mobile) { font-size: $xiading-font-size-xxl; }
  }
  
  &__subtitle {
    font-size: $xiading-font-size-lg;
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: $xiading-spacing-xl;
    position: relative;
    z-index: 1;
  }
  
  &__tags {
    display: flex;
    justify-content: center;
    gap: $xiading-spacing-md;
    margin-bottom: $xiading-spacing-xl;
    flex-wrap: wrap;
    position: relative;
    z-index: 1;
  }
  
  &__tag {
    padding: $xiading-spacing-xs $xiading-spacing-md;
    background: rgba(255, 255, 255, 0.2);
    color: $xiading-text-light;
    border-radius: $xiading-border-radius-full;
    font-size: $xiading-font-size-sm;
    border: 1px solid rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;
    
    &:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: translateY(-2px);
    }
  }
  
  .btn--primary {
    background: $xiading-bg-card;
    color: $xiading-primary-dark;
    position: relative;
    z-index: 1;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
    
    &:hover { 
      background: $xiading-text-light;
      transform: translateY(-4px);
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.25);
    }
  }
}

// Footer
.footer {
  padding: $xiading-spacing-xxl 0 $xiading-spacing-xl;
  background: $xiading-bg-dark;
  color: $xiading-text-light;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: $xiading-gradient-cta;
  }
  
  &__grid {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    gap: $xiading-spacing-xxl;
    margin-bottom: $xiading-spacing-xxl;
    @media (max-width: $xiading-breakpoint-tablet) { grid-template-columns: 1fr; text-align: center; }
  }
  
  &__logo {
    font-size: $xiading-font-size-xl;
    font-weight: $xiading-font-weight-bold;
    margin-bottom: $xiading-spacing-md;
    background: $xiading-gradient-cta;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    display: inline-block;
  }
  
  &__desc {
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: $xiading-spacing-lg;
  }
  
  &__contact {
    color: rgba(255, 255, 255, 0.7);
    font-size: $xiading-font-size-sm;
    p { margin-bottom: $xiading-spacing-xs; }
  }
  
  &__nav-title {
    font-size: $xiading-font-size-base;
    font-weight: $xiading-font-weight-semibold;
    margin-bottom: $xiading-spacing-md;
  }
  
  &__nav-list {
    list-style: none;
    padding: 0;
    margin: 0;
    li { margin-bottom: $xiading-spacing-sm; }
    a {
      color: rgba(255, 255, 255, 0.7);
      text-decoration: none;
      font-size: $xiading-font-size-sm;
      transition: all $xiading-transition-fast;
      position: relative;
      padding-left: 0;
      
      &:hover { 
        color: $xiading-text-light; 
        padding-left: 8px;
      }
      
      &::before {
        content: '→';
        position: absolute;
        left: -12px;
        opacity: 0;
        transition: all 0.3s ease;
      }
      
      &:hover::before {
        left: 0;
        opacity: 1;
      }
    }
  }
  
  &__bottom {
    text-align: center;
    padding-top: $xiading-spacing-xl;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.5);
    font-size: $xiading-font-size-sm;
  }
}

// Animations
@keyframes float {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(2%, 2%) rotate(1deg); }
  50% { transform: translate(0, 4%) rotate(0deg); }
  75% { transform: translate(-2%, 2%) rotate(-1deg); }
}

// News Detail Modal
.news-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: $xiading-spacing-lg;
}

.news-modal-container {
  background: $xiading-bg-card;
  border-radius: $xiading-border-radius-lg;
  max-width: 700px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
}

.news-modal-close {
  position: absolute;
  top: $xiading-spacing-md;
  right: $xiading-spacing-md;
  background: $xiading-bg-secondary;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: $xiading-text-secondary;
  transition: all 0.3s ease;
  z-index: 1;
  
  &:hover {
    background: $xiading-primary;
    color: $xiading-text-light;
  }
}

.news-modal-content {
  padding: $xiading-spacing-xl;
}

.news-modal {
  :deep(.el-dialog__header) {
    padding-bottom: 0;
  }
  
  :deep(.el-dialog__body) {
    padding: $xiading-spacing-lg;
  }
}

.news-detail {
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: $xiading-spacing-md;
    padding-bottom: $xiading-spacing-md;
    border-bottom: 1px solid $xiading-border-color;
  }
  
  &__category {
    display: inline-block;
    padding: $xiading-spacing-xs $xiading-spacing-sm;
    background: $xiading-gradient-cta;
    color: $xiading-text-light;
    border-radius: $xiading-border-radius-sm;
    font-size: $xiading-font-size-xs;
    font-weight: $xiading-font-weight-medium;
  }
  
  &__date {
    font-size: $xiading-font-size-sm;
    color: $xiading-text-muted;
  }
  
  &__title {
    font-size: $xiading-font-size-xxl;
    font-weight: $xiading-font-weight-bold;
    color: $xiading-text-primary;
    margin-bottom: $xiading-spacing-lg;
    line-height: $xiading-line-height-normal;
  }
  
  &__excerpt {
    font-size: $xiading-font-size-base;
    color: $xiading-text-secondary;
    line-height: $xiading-line-height-relaxed;
    margin-bottom: $xiading-spacing-lg;
    padding: $xiading-spacing-md;
    background: $xiading-bg-secondary;
    border-radius: $xiading-border-radius-md;
    border-left: 4px solid $xiading-primary;
  }
  
  &__content {
    font-size: $xiading-font-size-base;
    color: $xiading-text-primary;
    line-height: $xiading-line-height-relaxed;
    
    :deep(p) {
      margin-bottom: $xiading-spacing-md;
    }
    
    :deep(img) {
      max-width: 100%;
      border-radius: $xiading-border-radius-md;
      margin: $xiading-spacing-md 0;
    }
    
    :deep(h1), :deep(h2), :deep(h3), :deep(h4) {
      margin-top: $xiading-spacing-lg;
      margin-bottom: $xiading-spacing-md;
      font-weight: $xiading-font-weight-semibold;
      color: $xiading-text-primary;
    }
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .news-modal-container,
.modal-leave-active .news-modal-container {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.modal-enter-from .news-modal-container,
.modal-leave-to .news-modal-container {
  transform: scale(0.9) translateY(20px);
  opacity: 0;
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

// Scroll animations
.animate-on-scroll {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
  
  &.animated {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-delay {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  
  .animated & {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
