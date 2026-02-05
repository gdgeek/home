<script setup lang="ts">
/**
 * 星扣品牌首页 - 教育AR创作平台（大陆版）
 * 严肃教育蓝风格，简体中文
 */
import { ref } from 'vue'
import { useBrand } from '@/composables/useBrand'
import { School, User, OfficeBuilding, FolderOpened, EditPen, VideoCamera, Cpu } from '@element-plus/icons-vue'
import LoginModal from '@/components/common/LoginModal.vue'

const { footer } = useBrand()
const showLoginModal = ref(false)

const handleOpenLogin = () => {
  showLoginModal.value = true
}

// 导航菜单
const navItems = [
  { text: '首页', url: '#' },
  { text: '产品功能', url: '#feature' },
  { text: '应用场景', url: '#scene' },
  { text: '成功案例', url: '#case' },
  { text: '新闻资讯', url: '#news' }
]

// 核心价值 - 卡片式布局
const valueItems = [
  { icon: School, title: '教师赋能', subtitle: '3分钟制作AR课件', description: '无需编程基础，拖拽即可完成AR内容创作，让备课效率提升10倍', color: '#2563EB' },
  { icon: User, title: '学生创作', subtitle: '激发无限创意', description: '学生可自主创作AR作品，培养空间思维和创新能力', color: '#0EA5E9' },
  { icon: OfficeBuilding, title: '校园部署', subtitle: '一站式解决方案', description: '提供完整的AR教学环境搭建方案，助力学校数字化转型', color: '#DC2626' }
]

// 核心功能 - 大图展示
const featureItems = [
  { icon: FolderOpened, title: '海量教育素材库', desc: '覆盖K12全学科3D模型，与课本同步更新', image: '/images/ar-platform/UGC场景编辑器界面.png' },
  { icon: EditPen, title: '可视化编辑器', desc: '所见即所得，零代码创作AR内容', image: '/images/ar-platform/拖拽程序生成工具.png' },
  { icon: VideoCamera, title: '多人协作', desc: '支持师生实时互动，课堂更精彩', image: '/images/ar-platform/多人AR游戏，三方视角.png' },
  { icon: Cpu, title: 'AI智能辅助', desc: 'AI一键生成3D模型，降低创作门槛', image: '/images/ar-platform/女士操作Rokid AR Studio.png' }
]

// 应用场景 - 横向滚动卡片
const sceneItems = [
  { title: '生物实验', desc: '细胞结构、人体器官立体呈现', image: '/images/ar-platform/用户操作AR医疗头骨内容.png', tag: '理科' },
  { title: '历史重现', desc: '文物复原、历史场景穿越体验', image: '/images/ar-platform/AR沙盘，中南大学.png', tag: '文科' },
  { title: '工业培训', desc: '设备拆解、操作流程模拟', image: '/images/ar-platform/AR掘进机展示.png', tag: '职教' },
  { title: '医疗教学', desc: '手术模拟、护理培训', image: '/images/ar-platform/婴幼儿护理 外伤处理.png', tag: '医学' },
  { title: '趣味游戏', desc: '寓教于乐的AR互动体验', image: '/images/ar-platform/两个小朋友在外面玩AR游戏.jpeg', tag: '娱乐' }
]

// 成功案例 - 数据展示
const caseItems = [
  { school: '北京市第四中学', metric: '课堂参与度提升', value: '92%', quote: '星扣AR让物理课变得生动有趣' },
  { school: '上海交通大学附属中学', metric: '学生创作作品', value: '1200+', quote: '学生们爱上了用AR表达创意' },
  { school: '深圳中学', metric: '教师使用率', value: '98%', quote: '零门槛操作，每位老师都能轻松上手' }
]

// 新闻数据
const newsItems = ref([
  { id: 1, title: '星扣AR创作平台荣获2025年度教育科技创新奖', date: '2025-02-03', category: '荣誉' },
  { id: 2, title: '北京四中引入星扣AR教学，学生反响热烈', date: '2025-01-30', category: '案例' },
  { id: 3, title: '星扣发布AI模型生成功能，创作效率再提升', date: '2025-01-25', category: '产品' }
])

