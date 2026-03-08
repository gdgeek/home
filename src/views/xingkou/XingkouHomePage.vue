<script setup lang="ts">
/**
 * 星扣品牌首页 - 教育AR创作平台（大陆版）
 * 采用夏鼎风格：专业蓝色主题，简洁专业风格
 * 内容保持星扣原有内容（简体中文）
 */
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useBrand } from '@/composables/useBrand'
import { useNews } from '@/composables/useNews'
import { School, User, OfficeBuilding, FolderOpened, EditPen, VideoCamera, View, Cpu } from '@element-plus/icons-vue'
import LoginModal from '@/components/common/LoginModal.vue'

const { footer } = useBrand()
const buildTime = computed(() => {
  const timestamp = (window as any).__BUILD_TIME__ || new Date().toISOString()
  const date = new Date(timestamp)
  return date.toLocaleString('zh-CN', { 
    year: 'numeric', 
    month: '2-digit', 
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).replace(/\//g, '-')
})

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

// WordPress 博客地址
const blogUrl = computed(() => {
  return (window as any).__WORDPRESS_API_URL__ || 'https://blog.hxgxonline.com'
})

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

// 导航菜单
const navItems = [
  { text: '首页', url: '#' },
  { text: '功能介绍', url: '#feature' },
  { text: '应用场景', url: '#scene' },
  { text: '客户案例', url: '#case' },
  { text: '新闻动态', url: '#news' }
]

// 核心价值
const valueItems = [
  { icon: School, title: '教师赋能', description: '快速制作AR课件、互动实验及教学模型，提升课堂吸引力与教学效率' },
  { icon: User, title: '学生创作', description: '通过AR创作表达学习成果，培养空间思维、创新能力与表达能力' },
  { icon: OfficeBuilding, title: '校园部署', description: '低成本搭建AR教学环境，开展STEAM教育、科创活动' }
]

// 核心功能
const featureItems = [
  { icon: FolderOpened, title: '海量教育素材库', description: '覆盖K12全学科3D模型，与课本同步更新', image: '/images/ar-platform/UGC场景编辑器界面.webp' },
  { icon: EditPen, title: '可视化编辑器', description: '所见即所得，零代码创作AR内容', image: '/images/ar-platform/拖拽程序生成工具.webp' },
  { icon: View, title: '第三方视角投屏', description: '教师可通过平板查看学生AR视角，辅助课堂教学指导', image: '/images/ar-platform/三方视角，用户操作AR医疗头骨内容.webp' },
  { icon: VideoCamera, title: '多终端支持', description: 'iPad、Rokid AR眼镜全面适配', image: '/images/ar-platform/女士操作Rokid AR Studio.webp' }
]

// 应用场景
const sceneItems = [
  { icon: Cpu, title: '医疗护理', description: '婴幼儿护理、外伤处理等医疗科普', tag: '医疗', image: '/images/ar-platform/婴幼儿护理 外伤处理.webp' },
  { icon: VideoCamera, title: '口腔教学', description: '窝沟封闭等口腔医疗操作培训', tag: '口腔', image: '/images/ar-platform/AR医疗 窝沟封闭.webp' },
  { icon: OfficeBuilding, title: '工业展示', description: '掘进机等大型设备1:1还原展示', tag: '工业', image: '/images/ar-platform/AR掘进机展示.webp' },
  { icon: School, title: '互动游戏', description: '多人AR游戏，寓教于乐', tag: '游戏', image: '/images/ar-platform/多人AR游戏，三方视角.webp' }
]

// 用户案例
const caseItems = [
  { company: '北京市第四中学', quote: '星扣AR让物理课堂焕然一新，学生学习兴趣大幅提升。', author: '张老师', role: '物理科教学组长' },
  { company: '上海交通大学附属中学', quote: '学生使用iPad和Rokid AR眼镜进行创作，培养了创新思维和动手能力。', author: '李主任', role: 'STEAM教育负责人' },
  { company: '深圳中学', quote: '零门槛的操作让每位老师都能轻松制作AR课件，大大提升了备课效率。', author: '王校长', role: '教务主任' }
]

// 页脚导航
const footerNavigation = [
  { title: '平台服务', links: [{ text: '创作指南', url: '#' }, { text: '帮助中心', url: '#' }, { text: '素材库', url: '#' }] },
  { title: '关于我们', links: [{ text: '公司介绍', url: '#' }, { text: '联系我们', url: '#' }, { text: '合作伙伴', url: '#' }] }
]
</script>

<template>
  <div class="xingkou-page">
    <!-- Header -->
    <header class="header">
      <div class="header__container">
        <div class="header__logo">
          <img src="/logo/xingkou/LOGO.webp" alt="星扣AR创作平台" class="header__logo-img" />
        </div>
        <nav class="header__nav">
          <a v-for="(item, index) in navItems" :key="index" :href="item.url" class="header__nav-link">
            {{ item.text }}
          </a>
        </nav>
        <button class="header__login-btn" @click="handleOpenLogin">登录</button>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="hero">
      <div class="hero__container">
        <div class="hero__content">
          <h1 class="hero__title">星扣AR创作平台</h1>
          <p class="hero__subtitle">让知识"立"起来</p>
          <p class="hero__desc">专为教育场景打造的轻量化、零门槛AR创作工具，助力师生开启沉浸式教学新体验</p>
          <div class="hero__highlights">
            <span class="hero__tag">课本变立体</span>
            <span class="hero__tag">实验零风险</span>
            <span class="hero__tag">创意可落地</span>
            <span class="hero__tag">知识可互动</span>
          </div>
          <div class="hero__actions">
            <button class="btn btn--primary" @click="handleOpenLogin">立即开始创作</button>
            <button class="btn btn--secondary">查看教学案例</button>
          </div>
        </div>
        <div class="hero__visual">
          <img src="/images/ar-platform/高中生操作AR内容，欢笑.webp" alt="AR教育设备" class="hero__image" />
        </div>
      </div>
    </section>

    <!-- News Section -->
    <section v-if="!error && !loading && news && news.length > 0" id="news" class="news animate-on-scroll">
      <div class="section-container">
        <h2 class="section-title">新闻动态</h2>
        <p class="section-subtitle">了解平台最新资讯与行业动态</p>

        <div class="news__grid">
          <div v-for="(item, index) in news" :key="item.id" class="news-card animate-delay"
            :style="{ animationDelay: `${index * 0.15}s` }" @click="handleOpenNewsDetail(item)">
            <span class="news-card__category">{{ item.category.name }}</span>
            <h3 class="news-card__title">{{ item.title }}</h3>
            <p v-if="item.excerpt" class="news-card__excerpt">{{ item.excerpt }}</p>
            <span class="news-card__date">{{ formatDate(item.date) }}</span>
          </div>
        </div>

        <div class="news__more">
          <a :href="blogUrl" class="news__more-link" target="_blank" rel="noopener">查看更多新闻 →</a>
        </div>
      </div>
    </section>

    <!-- Value Section -->
    <section id="value" class="value animate-on-scroll">
      <div class="section-container">
        <h2 class="section-title">以AR之力，重构教育表达</h2>
        <p class="section-subtitle">我们为教育场景，重新定义AR创作</p>
        <div class="value__grid">
          <div v-for="(item, index) in valueItems" :key="index" class="value-card animate-delay"
            :style="{ animationDelay: `${index * 0.15}s` }">
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
        <h2 class="section-title">简单操作，解锁教育AR无限可能</h2>
        <p class="section-subtitle">零门槛操作，让每位师生都能轻松创作</p>
        <div class="feature__grid">
          <div v-for="(item, index) in featureItems" :key="index" class="feature-card animate-delay"
            :style="{ animationDelay: `${index * 0.2}s` }">
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
        <h2 class="section-title">AR赋能全学科，适配多元教学场景</h2>
        <p class="section-subtitle">从医疗到工业，从教育到娱乐，AR让每个场景都生动起来</p>
        <div class="scene__grid">
          <div v-for="(item, index) in sceneItems" :key="index" class="scene-card animate-delay"
            :style="{ animationDelay: `${index * 0.12}s` }">
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
        <h2 class="section-title">已有众多校园，用星扣解锁AR教学新体验</h2>
        <p class="section-subtitle">听听他们怎么说</p>
        <div class="case__grid">
          <div v-for="(item, index) in caseItems" :key="index" class="case-card animate-delay"
            :style="{ animationDelay: `${index * 0.18}s` }">
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
        <h2 class="cta__title">即刻上手，开启AR教育创作之旅</h2>
        <p class="cta__subtitle">教师、学生、校园用户通用，登录后匹配对应功能与素材权益</p>
        <div class="cta__tags">
          <span class="cta__tag">无广告</span>
          <span class="cta__tag">免费试用</span>
          <span class="cta__tag">专属客服指导</span>
        </div>
        <button class="btn btn--primary btn--large" @click="handleOpenLogin">立即登录</button>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="section-container">
        <div class="footer__grid">
          <div class="footer__brand">
            <h3 class="footer__logo">星扣AR创作平台</h3>
            <p class="footer__desc">专为教育场景打造的AR创作工具</p>
            <div class="footer__contact">
              <p>电话：400-888-8888</p>
              <p>邮箱：contact@xingkou.com</p>
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
          <p style="font-size: 12px; opacity: 0.6; margin-top: 8px;">{{ buildTime }}</p>
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
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
              </svg>
            </button>
            <div v-if="selectedNews" class="news-modal-content">
              <div class="news-detail__header">
                <span class="news-detail__category">{{ selectedNews.category?.name || '新闻' }}</span>
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
// 使用星扣的变量文件，但采用夏鼎的设计风格
// 定义本地变量以匹配夏鼎风格
$primary: #1E40AF;
$primary-light: #3B82F6;
$primary-dark: #1E3A8A;
$secondary: #0F172A;
$accent: #2563EB;

$bg-primary: #F8FAFC;
$bg-secondary: #F1F5F9;
$bg-card: #FFFFFF;
$bg-dark: #0F172A;

$text-primary: #0F172A;
$text-secondary: #334155;
$text-muted: #64748B;
$text-light: #FFFFFF;

$gradient-hero: linear-gradient(180deg, #F8FAFC 0%, #E0F2FE 40%, #DBEAFE 100%);
$gradient-cta: linear-gradient(135deg, #1E40AF 0%, #2563EB 40%, #3B82F6 100%);
$gradient-card: linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 50%, #F1F5F9 100%);

$shadow-sm: 0 1px 2px rgba(15, 23, 42, 0.05);
$shadow-md: 0 4px 6px rgba(15, 23, 42, 0.08);
$shadow-lg: 0 10px 25px rgba(15, 23, 42, 0.12);
$shadow-card: 0 4px 20px rgba(15, 23, 42, 0.08);

$border-color: #E2E8F0;
$border-radius-sm: 4px;
$border-radius-md: 8px;
$border-radius-lg: 12px;
$border-radius-xl: 16px;
$border-radius-full: 9999px;

$spacing-xs: 4px;
$spacing-sm: 8px;
$spacing-md: 16px;
$spacing-lg: 24px;
$spacing-xl: 32px;
$spacing-xxl: 48px;
$spacing-xxxl: 64px;

$font-family: 'PingFang SC', 'Microsoft YaHei', 'Noto Sans SC', sans-serif;
$font-size-xs: 12px;
$font-size-sm: 14px;
$font-size-base: 16px;
$font-size-lg: 18px;
$font-size-xl: 20px;
$font-size-xxl: 24px;
$font-size-xxxl: 32px;
$font-size-display: 40px;
$font-size-hero: 48px;

$font-weight-normal: 400;
$font-weight-medium: 500;
$font-weight-semibold: 600;
$font-weight-bold: 700;

$line-height-tight: 1.25;
$line-height-normal: 1.5;
$line-height-relaxed: 1.75;

$breakpoint-mobile: 640px;
$breakpoint-tablet: 768px;
$breakpoint-desktop: 1024px;
$breakpoint-wide: 1280px;

$container-max-width: 1200px;
$container-padding: 24px;

$transition-fast: 150ms;
$transition-base: 300ms;
$transition-slow: 500ms;
$ease-out: cubic-bezier(0.16, 1, 0.3, 1);

$section-padding-y: 80px;
$section-padding-y-mobile: 48px;

$touch-target-min: 44px;

.xingkou-page {
  font-family: $font-family;
  color: $text-primary;
  background: $bg-primary;
  overflow-x: hidden;
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  ::selection {
    background: rgba($primary, 0.2);
    color: $text-primary;
  }

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: $bg-secondary;
  }

  ::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, $primary, $primary-light);
    border-radius: 5px;

    &:hover {
      background: linear-gradient(180deg, $primary-dark, $primary);
    }
  }
}

.section-container {
  max-width: $container-max-width;
  margin: 0 auto;
  padding: 0 $container-padding;
}

.section-title {
  font-size: $font-size-xxxl;
  font-weight: $font-weight-bold;
  text-align: center;
  margin-bottom: $spacing-md;
  color: $text-primary;
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
    background: $gradient-cta;
    border-radius: 2px;
  }

  @media (max-width: $breakpoint-mobile) {
    font-size: $font-size-xxl;
  }
}

