<script setup lang="ts">
/**
 * 夏鼎品牌首頁 - 教育AR創作平台（澳門版）
 * 專業藍色主題，繁體中文
 */
import { ref } from 'vue'
import { useBrand } from '@/composables/useBrand'
import { School, User, OfficeBuilding, FolderOpened, EditPen, Share, Monitor } from '@element-plus/icons-vue'
import LoginModal from '@/components/common/LoginModal.vue'

const { footer } = useBrand()
const showLoginModal = ref(false)

const handleOpenLogin = () => {
  showLoginModal.value = true
}

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
  { icon: Share, title: '三方視角投屏', description: '教師可通過平板查看學生AR視角，輔助課堂教學指導', image: '/images/ar-platform/三方视角，用户操作AR医疗头骨内容.png' },
  { icon: Monitor, title: '多終端支持', description: 'iPad、Rokid AR眼鏡全面適配', image: '/images/ar-platform/女士操作Rokid AR Studio.png' }
]

// 應用場景
const sceneItems = [
  { title: '醫療護理', description: '嬰幼兒護理、外傷處理等醫療科普', tag: '醫療', image: '/images/ar-platform/婴幼儿护理 外伤处理.png' },
  { title: '口腔教學', description: '窩溝封閉等口腔醫療操作培訓', tag: '口腔', image: '/images/ar-platform/AR医疗 窝沟封闭.png' },
  { title: '工業展示', description: '掘進機等大型設備1:1還原展示', tag: '工業', image: '/images/ar-platform/AR掘进机展示.png' },
  { title: '互動遊戲', description: '多人AR遊戲，寓教於樂', tag: '遊戲', image: '/images/ar-platform/多人AR游戏，三方视角.png' }
]

// 用戶案例
const caseItems = [
  { company: '澳門培正中學', quote: '夏鼎AR創作平台讓我們的生物課堂煥然一新，學生學習興趣大幅提升。', author: '陳老師', role: '生物科教研組長' },
  { company: '澳門大學附屬應用學校', quote: '學生使用iPad和Rokid AR眼鏡進行創作，培養了創新思維和動手能力。', author: '李主任', role: 'STEAM教育負責人' },
  { company: '澳門聖若瑟教區中學', quote: '零門檻的操作讓每位老師都能輕鬆製作AR課件，大大提升了備課效率。', author: '黃校長', role: '教務主任' }
]

