# GitHub Pages 部署指南

## ✨ 自动部署（推荐）

本项目已配置 GitHub Actions，推送到 `main` 或 `master` 分支后会自动部署到 GitHub Pages。

### 🚀 完整设置步骤

1. **初始化 Git 仓库**（如果还没有）
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/crcon/e01.git
   git branch -M main
   git push -u origin main
   ```

2. **启用 GitHub Pages**
   - 进入 GitHub 仓库 → Settings → Pages
   - Source 中选择 **"GitHub Actions"**
   - 保存设置

3. **查看部署状态**
   - 进入仓库 → Actions 标签页
   - 查看 "Deploy to GitHub Pages" 工作流程执行情况
   - 部署完成后，访问 `https://crcon.github.io/e01/`

### 📝 项目已配置的内容

✅ `vite.config.ts`:   `base: '/e01/'` - 正确的GitHub Pages子路径  
✅ `.github/workflows/deploy.yml` - 自动部署工作流  
✅ `package.json` - 包含构建脚本  
✅ `.gitignore` - 忽略 node_modules 和 dist 目录

---

## 🛠️ 手动本地构建和测试

如果想在本地测试构建：

```bash
# 1. 安装依赖
npm install

# 2. 构建生产版本
npm run build

# 3. 预览构建结果
npm run preview
```

构建完成后，输出文件会在 `dist/` 目录中。

---

## 📱 常见问题排查

### ❌ 网站显示 404 或 "Not Found"

**解决方案：**
- 确认 vite.config.ts 中 `base: '/e01/'` 配置正确
- GitHub Pages 地址应为 `https://crcon.github.io/e01/`（不是根路径）
- 清浏览器缓存并重新访问

### ❌ 样式或图片不显示

**解决方案：**
- 检查浏览器控制台是否有 404 错误
- 确保所有资源引用使用相对路径
- dist 目录中应该有 images、assets 等目录
- 清缓存后再试

### ❌ GitHub Actions 部署失败

**解决方案：**
- 检查 Actions 页面的错误日志
- 确保 main/master 分支存在
- 验证 Pages 设置已选择 "GitHub Actions"
- 如果是依赖问题，运行 `npm ci` 重新安装

### ✅ 推送代码后自动部署

每次成功推送到 main 或 master 分支时：
1. GitHub Actions 自动触发
2. 安装依赖并构建
3. 部署到 gh-pages 分支
4. 更新 GitHub Pages（通常 1-2 分钟）

---

## 📚 项目结构

│   └── workflows/
│       └── deploy.yml      # GitHub Actions 自动部署配置
├── public/
│   └── images/             # 图片资源
├── src/
│   └── sections/           # 页面组件
├── dist/                   # 构建输出（自动生成）
├── vite.config.ts          # Vite 配置（已配置 base: './'）
├── index.html              # HTML 入口（已使用相对路径）
└── DEPLOY.md               # 本文件
```

## 注意事项

1. **不要修改 `base: './'` 配置**，这是 GitHub Pages 正常工作的关键
2. **所有图片必须使用相对路径** `./images/xxx.jpg`
3. **构建后务必检查** `dist/images/` 目录是否存在
4. **首次部署可能需要 5-10 分钟** 才能生效

## 联系支持

如有问题，请检查：
1. GitHub Actions 日志（Actions 标签页）
2. 浏览器开发者工具（F12）查看网络请求
3. 确保所有路径都是相对路径
