# 📦 CPAI 部署指南

## 方式一：本地开发 (推荐新手)

### 1. 下载微信开发者工具
- 访问：https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html
- 选择对应系统版本下载安装

### 2. 获取项目代码
将整个 `career-ai-miniprogram` 文件夹复制到你的电脑。

### 3. 导入项目
1. 打开微信开发者工具
2. 登录微信小程序账号 (没有可先注册)
3. 点击「+」或「导入项目」
4. 选择项目目录：`career-ai-miniprogram`
5. AppID 选择：
   - 有小程序账号：填写你的 AppID
   - 测试用：选择「测试号」
6. 点击「导入」

### 4. 运行项目
- 导入后自动编译
- 点击工具栏「预览」可在手机上查看
- 点击「详情」可查看所有文件

### 5. 修改配置
编辑 `project.config.json`：
```json
{
  "appid": "你的 AppID"
}
```

---

## 方式二：云开发 (保存用户数据)

### 1. 开通云开发
1. 在开发者工具点击顶部「云开发」按钮
2. 首次使用会提示开通，点击「开通」
3. 创建环境 (名称随意，如 "career-test")
4. 等待环境创建完成

### 2. 配置环境 ID
编辑 `miniprogram/app.js`：
```javascript
wx.cloud.init({
  env: 'career-test-xxx',  // 替换为你的环境 ID
  traceUser: true,
});
```

### 3. 创建数据库 (可选)
1. 在云开发控制台点击「数据库」
2. 创建集合：`testResults`
3. 设置权限：「所有用户可读写」

### 4. 使用云存储
当前版本使用本地存储 (wx.setStorageSync)，如需云存储可修改：
```javascript
// 保存数据
wx.cloud.callFunction({
  name: 'saveResult',
  data: { result: results }
});

// 读取数据
wx.cloud.callFunction({
  name: 'getResult',
  success: res => { console.log(res.result); }
});
```

---

## 方式三：发布上线

### 1. 准备工作
- 完成小程序认证 (个人/企业)
- 准备小程序名称、图标、介绍
- 确保所有功能测试通过

### 2. 上传代码
1. 在开发者工具点击「上传」
2. 填写版本号和项目备注
3. 点击「上传」

### 3. 提交审核
1. 登录 [微信小程序后台](https://mp.weixin.qq.com/)
2. 在「版本管理」中找到刚上传的版本
3. 点击「提交审核」
4. 填写审核信息 (测试账号等)

### 4. 发布上线
- 审核通过后，在后台点击「发布」
- 用户即可搜索到你的小程序

---

## ⚠️ 常见问题

### Q1: 导入后显示空白？
- 检查 `app.json` 中的 `pages` 数组是否正确
- 查看开发者工具控制台是否有报错

### Q2: 样式显示异常？
- 确保微信开发者工具是最新版本
- 清除缓存：工具 → 清除缓存 → 全部清除

### Q3: 无法预览？
- 确认已绑定为小程序体验者
- 检查手机是否连接同一网络

### Q4: 云开发函数调用失败？
- 检查云函数是否已上传并部署
- 确认环境 ID 配置正确

---

## 📱 真机调试

### 1. 开启调试模式
在 `app.js` 中添加：
```javascript
wx.setEnableDebug({
  enableDebug: true
});
```

### 2. 使用 vConsole
在 `app.js` 的 `onLaunch` 中：
```javascript
const vConsole = require('./utils/vconsole.min.js');
```

---

## 🔧 自定义配置

### 修改主题色
编辑 `miniprogram/app.wxss`：
```css
:page {
  --gradient-start: #你的颜色;
  --gradient-end: #你的颜色;
}
```

### 修改题目
在对应页面的 `.js` 文件中修改 `questions` 数组。

### 添加新测试
1. 复制一个现有测试文件夹
2. 修改题目和评分逻辑
3. 在 `app.json` 注册新页面
4. 在首页添加入口卡片

---

## 📞 技术支持

遇到问题可查阅：
- [微信小程序官方文档](https://developers.weixin.qq.com/miniprogram/dev/framework/)
- [云开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)

---

**🎉 祝你部署顺利！**