.section-subtitle {
  font-size: $font-size-lg;
  text-align: center;
  color: $text-secondary;
  margin-bottom: $spacing-xxl;
  margin-top: $spacing-lg;
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
  border-bottom: 1px solid $border-color;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.05);
  transition: all $transition-base;

  &:hover {
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.08);
  }

  &__container {
    max-width: $container-max-width;
    margin: 0 auto;
    padding: $spacing-md $container-padding;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__logo {
    display: flex;
    align-items: center;
    transition: transform $transition-fast;

    &:hover {
      transform: scale(1.02);
    }
  }

  &__logo-img {
    height: 42px;
    width: auto;
    object-fit: contain;
  }

  &__nav {
    display: flex;
    gap: $spacing-xl;

    @media (max-width: $breakpoint-tablet) {
      display: none;
    }
  }

  &__nav-link {
    font-size: $font-size-base;
    color: $text-secondary;
    text-decoration: none;
    transition: all $transition-fast;
    position: relative;
    padding: 4px 0;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 2px;
      background: $primary;
      transition: width $transition-base;
    }

    &:hover {
      color: $primary;

      &::after {
        width: 100%;
      }
    }
  }

  &__login-btn {
    padding: $spacing-sm $spacing-lg;
    background: $gradient-cta;
    color: $text-light;
    border: none;
    border-radius: $border-radius-md;
    font-size: $font-size-sm;
    cursor: pointer;
    transition: all $transition-fast;
    box-shadow: 0 4px 15px rgba($primary, 0.3);
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
      transition: left 0.5s;
    }

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 25px rgba($primary, 0.4);

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
  padding: $spacing-md $spacing-xl;
  font-size: $font-size-base;
  font-weight: $font-weight-medium;
  border-radius: $border-radius-md;
  border: none;
  cursor: pointer;
  transition: all $transition-base $ease-out;
  min-height: $touch-target-min;
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
    background: $gradient-cta;
    color: $text-light;
    box-shadow: 0 4px 20px rgba($primary, 0.3);

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 30px rgba($primary, 0.4);
    }

    &:active {
      transform: translateY(-1px);
    }
  }

  &--secondary {
    background: $bg-card;
    color: $primary;
    border: 2px solid $primary;
    position: relative;
    z-index: 1;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 0;
      height: 100%;
      background: $gradient-cta;
      transition: width 0.3s ease;
      z-index: -1;
    }

    &:hover {
      color: $text-light;

      &::before {
        width: 100%;
      }

      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba($primary, 0.2);
    }
  }

  &--large {
    padding: $spacing-lg $spacing-xxl;
    font-size: $font-size-lg;
  }
}

