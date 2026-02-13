<script setup lang="ts">
/**
 * 星扣品牌首页 - 教育AR创作平台（大陆版）
 * 严肃教育蓝风格，简体中文
 */
import { ref } from 'vue'
import { useBrand } from '@/composables/useBrand'
import { School, User, OfficeBuilding, FolderOpened, EditPen, VideoCamera, View, Cpu } from '@element-plus/icons-vue'
import LoginModal from '@/components/common/LoginModal.vue'

const { footer } = useBrand()
const showLoginModal = ref(false)

const handleOpenLogin = () => {
  showLoginModal.value = true
}

// 导航菜单
const navItems = [
  { text: '首页', url: '#' },
  { text: '新闻资讯', url: '#news' },
  { text: '功能介绍', url: '#feature' },
  { text: '应用场景', url: '#scene' },
  { text: '成功案例', url: '#case' }
]

// 核心价值 - 卡片式布局
const valueItems = [
  { icon: School, title: '教师赋能', subtitle: '3分钟制作AR课件', description: '无需编程基础，拖拽即可完成AR内容创作，让备课效率提升10倍', color: '#4A5F7F' },
  { icon: User, title: '学生创作', subtitle: '激发无限创意', description: '学生可自主创作AR作品，培养空间思维和创新能力', color: '#2C4A6B' },
  { icon: OfficeBuilding, title: '校园部署', subtitle: '一站式解决方案', description: '提供完整的AR教学环境搭建方案，助力学校数字化转型', color: '#3A5A8A' }
]

// 核心功能 - 大图展示
const featureItems = [
  { icon: FolderOpened, title: '海量教育素材库', desc: '覆盖K12全学科3D模型，与课本同步更新', image: '/images/ar-platform/UGC场景编辑器界面.png' },
  { icon: EditPen, title: '可视化编辑器', desc: '所见即所得，零代码创作AR内容', image: '/images/ar-platform/拖拽程序生成工具.png' },
  { icon: VideoCamera, title: '多人协作', desc: '支持师生实时互动，课堂更精彩', image: '/images/ar-platform/多人AR游戏，三方视角.png' },
  { icon: View, title: '第三方视角呈现', desc: '多角度观察AR内容，提升学习体验', image: '/images/ar-platform/third-person-view.png' },
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
    <!-- 装饰性背景元素 -->
    <div class="decorative">
      <!-- 圆形装饰元素 -->
      <div class="decorative__circle decorative__circle--1"></div>
      <div class="decorative__circle decorative__circle--2"></div>
      <div class="decorative__circle decorative__circle--3"></div>
      
      <!-- 方形装饰元素 -->
      <div class="decorative__square decorative__square--1"></div>
      <div class="decorative__square decorative__square--2"></div>
      <div class="decorative__square decorative__square--3"></div>
      
      <!-- 三角形装饰元素 -->
      <div class="decorative__triangle decorative__triangle--1"></div>
      <div class="decorative__triangle decorative__triangle--2"></div>
      <div class="decorative__triangle decorative__triangle--3"></div>
      
      <!-- 线条装饰元素 -->
      <div class="decorative__line decorative__line--horizontal decorative__line--horizontal--1"></div>
      <div class="decorative__line decorative__line--horizontal decorative__line--horizontal--2"></div>
      <div class="decorative__line decorative__line--horizontal decorative__line--horizontal--3"></div>
      <div class="decorative__line decorative__line--vertical decorative__line--vertical--1"></div>
      <div class="decorative__line decorative__line--vertical decorative__line--vertical--2"></div>
      <div class="decorative__line decorative__line--vertical decorative__line--vertical--3"></div>
      <div class="decorative__line decorative__line--diagonal decorative__line--diagonal--1"></div>
      <div class="decorative__line decorative__line--diagonal decorative__line--diagonal--2"></div>
      
      <!-- 波浪线装饰元素 -->
      <div class="decorative__wave decorative__wave--1"></div>
      <div class="decorative__wave decorative__wave--2"></div>
      
      <!-- 抽象面状图形 -->
      <div class="decorative__blob decorative__blob--1"></div>
      <div class="decorative__blob decorative__blob--2"></div>
      <div class="decorative__blob decorative__blob--3"></div>
    </div>
    
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
          <!-- 科技感装饰元素 -->
          <div class="tech-cube hero__cube--1"></div>
          <div class="tech-gear hero__gear--1"></div>
          <div class="tech-gear hero__gear--2"></div>
          <div class="tech-smoke tech-smoke--1"></div>
          <div class="tech-smoke tech-smoke--2"></div>
          
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
          <h2 class="section-title">核心价值</h2>
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
          <span class="section-tag">功能介绍</span>
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
          <h2 class="section-title">成功案例</h2>
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

// 3D立方体效果
.tech-cube {
  position: relative;
  width: 60px;
  height: 60px;
  transform-style: preserve-3d;
  animation: rotateCube 10s infinite linear;
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    background: linear-gradient(45deg, $xingkou-primary, $xingkou-primary-light);
    border: 1px solid rgba(255, 255, 255, 0.25);
    box-shadow: $xingkou-shadow-glow;
  }
  
  &::before {
    width: 100%;
    height: 100%;
    transform: rotateY(0deg) translateZ(30px);
  }
  
  &::after {
    width: 100%;
    height: 100%;
    transform: rotateY(90deg) translateZ(30px);
  }
}

@keyframes rotateCube {
  0% { transform: rotateX(0deg) rotateY(0deg); }
  100% { transform: rotateX(360deg) rotateY(360deg); }
}

// 齿轮图标效果
.tech-gear {
  position: relative;
  width: 40px;
  height: 40px;
  animation: rotateGear 8s infinite linear;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, $xingkou-primary-light 30%, transparent 70%);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    opacity: 0.7;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: conic-gradient(from 0deg, $xingkou-primary, $xingkou-primary-light, $xingkou-primary);
    border-radius: 50%;
    mask: radial-gradient(circle at center, transparent 40%, black 40%);
    -webkit-mask: radial-gradient(circle at center, transparent 40%, black 40%);
  }
}

@keyframes rotateGear {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

// 烟雾效果
.tech-smoke {
  position: absolute;
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%);
  backdrop-filter: blur(8px);
  border-radius: 50%;
  opacity: 0;
  animation: smokeEffect 4s infinite ease-in-out;
  pointer-events: none;
  
  &--1 {
    top: 10%;
    left: 5%;
    animation-delay: 0s;
  }
  
  &--2 {
    top: 60%;
    right: 10%;
    animation-delay: 1s;
  }
  
  &--3 {
    bottom: 20%;
    left: 15%;
    animation-delay: 2s;
  }
}

