// pages/ai-fit/ai-fit.js
const questions = [
  {
    question: "你学习新工具和技术的速度如何？",
    options: ["非常快，主动学习", "较快，能跟上", "一般，需要时间", "较慢，有难度"],
    scores: [4, 3, 2, 1],
    dimension: "learning"
  },
  {
    question: "你目前使用 AI 工具的频率是？",
    options: ["每天都在用", "经常使用", "偶尔使用", "很少或不用"],
    scores: [4, 3, 2, 1],
    dimension: "aiUsage"
  },
  {
    question: "你的工作/学习中创造性内容占比？",
    options: ["大部分需要创造", "约一半", "少部分", "几乎不需要"],
    scores: [4, 3, 2, 1],
    dimension: "creativity"
  },
  {
    question: "你如何处理复杂问题？",
    options: ["拆解分析，系统解决", "凭经验处理", "寻求帮助", "回避或拖延"],
    scores: [4, 3, 2, 1],
    dimension: "problemSolving"
  },
  {
    question: "你与他人协作的频率？",
    options: ["高度协作，团队工作", "经常协作", "偶尔协作", " mostly 独立工作"],
    scores: [4, 3, 2, 1],
    dimension: "collaboration"
  },
  {
    question: "你对变化的适应能力？",
    options: ["拥抱变化，主动适应", "能接受变化", "需要时间调整", "抗拒变化"],
    scores: [4, 3, 2, 1],
    dimension: "adaptability"
  },
  {
    question: "你的工作涉及情感交流的程度？",
    options: ["大量情感交流", "较多交流", "一般", "几乎不需要"],
    scores: [4, 3, 2, 1],
    dimension: "emotional"
  },
  {
    question: "你批判性思维能力如何？",
    options: ["很强，能独立思考", "较强", "一般", "较弱"],
    scores: [4, 3, 2, 1],
    dimension: "criticalThinking"
  },
  {
    question: "你对 AI 技术的态度？",
    options: ["积极学习应用", "感兴趣但还没行动", "观望中", "担心或排斥"],
    scores: [4, 3, 2, 1],
    dimension: "aiAttitude"
  },
  {
    question: "你的工作重复性程度？",
    options: ["几乎不重复", "少部分重复", "约一半重复", "大部分重复"],
    scores: [4, 3, 2, 1],
    dimension: "repetitiveness"
  },
  {
    question: "你跨领域学习的能力？",
    options: ["很强，多领域涉猎", "较强", "一般", "专注单一领域"],
    scores: [4, 3, 2, 1],
    dimension: "crossDomain"
  },
  {
    question: "你利用数据做决策的频率？",
    options: ["经常基于数据", "有时", "偶尔", "很少"],
    scores: [4, 3, 2, 1],
    dimension: "dataLiteracy"
  },
  {
    question: "你自动化工作流程的意识？",
    options: ["主动寻找自动化方案", "有意识但行动少", "知道但没做", "没想过"],
    scores: [4, 3, 2, 1],
    dimension: "automation"
  },
  {
    question: "你的沟通表达能力？",
    options: ["非常强", "较强", "一般", "需要提升"],
    scores: [4, 3, 2, 1],
    dimension: "communication"
  },
  {
    question: "你对未来职业发展的规划？",
    options: ["清晰且持续调整", "有规划但不清晰", "模糊的想法", "没规划"],
    scores: [4, 3, 2, 1],
    dimension: "planning"
  }
];

const levels = [
  { min: 55, name: "🌟 AI 领航者", class: "excellent", desc: "你非常适合 AI 时代！具备强大的学习能力和创新思维，能够充分利用 AI 工具提升效率。建议继续深化专业技能，同时拓展跨领域知识，成为 AI 时代的领军人才。" },
  { min: 45, name: "✅ AI 适应者", class: "good", desc: "你在 AI 时代有较好的适应能力。有一定的学习基础和开放心态，建议加强 AI 工具的实际应用，提升创造性和跨领域能力，更好地把握 AI 带来的机遇。" },
  { min: 35, name: "⚠️ AI 跟随者", class: "medium", desc: "你需要更多主动适应 AI 时代。建议开始学习 AI 工具，培养创造性思维和数据分析能力，减少重复性工作，提升自身不可替代性。" },
  { min: 0, name: "🔴 AI 风险者", class: "low", desc: "你面临较高的 AI 替代风险。需要尽快行动：学习 AI 工具、培养创造性技能、加强人际沟通能力。重复性工作最容易被替代，建议尽早规划职业转型。" }
];