// 页脚导航
const footerNavigation = [
  { title: '产品服务', links: [{ text: '功能介绍', url: '#' }, { text: '使用教程', url: '#' }, { text: '素材商城', url: '#' }] },
  { title: '关于我们', links: [{ text: '公司简介', url: '#' }, { text: '联系我们', url: '#' }, { text: '加入我们', url: '#' }] },
  { title: '帮助支持', links: [{ text: '常见问题', url: '#' }, { text: '在线客服', url: '#' }, { text: '意见反馈', url: '#' }] }
]
</script>

<template>
  <div class="xingkou-page">
    <!-- Header -->
    <header class="header">
      <div class="header__container">
        <div class="header__logo">
          <div class="header__logo-icon">
            <svg viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="14" stroke="currentColor" stroke-width="2"/><path d="M16 8L18.5 13.5L24 14.5L20 18.5L21 24L16 21L11 24L12 18.5L8 14.5L13.5 13.5L16 8Z" fill="currentColor"/></svg>
          </div>
          <span class="header__logo-text">星扣</span>
        </div>
        <nav class="header__nav">
          <a v-for="(item, index) in navItems" :key="index" :href="item.url" class="header__nav-link">{{ item.text }}</a>
        </nav>
        <div class="header__actions">
          <button class="header__login-btn" @click="handleOpenLogin">登录</button>
          <button class="header__try-btn" @click="handleOpenLogin">免费试用</button>
        </div>
      </div>
    </header>

    <!-- Hero Section - 左右分栏大图 -->
    <section class="hero">
      <div class="hero__container">
        <div class="hero__content">
          <div class="hero__badge">🎉 2025年度教育科技创新产品</div>
          <h1 class="hero__title">
            让AR创作<br/>
            <span class="hero__title-highlight">像搭积木一样简单</span>
          </h1>
          <p class="hero__desc">星扣AR创作平台，专为K12教育打造的零门槛AR内容创作工具。无需编程，3分钟即可创作沉浸式AR教学内容。</p>
          <div class="hero__stats">
            <div class="hero__stat">
              <span class="hero__stat-value">500+</span>
              <span class="hero__stat-label">合作学校</span>
            </div>
            <div class="hero__stat">
              <span class="hero__stat-value">10万+</span>
              <span class="hero__stat-label">师生用户</span>
            </div>
            <div class="hero__stat">
              <span class="hero__stat-value">50万+</span>
              <span class="hero__stat-label">AR作品</span>
            </div>
          </div>
          <div class="hero__actions">
            <button class="btn btn--primary btn--large" @click="handleOpenLogin">
              <span>立即体验</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
            <button class="btn btn--outline btn--large">预约演示</button>
          </div>
        </div>
        <div class="hero__visual">
          <div class="hero__image-wrapper">
            <img src="/images/ar-platform/高中生操作AR内容，欢笑.png" alt="AR教育" class="hero__image" />
            <div class="hero__float hero__float--1">
              <span class="hero__float-icon">📚</span>
              <span>课本同步</span>
            </div>
            <div class="hero__float hero__float--2">
              <span class="hero__float-icon">🎮</span>
              <span>互动体验</span>
            </div>
            <div class="hero__float hero__float--3">
              <span class="hero__float-icon">🤖</span>
              <span>AI辅助</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Value Section - 三列卡片 -->
    <section class="value">
      <div class="section-container">
        <div class="section-header">
          <span class="section-tag">核心价值</span>
          <h2 class="section-title">为什么选择星扣？</h2>
          <p class="section-subtitle">我们致力于让每一位师生都能轻松创作AR内容</p>
        </div>
        <div class="value__grid">
          <div v-for="(item, index) in valueItems" :key="index" class="value-card" :style="{ '--accent-color': item.color }">
            <div class="value-card__icon">
              <el-icon :size="28"><component :is="item.icon" /></el-icon>
            </div>
            <h3 class="value-card__title">{{ item.title }}</h3>
            <p class="value-card__subtitle">{{ item.subtitle }}</p>
            <p class="value-card__desc">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Feature Section - 交替布局 -->
    <section id="feature" class="feature">
      <div class="section-container">
        <div class="section-header">
          <span class="section-tag">产品功能</span>
          <h2 class="section-title">强大功能，简单操作</h2>
        </div>
        <div class="feature__list">
          <div v-for="(item, index) in featureItems" :key="index" class="feature-item" :class="{ 'feature-item--reverse': index % 2 === 1 }">
            <div class="feature-item__image">
              <img :src="item.image" :alt="item.title" />
            </div>
            <div class="feature-item__content">
              <div class="feature-item__icon">
                <el-icon :size="24"><component :is="item.icon" /></el-icon>
              </div>
              <h3 class="feature-item__title">{{ item.title }}</h3>
              <p class="feature-item__desc">{{ item.desc }}</p>
              <a href="#" class="feature-item__link">了解更多 →</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Scene Section - 横向滚动 -->
    <section id="scene" class="scene">
      <div class="section-container">
        <div class="section-header">
          <span class="section-tag">应用场景</span>
          <h2 class="section-title">覆盖多元教学场景</h2>
        </div>
      </div>
      <div class="scene__scroll">
        <div class="scene__track">
          <div v-for="(item, index) in sceneItems" :key="index" class="scene-card">
            <div class="scene-card__image">
              <img :src="item.image" :alt="item.title" />
              <span class="scene-card__tag">{{ item.tag }}</span>
            </div>
            <div class="scene-card__content">
              <h3 class="scene-card__title">{{ item.title }}</h3>
              <p class="scene-card__desc">{{ item.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Case Section - 数据卡片 -->
    <section id="case" class="case">
      <div class="section-container">
        <div class="section-header">
          <span class="section-tag">成功案例</span>
          <h2 class="section-title">他们都在用星扣</h2>
        </div>
        <div class="case__grid">
          <div v-for="(item, index) in caseItems" :key="index" class="case-card">
            <div class="case-card__metric">
              <span class="case-card__value">{{ item.value }}</span>
              <span class="case-card__label">{{ item.metric }}</span>
            </div>
            <p class="case-card__quote">"{{ item.quote }}"</p>
            <p class="case-card__school">— {{ item.school }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- News Section -->
    <section id="news" class="news">
      <div class="section-container">
        <div class="section-header section-header--left">
          <span class="section-tag">新闻资讯</span>
          <h2 class="section-title">最新动态</h2>
        </div>
        <div class="news__grid">
          <div v-for="item in newsItems" :key="item.id" class="news-card">
            <span class="news-card__category">{{ item.category }}</span>
            <h3 class="news-card__title">{{ item.title }}</h3>
            <span class="news-card__date">{{ item.date }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta">
      <div class="section-container">
        <div class="cta__content">
          <h2 class="cta__title">准备好开启AR教育之旅了吗？</h2>
          <p class="cta__subtitle">免费注册，立即体验星扣AR创作平台的强大功能</p>
          <div class="cta__actions">
            <button class="btn btn--white btn--large" @click="handleOpenLogin">免费注册</button>
            <button class="btn btn--ghost btn--large">联系销售</button>
          </div>
          <div class="cta__trust">
            <span>✓ 免费试用</span>
            <span>✓ 无需信用卡</span>
            <span>✓ 专属客服支持</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="section-container">
        <div class="footer__top">
          <div class="footer__brand">
            <div class="footer__logo">
              <div class="footer__logo-icon">
                <svg viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="14" stroke="currentColor" stroke-width="2"/><path d="M16 8L18.5 13.5L24 14.5L20 18.5L21 24L16 21L11 24L12 18.5L8 14.5L13.5 13.5L16 8Z" fill="currentColor"/></svg>
              </div>
              <span>星扣AR创作平台</span>
            </div>
            <p class="footer__desc">让AR创作像搭积木一样简单</p>
            <div class="footer__contact">
              <p>📞 400-888-8888</p>
              <p>📧 contact@xingkou.com</p>
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
          <p>{{ footer.copyright || '© 2025 星扣科技. 保留所有权利.' }}</p>
        </div>
      </div>
    </footer>

    <!-- Login Modal -->
    <LoginModal v-model="showLoginModal" />
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/xingkou/variables' as *;

.xingkou-page {
  font-family: $xingkou-font-family;
  color: $xingkou-text-primary;
  background: $xingkou-bg-primary;
}

.section-container {
  max-width: $xingkou-container-max-width;
  margin: 0 auto;
  padding: 0 $xingkou-container-padding;
}

.section-header {
  text-align: center;
  margin-bottom: $xingkou-spacing-xxl;
  &--left { text-align: left; }
}

.section-tag {
  display: inline-block;
  padding: $xingkou-spacing-xs $xingkou-spacing-md;
  background: $xingkou-bg-secondary;
  color: $xingkou-primary;
  border-radius: $xingkou-border-radius-full;
  font-size: $xingkou-font-size-sm;
  font-weight: $xingkou-font-weight-medium;
  margin-bottom: $xingkou-spacing-md;
}

.section-title {
  font-size: $xingkou-font-size-xxxl;
  font-weight: $xingkou-font-weight-bold;
  color: $xingkou-text-primary;
  margin-bottom: $xingkou-spacing-sm;
  @media (max-width: $xingkou-breakpoint-mobile) { font-size: $xingkou-font-size-xxl; }
}

.section-subtitle {
  font-size: $xingkou-font-size-lg;
  color: $xingkou-text-secondary;
}

// Buttons
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: $xingkou-spacing-sm;
  padding: $xingkou-spacing-md $xingkou-spacing-xl;
  font-size: $xingkou-font-size-base;
  font-weight: $xingkou-font-weight-medium;
  border-radius: $xingkou-border-radius-lg;
  border: none;
  cursor: pointer;
  transition: all $xingkou-transition-base;
  
  &--primary {
    background: $xingkou-gradient-cta;
    color: $xingkou-text-light;
    &:hover { transform: translateY(-2px); box-shadow: $xingkou-shadow-lg; }
  }
  
  &--outline {
    background: transparent;
    color: $xingkou-primary;
    border: 2px solid $xingkou-primary;
    &:hover { background: $xingkou-bg-secondary; }
  }
  
  &--white {
    background: white;
    color: $xingkou-primary;
    &:hover { transform: translateY(-2px); box-shadow: $xingkou-shadow-md; }
  }
  
  &--ghost {
    background: transparent;
    color: white;
    border: 2px solid rgba(255,255,255,0.5);
    &:hover { border-color: white; background: rgba(255,255,255,0.1); }
  }
  
  &--large {
    padding: $xingkou-spacing-lg $xingkou-spacing-xxl;
    font-size: $xingkou-font-size-lg;
  }
}

// Header
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid $xingkou-border-color;
  
  &__container {
    max-width: $xingkou-container-max-width;
    margin: 0 auto;
    padding: $xingkou-spacing-md $xingkou-container-padding;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  &__logo {
    display: flex;
    align-items: center;
    gap: $xingkou-spacing-sm;
  }
  
  &__logo-icon {
    width: 36px;
    height: 36px;
    color: $xingkou-primary;
  }
  
  &__logo-text {
    font-size: $xingkou-font-size-xl;
    font-weight: $xingkou-font-weight-bold;
    color: $xingkou-text-primary;
  }
  
  &__nav {
    display: flex;
    gap: $xingkou-spacing-xl;
    @media (max-width: $xingkou-breakpoint-tablet) { display: none; }
  }
  
  &__nav-link {
    font-size: $xingkou-font-size-base;
    color: $xingkou-text-secondary;
    text-decoration: none;
    transition: color $xingkou-transition-fast;
    &:hover { color: $xingkou-primary; }
  }
  
  &__actions {
    display: flex;
    gap: $xingkou-spacing-sm;
  }
  
  &__login-btn {
    padding: $xingkou-spacing-sm $xingkou-spacing-lg;
    background: transparent;
    color: $xingkou-text-secondary;
    border: none;
    font-size: $xingkou-font-size-sm;
    cursor: pointer;
    &:hover { color: $xingkou-primary; }
  }
  
  &__try-btn {
    padding: $xingkou-spacing-sm $xingkou-spacing-lg;
    background: $xingkou-primary;
    color: white;
    border: none;
    border-radius: $xingkou-border-radius-md;
    font-size: $xingkou-font-size-sm;
    cursor: pointer;
    transition: all $xingkou-transition-fast;
    &:hover { background: $xingkou-primary-dark; }
  }
}

// Hero
.hero {
  padding: calc($xingkou-spacing-xxxl + 80px) 0 $xingkou-spacing-xxxl;
  background: $xingkou-gradient-hero;
  
  &__container {
    max-width: $xingkou-container-max-width;
    margin: 0 auto;
    padding: 0 $xingkou-container-padding;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: $xingkou-spacing-xxxl;
    align-items: center;
    @media (max-width: $xingkou-breakpoint-tablet) { grid-template-columns: 1fr; text-align: center; }
  }
  
  &__badge {
    display: inline-block;
    padding: $xingkou-spacing-xs $xingkou-spacing-md;
    background: white;
    border-radius: $xingkou-border-radius-full;
    font-size: $xingkou-font-size-sm;
    color: $xingkou-text-secondary;
    margin-bottom: $xingkou-spacing-lg;
    box-shadow: $xingkou-shadow-sm;
  }
  
  &__title {
    font-size: $xingkou-font-size-hero;
    font-weight: $xingkou-font-weight-bold;
    line-height: 1.2;
    margin-bottom: $xingkou-spacing-lg;
    @media (max-width: $xingkou-breakpoint-mobile) { font-size: $xingkou-font-size-xxxl; }
  }
  
  &__title-highlight {
    color: $xingkou-primary;
  }
  
  &__desc {
    font-size: $xingkou-font-size-lg;
    color: $xingkou-text-secondary;
    line-height: 1.7;
    margin-bottom: $xingkou-spacing-xl;
  }
  
  &__stats {
    display: flex;
    gap: $xingkou-spacing-xxl;
    margin-bottom: $xingkou-spacing-xl;
    @media (max-width: $xingkou-breakpoint-tablet) { justify-content: center; }
  }
  
  &__stat {
    text-align: center;
  }
  
  &__stat-value {
    display: block;
    font-size: $xingkou-font-size-xxl;
    font-weight: $xingkou-font-weight-bold;
    color: $xingkou-primary;
  }
  
  &__stat-label {
    font-size: $xingkou-font-size-sm;
    color: $xingkou-text-muted;
  }
  
  &__actions {
    display: flex;
    gap: $xingkou-spacing-md;
    @media (max-width: $xingkou-breakpoint-tablet) { justify-content: center; }
  }
  
  &__visual {
    position: relative;
    @media (max-width: $xingkou-breakpoint-tablet) { order: -1; }
  }
  
  &__image-wrapper {
    position: relative;
  }
  
  &__image {
    width: 100%;
    border-radius: $xingkou-border-radius-xl;
    box-shadow: $xingkou-shadow-lg;
  }
  
  &__float {
    position: absolute;
    display: flex;
    align-items: center;
    gap: $xingkou-spacing-xs;
    padding: $xingkou-spacing-sm $xingkou-spacing-md;
    background: white;
    border-radius: $xingkou-border-radius-lg;
    box-shadow: $xingkou-shadow-md;
    font-size: $xingkou-font-size-sm;
    animation: float 3s ease-in-out infinite;
    
    &--1 { top: 10%; left: -20px; animation-delay: 0s; }
    &--2 { top: 50%; right: -30px; animation-delay: 0.5s; }
    &--3 { bottom: 15%; left: 10%; animation-delay: 1s; }
  }
  
  &__float-icon {
    font-size: 20px;
  }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

// Value Section
.value {
  padding: $xingkou-section-padding-y 0;
  
  &__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: $xingkou-spacing-xl;
    @media (max-width: $xingkou-breakpoint-tablet) { grid-template-columns: 1fr; }
  }
}

.value-card {
  padding: $xingkou-spacing-xl;
  background: white;
  border-radius: $xingkou-border-radius-lg;
  border: 1px solid $xingkou-border-color;
  transition: all $xingkou-transition-base;
  &:hover { transform: translateY(-8px); box-shadow: $xingkou-shadow-lg; border-color: var(--accent-color); }
  
  &__icon {
    width: 56px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--accent-color);
    border-radius: $xingkou-border-radius-md;
    color: white;
    margin-bottom: $xingkou-spacing-lg;
  }
  
  &__title {
    font-size: $xingkou-font-size-xl;
    font-weight: $xingkou-font-weight-bold;
    margin-bottom: $xingkou-spacing-xs;
  }
  
  &__subtitle {
    font-size: $xingkou-font-size-base;
    color: var(--accent-color);
    font-weight: $xingkou-font-weight-medium;
    margin-bottom: $xingkou-spacing-md;
  }
  
  &__desc {
    font-size: $xingkou-font-size-base;
    color: $xingkou-text-secondary;
    line-height: 1.6;
  }
}

// Feature Section
.feature {
  padding: $xingkou-section-padding-y 0;
  background: $xingkou-bg-secondary;
  
  &__list {
    display: flex;
    flex-direction: column;
    gap: $xingkou-spacing-xxxl;
  }
}

.feature-item {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: $xingkou-spacing-xxl;
  align-items: center;
  @media (max-width: $xingkou-breakpoint-tablet) { grid-template-columns: 1fr; }
  
  &--reverse {
    .feature-item__image { order: 2; }
    .feature-item__content { order: 1; }
    @media (max-width: $xingkou-breakpoint-tablet) {
      .feature-item__image { order: 1; }
      .feature-item__content { order: 2; }
    }
  }
  
  &__image {
    img {
      width: 100%;
      border-radius: $xingkou-border-radius-xl;
      box-shadow: $xingkou-shadow-md;
    }
  }
  
  &__icon {
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: $xingkou-primary;
    border-radius: $xingkou-border-radius-md;
    color: white;
    margin-bottom: $xingkou-spacing-md;
  }
  
  &__title {
    font-size: $xingkou-font-size-xxl;
    font-weight: $xingkou-font-weight-bold;
    margin-bottom: $xingkou-spacing-sm;
  }
  
  &__desc {
    font-size: $xingkou-font-size-lg;
    color: $xingkou-text-secondary;
    margin-bottom: $xingkou-spacing-lg;
  }
  
  &__link {
    color: $xingkou-primary;
    font-weight: $xingkou-font-weight-medium;
    text-decoration: none;
    &:hover { text-decoration: underline; }
  }
}

// Scene Section
.scene {
  padding: $xingkou-section-padding-y 0;
  overflow: hidden;
  
  &__scroll {
    overflow-x: auto;
    padding: 0 $xingkou-container-padding;
    -webkit-overflow-scrolling: touch;
    &::-webkit-scrollbar { display: none; }
  }
  
  &__track {
    display: flex;
    gap: $xingkou-spacing-lg;
    padding-bottom: $xingkou-spacing-md;
  }
}

.scene-card {
  flex: 0 0 280px;
  background: white;
  border-radius: $xingkou-border-radius-lg;
  overflow: hidden;
  box-shadow: $xingkou-shadow-sm;
  transition: all $xingkou-transition-base;
  cursor: pointer;
  &:hover { transform: translateY(-4px); box-shadow: $xingkou-shadow-md; }
  
  &__image {
    position: relative;
    height: 180px;
    img { width: 100%; height: 100%; object-fit: cover; }
  }
  
  &__tag {
    position: absolute;
    top: $xingkou-spacing-sm;
    right: $xingkou-spacing-sm;
    padding: $xingkou-spacing-xs $xingkou-spacing-sm;
    background: $xingkou-primary;
    color: white;
    border-radius: $xingkou-border-radius-sm;
    font-size: $xingkou-font-size-xs;
  }
  
  &__content { padding: $xingkou-spacing-lg; }
  &__title { font-size: $xingkou-font-size-lg; font-weight: $xingkou-font-weight-semibold; margin-bottom: $xingkou-spacing-xs; }
  &__desc { font-size: $xingkou-font-size-sm; color: $xingkou-text-secondary; }
}

// Case Section
.case {
  padding: $xingkou-section-padding-y 0;
  background: $xingkou-bg-secondary;
  
  &__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: $xingkou-spacing-xl;
    @media (max-width: $xingkou-breakpoint-tablet) { grid-template-columns: 1fr; }
  }
}

.case-card {
  background: white;
  padding: $xingkou-spacing-xl;
  border-radius: $xingkou-border-radius-lg;
  text-align: center;
  
  &__metric { margin-bottom: $xingkou-spacing-lg; }
  &__value { display: block; font-size: 48px; font-weight: $xingkou-font-weight-bold; color: $xingkou-primary; }
  &__label { font-size: $xingkou-font-size-sm; color: $xingkou-text-muted; }
  &__quote { font-size: $xingkou-font-size-base; color: $xingkou-text-secondary; font-style: italic; margin-bottom: $xingkou-spacing-md; }
  &__school { font-size: $xingkou-font-size-sm; color: $xingkou-text-muted; }
}

// News Section
.news {
  padding: $xingkou-section-padding-y 0;
  
  &__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: $xingkou-spacing-lg;
    @media (max-width: $xingkou-breakpoint-tablet) { grid-template-columns: 1fr; }
  }
}

