// pages/ai-usage/ai-usage.js
const frequencyOptions = ["每天多次", "每天一次", "每周几次", "每月几次", "很少使用", "从未使用"];
const usageOptions = ["写作/文案", "编程/代码", "设计/绘图", "学习/研究", "数据分析", "翻译", "客服/问答", "视频/音频处理", "其他"];
const toolOptions = [
  { name: "ChatGPT", icon: "🟢" },
  { name: "Claude", icon: "🟣" },
  { name: "文心一言", icon: "🔵" },
  { name: "通义千问", icon: "🟠" },
  { name: "Kimi", icon: "⚪" },
  { name: "其他", icon: "⚫" }
];
const ratingLabels = ["非常小", "较小", "一般", "较大", "非常大"];

Page({
  data: {
    frequencyOptions: frequencyOptions,
    usageOptions: usageOptions,
    toolOptions: toolOptions,
    ratingLabels: ratingLabels,
    frequency: null,
    usageTags: [],
    tool: null,
    rating: null,
    feedback: '',
    canSubmit: false,
    submitted: false,
    selectedUsages: []
  },

  onLoad: function () {
    // 检查是否已提交过
    const aiUsage = wx.getStorageSync('testResults')?.aiUsage;
    if (aiUsage && aiUsage.submitted) {
      this.setData({
        submitted: true,
        frequency: aiUsage.frequency,
        selectedUsages: aiUsage.usages,
        tool: aiUsage.tool,
        rating: aiUsage.rating
      });
    }
  },

  selectFrequency: function (e) {
    this.setData({ frequency: e.currentTarget.dataset.index });
    this.checkCanSubmit();
  },

  toggleUsage: function (e) {
    const index = e.currentTarget.dataset.index;
    let usageTags = [...this.data.usageTags];
    let selectedUsages = [...this.data.selectedUsages];
    
    const pos = usageTags.indexOf(index);
    if (pos > -1) {
      usageTags.splice(pos, 1);
      selectedUsages.splice(pos, 1);
    } else {
      usageTags.push(index);
      selectedUsages.push(usageOptions[index]);
    }
    
    this.setData({ usageTags, selectedUsages });
    this.checkCanSubmit();
  },

  selectTool: function (e) {
    this.setData({ tool: e.currentTarget.dataset.index });
    this.checkCanSubmit();
  },

  selectRating: function (e) {
    this.setData({ rating: e.currentTarget.dataset.index });
    this.checkCanSubmit();
  },

  onInput: function (e) {
    this.setData({ feedback: e.detail.value });
  },

  checkCanSubmit: function () {
    const { frequency, usageTags, tool, rating } = this.data;
    const canSubmit = frequency !== null && 
                      usageTags.length > 0 && 
                      tool !== null && 
                      rating !== null;
    this.setData({ canSubmit });
  },

  submitForm: function () {
    const { frequency, selectedUsages, tool, rating, feedback } = this.data;
    
    // 保存结果
    const results = wx.getStorageSync('testResults') || {};
    results.aiUsage = {
      frequency,
      frequencyText: frequencyOptions[frequency],
      usages: selectedUsages,
      tool: toolOptions[tool].name,
      rating: rating + 1,
      ratingText: ratingLabels[rating],
      feedback,
      submitted: true,
      timestamp: new Date().getTime()
    };
    wx.setStorageSync('testResults', results);

    this.setData({ submitted: true });
    
    // 显示成功提示
    wx.showToast({
      title: '提交成功',
      icon: 'success'
    });
  },

  goHome: function () {
    wx.navigateBack({ delta: 1 });
  },

  viewResult: function () {
    wx.navigateTo({ url: '/pages/result/result' });
  },

  // 浮动窗口事件处理
  onFloatingWindowToggle: function (e) {
    this.setData({
      isFloatingWindowOpen: e.detail.isOpen
    });
  }
});