@keyframes smokeEffect {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  50% {
    opacity: 0.5;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(1.5);
  }
}

// 数据流线条
.tech-data-flow {
  position: absolute;
  background: linear-gradient(90deg, transparent, $xingkou-primary-light, transparent);
  height: 1px;
  opacity: 0.7;
  animation: dataFlow 3s infinite linear;
  
  &--1 {
    top: 15%;
    left: 0;
    width: 100%;
    animation-delay: 0s;
  }
  
  &--2 {
    top: 30%;
    left: 0;
    width: 100%;
    animation-delay: 1s;
  }
  
  &--3 {
    top: 45%;
    left: 0;
    width: 100%;
    animation-delay: 2s;
  }
  
  &--4 {
    top: 60%;
    left: 0;
    width: 100%;
    animation-delay: 1.5s;
  }
  
  &--5 {
    top: 75%;
    left: 0;
    width: 100%;
    animation-delay: 0.5s;
  }
}

@keyframes dataFlow {
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  10% {
    opacity: 0.7;
  }
  90% {
    opacity: 0.7;
  }
  100% {
    transform: translateX(100%);
    opacity: 0;
  }
}

// 全息效果
.tech-hologram {
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.25), transparent);
    animation: hologramScan 3s infinite linear;
  }
}

@keyframes hologramScan {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}

.xingkou-page {
  font-family: $xingkou-font-family;
  color: #1E3A8A;
  background: #F0F9FF;
  position: relative;
  overflow-x: hidden;
  
  // 添加网格背景
  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
      linear-gradient(rgba(59, 130, 246, 0.15) 1px, transparent 1px),
      linear-gradient(90deg, rgba(59, 130, 246, 0.15) 1px, transparent 1px);
    background-size: 50px 50px;
    background-position: -25px -25px;
    pointer-events: none;
    z-index: -1;
  }
}

// 装饰性背景元素
.decorative {
  position: fixed;
  pointer-events: none;
  z-index: 0;
  
  // 圆形装饰元素
  &__circle {
    position: absolute;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(96, 165, 250, 0.25) 0%, transparent 70%);
    
    &--1 {
      width: 800px;
      height: 800px;
      top: -300px;
      right: -300px;
      animation: pulse 8s ease-in-out infinite;
    }
    
    &--2 {
      width: 600px;
      height: 600px;
      bottom: -200px;
      left: -200px;
      animation: pulse 10s ease-in-out infinite 2s;
    }
    
    &--3 {
      width: 500px;
      height: 500px;
      top: 35%;
      left: 3%;
      animation: pulse 12s ease-in-out infinite 4s;
    }
  }
  
  // 方形装饰元素
  &__square {
    position: absolute;
    border: 2px solid rgba(96, 165, 250, 0.25);
    background: rgba(147, 197, 253, 0.12);
    animation: rotate 20s linear infinite;
    
    &--1 {
      width: 280px;
      height: 280px;
      top: 18%;
      right: 8%;
      animation-delay: 0s;
    }
    
    &--2 {
      width: 220px;
      height: 220px;
      bottom: 28%;
      left: 6%;
      animation-delay: 5s;
      animation-direction: reverse;
    }
    
    &--3 {
      width: 160px;
      height: 160px;
      top: 58%;
      right: 4%;
      animation-delay: 10s;
    }
  }
  
  // 三角形装饰元素
  &__triangle {
    position: absolute;
    width: 0;
    height: 0;
    border-left: 70px solid transparent;
    border-right: 70px solid transparent;
    border-bottom: 120px solid rgba(147, 197, 253, 0.2);
    animation: float 6s ease-in-out infinite;
    
    &--1 {
      top: 12%;
      left: 12%;
      animation-delay: 0s;
    }
    
    &--2 {
      top: 68%;
      right: 12%;
      animation-delay: 3s;
      transform: rotate(180deg);
    }
    
    &--3 {
      bottom: 18%;
      left: 22%;
      animation-delay: 6s;
    }
  }
  
  // 线条装饰元素
  &__line {
    position: absolute;
    background: linear-gradient(90deg, transparent, rgba(147, 197, 253, 0.4), transparent);
    
    &--horizontal {
      height: 2px;
      width: 400px;
      animation: slide 15s linear infinite;
      
      &--1 {
        top: 22%;
        left: 0;
        animation-delay: 0s;
      }
      
      &--2 {
        top: 48%;
        left: 0;
        animation-delay: 5s;
      }
      
      &--3 {
        top: 72%;
        left: 0;
        animation-delay: 10s;
      }
    }
    
    &--vertical {
      width: 2px;
      height: 280px;
      background: linear-gradient(180deg, transparent, rgba(147, 197, 253, 0.3), transparent);
      animation: slideVertical 12s linear infinite;
      
      &--1 {
        top: 0;
        left: 18%;
        animation-delay: 0s;
      }
      
      &--2 {
        top: 0;
        right: 22%;
        animation-delay: 4s;
      }
      
      &--3 {
        top: 0;
        left: 72%;
        animation-delay: 8s;
      }
    }
    
    &--diagonal {
      width: 500px;
      height: 2px;
      transform: rotate(45deg);
      animation: slide 18s linear infinite;
      
      &--1 {
        top: 28%;
        left: -120px;
        animation-delay: 0s;
      }
      
      &--2 {
        top: 58%;
        right: -120px;
        animation-delay: 9s;
      }
    }
  }
  
  // 波浪线装饰元素
  &__wave {
    position: absolute;
    width: 100%;
    height: 120px;
    opacity: 0.25;
    animation: waveMove 10s linear infinite;
    
    &--1 {
      top: 8%;
      background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%233B82F6' fill-opacity='0.25' d='M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z'%3E%3C/path%3E%3C/svg%3E") no-repeat;
      background-size: cover;
      animation-delay: 0s;
    }
    
    &--2 {
      bottom: 12%;
      background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%233B82F6' fill-opacity='0.2' d='M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E") no-repeat;
      background-size: cover;
      animation-delay: 5s;
    }
  }
  
  // 抽象面状图形
  &__blob {
    position: absolute;
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.25) 0%, rgba(147, 197, 253, 0.15) 100%);
    filter: blur(40px);
    animation: blobMove 15s ease-in-out infinite;
    
    &--1 {
      width: 650px;
      height: 520px;
      top: 8%;
      right: 4%;
      border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
      animation-delay: 0s;
    }
    
    &--2 {
      width: 520px;
      height: 455px;
      bottom: 18%;
      left: 8%;
      border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
      animation-delay: 5s;
    }
    
    &--3 {
      width: 400px;
      height: 400px;
      top: 48%;
      left: 48%;
      border-radius: 40% 60% 60% 40% / 70% 30% 70% 30%;
      animation-delay: 10s;
    }
  }
}

