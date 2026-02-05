# Implementation Plan: Multi-Brand Architecture

## Overview

本实现计划将多品牌/多域名架构系统分解为可执行的编码任务。采用增量开发方式，从类型定义开始，逐步构建配置层、composable层，最后集成到现有组件中。

## Tasks

- [x] 1. 创建品牌配置类型定义
  - [x] 1.1 创建 `src/types/brand.ts` 文件，定义 BrandThemeConfig、BrandHeroConfig、BrandFooterConfig、BrandConfig 接口
    - 包含所有必填和可选字段的类型定义
    - 定义 BrandId 联合类型限定有效品牌标识
    - _Requirements: 7.1, 7.2_
  
  - [x] 1.2 更新 `src/types/index.ts`，导出品牌相关类型
    - _Requirements: 7.3_

- [x] 2. 实现品牌注册表
  - [x] 2.1 创建 `src/config/brandRegistry.ts`，实现品牌配置存储
    - 定义 brandRegistry 对象存储所有品牌配置
    - 实现 getBrandConfig(brandId) 查询函数
    - 实现 isValidBrandId(brandId) 验证函数
    - 实现 getAllBrandIds() 获取所有品牌ID
    - _Requirements: 2.1, 2.2, 2.3_
  
  - [x] 2.2 添加星扣（xingkou）品牌完整配置
    - 包含主题、Hero、页脚等所有配置项
    - 从现有 HomePage.vue 迁移内容配置
    - _Requirements: 2.4, 4.2_
  
  - [x] 2.3 添加夏鼎（xiading）品牌完整配置
    - 设计差异化的主题颜色（琥珀色系）
    - 配置夏鼎特有的内容文案
    - _Requirements: 2.4, 4.3_
  
  - [ ]* 2.4 编写品牌注册表单元测试
    - 测试 getBrandConfig 返回正确配置
    - 测试无效ID返回null
    - _Requirements: 2.2, 2.3_
  
  - [ ]* 2.5 编写属性测试：品牌配置结构完整性
    - **Property 1: Brand Configuration Structure Completeness**
    - **Validates: Requirements 2.1, 5.1, 5.2, 6.1, 6.2**

- [x] 3. 实现品牌提供者
  - [x] 3.1 创建 `src/config/brandProvider.ts`，实现环境变量读取和默认值处理
    - 实现 getCurrentBrandConfig() 函数
    - 实现 getCurrentBrandId() 函数
    - 处理无效品牌ID的回退逻辑
    - _Requirements: 1.1, 1.2, 1.3, 1.4_
  
  - [ ]* 3.2 编写属性测试：无效环境变量回退默认品牌
    - **Property 4: Invalid Environment Variable Falls Back to Default**
    - **Validates: Requirements 1.3**

- [x] 4. Checkpoint - 确保配置层测试通过
  - 运行所有测试，确保配置层功能正确
  - 如有问题请询问用户

- [x] 5. 实现 useBrand Composable
  - [x] 5.1 创建 `src/composables/useBrand.ts`
    - 提供 brandConfig、brandId、theme、hero、footer、loginUrl 等响应式属性
    - 使用 computed 缓存配置
    - _Requirements: 4.1, 4.4, 5.3_
  
  - [ ]* 5.2 编写 useBrand 单元测试
    - 测试返回正确的品牌配置
    - 测试响应式属性正确工作
    - _Requirements: 4.1_

- [x] 6. 更新环境变量配置
  - [x] 6.1 更新 `.env.example` 添加 `VITE_BRAND_ID` 配置项
    - 添加注释说明可选值
    - _Requirements: 1.1_
  
  - [x] 6.2 更新 `src/vite-env.d.ts` 添加环境变量类型声明
    - _Requirements: 7.1_

- [x] 7. 集成品牌配置到现有组件
  - [x] 7.1 更新 `src/views/HomePage.vue`
    - 引入 useBrand composable
    - 将硬编码的 heroConfig 替换为品牌配置
    - 将 footerNavigation 替换为品牌配置
    - _Requirements: 4.1, 4.4, 6.1, 6.2_
  
  - [x] 7.2 更新 `src/components/sections/HeaderNav.vue`
    - 使用品牌配置中的 Logo
    - 使用品牌名称
    - _Requirements: 5.2_
  
  - [x] 7.3 更新 `src/components/common/LoginModal.vue`
    - 使用品牌配置中的登录URL
    - 更新对话框标题使用品牌名称
    - _Requirements: 3.1, 3.2_
  
  - [x] 7.4 更新 `src/components/sections/FooterSection.vue`
    - 使用品牌配置中的版权信息
    - _Requirements: 6.2_

- [x] 8. 实现品牌主题CSS变量
  - [x] 8.1 创建 `src/assets/styles/brand-theme.scss`
    - 定义品牌主题CSS变量
    - 实现主题切换机制
    - _Requirements: 5.4_
  
  - [x] 8.2 更新 `src/assets/styles/global.scss` 引入品牌主题
    - _Requirements: 5.3_
  
  - [x] 8.3 更新 `src/App.vue` 应用品牌主题CSS变量
    - 在应用启动时设置CSS变量
    - _Requirements: 5.3_

- [x] 9. Checkpoint - 确保集成测试通过
  - 运行所有测试，确保组件集成正确
  - 手动验证两个品牌的页面显示
  - 如有问题请询问用户

- [ ] 10. 实现属性测试
  - [ ]* 10.1 编写属性测试：有效品牌ID查询返回配置
    - **Property 2: Valid Brand ID Query Returns Configuration**
    - **Validates: Requirements 2.2, 3.2**
  
  - [ ]* 10.2 编写属性测试：无效品牌ID返回null
    - **Property 3: Invalid Brand ID Returns Null**
    - **Validates: Requirements 2.3**
  
  - [ ]* 10.3 编写属性测试：品牌配置序列化 round-trip
    - **Property 5: Brand Configuration Serialization Round-Trip**
    - **Validates: Requirements 8.1**

- [x] 11. 最终检查点 - 确保所有测试通过
  - 运行完整测试套件
  - 验证 TypeScript 编译无错误
  - 如有问题请询问用户

## Notes

- 任务标记 `*` 为可选任务，可跳过以加快 MVP 开发
- 每个任务引用具体需求以确保可追溯性
- 检查点确保增量验证
- 属性测试验证通用正确性属性
- 单元测试验证具体示例和边界条件

