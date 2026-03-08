<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed, ref } from 'vue'

defineProps<{
  navScrolled: boolean
  onOpenLogin: () => void
  activeLang: string
  languages: { code: string; label: string }[]
  switchLang: (code: string) => void
}>()

const { t } = useI18n({ useScope: 'global' })

const menuOpen = ref(false)

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
</script>

<template>
  <header class="mu-nav" :class="{ 'mu-nav--scrolled': navScrolled }">
    <div class="mu-nav__inner">
      <a href="#" class="mu-nav__logo">
        <img src="/logo/XRUGC/xrugc_logo.png" alt="XR UGC" width="120" height="32" />
      </a>
      <nav class="mu-nav__links" aria-label="Main navigation">
        <a v-for="item in navItems" :key="item.url" :href="item.url">{{ item.text }}</a>
      </nav>
      <div class="mu-nav__right">
        <div class="mu-lang">
          <button
            v-for="lang in languages"
            :key="lang.code"
            class="mu-lang__btn"
            :class="{ 'mu-lang__btn--active': activeLang === lang.code }"
            @click="switchLang(lang.code)"
          >
            {{ lang.label }}
          </button>
        </div>
        <button class="mu-btn mu-btn--ghost" @click="onOpenLogin">{{ t('xrugc.auth.login') }}</button>
        <button class="mu-btn mu-btn--primary" @click="onOpenLogin">{{ t('xrugc.auth.getStarted') }}</button>
        <button
          class="mu-nav__hamburger"
          :aria-expanded="menuOpen"
          aria-label="Open menu"
          @click="menuOpen = !menuOpen"
        >
          <span v-if="!menuOpen">☰</span>
          <span v-else>✕</span>
        </button>
      </div>
    </div>
    <div v-show="menuOpen" class="mu-nav__mobile-menu">
      <a
        v-for="item in navItems"
        :key="item.url"
        :href="item.url"
        class="mu-nav__mobile-link"
        @click="menuOpen = false"
      >{{ item.text }}</a>
    </div>
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
        <button class="mu-btn mu-btn--gradient mu-btn--lg" @click="onOpenLogin">{{ t('xrugc.hero.cta') }}</button>
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
      <img src="/images/ar-platform/两个小朋友在外面玩AR游戏.webp" alt="XR UGC Platform" fetchpriority="high" width="600" height="500" />
      <div class="mu-hero__visual-glow"></div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/xrugc/variables' as mu;

$v: mu.$v; $vl: mu.$vl; $o: mu.$o; $ol: mu.$ol;
$bg: mu.$bg; $t1: mu.$t1; $t2: mu.$t2; $tm: mu.$tm; $tf: mu.$tf;
$bd: mu.$bd; $bdh: mu.$bdh; $r: mu.$r; $rs: mu.$rs; $mw: mu.$mw; $e: mu.$e;

@keyframes pulseGlow { 0%,100%{opacity:.5} 50%{opacity:1} }

.reveal { opacity:0; transform:translateY(32px); transition:opacity .8s $e, transform .8s $e; &.revealed{opacity:1;transform:translateY(0)} }

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

  &__hamburger {
    display: none;
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    color: $tm;
    padding: 4px 8px;
    min-height: 44px;
    min-width: 44px;
    align-items: center;
    justify-content: center;
    @media(max-width:768px) { display: flex; }
  }

  &__mobile-menu {
    display: none;
    @media(max-width:768px) {
      display: flex;
      flex-direction: column;
      padding: 8px 24px 16px;
      border-top: 1px solid rgba($v, 0.1);
    }
  }

  &__mobile-link {
    padding: 12px 0;
    color: $tm;
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
    border-bottom: 1px solid rgba($v, 0.06);
    transition: color 0.25s;
    &:hover { color: $t1; }
    &:last-child { border-bottom: none; }
  }
}

.mu-lang{display:flex;gap:2px;margin-right:12px;@media(max-width:768px){display:none}
  &__btn{padding:4px 8px;font-size:11px;font-weight:600;color:$tf;background:transparent;border:none;border-radius:4px;cursor:pointer;transition:all .2s;font-family:inherit;&:hover{color:$tm}&--active{color:$vl;background:rgba($v,.12)}}
}

.mu-btn {
  display:inline-flex;align-items:center;gap:8px;padding:10px 22px;font-family:inherit;font-size:14px;font-weight:600;
  border-radius:$rs;border:none;cursor:pointer;transition:all .25s $e;letter-spacing:.01em;
  &--primary{background:$v;color:white;box-shadow:0 2px 16px rgba($v,.3);&:hover{background:#0284C7;transform:translateY(-1px);box-shadow:0 4px 24px rgba($v,.4)}}
  &--gradient{background:linear-gradient(135deg,$v 0%,$o 100%);color:white;box-shadow:0 4px 20px rgba($v,.3);&:hover{transform:translateY(-2px);box-shadow:0 8px 32px rgba($v,.4)}}
  &--ghost{background:transparent;color:$tm;&:hover{color:$t1;background:rgba($v,.08)}}
  &--outline{background:transparent;color:$t2;border:1.5px solid $bdh;&:hover{border-color:$vl;color:$vl}}
  &--lg{padding:14px 30px;font-size:15px;border-radius:12px}
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

@media(prefers-reduced-motion:reduce){
  .reveal{transition:opacity .3s ease;transform:none}
  .reveal.revealed{transform:none}
}
</style>
