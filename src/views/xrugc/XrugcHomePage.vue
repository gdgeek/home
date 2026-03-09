<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useBrand } from '@/composables/useBrand'
import { useNews } from '@/composables/useNews'
import LoginModal from '@/components/common/LoginModal.vue'
import { useGeoLocale } from '@/composables/useGeoLocale'
import { useLocaleRoute } from '@/composables/useLocaleRoute'

const { footer } = useBrand()
const { t } = useI18n({ useScope: 'global' })
const { detectAndSetLocale } = useGeoLocale()
const { activeLang, switchLocale } = useLocaleRoute('en-US')
const buildTime = computed(() => {
  const timestamp = window.__BUILD_TIME__ || __BUILD_TIME__ || new Date().toISOString()
  const date = new Date(timestamp)
  return date.toLocaleString('en-US', { 
    year: 'numeric', 
    month: '2-digit', 
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  })
})

const showLoginModal = ref(false)
const showNewsModal = ref(false)
const selectedNews = ref<any>(null)
const animatedSections = ref<Set<HTMLElement>>(new Set())
const navScrolled = ref(false)
const mobileMenuOpen = ref(false)
const langDropdownOpen = ref(false)

const { news } = useNews()

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const toggleLangDropdown = () => {
  langDropdownOpen.value = !langDropdownOpen.value
}

const handleOpenLogin = () => { showLoginModal.value = true }
const handleOpenNewsDetail = (item: any) => {
  selectedNews.value = item
  showNewsModal.value = true
}

const blogUrl = computed(() => window.__WORDPRESS_API_URL__ || 'https://blog.hxgxonline.com')

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
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
  detectAndSetLocale()
  handleScroll()
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const languages = [
  { code: 'en-US', label: 'EN' },
  { code: 'zh-CN', label: '中文' },
  { code: 'zh-TW', label: '繁體' },
  { code: 'ja-JP', label: '日本語' },
  { code: 'th-TH', label: 'ไทย' },
]

const switchLang = (code: string) => {
  switchLocale(code)
  mobileMenuOpen.value = false
  langDropdownOpen.value = false
}

const navItems = computed(() => [
  { text: t('xrugc.nav.features'), url: '#features' },
  { text: t('xrugc.nav.useCases'), url: '#scenes' },
  { text: t('xrugc.nav.testimonials'), url: '#cases' },
  { text: t('xrugc.nav.news'), url: '#news' },
])

const stats = computed(() => [
  { number: '200+', label: t('xrugc.hero.stats.schools') },
  { number: '50K+', label: t('xrugc.hero.stats.creators') },
  { number: '500K+', label: t('xrugc.hero.stats.experiences') },
])

const features = computed(() => [
  { id: 'editor', title: t('xrugc.features.editor.title'), desc: t('xrugc.features.editor.desc'),
    image: '/images/ar-platform/UGC场景编辑器界面.webp', icon: '🎨' },
  { id: 'logic', title: t('xrugc.features.logic.title'), desc: t('xrugc.features.logic.desc'),
    image: '/images/ar-platform/拖拽程序生成工具.webp', icon: '🧩' },
  { id: 'multiview', title: t('xrugc.features.multiview.title'), desc: t('xrugc.features.multiview.desc'),
    image: '/images/ar-platform/三方视角，用户操作AR医疗头骨内容.webp', icon: '👁️' },
  { id: 'collab', title: t('xrugc.features.collab.title'), desc: t('xrugc.features.collab.desc'),
    image: '/images/ar-platform/多人AR游戏，三方视角.webp', icon: '🤝' },
])

const scenes = computed(() => [
  { title: t('xrugc.scenes.education.title'), desc: t('xrugc.scenes.education.desc'), image: '/images/ar-platform/高中生操作AR内容，欢笑.webp', tag: 'EDU' },
  { title: t('xrugc.scenes.healthcare.title'), desc: t('xrugc.scenes.healthcare.desc'), image: '/images/ar-platform/婴幼儿护理 外伤处理.webp', tag: 'MED' },
  { title: t('xrugc.scenes.industrial.title'), desc: t('xrugc.scenes.industrial.desc'), image: '/images/ar-platform/AR掘进机展示.webp', tag: 'IND' },
  { title: t('xrugc.scenes.entertainment.title'), desc: t('xrugc.scenes.entertainment.desc'), image: '/images/ar-platform/两个人玩AR游戏.webp', tag: 'PLAY' },
])