.news-card {
  padding: $xingkou-spacing-lg;
  background: $xingkou-bg-secondary;
  border-radius: $xingkou-border-radius-md;
  transition: all $xingkou-transition-base;
  cursor: pointer;
  &:hover { background: white; box-shadow: $xingkou-shadow-sm; }
  
  &__category {
    display: inline-block;
    padding: $xingkou-spacing-xs $xingkou-spacing-sm;
    background: rgba($xingkou-primary, 0.1);
    color: $xingkou-primary;
    border-radius: $xingkou-border-radius-sm;
    font-size: $xingkou-font-size-xs;
    margin-bottom: $xingkou-spacing-sm;
  }
  
  &__title { font-size: $xingkou-font-size-base; font-weight: $xingkou-font-weight-semibold; margin-bottom: $xingkou-spacing-sm; line-height: 1.5; }
  &__date { font-size: $xingkou-font-size-sm; color: $xingkou-text-muted; }
}

// CTA Section
.cta {
  padding: $xingkou-section-padding-y 0;
  background: $xingkou-gradient-cta;
  
  &__content { text-align: center; }
  &__title { font-size: $xingkou-font-size-xxxl; font-weight: $xingkou-font-weight-bold; color: white; margin-bottom: $xingkou-spacing-md; }
  &__subtitle { font-size: $xingkou-font-size-lg; color: rgba(255,255,255,0.9); margin-bottom: $xingkou-spacing-xl; }
  &__actions { display: flex; justify-content: center; gap: $xingkou-spacing-md; margin-bottom: $xingkou-spacing-xl; }
  &__trust {
    display: flex;
    justify-content: center;
    gap: $xingkou-spacing-xl;
    color: rgba(255,255,255,0.8);
    font-size: $xingkou-font-size-sm;
  }
}

