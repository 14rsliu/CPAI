// pages/result/result.js
Page({
  data: {
    results: {},
    completedCount: 0,
    progressPercent: 0,
    suggestions: [],
    recommendedCareers: [],
    showModal: false,
    modalData: {}
  },

  onLoad: function () {
    this.loadResults();
  },

  onShow: function () {
    this.loadResults();
  },

  loadResults: function () {
    const results = wx.getStorageSync('testResults') || {};
    const completedCount = Object.keys(results).length;
    const progressPercent = (completedCount / 5) * 100;

    // 生成综合建议
    const suggestions = this.generateSuggestions(results);
    
    // 收集推荐职业
    const recommendedCareers = this.collectCareers(results);

    this.setData({
      results,
      completedCount,
      progressPercent: Math.round(progressPercent),
      suggestions,
      recommendedCareers: [...new Set(recommendedCareers)].slice(0, 10)
    });
  },

  generateSuggestions: function (results) {
    const suggestions = [];
    
    // 基于性格测试的建议
    if (results.personality) {
      const type = results.personality.type;
      if (type.includes('E')) {
        suggestions.push({
          icon: '🤝',
          title: '发挥外向优势',
          desc: '你善于与人交往，适合团队协作、管理或销售类工作'
        });
      } else if (type.includes('I')) {
        suggestions.push({
          icon: '🧘',
          title: '深耕专业领域',
          desc: '你善于独立思考，适合研究、技术或创作类工作'
        });
      }
      if (type.includes('N')) {
        suggestions.push({
          icon: '💡',
          title: '保持创新思维',
          desc: '你擅长抽象思考，适合战略规划和创新工作'
        });
      }
    }

    // 基于 AI 适配度的建议
    if (results.aiFit) {
      const score = results.aiFit.score;
      if (score >= 70) {
        suggestions.push({
          icon: '🚀',
          title: '引领 AI 潮流',
          desc: '你非常适合 AI 时代，建议继续深化 AI 技能，成为行业领军者'
        });
      } else if (score >= 50) {
        suggestions.push({
          icon: '📈',
          title: '加速学习 AI',
          desc: '你有较好的适应能力，建议系统学习 AI 工具提升竞争力'
        });
      } else {
        suggestions.push({
          icon: '⚡',
          title: '紧急提升',
          desc: '建议立即开始学习 AI 工具，避免被时代淘汰'
        });
      }
    }

    // 基于 AI 取代风险的建议
    if (results.aiReplace) {
      const level = results.aiReplace.level;
      if (level.includes('低')) {
        suggestions.push({
          icon: '🛡️',
          title: '保持竞争优势',
          desc: '你的工作难以被替代，继续保持学习和创新'
        });
      } else if (level.includes('中')) {
        suggestions.push({
          icon: '🔄',
          title: '提升不可替代性',
          desc: '建议发展创造性技能，减少重复性工作'
        });
      } else {
        suggestions.push({
          icon: '🎯',
          title: '考虑职业转型',
          desc: '建议向 AI 难以替代的领域发展，如创造性、情感交流类工作'
        });
      }
    }

    return suggestions.slice(0, 5);
  },

  collectCareers: function (results) {
    const careers = [];
    
    if (results.personality && results.personality.careers) {
      careers.push(...results.personality.careers);
    }
    
    if (results.careerPrefer && results.careerPrefer.careers) {
      careers.push(...results.careerPrefer.careers);
    }
    
    if (results.aiFit && results.aiFit.careers) {
      careers.push(...results.aiFit.careers);
    }

    return careers;
  },

  viewDetail: function (e) {
    const type = e.currentTarget.dataset.type;
    const results = this.data.results;
    const data = results[type];
    
    if (!data) {
      // 跳转到对应测试
      const pageMap = {
        personality: '/pages/personality/personality',
        careerPrefer: '/pages/career-prefer/career-prefer',
        aiFit: '/pages/ai-fit/ai-fit',
        aiReplace: '/pages/ai-replace/ai-replace',
        aiUsage: '/pages/ai-usage/ai-usage'
      };
      wx.navigateTo({ url: pageMap[type] });
      return;
    }

    // 显示详情
    let modalData = { title: '', detail: '', desc: '', careers: [] };
    
    switch (type) {
      case 'personality':
        modalData = {
          title: '🎭 性格测试',
          detail: `${data.type} - ${data.name}`,
          desc: data.desc,
          careers: data.careers
        };
        break;
      case 'careerPrefer':
        modalData = {
          title: '💼 职业偏好',
          detail: `霍兰德代码：${data.code}`,
          desc: '基于你的兴趣偏好，推荐以上职业方向',
          careers: data.careers
        };
        break;
      case 'aiFit':
        modalData = {
          title: '🤖 AI 适配度',
          detail: `${data.level} (${data.score}分)`,
          desc: '评估你在 AI 时代的适应能力和发展方向',
          careers: data.careers
        };
        break;
      case 'aiReplace':
        modalData = {
          title: '⚠️ AI 取代风险',
          detail: `${data.level} - ${data.percent}`,
          desc: '评估你的工作被 AI 取代的风险程度',
          careers: []
        };
        break;
      case 'aiUsage':
        modalData = {
          title: '📊 AI 应用调查',
          detail: `频率：${data.frequencyText}`,
          desc: `常用工具：${data.tool}\n帮助程度：${data.ratingText}`,
          careers: []
        };
        break;
    }

    this.setData({ showModal: true, modalData });
  },

  closeModal: function () {
    this.setData({ showModal: false });
  },

  reTest: function () {
    wx.showActionSheet({
      itemList: ['性格测试', '职业偏好', 'AI 适配度', 'AI 取代风险', 'AI 应用调查'],
      success: (res) => {
        const pages = [
          '/pages/personality/personality',
          '/pages/career-prefer/career-prefer',
          '/pages/ai-fit/ai-fit',
          '/pages/ai-replace/ai-replace',
          '/pages/ai-usage/ai-usage'
        ];
        wx.navigateTo({ url: pages[res.tapIndex] });
      }
    });
  },

  shareResult: function () {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });
    
    wx.showToast({
      title: '点击右上角分享',
      icon: 'none'
    });
  },

  onShareAppMessage: function () {
    return {
      title: '我的职业偏好 & AI 适配度测试结果',
      path: '/pages/index/index'
    };
  },

  onShareTimeline: function () {
    return {
      title: '探索你的职业方向，了解 AI 时代的发展机会',
      query: 'from=result'
    };
  }

  // 浮动窗口事件处理
  onFloatingWindowToggle: function (e) {
    this.setData({
      isFloatingWindowOpen: e.detail.isOpen
    });
  }

}
});