// 新聞數據（之後從WordPress讀取）
const newsItems = ref([
  { id: 1, title: '夏鼎AR創作平台正式上線澳門教育市場', date: '2025-02-01', category: '官方新聞' },
  { id: 2, title: '澳門培正中學引入AR教學，課堂參與度提升85%', date: '2025-01-28', category: '校園案例' },
  { id: 3, title: 'AR技術在STEAM教育中的創新應用', date: '2025-01-25', category: '行業動態' },
  { id: 4, title: '平台新增醫療護理AR素材庫', date: '2025-01-20', category: '平台更新' }
])

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

    <!-- Value Section -->
    <section class="value">
      <div class="section-container">
        <h2 class="section-title">以AR之力，重構教育表達</h2>
        <p class="section-subtitle">我們為教育場景，重新定義AR創作</p>
        <div class="value__grid">
          <div v-for="(item, index) in valueItems" :key="index" class="value-card">
            <div class="value-card__icon">
              <el-icon :size="32"><component :is="item.icon" /></el-icon>
            </div>
            <h3 class="value-card__title">{{ item.title }}</h3>
            <p class="value-card__desc">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Feature Section -->
    <section id="feature" class="feature">
      <div class="section-container">
        <h2 class="section-title">簡單操作，解鎖教育AR無限可能</h2>
        <p class="section-subtitle">零門檻操作，讓每位師生都能輕鬆創作</p>
        <div class="feature__grid">
          <div v-for="(item, index) in featureItems" :key="index" class="feature-card">
            <div class="feature-card__image">
              <img :src="item.image" :alt="item.title" />
            </div>
            <div class="feature-card__content">
              <div class="feature-card__icon">
                <el-icon :size="24"><component :is="item.icon" /></el-icon>
              </div>
              <h3 class="feature-card__title">{{ item.title }}</h3>
              <p class="feature-card__desc">{{ item.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Scene Section -->
    <section id="scene" class="scene">
      <div class="section-container">
        <h2 class="section-title">AR賦能全學科，適配多元教學場景</h2>
        <p class="section-subtitle">從醫療到工業，從教育到娛樂，AR讓每個場景都生動起來</p>
        <div class="scene__grid">
          <div v-for="(item, index) in sceneItems" :key="index" class="scene-card">
            <div class="scene-card__image">
              <img :src="item.image" :alt="item.title" />
              <span class="scene-card__tag">{{ item.tag }}</span>
            </div>
            <div class="scene-card__content">
              <h3 class="scene-card__title">{{ item.title }}</h3>
              <p class="scene-card__desc">{{ item.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Case Section -->
    <section id="case" class="case">
      <div class="section-container">
        <h2 class="section-title">已有眾多澳門校園，用夏鼎解鎖AR教學新體驗</h2>
        <p class="section-subtitle">聽聽他們怎麼說</p>
        <div class="case__grid">
          <div v-for="(item, index) in caseItems" :key="index" class="case-card">
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

    <!-- News Section -->
    <section id="news" class="news">
      <div class="section-container">
        <h2 class="section-title">新聞動態</h2>
        <p class="section-subtitle">了解平台最新資訊與行業動態</p>
        <div class="news__grid">
          <div v-for="item in newsItems" :key="item.id" class="news-card">
            <span class="news-card__category">{{ item.category }}</span>
            <h3 class="news-card__title">{{ item.title }}</h3>
            <span class="news-card__date">{{ item.date }}</span>
          </div>
        </div>
        <div class="news__more">
          <a href="#" class="news__more-link">查看更多新聞 →</a>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta">
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
        </div>
      </div>
    </footer>

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
  @media (max-width: $xiading-breakpoint-mobile) { font-size: $xiading-font-size-xxl; }
}

.section-subtitle {
  font-size: $xiading-font-size-lg;
  text-align: center;
  color: $xiading-text-secondary;
  margin-bottom: $xiading-spacing-xxl;
}

// Header
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid $xiading-border-color;
  
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
  }
  
  &__logo-text {
    font-size: $xiading-font-size-xl;
    font-weight: $xiading-font-weight-bold;
    color: $xiading-primary;
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
    transition: color $xiading-transition-fast;
    &:hover { color: $xiading-primary; }
  }
  
  &__login-btn {
    padding: $xiading-spacing-sm $xiading-spacing-lg;
    background: $xiading-primary;
    color: $xiading-text-light;
    border: none;
    border-radius: $xiading-border-radius-md;
    font-size: $xiading-font-size-sm;
    cursor: pointer;
    transition: all $xiading-transition-fast;
    &:hover { background: $xiading-primary-dark; }
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
  
  &--primary {
    background: $xiading-gradient-cta;
    color: $xiading-text-light;
    box-shadow: $xiading-shadow-md;
    &:hover { transform: translateY(-2px); box-shadow: $xiading-shadow-lg; }
  }
  
  &--secondary {
    background: $xiading-bg-card;
    color: $xiading-primary;
    border: 2px solid $xiading-primary;
    &:hover { background: rgba($xiading-primary, 0.1); }
  }
  
  &--large {
    padding: $xiading-spacing-lg $xiading-spacing-xxl;
    font-size: $xiading-font-size-lg;
  }
}

// Hero Section
.hero {
  padding: calc($xiading-spacing-xxxl + 60px) 0 $xiading-spacing-xxxl;
  background: $xiading-gradient-hero;
  
  &__container {
    max-width: $xiading-container-max-width;
    margin: 0 auto;
    padding: 0 $xiading-container-padding;
    display: flex;
    align-items: center;
    gap: $xiading-spacing-xxxl;
    @media (max-width: $xiading-breakpoint-tablet) { flex-direction: column; text-align: center; }
  }
  
  &__content { flex: 1; }
  
  &__title {
    font-size: $xiading-font-size-hero;
    font-weight: $xiading-font-weight-bold;
    color: $xiading-primary-dark;
    margin-bottom: $xiading-spacing-sm;
    @media (max-width: $xiading-breakpoint-mobile) { font-size: $xiading-font-size-xxxl; }
  }
  
  &__subtitle {
    font-size: $xiading-font-size-xxl;
    color: $xiading-text-primary;
    margin-bottom: $xiading-spacing-lg;
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
    background: rgba($xiading-primary, 0.1);
    color: $xiading-primary-dark;
    border-radius: $xiading-border-radius-full;
    font-size: $xiading-font-size-sm;
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
  }
  
  &__image {
    width: 100%;
    border-radius: $xiading-border-radius-xl;
    box-shadow: $xiading-shadow-lg;
  }
}

// Value Section
.value {
  padding: $xiading-section-padding-y 0;
  background: $xiading-bg-card;
  
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
  &:hover { transform: translateY(-4px); box-shadow: $xiading-shadow-card; }
  
  &__icon {
    width: 64px;
    height: 64px;
    margin: 0 auto $xiading-spacing-lg;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba($xiading-primary, 0.1);
    border-radius: 50%;
    color: $xiading-primary;
  }
  
  &__title {
    font-size: $xiading-font-size-xl;
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

// Feature Section
.feature {
  padding: $xiading-section-padding-y 0;
  background: $xiading-bg-secondary;
  
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
  box-shadow: $xiading-shadow-sm;
  transition: all $xiading-transition-base $xiading-ease-out;
  &:hover { transform: translateY(-4px); box-shadow: $xiading-shadow-card; }
  
  &__image {
    height: 200px;
    overflow: hidden;
    img { width: 100%; height: 100%; object-fit: cover; }
  }
  
  &__content { padding: $xiading-spacing-lg; }
  
  &__icon {
    width: 40px;
    height: 40px;
    margin-bottom: $xiading-spacing-sm;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba($xiading-primary, 0.1);
    border-radius: $xiading-border-radius-md;
    color: $xiading-primary;
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
  &:hover { transform: translateY(-4px); box-shadow: $xiading-shadow-card; }
  
  &__image {
    position: relative;
    height: 150px;
    overflow: hidden;
    img { width: 100%; height: 100%; object-fit: cover; }
  }
  
  &__tag {
    position: absolute;
    top: $xiading-spacing-sm;
    left: $xiading-spacing-sm;
    padding: $xiading-spacing-xs $xiading-spacing-sm;
    background: $xiading-primary;
    color: $xiading-text-light;
    border-radius: $xiading-border-radius-sm;
    font-size: $xiading-font-size-xs;
  }
  
  &__content { padding: $xiading-spacing-md; }
  
  &__title {
    font-size: $xiading-font-size-base;
    font-weight: $xiading-font-weight-semibold;
    margin-bottom: $xiading-spacing-xs;
    color: $xiading-text-primary;
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
  box-shadow: $xiading-shadow-sm;
  
  &__quote {
    font-size: $xiading-font-size-base;
    color: $xiading-text-secondary;
    line-height: $xiading-line-height-relaxed;
    margin-bottom: $xiading-spacing-lg;
    font-style: italic;
  }
  
  &__author { display: flex; flex-direction: column; gap: $xiading-spacing-xs; }
  &__name { font-weight: $xiading-font-weight-semibold; color: $xiading-text-primary; }
  &__role { font-size: $xiading-font-size-sm; color: $xiading-text-muted; }
  &__company { font-size: $xiading-font-size-sm; color: $xiading-primary; }
}

// News Section
.news {
  padding: $xiading-section-padding-y 0;
  background: $xiading-bg-card;
  
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
    &:hover { text-decoration: underline; }
  }
}

.news-card {
  background: $xiading-bg-secondary;
  padding: $xiading-spacing-lg;
  border-radius: $xiading-border-radius-md;
  border: 1px solid $xiading-border-color;
  transition: all $xiading-transition-base;
  cursor: pointer;
  &:hover { border-color: $xiading-primary; box-shadow: $xiading-shadow-sm; }
  
  &__category {
    display: inline-block;
    padding: $xiading-spacing-xs $xiading-spacing-sm;
    background: rgba($xiading-primary, 0.1);
    color: $xiading-primary;
    border-radius: $xiading-border-radius-sm;
    font-size: $xiading-font-size-xs;
    margin-bottom: $xiading-spacing-sm;
  }
  
  &__title {
    font-size: $xiading-font-size-base;
    font-weight: $xiading-font-weight-semibold;
    color: $xiading-text-primary;
    margin-bottom: $xiading-spacing-sm;
    line-height: $xiading-line-height-normal;
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
  
  &__title {
    font-size: $xiading-font-size-xxxl;
    font-weight: $xiading-font-weight-bold;
    color: $xiading-text-light;
    margin-bottom: $xiading-spacing-md;
    @media (max-width: $xiading-breakpoint-mobile) { font-size: $xiading-font-size-xxl; }
  }
  
  &__subtitle {
    font-size: $xiading-font-size-lg;
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: $xiading-spacing-xl;
  }
  
  &__tags {
    display: flex;
    justify-content: center;
    gap: $xiading-spacing-md;
    margin-bottom: $xiading-spacing-xl;
    flex-wrap: wrap;
  }
  
  &__tag {
    padding: $xiading-spacing-xs $xiading-spacing-md;
    background: rgba(255, 255, 255, 0.2);
    color: $xiading-text-light;
    border-radius: $xiading-border-radius-full;
    font-size: $xiading-font-size-sm;
  }
  
  .btn--primary {
    background: $xiading-bg-card;
    color: $xiading-primary-dark;
    &:hover { background: $xiading-text-light; }
  }
}

// Footer
.footer {
  padding: $xiading-spacing-xxl 0 $xiading-spacing-xl;
  background: $xiading-bg-dark;
  color: $xiading-text-light;
  
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
      transition: color $xiading-transition-fast;
      &:hover { color: $xiading-text-light; }
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
</style>