// Footer
.footer {
  padding: $xingkou-spacing-xxl 0 $xingkou-spacing-xl;
  background: $xingkou-bg-dark;
  color: white;
  
  &__top {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: $xingkou-spacing-xxl;
    margin-bottom: $xingkou-spacing-xxl;
    @media (max-width: $xingkou-breakpoint-tablet) { grid-template-columns: 1fr; text-align: center; }
  }
  
  &__logo {
    display: flex;
    align-items: center;
    gap: $xingkou-spacing-sm;
    margin-bottom: $xingkou-spacing-md;
    @media (max-width: $xingkou-breakpoint-tablet) { justify-content: center; }
  }
  
  &__logo-icon {
    width: 32px;
    height: 32px;
    color: $xingkou-primary-light;
  }
  
  &__desc { color: rgba(255,255,255,0.7); margin-bottom: $xingkou-spacing-lg; }
  &__contact { color: rgba(255,255,255,0.7); font-size: $xingkou-font-size-sm; p { margin-bottom: $xingkou-spacing-xs; } }
  
  &__nav-title { font-size: $xingkou-font-size-base; font-weight: $xingkou-font-weight-semibold; margin-bottom: $xingkou-spacing-md; }
  &__nav-list {
    list-style: none;
    padding: 0;
    margin: 0;
    li { margin-bottom: $xingkou-spacing-sm; }
    a { color: rgba(255,255,255,0.7); text-decoration: none; font-size: $xingkou-font-size-sm; &:hover { color: white; } }
  }
  
  &__bottom {
    text-align: center;
    padding-top: $xingkou-spacing-xl;
    border-top: 1px solid rgba(255,255,255,0.1);
    color: rgba(255,255,255,0.5);
    font-size: $xingkou-font-size-sm;
  }
}
</style>
