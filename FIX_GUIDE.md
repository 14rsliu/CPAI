# 🔧 CPAI 小程序问题修复指南

**创建日期**: 2026 年 3 月 24 日  
**适用版本**: v1.1.0  
**预计修复时间**: 2-3 小时

---

## 📊 问题总览

| 优先级 | 问题数量 | 修复难度 | 预计时间 |
|--------|----------|----------|----------|
| 🔴 P0 | 3 个 | ⭐⭐ | 30 分钟 |
| 🟠 P1 | 4 个 | ⭐⭐⭐ | 1 小时 |
| 🟡 P2 | 3 个 | ⭐⭐ | 30 分钟 |
| 🟢 P3 | 2 个 | ⭐ | 15 分钟 |

---

## 🔴 P0 级问题 (必须修复，否则无法上线)

### 1. 配置 AppID

**文件**: `project.config.json`

**当前内容**:
```json
{
  "appid": "your-appid-here",
  ...
}
```

**修复步骤**:
1. 访问 https://mp.weixin.qq.com/
2. 登录小程序后台
3. 复制你的 AppID
4. 替换 `your-appid-here`

**修复后**:
```json
{
  "appid": "wx1234567890abcdef",
  ...
}
```

**验证**: 在微信开发者工具中重新导入项目

---

### 2. 配置云开发环境

**文件**: `miniprogram/app.js`

**当前内容**:
```javascript
wx.cloud.init({
  env: 'your-env-id',
  traceUser: true,
});
```

**修复步骤**:
1. 在微信开发者工具中点击「云开发」
2. 创建云环境（首次使用会提示）
3. 记录环境 ID（格式类似：cloud1-xxx）
4. 替换 `your-env-id`

**修复后**:
```javascript
wx.cloud.init({
  env: 'cloud1-abc123',
  traceUser: true,
});
```

**验证**: 
```javascript
// 在开发者工具控制台输入
wx.cloud.callFunction({
  name: 'login',
  success: console.log,
  fail: console.error
})
```

---

### 3. 创建隐私政策页面

**原因**: 微信小程序强制要求，否则无法通过审核

**步骤 1**: 创建页面文件
```bash
cd miniprogram/pages
mkdir privacy
cd privacy
touch privacy.wxml privacy.wxss privacy.js privacy.json
```

**步骤 2**: 编辑 `privacy.json`
```json
{
  "usingComponents": {},
  "navigationBarTitleText": "隐私政策"
}
```

**步骤 3**: 编辑 `privacy.wxml`
```xml
<!--pages/privacy/privacy.wxml-->
<scroll-view scroll-y class="container">
  <view class="content">
    <text class="title">CPAI 小程序隐私政策</text>
    
    <view class="section">
      <text class="section-title">1. 我们收集的信息</text>
      <text class="text">
        为了提供更好的服务，我们会收集以下信息：\n
        - 微信用户标识（OpenID）\n
        - 测试结果数据\n
        - 使用记录\n
        我们不会收集您的真实姓名、手机号等个人信息。
      </text>
    </view>
    
    <view class="section">
      <text class="section-title">2. 信息的使用</text>
      <text class="text">
        收集的信息仅用于：\n
        - 提供测试服务\n
        - 生成个性化报告\n
        - 改进产品质量\n
        我们不会将信息用于其他用途或分享给第三方。
      </text>
    </view>
    
    <view class="section">
      <text class="section-title">3. 数据存储</text>
      <text class="text">
        您的数据存储在：\n
        - 本地存储（微信沙盒）\n
        - 微信云开发数据库\n
        您可以随时清除本地数据。
      </text>
    </view>
    
    <view class="section">
      <text class="section-title">4. 数据安全</text>
      <text class="text">
        我们采取以下措施保护您的数据安全：\n
        - 数据传输加密\n
        - 访问权限控制\n
        - 定期安全审计
      </text>
    </view>
    
    <view class="section">
      <text class="section-title">5. 您的权利</text>
      <text class="text">
        您有权：\n
        - 查看您的数据\n
        - 删除您的数据\n
        - 撤回授权\n
        如需行使权利，请联系客服。
      </text>
    </view>
    
    <view class="section">
      <text class="section-title">6. 政策更新</text>
      <text class="text">
        我们可能会更新本政策，并在小程序内通知您。
      </text>
    </view>
    
    <view class="section">
      <text class="section-title">7. 联系方式</text>
      <text class="text">
        如有任何问题，请联系：\n
        邮箱：your-email@example.com
      </text>
    </view>
    
    <button class="agree-btn" bindtap="agree">
      我已阅读并同意
    </button>
  </view>
</scroll-view>
```

