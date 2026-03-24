// pages/personality/personality.js
const matchUtil = require('../../utils/match.js');

const questions = [
  {
    question: "在社交聚会上，你通常会？",
    options: ["主动认识很多人", "和熟悉的人交流", "观察他人，不太主动", "视心情而定"],
    type: "EI",
    scores: [2, 1, -1, 0]
  },
  {
    question: "你更喜欢通过什么方式获取信息？",
    options: ["具体事实和数据", "整体概念和可能性", "两者结合", "看情况"],
    type: "SN",
    scores: [2, -2, 0, 0]
  },
  {
    question: "做决定时，你更倾向于？",
    options: ["逻辑分析和客观标准", "个人价值观和他人感受", "综合考虑", "凭直觉"],
    type: "TF",
    scores: [2, -2, 0, 0]
  },
  {
    question: "你的生活方式更偏向？",
    options: ["有计划、有条理", "灵活、随性", "有计划但可调整", "看心情"],
    type: "JP",
    scores: [2, -2, 0, 0]
  },
  {
    question: "能量来源更多来自？",
    options: ["与他人互动", "独处思考", "平衡两者", "不确定"],
    type: "EI",
    scores: [2, -2, 0, 0]
  },
  {
    question: "你更关注？",
    options: ["现实和实际", "未来和可能性", "两者兼顾", "当下"],
    type: "SN",
    scores: [2, -2, 0, 0]
  },
  {
    question: "面对冲突时，你会？",
    options: ["坚持原则和逻辑", "考虑他人感受", "寻求平衡", "回避"],
    type: "TF",
    scores: [2, -2, 0, 0]
  },
  {
    question: "工作任务来临时，你习惯？",
    options: ["立即制定计划", "先开始再说", "思考清楚再行动", "看情况"],
    type: "JP",
    scores: [2, -2, 0, 0]
  },
  {
    question: "你更喜欢的工作环境是？",
    options: ["团队合作、热闹", "独立空间、安静", "灵活切换", "无所谓"],
    type: "EI",
    scores: [2, -2, 0, 0]
  },
  {
    question: "学习新东西时，你偏好？",
    options: ["具体步骤和实例", "理论框架和概念", "实践探索", "混合方式"],
    type: "SN",
    scores: [2, -2, 0, 0]
  },
  {
    question: "评价他人时，你更注重？",
    options: ["能力和逻辑", "品格和态度", "综合考量", "第一印象"],
    type: "TF",
    scores: [2, -2, 0, 0]
  },
  {
    question: "假期安排，你倾向于？",
    options: ["详细规划行程", "随性而行", "大致计划", "临时决定"],
    type: "JP",
    scores: [2, -2, 0, 0]
  },
  {
    question: "遇到问题时，你首先？",
    options: ["找人讨论", "自己思考", "先查资料", "放一放"],
    type: "EI",
    scores: [2, -2, 0, 0]
  },
  {
    question: "你更相信？",
    options: ["经验和事实", "直觉和灵感", "两者结合", "实践验证"],
    type: "SN",
    scores: [2, -2, 0, 0]
  },
  {
    question: "做决策时，什么更重要？",
    options: ["公平和正义", "和谐和人情", "都重要", "效率"],
    type: "TF",
    scores: [2, -2, 0, 0]
  },
  {
    question: "你的办公桌通常？",
    options: ["整洁有序", "有些凌乱但知道在哪", "很乱", "极简"],
    type: "JP",
    scores: [2, -1, -2, 0]
  },
  {
    question: "参加活动时，你更喜欢？",
    options: ["认识新朋友", "和老朋友聊天", "两者都有", "观察为主"],
    type: "EI",
    scores: [2, -1, 0, -2]
  },
  {
    question: "阅读时，你偏好？",
    options: ["具体描述和细节", "抽象概念和主题", "故事情节", "实用信息"],
    type: "SN",
    scores: [2, -2, 0, 0]
  },
  {
    question: "朋友难过时，你会？",
    options: ["分析原因给建议", "倾听和安慰", "陪伴", "转移注意力"],
    type: "TF",
    scores: [2, -2, 0, 0]
  },
  {
    question: "项目截止前，你通常？",
    options: ["提前完成", "按时完成", "赶在最后", "需要延期"],
    type: "JP",
    scores: [2, 1, -1, -2]
  }
];