const cases = computed(() => [
  { org: t('xrugc.cases.c1.org'), quote: t('xrugc.cases.c1.quote'), person: t('xrugc.cases.c1.person'), role: t('xrugc.cases.c1.role'),
    stat: { value: t('xrugc.cases.c1.statVal'), label: t('xrugc.cases.c1.statLabel') } },
  { org: t('xrugc.cases.c2.org'), quote: t('xrugc.cases.c2.quote'), person: t('xrugc.cases.c2.person'), role: t('xrugc.cases.c2.role'),
    stat: { value: t('xrugc.cases.c2.statVal'), label: t('xrugc.cases.c2.statLabel') } },
  { org: t('xrugc.cases.c3.org'), quote: t('xrugc.cases.c3.quote'), person: t('xrugc.cases.c3.person'), role: t('xrugc.cases.c3.role'),
    stat: { value: t('xrugc.cases.c3.statVal'), label: t('xrugc.cases.c3.statLabel') } },
])
</script>

<template>
  <div class="mu">
    <div class="mu-bg" aria-hidden="true">
      <div class="mu-bg__orb mu-bg__orb--1"></div>
      <div class="mu-bg__orb mu-bg__orb--2"></div>
      <div class="mu-bg__grid"></div>
    </div>

    <header class="mu-nav" :class="{ 'mu-nav--scrolled': navScrolled }">
      <div class="mu-nav__inner">
        <a href="#" class="mu-nav__logo">
          <img src="/logo/XRUGC/xrugc_logo.png" alt="XR UGC" />
        </a>
        <nav class="mu-nav__links" aria-label="Main navigation">
          <a v-for="item in navItems" :key="item.url" :href="item.url">{{ item.text }}</a>
        </nav>
        <div class="mu-nav__right">
          <div class="mu-lang">
            <button v-for="lang in languages" :key="lang.code"
                    class="mu-lang__btn"
                    :class="{ 'mu-lang__btn--active': activeLang === lang.code }"
                    @click="switchLang(lang.code)">
              {{ lang.label }}
            </button>
          </div>
          <div class="mu-lang-dropdown">
            <button class="mu-lang-dropdown__trigger" @click="toggleLangDropdown">
              {{ languages.find(l => l.code === activeLang)?.label || 'EN' }}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </button>
            <Transition name="dropdown">
              <div v-if="langDropdownOpen" class="mu-lang-dropdown__menu">
                <button v-for="lang in languages" :key="lang.code"
                        class="mu-lang-dropdown__item"
                        :class="{ 'mu-lang-dropdown__item--active': activeLang === lang.code }"
                        @click="switchLang(lang.code)">
                  {{ lang.label }}
                </button>
              </div>
            </Transition>
          </div>
          <button class="mu-btn mu-btn--primary" @click="handleOpenLogin">{{ t('xrugc.auth.getStarted') }}</button>
          <button class="mu-nav__hamburger" @click="toggleMobileMenu" aria-label="Toggle menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
      <!-- Mobile Menu -->
      <Transition name="mobile-menu">
        <div v-if="mobileMenuOpen" class="mu-nav__mobile">
          <nav class="mu-nav__mobile-links">
            <a v-for="item in navItems" :key="item.url" :href="item.url" @click="mobileMenuOpen = false">{{ item.text }}</a>
          </nav>
          <div class="mu-nav__mobile-lang">
            <button v-for="lang in languages" :key="lang.code"
                    class="mu-lang__btn"
                    :class="{ 'mu-lang__btn--active': activeLang === lang.code }"
                    @click="switchLang(lang.code)">
              {{ lang.label }}
            </button>
          </div>
          <div class="mu-nav__mobile-actions">
            <button class="mu-btn mu-btn--primary mu-btn--block" @click="handleOpenLogin; mobileMenuOpen = false">{{ t('xrugc.auth.getStarted') }}</button>
          </div>
        </div>
      </Transition>
    </header>

    <section class="mu-hero">
      <div class="mu-hero__content reveal">
        <div class="mu-hero__badge">
          <span class="mu-hero__badge-dot"></span>
          {{ t('xrugc.hero.badge') }}
        </div>
        <h1 class="mu-hero__title">
          <span class="mu-hero__title-sub">{{ t('xrugc.hero.subtitle') }}</span>
          <span class="mu-hero__title-main">{{ t('xrugc.hero.title').replace('{br}', '') }}</span>
        </h1>
        <p class="mu-hero__desc">{{ t('xrugc.hero.desc') }}</p>
        <div class="mu-hero__cta">
          <button class="mu-btn mu-btn--gradient mu-btn--lg" @click="handleOpenLogin">{{ t('xrugc.hero.cta') }}</button>
          <button class="mu-btn mu-btn--outline mu-btn--lg">{{ t('xrugc.hero.demo') }}</button>
        </div>
        <div class="mu-hero__stats">
          <div v-for="s in stats" :key="s.label" class="mu-hero__stat">
            <span class="mu-hero__stat-num">{{ s.number }}</span>
            <span class="mu-hero__stat-label">{{ s.label }}</span>
          </div>
        </div>
      </div>
      <div class="mu-hero__visual reveal">
        <img src="/images/ar-platform/澳门AR.webp" alt="XR UGC Platform" />
        <div class="mu-hero__visual-glow"></div>
      </div>
    </section>

    <section id="features" class="mu-section">
      <div class="mu-section__header reveal">
        <span class="mu-tag">{{ t('xrugc.features.tag') }}</span>
        <h2 class="mu-section__title">{{ t('xrugc.features.title') }}</h2>
        <p class="mu-section__sub">{{ t('xrugc.features.subtitle') }}</p>
      </div>
      <div class="mu-features">
        <div v-for="(f, idx) in features" :key="f.id" class="mu-feature reveal" :class="{ 'mu-feature--reverse': idx % 2 === 1 }">
          <div class="mu-feature__img"><img :src="f.image" :alt="f.title" loading="lazy" /></div>
          <div class="mu-feature__text">
            <span class="mu-feature__icon">{{ f.icon }}</span>
            <h3>{{ f.title }}</h3>
            <p>{{ f.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <section id="scenes" class="mu-section mu-section--alt">
      <div class="mu-section__header reveal">
        <span class="mu-tag">{{ t('xrugc.scenes.tag') }}</span>
        <h2 class="mu-section__title">{{ t('xrugc.scenes.title') }}</h2>
      </div>
      <div class="mu-scenes reveal">
        <div v-for="(s, idx) in scenes" :key="idx" class="mu-scene">
          <div class="mu-scene__img">
            <img :src="s.image" :alt="s.title" loading="lazy" />
            <span class="mu-scene__tag">{{ s.tag }}</span>
          </div>
          <div class="mu-scene__body">
            <h3>{{ s.title }}</h3>
            <p>{{ s.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <section id="cases" class="mu-section">
      <div class="mu-section__header reveal">
        <span class="mu-tag">{{ t('xrugc.cases.tag') }}</span>
        <h2 class="mu-section__title">{{ t('xrugc.cases.title') }}</h2>
      </div>
      <div class="mu-testimonials">
        <div v-for="(c, idx) in cases" :key="idx" class="mu-testimonial reveal">
          <div class="mu-testimonial__top">
            <span class="mu-testimonial__mark">&ldquo;</span>
            <div class="mu-testimonial__stat">
              <span class="mu-testimonial__stat-val">{{ c.stat.value }}</span>
              <span class="mu-testimonial__stat-lbl">{{ c.stat.label }}</span>
            </div>
          </div>
          <blockquote>{{ c.quote }}</blockquote>
          <div class="mu-testimonial__author">
            <span class="mu-testimonial__org">{{ c.org }}</span>
            <span class="mu-testimonial__person">{{ c.person }} &middot; {{ c.role }}</span>
          </div>
        </div>
      </div>
    </section>

    <section v-if="news?.length" id="news" class="mu-section mu-section--alt">
      <div class="mu-section__header reveal">
        <span class="mu-tag">{{ t('xrugc.news.tag') }}</span>
        <h2 class="mu-section__title">{{ t('xrugc.news.title') }}</h2>
      </div>
      <div class="mu-news reveal">
        <article v-for="item in news.slice(0, 3)" :key="item.id" class="mu-news__card" @click="handleOpenNewsDetail(item)">
          <span class="mu-news__date">{{ formatDate(item.date) }}</span>
          <h3>{{ item.title }}</h3>
          <p v-if="item.excerpt">{{ item.excerpt }}</p>
        </article>
      </div>
      <div class="mu-news__more">
        <a :href="blogUrl" target="_blank" rel="noopener" class="mu-btn mu-btn--outline">{{ t('xrugc.news.viewAll') }}</a>
      </div>
    </section>

    <section class="mu-cta reveal">
      <div class="mu-cta__inner">
        <h2>{{ t('xrugc.cta.title') }}</h2>
        <p>{{ t('xrugc.cta.desc') }}</p>
        <div class="mu-cta__actions">
          <button class="mu-btn mu-btn--white mu-btn--lg" @click="handleOpenLogin">{{ t('xrugc.cta.primary') }}</button>
          <button class="mu-btn mu-btn--ghost-light mu-btn--lg">{{ t('xrugc.cta.secondary') }}</button>
        </div>
      </div>
    </section>

    <footer class="mu-footer">
      <div class="mu-footer__inner">
        <div class="mu-footer__brand">
          <img src="/logo/XRUGC/xrugc_logo.png" alt="XR UGC" class="mu-footer__logo" />
          <p>{{ t('xrugc.footer.tagline') }}</p>
        </div>
        <div class="mu-footer__links">
          <div v-for="(nav, idx) in footer.navigation" :key="idx" class="mu-footer__col">
            <h4>{{ nav.title }}</h4>
            <a v-for="link in nav.links" :key="link.text" :href="link.url">{{ link.text }}</a>
          </div>
        </div>
      </div>
      <div class="mu-footer__bottom">
        <span>{{ footer.copyright || '© 2025 XR UGC. All rights reserved.' }}</span>
        <span class="mu-footer__ver">{{ buildTime }}</span>
      </div>
    </footer>

    <Teleport to="body">
      <Transition name="modal">
        <div v-if="showNewsModal" class="mu-modal" @click.self="showNewsModal = false">
          <div class="mu-modal__box">
            <button class="mu-modal__close" @click="showNewsModal = false" aria-label="Close">&times;</button>
            <div v-if="selectedNews" class="mu-modal__content">
              <span class="mu-modal__date">{{ formatDate(selectedNews.date) }}</span>
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
@use '@/assets/styles/xrugc/variables' as mu;

$v: mu.$v; $vl: mu.$vl; $o: mu.$o; $ol: mu.$ol;
$bg: mu.$bg; $bg2: mu.$bg2; $bgc: mu.$bgc; $bge: mu.$bge;
$t1: mu.$t1; $t2: mu.$t2; $tm: mu.$tm; $tf: mu.$tf;
$bd: mu.$bd; $bdh: mu.$bdh;
$sl: mu.$sl;
$r: mu.$r; $rs: mu.$rs; $mw: mu.$mw; $e: mu.$e;

@keyframes orbFloat { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(30px,-20px) scale(1.05)} 66%{transform:translate(-20px,15px) scale(0.95)} }
@keyframes gridScroll { 0%{transform:translate(0,0)} 100%{transform:translate(40px,40px)} }
@keyframes pulseGlow { 0%,100%{opacity:.5} 50%{opacity:1} }

.reveal { opacity:0; transform:translateY(32px); transition:opacity .8s $e, transform .8s $e; &.revealed{opacity:1;transform:translateY(0)} }

.mu {
  font-family:"Inter",-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
  color:$t2; background:$bg; min-height:100vh; overflow-x:hidden;
  -webkit-font-smoothing:antialiased;
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  ::selection{background:rgba($v,.3);color:$t1}
}

.mu-bg {
  position:fixed;inset:0;pointer-events:none;z-index:0;
  &__orb{position:absolute;border-radius:50%;filter:blur(140px);
    &--1{width:600px;height:500px;background:rgba($v,.15);top:-100px;left:-100px;animation:orbFloat 25s ease-in-out infinite}
    &--2{width:500px;height:400px;background:rgba($o,.08);bottom:-50px;right:-100px;animation:orbFloat 30s ease-in-out infinite 10s}
  }
  &__grid{position:absolute;inset:-40px;
    background-image:linear-gradient(rgba($v,.03) 1px,transparent 1px),linear-gradient(90deg,rgba($v,.03) 1px,transparent 1px);
    background-size:60px 60px;animation:gridScroll 40s linear infinite;
    mask-image:radial-gradient(ellipse 60% 50% at 50% 30%,black 10%,transparent 70%);
  }
}

.mu-nav {
  position:fixed;top:12px;left:16px;right:16px;z-index:100;padding:12px 0;
  background:rgba($bg,.6);backdrop-filter:blur(24px) saturate(140%);
  border:1px solid rgba($v,.08);border-radius:14px;transition:all .3s $e;
  &--scrolled{top:8px;background:rgba($bg,.92);box-shadow:0 4px 30px rgba(0,0,0,.5);border-color:rgba($v,.15)}
  &__inner{max-width:$mw;margin:0 auto;padding:0 24px;display:flex;align-items:center;justify-content:space-between}
  &__logo img{height:32px}
  &__links{display:flex;gap:32px;
    a{color:$tm;text-decoration:none;font-size:14px;font-weight:500;transition:color .25s;&:hover{color:$t1}}
    @media(max-width:768px){display:none}
  }
  &__right{display:flex;align-items:center;gap:8px}
}

.mu-lang{display:flex;gap:2px;margin-right:12px;
  @media(max-width:1024px){display:none}
  &__btn{padding:4px 8px;font-size:11px;font-weight:600;color:$tf;background:transparent;border:none;border-radius:4px;cursor:pointer;transition:all .2s;font-family:inherit;&:hover{color:$tm}&--active{color:$vl;background:rgba($v,.12)}}
}

.mu-lang-dropdown{
  display:none;position:relative;margin-right:12px;
  @media(max-width:1024px) and (min-width:769px){display:block}
  
  &__trigger{
    display:flex;align-items:center;gap:4px;padding:6px 12px;
    font-size:12px;font-weight:600;color:$t1;
    background:rgba($v,.08);border:1px solid rgba($v,.12);border-radius:6px;
    cursor:pointer;transition:all .2s;font-family:inherit;
    &:hover{background:rgba($v,.12);border-color:rgba($v,.2)}
    svg{width:14px;height:14px;transition:transform .2s}
  }
  
  &__menu{
    position:absolute;top:calc(100% + 4px);right:0;min-width:120px;
    background:rgba($bg,.98);backdrop-filter:blur(24px);
    border:1px solid rgba($v,.12);border-radius:8px;
    box-shadow:0 8px 24px rgba($v,.15);
    padding:4px;z-index:1000;
  }
  
  &__item{
    display:block;width:100%;padding:8px 12px;
    font-size:13px;font-weight:500;color:$t1;
    background:transparent;border:none;border-radius:4px;
    cursor:pointer;transition:all .2s;font-family:inherit;
    text-align:left;
    &:hover{background:rgba($v,.08)}
    &--active{color:$v;background:rgba($v,.12);font-weight:600}
  }
}

.dropdown-enter-active, .dropdown-leave-active {
  transition: all .2s $e;
}
.dropdown-enter-from, .dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.mu-nav__hamburger{
  display:none;flex-direction:column;gap:4px;padding:8px;background:transparent;border:none;cursor:pointer;
  @media(max-width:768px){display:flex}
  span{width:20px;height:2px;background:$t1;border-radius:2px;transition:all .3s $e}
}

.mu-nav__mobile{
  position:absolute;top:100%;left:0;right:0;margin-top:8px;
  background:rgba($bg,.95);backdrop-filter:blur(24px);
  border:1px solid rgba($v,.08);border-radius:14px;
  padding:16px;box-shadow:0 8px 32px rgba($v,.12);
  
  &-links{
    display:flex;flex-direction:column;gap:4px;margin-bottom:16px;
    a{display:block;padding:12px 16px;color:$t1;text-decoration:none;font-size:15px;font-weight:500;
      border-radius:8px;transition:all .2s;
      &:hover{background:rgba($v,.08);color:$v}}
  }
  
  &-lang{
    display:flex;gap:4px;padding:12px 0;border-top:1px solid rgba($v,.08);border-bottom:1px solid rgba($v,.08);
    margin-bottom:16px;flex-wrap:wrap;justify-content:center;
  }
  
  &-actions{
    display:flex;flex-direction:column;gap:8px;
  }
}

.mobile-menu-enter-active, .mobile-menu-leave-active {
  transition: all .3s $e;
}
.mobile-menu-enter-from, .mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.mu-btn {
  display:inline-flex;align-items:center;gap:8px;padding:10px 22px;font-family:inherit;font-size:14px;font-weight:600;
  border-radius:$rs;border:none;cursor:pointer;transition:all .25s $e;letter-spacing:.01em;
  &--primary{background:$v;color:white;box-shadow:0 2px 16px rgba($v,.3);&:hover{background:lighten($v,8%);transform:translateY(-1px);box-shadow:0 4px 24px rgba($v,.4)}}
  &--gradient{background:linear-gradient(135deg,$v 0%,$o 100%);color:white;box-shadow:0 4px 20px rgba($v,.3);&:hover{transform:translateY(-2px);box-shadow:0 8px 32px rgba($v,.4)}}
  &--ghost{background:transparent;color:$tm;&:hover{color:$t1;background:rgba($v,.08)}}
  &--outline{background:transparent;color:$t2;border:1.5px solid $bdh;&:hover{border-color:$vl;color:$vl}}
  &--white{background:white;color:$v;font-weight:700;box-shadow:0 4px 16px rgba(0,0,0,.15);&:hover{transform:translateY(-2px);box-shadow:0 8px 28px rgba(0,0,0,.2)}}
  &--ghost-light{background:rgba(255,255,255,.1);color:rgba(255,255,255,.85);border:1px solid rgba(255,255,255,.2);&:hover{background:rgba(255,255,255,.2);color:white}}
  &--lg{padding:14px 30px;font-size:15px;border-radius:12px}
  &--block{width:100%;justify-content:center}
}

.mu-tag{display:inline-block;padding:6px 16px;background:rgba($v,.1);border:1px solid rgba($v,.2);border-radius:100px;font-size:13px;font-weight:600;color:$vl;letter-spacing:.06em;text-transform:uppercase}

.mu-section {
  position:relative;z-index:1;max-width:$mw;margin:0 auto;padding:80px 24px;
  @media(max-width:768px){padding:48px 16px}
  &--alt{background:$bg2;max-width:none;>*{max-width:$mw;margin-left:auto;margin-right:auto}}
  &__header{text-align:center;margin-bottom:48px}
  &__title{font-size:clamp(28px,4.5vw,44px);font-weight:800;color:$t1;margin-top:16px;letter-spacing:-.02em;line-height:1.2}
  &__sub{font-size:17px;color:$tm;margin-top:12px;max-width:560px;margin-left:auto;margin-right:auto}
}

.mu-hero {
  position:relative;z-index:1;max-width:$mw;margin:0 auto;padding:140px 24px 80px;
  display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center;
  @media(max-width:900px){grid-template-columns:1fr;padding-top:120px;text-align:center}
  &__badge{display:inline-flex;align-items:center;gap:10px;padding:6px 16px;background:rgba($v,.1);border:1px solid rgba($v,.2);border-radius:100px;font-size:12px;font-weight:600;color:$vl;margin-bottom:24px}
  &__badge-dot{width:7px;height:7px;background:$o;border-radius:50%;box-shadow:0 0 10px rgba($o,.6);animation:pulseGlow 2s infinite}
  &__title{margin-bottom:20px}
  &__title-sub{display:block;font-size:clamp(13px,1.8vw,16px);font-weight:500;color:$tm;letter-spacing:.15em;text-transform:uppercase;margin-bottom:8px}
  &__title-main{display:block;font-size:clamp(40px,7vw,72px);font-weight:900;letter-spacing:-.03em;line-height:1.05;background:linear-gradient(135deg,$t1 0%,$vl 50%,$ol 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
  &__desc{font-size:17px;color:$tm;line-height:1.7;margin-bottom:32px;max-width:480px;@media(max-width:900px){margin-left:auto;margin-right:auto}}
  &__cta{display:flex;gap:14px;margin-bottom:48px;@media(max-width:900px){justify-content:center}@media(max-width:480px){flex-direction:column;align-items:center}}
  &__stats{display:flex;gap:1px;@media(max-width:900px){justify-content:center}}
  &__stat{text-align:center;padding:16px 24px;background:rgba($v,.06);border:1px solid rgba($v,.1);&:first-child{border-radius:$r 0 0 $r}&:last-child{border-radius:0 $r $r 0}}
  &__stat-num{display:block;font-size:24px;font-weight:800;color:$t1;letter-spacing:-.02em}
  &__stat-label{font-size:11px;color:$tf;font-weight:500;margin-top:2px}
  &__visual{position:relative;@media(max-width:900px){max-width:500px;margin:0 auto}
    img{width:100%;border-radius:$r;display:block;box-shadow:0 20px 60px rgba(0,0,0,.5);border:1px solid rgba($v,.15)}
  }
  &__visual-glow{position:absolute;inset:-20px;border-radius:$r;background:linear-gradient(135deg,rgba($v,.15) 0%,rgba($o,.1) 100%);filter:blur(40px);z-index:-1}
}

.mu-features{display:flex;flex-direction:column;gap:32px}
.mu-feature {
  display:grid;grid-template-columns:1.2fr 1fr;gap:40px;align-items:center;
  padding:24px;background:mu.$bgc;border:1px solid $bd;border-radius:$r;transition:all .3s $e;
  &:hover{border-color:$bdh;box-shadow:$sl}
  &--reverse{grid-template-columns:1fr 1.2fr;.mu-feature__img{order:2}.mu-feature__text{order:1}}
  @media(max-width:768px){grid-template-columns:1fr;&--reverse{.mu-feature__img{order:0}.mu-feature__text{order:0}}}
  &__img{overflow:hidden;border-radius:12px;
    img{width:100%;height:240px;object-fit:cover;display:block;transition:transform .5s $e}
    .mu-feature:hover & img{transform:scale(1.04)}
  }
  &__text{padding:8px 0;
    h3{font-size:22px;font-weight:700;color:$t1;margin-bottom:10px}
    p{font-size:15px;color:$tm;line-height:1.7}
  }
  &__icon{font-size:32px;margin-bottom:12px;display:block}
}

.mu-scenes{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;
  @media(max-width:1024px){grid-template-columns:repeat(2,1fr)}
  @media(max-width:600px){grid-template-columns:1fr}
}
.mu-scene {
  background:mu.$bgc;border:1px solid $bd;border-radius:$r;overflow:hidden;transition:all .3s $e;cursor:pointer;
  &:hover{transform:translateY(-6px);border-color:$bdh;box-shadow:$sl;.mu-scene__img img{transform:scale(1.08)}}
  &__img{position:relative;height:180px;overflow:hidden;
    img{width:100%;height:100%;object-fit:cover;transition:transform .5s $e}
  }
  &__tag{position:absolute;top:10px;left:10px;padding:4px 10px;font-size:11px;font-weight:700;background:linear-gradient(135deg,$v,$o);color:white;border-radius:6px;letter-spacing:.06em}
  &__body{padding:18px;h3{font-size:16px;font-weight:700;color:$t1;margin-bottom:6px}p{font-size:13px;color:$tm;line-height:1.6}}
}

.mu-testimonials{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;
  @media(max-width:1024px){grid-template-columns:1fr;max-width:560px;margin:0 auto}
}
.mu-testimonial {
  padding:28px;background:mu.$bgc;border:1px solid $bd;border-radius:$r;transition:all .3s $e;display:flex;flex-direction:column;
  &:hover{border-color:$bdh;transform:translateY(-3px);box-shadow:$sl}
  &__top{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:16px}
  &__mark{font-size:56px;font-weight:900;line-height:.7;color:rgba($v,.2)}
  &__stat{text-align:right}
  &__stat-val{display:block;font-size:28px;font-weight:900;color:$o;line-height:1.1}
  &__stat-lbl{font-size:12px;color:$tf}
  blockquote{font-size:15px;color:$t2;line-height:1.7;margin:0 0 auto;padding-bottom:20px;font-style:italic;font-weight:300}
  &__author{display:flex;flex-direction:column;gap:2px;padding-top:16px;border-top:1px solid rgba($v,.08)}
  &__org{font-size:14px;font-weight:700;color:$t1}
  &__person{font-size:13px;color:$tf}
}

.mu-news{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;@media(max-width:768px){grid-template-columns:1fr}
  &__card{padding:24px;background:mu.$bgc;border:1px solid $bd;border-radius:$r;cursor:pointer;transition:all .3s $e;
    &:hover{border-color:$bdh;transform:translateY(-3px);box-shadow:$sl}
    h3{font-size:16px;font-weight:700;color:$t1;margin-bottom:8px;line-height:1.4}
    p{font-size:13px;color:$tm;line-height:1.6;display:-webkit-box;-webkit-line-clamp:2;line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
  }
  &__date{font-size:12px;color:$tf;font-weight:500;margin-bottom:8px;display:block}
  &__more{text-align:center;margin-top:32px}
}

.mu-cta {
  position:relative;z-index:1;margin:0 24px;border-radius:24px;overflow:hidden;
  max-width:$mw;margin-left:auto;margin-right:auto;
  &::before{content:"";position:absolute;inset:0;background:linear-gradient(135deg,rgba($v,.92) 0%,rgba($o,.88) 50%,rgba($v,.82) 100%);z-index:1}
  &__inner{position:relative;z-index:2;text-align:center;padding:64px 24px;
    h2{font-size:clamp(26px,4.5vw,40px);font-weight:800;color:white;margin-bottom:12px;letter-spacing:-.02em}
    p{font-size:16px;color:rgba(255,255,255,.75);margin-bottom:28px;font-weight:400;max-width:480px;margin-left:auto;margin-right:auto}
  }
  &__actions{display:flex;gap:14px;justify-content:center;
    @media(max-width:480px){flex-direction:column;align-items:center}
  }
}

.mu-footer {
  position:relative;z-index:1;border-top:1px solid $bd;margin-top:48px;
  &__inner{max-width:$mw;margin:0 auto;padding:40px 24px 24px;display:flex;align-items:flex-start;gap:48px;
    @media(max-width:768px){flex-direction:column;gap:28px}
  }
  &__brand{flex:1;p{font-size:14px;color:$tm;margin-top:10px;font-weight:300}}
  &__logo{height:28px}
  &__links{display:flex;flex-wrap:wrap;gap:32px;@media(max-width:768px){gap:20px}}
  &__col{display:flex;flex-direction:column;gap:8px;
    h4{font-size:12px;font-weight:700;color:$tf;text-transform:uppercase;letter-spacing:.1em;margin-bottom:4px}
    a{font-size:13px;color:$tm;text-decoration:none;font-weight:400;transition:color .2s;&:hover{color:$vl}}
  }
  &__bottom{max-width:$mw;margin:0 auto;padding:16px 24px;border-top:1px solid $bd;
    display:flex;justify-content:space-between;align-items:center;font-size:12px;color:$tf;font-weight:300;
    @media(max-width:480px){flex-direction:column;gap:8px;text-align:center}
  }
  &__ver{font-family:"Inter",monospace;opacity:.5}
}

.mu-modal {
  position:fixed;inset:0;z-index:200;display:flex;align-items:center;justify-content:center;
  background:rgba($bg,.8);backdrop-filter:blur(12px);padding:24px;
  &__box{position:relative;max-width:640px;width:100%;max-height:80vh;overflow-y:auto;
    background:mu.$bgc;border:1px solid $bd;border-radius:$r;padding:40px;box-shadow:0 24px 60px rgba(0,0,0,.5)}
  &__close{position:absolute;top:16px;right:16px;width:36px;height:36px;display:flex;align-items:center;justify-content:center;
    background:rgba($v,.08);border:1px solid $bd;border-radius:8px;color:$tm;cursor:pointer;transition:all .2s;
    font-size:24px;&:hover{color:$t1;background:rgba($v,.15)}}
  &__date{font-family:"Inter",monospace;font-size:12px;color:$tf;font-weight:400}
  &__content{
    h2{font-size:24px;font-weight:700;color:$t1;margin:12px 0 20px;line-height:1.4}
    :deep(p){font-size:15px;color:$t2;line-height:1.8;margin-bottom:16px}
    :deep(img){max-width:100%;border-radius:12px}
  }
}

.modal-enter-active,.modal-leave-active{transition:opacity .3s ease}
.modal-enter-from,.modal-leave-to{opacity:0}

@media(prefers-reduced-motion:reduce){
  .mu-bg__grid{animation:none}
  .mu-bg__orb{animation:none}
  .reveal{transition:opacity .3s ease;transform:none}
  .reveal.revealed{transform:none}
}
</style>