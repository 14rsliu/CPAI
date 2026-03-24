// components/floating-window/floating-window.js
Component({
  properties: {
    // 是否打开侧边栏
    isOpen: {
      type: Boolean,
      value: false
    }
  },

  data: {
    tests: [
      { id: 'personality', name: '性格测试', icon: '🎭', completed: false },
      { id: 'careerPrefer', name: '职业偏好', icon: '💼', completed: false },
      { id: 'aiFit', name: 'AI 适配度', icon: '🤖', completed: false },
      { id: 'aiReplace', name: 'AI 取代风险', icon: '⚠️', completed: false },
      { id: 'aiUsage', name: 'AI 应用调查', icon: '📊', completed: false }
    ],
    completedCount: 0,
    progressPercent: 0
  },

  methods: {
    // 切换窗口开关
    toggleWindow: function () {
      const newIsOpen = !this.data.isOpen;
      this.setData({ isOpen: newIsOpen });
      this.triggerEvent('toggle', { isOpen: newIsOpen });
      
      // 如果打开，刷新数据
      if (newIsOpen) {
        this.refreshData();
      }
    },

    // 刷新测试状态数据
    refreshData: function () {
      const results = wx.getStorageSync('testResults') || {};
      const tests = this.data.tests.map(test => ({
        ...test,
        completed: !!results[test.id]
      }));
      
      const completedCount = tests.filter(t => t.completed).length;
      const progressPercent = (completedCount / 5) * 100;

      this.setData({
        tests,
        completedCount,
        progressPercent: Math.round(progressPercent)
      });
    },

    // 导航到测试页面
    navigateToTest: function (e) {
      const type = e.currentTarget.dataset.type;
      const pageMap = {
        personality: '/pages/personality/personality',
        careerPrefer: '/pages/career-prefer/career-prefer',
        aiFit: '/pages/ai-fit/ai-fit',
        aiReplace: '/pages/ai-replace/ai-replace',
        aiUsage: '/pages/ai-usage/ai-usage'
      };

      // 先关闭侧边栏
      this.toggleWindow();
      
      // 延迟跳转，等待动画完成
      setTimeout(() => {
        wx.navigateTo({
          url: pageMap[type]
        });
      }, 300);
    },

    // 查看完整报告
    viewResult: function () {
      this.toggleWindow();
      setTimeout(() => {
        wx.navigateTo({
          url: '/pages/result/result'
        });
      }, 300);
    },

    // 返回主页
    backHome: function () {
      this.toggleWindow();
      setTimeout(() => {
        wx.navigateBack({
          delta: 999 // 返回到首页
        });
      }, 300);
    }
  },

  lifetimes: {
    attached: function () {
      this.refreshData();
    }
  },

  pageLifetimes: {
    show: function () {
      // 页面显示时刷新数据
      if (this.data.isOpen) {
        this.refreshData();
      }
    }
  }
});