const mbtiTypes = {
  "ISTJ": { 
    name: "物流师", 
    desc: "安静、严肃，通过全面性和可靠性获得成功。实际、实事求是。", 
    careers: ["会计师", "审计师", "程序员", "工程师", "法官", "军官"],
    celebrities: [
      { name: "乔治·华盛顿", title: "美国第一任总统", icon: "🇺🇸" },
      { name: "沃伦·巴菲特", title: "投资大师", icon: "💰" },
      { name: "安吉拉·默克尔", title: "德国总理", icon: "🇩🇪" }
    ]
  },
  "ISFJ": { 
    name: "守卫者", 
    desc: "安静、友好、负责任和有良心。坚定地致力于完成义务。", 
    careers: ["护士", "教师", "社工", "行政人员", "图书管理员"],
    celebrities: [
      { name: "特蕾莎修女", title: "人道主义者", icon: "🕊️" },
      { name: "凯特·米德尔顿", title: "威尔士王妃", icon: "👑" },
      { name: "罗莎·帕克斯", title: "民权运动家", icon: "✊" }
    ]
  },
  "INFJ": { 
    name: "提倡者", 
    desc: "寻求思想、关系和物质之间的意义和联系。忠诚于自己的价值观。", 
    careers: ["作家", "心理咨询师", "艺术家", "人力资源", "研究员"],
    celebrities: [
      { name: "马丁·路德·金", title: "民权领袖", icon: "✊" },
      { name: "甘地", title: "印度国父", icon: "🇮🇳" },
      { name: "J.K.罗琳", title: "《哈利·波特》作者", icon: "📚" }
    ]
  },
  "INTJ": { 
    name: "建筑师", 
    desc: "有独创性的思想家，有强烈的驱动力实现自己的想法和目标。", 
    careers: ["科学家", "工程师", "战略顾问", "投资银行家", "企业家"],
    celebrities: [
      { name: "尼古拉·特斯拉", title: "发明家", icon: "⚡" },
      { name: "艾萨克·牛顿", title: "物理学家", icon: "🍎" },
      { name: "弗里德里希·尼采", title: "哲学家", icon: "📖" }
    ]
  },
  "ISTP": { 
    name: "鉴赏家", 
    desc: "灵活、忍耐力强，是个安静的观察者直到问题出现。", 
    careers: ["机械师", "工程师", "程序员", "侦探", "运动员"],
    celebrities: [
      { name: "克林特·伊斯特伍德", title: "演员/导演", icon: "🎬" },
      { name: "贝尔·格里尔斯", title: "探险家", icon: "🏕️" },
      { name: "汤姆·克鲁斯", title: "演员", icon: "🎭" }
    ]
  },
  "ISFP": { 
    name: "探险家", 
    desc: "安静、友好、敏感、和善。享受当下，喜欢有自己的空间。", 
    careers: ["艺术家", "设计师", "厨师", "护士", "园艺师"],
    celebrities: [
      { name: "鲍勃·迪伦", title: "音乐家", icon: "🎸" },
      { name: "弗雷达·卡罗", title: "画家", icon: "🎨" },
      { name: "玛丽莲·梦露", title: "演员", icon: "⭐" }
    ]
  },
  "INFP": { 
    name: "调停者", 
    desc: "理想主义，对自己价值观以外的事物很少有兴趣。", 
    careers: ["作家", "编辑", "心理咨询师", "艺术家", "社会工作者"],
    celebrities: [
      { name: "威廉·莎士比亚", title: "剧作家", icon: "📜" },
      { name: "约翰·列侬", title: "音乐家", icon: "🎵" },
      { name: "戴安娜王妃", title: "人道主义者", icon: "🌹" }
    ]
  },
  "INTP": { 
    name: "逻辑学家", 
    desc: "对知识有强烈的渴望，喜欢理论和抽象的思考。", 
    careers: ["科学家", "数学家", "程序员", "哲学家", "研究员"],
    celebrities: [
      { name: "阿尔伯特·爱因斯坦", title: "物理学家", icon: "🧮" },
      { name: "查尔斯·达尔文", title: "生物学家", icon: "🔬" },
      { name: "比尔·盖茨", title: "微软创始人", icon: "💻" }
    ]
  },
  "ESTP": { 
    name: "企业家", 
    desc: "灵活、忍耐力强，采用实际的方法关注即时结果。", 
    careers: ["销售", "企业家", "警察", "运动员", "演员"],
    celebrities: [
      { name: "唐纳德·特朗普", title: "企业家/总统", icon: "🏢" },
      { name: "埃尔维斯·普雷斯利", title: "猫王", icon: "🎤" },
      { name: "麦当娜", title: "流行天后", icon: "💃" }
    ]
  },
  "ESFP": { 
    name: "表演者", 
    desc: "外向、友好、接受力强。热爱生活、人和物质享受。", 
    careers: ["演员", "销售", "活动策划", "导游", "健身教练"],
    celebrities: [
      { name: "奥普拉·温弗瑞", title: "脱口秀主持人", icon: "📺" },
      { name: "杰米·奥利弗", title: "名厨", icon: "👨‍🍳" },
      { name: "埃尔顿·约翰", title: "音乐家", icon: "🎹" }
    ]
  },
  "ENFP": { 
    name: "竞选者", 
    desc: "热情洋溢、富有想象力。认为生活充满可能性。", 
    careers: ["记者", "演员", "公关", "教师", "创业者"],
    celebrities: [
      { name: "罗伯特·唐尼 Jr", title: "演员", icon: "🎬" },
      { name: "威尔·史密斯", title: "演员/歌手", icon: "🎭" },
      { name: "罗宾·威廉姆斯", title: "喜剧演员", icon: "😂" }
    ]
  },
  "ENTP": { 
    name: "辩论家", 
    desc: "反应快、睿智，有战略眼光。喜欢智力挑战。", 
    careers: ["律师", "企业家", "顾问", "发明家", "营销人员"],
    celebrities: [
      { name: "托马斯·爱迪生", title: "发明家", icon: "💡" },
      { name: "萨尔瓦多·达利", title: "艺术家", icon: "🎨" },
      { name: "杰克·马", title: "阿里巴巴创始人", icon: "🛒" }
    ]
  },
  "ESTJ": { 
    name: "总经理", 
    desc: "实际、现实主义。果断，一旦下决心就会马上行动。", 
    careers: ["管理者", "军官", "法官", "银行家", "项目经理"],
    celebrities: [
      { name: "约翰·D·洛克菲勒", title: "石油大王", icon: "🛢️" },
      { name: "桑德拉·戴·奥康纳", title: "最高法院大法官", icon: "⚖️" },
      { name: "弗兰克·辛纳屈", title: "歌手/演员", icon: "🎙️" }
    ]
  },
  "ESFJ": { 
    name: "执政官", 
    desc: "热心肠、有责任心、合作。希望环境温馨和谐。", 
    careers: ["教师", "医护", "销售", "人力资源", "活动策划"],
    celebrities: [
      { name: "泰勒·斯威夫特", title: "歌手", icon: "🎵" },
      { name: "珍妮弗·洛佩兹", title: "演员/歌手", icon: "💃" },
      { name: "比利·格雷厄姆", title: "布道家", icon: "🙏" }
    ]
  },
  "ENFJ": { 
    name: "主人公", 
    desc: "热情、为他人着想、反应敏捷。有领导力，能帮助他人发挥潜力。", 
    careers: ["教师", "培训师", "销售", "人力资源", "心理咨询师"],
    celebrities: [
      { name: "巴拉克·奥巴马", title: "美国前总统", icon: "🇺🇸" },
      { name: "纳尔逊·曼德拉", title: "南非总统", icon: "🇿🇦" },
      { name: "奥普拉·温弗瑞", title: "媒体大亨", icon: "📺" }
    ]
  },
  "ENTJ": { 
    name: "指挥官", 
    desc: "坦诚、果断，是天生的领导者。能快速发现不合理的地方。", 
    careers: ["CEO", "管理者", "律师", "顾问", "企业家"],
    celebrities: [
      { name: "史蒂夫·乔布斯", title: "苹果创始人", icon: "🍎" },
      { name: "玛格丽特·撒切尔", title: "英国首相", icon: "🇬🇧" },
      { name: "拿破仑·波拿巴", title: "法国皇帝", icon: "👑" }
    ]
  }
};