// 装饰元素动画
@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 0.9; }
  50% { transform: scale(1.15); opacity: 0.7; }
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  25% { transform: translateY(-15px) rotate(2deg); }
  50% { transform: translateY(-30px) rotate(0deg); }
  75% { transform: translateY(-15px) rotate(-2deg); }
}

@keyframes slide {
  0% { transform: translateX(-100%); opacity: 0; }
  20% { opacity: 1; }
  80% { opacity: 1; }
  100% { transform: translateX(100%); opacity: 0; }
}

@keyframes slideVertical {
  0% { transform: translateY(-100%); opacity: 0; }
  20% { opacity: 1; }
  80% { opacity: 1; }
  100% { transform: translateY(100%); opacity: 0; }
}

@keyframes waveMove {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

@keyframes blobMove {
  0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); }
  25% { transform: translate(30px, -30px) rotate(8deg) scale(1.05); }
  50% { transform: translate(0, 30px) rotate(0deg) scale(1); }
  75% { transform: translate(-30px, -30px) rotate(-8deg) scale(1.05); }
}

// 装饰元素响应式设计
@media (max-width: 1024px) {
  .decorative {
    // 圆形装饰元素调整
    &__circle--1 {
      width: 600px;
      height: 600px;
      top: -250px;
      right: -250px;
    }
    
    &__circle--2 {
      width: 500px;
      height: 500px;
      bottom: -150px;
      left: -150px;
    }
    
    &__circle--3 {
      width: 400px;
      height: 400px;
      top: 38%;
      left: 2%;
    }
    
    // 方形装饰元素调整
    &__square--1 {
      width: 240px;
      height: 240px;
      top: 22%;
      right: 6%;
    }
    
    &__square--2 {
      width: 190px;
      height: 190px;
      bottom: 32%;
      left: 4%;
    }
    
    &__square--3 {
      width: 130px;
      height: 130px;
      top: 62%;
      right: 3%;
    }
    
    // 三角形装饰元素调整
    &__triangle {
      border-left-width: 60px;
      border-right-width: 60px;
      border-bottom-width: 104px;
    }
    
    // 线条装饰元素调整
    &__line--horizontal {
      width: 320px;
    }
    
    &__line--vertical {
      height: 240px;
    }
    
    &__line--diagonal {
      width: 420px;
    }
    
    // 波浪线装饰元素调整
    &__wave {
      height: 100px;
    }
    
    // 抽象面状图形调整
    &__blob--1 {
      width: 550px;
      height: 440px;
      top: 10%;
      right: 6%;
    }
    
    &__blob--2 {
      width: 440px;
      height: 385px;
      bottom: 22%;
      left: 10%;
    }
    
    &__blob--3 {
      width: 340px;
      height: 340px;
      top: 52%;
      left: 52%;
    }
  }
  
  // Hero section图片气泡框响应式
  .hero__image-wrapper {
    padding: 12px;
    border-radius: 20px;
    background: 
      linear-gradient(135deg, rgba(147, 197, 253, 0.16) 0%, rgba(191, 219, 254, 0.1) 30%, rgba(147, 197, 253, 0.05) 60%, rgba(25, 50, 80, 0.25) 100%);
    box-shadow: 
      0 6px 24px rgba(59, 130, 246, 0.12),
      0 3px 12px rgba(59, 130, 246, 0.08),
      0 2px 6px rgba(59, 130, 246, 0.06),
      inset 0 1px 0 rgba(255, 255, 255, 0.12),
      inset 0 -1px 0 rgba(25, 50, 80, 0.08);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }
  
  .hero__image {
    border-radius: 14px;
  }
  
  // Feature section图片气泡框响应式
  .feature-item__image {
    border-radius: 18px;
    background: 
      radial-gradient(ellipse at 30% 30%, rgba(147, 197, 253, 0.13) 0%, rgba(191, 219, 254, 0.08) 40%, rgba(147, 197, 253, 0.04) 70%, rgba(25, 50, 80, 0.2) 100%);
    box-shadow: 
      0 5px 20px rgba(59, 130, 246, 0.1),
      0 2px 10px rgba(59, 130, 246, 0.06),
      0 1px 4px rgba(59, 130, 246, 0.04),
      inset 0 1px 0 rgba(255, 255, 255, 0.1),
      inset 0 -1px 0 rgba(25, 50, 80, 0.06);
    
    img {
      top: 10px;
      left: 10px;
      width: calc(100% - 20px);
      height: calc(100% - 20px);
      border-radius: 12px;
    }
  }
  
  // Scene section图片气泡框响应式
  .scene-card__image {
    padding: 8px;
    border-radius: 14px;
    background: 
      linear-gradient(135deg, rgba(147, 197, 253, 0.1) 0%, rgba(191, 219, 254, 0.06) 40%, rgba(147, 197, 253, 0.03) 70%, rgba(25, 50, 80, 0.15) 100%),
      radial-gradient(circle at 60% 40%, rgba(147, 197, 253, 0.08) 0%, transparent 50%);
    box-shadow: 
      0 3px 12px rgba(59, 130, 246, 0.08),
      0 2px 6px rgba(59, 130, 246, 0.05),
      0 1px 3px rgba(59, 130, 246, 0.03),
      inset 0 1px 0 rgba(255, 255, 255, 0.08),
      inset 0 -1px 0 rgba(25, 50, 80, 0.05);
    
    img {
      border-radius: 10px;
    }
  }
}

