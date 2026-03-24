// pages/ai-replace/ai-replace.js
const questions = [
  {
    question: "你的工作主要内容是？",
    options: ["重复性操作（如数据录入、流水线作业）", "常规性任务（如基础客服、简单分析）", "需要一定判断的工作（如中级管理、专业咨询）", "高度创造性和战略性工作"],
    scores: [4, 3, 2, 1],
    dimension: "repetitiveness"
  },
  {
    question: "你的工作需要多少创造性？",
    options: ["几乎不需要，按流程执行", "少量创造性", "中等创造性", "大量创造性（如设计、研发、艺术）"],
    scores: [4, 3, 2, 1],
    dimension: "creativity"
  },
  {
    question: "工作中与人情感交流的程度？",
    options: ["几乎不需要", "少量交流", "较多情感交流", "大量深度情感交流（如心理咨询、护理）"],
    scores: [4, 3, 2, 1],
    dimension: "emotional"
  },
  {
    question: "你的工作决策复杂度？",
    options: ["简单规则决策", "常规决策", "复杂多因素决策", "高度不确定性决策"],
    scores: [4, 3, 2, 1],
    dimension: "complexity"
  },
  {
    question: "你使用 AI 工具的熟练程度？",
    options: ["完全不会", "基础使用", "熟练应用", "能开发/优化 AI 工具"],
    scores: [4, 3, 2, 1],
    dimension: "aiSkill"
  },
  {
    question: "你的工作可被标准化程度？",
    options: ["完全可标准化", "大部分可标准化", "部分可标准化", "难以标准化"],
    scores: [4, 3, 2, 1],
    dimension: "standardization"
  },
  {
    question: "工作中需要跨领域整合知识吗？",
    options: ["不需要", "偶尔需要", "经常需要", "高度需要跨领域整合"],
    scores: [4, 3, 2, 1],
    dimension: "crossDomain"
  },
  {
    question: "你的工作物理环境要求？",
    options: ["完全线上可完成", "主要线上", "需要特定场所", "需要灵活物理操作"],
    scores: [1, 2, 3, 4],
    dimension: "physical"
  },
  {
    question: "工作成果的衡量标准？",
    options: ["数量和速度", "准确性和规范性", "质量和创新性", "综合价值和影响力"],
    scores: [4, 3, 2, 1],
    dimension: "measurement"
  },
  {
    question: "你学习新技能的速度和意愿？",
    options: ["抗拒学习", "被动学习", "主动学习", "持续快速学习"],
    scores: [4, 3, 2, 1],
    dimension: "learning"
  }
];

const riskLevels = [
  { min: 35, name: "🟢 低风险", class: "low", percent: "15-30%", desc: "你的工作很难被 AI 取代！具有高度创造性、情感交流或复杂决策能力，这些都是 AI 难以模仿的人类优势。继续保持学习和创新，你的职业前景非常光明。" },
  { min: 25, name: "🟡 中低风险", class: "medium-low", percent: "30-50%", desc: "你的工作被 AI 取代的风险较低。你具备一定的创造性或人际交流能力，但仍需警惕 AI 的进步。建议加强独特技能，提升不可替代性。" },
  { min: 15, name: "🟠 中等风险", class: "medium", percent: "50-70%", desc: "你的工作面临中等的 AI 取代风险。部分任务可能被自动化，但仍有发挥人类优势的空间。建议尽快学习 AI 工具，向更高价值的工作转型。" },
  { min: 0, name: "🔴 高风险", class: "high", percent: "70-90%", desc: "你的工作面临较高的 AI 取代风险。重复性、标准化任务最容易被自动化。需要立即行动：学习新技能、发展创造性能力、考虑职业转型到 AI 难以替代的领域。" }
];

const protectionStrategies = {
  low: [
    { icon: "🎨", text: "继续发展创造性思维，保持创新优势" },
    { icon: "🤝", text: "深化人际关系和领导力，发挥情感智能" },
    { icon: "🚀", text: "探索 AI 协作机会，成为 AI 增强型人才" }
  ],
  "medium-low": [
    { icon: "📚", text: "持续学习新技能，保持知识更新" },
    { icon: "💡", text: "培养创造性解决问题的能力" },
    { icon: "🤖", text: "主动学习 AI 工具，提升工作效率" }
  ],
  medium: [
    { icon: "⚡", text: "紧急学习 AI 工具，避免被替代" },
    { icon: "🎯", text: "发展专业化技能，建立竞争壁垒" },
    { icon: "🔄", text: "减少重复性工作，聚焦高价值任务" }
  ],
  high: [
    { icon: "🆘", text: "立即行动！开始学习 AI 和数字化技能" },
    { icon: "💪", text: "发展人际交往和情感交流能力" },
    { icon: "🎓", text: "考虑职业培训或转型到 AI 难替代领域" }
  ]
};

