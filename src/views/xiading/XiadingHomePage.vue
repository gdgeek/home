<script setup lang="ts">
/**
 * 夏鼎品牌首頁 - 教育AR創作平台（澳門版）
 * 設計方向：日系淺色清爽 + 科技感點綴 + 非對稱佈局
 * 字體：Zen Kaku Gothic New（標題）+ Noto Sans TC（正文）
 * 配色：淺藍冰白底 #F6F9FD，Logo鋼藍 #4A6FA5 科技強調
 * 佈局：全寬Hero → Zigzag功能 → 橫滑場景 → 非對稱新聞
 */
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useBrand } from '@/composables/useBrand'
import { useNews } from '@/composables/useNews'
import LoginModal from '@/components/common/LoginModal.vue'

const { footer } = useBrand()
const version = (window as any).__APP_VERSION__ || '1.0.0'

const showLoginModal = ref(false)
const showNewsModal = ref(false)
const selectedNews = ref<any>(null)
const animatedSections = ref<Set<HTMLElement>>(new Set())
const navScrolled = ref(false)
const activeScene = ref(0)

const { news } = useNews()

// 場景標籤自動切換
let sceneTimer: ReturnType<typeof setInterval> | null = null
const scenePaused = ref(false)

const startSceneTimer = () => {
  stopSceneTimer()
  sceneTimer = setInterval(() => {
    if (!scenePaused.value) {
      activeScene.value = (activeScene.value + 1) % scenes.length
    }
  }, 4000)
}

const stopSceneTimer = () => {
  if (sceneTimer) { clearInterval(sceneTimer); sceneTimer = null }
}

const pauseScene = () => { scenePaused.value = true }
const resumeScene = () => { scenePaused.value = false }

const handleOpenLogin = () => { showLoginModal.value = true }
const handleOpenNewsDetail = (item: any) => {
  selectedNews.value = item
  showNewsModal.value = true
}