@media (max-width: 768px) {
  .decorative {
    // 隐藏部分装饰元素以减少视觉干扰
    &__circle--3,
    &__square--3,
    &__triangle--3,
    &__line--horizontal--3,
    &__line--vertical--3,
    &__line--diagonal--2,
    &__blob--3 {
      display: none;
    }
    
    // 圆形装饰元素调整
    &__circle--1 {
      width: 500px;
      height: 500px;
      top: -200px;
      right: -200px;
    }
    
    &__circle--2 {
      width: 400px;
      height: 400px;
      bottom: -120px;
      left: -120px;
    }
    
    // 方形装饰元素调整
    &__square--1 {
      width: 200px;
      height: 200px;
      top: 28%;
      right: 4%;
    }
    
    &__square--2 {
      width: 160px;
      height: 160px;
      bottom: 38%;
      left: 3%;
    }
    
    // 三角形装饰元素调整
    &__triangle {
      border-left-width: 50px;
      border-right-width: 50px;
      border-bottom-width: 86px;
    }
    
    // 线条装饰元素调整
    &__line--horizontal {
      width: 280px;
    }
    
    &__line--vertical {
      height: 200px;
    }
    
    &__line--diagonal {
      width: 380px;
    }
    
    // 波浪线装饰元素调整
    &__wave {
      height: 80px;
    }
    
    // 抽象面状图形调整
    &__blob--1 {
      width: 450px;
      height: 360px;
      top: 12%;
      right: 8%;
    }
    
    &__blob--2 {
      width: 360px;
      height: 315px;
      bottom: 28%;
      left: 12%;
    }
  }
  
  // Hero section图片气泡框响应式
  .hero__image-wrapper {
    padding: 10px;
    border-radius: 18px;
    background: 
      linear-gradient(135deg, rgba(147, 197, 253, 0.14) 0%, rgba(191, 219, 254, 0.08) 30%, rgba(147, 197, 253, 0.04) 60%, rgba(25, 50, 80, 0.2) 100%);
    box-shadow: 
      0 5px 20px rgba(59, 130, 246, 0.1),
      0 2px 10px rgba(59, 130, 246, 0.06),
      0 1px 4px rgba(59, 130, 246, 0.04),
      inset 0 1px 0 rgba(255, 255, 255, 0.1),
      inset 0 -1px 0 rgba(25, 50, 80, 0.06);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  }
  
  .hero__image {
    border-radius: 12px;
  }
  
  // Feature section图片气泡框响应式
  .feature-item__image {
    border-radius: 16px;
    background: 
      radial-gradient(ellipse at 30% 30%, rgba(147, 197, 253, 0.11) 0%, rgba(191, 219, 254, 0.07) 40%, rgba(147, 197, 253, 0.03) 70%, rgba(25, 50, 80, 0.15) 100%);
    box-shadow: 
      0 4px 16px rgba(59, 130, 246, 0.08),
      0 2px 8px rgba(59, 130, 246, 0.05),
      0 1px 3px rgba(59, 130, 246, 0.03),
      inset 0 1px 0 rgba(255, 255, 255, 0.08),
      inset 0 -1px 0 rgba(25, 50, 80, 0.05);
    
    img {
      top: 8px;
      left: 8px;
      width: calc(100% - 16px);
      height: calc(100% - 16px);
      border-radius: 10px;
    }
  }
  
  // Scene section图片气泡框响应式
  .scene-card__image {
    padding: 6px;
    border-radius: 12px;
    background: 
      linear-gradient(135deg, rgba(147, 197, 253, 0.08) 0%, rgba(191, 219, 254, 0.05) 40%, rgba(147, 197, 253, 0.02) 70%, rgba(25, 50, 80, 0.12) 100%),
      radial-gradient(circle at 60% 40%, rgba(147, 197, 253, 0.06) 0%, transparent 50%);
    box-shadow: 
      0 2px 8px rgba(59, 130, 246, 0.06),
      0 1px 4px rgba(59, 130, 246, 0.04),
      0 1px 2px rgba(59, 130, 246, 0.02),
      inset 0 1px 0 rgba(255, 255, 255, 0.06),
      inset 0 -1px 0 rgba(25, 50, 80, 0.04);
    
    img {
      border-radius: 8px;
    }
  }
}

@media (max-width: 480px) {
  .decorative {
    // 进一步隐藏装饰元素
    &__circle--2,
    &__square--2,
    &__triangle--2,
    &__line--horizontal--2,
    &__line--vertical--2,
    &__line--diagonal--1,
    &__wave--2,
    &__blob--2 {
      display: none;
    }
    
    // 圆形装饰元素调整
    &__circle--1 {
      width: 350px;
      height: 350px;
      top: -150px;
      right: -150px;
    }
    
    // 方形装饰元素调整
    &__square--1 {
      width: 150px;
      height: 150px;
      top: 32%;
      right: 3%;
    }
    
    // 三角形装饰元素调整
    &__triangle--1 {
      border-left-width: 40px;
      border-right-width: 40px;
      border-bottom-width: 69px;
    }
    
    // 线条装饰元素调整
    &__line--horizontal--1 {
      width: 220px;
    }
    
    &__line--vertical--1 {
      height: 160px;
    }
    
    // 波浪线装饰元素调整
    &__wave--1 {
      height: 60px;
    }
    
    // 抽象面状图形调整
    &__blob--1 {
      width: 320px;
      height: 260px;
      top: 18%;
      right: 10%;
    }
  }
  
  // Hero section图片气泡框响应式
  .hero__image-wrapper {
    padding: 8px;
    border-radius: 16px;
    background: 
      linear-gradient(135deg, rgba(147, 197, 253, 0.12) 0%, rgba(191, 219, 254, 0.06) 30%, rgba(147, 197, 253, 0.03) 60%, rgba(25, 50, 80, 0.15) 100%);
    box-shadow: 
      0 4px 16px rgba(59, 130, 246, 0.08),
      0 2px 8px rgba(59, 130, 246, 0.05),
      0 1px 3px rgba(59, 130, 246, 0.03),
      inset 0 1px 0 rgba(255, 255, 255, 0.08),
      inset 0 -1px 0 rgba(25, 50, 80, 0.05);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
  }
  
  .hero__image {
    border-radius: 10px;
  }
  
  // Feature section图片气泡框响应式
  .feature-item__image {
    border-radius: 14px;
    background: 
      radial-gradient(ellipse at 30% 30%, rgba(147, 197, 253, 0.09) 0%, rgba(191, 219, 254, 0.05) 40%, rgba(147, 197, 253, 0.02) 70%, rgba(25, 50, 80, 0.1) 100%);
    box-shadow: 
      0 3px 12px rgba(59, 130, 246, 0.06),
      0 1px 6px rgba(59, 130, 246, 0.04),
      0 1px 2px rgba(59, 130, 246, 0.02),
      inset 0 1px 0 rgba(255, 255, 255, 0.06),
      inset 0 -1px 0 rgba(25, 50, 80, 0.04);
    
    img {
      top: 6px;
      left: 6px;
      width: calc(100% - 12px);
      height: calc(100% - 12px);
      border-radius: 8px;
    }
  }
  
  // Scene section图片气泡框响应式
  .scene-card__image {
    padding: 4px;
    border-radius: 10px;
    background: 
      linear-gradient(135deg, rgba(147, 197, 253, 0.06) 0%, rgba(191, 219, 254, 0.04) 40%, rgba(147, 197, 253, 0.02) 70%, rgba(25, 50, 80, 0.1) 100%),
      radial-gradient(circle at 60% 40%, rgba(147, 197, 253, 0.05) 0%, transparent 50%);
    box-shadow: 
      0 2px 6px rgba(59, 130, 246, 0.05),
      0 1px 3px rgba(59, 130, 246, 0.03),
      0 1px 1px rgba(59, 130, 246, 0.02),
      inset 0 1px 0 rgba(255, 255, 255, 0.05),
      inset 0 -1px 0 rgba(25, 50, 80, 0.03);
    
    img {
      border-radius: 6px;
    }
  }
}