// Hero Section
.hero {
  padding: calc($spacing-xxxl + 80px) 0 $spacing-xxxl;
  background: $gradient-hero;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba($primary, 0.05) 0%, transparent 70%);
    animation: float 20s ease-in-out infinite;
  }

  &__container {
    max-width: $container-max-width;
    margin: 0 auto;
    padding: 0 $container-padding;
    display: flex;
    align-items: center;
    gap: $spacing-xxxl;
    position: relative;
    z-index: 1;

    @media (max-width: $breakpoint-tablet) {
      flex-direction: column;
      text-align: center;
    }
  }

  &__content {
    flex: 1;
    animation: slideInLeft 0.8s ease-out;
  }

  &__title {
    font-size: $font-size-hero;
    font-weight: $font-weight-bold;
    background: linear-gradient(135deg, $primary-dark 0%, $primary 50%, $accent 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: $spacing-sm;
    line-height: 1.2;

    @media (max-width: $breakpoint-mobile) {
      font-size: $font-size-xxxl;
    }
  }

  &__subtitle {
    font-size: $font-size-xxl;
    color: $text-primary;
    margin-bottom: $spacing-lg;
    font-weight: $font-weight-semibold;
  }

  &__desc {
    font-size: $font-size-lg;
    color: $text-secondary;
    line-height: $line-height-relaxed;
    margin-bottom: $spacing-xl;
  }

  &__highlights {
    display: flex;
    flex-wrap: wrap;
    gap: $spacing-sm;
    margin-bottom: $spacing-xl;

    @media (max-width: $breakpoint-tablet) {
      justify-content: center;
    }
  }

  &__tag {
    padding: $spacing-xs $spacing-md;
    background: rgba($primary, 0.08);
    color: $primary-dark;
    border-radius: $border-radius-full;
    font-size: $font-size-sm;
    border: 1px solid rgba($primary, 0.2);
    transition: all $transition-fast;

    &:hover {
      background: rgba($primary, 0.15);
      transform: translateY(-2px);
      box-shadow: 0 2px 8px rgba($primary, 0.15);
    }
  }

  &__actions {
    display: flex;
    gap: $spacing-md;

    @media (max-width: $breakpoint-tablet) {
      justify-content: center;
    }

    @media (max-width: $breakpoint-mobile) {
      flex-direction: column;
    }
  }

  &__visual {
    flex: 1;
    max-width: 500px;
    animation: slideInRight 0.8s ease-out 0.2s both;
    position: relative;
  }

  &__image {
    width: 100%;
    border-radius: $border-radius-xl;
    box-shadow: $shadow-lg;
    transition: all $transition-base;
    position: relative;
    z-index: 2;

    &:hover {
      transform: scale(1.02) rotate(1deg);
      box-shadow: 0 20px 50px rgba($primary, 0.2);
    }
  }

  &__visual::before {
    content: '';
    position: absolute;
    top: -20px;
    right: -20px;
    width: 100%;
    height: 100%;
    background: $gradient-cta;
    border-radius: $border-radius-xl;
    z-index: 1;
    opacity: 0.3;
    filter: blur(30px);
  }
}


