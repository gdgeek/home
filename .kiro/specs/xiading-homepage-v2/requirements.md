# Requirements Document

## Introduction

本文檔定義夏鼎科技教育平台（Xiading）首頁的功能需求。夏鼎是教育AR創作平台的澳門版本，面向澳門市場的教師、學生和學校。平台採用藍色科技風格設計，以繁體中文呈現，強調現代感、專業感和科技感。

核心定位：「讓知識立起來」— 輕量化、零門檻、沉浸式的教育AR創作與教學輔助工具。

## Glossary

- **Xiading_Homepage**: 夏鼎科技教育平台首頁視圖組件
- **Hero_Section**: 首屏展示區域，採用藍色科技背景配合粒子動效
- **Value_Section**: 核心價值區域，展示教師專屬、學生友好、校園適配三大價值
- **Feature_Section**: 核心功能區域，展示四大功能特性
- **Scene_Section**: 場景化展示區域，展示各學科AR應用場景
- **Case_Section**: 用戶案例區域，展示澳門學校應用案例
- **CTA_Section**: 行動召喚區域，引導用戶登錄
- **Footer_Section**: 頁腳區域，包含導航和新聞模塊
- **Login_Modal**: 登錄模態窗口，用戶名密碼表單
- **WordPress_API**: 用於獲取新聞內容的WordPress REST API服務
- **Blue_Tech_Theme**: 藍色科技主題，以深藍為主色調配合科技感元素

## Requirements

### Requirement 1: Hero區展示

**User Story:** As a 訪問者, I want to 在首屏看到平台的核心定位和科技感視覺, so that I can 快速了解夏鼎的品牌價值。

#### Acceptance Criteria

1. WHEN 用戶訪問首頁 THEN THE Hero_Section SHALL 顯示主標題「讓知識立起來」配合發光文字效果
2. WHEN 用戶訪問首頁 THEN THE Hero_Section SHALL 顯示副標題「澳門教育AR創作平台 — 零門檻、輕量化、沉浸式」
3. WHEN 用戶訪問首頁 THEN THE Hero_Section SHALL 顯示藍色科技背景配合粒子動效
4. WHEN 用戶訪問首頁 THEN THE Hero_Section SHALL 顯示「立即開始創作」主按鈕和「了解教育方案」次按鈕
5. WHEN 用戶點擊「立即開始創作」按鈕 THEN THE System SHALL 打開Login_Modal登錄窗口
6. WHEN 用戶點擊「了解教育方案」按鈕 THEN THE System SHALL 滾動到用戶案例板塊
7. WHEN 用戶訪問首頁 THEN THE Hero_Section SHALL 顯示輔助短句「課本變立體 · 實驗零風險 · 創意可落地 · 知識可互動」
8. THE Hero_Section SHALL 使用藍色主題色系（primaryColor: #0EA5E9）

### Requirement 2: 核心價值板塊展示

**User Story:** As a 教育工作者, I want to 了解平台對不同角色的價值, so that I can 判斷平台是否適合我的需求。

#### Acceptance Criteria

1. WHEN 用戶滾動到核心價值板塊 THEN THE Value_Section SHALL 顯示標題「我們為教育場景，重新定義AR創作」
2. WHEN 用戶查看核心價值板塊 THEN THE Value_Section SHALL 顯示三張價值卡片
3. THE Value_Section SHALL 顯示「教師專屬」價值：快速製作AR課件、互動實驗及教學模型
4. THE Value_Section SHALL 顯示「學生友好」價值：通過AR創作表達學習成果，培養創新能力
5. THE Value_Section SHALL 顯示「校園適配」價值：低成本搭建AR教學環境，推動數字化教育
6. WHEN 價值卡片進入視口 THEN THE System SHALL 觸發淡入動畫效果
7. THE 價值卡片 SHALL 採用玻璃擬態設計配合藍色漸變邊框

### Requirement 3: 核心功能板塊展示

**User Story:** As a 潛在用戶, I want to 了解平台的具體功能, so that I can 評估平台能否滿足我的教學需求。

#### Acceptance Criteria

1. WHEN 用戶滾動到核心功能板塊 THEN THE Feature_Section SHALL 顯示標題「零門檻操作，解鎖教育AR無限可能」
2. WHEN 用戶查看核心功能板塊 THEN THE Feature_Section SHALL 顯示四張功能卡片
3. THE Feature_Section SHALL 顯示「教育專屬素材庫」：全學科課本同步模型，拖拽即用
4. THE Feature_Section SHALL 顯示「零門檻編輯器」：所見即所得，多元素組合
5. THE Feature_Section SHALL 顯示「一鍵分享互動」：適配課堂使用、作業提交
6. THE Feature_Section SHALL 顯示「作品管理中心」：適配教師備課、學生存稿
7. WHEN 懸停功能卡片 THEN THE System SHALL 顯示縮放和發光效果
8. THE 功能卡片 SHALL 採用Bento-grid不對稱網格布局