// 调整模块间距
.section-container {
  max-width: $xingkou-container-max-width;
  margin: 0 auto;
  padding: 0 $xingkou-container-padding;
  position: relative;
  z-index: 1;
}

// 增强立体文字效果
.hero__title {
  font-size: $xingkou-font-size-hero;
  font-weight: $xingkou-font-weight-bold;
  line-height: 1.2;
  margin-bottom: $xingkou-spacing-lg;
  color: #3B82F6;
  text-shadow: 
    0 0 20px rgba(59, 130, 246, 0.5),
    0 0 40px rgba(59, 130, 246, 0.3),
    0 4px 8px rgba(0, 0, 0, 0.3);
  background: linear-gradient(135deg, #3B82F6 0%, #60A5FA 50%, #93C5FD 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

// 增强图标效果
.feature-item__icon, .value-card__icon {
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.3);
  backdrop-filter: blur(4px);
  
  .el-icon {
    color: #1E3A8A;
  }
}

// 增强导航栏样式
.header {
  background: rgba(30, 58, 138, 0.85);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(59, 130, 246, 0.2);
  
  &__logo-text {
    color: #3B82F6;
    font-weight: $xingkou-font-weight-bold;
  }
  
  &__nav-link {
    color: #1E3A8A;
    
    &:hover {
      color: #1E3A8A;
    }
  }
  
  &__login-btn {
    background: rgba(96, 165, 250, 0.54);
    color: #FFFFFF;
    border: 1px solid rgba(96, 165, 250, 0.72);
    
    &:hover {
      background: rgba(96, 165, 250, 0.72);
      color: #FFFFFF;
    }
  }
}

.section-header {
  text-align: center;
  margin-bottom: $xingkou-spacing-xxl;
  position: relative;
  
  // 添加科技感装饰元素
  &::before {
    content: '';
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 2px;
    background: $xingkou-gradient-cta;
    box-shadow: $xingkou-shadow-glow;
  }
  
  &--left { 
    text-align: left;
    
    &::before {
      left: 0;
      transform: none;
    }
  }
}

.section-tag {
  display: inline-block;
  padding: $xingkou-spacing-xs $xingkou-spacing-md;
  background: rgba(59, 130, 246, 0.15);
  border: 1px solid rgba(59, 130, 246, 0.3);
  color: #3B82F6;
  border-radius: $xingkou-border-radius-full;
  font-size: $xingkou-font-size-sm;
  font-weight: $xingkou-font-weight-medium;
  margin-bottom: $xingkou-spacing-md;
  box-shadow: $xingkou-shadow-sm;
  backdrop-filter: blur(4px);
  position: relative;
  overflow: hidden;
  
  // 添加全息扫描效果
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent);
    animation: hologramScan 4s infinite linear;
  }
}

.section-title {
  font-size: $xingkou-font-size-xxxl;
  font-weight: $xingkou-font-weight-bold;
  color: #1E3A8A;
  margin-bottom: $xingkou-spacing-sm;
  position: relative;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  
  @media (max-width: $xingkou-breakpoint-mobile) { 
    font-size: $xingkou-font-size-xxl; 
  }
}

