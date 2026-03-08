<script setup lang="ts">
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
</script>

<template>
  <section id="features" class="xd-section">
    <div class="xd-section__header reveal">
      <span class="xd-tag">核心功能</span>
      <h2 class="xd-section__title">簡單操作，無限可能</h2>
    </div>
    <div class="xd-bento reveal">
      <div
        v-for="(f, idx) in features"
        :key="f.id"
        class="xd-bento__item"
        :class="{ 'xd-bento__item--hero': idx === 0 }"
      >
        <div class="xd-bento__img">
          <img :src="f.image" :alt="f.title" loading="lazy" width="600" height="320" />
        </div>
        <div class="xd-bento__overlay">
          <span class="xd-bento__num">0{{ idx + 1 }}</span>
          <h3 class="xd-bento__title">{{ f.title }}</h3>
          <p class="xd-bento__desc">{{ f.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/xiading/variables' as xd;

$steel: xd.$xiading-primary;
$steel-light: xd.$xiading-primary-light;
$border: xd.$xiading-border-color;
$border-hover: xd.$xiading-border-hover;
$shadow-s: xd.$xiading-shadow-soft;
$shadow-l: xd.$xiading-shadow-hover;
$text-dark: xd.$xiading-text-primary;
$r: xd.$xiading-border-radius-lg;
$max-w: xd.$xiading-container-max-width;
$ease: xd.$xiading-ease-out;

.reveal {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.7s $ease, transform 0.7s $ease;
  &.revealed { opacity: 1; transform: translateY(0); }
}

.xd-tag {
  display: inline-block; padding: 6px 16px;
  background: rgba($steel, 0.06); border: 1px solid rgba($steel, 0.12);
  border-radius: 100px; font-size: 13px; font-weight: 500; color: $steel; letter-spacing: 0.04em;
}

.xd-section {
  position: relative; z-index: 1;
  max-width: $max-w; margin: 0 auto; padding: 64px 24px;
  @media (max-width: 768px) { padding: 40px 16px; }

  &__header { text-align: center; margin-bottom: 36px; }
  &__title {
    font-family: 'Zen Kaku Gothic New', sans-serif;
    font-size: clamp(26px, 4.5vw, 40px); font-weight: 700;
    color: $text-dark; margin-top: 14px; letter-spacing: -0.01em; line-height: 1.25;
  }
}

// ═══════════════════════════════════════
// Bento Grid 功能區
// ═══════════════════════════════════════
.xd-bento {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto auto;
  gap: 16px;

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

@media (prefers-reduced-motion: reduce) {
  .reveal { transition: opacity 0.3s ease; transform: none; }
  .reveal.revealed { transform: none; }
}
</style>