### Requirement 4: 場景化展示板塊

**User Story:** As a 學科教師, I want to 看到AR在不同學科的應用場景, so that I can 了解如何將AR應用到我的教學中。

#### Acceptance Criteria

1. WHEN 用戶滾動到場景化展示板塊 THEN THE Scene_Section SHALL 顯示標題「AR賦能全學科，適配多元教學場景」
2. WHEN 用戶查看場景化展示板塊 THEN THE Scene_Section SHALL 顯示至少5個學科場景
3. THE Scene_Section SHALL 顯示生物場景：細胞結構、人體器官AR展示
4. THE Scene_Section SHALL 顯示物理場景：力學實驗、電路模擬AR展示
5. THE Scene_Section SHALL 顯示化學場景：分子結構、化學反應AR展示
6. THE Scene_Section SHALL 顯示歷史場景：文物復原、歷史場景AR展示
7. THE Scene_Section SHALL 顯示美術場景：立體作品、創意設計AR展示
8. THE 場景卡片 SHALL 包含學科圖標、場景名稱和應用描述
9. WHEN 場景卡片進入視口 THEN THE System SHALL 觸發交錯淡入動畫

### Requirement 5: 用戶案例板塊展示

**User Story:** As a 決策者, I want to 看到澳門學校的使用案例, so that I can 增強對平台的信任度。

#### Acceptance Criteria

1. WHEN 用戶滾動到用戶案例板塊 THEN THE Case_Section SHALL 顯示標題「已有眾多澳門校園，用夏鼎解鎖AR教學新體驗」
2. WHEN 用戶查看用戶案例板塊 THEN THE Case_Section SHALL 顯示3-4個澳門學校案例
3. THE Case_Section SHALL 採用時間線布局展示案例
4. THE 案例卡片 SHALL 包含學校名稱、案例描述、應用效果和年份標記
5. WHEN 案例卡片進入視口 THEN THE System SHALL 觸發左右交替滑入動畫
6. THE 時間線連接線 SHALL 使用藍色漸變發光效果

### Requirement 6: CTA互動引導板塊

**User Story:** As a 訪問者, I want to 有明確的行動引導, so that I can 快速開始使用平台。

#### Acceptance Criteria

1. WHEN 用戶滾動到CTA板塊 THEN THE CTA_Section SHALL 顯示標題「立即登錄，解鎖全量創作權限」
2. WHEN 用戶查看CTA板塊 THEN THE CTA_Section SHALL 顯示說明「教師、學生、校園用戶通用，登錄後匹配對應功能與素材權益」
3. WHEN 用戶查看CTA板塊 THEN THE CTA_Section SHALL 顯示信任標籤「無廣告 · 免費試用 · 專屬客服指導」
4. WHEN 用戶點擊登錄按鈕 THEN THE System SHALL 打開Login_Modal登錄窗口
5. THE CTA_Section SHALL 採用藍綠漸變背景配合粒子動效
6. THE 登錄按鈕 SHALL 使用發光邊框動畫效果

### Requirement 7: 登錄模態窗口

**User Story:** As a 用戶, I want to 通過模態窗口登錄, so that I can 無需跳轉頁面即可完成登錄。

#### Acceptance Criteria

1. WHEN 用戶點擊任意登錄觸發按鈕 THEN THE Login_Modal SHALL 以模態窗口形式顯示
2. THE Login_Modal SHALL 顯示平台Logo和標題「登錄夏鼎」
3. THE Login_Modal SHALL 包含用戶名輸入框（支持用戶名/手機號/郵箱）
4. THE Login_Modal SHALL 包含密碼輸入框（支持顯示/隱藏切換）
5. THE Login_Modal SHALL 包含「記住我」複選框
6. THE Login_Modal SHALL 包含「忘記密碼」鏈接
7. THE Login_Modal SHALL 包含登錄按鈕和關閉按鈕
8. WHEN 用戶提交空表單 THEN THE Login_Modal SHALL 顯示必填項驗證錯誤
9. WHEN 登錄請求進行中 THEN THE Login_Modal SHALL 顯示加載狀態
10. WHEN 登錄成功 THEN THE Login_Modal SHALL 關閉並顯示成功提示
11. IF 登錄失敗 THEN THE Login_Modal SHALL 顯示錯誤提示信息
12. THE Login_Modal SHALL 支持點擊遮罩關閉和ESC鍵關閉
13. WHEN 視口寬度小於768px THEN THE Login_Modal SHALL 全屏顯示