.section-subtitle {
  font-size: $xingkou-font-size-lg;
  color: #1E3A8A;
  line-height: 1.6;
  margin-bottom: $xingkou-spacing-xl;
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
  border: 1px solid rgba(59, 130, 246, 0.3);
  cursor: pointer;
  transition: all $xingkou-transition-base;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(4px);
  
  // 添加按钮内部光效
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.2), transparent);
    transition: left 0.5s;
  }
  
  &:hover::before {
    left: 100%;
  }
  
  &--primary {
    background: linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%);
    color: #FFFFFF;
    border-color: #3B82F6;
    box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
    
    &:hover { 
      transform: translateY(-2px); 
      box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
    }
  }
  
  &--outline {
    background: rgba(59, 130, 246, 0.15);
    color: #FFFFFF;
    border-color: rgba(59, 130, 246, 0.4);
    backdrop-filter: blur(4px);
    
    &:hover { 
      background: rgba(59, 130, 246, 0.25);
      color: #FFFFFF;
      box-shadow: 0 4px 15px rgba(59, 130, 246, 0.2);
    }
  }
  
  &--white {
    background: rgba(37, 99, 235, 0.3);
    color: #1E3A8A;
    border-color: rgba(37, 99, 235, 0.5);
    backdrop-filter: blur(4px);
    
    &:hover { 
      transform: translateY(-2px); 
      background: rgba(37, 99, 235, 0.4);
      box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3);
    }
  }
  
  &--ghost {
    background: rgba(37, 99, 235, 0.3);
    color: #1E3A8A;
    border: 1px solid rgba(37, 99, 235, 0.5);
    
    &:hover { 
      border-color: rgba(37, 99, 235, 0.7); 
      background: rgba(37, 99, 235, 0.4);
      box-shadow: 0 0 15px rgba(37, 99, 235, 0.2);
      color: #1E3A8A;
    }
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
  background: rgba(30, 58, 138, 0.85);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(59, 130, 246, 0.3);
  box-shadow: 0 4px 20px rgba(10, 25, 45, 0.15);
  
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
    color: $xingkou-primary-light;
    filter: drop-shadow(0 0 12px rgba(90, 130, 180, 0.6));
  }
  
  &__logo-text {
    font-size: $xingkou-font-size-xl;
    font-weight: $xingkou-font-weight-bold;
    color: white;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
  }
  
  &__nav {
    display: flex;
    gap: $xingkou-spacing-xl;
    @media (max-width: $xingkou-breakpoint-tablet) { display: none; }
  }
  
  &__nav-link {
    font-size: $xingkou-font-size-base;
    color: rgba(255, 255, 255, 0.95);
    text-decoration: none;
    transition: all $xingkou-transition-fast;
    position: relative;
    padding: $xingkou-spacing-xs 0;
    border-radius: $xingkou-border-radius-sm;
    
    &::before {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 50%;
      width: 0;
      height: 2px;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent);
      transition: all $xingkou-transition-base;
      transform: translateX(-50%);
    }
    
    &:hover { 
      color: white;
      text-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
      
      &::before {
        width: 80%;
        box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
      }
    }
    
    &:active {
      transform: scale(0.98);
    }
  }
  
  &__actions {
    display: flex;
    gap: $xingkou-spacing-sm;
  }
  
  &__login-btn {
    padding: $xingkou-spacing-sm $xingkou-spacing-lg;
    background: rgba(96, 165, 250, 0.54);
    color: #FFFFFF;
    border: 1px solid rgba(96, 165, 250, 0.72);
    font-size: $xingkou-font-size-sm;
    cursor: pointer;
    border-radius: $xingkou-border-radius-md;
    transition: all $xingkou-transition-fast;
    
    &:hover { 
      color: #FFFFFF;
      border-color: rgba(96, 165, 250, 0.9);
      background: rgba(96, 165, 250, 0.72);
      box-shadow: 0 0 15px rgba(96, 165, 250, 0.27);
      text-shadow: 0 0 5px rgba(147, 197, 253, 0.25);
    }
  }
  
  &__try-btn {
    padding: $xingkou-spacing-sm $xingkou-spacing-lg;
    background: linear-gradient(135deg, #3B82F6 0%, #60A5FA 50%, #93C5FD 100%);
    color: white;
    border: none;
    border-radius: $xingkou-border-radius-md;
    font-size: $xingkou-font-size-sm;
    cursor: pointer;
    transition: all $xingkou-transition-fast;
    position: relative;
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.25), transparent);
      transition: left 0.5s;
    }
    
    &:hover { 
      background: linear-gradient(135deg, #60A5FA 0%, #93C5FD 100%);
      box-shadow: 0 8px 25px rgba(96, 165, 250, 0.35);
      transform: translateY(-2px);
      
      &::before {
        left: 100%;
      }
    }
  }
}

// Hero
.hero {
  padding: calc($xingkou-spacing-xxxl + 80px) 0 $xingkou-spacing-xxxl;
  background: linear-gradient(180deg, #DBEAFE 0%, rgba(219, 234, 254, 0.8) 40%, rgba(147, 197, 253, 0.6) 100%);
  position: relative;
  overflow: hidden;
  
  // 添加数据流线条效果
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
      linear-gradient(90deg, transparent 49.5%, rgba(74, 122, 176, 0.08) 50%, transparent 50.5%),
      linear-gradient(90deg, transparent 69.5%, rgba(74, 122, 176, 0.08) 70%, transparent 70.5%),
      linear-gradient(90deg, transparent 89.5%, rgba(74, 122, 176, 0.08) 90%, transparent 90.5%);
    background-size: 200% 100%;
    animation: dataFlow 8s infinite linear;
    pointer-events: none;
    z-index: 0;
  }
  
  &__container {
    max-width: $xingkou-container-max-width;
    margin: 0 auto;
    padding: 0 $xingkou-container-padding;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: $xingkou-spacing-xxxl;
    align-items: center;
    position: relative;
    z-index: 1;
    @media (max-width: $xingkou-breakpoint-tablet) { grid-template-columns: 1fr; text-align: center; }
  }
  
  &__badge {
    display: inline-block;
    padding: $xingkou-spacing-xs $xingkou-spacing-md;
    background: rgba(59, 130, 246, 0.2);
    border: 1px solid rgba(59, 130, 246, 0.4);
    border-radius: $xingkou-border-radius-full;
    font-size: $xingkou-font-size-sm;
    color: #1E3A8A;
    margin-bottom: $xingkou-spacing-lg;
    box-shadow: 0 4px 15px rgba(59, 130, 246, 0.15);
  }
  
  &__title {
    font-size: $xingkou-font-size-hero;
    font-weight: $xingkou-font-weight-bold;
    line-height: 1.2;
    margin-bottom: $xingkou-spacing-lg;
    color: #1E3A8A;
    text-shadow: 0 2px 4px rgba(147, 197, 253, 0.25);
    @media (max-width: $xingkou-breakpoint-mobile) { font-size: $xingkou-font-size-xxxl; }
  }
  
  &__title-highlight {
    color: #3B82F6;
    background: linear-gradient(135deg, #3B82F6 0%, #60A5FA 50%, #93C5FD 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: 0 2px 8px rgba(147, 197, 253, 0.3);
  }
  
  &__desc {
    font-size: $xingkou-font-size-lg;
    color: #1E3A8A;
    line-height: 1.7;
    margin-bottom: $xingkou-spacing-xxl;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
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
    color: white;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
  }
  
  &__stat-label {
    font-size: $xingkou-font-size-sm;
    color: rgba(255, 255, 255, 0.7);
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
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
  
  // 科技感装饰元素
  &__cube--1 {
    position: absolute;
    top: -30px;
    right: 10%;
    width: 40px;
    height: 40px;
    opacity: 0.7;
  }
  
  &__gear--1 {
    position: absolute;
    top: 20px;
    left: 5%;
    width: 30px;
    height: 30px;
    opacity: 0.5;
  }
  
  &__gear--2 {
    position: absolute;
    bottom: 30px;
    right: 5%;
    width: 25px;
    height: 25px;
    opacity: 0.6;
  }
  
  &__image-wrapper {
    position: relative;
    padding: 16px;
    background: 
      linear-gradient(135deg, rgba(147, 197, 253, 0.18) 0%, rgba(191, 219, 254, 0.12) 30%, rgba(147, 197, 253, 0.06) 60%, rgba(25, 50, 80, 0.3) 100%);
    border-radius: 24px;
    box-shadow: 
      0 8px 32px rgba(59, 130, 246, 0.15),
      0 4px 16px rgba(59, 130, 246, 0.1),
      0 2px 8px rgba(59, 130, 246, 0.08),
      inset 0 1px 0 rgba(255, 255, 255, 0.15),
      inset 0 -1px 0 rgba(25, 50, 80, 0.1);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(147, 197, 253, 0.12);
    
    &::before {
      content: '';
      position: absolute;
      top: -2px;
      left: -2px;
      right: -2px;
      bottom: -2px;
      background: linear-gradient(135deg, rgba(147, 197, 253, 0.15), rgba(219, 234, 254, 0.2), rgba(147, 197, 253, 0.15));
      border-radius: 26px;
      z-index: -1;
      opacity: 0.6;
    }
    
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(147, 197, 253, 0.08) 0%, transparent 50%, rgba(219, 234, 254, 0.1) 100%);
      border-radius: 24px;
      pointer-events: none;
    }
  }
  
  &__image {
    width: 100%;
    border-radius: 16px;
    box-shadow: 0 4px 16px rgba(42, 74, 117, 0.08);
  }
  
  &__float {
    position: absolute;
    display: flex;
    align-items: center;
    gap: $xingkou-spacing-xs;
    padding: $xingkou-spacing-sm $xingkou-spacing-md;
    background: white;
    border-radius: $xingkou-border-radius-lg;
    box-shadow: 0 4px 16px rgba(42, 74, 117, 0.1);
    font-size: $xingkou-font-size-sm;
    color: #1E3A8A;
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
  background: rgba(147, 197, 253, 0.25);
  border-radius: $xingkou-border-radius-lg;
  border: 1px solid rgba(59, 130, 246, 0.25);
  backdrop-filter: blur(8px);
  transition: all $xingkou-transition-base;
  position: relative;
  overflow: hidden;
  
  // 添加全息扫描效果
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(74, 122, 176, 0.08), transparent);
    animation: hologramScan 6s infinite linear;
    z-index: 0;
  }
  
  &:hover { 
    transform: translateY(-8px); 
    box-shadow: 0 15px 30px rgba(42, 74, 117, 0.12); 
    border-color: var(--accent-color); 
  }
  
  &__icon {
    width: 56px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(59, 130, 246, 0.2);
    border: 1px solid rgba(59, 130, 246, 0.4);
    border-radius: $xingkou-border-radius-md;
    color: #1E3A8A;
    margin-bottom: $xingkou-spacing-lg;
  }
  
  &__title {
    font-size: $xingkou-font-size-xl;
    font-weight: $xingkou-font-weight-bold;
    margin-bottom: $xingkou-spacing-xs;
    color: #1E3A8A;
  }
  
  &__subtitle {
    font-size: $xingkou-font-size-base;
    color: #1E3A8A;
    font-weight: $xingkou-font-weight-medium;
    margin-bottom: $xingkou-spacing-md;
  }
  
  &__desc {
    font-size: $xingkou-font-size-base;
    color: #1E3A8A;
    line-height: 1.6;
  }
}