// Value Section
.value {
  padding: $section-padding-y 0;
  background: $bg-card;
  position: relative;

  &__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: $spacing-xl;

    @media (max-width: $breakpoint-tablet) {
      grid-template-columns: 1fr;
    }
  }
}

.value-card {
  text-align: center;
  padding: $spacing-xl;
  background: $gradient-card;
  border-radius: $border-radius-lg;
  border: 1px solid $border-color;
  transition: all $transition-base $ease-out;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: $gradient-cta;
    transform: scaleX(0);
    transition: transform 0.4s ease;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba($primary, 0.15);
    border-color: rgba($primary, 0.3);

    &::before {
      transform: scaleX(1);
    }
  }

  &__icon {
    width: 64px;
    height: 64px;
    margin: 0 auto $spacing-lg;
    display: flex;
    align-items: center;
    justify-content: center;
    background: $gradient-cta;
    border-radius: 50%;
    color: $text-light;
    box-shadow: 0 8px 20px rgba($primary, 0.3);
    transition: all $transition-base;
    position: relative;
    z-index: 1;

    :deep(svg) {
      width: 32px !important;
      height: 32px !important;
    }

    .value-card:hover & {
      transform: scale(1.1) rotate(5deg);
      box-shadow: 0 12px 30px rgba($primary, 0.4);
    }
  }

  &__title {
    font-size: $font-size-xl;
    font-weight: $font-weight-semibold;
    margin-bottom: $spacing-sm;
    color: $text-primary;
    position: relative;
    z-index: 1;
  }

  &__desc {
    font-size: $font-size-base;
    color: $text-secondary;
    line-height: $line-height-relaxed;
    position: relative;
    z-index: 1;
  }
}

