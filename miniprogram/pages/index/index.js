// pages/index/index.js
const app = getApp();

Page({
  data: {
    userRole: '', // 'parent' or 'student'
    tests: [
      { id: 'personality', name: '性格测试', icon: '🎭', completed: false, desc: '了解你的性格类型，发现适合的职业方向' },
      { id: 'careerPrefer', name: '职业偏好', icon: '💼', completed: false, desc: '霍兰德职业兴趣测试，找到你真正喜欢的工作' },
      { id: 'aiFit', name: 'AI 适配度', icon: '🤖', completed: false, desc: '在 AI 浪潮下，你适合做什么？' },
      { id: 'aiReplace', name: 'AI 取代风险', icon: '⚠️', completed: false, parentTitle: 'AI 取代风险评估', studentTitle: 'AI时代选专业指南', parentDesc: '你的工作会被 AI 取代吗？', studentDesc: '什么专业不会被AI淘汰？' },
      { id: 'aiUsage', name: 'AI 应用调查', icon: '📊', completed: false, desc: '你目前用 AI 做什么？帮助我们更好了解用户' }
    ],
    footerText: '完成测试，获取完整的职业发展规划建议'
  },

  onLoad: function () {
    const userRole = wx.getStorageSync('userRole') || '';
    this.setData({ userRole });
    if (userRole) {
      app.globalData.userRole = userRole;
    }
    this.loadTestStatus();
  },

  onShow: function () {
    const userRole = wx.getStorageSync('userRole') || '';
    this.setData({ userRole });
    this.loadTestStatus();
  },

  loadTestStatus: function () {
    const results = wx.getStorageSync('testResults') || {};
    const tests = this.data.tests.map(test => ({
      ...test,
      completed: !!results[test.id]
    }));
    this.setData({ tests });

    // 根据角色更新底部文案
    const footerText = this.data.userRole === 'student'
      ? '完成测试，获取 AI 智能专业推荐方案 🎯'
      : '完成测试，获取 AI 智能职业推荐方案 🚀';
    this.setData({ footerText });
  },

  selectRole: function (e) {
    const role = e.currentTarget.dataset.role;
    wx.setStorageSync('userRole', role);
    app.globalData.userRole = role;
    this.setData({
      userRole: role,
      footerText: role === 'student'
        ? '完成测试，获取 AI 智能专业推荐方案 🎯'
        : '完成测试，获取 AI 智能职业推荐方案 🚀'
    });
  },

  startTest: function (e) {
    const type = e.currentTarget.dataset.type;
    const pageMap = {
      personality: '/pages/personality/personality',
      careerPrefer: '/pages/career-prefer/career-prefer',
      aiFit: '/pages/ai-fit/ai-fit',
      aiReplace: '/pages/ai-replace/ai-replace',
      aiUsage: '/pages/ai-usage/ai-usage'
    };

    wx.navigateTo({
      url: pageMap[type]
    });
  },

  onShareAppMessage: function () {
    return {
      title: 'AI时代来了！快给孩子测测适合什么专业 🔥',
      path: '/pages/index/index'
    };
  }
});
