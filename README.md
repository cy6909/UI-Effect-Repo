# UI-Effect-Repo

个人 UI 动效与组件积累库：中文优先，提供中英双语、分类检索、动效演示，以及面向 AI 的原版 Prompt 和源码入口。

- [项目总入口](https://app.notion.com/p/3f490f837c9581998619fc1bad80b228)
- [需求与体验](https://app.notion.com/p/3f490f837c958129ab9fd36d308ff09d)
- [工程约束](https://app.notion.com/p/3f490f837c9581c58309cd73a4c33d4e)
- [React Bits 个人派生路线提案](https://app.notion.com/p/3f490f837c9581999382d56c6b7f6c41)

当前应用位于独立 fork：[cy6909/react-bits / codex/personal-library](https://github.com/cy6909/react-bits/tree/codex/personal-library)。本地 checkout 为 `.upstream/react-bits`，有独立 Git 历史；本仓库保留初始化入口。

个人版演示：[http://10.89.2.12:18120](http://10.89.2.12:18120)。包含中文优先目录、分类搜索、收藏、双语导航、上游交互演示与源码，以及上游原版集成提示词（中英文）。

目录共1,384条：原有215个 React Bits 组件、248个 Motion Prompts 设计与7个个人 AI 实现，新增202个 MotionVault 效果、637份 Shadcn Studio 源码包、75条 shadcn.io 官方参考链接。另有16站资源导航，区分独立复现、源码集成、视觉意图和安装型提示词；参考链接不冒充本地可运行组件。各来源保留许可与原文，受限内容通过原站获取。

支持11个主类、88个有内容的子类、特点标签与中英应用指南；可用大致用途搜索并查看匹配理由，也可切换关键词模式。

获取应用源码（在本仓库根目录执行；`.upstream/` 不纳入本仓库版本管理）：

```sh
git clone --branch codex/personal-library https://github.com/cy6909/react-bits.git .upstream/react-bits
```

若需要与已记录版本一致，可在应用 checkout 中检出 `upstream-reference.json` 的 `personalCommit`。该仓库的构建与容器配置也位于应用 checkout 中。

本机仅编辑源码、Git 和文档。安装、构建、测试、浏览器渲染、Docker 和模型调用统一在 `10.89.2.12` 执行。具体工作方式见 `AGENTS.md` 和 Notion 工程节点。

`upstream-reference.json` 记录上游与个人分支版本。现有 `LICENSE` 是本初始化仓库原始 Apache-2.0 许可证，不适用于独立 fork 内的 React Bits 代码；fork 保留上游 `LICENSE.md` 和署名。