// Feature Section
.feature {
  padding: $xingkou-section-padding-y 0;
  background: rgba(219, 234, 254, 0.4);
  border-top: 1px solid rgba(59, 130, 246, 0.2);
  border-bottom: 1px solid rgba(59, 130, 246, 0.2);
  position: relative;
  overflow: hidden;
  
  // 添加数据流线条效果
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
      linear-gradient(90deg, transparent 49.8%, rgba(58, 90, 127, 0.05) 50%, transparent 50.2%),
      linear-gradient(90deg, transparent 69.8%, rgba(58, 90, 127, 0.05) 70%, transparent 70.2%);
    background-size: 200% 100%;
    animation: dataFlow 10s infinite linear;
    pointer-events: none;
    z-index: 0;
  }
  
  &__list {
    display: flex;
    flex-direction: column;
    gap: $xingkou-spacing-xxxl;
    position: relative;
    z-index: 1;
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
    position: relative;
    width: 100%;
    padding-top: 67.87%;
    overflow: hidden;
    border-radius: 20px;
    background: 
      radial-gradient(ellipse at 30% 30%, rgba(147, 197, 253, 0.15) 0%, rgba(191, 219, 254, 0.1) 40%, rgba(147, 197, 253, 0.05) 70%, rgba(25, 50, 80, 0.25) 100%);
    box-shadow: 
      0 6px 24px rgba(59, 130, 246, 0.12),
      0 3px 12px rgba(59, 130, 246, 0.08),
      0 2px 6px rgba(59, 130, 246, 0.06),
      inset 0 1px 0 rgba(255, 255, 255, 0.12),
      inset 0 -1px 0 rgba(25, 50, 80, 0.08);
    border: 1px solid rgba(147, 197, 253, 0.1);
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(58, 90, 127, 0.08), transparent);
      animation: hologramScan 5s infinite linear;
      z-index: 1;
    }
    
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: radial-gradient(circle at 50% 50%, rgba(147, 197, 253, 0.06) 0%, transparent 60%, rgba(219, 234, 254, 0.08) 100%);
      border-radius: 20px;
      pointer-events: none;
      z-index: 2;
    }
    
    img {
      position: absolute;
      top: 12px;
      left: 12px;
      width: calc(100% - 24px);
      height: calc(100% - 24px);
      object-fit: cover;
      object-position: center;
      border-radius: 14px;
      box-shadow: 0 2px 8px rgba(42, 74, 117, 0.06);
    }
    
    @media (max-width: $xingkou-breakpoint-tablet) {
      padding-top: 67.87%;
      
      img {
        top: 10px;
        left: 10px;
        width: calc(100% - 20px);
        height: calc(100% - 20px);
        border-radius: 12px;
      }
    }
  }
  
  &__icon {
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(59, 130, 246, 0.2);
    border: 1px solid rgba(59, 130, 246, 0.4);
    border-radius: $xingkou-border-radius-md;
    color: #1E3A8A;
    margin-bottom: $xingkou-spacing-md;
  }
  
  &__title {
    font-size: $xingkou-font-size-xxl;
    font-weight: $xingkou-font-weight-bold;
    margin-bottom: $xingkou-spacing-sm;
    color: #1E3A8A;
  }
  
  &__desc {
    font-size: $xingkou-font-size-lg;
    color: #1E3A8A;
    margin-bottom: $xingkou-spacing-lg;
  }
  
  &__link {
    color: #1E3A8A;
    font-weight: $xingkou-font-weight-medium;
    text-decoration: none;
    &:hover { text-decoration: underline; color: #1E3A8A; }
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
  background: rgba(147, 197, 253, 0.3);
  border-radius: $xingkou-border-radius-lg;
  border: 1px solid rgba(59, 130, 246, 0.25);
  backdrop-filter: blur(8px);
  transition: all $xingkou-transition-base;
  cursor: pointer;
  &:hover { transform: translateY(-4px); box-shadow: 0 8px 25px rgba(59, 130, 246, 0.2); }
  
  &__image {
    position: relative;
    height: 180px;
    padding: 10px;
    background: 
      linear-gradient(135deg, rgba(147, 197, 253, 0.12) 0%, rgba(191, 219, 254, 0.08) 40%, rgba(147, 197, 253, 0.04) 70%, rgba(25, 50, 80, 0.2) 100%),
      radial-gradient(circle at 60% 40%, rgba(147, 197, 253, 0.1) 0%, transparent 50%);
    background-blend-mode: overlay;
    border-radius: 16px;
    border: 1px solid rgba(147, 197, 253, 0.08);
    box-shadow: 
      0 4px 16px rgba(59, 130, 246, 0.1),
      0 2px 8px rgba(59, 130, 246, 0.06),
      0 1px 4px rgba(59, 130, 246, 0.04),
      inset 0 1px 0 rgba(255, 255, 255, 0.1),
      inset 0 -1px 0 rgba(25, 50, 80, 0.06);
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(147, 197, 253, 0.05) 0%, transparent 40%, rgba(219, 234, 254, 0.06) 100%);
      border-radius: 16px;
      pointer-events: none;
      z-index: 1;
    }
    
    &::after {
      content: '';
      position: absolute;
      top: -1px;
      left: -1px;
      right: -1px;
      bottom: -1px;
      background: linear-gradient(135deg, rgba(147, 197, 253, 0.15), rgba(219, 234, 254, 0.15), rgba(147, 197, 253, 0.15));
      border-radius: 18px;
      z-index: -1;
      opacity: 0.5;
    }
    
    img { 
      width: 100%; 
      height: 100%; 
      object-fit: cover;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(42, 74, 117, 0.05);
    }
  }
  
  &__tag {
    position: absolute;
    top: $xingkou-spacing-sm;
    right: $xingkou-spacing-sm;
    padding: $xingkou-spacing-xs $xingkou-spacing-sm;
    background: rgba(59, 130, 246, 0.3);
    color: #1E3A8A;
    border: 1px solid rgba(59, 130, 246, 0.5);
    border-radius: $xingkou-border-radius-sm;
    font-size: $xingkou-font-size-xs;
  }
  
  &__content { padding: $xingkou-spacing-lg; }
  &__title { font-size: $xingkou-font-size-lg; font-weight: $xingkou-font-weight-semibold; margin-bottom: $xingkou-spacing-xs; color: #1E3A8A; }
  &__desc { font-size: $xingkou-font-size-sm; color: #1E3A8A; }
}

// Case Section
.case {
  padding: $xingkou-section-padding-y 0;
  background: rgba(219, 234, 254, 0.5);
  border-top: 1px solid rgba(59, 130, 246, 0.25);
  border-bottom: 1px solid rgba(59, 130, 246, 0.25);
  
  &__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: $xingkou-spacing-xl;
    @media (max-width: $xingkou-breakpoint-tablet) { grid-template-columns: 1fr; }
  }
}