// Feature Section
.feature {
  padding: $section-padding-y 0;
  background: $bg-secondary;
  position: relative;

  &__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: $spacing-xl;

    @media (max-width: $breakpoint-tablet) {
      grid-template-columns: 1fr;
    }
  }
}

.feature-card {
  background: $bg-card;
  border-radius: $border-radius-lg;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  transition: all $transition-base $ease-out;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 2px solid transparent;
    border-radius: $border-radius-lg;
    transition: all $transition-base;
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 50px rgba($primary, 0.15);

    &::after {
      border-color: rgba($primary, 0.3);
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
    padding: $spacing-lg;
    position: relative;
    z-index: 1;
  }

  &__icon {
    width: 40px;
    height: 40px;
    margin-bottom: $spacing-sm;
    display: flex;
    align-items: center;
    justify-content: center;
    background: $gradient-cta;
    border-radius: $border-radius-md;
    color: $text-light;
    box-shadow: 0 4px 12px rgba($primary, 0.25);
    transition: transform 0.3s ease;

    :deep(svg) {
      width: 20px !important;
      height: 20px !important;
    }

    .feature-card:hover & {
      transform: scale(1.1);
    }
  }

  &__title {
    font-size: $font-size-lg;
    font-weight: $font-weight-semibold;
    margin-bottom: $spacing-sm;
    color: $text-primary;
  }

  &__desc {
    font-size: $font-size-base;
    color: $text-secondary;
    line-height: $line-height-relaxed;
  }
}