### Requirement 8: 底部導航與信息

**User Story:** As a 訪問者, I want to 在頁面底部找到導航鏈接和聯繫方式, so that I can 獲取更多信息或聯繫客服。

#### Acceptance Criteria

1. WHEN 用戶滾動到頁面底部 THEN THE Footer_Section SHALL 顯示三大導航分類
2. THE Footer_Section SHALL 顯示「平台服務」導航：創作指南、幫助中心
3. THE Footer_Section SHALL 顯示「關於我們」導航：聯繫我們、公司介紹
4. THE Footer_Section SHALL 顯示「官方動態」導航：新聞公告
5. WHEN 用戶查看底部區域 THEN THE Footer_Section SHALL 顯示版權信息和客服聯繫方式
6. THE Footer_Section SHALL 採用深色背景配合藍色科技裝飾
7. WHEN 懸停導航鏈接 THEN THE System SHALL 顯示下劃線滑動動效

### Requirement 9: WordPress API新聞集成

**User Story:** As a 訪問者, I want to 看到最新的平台動態和行業新聞, so that I can 了解平台發展和教育AR行業趨勢。

#### Acceptance Criteria

1. WHEN 頁面加載完成 THEN THE Footer_Section SHALL 從WordPress_API獲取新聞數據
2. WHEN WordPress_API返回數據成功 THEN THE News_Module SHALL 顯示新聞列表
3. THE News_Module SHALL 支持顯示官方新聞、教育AR行業動態、校園應用案例、平台更新公告
4. IF WordPress_API請求失敗 THEN THE News_Module SHALL 顯示友好的錯誤提示信息
5. WHEN 新聞數據加載中 THEN THE News_Module SHALL 顯示加載狀態指示器
6. THE News_Module SHALL 支持分頁加載更多新聞

### Requirement 10: 響應式設計

**User Story:** As a 移動端用戶, I want to 在不同設備上獲得良好的瀏覽體驗, so that I can 隨時隨地訪問平台首頁。

#### Acceptance Criteria

1. WHEN 視口寬度大於1200px THEN THE Homepage SHALL 以桌面端多列布局展示
2. WHEN 視口寬度在768px-1199px THEN THE Homepage SHALL 以平板端適中布局展示
3. WHEN 視口寬度小於768px THEN THE Homepage SHALL 以移動端單列布局展示
4. WHEN 視口寬度小於768px THEN THE Hero_Section SHALL 垂直堆疊內容並簡化動畫
5. WHEN 視口寬度小於1024px THEN THE Feature_Section SHALL 轉為標準2列網格
6. THE Homepage SHALL 確保所有交互元素觸控目標尺寸至少44px
7. THE Homepage SHALL 在移動端減少動畫複雜度以優化性能

### Requirement 11: 動效與性能

**User Story:** As a 訪問者, I want to 體驗流暢的動畫效果, so that I can 感受到平台的專業品質。

#### Acceptance Criteria

1. THE System SHALL 使用CSS transforms和opacity進行所有動畫（GPU加速）
2. WHEN 用戶啟用prefers-reduced-motion THEN THE System SHALL 禁用或簡化所有動畫
3. THE 粒子和幾何動畫 SHALL 使用requestAnimationFrame進行渲染
4. THE System SHALL 懶加載首屏以下的Section組件
5. THE System SHALL 使用Intersection Observer實現滾動觸發動畫
6. THE 動畫 SHALL 保持60fps性能目標

### Requirement 12: 組件化架構

**User Story:** As a 開發者, I want to 使用組件化的代碼結構, so that I can 方便地維護和擴展代碼。

#### Acceptance Criteria

1. THE Homepage SHALL 使用Vue 3 Composition API進行開發
2. THE Homepage SHALL 使用Element Plus作為UI組件庫
3. THE Homepage SHALL 使用TypeScript進行類型安全開發
4. THE Homepage SHALL 將各板塊拆分為獨立的Vue組件
5. THE Homepage SHALL 封裝API服務為獨立的服務模塊
6. THE Homepage SHALL 使用SCSS進行樣式管理
7. THE 夏鼎組件 SHALL 位於`src/components/xiading/`目錄下
8. THE 夏鼎視圖 SHALL 位於`src/views/xiading/`目錄下