.case-card {
  background: rgba(147, 197, 253, 0.3);
  border: 1px solid rgba(59, 130, 246, 0.3);
  padding: $xingkou-spacing-xl;
  border-radius: $xingkou-border-radius-lg;
  text-align: center;
  backdrop-filter: blur(8px);
  
  &__metric { margin-bottom: $xingkou-spacing-lg; }
  &__value { display: block; font-size: 48px; font-weight: $xingkou-font-weight-bold; color: #1E3A8A; }
  &__label { font-size: $xingkou-font-size-sm; color: #1E3A8A; }
  &__quote { font-size: $xingkou-font-size-base; color: #1E3A8A; font-style: italic; margin-bottom: $xingkou-spacing-md; }
  &__school { font-size: $xingkou-font-size-sm; color: #334155; }
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
  background: rgba(147, 197, 253, 0.25);
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: $xingkou-border-radius-md;
  backdrop-filter: blur(8px);
  transition: all $xingkou-transition-base;
  cursor: pointer;
  &:hover { background: rgba(147, 197, 253, 0.4); box-shadow: 0 8px 25px rgba(59, 130, 246, 0.2); }
  
  &__category {
    display: inline-block;
    padding: $xingkou-spacing-xs $xingkou-spacing-sm;
    background: rgba(59, 130, 246, 0.2);
    color: #1E3A8A;
    border: 1px solid rgba(59, 130, 246, 0.4);
    border-radius: $xingkou-border-radius-sm;
    font-size: $xingkou-font-size-xs;
    margin-bottom: $xingkou-spacing-sm;
  }
  
  &__title { font-size: $xingkou-font-size-base; font-weight: $xingkou-font-weight-semibold; margin-bottom: $xingkou-spacing-sm; line-height: 1.5; color: #1E3A8A; }
  &__date { font-size: $xingkou-font-size-sm; color: #334155; }
}

// CTA Section
.cta {
  padding: $xingkou-section-padding-y 0;
  background: rgba(147, 197, 253, 0.3);
  border: 1px solid rgba(59, 130, 246, 0.3);
  backdrop-filter: blur(8px);
  
  &__content { text-align: center; }
  &__title { font-size: $xingkou-font-size-xxxl; font-weight: $xingkou-font-weight-bold; color: #1E3A8A; margin-bottom: $xingkou-spacing-md; }
  &__subtitle { font-size: $xingkou-font-size-lg; color: #3B82F6; margin-bottom: $xingkou-spacing-xl; }
  &__actions { display: flex; justify-content: center; gap: $xingkou-spacing-md; margin-bottom: $xingkou-spacing-xl; }
  &__trust {
    display: flex;
    justify-content: center;
    gap: $xingkou-spacing-xl;
    color: #60A5FA;
    font-size: $xingkou-font-size-sm;
  }
}

// Footer
.footer {
  padding: $xingkou-spacing-xxl 0 $xingkou-spacing-xl;
  background: rgba(30, 58, 138, 0.85);
  border-top: 1px solid rgba(59, 130, 246, 0.2);
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
