# 易储数智能源集团 - 企业介绍网站

基于 React + TypeScript + Vite 构建的现代化企业展示网站。

## 项目简介

易储数智能源集团企业官网，展示公司储能业务、技术实力、项目案例等信息。

## 技术栈

- **框架**: React 19 + TypeScript
- **构建工具**: Vite 7
- **样式**: Tailwind CSS 3
- **UI组件**: shadcn/ui + Radix UI
- **动画**: GSAP + ScrollTrigger
- **图标**: Lucide React

## 本地开发

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:5173

### 3. 构建生产版本

```bash
npm run build
```

构建后的文件在 `dist` 目录

## 项目结构

```
my-app/
├── public/              # 静态资源
│   └── images/          # 图片资源
├── src/                 # 源代码
│   ├── components/      # 公共组件
│   │   └── ui/          # UI组件(shadcn)
│   ├── sections/        # 页面区块组件
│   │   ├── Hero.tsx     # 首页主视觉
│   │   ├── Policy.tsx   # 国家政策
│   │   ├── Market.tsx   # 行业市场
│   │   ├── About.tsx    # 企业介绍
│   │   ├── Solutions.tsx # 业务介绍
│   │   ├── Tech.tsx     # 技术实力
│   │   ├── Projects.tsx # 项目案例
│   │   ├── Business.tsx # 合作模式
│   │   ├── Contact.tsx  # 联系我们
│   │   ├── Footer.tsx   # 页脚
│   │   └── Navigation.tsx # 导航栏
│   ├── App.tsx          # 主应用
│   ├── App.css          # 应用样式
│   ├── index.css        # 全局样式
│   └── main.tsx         # 入口文件
├── index.html           # HTML模板
├── package.json         # 项目依赖
├── tailwind.config.js   # Tailwind配置
├── tsconfig.json        # TypeScript配置
└── vite.config.ts       # Vite配置
```

## 网站模块

1. **首页主视觉** - 品牌展示、核心价值主张
2. **国家政策** - 双碳战略、政策发展历程
3. **行业市场** - 市场规模数据、发展趋势
4. **企业介绍** - 公司背景、六位一体生态
5. **业务介绍** - 储能电站投资、电力运营、电力交易
6. **技术实力** - 3S核心技术、AI智能运营
7. **项目案例** - 威县项目、曲靖AIDC、国峰天狼机器人
8. **合作模式** - 多元化合作方式
9. **联系我们** - 联系表单、公司信息

## 联系方式

- 电话: 139-8008-1510
- 邮箱: 13980081510@qq.com
- 地址: 深圳市科兴科技园 A2栋 7-8楼

## License

Private
