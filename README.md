# UI-Effect-Repo

一个中文优先、支持中英文的 UI 组件与动效收藏库。可以预览效果、按用途查找组件、查看源码，以及获取来源提供的原始 AI 提示词。

本仓库包含完整应用源码，无需另行克隆其他项目。

## 功能

- 1,384 条组件与参考条目，11 个主类、88 个有内容的子类。
- 中英文搜索、用途描述匹配、特点标签、来源过滤与本地收藏。
- 组件介绍、适用场景和选择理由，帮助判断如何使用。
- 可交互预览、演示重播、源码查看与下载。
- 原始提示词和机器可读目录，明确区分完整内容、公开预览与外部参考。
- 16 个资源站入口。

部分条目仅提供原站参考或录像，不代表全部组件都能在站内运行。应用建议与原始提示词分开展示；缺失的生成记录不会补造。

## 快速启动

需要 Docker 与 Docker Compose。在本仓库根目录执行：

```sh
cd app
docker compose -f compose.personal.yaml up -d --build
```

访问 <http://localhost:18120>。构建会同时生成主站和独立的 MotionVault 预览。首次构建需要联网下载依赖，部分第三方预览媒体也需要网络。

可以通过 `UIE_PORT`、`UIE_BIND_ADDRESS` 和 `UIE_IMAGE_TAG` 环境变量调整端口、监听地址和镜像标签。停止服务：

```sh
docker compose -f compose.personal.yaml down
```

## 目录

```text
app/
  src/                   应用页面与组件实现
  src/personal/          双语目录、搜索、应用指南与详情页
  public/                静态素材、原始源码包与提示词
  vendor/motion-vault/    独立预览实现与依赖锁文件
  scripts/               目录生成、导入和校验工具
  infra/                 静态服务配置
  Dockerfile.personal    多阶段容器构建
  compose.personal.yaml  容器启动配置
upstream-reference.json  固定来源版本
```

AI 读取入口：`/llms.txt`、`/personal-registry/index.json`、`/personal-registry/discovery.json`。条目会标明可用源码、提示词范围及来源许可。

## 来源与许可

基于 [React Bits](https://github.com/DavidHDev/react-bits) 扩展，保留原始实现及署名；这是独立派生项目。

- React Bits：适用 [MIT + Commons Clause](app/LICENSE.md)，包含额外限制，不能视为纯 MIT。
- [Motion Prompts](https://motionprompts.dev)：适用 [PolyForm Noncommercial 1.0.0](app/public/motion-prompts/LICENSE.txt) 与署名要求，仅收录可公开获取的内容。
- [MotionVault](https://github.com/xiyu519/MotionVault)、Shadcn Studio、shadcn.io：各自许可证保留于 `app/public/open-libraries/`。
- 归档 HTML 原型及其素材边界见 [来源说明](app/public/personal-ai/NOTICE.txt)。

根目录原有 [LICENSE](LICENSE) 不覆盖第三方应用、组件及素材；各来源按随附许可证使用，不能将整库统一重新标为 Apache-2.0。
