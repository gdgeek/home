<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const activeScene = ref(0)
const scenePaused = ref(false)
let sceneTimer: ReturnType<typeof setInterval> | null = null

const scenes = [
  { title: '戶外探索', desc: '走出教室，在真實環境中體驗AR互動學習。學生可以在校園、公園、博物館等場所，透過AR眼鏡觀察疊加在真實世界上的虛擬內容，將課本知識與實地場景結合，激發好奇心與探究欲望。', image: '/images/ar-platform/两个小朋友在外面玩AR游戏.webp', tag: '探索' },
  { title: '醫療護理', desc: '透過AR技術模擬嬰幼兒護理、外傷處理等臨床場景，學生可在零風險環境中反覆練習標準操作流程，提升實操信心與技能熟練度。', image: '/images/ar-platform/婴幼儿护理 外伤处理.webp', tag: '醫療' },
  { title: '口腔教學', desc: '將窩溝封閉、根管治療等精細口腔操作以3D可視化方式呈現，學生可自由旋轉、放大觀察每一個步驟細節，理解傳統教材難以展示的內部結構。', image: '/images/ar-platform/AR医疗 窝沟封闭.webp', tag: '教學' },
  { title: '工業培訓', desc: '掘進機、發動機等大型工業設備1:1還原至AR空間，學員無需進入危險現場即可熟悉設備結構、拆裝流程與維護要點，大幅降低培訓成本與安全風險。', image: '/images/ar-platform/AR掘进机展示.webp', tag: '工業' },
  { title: '互動遊戲', desc: '將知識點融入AR多人協作遊戲，學生組隊完成任務挑戰，在競爭與合作中自然吸收學習內容，寓教於樂，課堂參與度顯著提升。', image: '/images/ar-platform/两个人玩AR游戏.webp', tag: '娛樂' },
  { title: '校園教學', desc: '利用AR沙盤模型將地理、歷史、建築等學科內容立體化呈現，教師可在課堂中即時操控展示角度，學生圍繞模型互動討論，深化理解。', image: '/images/ar-platform/AR沙盘，中南大学.webp', tag: '教育' },
]

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

onMounted(startSceneTimer)
onUnmounted(stopSceneTimer)
</script>

<template>
  <section id="scenes" class="xd-section">
    <div class="xd-section__header reveal">
      <span class="xd-tag">應用場景</span>
      <h2 class="xd-section__title">AI/AR賦能多元教學</h2>
    </div>
    <div class="xd-tabs reveal">
      <div class="xd-tabs__nav">
        <button
          v-for="(s, idx) in scenes"
          :key="s.tag"
          class="xd-tabs__btn"
          :class="{ 'xd-tabs__btn--active': activeScene === idx }"
          @click="activeScene = idx"
        >
          {{ s.tag }}
        </button>
      </div>
      <div class="xd-tabs__panel" @mouseenter="pauseScene" @mouseleave="resumeScene">
        <Transition name="scene-fade" mode="out-in">
          <div class="xd-tabs__content" :key="activeScene">
            <div class="xd-tabs__img">
              <img :src="scenes[activeScene].image" :alt="scenes[activeScene].title" loading="lazy" width="700" height="360" />
            </div>
            <div class="xd-tabs__text">
              <h3>{{ scenes[activeScene].title }}</h3>
              <p>{{ scenes[activeScene].desc }}</p>
            </div>
          </div>
        </Transition>
        <div class="xd-tabs__progress">
          <div
            v-for="(s, idx) in scenes"
            :key="s.tag"
            class="xd-tabs__progress-dot"
            :class="{
              'xd-tabs__progress-dot--active': activeScene === idx,
              'xd-tabs__progress-dot--paused': scenePaused && activeScene === idx
            }"
            @click="activeScene = idx"
          ></div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/xiading/variables' as xd;

$steel: xd.$xiading-primary;
$steel-pale: xd.$xiading-primary-pale;
$bg: xd.$xiading-bg-primary;
$card: xd.$xiading-bg-card;
$text-dark: xd.$xiading-text-primary;
$text-muted: xd.$xiading-text-muted;
$border: xd.$xiading-border-color;
$shadow-m: xd.$xiading-shadow-card;
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
    p { font-size: 15px; color: $text-muted; line-height: 1.8; font-weight: 300; }
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

@media (prefers-reduced-motion: reduce) {
  .reveal { transition: opacity 0.3s ease; transform: none; }
  .reveal.revealed { transform: none; }
  .scene-fade-enter-active, .scene-fade-leave-active { transition: opacity 0.15s ease; }
  .scene-fade-enter-from, .scene-fade-leave-to { transform: none; }
}
</style>
