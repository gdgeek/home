<script setup lang="ts">
/**
 * MRPP 混合现实实训平台首页
 * 设计参考：腾讯云活动页 cloud.tencent.com/act/pro 风格
 * 深色背景 + 渐变光效 + 彩色卡片 + 视觉丰富的促销页风格
 * 配色：深蓝底 #0D1B3E + 品牌蓝 #0052D9 + 橙色强调 #FF6A00
 */
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useBrand } from '@/composables/useBrand'
import LoginModal from '@/components/common/LoginModal.vue'

const { footer } = useBrand()
const showLoginModal = ref(false)
const navScrolled = ref(false)
const animatedSections = ref<Set<HTMLElement>>(new Set())
const activeScene = ref(0)
const mobileMenuOpen = ref(false)

// 明暗主题
const isDark = ref(true) // 默认深色，匹配腾讯云活动页
const initTheme = () => {
  const saved = localStorage.getItem('mrpp-theme')
  if (saved) isDark.value = saved === 'dark'
}
const toggleTheme = () => {
  isDark.value = !isDark.value
  localStorage.setItem('mrpp-theme', isDark.value ? 'dark' : 'light')
}

const buildTime = computed(() => {
  const timestamp = window.__BUILD_TIME__ || __BUILD_TIME__ || new Date().toISOString()
  const date = new Date(timestamp)
  return date.toLocaleString('zh-CN', {
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', hour12: false
  }).replace(/\//g, '-')
})

const handleOpenLogin = () => { showLoginModal.value = true }

const navItems = [
  { text: '核心能力', url: '#features' },
  { text: '实训场景', url: '#scenes' },
  { text: '合作案例', url: '#cases' },
  { text: '硬件设备', url: '#device' },
  { text: '技术合作', url: '#partners' }
]

const stats = [
  { number: '200+', label: '合作院校' },
  { number: '50万+', label: '实训学时' },
  { number: '98%', label: '客户满意度' },
  { number: '30+', label: '行业覆盖' }
]

const features = [
  { id: 'lowcode', icon: 'cube', title: '零代码/低代码创作', desc: '可视化拖拽场景编辑，无需编程基础即可上手。支持拖拽3D素材、设置"触发器+动作"交互逻辑，内置资源库与多场景模板，快速构建MR实训内容。', highlight: '核心', img: '/images/ar-platform/UGC场景编辑器界面.webp' },
  { id: 'ai', icon: 'chart', title: 'AI引擎加持', desc: '集成AI 3D生成能力，通过文本描述或图片即可创建3D模型，极大简化内容制作流程，非专业设计师也能轻松创建复杂MR场景。', highlight: '智能', img: '/images/ar-platform/高中生操作AR内容，欢笑.webp' },
  { id: 'multimodal', icon: 'device', title: '多模态空间交互', desc: '支持手势识别（抓取、点击、滑动）与语音指令双通道操作，自然交互直接操控虚拟物体，适用于需要双手进行其他任务的实训场景。', highlight: '交互', img: '/images/ar-platform/女士操作Rokid AR Studio.webp' },
  { id: 'logic', icon: 'grid', title: '可视化逻辑编排', desc: '图形化逻辑编辑工具，以拖拽积木块方式搭建交互逻辑。设置"如果…就…"触发规则，无需编程即可实现复杂交互功能，大幅降低内容创作门槛。', highlight: '编排', img: '/images/ar-platform/拖拽程序生成工具.webp' },
  { id: 'thirdview', icon: 'doc', title: '第三方视角与多设备互联', desc: '支持外部设备实时同步展示MR场景，可大屏投屏供观众共同观看；多设备连接同一场景，实时位置同步与交互共享，支持团队协作。', highlight: '协同', img: '/images/ar-platform/third-person-view.webp' },
  { id: 'oneclick', icon: 'shield', title: '一键生成应用', desc: '自动编译并打包MR应用，快速测试和发布。从场景编辑到逻辑编排到应用生成，全流程在线完成，降低发布门槛。', highlight: '发布', img: '/images/ar-platform/本课程操作AR内容.webp' }
]

const scenes = [
  { title: '工业设备实训', desc: '大型设备以1:1虚拟实体精准还原机械结构与作业流程，360°可交互观察运作细节，模拟动态场景，让复杂工程设备可视化、可操作，高效助力教学培训与技术交底。', tag: '工业', color: '#3B82F6', img: '/images/ar-platform/AR掘进机展示.webp' },
  { title: '医疗护理教学', desc: '3D模拟医疗操作流程与人体结构，清晰标注关键步骤与注意事项，学员可在零风险环境中反复练习标准流程，让复杂医疗知识可视化、可操作。', tag: '医疗', color: '#10B981', img: '/images/ar-platform/AR医疗 窝沟封闭.webp' },
  { title: '校园沙盘与展厅', desc: 'MR赋能校园沙盘与展厅场景，虚实融合呈现全貌。3D还原标志性建筑与历史场景，可手势缩放查看布局与沿革，让人文底蕴与空间信息直观可感。', tag: '展厅', color: '#F59E0B', img: '/images/ar-platform/AR沙盘，中南大学.webp' },
  { title: '护理技能实训', desc: '空间还原常见伤情场景，手势交互可分步查看清洁消毒、止血护创等实操步骤，标注关键工具与禁忌，直观掌握正确方法，快速应对突发情况。', tag: '护理', color: '#8B5CF6', img: '/images/ar-platform/婴幼儿护理 外伤处理.webp' },
  { title: '多人协作体验', desc: '基于6DoF空间定位与实时多人联机，多设备连接同一场景实现协同操作。超清视觉与流畅手势响应，适用于团队协作实训与沉浸式互动体验。', tag: '协作', color: '#EF4444', img: '/images/ar-platform/多人AR游戏，三方视角.webp' }
]

const cases = [
  { org: '高校AR教育合作', quote: '与多所高校建立合作关系，共同探索MR技术在专业教学和科研中的应用，培养具备空间计算应用开发能力的复合型人才。', role: '产学研合作', stat: { value: '10+', label: '合作院校' }, img: '/images/ar-platform/students-collab.webp' },
  { org: '中学创客工作坊', quote: '面向中学开展MR创作工作坊，让学生亲身体验内容创作过程，将创意转化为实际应用，产出校园导览、文化展示等作品。', role: '科创教育', stat: { value: '500+', label: '参与学生' }, img: '/images/ar-platform/school-classroom.webp' },
  { org: '科技馆展厅应用', quote: '为科技馆提供MR互动展项解决方案，虚实融合呈现展品细节，手势交互提升观众参与感与科普效果。', role: '场馆展示', stat: { value: '50万+', label: '体验人次' }, img: '/images/ar-platform/science-museum.webp' }
]

const certifications = [
  '高校产学研共创',
  '科技馆课程采购认证',
  '多校常态化教学试点',
  '全国青少年MR创作赛事支持'
]

const deviceFeatures = [
  { title: '空间办公', desc: '多屏多任务处理，图片、视频、文档灵活切换，巨幕模式比例可达32:9', img: '/images/rokid/rokid-scene-work.webp' },
  { title: '沉浸影音', desc: '300英寸巨幕体验，空间声场多维呈现，3D影音栩栩如生', img: '/images/rokid/rokid-bigscreen.webp' },
  { title: '游戏娱乐', desc: '支持Switch、PS5等设备连接，120Hz高刷流畅体验', img: '/images/rokid/rokid-gaming.webp' },
  { title: '教育实训', desc: '知识可"触"，直观感知、生动体验、模拟实践，覆盖K12到高等教育', img: '/images/rokid/rokid-scene-game.webp' }
]

const partners = [
  {
    name: 'Rokid（灵伴科技）',
    role: '硬件技术合作伙伴',
    desc: '成立于2014年，总部位于杭州，是全球领先的AR智能眼镜品牌。产品覆盖80+国家，累计出货超100万台设备，拥有400+研发专家。曾获CES、WIRED等20+国际大奖，估值超10亿美元。',
    highlights: ['80+国家覆盖', '100万+设备出货', '400+研发专家', '20+国际大奖'],
    logo: '/images/rokid/rokid-logo.webp',
    url: 'https://global.rokid.com'
  },
  {
    name: '杭州求证科技',
    role: 'XR教育解决方案集成商',
    desc: '专注于XR技术在教育领域的落地应用，整合行业领先的硬件与软件资源，为教育机构和企业提供从需求规划、内容定制到部署实施的一站式MR实训解决方案。',
    highlights: ['教育行业深耕', '一站式解决方案', '内容定制服务', '部署实施支持'],
    logo: '/logo/xingkou/xingkou_logo.webp',
    url: '#'
  }
]

let sceneTimer: ReturnType<typeof setInterval> | null = null
const scenePaused = ref(false)
const startSceneTimer = () => {
  if (sceneTimer) clearInterval(sceneTimer)
  sceneTimer = setInterval(() => {
    if (!scenePaused.value) activeScene.value = (activeScene.value + 1) % scenes.length
  }, 4000)
}

const isInViewport = (el: HTMLElement) => {
  const rect = el.getBoundingClientRect()
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
  initTheme()
  window.addEventListener('scroll', handleScroll)
  handleScroll()
  startSceneTimer()
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  if (sceneTimer) clearInterval(sceneTimer)
})
</script>