Page({
  data: {
    questions: questions,
    currentQuestion: 0,
    selected: null,
    scores: { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 },
    showResult: false,
    resultType: '',
    resultDesc: '',
    careers: [],
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

    // 计算维度分数
    const dimension = question.type;
    const dim1 = dimension.charAt(0);
    const dim2 = dimension.charAt(1);

    const newScores = { ...scores };
    if (score > 0) {
      newScores[dim1] += score;
    } else if (score < 0) {
      newScores[dim2] += Math.abs(score);
    }

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
    const type = 
      (scores.E >= scores.I ? 'E' : 'I') +
      (scores.S >= scores.N ? 'S' : 'N') +
      (scores.T >= scores.F ? 'T' : 'F') +
      (scores.J >= scores.P ? 'J' : 'P');

    // 计算亚型 (基于各维度分数差异)
    const eiDiff = Math.abs(scores.E - scores.I);
    const snDiff = Math.abs(scores.S - scores.N);
    const tfDiff = Math.abs(scores.T - scores.F);
    const jpDiff = Math.abs(scores.J - scores.P);
    const avgDiff = (eiDiff + snDiff + tfDiff + jpDiff) / 4;
    
    let subType = '';
    let subTypeDesc = '';
    if (avgDiff >= 1.5) {
      subType = 'A';
      subTypeDesc = '坚定型 - 你对自己的偏好非常明确，性格特征显著';
    } else if (avgDiff >= 0.8) {
      subType = 'B';
      subTypeDesc = '平衡型 - 你在某些维度上较为平衡，具有灵活性';
    } else {
      subType = 'C';
      subTypeDesc = '探索型 - 你的性格维度较为均衡，适应性强';
    }

    const result = mbtiTypes[type];
    this.setData({
      showResult: true,
      resultType: `${type}-${subType}`,
      resultSubType: subType,
      resultSubTypeDesc: subTypeDesc,
      resultName: result.name,
      resultDesc: result.desc,
      careers: result.careers,
      celebrities: result.celebrities || [],
      progress: 100
    });

    // 保存结果
    const results = wx.getStorageSync('testResults') || {};
    results.personality = { 
      type, 
      subType,
      subTypeDesc,
      name: result.name,
      desc: result.desc,
      careers: result.careers,
      celebrities: result.celebrities || []
    };
    wx.setStorageSync('testResults', results);
  },

  goHome: function () {
    wx.navigateBack({ delta: 1 });
  },

  nextTest: function () {
    wx.navigateTo({ url: '/pages/career-prefer/career-prefer' });
  },

  // 浮动窗口事件处理
  onFloatingWindowToggle: function (e) {
    this.setData({
      isFloatingWindowOpen: e.detail.isOpen
    });
  },

  // 计算性格与职业匹配度
  calculateMatch: function (careerCode) {
    const { resultType } = this.data;
    const personalityType = resultType.split('-')[0]; // 获取 MBTI 类型（去掉亚型）
    
    const match = matchUtil.calculateMatch(personalityType, careerCode);
    this.setData({ matchResult: match });
    
    wx.showModal({
      title: '🎯 性格与职业匹配度',
      content: `匹配度：${match.score}分 (${match.level})\n\n分析：${match.analysis.join('; ')}\n\n建议：${match.suggestions[0] || ''}`,
      showCancel: false,
      confirmText: '知道了',
      confirmColor: '#667eea'
    });
  }
});