**步骤 4**: 编辑 `privacy.wxss`
```css
/* pages/privacy/privacy.wxss */
.container {
  height: 100vh;
  padding: 40rpx 30rpx;
  background: #f5f5f5;
}

.content {
  background: white;
  border-radius: 16rpx;
  padding: 40rpx 30rpx;
}

.title {
  font-size: 36rpx;
  font-weight: 600;
  color: #333;
  text-align: center;
  margin-bottom: 40rpx;
}

.section {
  margin-bottom: 30rpx;
}

.section-title {
  font-size: 30rpx;
  font-weight: 600;
  color: #667eea;
  margin-bottom: 16rpx;
  display: block;
}

.text {
  font-size: 28rpx;
  color: #666;
  line-height: 1.8;
  white-space: pre-wrap;
}

.agree-btn {
  margin-top: 40rpx;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 12rpx;
  font-size: 30rpx;
  font-weight: 500;
}
```

**步骤 5**: 编辑 `privacy.js`
```javascript
// pages/privacy/privacy.js
Page({
  data: {},

  agree: function () {
    wx.setStorageSync('privacyAgreed', true);
    wx.showToast({
      title: '感谢同意',
      icon: 'success'
    });
    
    // 返回首页
    setTimeout(() => {
      wx.navigateBack({ delta: 1 });
    }, 1000);
  }
});
```

**步骤 6**: 在 `app.json` 中添加页面
```json
{
  "pages": [
    "pages/index/index",
    "pages/personality/personality",
    "pages/career-prefer/career-prefer",
    "pages/ai-fit/ai-fit",
    "pages/ai-replace/ai-replace",
    "pages/ai-usage/ai-usage",
    "pages/result/result",
    "pages/privacy/privacy"
  ],
  ...
}
```

**步骤 7**: 在首页添加隐私政策链接
在 `pages/index/index.wxml` 底部添加：
```xml
<view class="privacy-link" bindtap="viewPrivacy">
  隐私政策
</view>
```

在 `pages/index/index.js` 添加：
```javascript
viewPrivacy: function () {
  wx.navigateTo({
    url: '/pages/privacy/privacy'
  });
}
```

---

## 🟠 P1 级问题 (强烈建议修复)

### 4. 添加存储错误处理

**需要修改的文件**:
- `miniprogram/pages/personality/personality.js`
- `miniprogram/pages/career-prefer/career-prefer.js`
- `miniprogram/pages/ai-fit/ai-fit.js`
- `miniprogram/pages/ai-replace/ai-replace.js`
- `miniprogram/pages/ai-usage/ai-usage.js`

**修改前**:
```javascript
wx.setStorageSync('testResults', results);
```

**修改后**:
```javascript
try {
  wx.setStorageSync('testResults', results);
} catch (e) {
  wx.showToast({
    title: '保存失败，请重试',
    icon: 'none',
    duration: 2000
  });
  console.error('存储失败:', e);
  
  // 尝试清理空间后重试
  try {
    wx.clearStorageSync();
    wx.setStorageSync('testResults', results);
  } catch (retryError) {
    console.error('重试失败:', retryError);
  }
}
```

---

### 5. 添加进度保存功能

**在 personality.js 中添加**:

```javascript
// 保存进度
saveProgress: function () {
  try {
    const progress = {
      testType: 'personality',
      currentQuestion: this.data.currentQuestion,
      scores: this.data.scores,
      timestamp: Date.now()
    };
    wx.setStorageSync('progress_personality', progress);
  } catch (e) {
    console.error('保存进度失败:', e);
  }
},

// 恢复进度
restoreProgress: function () {
  try {
    const progress = wx.getStorageSync('progress_personality');
    if (progress && progress.testType === 'personality') {
      // 检查是否在 24 小时内
      const hoursPassed = (Date.now() - progress.timestamp) / (1000 * 60 * 60);
      if (hoursPassed < 24) {
        this.setData({
          currentQuestion: progress.currentQuestion,
          scores: progress.scores,
          progress: ((progress.currentQuestion) / this.data.questions.length) * 100
        });
        wx.showToast({
          title: '已恢复进度',
          icon: 'success',
          duration: 1500
        });
        return true;
      }
    }
  } catch (e) {
    console.error('恢复进度失败:', e);
  }
  return false;
},

// 在 onLoad 中调用
onLoad: function () {
  this.setData({ progress: 0 });
  this.restoreProgress(); // 添加这行
},

// 在 submitAnswer 中添加
submitAnswer: function () {
  // ... 原有代码 ...
  
  // 保存进度
  if (currentQuestion < questions.length - 1) {
    this.saveProgress(); // 添加这行
    // ...
  }
},

// 在完成测试后清除进度
calculateResult: function () {
  // ... 原有代码 ...
  
  // 清除进度
  try {
    wx.removeStorageSync('progress_personality');
  } catch (e) {
    console.error('清除进度失败:', e);
  }
}
```