Page({
  data: {
    questions: questions,
    currentQuestion: 0,
    selected: null,
    totalScore: 0,
    showResult: false,
    riskLevel: null,
    riskClass: '',
    riskName: '',
    riskPercent: '',
    resultDesc: '',
    gaugeRotation: 0,
    riskFactors: [],
    protections: [],
    progress: 0,
    dimensionScores: {
      repetitiveness: 0,
      creativity: 0,
      emotional: 0,
      complexity: 0,
      aiSkill: 0,
      standardization: 0,
      crossDomain: 0,
      physical: 0,
      measurement: 0,
      learning: 0
    }
  },

  onLoad: function () {
    this.setData({ progress: 0 });
  },

  selectOption: function (e) {
    this.setData({ selected: e.currentTarget.dataset.index });
  },

  submitAnswer: function () {
    const { currentQuestion, selected, questions, totalScore, dimensionScores } = this.data;
    const question = questions[currentQuestion];
    const score = question.scores[selected];

    const newScore = totalScore + score;
    const newDimensionScores = { ...dimensionScores };
    newDimensionScores[question.dimension] = score;

    if (currentQuestion < questions.length - 1) {
      this.setData({
        currentQuestion: currentQuestion + 1,
        selected: null,
        totalScore: newScore,
        dimensionScores: newDimensionScores,
        progress: ((currentQuestion + 1) / questions.length) * 100
      });
    } else {
      this.calculateResult(newScore, newDimensionScores);
    }
  },

  calculateResult: function (finalScore, dimensionScores) {
    const maxScore = questions.length * 4;
    const minScore = questions.length * 1;
    const normalizedScore = ((finalScore - minScore) / (maxScore - minScore)) * 100;
    
    let riskLevel = riskLevels.find(l => normalizedScore >= l.min) || riskLevels[riskLevels.length - 1];
    
    // 计算仪表盘旋转角度 (0-180 度)
    const gaugeRotation = (normalizedScore / 100) * 180 - 90;
    
    // 风险因素分析
    const dimensionNames = {
      repetitiveness: '重复性',
      creativity: '创造性',
      emotional: '情感交流',
      complexity: '决策复杂度',
      aiSkill: 'AI 技能',
      standardization: '可标准化',
      crossDomain: '跨领域',
      physical: '物理操作',
      measurement: '成果衡量',
      learning: '学习能力'
    };
    
    const riskFactors = Object.entries(dimensionScores).map(([key, score]) => {
      let riskLevel = 'low';
      let riskText = '';
      if (score >= 4) {
        riskLevel = 'high';
        riskText = '高风险';
      } else if (score >= 3) {
        riskLevel = 'medium';
        riskText = '中风险';
      } else {
        riskLevel = 'low';
        riskText = '低风险';
      }
      return {
        name: dimensionNames[key],
        value: riskText,
        class: riskLevel
      };
    }).filter(item => item.class === 'high' || item.class === 'medium').slice(0, 5);
    
    this.setData({
      showResult: true,
      riskLevel: riskLevel,
      riskClass: riskLevel.class,
      riskName: riskLevel.name,
      riskPercent: riskLevel.percent,
      resultDesc: riskLevel.desc,
      gaugeRotation: gaugeRotation,
      riskFactors,
      protections: protectionStrategies[riskLevel.class],
      progress: 100
    });

    const results = wx.getStorageSync('testResults') || {};
    results.aiReplace = { 
      score: finalScore, 
      normalized: normalizedScore,
      level: riskLevel.name, 
      percent: riskLevel.percent,
      factors: riskFactors
    };
    wx.setStorageSync('testResults', results);
  },

  goHome: function () {
    wx.navigateBack({ delta: 1 });
  },

  nextTest: function () {
    wx.navigateTo({ url: '/pages/ai-usage/ai-usage' });
  }

  // 浮动窗口事件处理
  onFloatingWindowToggle: function (e) {
    this.setData({
      isFloatingWindowOpen: e.detail.isOpen
    });
  }

}
});