// Scene Section
.scene {
  padding: $section-padding-y 0;
  background: $bg-card;

  &__grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: $spacing-lg;

    @media (max-width: $breakpoint-desktop) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: $breakpoint-mobile) {
      grid-template-columns: 1fr;
    }
  }
}

.scene-card {
  background: $bg-card;
  border-radius: $border-radius-md;
  overflow: hidden;
  border: 1px solid $border-color;
  transition: all $transition-base $ease-out;
  cursor: pointer;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: $gradient-cta;
    opacity: 0;
    transition: opacity 0.4s ease;
    z-index: 1;
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba($primary, 0.15);
    border-color: rgba($primary, 0.4);

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
    top: $spacing-sm;
    left: $spacing-sm;
    padding: $spacing-xs $spacing-sm;
    background: $gradient-cta;
    color: $text-light;
    border-radius: $border-radius-sm;
    font-size: $font-size-xs;
    box-shadow: 0 2px 8px rgba($primary, 0.3);
    z-index: 2;
    font-weight: $font-weight-medium;
  }

  &__content {
    padding: $spacing-md;
    position: relative;
    z-index: 2;
  }

  &__icon {
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: $gradient-cta;
    border-radius: $border-radius-md;
    color: $text-light;
    margin-bottom: $spacing-sm;
    box-shadow: 0 4px 12px rgba($primary, 0.25);
    transition: all 0.3s ease;

    :deep(svg) {
      width: 24px !important;
      height: 24px !important;
    }

    .scene-card:hover & {
      transform: scale(1.1) rotate(5deg);
      box-shadow: 0 6px 16px rgba($primary, 0.35);
    }
  }

  &__title {
    font-size: $font-size-base;
    font-weight: $font-weight-semibold;
    margin-bottom: $spacing-xs;
    color: $text-primary;
    transition: color 0.3s ease;

    .scene-card:hover & {
      color: $primary;
    }
  }

  &__desc {
    font-size: $font-size-sm;
    color: $text-secondary;
  }
}

// Case Section
.case {
  padding: $section-padding-y 0;
  background: $bg-secondary;

  &__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: $spacing-xl;

    @media (max-width: $breakpoint-tablet) {
      grid-template-columns: 1fr;
    }
  }
}

