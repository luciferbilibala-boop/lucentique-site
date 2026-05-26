# 网站 — Claude Code 工作说明

> 古籍账号的网站部分，用于展示古籍藏品和分享内容。

## 目录结构

```
网站/
├── CLAUDE.md                    ← 本文件
├── 待发布/
│   ├── A类_古籍藏品/            ← A类文章待发布
│   └── B类_老灵魂栏目/          ← B类文章待发布
└── images/
    ├── A类_待补拍/              ← A类图片（默认待补拍）
    └── B类_已配图/              ← B类配图
```

## 内容分类

**A类_古籍藏品**：主人的古籍收藏与在售藏品
**B类_老灵魂栏目**：分享艺术、书籍、审美、古典生活方式等内容

## 三层语义架构规范 (Semantic Digitalization & GEO)

新增任何文章时，遵循三层数据架构，一步到位：

### Layer 1 — 人类阅读内容
中文文章正文。写入 Markdown body。不用英文——古籍藏的受众以中文读者为主。

### Layer 2 — AI / 搜索引擎语义表示
高密度英文视觉事实描述，注入 frontmatter 字段。聚焦颜色、材质、物体、空间关系——只做视觉事实陈述，不做解释，不做评价。用于搜索引擎和生成式 AI Agent 的语义桥接。

需填写的 L2 字段：
- `description`：一句话中文摘要
- `enDescription`：一句话英文语义摘要
- `coverAltText`：封面图英文视觉描述，60-80 词
- `gallery[].altText`：每张图录的英文视觉描述，60-80 词
- `gallery[].description`：每张图的一句话语义概念

### Layer 3 — 机器读取的结构化数据
精确物理属性，作为 frontmatter 显式 key。绑定到 Astro Content Collections schema，由 `JsonLd.astro` 组件自动渲染为 schema.org JSON-LD。

需填写的 L3 字段（gallery 每张图）：
- `artworkType: "VisualArtwork"`
- `medium`：媒介（如 "Chromolithograph on paper"）
- `designer`：设计师/插画家/出版商
- `year`：创作年份

Schema 类型映射：A类 → `Book` + `illustration`；B类 → `Article` + `about`。

### 模板绑定规则
- 封面 `<img alt>` → `Article.astro` 自动使用 `coverAltText`，fallback 到 `title`
- 图录 `<img alt>` → `ImageGallery.astro` → `Figure.astro`，优先级 `altText` > `alt` > 数字序号
- JSON-LD → `JsonLd.astro` 自动从 gallery 中提取含 `medium`/`designer`/`year` 的图生成结构化数据

### 当前覆盖状态

| 文章 | L1 正文 | L2 altText/enDesc | L3 gallery meta | JsonLd | 状态 |
|------|:--:|:--:|:--:|:--:|------|
| Queen Summer (A类) | ✓ | ✓ | ✓ | ✓ | 完成 |
| Dekorative Vorbilder (B类) | ✓ | ✓ | ✓ | ✓ | 完成 |
| Modern Decorative Art (B类) | ✓ | ✓ | ✓ | ✓ | 完成 |

## 新增文章 Checklist

新增 A类 或 B类 文章时，确保以下字段全部填写后再标记 `published: true`：

```yaml
---
title: "[标题]"
date: YYYY-MM-DD
description: "[一句话中文摘要]"
enDescription: "[One-sentence English semantic summary for AI/SEO]"
tags: ["..."]
cover: "/images/..."
coverAltText: "[60-80 words English visual fact description of the cover image]"
gallery:
  - src: "/images/..."
    alt: "[简短中文标签，如 '封面'、'题名页']"
    caption: "[中文图注]"
    altText: "[60-80 words English visual fact description]"
    medium: "[媒介，如 'Chromolithograph on paper']"
    designer: "[设计师/插画家/出版商]"
    year: "[年份]"
    artworkType: "VisualArtwork"
    description: "[One-sentence English semantic concept for this image]"
published: true
---
[Layer 1: 中文正文]
```

### 字段说明
- `alt`（简短中文标签）和 `altText`（英文视觉描述）是两个不同字段，**必须同时填写**。`alt` 是给中文读者快速识别的，`altText` 是给搜索引擎和 AI Agent 的。
- A类文章额外需要 `availability` 字段（`在售` / `已售` / `展示中`），用于展示 InquiryBlock。
- `designers`（顶层数组）列出主要创作者，`gallery[].designer` 列出单张图的具体创作者。

## 核心规则

### 上传控制

任何内容不得自动上传 GitHub。
所有文章必须先进入 网站/待发布/ 对应分类。

只有当主人明确说以下触发语句时，才可以提交到 GitHub：
- "确认上传网站"
- "这篇可以上传"
- "同步到网站"

### A类文章处理

- 使用主人最终修改后的 md
- 默认图片状态为：待补拍
- 不自动使用旧照片作为网站图，除非主人明确允许

### B类文章处理

- 可以使用已有配图
- 需要复制配图到 网站/images/B类_已配图/
- 仍然必须等待主人确认后上传

## 工作流程

1. 主人确认某篇文章可以发布到网站
2. Claude Code 将文章 md 放入 网站/待发布/[对应分类]/
3. B类：同步复制配图到 网站/images/B类_已配图/
4. 等待主人说"确认上传网站"
5. 提交到 GitHub
