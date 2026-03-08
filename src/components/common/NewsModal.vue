<script setup lang="ts">
/**
 * NewsModal - 新闻详情弹窗组件
 *
 * 无障碍支持（需求 11.1–11.5）：
 * - role="dialog" + aria-modal="true" + aria-labelledby 关联标题
 * - 打开时焦点移入弹窗（关闭按钮）
 * - ESC 键关闭并返回焦点到触发元素
 * - 焦点陷阱：Tab 键在弹窗内循环
 */
import { ref, watch, nextTick, computed } from 'vue'
import DOMPurify from 'dompurify'
import type { NewsItem } from '@/types'

const props = defineProps<{
  modelValue: boolean
  news: NewsItem | null
  formatDate: (dateString: string) => string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

// ---- 净化内容（需求 19.1–19.3）----
const sanitizedContent = computed(() =>
  props.news?.content ? DOMPurify.sanitize(props.news.content) : ''
)

// ---- Refs ----
const modalRef = ref<HTMLElement | null>(null)
const closeButtonRef = ref<HTMLButtonElement | null>(null)
/** 触发弹窗打开的元素，用于关闭后返回焦点 */
let triggerElement: HTMLElement | null = null

// ---- 焦点陷阱 ----
const focusableSelectors =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'

const trapFocus = (e: KeyboardEvent) => {
  const modal = modalRef.value
  if (!modal) return
  const focusable = Array.from(
    modal.querySelectorAll<HTMLElement>(focusableSelectors)
  ).filter((el) => !el.hasAttribute('disabled'))
  if (focusable.length === 0) return
  const first = focusable[0]
  const last = focusable[focusable.length - 1]
  if (e.shiftKey) {
    if (document.activeElement === first) {
      e.preventDefault()
      last.focus()
    }
  } else {
    if (document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }
}

// ---- ESC 关闭 ----
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    close()
  } else if (e.key === 'Tab') {
    trapFocus(e)
  }
}

// ---- 打开/关闭 ----
const close = () => {
  emit('update:modelValue', false)
}

watch(
  () => props.modelValue,
  async (open) => {
    if (open) {
      // 记录触发元素
      triggerElement = document.activeElement as HTMLElement
      // 等待 DOM 更新后移入焦点
      await nextTick()
      closeButtonRef.value?.focus()
    } else {
      // 返回焦点到触发元素
      triggerElement?.focus()
      triggerElement = null
    }
  }
)
</script>

<template>
  <Teleport to="body">
    <Transition name="news-modal">
      <div
        v-if="modelValue"
        class="nm-overlay"
        @click.self="close"
      >
        <!-- 需求 11.1: role="dialog" aria-modal="true" -->
        <!-- 需求 11.2: aria-labelledby 关联标题 -->
        <div
          ref="modalRef"
          class="nm-box"
          role="dialog"
          aria-modal="true"
          aria-labelledby="news-modal-title"
          @keydown="handleKeydown"
        >
          <!-- 需求 11.3/11.4: 关闭按钮接收初始焦点，ESC 关闭 -->
          <button
            ref="closeButtonRef"
            class="nm-close"
            :aria-label="'关闭'"
            @click="close"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
            </svg>
          </button>

          <div v-if="news" class="nm-content">
            <div class="nm-header">
              <span v-if="news.category" class="nm-category">{{ news.category.name }}</span>
              <span class="nm-date">{{ formatDate(news.date) }}</span>
            </div>
            <!-- 需求 11.2: id="news-modal-title" 供 aria-labelledby 引用 -->
            <h2 id="news-modal-title" class="nm-title">{{ news.title }}</h2>
            <div v-if="news.excerpt" class="nm-excerpt">{{ news.excerpt }}</div>
            <div v-if="sanitizedContent" class="nm-body" v-html="sanitizedContent"></div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
.nm-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  padding: 24px;
}

.nm-box {
  position: relative;
  max-width: 700px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
  outline: none;

  @media (max-width: 768px) {
    max-height: 90vh;
    border-radius: 8px;
  }
}

.nm-close {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
  z-index: 1;

  &:hover {
    background: rgba(0, 0, 0, 0.12);
    color: #333;
  }

  &:focus-visible {
    outline: 2px solid #4f46e5;
    outline-offset: 2px;
  }
}

.nm-content {
  padding: 40px;

  @media (max-width: 768px) {
    padding: 24px 20px;
  }
}

.nm-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  flex-wrap: wrap;
  gap: 8px;
}

.nm-category {
  display: inline-block;
  padding: 4px 12px;
  font-size: 12px;
  font-weight: 600;
  border-radius: 100px;
  background: rgba(79, 70, 229, 0.1);
  color: #4f46e5;
}

.nm-date {
  font-size: 13px;
  color: #888;
}

.nm-title {
  font-size: 22px;
  font-weight: 700;
  line-height: 1.4;
  color: #111;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    font-size: 18px;
  }
}

.nm-excerpt {
  font-size: 15px;
  color: #555;
  line-height: 1.7;
  margin-bottom: 20px;
  padding: 12px 16px;
  background: rgba(0, 0, 0, 0.03);
  border-left: 3px solid #4f46e5;
  border-radius: 0 6px 6px 0;
}

.nm-body {
  font-size: 15px;
  color: #333;
  line-height: 1.8;

  :deep(p) { margin-bottom: 14px; }
  :deep(img) { max-width: 100%; border-radius: 8px; margin: 12px 0; }
  :deep(h1), :deep(h2), :deep(h3), :deep(h4) {
    margin: 20px 0 10px;
    font-weight: 600;
    color: #111;
  }
  :deep(a) { color: #4f46e5; }
}

// Transition
.news-modal-enter-active,
.news-modal-leave-active {
  transition: opacity 0.25s ease;

  .nm-box {
    transition: transform 0.25s ease, opacity 0.25s ease;
  }
}

.news-modal-enter-from,
.news-modal-leave-to {
  opacity: 0;

  .nm-box {
    transform: scale(0.95) translateY(12px);
    opacity: 0;
  }
}
</style>