const blogUrl = computed(() => (window as any).__WORDPRESS_API_URL__ || 'https://blog.hxgxonline.com')

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`
}

const isInViewport = (element: HTMLElement) => {
  const rect = element.getBoundingClientRect()
  return rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85
}

const handleScroll = () => {
  navScrolled.value = window.scrollY > 40
  document.querySelectorAll('.reveal').forEach((el) => {
    const element = el as HTMLElement
    if (!animatedSections.value.has(element) && isInViewport(element)) {
      element.classList.add('revealed')
      animatedSections.value.add(element)
    }
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll()
  startSceneTimer()
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  stopSceneTimer()
})

const navItems = [
  { text: '功能', url: '#features' },
  { text: '場景', url: '#scenes' },
  { text: '案例', url: '#cases' },
  { text: '動態', url: '#news' }
]

const stats = [
  { number: '50+', label: '澳門學校' },
  { number: '1萬+', label: '師生用戶' },
  { number: '10萬+', label: 'AR作品' }
]

// Unsplash 高質量圖片（免費商用）
const heroImages = [
  'https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=1920&q=80', // 科技藍光抽象
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80', // 地球數據可視化
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1920&q=80', // 團隊科技協作
]

const features = [
  { id: 'editor', title: '可視化場景編輯器', desc: '拖拽操作，所見即所得。零代碼搭建沉浸式AR教學場景，支持3D模型、音頻、視頻等多類型素材。',
    image: '/images/ar-platform/UGC场景编辑器界面.webp' },
  { id: 'logic', title: '邏輯拼圖系統', desc: '可視化節點編排，輕鬆構建複雜交互邏輯。設置觸發器、延時任務、多動作聯動。',
    image: '/images/ar-platform/拖拽程序生成工具.webp' },
  { id: 'multiview', title: '第三方視角投屏', desc: '教師用平板實時監控學生AR視角，同步展示給全體學生，課堂管理更高效。',
    image: '/images/ar-platform/三方视角，用户操作AR医疗头骨内容.webp' },
  { id: 'collab', title: '多人互動協作', desc: '多台AR設備同時接入同一場景，師生實時互動，團隊協作創作更高效。',
    image: '/images/ar-platform/多人AR游戏，三方视角.webp' },
  { id: 'casting', title: '大屏幕投屏展示', desc: '一鍵將AR畫面投射至大屏幕，全班同步觀看，課堂演示與成果展示更直觀。',
    image: '/images/ar-platform/用户操作AR医疗头骨内容.webp' },
]

const scenes = [
  { title: '戶外探索', desc: '走出教室，在真實環境中體驗AR互動學習。學生可以在校園、公園、博物館等場所，透過AR眼鏡觀察疊加在真實世界上的虛擬內容，將課本知識與實地場景結合，激發好奇心與探究欲望。', image: '/images/ar-platform/两个小朋友在外面玩AR游戏.webp', tag: '探索' },
  { title: '醫療護理', desc: '透過AR技術模擬嬰幼兒護理、外傷處理等臨床場景，學生可在零風險環境中反覆練習標準操作流程，提升實操信心與技能熟練度。', image: '/images/ar-platform/婴幼儿护理 外伤处理.webp', tag: '醫療' },
  { title: '口腔教學', desc: '將窩溝封閉、根管治療等精細口腔操作以3D可視化方式呈現，學生可自由旋轉、放大觀察每一個步驟細節，理解傳統教材難以展示的內部結構。', image: '/images/ar-platform/AR医疗 窝沟封闭.webp', tag: '教學' },
  { title: '工業培訓', desc: '掘進機、發動機等大型工業設備1:1還原至AR空間，學員無需進入危險現場即可熟悉設備結構、拆裝流程與維護要點，大幅降低培訓成本與安全風險。', image: '/images/ar-platform/AR掘进机展示.webp', tag: '工業' },
  { title: '互動遊戲', desc: '將知識點融入AR多人協作遊戲，學生組隊完成任務挑戰，在競爭與合作中自然吸收學習內容，寓教於樂，課堂參與度顯著提升。', image: '/images/ar-platform/两个人玩AR游戏.webp', tag: '娛樂' },
  { title: '校園教學', desc: '利用AR沙盤模型將地理、歷史、建築等學科內容立體化呈現，教師可在課堂中即時操控展示角度，學生圍繞模型互動討論，深化理解。', image: '/images/ar-platform/AR沙盘，中南大学.webp', tag: '教育' },
]

const cases = [
  { school: '澳門培正中學', quote: '夏鼎讓生物課堂煥然一新，學生參與度提升了85%',
    person: '陳老師', role: '生物科組長', stat: { value: '85%', label: '參與度提升' } },
  { school: '澳門大學附屬應用學校', quote: '學生已創作超過500件AR作品，創新思維顯著提升',
    person: '李主任', role: 'STEAM負責人', stat: { value: '500+', label: '學生作品' } },
  { school: '澳門聖若瑟教區中學', quote: '零門檻操作讓每位老師都能輕鬆製作AR課件',
    person: '黃校長', role: '教務主任', stat: { value: '98%', label: '教師使用率' } }
]
</script>

<template>
  <div class="xd">
    <!-- 背景 -->
    <div class="xd-bg" aria-hidden="true">
      <div class="xd-bg__grid"></div>
      <div class="xd-bg__glow xd-bg__glow--1"></div>
      <div class="xd-bg__glow xd-bg__glow--2"></div>
    </div>

    <!-- 導航 -->
    <header class="xd-nav" :class="{ 'xd-nav--scrolled': navScrolled }">
      <div class="xd-nav__inner">
        <a href="#" class="xd-nav__logo">
          <img src="/logo/xiading/bar.webp" alt="夏鼎科技" />
        </a>
        <nav class="xd-nav__links" aria-label="主導航">
          <a v-for="item in navItems" :key="item.text" :href="item.url">{{ item.text }}</a>
        </nav>
        <div class="xd-nav__actions">
          <button class="xd-btn xd-btn--ghost" @click="handleOpenLogin">登錄</button>
          <button class="xd-btn xd-btn--primary" @click="handleOpenLogin">開始創作</button>
        </div>
      </div>
    </header>

    <!-- Hero：雙層圖片 + 居中文字 -->
    <section class="xd-hero">
      <div class="xd-hero__bg">
        <img :src="heroImages[0]" alt="科技教育背景" />
        <div class="xd-hero__overlay"></div>
      </div>
      <div class="xd-hero__content reveal">
        <div class="xd-hero__badge">
          <span class="xd-hero__badge-dot"></span>
          澳門人工智能AR教育科技平台
        </div>
        <h1 class="xd-hero__title">
          <span class="xd-hero__title-line1">讓知識</span>
          <span class="xd-hero__title-accent">融入現實</span>
        </h1>
        <p class="xd-hero__desc">零門檻AI/AR創作工具，助力師生開啟沉浸式教學體驗</p>
        <div class="xd-hero__cta">
          <button class="xd-btn xd-btn--white xd-btn--lg" @click="handleOpenLogin">
            免費試用
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
          <button class="xd-btn xd-btn--ghost-light xd-btn--lg">觀看演示</button>
        </div>
        <!-- 數據條內嵌 -->
        <div class="xd-hero__stats">
          <div v-for="s in stats" :key="s.label" class="xd-hero__stat">
            <span class="xd-hero__stat-num">{{ s.number }}</span>
            <span class="xd-hero__stat-label">{{ s.label }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 功能：Bento Grid 便當盒佈局 -->
    <section id="features" class="xd-section">
      <div class="xd-section__header reveal">
        <span class="xd-tag">核心功能</span>
        <h2 class="xd-section__title">簡單操作，無限可能</h2>
      </div>
      <div class="xd-bento reveal">
        <div v-for="(f, idx) in features" :key="f.id"
             class="xd-bento__item"
             :class="{ 'xd-bento__item--hero': idx === 0 }">
          <div class="xd-bento__img">
            <img :src="f.image" :alt="f.title" loading="lazy" />
          </div>
          <div class="xd-bento__overlay">
            <span class="xd-bento__num">0{{ idx + 1 }}</span>
            <h3 class="xd-bento__title">{{ f.title }}</h3>
            <p class="xd-bento__desc">{{ f.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 場景：標籤頁切換 -->
    <section id="scenes" class="xd-section">
      <div class="xd-section__header reveal">
        <span class="xd-tag">應用場景</span>
        <h2 class="xd-section__title">AI/AR賦能多元教學</h2>
      </div>
      <div class="xd-tabs reveal">
        <div class="xd-tabs__nav">
          <button v-for="(s, idx) in scenes" :key="s.tag"
                  class="xd-tabs__btn"
                  :class="{ 'xd-tabs__btn--active': activeScene === idx }"
                  @click="activeScene = idx">
            {{ s.tag }}
          </button>
        </div>
        <div class="xd-tabs__panel" @mouseenter="pauseScene" @mouseleave="resumeScene">
          <Transition name="scene-fade" mode="out-in">
            <div class="xd-tabs__content" :key="activeScene">
              <div class="xd-tabs__img">
                <img :src="scenes[activeScene].image" :alt="scenes[activeScene].title" />
              </div>
              <div class="xd-tabs__text">
                <h3>{{ scenes[activeScene].title }}</h3>
                <p>{{ scenes[activeScene].desc }}</p>
              </div>
            </div>
          </Transition>
          <!-- 進度條 -->
          <div class="xd-tabs__progress">
            <div v-for="(s, idx) in scenes" :key="s.tag"
                 class="xd-tabs__progress-dot"
                 :class="{ 'xd-tabs__progress-dot--active': activeScene === idx, 'xd-tabs__progress-dot--paused': scenePaused && activeScene === idx }"
                 @click="activeScene = idx">
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 案例：大引號 + 橫排 -->
    <section id="cases" class="xd-section">
      <div class="xd-section__header reveal">
        <span class="xd-tag">成功案例</span>
        <h2 class="xd-section__title">澳門學校的選擇</h2>
      </div>
      <div class="xd-testimonials">
        <div v-for="(c, idx) in cases" :key="idx" class="xd-testimonial reveal">
          <div class="xd-testimonial__top">
            <span class="xd-testimonial__quote-mark">"</span>
            <div class="xd-testimonial__stat">
              <span class="xd-testimonial__stat-val">{{ c.stat.value }}</span>
              <span class="xd-testimonial__stat-lbl">{{ c.stat.label }}</span>
            </div>
          </div>
          <blockquote class="xd-testimonial__text">{{ c.quote }}</blockquote>
          <div class="xd-testimonial__author">
            <span class="xd-testimonial__school">{{ c.school }}</span>
            <span class="xd-testimonial__person">{{ c.person }} · {{ c.role }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 新聞：非對稱佈局 左大右列表 -->
    <section v-if="news?.length" id="news" class="xd-section xd-section--alt">
      <div class="xd-section__header reveal">
        <span class="xd-tag">最新動態</span>
        <h2 class="xd-section__title">平台資訊</h2>
      </div>
      <div class="xd-news-grid reveal">
        <article v-if="news[0]" class="xd-news-featured" @click="handleOpenNewsDetail(news[0])">
          <span class="xd-news-featured__date">{{ formatDate(news[0].date) }}</span>
          <h3 class="xd-news-featured__title">{{ news[0].title }}</h3>
          <span class="xd-news-featured__link">
            閱讀全文
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </span>
        </article>
        <div class="xd-news-list">
          <article v-for="item in news.slice(1, 4)" :key="item.id" class="xd-news-list__item" @click="handleOpenNewsDetail(item)">
            <span class="xd-news-list__date">{{ formatDate(item.date) }}</span>
            <h3 class="xd-news-list__title">{{ item.title }}</h3>
          </article>
          <a :href="blogUrl" target="_blank" rel="noopener" class="xd-news-list__more">查看更多 →</a>
        </div>
      </div>
    </section>

    <!-- CTA：全寬沉浸 -->
    <section class="xd-cta reveal">
      <img class="xd-cta__bg" src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&q=80" alt="" aria-hidden="true" />
      <div class="xd-cta__inner">
        <h2>開啟AI/AR教育之旅</h2>
        <p>教師、學生、校園用戶通用</p>
        <div class="xd-cta__actions">
          <button class="xd-btn xd-btn--white xd-btn--lg" @click="handleOpenLogin">立即免費試用</button>
          <button class="xd-btn xd-btn--ghost-light xd-btn--lg">聯繫我們</button>
        </div>
      </div>
    </section>

    <!-- Footer：簡潔橫排 -->
    <footer class="xd-footer">
      <div class="xd-footer__inner">
        <div class="xd-footer__brand">
          <img src="/logo/xiading/bar.webp" alt="夏鼎科技" class="xd-footer__logo" />
          <p>專為澳門教育場景打造的AR創作工具</p>
        </div>
        <div class="xd-footer__links">
          <a href="#">創作指南</a>
          <a href="#">素材庫</a>
          <a href="#">幫助中心</a>
          <a href="#">公司介紹</a>
          <a href="#">用戶協議</a>
          <a href="#">隱私政策</a>
        </div>
        <div class="xd-footer__contact">
          <span>+853 2888 8888</span>
          <span>contact@xiading.mo</span>
        </div>
      </div>
      <div class="xd-footer__bottom">
        <span>{{ footer.copyright || '© 2025 夏鼎科技（澳門）' }}</span>
        <span class="xd-footer__ver">v{{ version }}</span>
      </div>
    </footer>

    <!-- Modals -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="showNewsModal" class="xd-modal" @click.self="showNewsModal = false">
          <div class="xd-modal__box">
            <button class="xd-modal__close" @click="showNewsModal = false" aria-label="關閉">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
            <div v-if="selectedNews" class="xd-modal__content">
              <span class="xd-modal__date">{{ formatDate(selectedNews.date) }}</span>
              <h2>{{ selectedNews.title }}</h2>
              <div v-if="selectedNews.content" v-html="selectedNews.content"></div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
    <LoginModal v-model="showLoginModal" />
  </div>
</template>


<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+New:wght@300;400;500;700;900&family=Noto+Sans+TC:wght@200;400;500;700&display=swap');

// ═══════════════════════════════════════
// 色彩系統
// ═══════════════════════════════════════
$steel: #4A6FA5;
$steel-light: #6B8FC5;
$steel-pale: #9BB8D8;
$steel-wash: #D4E3F3;
$ice: #E8F1FA;
$accent: #3B5998;

$bg: #F6F9FD;
$bg-alt: #EDF2F9;
$card: #FFFFFF;

$text-dark: #1A2B42;
$text-body: #4A5E78;
$text-muted: #8298B2;
$text-faint: #B0C4D8;

$border: rgba(74, 111, 165, 0.1);
$border-hover: rgba(74, 111, 165, 0.25);
$shadow-s: 0 2px 12px rgba(74, 111, 165, 0.06);
$shadow-m: 0 4px 24px rgba(74, 111, 165, 0.08);
$shadow-l: 0 12px 40px rgba(74, 111, 165, 0.12);

$r: 18px;
$r-sm: 10px;
$max-w: 1200px;
$ease: cubic-bezier(0.22, 1, 0.36, 1);

// ═══════════════════════════════════════
// 動畫
// ═══════════════════════════════════════
@keyframes gridDrift {
  0% { transform: translate(0, 0); }
  100% { transform: translate(60px, 60px); }
}
@keyframes softPulse {
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.08); }
}

.reveal {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.7s $ease, transform 0.7s $ease;
  &.revealed { opacity: 1; transform: translateY(0); }
}

// ═══════════════════════════════════════
// 根
// ═══════════════════════════════════════
.xd {
  font-family: 'Noto Sans TC', 'Zen Kaku Gothic New', sans-serif;
  color: $text-body;
  background: $bg;
  min-height: 100vh;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  ::selection { background: rgba($steel, 0.15); color: $text-dark; }
}

// ═══════════════════════════════════════
// 背景
// ═══════════════════════════════════════
.xd-bg {
  position: fixed; inset: 0;
  pointer-events: none; z-index: 0;

  &__grid {
    position: absolute; inset: -60px;
    background-image:
      linear-gradient(rgba($steel, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba($steel, 0.03) 1px, transparent 1px);
    background-size: 60px 60px;
    animation: gridDrift 30s linear infinite;
    mask-image: radial-gradient(ellipse 70% 50% at 50% 30%, black 10%, transparent 60%);
  }

  &__glow {
    position: absolute; border-radius: 50%; filter: blur(120px);
    &--1 { width: 600px; height: 400px; background: rgba($steel-wash, 0.5); top: -150px; left: 5%; animation: softPulse 20s ease-in-out infinite; }
    &--2 { width: 400px; height: 400px; background: rgba($ice, 0.4); bottom: 20%; right: -80px; animation: softPulse 24s ease-in-out infinite 8s; }
  }
}

// ═══════════════════════════════════════
// 導航
// ═══════════════════════════════════════
.xd-nav {
  position: fixed; top: 12px; left: 16px; right: 16px; z-index: 100;
  padding: 12px 0;
  background: rgba(255,255,255,0.6);
  backdrop-filter: blur(24px) saturate(140%);
  border: 1px solid rgba($steel, 0.08);
  border-radius: 14px;
  transition: all 0.3s $ease;

  &--scrolled {
    top: 8px;
    background: rgba(255,255,255,0.88);
    box-shadow: 0 4px 24px rgba($steel, 0.06);
  }

  &__inner { max-width: $max-w; margin: 0 auto; padding: 0 24px; display: flex; align-items: center; justify-content: space-between; }
  &__logo img { height: 26px; }

  &__links {
    display: flex; gap: 36px;
    a {
      color: $text-muted; text-decoration: none; font-size: 14px; font-weight: 500;
      transition: color 0.25s; position: relative;
      &::after { content: ''; position: absolute; bottom: -5px; left: 50%; width: 0; height: 2px; background: $steel; border-radius: 1px; transition: all 0.25s $ease; transform: translateX(-50%); }
      &:hover { color: $steel; &::after { width: 100%; } }
    }
    @media (max-width: 768px) { display: none; }
  }
  &__actions { display: flex; gap: 8px; }
}

// ═══════════════════════════════════════
// 按鈕
// ═══════════════════════════════════════
.xd-btn {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 10px 22px; font-family: inherit; font-size: 14px; font-weight: 500;
  border-radius: $r-sm; border: none; cursor: pointer;
  transition: all 0.25s $ease;
  svg { width: 16px; height: 16px; }

  &--primary { background: $steel; color: white; box-shadow: 0 2px 14px rgba($steel, 0.25);
    &:hover { background: $steel-light; transform: translateY(-1px); box-shadow: 0 4px 22px rgba($steel, 0.3); } }
  &--ghost { background: transparent; color: $text-muted;
    &:hover { color: $steel; background: rgba($steel, 0.06); } }
  &--outline { background: transparent; color: $text-body; border: 1.5px solid $border;
    &:hover { border-color: $steel; color: $steel; } }
  &--white { background: white; color: $steel; font-weight: 700; box-shadow: 0 4px 16px rgba(0,0,0,0.08);
    &:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(0,0,0,0.12); } }
  &--ghost-light { background: rgba(255,255,255,0.15); color: rgba(255,255,255,0.9); border: 1px solid rgba(255,255,255,0.3);
    &:hover { background: rgba(255,255,255,0.3); color: white; } }
  &--lg { padding: 14px 30px; font-size: 15px; border-radius: 12px; }
}

.xd-tag {
  display: inline-block; padding: 6px 16px;
  background: rgba($steel, 0.06); border: 1px solid rgba($steel, 0.12);
  border-radius: 100px; font-size: 13px; font-weight: 500; color: $steel; letter-spacing: 0.04em;
}

// ═══════════════════════════════════════
// Section
// ═══════════════════════════════════════
.xd-section {
  position: relative; z-index: 1;
  max-width: $max-w; margin: 0 auto; padding: 64px 24px;
  @media (max-width: 768px) { padding: 40px 16px; }

  &--alt { background: $bg-alt; max-width: none;
    > * { max-width: $max-w; margin-left: auto; margin-right: auto; } }
  &--full { max-width: none; padding-left: 0; padding-right: 0;
    .xd-section__header { max-width: $max-w; margin-left: auto; margin-right: auto; padding: 0 24px; } }

  &__header { text-align: center; margin-bottom: 36px; }
  &__title {
    font-family: 'Zen Kaku Gothic New', sans-serif;
    font-size: clamp(26px, 4.5vw, 40px); font-weight: 700;
    color: $text-dark; margin-top: 14px; letter-spacing: -0.01em; line-height: 1.25;
  }
  &__sub { font-size: 16px; color: $text-muted; margin-top: 10px; font-weight: 300; }
}

// ═══════════════════════════════════════
// Hero：全寬圖片 + 居中覆蓋
// ═══════════════════════════════════════
.xd-hero {
  position: relative; z-index: 1;
  min-height: 92vh;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  text-align: center;
  overflow: hidden;

  &__bg {
    position: absolute; inset: 0;
    img { width: 100%; height: 100%; object-fit: cover; }
    &::after {
      content: ''; position: absolute; bottom: 0; left: 0; right: 0;
      height: 120px;
      background: linear-gradient(to bottom, transparent, $bg);
    }
  }

  &__overlay {
    position: absolute; inset: 0;
    background:
      linear-gradient(180deg, rgba(#0a1628, 0.15) 0%, rgba(#0a1628, 0.45) 40%, rgba(#0a1628, 0.7) 70%, rgba(#0a1628, 0.88) 100%);
  }

  &__content {
    position: relative; z-index: 2;
    padding: 120px 24px 48px;
    max-width: 680px;
  }

  &__badge {
    display: inline-flex; align-items: center; gap: 10px;
    padding: 6px 16px; background: rgba(255,255,255,0.1);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255,255,255,0.2);
    border-radius: 100px; font-size: 12px; font-weight: 500; color: rgba(255,255,255,0.85);
    margin-bottom: 24px;
  }
  &__badge-dot { width: 7px; height: 7px; background: $steel-pale; border-radius: 50%; box-shadow: 0 0 8px rgba($steel-pale, 0.6); animation: softPulse 2.5s infinite; }

  &__title { margin-bottom: 18px; }
  &__title-line1 {
    display: block;
    font-family: 'Zen Kaku Gothic New', sans-serif;
    font-size: clamp(14px, 2vw, 18px); font-weight: 300;
    color: rgba(255,255,255,0.5); letter-spacing: 0.25em;
  }
  &__title-accent {
    display: block;
    font-family: 'Zen Kaku Gothic New', sans-serif;
    font-size: clamp(52px, 11vw, 96px); font-weight: 900;
    letter-spacing: -0.05em; line-height: 1;
    color: white;
    text-shadow: 0 4px 40px rgba($steel, 0.3);
  }

  &__desc {
    font-size: 16px; font-weight: 300; color: rgba(255,255,255,0.6);
    line-height: 1.8; margin-bottom: 28px;
  }

  &__cta {
    display: flex; gap: 14px; justify-content: center;
    @media (max-width: 480px) { flex-direction: column; align-items: center; }
  }

  // 數據條：內嵌在content裡
  &__stats {
    position: relative; z-index: 2;
    display: flex; justify-content: center; gap: 1px;
    width: 100%; max-width: 480px;
    margin: 32px auto 0;
  }

  &__stat {
    flex: 1; text-align: center;
    padding: 16px 12px;
    background: rgba(255,255,255,0.08);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255,255,255,0.1);
    &:first-child { border-radius: $r 0 0 $r; }
    &:last-child { border-radius: 0 $r $r 0; }
  }

  &__stat-num {
    display: block;
    font-family: 'Zen Kaku Gothic New', sans-serif;
    font-size: 26px; font-weight: 900; color: white;
    letter-spacing: -0.03em;
  }
  &__stat-label { font-size: 11px; color: rgba(255,255,255,0.45); font-weight: 300; margin-top: 2px; }
}

// ═══════════════════════════════════════
// Bento Grid 功能區
// ═══════════════════════════════════════
.xd-bento {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto auto;
  gap: 16px;

  // 第一項佔2列，視覺主角
  &__item--hero { grid-column: span 2; }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    &__item--hero { grid-column: span 1; }
  }

  &__item {
    position: relative; border-radius: $r; overflow: hidden;
    border: 2px solid $border-hover;
    box-shadow: $shadow-s;
    cursor: pointer;
    transition: all 0.3s $ease;

    &:hover { transform: translateY(-4px); box-shadow: $shadow-l;
      .xd-bento__img img { transform: scale(1.05); }
      .xd-bento__overlay { background: linear-gradient(0deg, rgba(#0a1628, 0.88) 0%, rgba(#0a1628, 0.3) 60%, transparent 100%); }
      .xd-bento__desc { opacity: 1; transform: translateY(0); }
    }
  }

  &__img {
    width: 100%; height: 100%;
    img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.5s $ease; }
    .xd-bento__item--hero & { height: 320px; }
    height: 240px;
    @media (max-width: 768px) { height: 220px; .xd-bento__item--hero & { height: 240px; } }
  }

  &__overlay {
    position: absolute; inset: 0;
    display: flex; flex-direction: column; justify-content: flex-end;
    padding: 24px;
    background: linear-gradient(0deg, rgba(#0a1628, 0.75) 0%, rgba(#0a1628, 0.15) 50%, transparent 100%);
    transition: background 0.3s $ease;
  }

  &__num {
    font-family: 'Zen Kaku Gothic New', sans-serif;
    font-size: 40px; font-weight: 900; color: rgba(255,255,255,0.1);
    line-height: 1; margin-bottom: 4px; letter-spacing: -0.04em;
    .xd-bento__item--hero & { font-size: 56px; }
  }

  &__title {
    font-family: 'Zen Kaku Gothic New', sans-serif;
    font-size: 18px; font-weight: 700; color: white;
    line-height: 1.3; margin-bottom: 4px;
    .xd-bento__item--hero & { font-size: 22px; }
  }

  &__desc {
    font-size: 13px; color: rgba(255,255,255,0.65); line-height: 1.6; font-weight: 300;
    max-width: 400px;
    opacity: 0; transform: translateY(8px);
    transition: all 0.3s $ease 0.05s;
    .xd-bento__item--hero & { font-size: 14px; }
  }
}

// ═══════════════════════════════════════
// 場景：標籤頁切換
// ═══════════════════════════════════════
.xd-tabs {
  &__nav {
    display: flex; gap: 8px; justify-content: center; flex-wrap: wrap;
    margin-bottom: 24px;
  }

  &__btn {
    padding: 8px 20px; border: 1.5px solid $border;
    border-radius: 100px; background: transparent;
    font-family: 'Zen Kaku Gothic New', sans-serif;
    font-size: 14px; font-weight: 500; color: $text-muted;
    cursor: pointer; transition: all 0.25s $ease;

    &:hover { border-color: $steel-pale; color: $steel; }

    &--active {
      background: $steel; border-color: $steel; color: white;
      box-shadow: 0 2px 12px rgba($steel, 0.25);
    }
  }

  &__panel {
    position: relative;
    border-radius: $r; overflow: hidden;
    border: 1px solid $border;
    box-shadow: $shadow-m;
    background: $card;
  }

  &__content {
    display: grid; grid-template-columns: 1.4fr 1fr; height: 360px;
    @media (max-width: 768px) { grid-template-columns: 1fr; height: auto; }
  }

  &__img {
    overflow: hidden;
    img { width: 100%; height: 360px; object-fit: cover; display: block; }
    @media (max-width: 768px) { img { height: 220px; } }
  }

  &__text {
    display: flex; flex-direction: column; justify-content: center;
    padding: 40px;
    @media (max-width: 768px) { padding: 24px; }

    h3 {
      font-family: 'Zen Kaku Gothic New', sans-serif;
      font-size: 24px; font-weight: 700; color: $text-dark;
      margin-bottom: 12px; line-height: 1.3;
    }
    p {
      font-size: 15px; color: $text-muted; line-height: 1.8; font-weight: 300;
    }
  }
}

// 進度指示器
.xd-tabs__progress {
  display: flex; justify-content: center; gap: 6px;
  padding: 12px 0;

  &-dot {
    width: 24px; height: 3px;
    border-radius: 2px; background: rgba($steel, 0.12);
    cursor: pointer; overflow: hidden;
    transition: all 0.3s $ease;
    position: relative;

    &::after {
      content: ''; position: absolute; inset: 0;
      background: $steel; border-radius: 2px;
      transform: scaleX(0); transform-origin: left;
    }

    &--active {
      width: 40px; background: rgba($steel, 0.15);
      &::after { transform: scaleX(1); animation: progressFill 4s linear forwards; }
    }
    &--paused::after { animation-play-state: paused; }

    &:hover { background: rgba($steel, 0.2); }
  }
}

@keyframes progressFill {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}

.scene-fade-enter-active, .scene-fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.scene-fade-enter-from { opacity: 0; transform: translateY(8px); }
.scene-fade-leave-to { opacity: 0; transform: translateY(-8px); }

// ═══════════════════════════════════════
// 案例：大引號風格
// ═══════════════════════════════════════
.xd-testimonials {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;
  @media (max-width: 1024px) { grid-template-columns: 1fr; max-width: 560px; margin: 0 auto; }
}

.xd-testimonial {
  padding: 24px; background: $card;
  border: 1px solid $border; border-radius: $r;
  transition: all 0.3s $ease; box-shadow: $shadow-s;
  cursor: pointer;
  display: flex; flex-direction: column;

  &:hover { border-color: $border-hover; transform: translateY(-3px); box-shadow: $shadow-l; }

  &__top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px; }

  &__quote-mark {
    font-family: 'Zen Kaku Gothic New', serif;
    font-size: 56px; font-weight: 900; line-height: 0.7;
    color: rgba($steel, 0.12);
  }

  &__stat { text-align: right; }
  &__stat-val {
    display: block;
    font-family: 'Zen Kaku Gothic New', sans-serif;
    font-size: 26px; font-weight: 900; color: $steel; line-height: 1.1;
  }
  &__stat-lbl { font-size: 12px; color: $text-faint; font-weight: 300; }

  &__text {
    font-size: 15px; color: $text-body; line-height: 1.8;
    margin: 0 0 auto; padding-bottom: 20px;
    font-style: italic; font-weight: 300;
  }

  &__author {
    display: flex; flex-direction: column; gap: 2px;
    padding-top: 16px; border-top: 1px solid rgba($steel, 0.08);
  }
  &__school { font-size: 14px; font-weight: 700; color: $text-dark; }
  &__person { font-size: 13px; color: $text-faint; font-weight: 300; }
}

// ═══════════════════════════════════════
// 新聞：非對稱
// ═══════════════════════════════════════
.xd-news-grid {
  display: grid; grid-template-columns: 1.4fr 1fr; gap: 24px;
  @media (max-width: 768px) { grid-template-columns: 1fr; }
}

.xd-news-featured {
  padding: 28px; background: $card;
  border: 1px solid $border; border-radius: $r;
  cursor: pointer; transition: all 0.25s $ease;
  box-shadow: $shadow-s;
  display: flex; flex-direction: column; justify-content: flex-end;
  min-height: 220px;

  &:hover { border-color: $border-hover; box-shadow: $shadow-l; }

  &__date { font-family: 'Zen Kaku Gothic New', monospace; font-size: 12px; color: $text-faint; font-weight: 300; }
  &__title {
    font-size: clamp(20px, 3vw, 28px); font-weight: 700; color: $text-dark;
    margin: 12px 0 20px; line-height: 1.4;
  }
  &__link {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 14px; color: $steel; font-weight: 500;
    svg { width: 14px; height: 14px; transition: transform 0.2s; }
    &:hover svg { transform: translateX(3px); }
  }
}

.xd-news-list {
  display: flex; flex-direction: column; gap: 12px;

  &__item {
    padding: 16px 20px; background: $card;
    border: 1px solid $border; border-radius: $r-sm;
    cursor: pointer; transition: all 0.25s $ease;
    &:hover { border-color: $border-hover; box-shadow: $shadow-m; }
  }
  &__date { font-family: 'Zen Kaku Gothic New', monospace; font-size: 11px; color: $text-faint; font-weight: 300; }
  &__title {
    font-size: 15px; font-weight: 700; color: $text-dark;
    margin-top: 6px; line-height: 1.4;
    display: -webkit-box; -webkit-line-clamp: 2; line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
  }
  &__more {
    display: block; text-align: center; padding: 12px;
    color: $text-muted; text-decoration: none; font-size: 13px;
    transition: color 0.2s;
    &:hover { color: $steel; }
  }
}

// ═══════════════════════════════════════
// CTA
// ═══════════════════════════════════════
.xd-cta {
  position: relative; z-index: 1;
  margin: 0 24px; border-radius: 24px; overflow: hidden;
  max-width: $max-w; margin-left: auto; margin-right: auto;

  &__bg {
    position: absolute; inset: 0; width: 100%; height: 100%;
    object-fit: cover; z-index: 0;
  }

  &::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba($accent, 0.88) 0%, rgba($steel, 0.82) 50%, rgba($steel-light, 0.78) 100%);
    z-index: 1;
  }

  &__inner {
    position: relative; z-index: 2;
    text-align: center; padding: 56px 24px;
    h2 { font-family: 'Zen Kaku Gothic New', sans-serif; font-size: clamp(24px, 4vw, 36px); font-weight: 700; color: white; margin-bottom: 10px; }
    p { font-size: 15px; color: rgba(255,255,255,0.7); margin-bottom: 24px; font-weight: 300; }
  }
  &__actions { display: flex; gap: 12px; justify-content: center;
    @media (max-width: 480px) { flex-direction: column; align-items: center; } }
}

// ═══════════════════════════════════════
// Footer：簡潔橫排
// ═══════════════════════════════════════
.xd-footer {
  position: relative; z-index: 1;
  border-top: 1px solid $border; margin-top: 48px;

  &__inner {
    max-width: $max-w; margin: 0 auto;
    padding: 36px 24px 24px;
    display: flex; align-items: flex-start; gap: 48px;
    @media (max-width: 768px) { flex-direction: column; gap: 32px; }
  }

  &__brand {
    flex: 1;
    p { font-size: 14px; color: $text-muted; margin-top: 10px; font-weight: 300; }
  }
  &__logo { height: 24px; }

  &__links {
    display: flex; flex-wrap: wrap; gap: 8px 24px;
    a { font-size: 13px; color: $text-muted; text-decoration: none; font-weight: 300; transition: color 0.2s;
      &:hover { color: $steel; } }
  }

  &__contact {
    display: flex; flex-direction: column; gap: 4px; text-align: right;
    span { font-family: 'Zen Kaku Gothic New', monospace; font-size: 13px; color: $text-faint; font-weight: 300; }
    @media (max-width: 768px) { text-align: left; }
  }

  &__bottom {
    max-width: $max-w; margin: 0 auto; padding: 16px 24px;
    border-top: 1px solid $border;
    display: flex; justify-content: space-between; align-items: center;
    font-size: 12px; color: $text-faint; font-weight: 300;
  }
  &__ver { font-family: 'Zen Kaku Gothic New', monospace; opacity: 0.5; }
}

// ═══════════════════════════════════════
// Modal
// ═══════════════════════════════════════
.xd-modal {
  position: fixed; inset: 0; z-index: 200;
  display: flex; align-items: center; justify-content: center;
  background: rgba($bg, 0.75); backdrop-filter: blur(10px); padding: 24px;

  &__box {
    position: relative; max-width: 640px; width: 100%;
    max-height: 80vh; overflow-y: auto;
    background: $card; border: 1px solid $border; border-radius: $r;
    padding: 40px; box-shadow: 0 24px 60px rgba($steel, 0.1);
  }
  &__close {
    position: absolute; top: 16px; right: 16px;
    width: 36px; height: 36px; display: flex; align-items: center; justify-content: center;
    background: rgba($steel, 0.06); border: 1px solid $border; border-radius: $r-sm;
    color: $text-muted; cursor: pointer; transition: all 0.2s;
    svg { width: 18px; height: 18px; }
    &:hover { color: $text-dark; background: rgba($steel, 0.1); }
  }
  &__date { font-family: 'Zen Kaku Gothic New', monospace; font-size: 12px; color: $text-faint; font-weight: 300; }
  &__content {
    h2 { font-family: 'Zen Kaku Gothic New', sans-serif; font-size: 24px; font-weight: 700; color: $text-dark; margin: 12px 0 20px; line-height: 1.4; }
    :deep(p) { font-size: 15px; color: $text-body; line-height: 1.8; margin-bottom: 16px; }
    :deep(img) { max-width: 100%; border-radius: $r-sm; }
  }
}

.modal-enter-active, .modal-leave-active { transition: opacity 0.3s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }

// ═══════════════════════════════════════
// prefers-reduced-motion
// ═══════════════════════════════════════
@media (prefers-reduced-motion: reduce) {
  .xd-bg__grid { animation: none; }
  .xd-bg__glow { animation: none; }
  .reveal { transition: opacity 0.3s ease; transform: none; }
  .reveal.revealed { transform: none; }
  .xd-zigzag__img:hover img,
  .xd-hscroll__card:hover,
  .xd-testimonial:hover,
  .xd-news-featured:hover { transform: none; }
}
</style>