const recommendations = {
  excellent: ["AI 产品经理", "数据科学家", "AI 训练师", "技术顾问", "创新研究员", "战略规划师"],
  good: ["数字化运营", "用户体验设计师", "内容创作者", "项目经理", "业务分析师", "培训讲师"],
  medium: ["客户服务专家", "市场营销", "人力资源", "销售顾问", "行政管理者", "技术支持"],
  low: ["护理健康", "心理咨询", "手工艺人", "教育培训", "艺术创作", "社会服务"]
};

const suggestionMap = {
  excellent: [
    { icon: "🚀", text: "继续保持学习热情，深耕 AI 前沿技术" },
    { icon: "🎯", text: "培养跨领域能力，成为复合型人才" },
    { icon: "💡", text: "关注 AI 伦理和社会影响，做负责任的创新者" }
  ],
  good: [
    { icon: "📚", text: "系统学习 AI 工具，提升应用能力" },
    { icon: "🔄", text: "减少重复性工作，聚焦创造性任务" },
    { icon: "🤝", text: "加强人际协作，发挥人类独特优势" }
  ],
  medium: [
    { icon: "⚡", text: "立即开始学习至少一种 AI 工具" },
    { icon: "🎨", text: "培养创造性思维，发展独特技能" },
    { icon: "📊", text: "提升数据分析能力，用数据驱动决策" }
  ],
  low: [
    { icon: "🆘", text: "紧急行动！学习基础 AI 工具和应用" },
    { icon: "💪", text: "发展人际沟通和情感交流能力" },
    { icon: "🎯", text: "考虑职业转型，选择 AI 难替代的领域" }
  ]
};

Page({
  data: {
    questions: questions,
    currentQuestion: 0,
    selected: null,
    totalScore: 0,
    showResult: false,
    fitScore: 0,
    levelName: '',
    levelClass: '',
    resultDesc: '',
    suggestions: [],
    recommendedCareers: [],
    progress: 0
  },

  onLoad: function () {
    this.setData({ progress: 0 });
  },

  selectOption: function (e) {
    this.setData({ selected: e.currentTarget.dataset.index });
  },

  submitAnswer: function () {
    const { currentQuestion, selected, questions, totalScore } = this.data;
    const question = questions[currentQuestion];
    const score = question.scores[selected];

    const newScore = totalScore + score;

    if (currentQuestion < questions.length - 1) {
      this.setData({
        currentQuestion: currentQuestion + 1,
        selected: null,
        totalScore: newScore,
        progress: ((currentQuestion + 1) / questions.length) * 100
      });
    } else {
      this.calculateResult(newScore);
    }
  },

  calculateResult: function (finalScore) {
    const maxScore = questions.length * 4;
    const fitScore = Math.round((finalScore / maxScore) * 100);
    
    let level = levels.find(l => fitScore >= l.min) || levels[levels.length - 1];
    let recKey = level.class;
    
    this.setData({
      showResult: true,
      fitScore: fitScore,
      levelName: level.name,
      levelClass: level.class,
      resultDesc: level.desc,
      suggestions: suggestionMap[recKey],
      recommendedCareers: recommendations[recKey],
      progress: 100
    });

    const results = wx.getStorageSync('testResults') || {};
    results.aiFit = { score: fitScore, level: level.name, careers: recommendations[recKey] };
    wx.setStorageSync('testResults', results);
  },

  goHome: function () {
    wx.navigateBack({ delta: 1 });
  },

  nextTest: function () {
    wx.navigateTo({ url: '/pages/ai-replace/ai-replace' });
  }

  // 浮动窗口事件处理
  onFloatingWindowToggle: function (e) {
    this.setData({
      isFloatingWindowOpen: e.detail.isOpen
    });
  }

}
});
