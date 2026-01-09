# 《末日幸存者：卡牌求生》新手操作指南

欢迎！这是一份为编程新手准备的完整指南。

## 📍 您现在的位置

✅ **已完成：**
- 游戏代码已上传到您的GitHub：https://github.com/BloomingProsperity/doomsday-survivor
- 游戏Demo已开发完成（可在Manus平台在线体验）

## 🎮 游戏功能概览

### 已实现的功能
1. **游戏主页** - 赛博废土朋克风格启动界面
2. **卡牌战斗** - 回合制策略对战系统
3. **避难所建造** - 放置经营系统
4. **卡牌收藏** - 多稀有度卡牌体系
5. **商城系统** - 多种付费选项设计
6. **项目报告** - 完整的市场分析和设计文档

## 🚀 接下来该怎么做

### 第一步：在本地运行游戏（推荐）

如果您想在自己的电脑上运行游戏，请按照以下步骤：

#### 1. 安装必要工具
- 下载并安装 Node.js（https://nodejs.org/）
- 下载并安装 Git（https://git-scm.com/）
- 下载并安装 Cursor IDE（https://www.cursor.com/）或 VS Code

#### 2. 克隆项目到本地
```bash
# 打开终端/命令行，执行以下命令
git clone https://github.com/BloomingProsperity/doomsday-survivor.git
cd doomsday-survivor
```

#### 3. 安装依赖
```bash
# 使用pnpm安装依赖（推荐）
pnpm install

# 或者使用npm
npm install
```

#### 4. 启动开发服务器
```bash
# 启动游戏
pnpm dev

# 或者使用npm
npm run dev
```

然后在浏览器中打开 `http://localhost:3000` 就能看到游戏了！

### 第二步：使用Cursor修改游戏

既然您习惯用Cursor，这很完美！以下是如何使用Cursor修改游戏的步骤：

#### 1. 在Cursor中打开项目
- 打开Cursor
- 点击 "File" -> "Open Folder"
- 选择 `doomsday-survivor` 文件夹

#### 2. 项目结构说明
```
doomsday-survivor/
├── client/
│   ├── src/
│   │   ├── pages/          # 游戏各个页面
│   │   │   ├── Home.tsx    # 主页
│   │   │   ├── Game.tsx    # 战斗页面
│   │   │   ├── Cards.tsx   # 卡牌页面
│   │   │   ├── Shelter.tsx # 避难所页面
│   │   │   ├── Shop.tsx    # 商城页面
│   │   │   └── Report.tsx  # 报告页面
│   │   ├── components/     # 可复用组件
│   │   ├── hooks/          # 自定义Hook
│   │   ├── index.css       # 全局样式
│   │   └── App.tsx         # 应用入口
│   └── public/
│       └── images/         # 游戏图片资源
└── package.json            # 项目配置
```

#### 3. 修改游戏内容

**例子1：修改游戏标题**
- 打开 `client/src/pages/Home.tsx`
- 找到第52行的 `末日幸存者`
- 改成您想要的名字
- 保存文件，浏览器会自动刷新

**例子2：修改卡牌数据**
- 打开 `client/src/pages/Game.tsx`
- 找到 `initialDeck` 数组（第16行）
- 修改卡牌的名称、伤害值等
- 保存后立即生效

**例子3：修改游戏颜色**
- 打开 `client/src/index.css`
- 修改OKLCH颜色值
- 整个游戏的颜色会跟着变化

#### 4. 使用Cursor的AI功能

在Cursor中，您可以使用AI来帮助修改代码：

1. **选中代码** -> 按 `Ctrl+K`（Mac: `Cmd+K`）
2. 输入您的需求，例如：
   - "把这个卡牌的伤害改成20"
   - "添加一个新的卡牌类型"
   - "修改这个按钮的颜色为红色"
3. AI会自动生成代码建议

### 第三步：上架到微信小游戏

这是最复杂的一步，但我已经为您准备了详细指南。

#### 前置条件
- 注册微信小程序账号（https://mp.weixin.qq.com/）
- 完成身份认证
- 准备好游戏图标和截图

#### 关键步骤

1. **迁移到Cocos Creator**
   - 下载 Cocos Creator（https://www.cocos.com/）
   - 将React项目的逻辑迁移到Cocos Creator
   - 导出为微信小游戏格式

2. **接入微信API**
   - 使用微信小游戏SDK
   - 集成虚拟支付功能
   - 添加分享、登录等功能

3. **提交审核**
   - 在微信开发者工具中上传
   - 填写游戏信息和截图
   - 等待审核（通常3-7个工作日）

详细步骤请查看项目中的 `wechat_publish_guide.md` 文件。

## 💡 常见问题

### Q1: 我不懂代码，怎么修改游戏？
A: 使用Cursor的AI功能！选中代码，按Ctrl+K，用自然语言描述您的需求。AI会帮您生成代码。

### Q2: 修改后游戏崩溃了怎么办？
A: 
1. 查看浏览器控制台的错误信息（按F12打开）
2. 在Cursor中使用AI功能，粘贴错误信息并问"这个错误怎么修复"
3. 或者回到GitHub查看之前的版本

### Q3: 如何添加新的游戏页面？
A: 
1. 在 `client/src/pages/` 中创建新文件（例如 `NewPage.tsx`）
2. 参考其他页面的结构编写代码
3. 在 `App.tsx` 中添加路由

### Q4: 游戏在手机上怎么玩？
A: 
1. 确保电脑和手机在同一WiFi网络
2. 获取电脑的IP地址（Windows: `ipconfig`, Mac: `ifconfig`）
3. 在手机浏览器中输入 `http://[电脑IP]:3000`

### Q5: 如何提交到GitHub？
A:
```bash
git add .
git commit -m "修改了什么功能"
git push
```

## 📚 学习资源

- **React文档**：https://react.dev/
- **Tailwind CSS**：https://tailwindcss.com/
- **Framer Motion动画**：https://www.framer.com/motion/
- **Cursor使用教程**：https://www.cursor.com/docs
- **微信小游戏文档**：https://developers.weixin.qq.com/minigame/

## 🎯 建议的下一步

1. **短期（1-2周）**
   - 在Cursor中修改游戏内容
   - 添加更多卡牌和敌人
   - 调整游戏数值和难度

2. **中期（2-4周）**
   - 学习Cocos Creator基础
   - 开始迁移项目到Cocos Creator
   - 准备上架材料

3. **长期（1-2个月）**
   - 完成微信小游戏版本
   - 提交审核
   - 上线运营

## 📞 需要帮助？

如果您遇到问题：
1. 查看本指南中的"常见问题"部分
2. 在GitHub上创建Issue描述问题
3. 使用Cursor的AI功能寻求代码帮助

---

**祝您开发愉快！🚀**

如果有任何疑问，随时告诉我！