.case-card {
  background: $bg-card;
  padding: $spacing-xl;
  border-radius: $border-radius-lg;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  transition: all $transition-base;
  position: relative;
  overflow: hidden;

  &::before {
    content: '"';
    position: absolute;
    top: 10px;
    left: 20px;
    font-size: 80px;
    font-weight: bold;
    color: rgba($primary, 0.08);
    font-family: Georgia, serif;
    line-height: 1;
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 16px 40px rgba($primary, 0.12);
  }

  &__quote {
    font-size: $font-size-base;
    color: $text-secondary;
    line-height: $line-height-relaxed;
    margin-bottom: $spacing-lg;
    font-style: italic;
    position: relative;
    z-index: 1;
  }

  &__author {
    display: flex;
    flex-direction: column;
    gap: $spacing-xs;
    position: relative;
    z-index: 1;
  }

  &__name {
    font-weight: $font-weight-semibold;
    color: $text-primary;
    font-size: $font-size-lg;
  }

  &__role {
    font-size: $font-size-sm;
    color: $text-muted;
  }

  &__company {
    font-size: $font-size-sm;
    color: $primary;
    font-weight: $font-weight-medium;
  }
}


// News Section
.news {
  padding: $section-padding-y 0;
  background: $bg-card;

  &__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: $spacing-lg;
    margin-bottom: $spacing-xl;

    @media (max-width: $breakpoint-tablet) {
      grid-template-columns: 1fr;
    }
  }

  &__more {
    text-align: center;
  }

  &__more-link {
    color: $primary;
    text-decoration: none;
    font-weight: $font-weight-medium;
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
      background: $primary;
      transition: width 0.3s ease;
    }

    &:hover {
      &::after {
        width: 100%;
      }
    }
  }
}

.news-card {
  background: $bg-secondary;
  padding: $spacing-lg;
  border-radius: $border-radius-md;
  border: 1px solid $border-color;
  transition: all $transition-base;
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
    background: $gradient-cta;
    transform: scaleY(0);
    transition: transform 0.3s ease;
  }

  &:hover {
    border-color: $primary;
    box-shadow: 0 8px 25px rgba($primary, 0.1);
    transform: translateX(4px);

    &::before {
      transform: scaleY(1);
    }
  }

  &__category {
    display: inline-block;
    padding: $spacing-xs $spacing-sm;
    background: $gradient-cta;
    color: $text-light;
    border-radius: $border-radius-sm;
    font-size: $font-size-xs;
    margin-bottom: $spacing-sm;
    font-weight: $font-weight-medium;
  }

  &__title {
    font-size: $font-size-base;
    font-weight: $font-weight-semibold;
    color: $text-primary;
    margin-bottom: $spacing-sm;
    line-height: $line-height-normal;
    transition: color 0.3s ease;

    .news-card:hover & {
      color: $primary;
    }
  }

  &__excerpt {
    font-size: $font-size-sm;
    color: $text-secondary;
    margin-bottom: $spacing-sm;
    line-height: $line-height-relaxed;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  &__date {
    font-size: $font-size-sm;
    color: $text-muted;
  }
}

// CTA Section
.cta {
  padding: $section-padding-y 0;
  background: $gradient-cta;
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
    background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 60%);
    animation: rotate 30s linear infinite;
  }

  &__title {
    font-size: $font-size-xxxl;
    font-weight: $font-weight-bold;
    color: $text-light;
    margin-bottom: $spacing-md;
    position: relative;
    z-index: 1;

    @media (max-width: $breakpoint-mobile) {
      font-size: $font-size-xxl;
    }
  }

  &__subtitle {
    font-size: $font-size-lg;
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: $spacing-xl;
    position: relative;
    z-index: 1;
  }

  &__tags {
    display: flex;
    justify-content: center;
    gap: $spacing-md;
    margin-bottom: $spacing-xl;
    flex-wrap: wrap;
    position: relative;
    z-index: 1;
  }

  &__tag {
    padding: $spacing-xs $spacing-md;
    background: rgba(255, 255, 255, 0.2);
    color: $text-light;
    border-radius: $border-radius-full;
    font-size: $font-size-sm;
    border: 1px solid rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: translateY(-2px);
    }
  }

  .btn--primary {
    background: $bg-card;
    color: $primary-dark;
    position: relative;
    z-index: 1;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);

    &:hover {
      background: $text-light;
      transform: translateY(-4px);
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.25);
    }
  }
}

