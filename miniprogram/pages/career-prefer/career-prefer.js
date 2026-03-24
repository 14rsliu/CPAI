// pages/career-prefer/career-prefer.js
const matchUtil = require('../../utils/match.js');

const questions = [
  { question: "你喜欢动手制作和修理东西吗？", type: "R", options: ["非常喜欢", "喜欢", "一般", "不喜欢", "非常不喜欢"], scores: [3, 2, 1, 0, -1] },
  { question: "你喜欢研究科学问题和做实验吗？", type: "I", options: ["非常喜欢", "喜欢", "一般", "不喜欢", "非常不喜欢"], scores: [3, 2, 1, 0, -1] },
  { question: "你喜欢艺术创作和设计吗？", type: "A", options: ["非常喜欢", "喜欢", "一般", "不喜欢", "非常不喜欢"], scores: [3, 2, 1, 0, -1] },
  { question: "你喜欢帮助他人和与人交流吗？", type: "S", options: ["非常喜欢", "喜欢", "一般", "不喜欢", "非常不喜欢"], scores: [3, 2, 1, 0, -1] },
  { question: "你喜欢领导和影响他人吗？", type: "E", options: ["非常喜欢", "喜欢", "一般", "不喜欢", "非常不喜欢"], scores: [3, 2, 1, 0, -1] },
  { question: "你喜欢整理数据和做记录吗？", type: "C", options: ["非常喜欢", "喜欢", "一般", "不喜欢", "非常不喜欢"], scores: [3, 2, 1, 0, -1] },
  { question: "你擅长使用工具和机械设备吗？", type: "R", options: ["非常擅长", "擅长", "一般", "不擅长", "非常不擅长"], scores: [3, 2, 1, 0, -1] },
  { question: "你喜欢数学和逻辑推理吗？", type: "I", options: ["非常喜欢", "喜欢", "一般", "不喜欢", "非常不喜欢"], scores: [3, 2, 1, 0, -1] },
  { question: "你有艺术天赋或创意吗？", type: "A", options: ["非常有", "有", "一般", "没有", "完全没有"], scores: [3, 2, 1, 0, -1] },
  { question: "你愿意倾听他人的问题并给予建议吗？", type: "S", options: ["非常愿意", "愿意", "一般", "不愿意", "非常不愿意"], scores: [3, 2, 1, 0, -1] },
  { question: "你喜欢说服他人接受你的观点吗？", type: "E", options: ["非常喜欢", "喜欢", "一般", "不喜欢", "非常不喜欢"], scores: [3, 2, 1, 0, -1] },
  { question: "你做事有条理、注重细节吗？", type: "C", options: ["非常符合", "符合", "一般", "不符合", "非常不符合"], scores: [3, 2, 1, 0, -1] },
  { question: "你喜欢户外活动或体力工作吗？", type: "R", options: ["非常喜欢", "喜欢", "一般", "不喜欢", "非常不喜欢"], scores: [3, 2, 1, 0, -1] },
  { question: "你喜欢阅读科普书籍和纪录片吗？", type: "I", options: ["非常喜欢", "喜欢", "一般", "不喜欢", "非常不喜欢"], scores: [3, 2, 1, 0, -1] },
  { question: "你喜欢写作、音乐或表演吗？", type: "A", options: ["非常喜欢", "喜欢", "一般", "不喜欢", "非常不喜欢"], scores: [3, 2, 1, 0, -1] },
  { question: "你关心社会问题和公益事业吗？", type: "S", options: ["非常关心", "关心", "一般", "不关心", "完全不关心"], scores: [3, 2, 1, 0, -1] },
  { question: "你喜欢竞争和挑战吗？", type: "E", options: ["非常喜欢", "喜欢", "一般", "不喜欢", "非常不喜欢"], scores: [3, 2, 1, 0, -1] },
  { question: "你喜欢按规则和流程办事吗？", type: "C", options: ["非常喜欢", "喜欢", "一般", "不喜欢", "非常不喜欢"], scores: [3, 2, 1, 0, -1] },
  { question: "你 prefer 实际操作而非理论学习吗？", type: "R", options: ["非常符合", "符合", "一般", "不符合", "非常不符合"], scores: [3, 2, 1, 0, -1] },
  { question: "你喜欢独立思考和解决问题吗？", type: "I", options: ["非常喜欢", "喜欢", "一般", "不喜欢", "非常不喜欢"], scores: [3, 2, 1, 0, -1] },
  { question: "你追求独特和个性化吗？", type: "A", options: ["非常追求", "追求", "一般", "不追求", "完全不追求"], scores: [3, 2, 1, 0, -1] },
  { question: "你喜欢团队合作和帮助他人成长吗？", type: "S", options: ["非常喜欢", "喜欢", "一般", "不喜欢", "非常不喜欢"], scores: [3, 2, 1, 0, -1] },
  { question: "你有商业头脑和销售能力吗？", type: "E", options: ["非常有", "有", "一般", "没有", "完全没有"], scores: [3, 2, 1, 0, -1] },
  { question: "你擅长整理和归档信息吗？", type: "C", options: ["非常擅长", "擅长", "一般", "不擅长", "非常不擅长"], scores: [3, 2, 1, 0, -1] },
  { question: "你喜欢建造或组装东西吗？", type: "R", options: ["非常喜欢", "喜欢", "一般", "不喜欢", "非常不喜欢"], scores: [3, 2, 1, 0, -1] },
  { question: "你对新技术和发明感兴趣吗？", type: "I", options: ["非常感兴趣", "感兴趣", "一般", "不感兴趣", "完全不感兴趣"], scores: [3, 2, 1, 0, -1] },
  { question: "你喜欢自由表达和创作吗？", type: "A", options: ["非常喜欢", "喜欢", "一般", "不喜欢", "非常不喜欢"], scores: [3, 2, 1, 0, -1] },
  { question: "你善于理解他人的情感吗？", type: "S", options: ["非常善于", "善于", "一般", "不善于", "非常不善于"], scores: [3, 2, 1, 0, -1] },
  { question: "你喜欢组织和策划活动吗？", type: "E", options: ["非常喜欢", "喜欢", "一般", "不喜欢", "非常不喜欢"], scores: [3, 2, 1, 0, -1] },
  { question: "你注重准确性和精确度吗？", type: "C", options: ["非常注重", "注重", "一般", "不注重", "完全不注重"], scores: [3, 2, 1, 0, -1] }
];