<template>
  <div class="mp" :class="{ 'mp--light': !isDark }">
    <!-- 全局背景 -->
    <div class="mp-bg" aria-hidden="true">
      <div class="mp-bg__gradient"></div>
      <div class="mp-bg__grid"></div>
      <div class="mp-bg__orb mp-bg__orb--1"></div>
      <div class="mp-bg__orb mp-bg__orb--2"></div>
      <div class="mp-bg__orb mp-bg__orb--3"></div>
    </div>

    <!-- 导航 -->
    <header class="mp-nav" :class="{ 'mp-nav--scrolled': navScrolled }">
      <div class="mp-nav__inner">
        <a href="#" class="mp-nav__logo">
          <span class="mp-nav__logo-icon">
            <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="8" height="8" rx="2" fill="#3B82F6"/><rect x="13" y="3" width="8" height="8" rx="2" fill="#60A5FA" opacity="0.7"/><rect x="3" y="13" width="8" height="8" rx="2" fill="#60A5FA" opacity="0.7"/><rect x="13" y="13" width="8" height="8" rx="2" fill="#93C5FD" opacity="0.4"/></svg>
          </span>
          <span class="mp-nav__logo-mark"><span style="color:#3B82F6">M</span><span style="color:#60A5FA">R</span><span style="color:#60A5FA">P</span><span style="color:#93C5FD">P</span></span>
          <span class="mp-nav__logo-divider"></span>
          <span class="mp-nav__logo-text">混合现实<span style="color:#3B82F6">实</span><span style="color:#60A5FA">训</span><span style="color:#60A5FA">平</span><span style="color:#93C5FD">台</span></span>
        </a>
        <nav class="mp-nav__links" aria-label="主导航">
          <a v-for="item in navItems" :key="item.text" :href="item.url">{{ item.text }}</a>
        </nav>
        <div class="mp-nav__actions">
          <button class="mp-theme-toggle" @click="toggleTheme" :aria-label="isDark ? '切换到浅色模式' : '切换到深色模式'">
            <svg v-if="!isDark" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
          </button>
          <button class="mp-btn mp-btn--cta" @click="handleOpenLogin">登录</button>
          <button class="mp-nav__hamburger" @click="mobileMenuOpen = !mobileMenuOpen" aria-label="菜单">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
      <Transition name="mobile-menu">
        <div v-if="mobileMenuOpen" class="mp-nav__mobile">
          <a v-for="item in navItems" :key="item.url" :href="item.url" @click="mobileMenuOpen = false">{{ item.text }}</a>
          <button class="mp-btn mp-btn--cta mp-btn--block" @click="handleOpenLogin">登录</button>
        </div>
      </Transition>
    </header>

    <!-- Hero -->
    <section class="mp-hero">
      <div class="mp-hero__content reveal">
        <div class="mp-hero__badge">
          <span class="mp-hero__badge-hot">HOT</span>
          Mixed Reality Practical Platform
        </div>
        <h1 class="mp-hero__title">
          混合现实<span class="mp-hero__title-accent">实训平台</span>
        </h1>
        <p class="mp-hero__desc">零代码/低代码MR内容创作平台，AI加持3D生成<br>让实训内容开发更简单、教学交互更沉浸</p>
        <div class="mp-hero__cta">
          <button class="mp-btn mp-btn--hero mp-btn--lg" @click="handleOpenLogin">
            立即体验
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>
      <div class="mp-hero__stats reveal">
        <div v-for="s in stats" :key="s.label" class="mp-hero__stat">
          <span class="mp-hero__stat-num">{{ s.number }}</span>
          <span class="mp-hero__stat-label">{{ s.label }}</span>
        </div>
      </div>
    </section>

    <!-- 核心能力 -->
    <section id="features" class="mp-section">
      <div class="mp-section__header reveal">
        <div class="mp-section__label">
          <span class="mp-section__label-line"></span>
          核心能力
          <span class="mp-section__label-line"></span>
        </div>
        <h2 class="mp-section__title">六大核心能力，赋能MR内容创作</h2>
        <p class="mp-section__sub">从零代码编辑到AI生成，从多模态交互到一键发布，全流程覆盖</p>
      </div>
      <div class="mp-features reveal">
        <div v-for="f in features" :key="f.id" class="mp-feature">
          <div v-if="f.img" class="mp-feature__img">
            <img :src="f.img" :alt="f.title" loading="lazy" />
          </div>
          <div class="mp-feature__body">
            <div class="mp-feature__top">
              <span class="mp-feature__badge">{{ f.highlight }}</span>
              <div class="mp-feature__icon">
                <svg v-if="f.icon === 'cube'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
                <svg v-else-if="f.icon === 'shield'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
                <svg v-else-if="f.icon === 'chart'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
                <svg v-else-if="f.icon === 'doc'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                <svg v-else-if="f.icon === 'device'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
              </div>
            </div>
            <h3 class="mp-feature__title">{{ f.title }}</h3>
            <p class="mp-feature__desc">{{ f.desc }}</p>
            <a class="mp-feature__link" @click="handleOpenLogin">了解详情 →</a>
          </div>
        </div>
      </div>
    </section>

    <!-- 实训场景 -->
    <section id="scenes" class="mp-section">
      <div class="mp-section__header reveal">
        <div class="mp-section__label">
          <span class="mp-section__label-line"></span>
          实训场景
          <span class="mp-section__label-line"></span>
        </div>
        <h2 class="mp-section__title">覆盖多行业实训需求</h2>
      </div>
      <div class="mp-scenes reveal">
        <div class="mp-scenes__sidebar">
          <button v-for="(s, idx) in scenes" :key="s.tag"
                  class="mp-scenes__tab"
                  :class="{ 'mp-scenes__tab--active': activeScene === idx }"
                  :style="activeScene === idx ? { borderColor: s.color } : {}"
                  @click="activeScene = idx"
                  @mouseenter="scenePaused = true"
                  @mouseleave="scenePaused = false">
            <span class="mp-scenes__tab-dot" :style="{ background: s.color }"></span>
            {{ s.title }}
          </button>
        </div>
        <div class="mp-scenes__main">
          <Transition name="scene-fade" mode="out-in">
            <div class="mp-scenes__content" :key="activeScene">
              <div class="mp-scenes__body">
                <div class="mp-scenes__text">
                  <span class="mp-scenes__tag" :style="{ background: scenes[activeScene].color + '22', color: scenes[activeScene].color, borderColor: scenes[activeScene].color + '44' }">{{ scenes[activeScene].tag }}</span>
                  <h3 class="mp-scenes__title">{{ scenes[activeScene].title }}</h3>
                  <p class="mp-scenes__desc">{{ scenes[activeScene].desc }}</p>
                  <div class="mp-scenes__actions">
                    <button class="mp-btn mp-btn--cta" @click="handleOpenLogin">立即体验</button>
                    <button class="mp-btn mp-btn--ghost-card">查看详情</button>
                  </div>
                </div>
                <div v-if="scenes[activeScene].img" class="mp-scenes__img">
                  <img :src="scenes[activeScene].img" :alt="scenes[activeScene].title" loading="lazy" />
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </section>

    <!-- 合作案例 -->
    <section id="cases" class="mp-section">
      <div class="mp-section__header reveal">
        <div class="mp-section__label">
          <span class="mp-section__label-line"></span>
          合作案例
          <span class="mp-section__label-line"></span>
        </div>
        <h2 class="mp-section__title">服务全国院校与企业</h2>
      </div>
      <div class="mp-cases reveal">
        <div v-for="(c, idx) in cases" :key="idx" class="mp-case">
          <div v-if="c.img" class="mp-case__img">
            <img :src="c.img" :alt="c.org" loading="lazy" />
          </div>
          <div class="mp-case__body">
            <div class="mp-case__highlight">
              <span class="mp-case__val">{{ c.stat.value }}</span>
              <span class="mp-case__label">{{ c.stat.label }}</span>
            </div>
            <h3 class="mp-case__org">{{ c.org }}</h3>
            <p class="mp-case__quote">"{{ c.quote }}"</p>
            <span class="mp-case__role">— {{ c.role }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 硬件设备 — Rokid AR Studio -->
    <section id="device" class="mp-section">
      <div class="mp-section__header reveal">
        <div class="mp-section__label">
          <span class="mp-section__label-line"></span>
          硬件设备
          <span class="mp-section__label-line"></span>
        </div>
        <h2 class="mp-section__title">Rokid AR Studio · 空间计算套装</h2>
        <p class="mp-section__sub">Rokid Max Pro AR眼镜 + Station Pro 空间计算主机，6DoF空间定位与3D手势交互</p>
      </div>

      <!-- 左右布局：产品图 + 参数 -->
      <div class="mp-device reveal">
        <div class="mp-device__visual">
          <img src="/images/rokid/rokid-person-using.webp" alt="Rokid AR Studio" loading="lazy" />
          <div class="mp-device__badge">AR空间计算</div>
        </div>
        <div class="mp-device__info">
          <h3 class="mp-device__title">76g 超轻机身，沉浸不设限</h3>
          <p class="mp-device__desc">1920×1200 Micro OLED 显示屏，约50°超大视场角，最高120Hz刷新率。搭载骁龙XR2+ Gen1芯片，12GB运存+128GB存储，4800万像素摄像头，支持6DoF空间定位、3D手势与语音多模态交互。</p>
          <div class="mp-device__stats">
            <div class="mp-device__stat">
              <span class="mp-device__stat-num">50°</span>
              <span class="mp-device__stat-label">超大视场角</span>
            </div>
            <div class="mp-device__stat">
              <span class="mp-device__stat-num">120Hz</span>
              <span class="mp-device__stat-label">最高刷新率</span>
            </div>
            <div class="mp-device__stat">
              <span class="mp-device__stat-num">76g</span>
              <span class="mp-device__stat-label">超轻佩戴</span>
            </div>
            <div class="mp-device__stat">
              <span class="mp-device__stat-num">6DoF</span>
              <span class="mp-device__stat-label">空间定位</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 设备应用场景 -->
      <div class="mp-device-scenes reveal">
        <div v-for="df in deviceFeatures" :key="df.title" class="mp-device-scene">
          <div class="mp-device-scene__img">
            <img :src="df.img" :alt="df.title" loading="lazy" />
          </div>
          <div class="mp-device-scene__body">
            <h4>{{ df.title }}</h4>
            <p>{{ df.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 技术合作伙伴 -->
    <section id="partners" class="mp-section">
      <div class="mp-section__header reveal">
        <div class="mp-section__label">
          <span class="mp-section__label-line"></span>
          技术合作
          <span class="mp-section__label-line"></span>
        </div>
        <h2 class="mp-section__title">强强联合，共建MR实训生态</h2>
      </div>
      <div class="mp-partners reveal">
        <div v-for="p in partners" :key="p.name" class="mp-partner">
          <div class="mp-partner__header">
            <div class="mp-partner__logo">
              <img :src="p.logo" :alt="p.name" loading="lazy" />
            </div>
            <div>
              <h3 class="mp-partner__name">{{ p.name }}</h3>
              <span class="mp-partner__role">{{ p.role }}</span>
            </div>
          </div>
          <p class="mp-partner__desc">{{ p.desc }}</p>
          <div class="mp-partner__highlights">
            <span v-for="h in p.highlights" :key="h" class="mp-partner__tag">{{ h }}</span>
          </div>
        </div>
      </div>

      <!-- 资质认证 -->
      <div class="mp-trust reveal">
        <h3 class="mp-trust__title">资质认证与荣誉</h3>
        <div class="mp-trust__items">
          <div v-for="cert in certifications" :key="cert" class="mp-trust__item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            <span>{{ cert }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="mp-cta reveal">
      <div class="mp-cta__glow" aria-hidden="true"></div>
      <div class="mp-cta__inner">
        <h2>开启混合现实实训新时代</h2>
        <p>联系我们获取定制化解决方案，助力您的实训教学升级</p>
        <div class="mp-cta__actions">
          <button class="mp-btn mp-btn--hero mp-btn--lg" @click="handleOpenLogin">免费试用</button>
          <button class="mp-btn mp-btn--hero-ghost mp-btn--lg">联系销售</button>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="mp-footer">
      <div class="mp-footer__inner">
        <div class="mp-footer__brand">
          <span class="mp-footer__logo"><span style="color:#3B82F6">M</span><span style="color:#60A5FA">R</span><span style="color:#60A5FA">P</span><span style="color:#93C5FD">P</span></span>
          <p>混合现实实训平台 · 让技能培养更高效</p>
        </div>
        <div class="mp-footer__links">
          <a href="#">产品方案</a><a href="#">技术文档</a><a href="#">合作案例</a>
          <a href="#">关于我们</a><a href="#">用户协议</a><a href="#">隐私政策</a>
        </div>
        <div class="mp-footer__contact">
          <span>400-xxx-xxxx</span>
          <span>contact@mrpp.com</span>
        </div>
      </div>
      <div class="mp-footer__bottom">
        <span>{{ footer.copyright || '© 2025 MRPP 混合现实实训平台' }}</span>
        <span class="mp-footer__ver">{{ buildTime }}</span>
      </div>
    </footer>

    <LoginModal v-model="showLoginModal" />
  </div>
</template>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@200;400;500;600;700;800&family=IBM+Plex+Mono:wght@400;600;700&family=Noto+Sans+SC:wght@300;400;500;700;900&family=Inter:wght@400;500;600;700;800&display=swap');

$ease: cubic-bezier(0.22, 1, 0.36, 1);
$r: 0;
$r-sm: 6px;
$max-w: 1200px;

@keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
@keyframes glow { 0%, 100% { opacity: 0.4; } 50% { opacity: 0.8; } }
@keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }

.reveal {
  opacity: 0; transform: translateY(24px);
  transition: opacity 0.6s $ease, transform 0.6s $ease;
  &.revealed { opacity: 1; transform: translateY(0); }
}
.scene-fade-enter-active, .scene-fade-leave-active { transition: all 0.3s $ease; }
.scene-fade-enter-from { opacity: 0; transform: translateX(16px); }
.scene-fade-leave-to { opacity: 0; transform: translateX(-16px); }
.mobile-menu-enter-active, .mobile-menu-leave-active { transition: all 0.25s $ease; }
.mobile-menu-enter-from, .mobile-menu-leave-to { opacity: 0; transform: translateY(-8px); }

// ═══════════════════════════════════════
// 根 — 深色为主（腾讯云活动页风格）
// ═══════════════════════════════════════
.mp {
  --brand: #3B82F6;
  --brand-bright: #60A5FA;
  --brand-dim: #1D4ED8;
  --accent: #FF6A00;
  --accent-light: #FF8C38;
  --success: #10B981;

  --bg-deep: #080E1E;
  --bg-base: #0C1529;
  --bg-card: #111B33;
  --bg-card-hover: #162040;
  --bg-elevated: #1A2744;

  --text-bright: #F1F5F9;
  --text-main: #CBD5E1;
  --text-dim: #64748B;
  --text-faint: #475569;

  --glow-blue: rgba(59, 130, 246, 0.15);
  --glow-orange: rgba(255, 106, 0, 0.1);
  --border-card: rgba(59, 130, 246, 0.12);
  --border-subtle: rgba(255, 255, 255, 0.06);

  font-family: 'Inter', 'Noto Sans SC', 'IBM Plex Sans', -apple-system, sans-serif;
  color: var(--text-main); background: var(--bg-deep);
  min-height: 100vh; overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  transition: background 0.4s $ease, color 0.4s $ease;

  ::selection { background: rgba(59, 130, 246, 0.3); color: #fff; }

  // 浅色主题
  &--light {
    --bg-deep: #F0F4F8;
    --bg-base: #FFFFFF;
    --bg-card: #FFFFFF;
    --bg-card-hover: #F8FAFC;
    --bg-elevated: #F1F5F9;

    --text-bright: #0F172A;
    --text-main: #334155;
    --text-dim: #64748B;
    --text-faint: #94A3B8;

    --glow-blue: rgba(59, 130, 246, 0.06);
    --glow-orange: rgba(255, 106, 0, 0.04);
    --border-card: rgba(59, 130, 246, 0.15);
    --border-subtle: rgba(0, 0, 0, 0.06);
  }
}

// ═══════════════════════════════════════
// 全局背景 — 深色渐变 + 光球
// ═══════════════════════════════════════
.mp-bg {
  position: fixed; inset: 0; pointer-events: none; z-index: 0;
  &__gradient {
    position: absolute; inset: 0;
    background: linear-gradient(180deg, var(--bg-deep) 0%, var(--bg-base) 40%, var(--bg-deep) 100%);
  }
  &__grid {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(59, 130, 246, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(59, 130, 246, 0.03) 1px, transparent 1px);
    background-size: 60px 60px;
    mask-image: radial-gradient(ellipse 70% 50% at 50% 30%, black 0%, transparent 70%);
  }
  &__orb {
    position: absolute; border-radius: 50%; filter: blur(120px);
    &--1 { width: 600px; height: 400px; background: rgba(59, 130, 246, 0.08); top: -10%; left: 5%; animation: glow 12s ease-in-out infinite; }
    &--2 { width: 400px; height: 400px; background: rgba(139, 92, 246, 0.06); top: 30%; right: -5%; animation: glow 16s ease-in-out infinite 4s; }
    &--3 { width: 500px; height: 300px; background: rgba(255, 106, 0, 0.04); bottom: 10%; left: 20%; animation: glow 20s ease-in-out infinite 8s; }
  }
}
.mp--light .mp-bg__grid {
  background-image:
    linear-gradient(rgba(59, 130, 246, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(59, 130, 246, 0.04) 1px, transparent 1px);
}
.mp--light .mp-bg__orb--1 { background: rgba(59, 130, 246, 0.04); }
.mp--light .mp-bg__orb--2 { background: rgba(139, 92, 246, 0.03); }
.mp--light .mp-bg__orb--3 { background: rgba(255, 106, 0, 0.02); }

// ═══════════════════════════════════════
// 导航 — 深色毛玻璃
// ═══════════════════════════════════════
.mp-nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  background: rgba(8, 14, 30, 0.7);
  backdrop-filter: blur(24px) saturate(140%);
  border-bottom: 1px solid var(--border-subtle);
  transition: all 0.3s $ease;

  &--scrolled { background: rgba(8, 14, 30, 0.92); box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3); }

  &__inner {
    max-width: $max-w; margin: 0 auto; padding: 0 24px;
    height: 60px; display: flex; align-items: center; justify-content: space-between;
  }

  &__logo { display: flex; align-items: center; gap: 8px; text-decoration: none; }
  &__logo-icon { width: 28px; height: 28px; display: flex; align-items: center; svg { width: 100%; height: 100%; } }
  &__logo-mark { font-family: 'IBM Plex Mono', monospace; font-size: 18px; font-weight: 700; letter-spacing: 0.04em; }
  &__logo-divider { width: 1px; height: 16px; background: rgba(255,255,255,0.15); margin: 0 4px; }
  &__logo-text { font-size: 13px; color: rgba(255,255,255,0.4); @media (max-width: 640px) { display: none; } }

  &__links {
    display: flex; gap: 28px;
    a { color: rgba(255,255,255,0.55); text-decoration: none; font-size: 14px; font-weight: 500; transition: color 0.2s; cursor: pointer;
      &:hover { color: #fff; } }
    @media (max-width: 768px) { display: none; }
  }

  &__actions { display: flex; gap: 8px; align-items: center; }
  &__hamburger {
    display: none; flex-direction: column; gap: 4px; padding: 8px; background: transparent; border: none; cursor: pointer;
    @media (max-width: 768px) { display: flex; }
    span { width: 18px; height: 2px; background: rgba(255,255,255,0.5); border-radius: 2px; }
  }
  &__mobile {
    position: absolute; top: 100%; left: 0; right: 0;
    background: rgba(12, 21, 41, 0.98); backdrop-filter: blur(24px);
    border-bottom: 1px solid var(--border-subtle); padding: 12px 16px;
    display: flex; flex-direction: column; gap: 2px;
    a { display: block; padding: 12px 16px; color: rgba(255,255,255,0.6); text-decoration: none; font-size: 15px; border-radius: 0; cursor: pointer;
      &:hover { background: rgba(255,255,255,0.05); color: #fff; } }
  }
}
.mp--light .mp-nav { background: rgba(255,255,255,0.85); border-bottom-color: rgba(0,0,0,0.06); }
.mp--light .mp-nav--scrolled { background: rgba(255,255,255,0.95); box-shadow: 0 2px 12px rgba(0,0,0,0.06); }
.mp--light .mp-nav__logo-divider { background: rgba(0,0,0,0.1); }
.mp--light .mp-nav__logo-text { color: var(--text-dim); }
.mp--light .mp-nav__links a { color: var(--text-dim); &:hover { color: var(--brand); } }
.mp--light .mp-nav__hamburger span { background: var(--text-dim); }

// ═══════════════════════════════════════
// 主题切换 & 按钮
// ═══════════════════════════════════════
.mp-theme-toggle {
  width: 36px; height: 36px; border-radius: 6px; background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.08); cursor: pointer;
  display: flex; align-items: center; justify-content: center; transition: all 0.2s;
  &:hover { background: rgba(255,255,255,0.12); }
  svg { width: 16px; height: 16px; color: rgba(255,255,255,0.6); }
}
.mp--light .mp-theme-toggle { background: rgba(0,0,0,0.04); border-color: rgba(0,0,0,0.08);
  &:hover { background: rgba(0,0,0,0.08); }
  svg { color: var(--text-dim); }
}

.mp-btn {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 9px 22px; font-family: inherit; font-size: 14px; font-weight: 500;
  border-radius: $r-sm; border: none; cursor: pointer; transition: all 0.2s $ease;
  svg { width: 16px; height: 16px; }

  &--cta {
    background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%); color: #fff;
    box-shadow: 0 2px 12px rgba(59, 130, 246, 0.3);
    &:hover { box-shadow: 0 4px 20px rgba(59, 130, 246, 0.45); transform: translateY(-1px); }
  }
  &--ghost { background: transparent; color: rgba(255,255,255,0.6); &:hover { color: #fff; background: rgba(255,255,255,0.06); } }
  &--ghost-card { background: transparent; color: var(--text-dim); border: 1px solid var(--border-card); &:hover { color: var(--brand-bright); border-color: var(--brand); } }
  &--hero {
    background: linear-gradient(135deg, var(--accent) 0%, #FF8C38 100%); color: #fff; font-weight: 600;
    box-shadow: 0 4px 20px rgba(255, 106, 0, 0.35);
    &:hover { box-shadow: 0 6px 28px rgba(255, 106, 0, 0.5); transform: translateY(-2px); }
  }
  &--hero-ghost { background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.85); border: 1px solid rgba(255,255,255,0.15);
    &:hover { background: rgba(255,255,255,0.14); color: #fff; } }
  &--white { background: #fff; color: var(--brand-dim); font-weight: 600; &:hover { transform: translateY(-1px); box-shadow: 0 4px 16px rgba(0,0,0,0.12); } }
  &--lg { padding: 13px 36px; font-size: 15px; border-radius: 6px; }
  &--block { width: 100%; justify-content: center; margin-top: 8px; }
}
.mp--light .mp-btn--ghost { color: var(--text-dim); &:hover { color: var(--brand); background: rgba(59,130,246,0.06); } }

// ═══════════════════════════════════════
// Section
// ═══════════════════════════════════════
.mp-section {
  position: relative; z-index: 1;
  max-width: $max-w; margin: 0 auto; padding: 80px 24px;
  @media (max-width: 768px) { padding: 56px 16px; }

  &__header { text-align: center; margin-bottom: 48px; }
  &__label {
    display: flex; align-items: center; justify-content: center; gap: 12px;
    font-size: 13px; font-weight: 600; color: var(--brand-bright); letter-spacing: 0.08em;
    text-transform: uppercase; margin-bottom: 12px;
  }
  &__label-line { width: 24px; height: 1px; background: linear-gradient(90deg, transparent, var(--brand), transparent); }
  &__title {
    font-family: 'IBM Plex Sans', 'Noto Sans SC', sans-serif;
    font-size: clamp(24px, 4vw, 36px); font-weight: 700;
    color: var(--text-bright); letter-spacing: -0.01em; line-height: 1.3;
    transition: color 0.4s $ease;
  }
  &__sub { font-size: 15px; color: var(--text-dim); margin-top: 8px; max-width: 500px; margin-left: auto; margin-right: auto; line-height: 1.7; }
}

// ═══════════════════════════════════════
// Hero — 大气深色渐变
// ═══════════════════════════════════════
.mp-hero {
  position: relative; z-index: 1;
  min-height: 560px; padding: 130px 24px 0;
  display: flex; flex-direction: column; align-items: center; text-align: center;

  &__content { position: relative; z-index: 2; max-width: 700px; }

  &__badge {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 6px 18px; background: rgba(59, 130, 246, 0.1);
    border: 1px solid rgba(59, 130, 246, 0.2); border-radius: 0;
    font-size: 13px; font-weight: 500; color: var(--brand-bright);
    margin-bottom: 24px;
  }
  &__badge-hot {
    padding: 1px 8px; border-radius: 3px; font-size: 11px; font-weight: 700;
    background: linear-gradient(135deg, #FF6A00, #FF3D00); color: #fff;
    letter-spacing: 0.04em;
  }

  &__title {
    font-family: 'IBM Plex Sans', 'Noto Sans SC', sans-serif;
    font-size: clamp(36px, 7vw, 56px); font-weight: 800;
    line-height: 1.15; color: var(--text-bright); margin-bottom: 16px;
    letter-spacing: -0.02em;
  }
  &__title-accent {
    background: linear-gradient(135deg, #3B82F6, #60A5FA, #93C5FD);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  &__desc { font-size: 16px; color: var(--text-dim); line-height: 1.8; margin-bottom: 32px; }

  &__cta {
    display: flex; gap: 14px; justify-content: center;
    @media (max-width: 480px) { flex-direction: column; align-items: center; }
  }

  &__stats {
    position: relative; z-index: 2;
    display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px;
    max-width: 640px; width: 100%; margin-top: 56px;
    background: var(--border-subtle); border-radius: $r; overflow: hidden;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2);
  }
  &__stat {
    text-align: center; padding: 24px 16px; background: var(--bg-card);
    &:first-child { border-radius: $r 0 0 $r; }
    &:last-child { border-radius: 0 $r $r 0; }
  }
  &__stat-num {
    display: block; font-family: 'IBM Plex Mono', monospace;
    font-size: 28px; font-weight: 700; color: var(--brand-bright);
    background: linear-gradient(135deg, #3B82F6, #60A5FA);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }
  &__stat-label { font-size: 12px; color: var(--text-faint); margin-top: 4px; display: block; }
}

// ═══════════════════════════════════════
// 核心能力 — 渐变边框卡片
// ═══════════════════════════════════════
.mp-features {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;
  @media (max-width: 768px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 480px) { grid-template-columns: 1fr; }
}
.mp-feature {
  background: var(--bg-card); border: 1px solid var(--border-card);
  border-radius: $r; overflow: hidden;
  transition: all 0.3s $ease; position: relative;
  display: flex; flex-direction: column;
  &::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, var(--brand), var(--brand-bright), transparent);
    opacity: 0; transition: opacity 0.3s; z-index: 2;
  }
  &:hover { background: var(--bg-card-hover); border-color: var(--brand); transform: translateY(-3px);
    box-shadow: 0 8px 32px rgba(59, 130, 246, 0.12);
    &::before { opacity: 1; }
  }

  &__img {
    width: 100%; height: 110px; overflow: hidden; flex-shrink: 0;
    img { width: 100%; height: 100%; object-fit: cover; opacity: 0.75; transition: opacity 0.4s $ease, transform 0.5s $ease; }
  }
  &:hover &__img img { opacity: 0.9; transform: scale(1.05); }

  &__body { padding: 20px 20px 18px; flex: 1; display: flex; flex-direction: column; }

  &__top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; }
  &__badge {
    padding: 2px 10px; border-radius: 3px; font-size: 11px; font-weight: 600;
    background: rgba(59, 130, 246, 0.12); color: var(--brand-bright);
    border: 1px solid rgba(59, 130, 246, 0.2);
  }
  &__icon {
    width: 40px; height: 40px; border-radius: 6px;
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(59, 130, 246, 0.05));
    display: flex; align-items: center; justify-content: center;
    svg { width: 20px; height: 20px; stroke: var(--brand-bright); }
  }
  &__title { font-size: 16px; font-weight: 600; color: var(--text-bright); margin-bottom: 8px; }
  &__desc { font-size: 13px; color: var(--text-dim); line-height: 1.7; margin-bottom: 12px; flex: 1; }
  &__link { font-size: 13px; color: var(--brand-bright); cursor: pointer; font-weight: 500; transition: color 0.2s;
    &:hover { color: var(--accent); } }
}

// ═══════════════════════════════════════
// 实训场景 — 左tab右内容
// ═══════════════════════════════════════
.mp-scenes {
  display: grid; grid-template-columns: 200px 1fr; gap: 0;
  background: var(--bg-card); border: 1px solid var(--border-card);
  border-radius: $r; overflow: hidden;
  @media (max-width: 768px) { grid-template-columns: 1fr; }

  &__sidebar {
    display: flex; flex-direction: column; gap: 0;
    border-right: 1px solid var(--border-subtle);
    @media (max-width: 768px) { flex-direction: row; overflow-x: auto; border-right: none; border-bottom: 1px solid var(--border-subtle); }
  }
  &__tab {
    display: flex; align-items: center; gap: 10px;
    padding: 16px 20px; background: transparent; border: none;
    border-left: 3px solid transparent;
    font-family: inherit; font-size: 14px; font-weight: 500;
    color: var(--text-dim); cursor: pointer; transition: all 0.2s $ease;
    text-align: left; white-space: nowrap;
    @media (max-width: 768px) { border-left: none; border-bottom: 3px solid transparent; padding: 12px 16px; }
    &:hover { background: rgba(59, 130, 246, 0.04); color: var(--text-main); }
    &--active { color: var(--text-bright); background: rgba(59, 130, 246, 0.06); }
  }
  &__tab-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }

  &__main { padding: 28px 28px; min-height: 240px; display: flex; align-items: center; }
  &__content { width: 100%; }
  &__body {
    display: flex; gap: 24px; align-items: center;
    @media (max-width: 768px) { flex-direction: column; }
  }
  &__text { flex: 1; min-width: 0; }
  &__tag {
    display: inline-block; padding: 3px 12px; border-radius: 4px;
    font-size: 12px; font-weight: 600; margin-bottom: 12px;
    border: 1px solid;
  }
  &__title { font-family: 'IBM Plex Sans', sans-serif; font-size: 22px; font-weight: 700; color: var(--text-bright); margin-bottom: 8px; }
  &__desc { font-size: 14px; color: var(--text-dim); line-height: 1.8; margin-bottom: 16px; }
  &__img {
    flex-shrink: 0; width: 240px; height: 170px; border-radius: 8px; overflow: hidden;
    background: rgba(59, 130, 246, 0.05); border: 1px solid var(--border-subtle);
    @media (max-width: 768px) { width: 100%; height: 140px; }
    img { width: 100%; height: 100%; object-fit: cover; opacity: 0.9; transition: opacity 0.3s, transform 0.4s $ease; }
    &:hover img { opacity: 1; transform: scale(1.04); }
  }
  &__actions { display: flex; gap: 10px; }
}

// ═══════════════════════════════════════
// 合作案例 — 渐变高亮数字
// ═══════════════════════════════════════
.mp-cases {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;
  @media (max-width: 768px) { grid-template-columns: 1fr; }
}
.mp-case {
  background: var(--bg-card); border: 1px solid var(--border-card);
  border-radius: $r; overflow: hidden;
  transition: all 0.3s $ease; display: flex; flex-direction: column;
  &:hover { border-color: var(--brand); transform: translateY(-3px); box-shadow: 0 8px 32px rgba(59, 130, 246, 0.1); }

  &__img {
    width: 100%; height: 120px; overflow: hidden; flex-shrink: 0;
    img { width: 100%; height: 100%; object-fit: cover; opacity: 0.8; transition: opacity 0.3s, transform 0.4s $ease; }
  }
  &:hover &__img img { opacity: 0.95; transform: scale(1.04); }

  &__body { padding: 24px 22px; flex: 1; display: flex; flex-direction: column; }

  &__highlight { margin-bottom: 16px; padding-bottom: 14px; border-bottom: 1px solid var(--border-subtle); }
  &__val {
    font-family: 'IBM Plex Mono', monospace; font-size: 36px; font-weight: 700;
    background: linear-gradient(135deg, var(--accent), var(--accent-light));
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    display: block; line-height: 1.1;
  }
  &__label { font-size: 12px; color: var(--text-faint); margin-top: 4px; display: block; }
  &__org { font-size: 16px; font-weight: 600; color: var(--text-bright); margin-bottom: 10px; }
  &__quote { font-size: 13px; color: var(--text-dim); line-height: 1.7; margin-bottom: 12px; flex: 1; }
  &__role { font-size: 12px; color: var(--text-faint); }
}

// ═══════════════════════════════════════
// 硬件设备 — Rokid AR Studio
// ═══════════════════════════════════════
.mp-device {
  display: grid; grid-template-columns: 1fr 1fr; gap: 32px; align-items: center;
  background: var(--bg-card); border: 1px solid var(--border-card);
  border-radius: 12px; overflow: hidden; margin-bottom: 28px;
  @media (max-width: 768px) { grid-template-columns: 1fr; }

  &__visual {
    position: relative; height: 100%; min-height: 320px; overflow: hidden;
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(139, 92, 246, 0.04));
    img { width: 100%; height: 100%; object-fit: cover; }
  }
  &__badge {
    position: absolute; top: 16px; left: 16px;
    padding: 4px 14px; border-radius: 4px; font-size: 12px; font-weight: 600;
    background: linear-gradient(135deg, var(--brand), var(--brand-bright)); color: #fff;
    letter-spacing: 0.04em;
  }

  &__info { padding: 36px 32px; @media (max-width: 768px) { padding: 24px 20px; } }
  &__title {
    font-family: 'IBM Plex Sans', 'Noto Sans SC', sans-serif;
    font-size: 22px; font-weight: 700; color: var(--text-bright); margin-bottom: 12px;
  }
  &__desc { font-size: 14px; color: var(--text-dim); line-height: 1.8; margin-bottom: 24px; }

  &__stats {
    display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;
  }
  &__stat {
    padding: 14px 16px; background: rgba(59, 130, 246, 0.06);
    border: 1px solid rgba(59, 130, 246, 0.1); border-radius: 8px;
    text-align: center; transition: all 0.2s $ease;
    &:hover { border-color: var(--brand); background: rgba(59, 130, 246, 0.1); }
  }
  &__stat-num {
    display: block; font-family: 'IBM Plex Mono', monospace;
    font-size: 22px; font-weight: 700;
    background: linear-gradient(135deg, var(--brand), var(--brand-bright));
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    line-height: 1.2;
  }
  &__stat-label { font-size: 12px; color: var(--text-faint); margin-top: 2px; display: block; }
}

.mp-device-scenes {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-top: 24px;
  @media (max-width: 768px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 480px) { grid-template-columns: 1fr; }
}
.mp-device-scene {
  background: var(--bg-card); border: 1px solid var(--border-card);
  border-radius: $r; overflow: hidden; transition: all 0.3s $ease;
  &:hover { border-color: var(--brand); transform: translateY(-2px);
    box-shadow: 0 6px 24px rgba(59, 130, 246, 0.1); }
  &__img {
    width: 100%; height: 120px; overflow: hidden;
    img { width: 100%; height: 100%; object-fit: cover; opacity: 0.85; transition: opacity 0.3s, transform 0.4s $ease; }
  }
  &:hover &__img img { opacity: 1; transform: scale(1.05); }
  &__body { padding: 14px 16px;
    h4 { font-size: 14px; font-weight: 600; color: var(--text-bright); margin-bottom: 4px; }
    p { font-size: 12px; color: var(--text-dim); line-height: 1.6; }
  }
}

// ═══════════════════════════════════════
// 技术合作伙伴
// ═══════════════════════════════════════
.mp-partners {
  display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 48px;
  @media (max-width: 768px) { grid-template-columns: 1fr; }
}
.mp-partner {
  background: var(--bg-card); border: 1px solid var(--border-card);
  border-radius: $r; padding: 28px 24px; transition: all 0.3s $ease;
  &:hover { border-color: var(--brand); box-shadow: 0 8px 32px rgba(59, 130, 246, 0.1); }

  &__header { display: flex; align-items: center; gap: 14px; margin-bottom: 16px; }
  &__logo {
    width: 56px; height: 56px; border-radius: 12px; overflow: hidden; flex-shrink: 0;
    background: rgba(59, 130, 246, 0.06); border: 1px solid var(--border-subtle);
    display: flex; align-items: center; justify-content: center;
    img { width: 100%; height: 100%; object-fit: cover; }
  }
  &__name { font-size: 16px; font-weight: 700; color: var(--text-bright); }
  &__role { font-size: 12px; color: var(--brand-bright); font-weight: 500; }
  &__desc { font-size: 13px; color: var(--text-dim); line-height: 1.8; margin-bottom: 16px; }
  &__highlights { display: flex; flex-wrap: wrap; gap: 8px; }
  &__tag {
    padding: 3px 12px; border-radius: 4px; font-size: 12px; font-weight: 500;
    background: rgba(59, 130, 246, 0.08); color: var(--brand-bright);
    border: 1px solid rgba(59, 130, 246, 0.15);
  }
}

// ═══════════════════════════════════════
// 资质荣誉
// ═══════════════════════════════════════
.mp-trust {
  text-align: center;
  &__title { font-family: 'IBM Plex Sans', sans-serif; font-size: 24px; font-weight: 700; color: var(--text-bright); margin-bottom: 28px; }
  &__items { display: flex; justify-content: center; flex-wrap: wrap; gap: 12px; }
  &__item {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 10px 20px; background: var(--bg-card); border: 1px solid var(--border-card);
    border-radius: 0; font-size: 14px; color: var(--text-main); font-weight: 500;
    transition: all 0.25s $ease;
    svg { width: 18px; height: 18px; stroke: var(--success); flex-shrink: 0; }
    &:hover { border-color: var(--success); background: var(--bg-card-hover); }
  }
}

// ═══════════════════════════════════════
// CTA — 渐变光效
// ═══════════════════════════════════════
.mp-cta {
  position: relative; z-index: 1; overflow: hidden;
  background: linear-gradient(135deg, #0C1529 0%, #111B33 50%, #1A2744 100%);
  border-top: 1px solid var(--border-card); border-bottom: 1px solid var(--border-card);
  padding: 80px 24px; text-align: center;

  &__glow {
    position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
    width: 600px; height: 300px; border-radius: 50%;
    background: radial-gradient(ellipse, rgba(59, 130, 246, 0.12) 0%, transparent 70%);
    filter: blur(60px);
  }
  &__inner { position: relative; z-index: 2; max-width: 560px; margin: 0 auto; }
  h2 { font-family: 'IBM Plex Sans', sans-serif; font-size: clamp(24px, 4vw, 36px); font-weight: 700; color: #fff; margin-bottom: 10px; letter-spacing: 0.02em; }
  p { font-size: 15px; color: rgba(255,255,255,0.5); margin-bottom: 28px; line-height: 1.7; font-weight: 400; }
  &__actions { display: flex; gap: 14px; justify-content: center;
    @media (max-width: 480px) { flex-direction: column; align-items: center; } }
}
.mp--light .mp-cta {
  background: linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 50%, #BFDBFE 100%);
  border-color: rgba(59, 130, 246, 0.1);
  h2 { color: var(--brand-dim); }
  p { color: var(--text-dim); }
  .mp-btn--hero-ghost {
    background: rgba(30, 64, 175, 0.08);
    color: #1E40AF;
    border: 1.5px solid rgba(30, 64, 175, 0.35);
    &:hover { background: rgba(30, 64, 175, 0.14); color: #1E3A8A; border-color: rgba(30, 64, 175, 0.5); }
  }
}

// ═══════════════════════════════════════
// Footer
// ═══════════════════════════════════════
.mp-footer {
  position: relative; z-index: 1;
  background: var(--bg-deep); border-top: 1px solid var(--border-subtle);
  padding: 40px 24px 20px;

  &__inner {
    max-width: $max-w; margin: 0 auto;
    display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 24px;
    padding-bottom: 24px; border-bottom: 1px solid var(--border-subtle);
  }
  &__brand { max-width: 260px; }
  &__logo { font-family: 'IBM Plex Mono', monospace; font-size: 18px; font-weight: 700; color: var(--brand-bright); display: block; margin-bottom: 6px; }
  &__brand p { font-size: 13px; color: var(--text-faint); line-height: 1.6; }
  &__links {
    display: flex; flex-wrap: wrap; gap: 16px;
    a { color: var(--text-faint); text-decoration: none; font-size: 13px; cursor: pointer; transition: color 0.2s;
      &:hover { color: var(--brand-bright); } }
  }
  &__contact { display: flex; flex-direction: column; gap: 4px; span { font-size: 13px; color: var(--text-faint); } }
  &__bottom {
    max-width: $max-w; margin: 12px auto 0;
    display: flex; justify-content: space-between; align-items: center;
    span { font-size: 12px; color: var(--text-faint); }
  }
  &__ver { font-family: 'IBM Plex Mono', monospace; font-size: 11px; }
}

// ═══════════════════════════════════════
// 无障碍
// ═══════════════════════════════════════
@media (prefers-reduced-motion: reduce) {
  .reveal { transition: opacity 0.2s ease; transform: none; }
  .reveal.revealed { transform: none; }
  .mp-bg__orb { animation: none; }
}
</style>