// Footer
.footer {
  padding: $spacing-xxl 0 $spacing-xl;
  background: $bg-dark;
  color: $text-light;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: $gradient-cta;
  }

  &__grid {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    gap: $spacing-xxl;
    margin-bottom: $spacing-xxl;

    @media (max-width: $breakpoint-tablet) {
      grid-template-columns: 1fr;
      text-align: center;
    }
  }

  &__logo {
    font-size: $font-size-xl;
    font-weight: $font-weight-bold;
    margin-bottom: $spacing-md;
    background: $gradient-cta;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    display: inline-block;
  }

  &__desc {
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: $spacing-lg;
  }

  &__contact {
    color: rgba(255, 255, 255, 0.7);
    font-size: $font-size-sm;

    p {
      margin-bottom: $spacing-xs;
    }
  }

  &__nav-title {
    font-size: $font-size-base;
    font-weight: $font-weight-semibold;
    margin-bottom: $spacing-md;
  }

  &__nav-list {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      margin-bottom: $spacing-sm;
    }

    a {
      color: rgba(255, 255, 255, 0.7);
      text-decoration: none;
      font-size: $font-size-sm;
      transition: all $transition-fast;
      position: relative;
      padding-left: 0;

      &:hover {
        color: $text-light;
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
    padding-top: $spacing-xl;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.5);
    font-size: $font-size-sm;
  }
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
  padding: $spacing-lg;
}

.news-modal-container {
  background: $bg-card;
  border-radius: $border-radius-lg;
  max-width: 700px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
}

.news-modal-close {
  position: absolute;
  top: $spacing-md;
  right: $spacing-md;
  background: $bg-secondary;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: $text-secondary;
  transition: all 0.3s ease;
  z-index: 1;

  &:hover {
    background: $primary;
    color: $text-light;
  }
}

.news-modal-content {
  padding: $spacing-xl;
}

.news-detail {
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: $spacing-md;
    padding-bottom: $spacing-md;
    border-bottom: 1px solid $border-color;
  }

  &__category {
    display: inline-block;
    padding: $spacing-xs $spacing-sm;
    background: $gradient-cta;
    color: $text-light;
    border-radius: $border-radius-sm;
    font-size: $font-size-xs;
    font-weight: $font-weight-medium;
  }

  &__date {
    font-size: $font-size-sm;
    color: $text-muted;
  }

  &__title {
    font-size: $font-size-xxl;
    font-weight: $font-weight-bold;
    color: $text-primary;
    margin-bottom: $spacing-lg;
    line-height: $line-height-normal;
  }

  &__excerpt {
    font-size: $font-size-base;
    color: $text-secondary;
    line-height: $line-height-relaxed;
    margin-bottom: $spacing-lg;
    padding: $spacing-md;
    background: $bg-secondary;
    border-radius: $border-radius-md;
    border-left: 4px solid $primary;
  }

  &__content {
    font-size: $font-size-base;
    color: $text-primary;
    line-height: $line-height-relaxed;

    :deep(p) {
      margin-bottom: $spacing-md;
    }

    :deep(img) {
      max-width: 100%;
      border-radius: $border-radius-md;
      margin: $spacing-md 0;
    }

    :deep(h1),
    :deep(h2),
    :deep(h3),
    :deep(h4) {
      margin-top: $spacing-lg;
      margin-bottom: $spacing-md;
      font-weight: $font-weight-semibold;
      color: $text-primary;
    }
  }
}

// Animations
@keyframes float {
  0%, 100% {
    transform: translate(0, 0) rotate(0deg);
  }
  25% {
    transform: translate(2%, 2%) rotate(1deg);
  }
  50% {
    transform: translate(0, 4%) rotate(0deg);
  }
  75% {
    transform: translate(-2%, 2%) rotate(-1deg);
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

// Modal transitions
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