const hollandTypes = {
  R: { name: "现实型", desc: "喜欢实际操作，使用工具、机器，偏好户外活动", color: "#FF6B6B" },
  I: { name: "研究型", desc: "喜欢观察、学习、研究、分析和解决问题", color: "#4ECDC4" },
  A: { name: "艺术型", desc: "喜欢自由、富有创意的工作，追求美感表达", color: "#FFE66D" },
  S: { name: "社会型", desc: "喜欢与人打交道，帮助他人，关心社会发展", color: "#95E1D3" },
  E: { name: "企业型", desc: "喜欢影响、管理和领导他人，追求成就和地位", color: "#F38181" },
  C: { name: "常规型", desc: "喜欢有序、系统的工作，注重细节和准确性", color: "#AA96DA" }
};

const careerMap = {
  R: ["机械工程师", "建筑师", "厨师", "飞行员", "农民", "电工", "木工", "运动员"],
  I: ["科学家", "程序员", "医生", "研究员", "数据分析师", "生物学家", "物理学家"],
  A: ["设计师", "作家", "音乐家", "演员", "摄影师", "艺术家", "导演", "编辑"],
  S: ["教师", "心理咨询师", "护士", "社工", "人力资源", "培训师", "导游"],
  E: ["企业家", "销售经理", "律师", "政治家", "市场总监", "项目经理", "投资人"],
  C: ["会计师", "审计师", "行政人员", "图书管理员", "银行职员", "秘书", "档案管理员"]
};

Page({
  data: {
    questions: questions,
    currentQuestion: 0,
    selected: null,
    scores: { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 },
    showResult: false,
    resultCode: '',
    resultDesc: '',
    careers: [],
    hollandScores: [],
    progress: 0,
    isFloatingWindowOpen: false,
    matchResult: null
  },

  onLoad: function () {
    this.setData({ progress: 0 });
  },

  selectOption: function (e) {
    this.setData({ selected: e.currentTarget.dataset.index });
  },

  submitAnswer: function () {
    const { currentQuestion, selected, questions, scores } = this.data;
    const question = questions[currentQuestion];
    const score = question.scores[selected];

    const newScores = { ...scores };
    newScores[question.type] += score;

    this.setData({ scores: newScores });

    if (currentQuestion < questions.length - 1) {
      this.setData({
        currentQuestion: currentQuestion + 1,
        selected: null,
        progress: ((currentQuestion + 1) / questions.length) * 100
      });
    } else {
      this.calculateResult();
    }
  },

  calculateResult: function () {
    const { scores } = this.data;
    const sortedTypes = Object.entries(scores)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);

    const top3Codes = sortedTypes.map(item => item[0]).join('');
    const maxScore = Math.max(...Object.values(scores));
    
    const hollandScores = Object.entries(scores).map(([code, score]) => ({
      code,
      name: hollandTypes[code].name,
      score,
      percent: maxScore > 0 ? (score / maxScore) * 100 : 0,
      color: hollandTypes[code].color
    }));

    const careers = [];
    top3Codes.split('').forEach(code => {
      careers.push(...careerMap[code]);
    });

    const resultDesc = `你的霍兰德代码是 ${top3Codes}，代表你最适合 ${sortedTypes.map(item => hollandTypes[item[0]].name).join('、')} 类型的工作。`;

    this.setData({
      showResult: true,
      resultCode: top3Codes,
      resultDesc: resultDesc,
      careers: [...new Set(careers)].slice(0, 12),
      hollandScores,
      progress: 100
    });

    const results = wx.getStorageSync('testResults') || {};
    results.careerPrefer = { code: top3Codes, scores, careers: [...new Set(careers)].slice(0, 12) };
    wx.setStorageSync('testResults', results);
  },

  goHome: function () {
    wx.navigateBack({ delta: 1 });
  },

  nextTest: function () {
    wx.navigateTo({ url: '/pages/ai-fit/ai-fit' });
  },

  // 浮动窗口事件处理
  onFloatingWindowToggle: function (e) {
    this.setData({
      isFloatingWindowOpen: e.detail.isOpen
    });
  },

  // 计算性格与职业匹配度
  calculateMatch: function () {
    const results = wx.getStorageSync('testResults') || {};
    const personalityType = results.personality?.type;
    const careerCode = this.data.resultCode;
    
    if (!personalityType || !careerCode) {
      wx.showModal({
        title: '⚠️ 提示',
        content: '请先完成性格测试后再查看匹配度',
        showCancel: false,
        confirmText: '知道了',
        confirmColor: '#667eea'
      });
      return;
    }
    
    const match = matchUtil.calculateMatch(personalityType, careerCode);
    this.setData({ matchResult: match });
    
    wx.showModal({
      title: '🎯 性格与职业匹配度',
      content: `你的性格类型：${personalityType}\n职业偏好代码：${careerCode}\n\n匹配度：${match.score}分 (${match.level})\n\n${match.suggestions[0] || ''}`,
      showCancel: false,
      confirmText: '知道了',
      confirmColor: '#667eea'
    });
  }
});
