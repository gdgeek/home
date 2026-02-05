# Requirements Document

## Introduction

本文档定义了多品牌/多域名架构系统的需求。该系统允许同一个 Vue 3 应用根据环境变量配置，动态加载不同品牌的内容、样式和登录地址。初始支持两个品牌：星扣AR教育版（xingkou.com）和夏鼎（xiading.com）。

## Glossary

- **Brand_Config**: 品牌配置对象，包含品牌标识、名称、登录URL、主题配置等信息
- **Brand_Provider**: 品牌配置提供者，负责根据环境变量返回当前品牌配置
- **Brand_Registry**: 品牌注册表，存储所有支持品牌的配置信息
- **Home_Page_View**: 品牌主页视图组件，根据品牌配置渲染对应的内容和样式
- **Login_Redirector**: 登录重定向器，根据品牌配置跳转到对应的登录地址
- **Theme_Config**: 主题配置，包含品牌的颜色、字体、Logo等视觉元素

## Requirements

### Requirement 1: 品牌环境变量配置

**User Story:** As a 运维人员, I want to 通过环境变量配置当前站点的品牌标识, so that 部署时可以灵活切换不同品牌而无需修改代码。

#### Acceptance Criteria

1. THE Brand_Provider SHALL 从环境变量 `VITE_BRAND_ID` 读取当前品牌标识
2. WHEN `VITE_BRAND_ID` 未设置或为空 THEN THE Brand_Provider SHALL 默认使用 `xingkou` 作为品牌标识
3. WHEN `VITE_BRAND_ID` 设置为无效值 THEN THE Brand_Provider SHALL 回退到默认品牌 `xingkou` 并在控制台输出警告
4. THE Brand_Provider SHALL 在应用启动时验证品牌标识的有效性

### Requirement 2: 品牌注册表管理

**User Story:** As a 开发者, I want to 在统一的注册表中管理所有品牌配置, so that 新增品牌时只需添加配置而无需修改核心逻辑。

#### Acceptance Criteria

1. THE Brand_Registry SHALL 存储每个品牌的完整配置信息，包括：品牌ID、品牌名称、登录URL、Logo路径、主题配置
2. THE Brand_Registry SHALL 支持通过品牌ID查询对应的 Brand_Config
3. WHEN 查询不存在的品牌ID THEN THE Brand_Registry SHALL 返回 null
4. THE Brand_Registry SHALL 初始包含 `xingkou`（星扣AR教育版）和 `xiading`（夏鼎）两个品牌配置

### Requirement 3: 多品牌登录跳转

**User Story:** As a 用户, I want to 点击登录按钮时跳转到当前品牌对应的登录页面, so that 我可以使用正确的账号系统进行登录。

#### Acceptance Criteria

1. WHEN 用户点击登录按钮 THEN THE Login_Redirector SHALL 根据当前品牌配置跳转到对应的登录URL
2. THE Login_Redirector SHALL 从 Brand_Config 中获取登录URL
3. WHEN 品牌配置中的登录URL为空 THEN THE Login_Redirector SHALL 显示错误提示而非跳转

### Requirement 4: 多品牌主页视图

**User Story:** As a 用户, I want to 访问网站时看到当前品牌对应的主页内容, so that 我能获得一致的品牌体验。

#### Acceptance Criteria

1. THE Home_Page_View SHALL 根据当前品牌配置加载对应的页面内容
2. WHEN 品牌为 `xingkou` THEN THE Home_Page_View SHALL 显示星扣AR教育版的内容（标题、副标题、特色亮点等）
3. WHEN 品牌为 `xiading` THEN THE Home_Page_View SHALL 显示夏鼎的内容（标题、副标题、特色亮点等）
4. THE Home_Page_View SHALL 使用品牌配置中的 Logo 和主题颜色

### Requirement 5: 品牌主题样式

**User Story:** As a 用户, I want to 看到符合当前品牌视觉风格的界面, so that 我能识别当前访问的是哪个品牌的网站。

#### Acceptance Criteria

1. THE Theme_Config SHALL 包含品牌的主色调、辅助色、背景色等颜色配置
2. THE Theme_Config SHALL 包含品牌的 Logo 图片路径
3. WHEN 应用加载时 THE Home_Page_View SHALL 应用当前品牌的 Theme_Config 到页面样式
4. THE Theme_Config SHALL 支持通过 CSS 变量动态切换品牌主题

### Requirement 6: 品牌内容配置

**User Story:** As a 内容管理员, I want to 为每个品牌配置独立的页面内容, so that 不同品牌可以展示差异化的信息。

#### Acceptance Criteria

1. THE Brand_Config SHALL 包含 Hero 区域的标题、副标题、按钮文案、亮点列表
2. THE Brand_Config SHALL 包含页脚的版权信息、联系方式、导航链接
3. THE Brand_Config SHALL 包含价值主张、功能特性、应用场景等板块的内容配置
4. WHEN 某个内容字段未配置 THEN THE Home_Page_View SHALL 使用合理的默认值或隐藏该元素

### Requirement 7: 品牌配置类型安全

**User Story:** As a 开发者, I want to 使用 TypeScript 类型定义品牌配置结构, so that 编译时能发现配置错误。

#### Acceptance Criteria

1. THE Brand_Config SHALL 有完整的 TypeScript 类型定义
2. THE Theme_Config SHALL 有完整的 TypeScript 类型定义
3. THE Brand_Registry SHALL 使用类型安全的方式存储和查询品牌配置
4. WHEN 品牌配置缺少必填字段 THEN TypeScript 编译器 SHALL 报错

### Requirement 8: 品牌配置序列化

**User Story:** As a 开发者, I want to 品牌配置能够被正确序列化和反序列化, so that 配置可以在不同模块间传递。

#### Acceptance Criteria

1. FOR ALL 有效的 Brand_Config 对象，序列化后再反序列化 SHALL 产生等价的对象（round-trip property）
2. THE Brand_Config 序列化格式 SHALL 使用 JSON
3. WHEN 反序列化无效的 JSON THEN THE Brand_Provider SHALL 返回解析错误