对其他测试页面重复此操作。

---

### 6. 添加页面加载提示

**在所有页面的 onLoad 中添加**:

```javascript
onLoad: function () {
  wx.showLoading({
    title: '加载中...',
    mask: true
  });
  
  // 页面初始化逻辑
  // ...
  
  // 加载完成后
  wx.hideLoading();
},

// 在页面切换时添加
startTest: function (e) {
  const type = e.currentTarget.dataset.type;
  
  wx.showLoading({
    title: '正在跳转...',
    mask: true
  });
  
  wx.navigateTo({
    url: pageMap[type],
    success: () => {
      wx.hideLoading();
    },
    fail: () => {
      wx.hideLoading();
      wx.showToast({
        title: '跳转失败',
        icon: 'none'
      });
    }
  });
}
```

---

### 7. 添加数据验证

**在 personality.js 中添加**:

```javascript
data: {
  startTime: 0,
  minTimePerQuestion: 1000, // 每题最少 1 秒
  // ...
},

onLoad: function () {
  this.setData({ 
    progress: 0,
    startTime: Date.now()
  });
},

submitAnswer: function () {
  const { startTime, minTimePerQuestion } = this.data;
  const timeSpent = Date.now() - startTime;
  
  // 检查答题时间
  if (timeSpent < minTimePerQuestion) {
    wx.showToast({
      title: '请认真答题',
      icon: 'none',
      duration: 1500
    });
    return;
  }
  
  // ... 原有代码 ...
  
  // 重置计时
  this.setData({ startTime: Date.now() });
}
```

---

## 🟡 P2 级问题 (建议优化)

### 8. 优化分享功能

**在 result.js 中修改**:

```javascript
onShareAppMessage: function () {
  const { results, completedCount } = this.data;
  
  let shareTitle = '我的职业偏好 & AI 适配度测试结果';
  
  // 个性化分享标题
  if (results.personality) {
    shareTitle = `我的性格类型是${results.personality.type}，快来测试你的 AI 适配度！`;
  } else if (results.aiFit) {
    shareTitle = `我的 AI 适配度是${results.aiFit.level}，你也来测测！`;
  }
  
  return {
    title: shareTitle,
    path: `/pages/index/index?from=share&completed=${completedCount}`,
    imageUrl: '/images/share-card.png' // 需要准备分享图片
  };
},

onShareTimeline: function () {
  return {
    title: '探索你的职业方向，了解 AI 时代的发展机会',
    query: 'from=timeline',
    imageUrl: '/images/share-card.png'
  };
}
```

---

### 9. 添加用户引导

**创建引导页面**:

1. 创建 `pages/guide/guide.wxml`
2. 添加 3-4 屏介绍
3. 使用 `wx.getStorageSync('hasSeenGuide')` 判断是否显示

---

## 🟢 P3 级问题 (可选优化)

### 10. 添加主题色配置

在 `app.wxss` 中定义 CSS 变量：
```css
page {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  --text-color: #333;
  --bg-color: #f5f5f5;
}
```

---

### 11. 添加性能优化

- 使用分包加载
- 图片压缩
- 代码压缩
- 按需注入

---

## ✅ 修复检查清单

### 上线前必做
- [ ] 配置 AppID
- [ ] 配置云环境 ID
- [ ] 创建隐私政策页面
- [ ] 添加所有页面的浮动窗口
- [ ] 添加存储错误处理
- [ ] 测试所有功能

### 建议优化
- [ ] 添加进度保存功能
- [ ] 添加加载提示
- [ ] 优化分享功能
- [ ] 添加数据验证
- [ ] 准备分享图片

### 长期改进
- [ ] 集成云数据库
- [ ] 添加用户系统
- [ ] 数据分析后台
- [ ] 更多测试题目
- [ ] 专业版报告

---

## 📞 测试验证

修复完成后，请进行以下测试：

### 功能测试
- [ ] 打开小程序，无报错
- [ ] 完成所有 5 个测试
- [ ] 查看结果汇总
- [ ] 使用浮动窗口
- [ ] 分享功能正常

### 兼容性测试
- [ ] iPhone 模拟器
- [ ] Android 模拟器
- [ ] 真机预览

### 性能测试
- [ ] 页面加载时间 < 2 秒
- [ ] 切换流畅无卡顿
- [ ] 内存占用正常

---

**最后更新**: 2026 年 3 月 24 日  
**文档版本**: v1.0.0
