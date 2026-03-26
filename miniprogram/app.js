// app.js
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        env: 'your-env-id',
        traceUser: true,
      });
    }

    this.globalData = {};
  },

  globalData: {
    userInfo: null,
    userRole: '', // 'parent' or 'student'
    testResults: {
      personality: null,
      careerPrefer: null,
      aiFit: null,
      aiReplace: null,
      aiUsage: null
    }
  },

  onShareAppMessage: function () {
    return {
      title: 'AI时代来了！快给孩子测测适合什么专业 🔥',
      path: '/pages/index/index'
    };
  }
});
