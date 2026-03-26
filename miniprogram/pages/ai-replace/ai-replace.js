// pages/ai-replace/ai-replace.js

// ========== 家长模式题目（原有题目）==========
const parentQuestions = [
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

// ========== 学生模式题目 ==========
const studentQuestions = [
  {
    question: "你最感兴趣的学科领域是？",
    options: ["数学和逻辑推理", "文学、历史和语言", "自然科学和实验", "艺术、音乐和设计"],
    scores: [4, 1, 3, 2],
    dimension: "academicInterest"
  },
  {
    question: "你更擅长哪种类型的学习？",
    options: ["理论学习 — 喜欢读书、理解概念", "实践操作 — 喜欢动手做实验、写代码", "创意表达 — 喜欢写作、画画、设计", "社交协作 — 喜欢讨论、小组项目"],
    scores: [3, 4, 2, 1],
    dimension: "learningStyle"
  },
  {
    question: "你在团队合作中通常扮演什么角色？",
    options: ["组织者 — 喜欢安排和分配任务", "执行者 — 踏实完成分配的工作", "创意者 — 经常提出新想法", "协调者 — 善于调解分歧、促进沟通"],
    scores: [2, 3, 4, 1],
    dimension: "teamRole"
  },
  {
    question: "你对新技术的态度是？",
    options: ["非常感兴趣，喜欢尝试最新工具", "比较感兴趣，会主动了解", "一般，用到时才学", "不太感兴趣，更偏好传统方式"],
    scores: [4, 3, 2, 1],
    dimension: "techOpenness"
  },
  {
    question: "你更倾向于解决哪类问题？",
    options: ["有明确答案的数学/逻辑题", "需要分析思考的开放性问题", "需要创意和想象力的设计类问题", "涉及人际关系的社会性问题"],
    scores: [3, 4, 2, 1],
    dimension: "problemType"
  },
  {
    question: "你对自己未来的期望更偏向？",
    options: ["成为某个领域的专家", "创办自己的公司或事业", "做一份稳定有保障的工作", "追求艺术或创意类事业"],
    scores: [4, 3, 1, 2],
    dimension: "careerExpectation"
  },
  {
    question: "你喜欢动手操作吗？（如实验、编程、手工等）",
    options: ["非常喜欢，动手比听课更高效", "喜欢，但需要先理解原理", "一般，更喜欢思考", "不太喜欢，更偏好理论学习"],
    scores: [4, 3, 2, 1],
    dimension: "handsOn"
  },
  {
    question: "你在以下哪方面最有自信？",
    options: ["逻辑分析和数学能力", "语言表达和写作能力", "艺术审美和创造力", "人际沟通和领导力"],
    scores: [4, 2, 3, 1],
    dimension: "confidence"
  },
  {
    question: "面对快速变化的世界，你的态度是？",
    options: ["拥抱变化，觉得充满机会", "谨慎乐观，愿意适应", "有些焦虑，但愿意学习", "比较担心，更喜欢稳定"],
    scores: [4, 3, 2, 1],
    dimension: "adaptability"
  },
  {
    question: "如果选一个方向深造，你最想钻研的是？",
    options: ["人工智能和前沿科技", "经济、金融和商业管理", "医学、心理学或教育", "文学、艺术或传媒"],
    scores: [4, 2, 3, 1],
    dimension: "deepInterest"
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

// ========== AI时代热门专业TOP 5 ==========
const hotMajors = [
  { name: "人工智能", emoji: "🤖", heat: "🔥🔥🔥🔥🔥", reason: "AI核心领域，人才缺口巨大，薪资涨幅领跑" },
  { name: "数据科学与大数据", emoji: "📊", heat: "🔥🔥🔥🔥🔥", reason: "数据驱动决策已成各行各业标配" },
  { name: "网络安全", emoji: "🔐", heat: "🔥🔥🔥🔥", reason: "数字化加速，安全人才需求井喷" },
  { name: "生物信息学", emoji: "🧬", heat: "🔥🔥🔥🔥", reason: "AI+生物交叉领域，未来医疗的基石" },
  { name: "新能源科学与工程", emoji: "⚡", heat: "🔥🔥🔥🔥", reason: "碳中和背景下最具发展潜力的工科方向" }
];

// ========== 专业推荐引擎 ==========
function generateRecommendedMajors(studentScores, personalityResult, hollandResult, aiFitResult) {
  // 分析学生维度特征
  const isTech = (studentScores.techOpenness || 0) + (studentScores.handsOn || 0) >= 7;
  const isCreative = (studentScores.learningStyle === 2) || (studentScores.confidence === 3) || (studentScores.problemType === 3);
  const isSocial = (studentScores.teamRole === 4) || (studentScores.confidence === 4) || (studentScores.problemType === 4);
  const isAnalytical = (studentScores.academicInterest === 1) || (studentScores.problemType === 2) || (studentScores.confidence === 1);
  const isBusiness = (studentScores.careerExpectation === 2) || (studentScores.deepInterest === 2);
  const isDeepTech = (studentScores.deepInterest === 1) && isTech;
  const isArtistic = (studentScores.academicInterest === 4) || (studentScores.careerExpectation === 4) || (studentScores.deepInterest === 4);

  // 获取 MBTI 特征
  const mbti = personalityResult ? personalityResult.type || '' : '';
  const isE = mbti.includes('E');
  const isI = mbti.includes('I');
  const isN = mbti.includes('N');
  const isS = mbti.includes('S');
  const isT = mbti.includes('T');
  const isF = mbti.includes('F');
  const isJ = mbti.includes('J');

  // 获取霍兰德代码
  const hollandCode = hollandResult ? hollandResult.code || '' : '';
  const hollandTypes = hollandCode.split('').filter(c => ['R','I','A','S','E','C'].includes(c));

  // 获取AI适配度
  const aiFitScore = aiFitResult ? aiFitResult.score || 50 : 50;
  const highAIFit = aiFitScore >= 70;

  const majors = [];
  const totalScore = Object.values(studentScores).reduce((a, b) => a + b, 0);

  // ===== 规则引擎：根据维度组合推荐专业 =====

  // 组合1: INTJ/INTP + 研究型(I) + 高AI适配 → AI/计算机方向
  if ((mbti === 'INTJ' || mbti === 'INTP') && hollandTypes.includes('I') && highAIFit) {
    majors.push({ name: '人工智能', reason: '你的逻辑思维和钻研精神非常适合AI核心研发', irreplaceable: '高', emoji: '🤖', match: 95 });
    majors.push({ name: '计算机科学与技术', reason: '系统化思维和编程能力是你的核心竞争力', irreplaceable: '高', emoji: '💻', match: 92 });
    majors.push({ name: '数据科学与大数据技术', reason: '善于发现数据中的模式和规律', irreplaceable: '高', emoji: '📊', match: 88 });
  }

  // 组合2: ESFP/ENFP + 艺术型(A) + 低AI适配 → 创意方向
  if ((mbti === 'ESFP' || mbti === 'ENFP') && hollandTypes.includes('A')) {
    majors.push({ name: '数字媒体艺术', reason: '创意表达与技术结合，AI难以替代你的审美直觉', irreplaceable: '中', emoji: '🎨', match: 90 });
    majors.push({ name: '交互设计', reason: '对人性和用户体验的洞察是AI的短板', irreplaceable: '高', emoji: '✨', match: 87 });
    majors.push({ name: '影视编导', reason: '故事叙事和情感共鸣需要真实的人类体验', irreplaceable: '中', emoji: '🎬', match: 83 });
  }

  // 组合3: ENFJ/ESFJ + 社会型(S) → 教育/心理方向
  if ((mbti === 'ENFJ' || mbti === 'ESFJ') && hollandTypes.includes('S')) {
    majors.push({ name: '心理学', reason: '对人情感的深度理解是最难被AI替代的能力', irreplaceable: '高', emoji: '🧠', match: 93 });
    majors.push({ name: '教育学', reason: '你的领导力和共情力天生适合教书育人', irreplaceable: '高', emoji: '📚', match: 90 });
    majors.push({ name: '人力资源管理', reason: '人际协调和组织管理需要复杂的情感智能', irreplaceable: '中', emoji: '👥', match: 85 });
  }

  // 组合4: ISTP/ESTP + 现实型(R) + 高动手能力 → 工程方向
  if ((mbti === 'ISTP' || mbti === 'ESTP') && hollandTypes.includes('R') && (studentScores.handsOn || 0) >= 3) {
    majors.push({ name: '机器人工程', reason: '动手能力和技术直觉是机器人领域的稀缺人才', irreplaceable: '高', emoji: '🦾', match: 91 });
    majors.push({ name: '智能科学与技术', reason: '将实操能力与智能系统结合，AI难以替代', irreplaceable: '高', emoji: '⚙️', match: 88 });
    majors.push({ name: '新能源科学与工程', reason: '绿色能源领域需要大量动手实践型人才', irreplaceable: '高', emoji: '⚡', match: 84 });
  }

  // 组合5: ENTJ/ESTJ + 企业型(E) → 商业/管理方向
  if ((mbti === 'ENTJ' || mbti === 'ESTJ') && hollandTypes.includes('E')) {
    majors.push({ name: '工商管理', reason: '战略思维和领导力在AI时代依然稀缺', irreplaceable: '中', emoji: '💼', match: 88 });
    majors.push({ name: '金融学', reason: '金融决策涉及复杂判断和人际博弈', irreplaceable: '中', emoji: '💰', match: 85 });
    majors.push({ name: '法学', reason: '法律推理和伦理判断需要深度的人类智慧', irreplaceable: '高', emoji: '⚖️', match: 82 });
  }

  // 组合6: INFP/ISFP + 艺术型(A) + 创意倾向 → 人文艺术方向
  if ((mbti === 'INFP' || mbti === 'ISFP') && hollandTypes.includes('A') && isArtistic) {
    majors.push({ name: '中国语言文学', reason: '文学创作和深度思考是人类独有的精神活动', irreplaceable: '高', emoji: '📖', match: 90 });
    majors.push({ name: '视觉传达设计', reason: '独特审美和创意表达是AI难以模仿的', irreplaceable: '中', emoji: '🖼️', match: 87 });
    majors.push({ name: '音乐表演', reason: '音乐的情感表达和现场感染力无可替代', irreplaceable: '高', emoji: '🎵', match: 84 });
  }

  // 组合7: 高技术开放 + 研究型(I) + 理科兴趣 → 前沿科技方向
  if (isDeepTech && hollandTypes.includes('I') && isAnalytical) {
    majors.push({ name: '人工智能', reason: '对前沿科技的浓厚兴趣是AI领域最强内驱力', irreplaceable: '高', emoji: '🤖', match: 93 });
    majors.push({ name: '信息安全', reason: '网络安全攻防需要创造性思维，AI只能辅助', irreplaceable: '高', emoji: '🔐', match: 89 });
    majors.push({ name: '生物信息学', reason: 'AI+生物交叉领域，未来最有前途的方向之一', irreplaceable: '高', emoji: '🧬', match: 86 });
  }

  // 组合8: 社交型(S) + 情感偏好(F) + 教育期望 → 医学/护理方向
  if (hollandTypes.includes('S') && isF && (studentScores.deepInterest === 3)) {
    majors.push({ name: '临床医学', reason: '医患关系和手术操作需要人类的情感和精细动作', irreplaceable: '高', emoji: '🏥', match: 91 });
    majors.push({ name: '护理学', reason: '人文关怀和身体护理是AI无法替代的', irreplaceable: '高', emoji: '💉', match: 88 });
    majors.push({ name: '康复治疗学', reason: '个性化康复方案需要人与人之间的深度互动', irreplaceable: '高', emoji: '🩺', match: 85 });
  }

  // 组合9: 商业倾向 + 企业型(E) + 外向 → 市场营销/传媒
  if (isBusiness && hollandTypes.includes('E') && isE) {
    majors.push({ name: '新闻传播学', reason: '内容创作和舆论引导需要真实的人类洞察', irreplaceable: '中', emoji: '📺', match: 85 });
    majors.push({ name: '市场营销', reason: '消费者心理洞察和品牌故事讲述需要人类共情', irreplaceable: '中', emoji: '📣', match: 82 });
    majors.push({ name: '电子商务', reason: '商业洞察+技术能力的复合型人才最吃香', irreplaceable: '中', emoji: '🛒', match: 80 });
  }

  // 组合10: 高适应性 + 综合型(无明显倾向) → 复合型专业
  if ((studentScores.adaptability || 0) >= 3 && majors.length === 0) {
    majors.push({ name: '信息管理与信息系统', reason: '管理+技术的复合背景让你在AI时代游刃有余', irreplaceable: '中', emoji: '📊', match: 85 });
    majors.push({ name: '工业设计', reason: '兼具审美和工程思维，AI只能做辅助', irreplaceable: '中', emoji: '🏗️', match: 82 });
    majors.push({ name: '建筑学', reason: '融合艺术、工程和社会理解，AI短期内难以替代', irreplaceable: '中', emoji: '🏛️', match: 80 });
  }

  // 兜底：如果没有匹配到任何规则，基于分数给出通用推荐
  if (majors.length === 0) {
    if (totalScore >= 30) {
      majors.push({ name: '人工智能', reason: '综合评估显示你具备AI方向的核心潜力', irreplaceable: '高', emoji: '🤖', match: 85 });
      majors.push({ name: '计算机科学与技术', reason: '逻辑分析和学习能力让你在计算机领域有优势', irreplaceable: '高', emoji: '💻', match: 82 });
      majors.push({ name: '数据科学与大数据技术', reason: '你的综合素质适合数据驱动型工作', irreplaceable: '高', emoji: '📊', match: 78 });
    } else {
      majors.push({ name: '信息安全', reason: '网络安全领域对综合素质要求高，发展前景好', irreplaceable: '高', emoji: '🔐', match: 80 });
      majors.push({ name: '软件工程', reason: '工程化思维和团队协作是软件行业的核心能力', irreplaceable: '中', emoji: '⚙️', match: 77 });
      majors.push({ name: '数字媒体技术', reason: '技术与创意的结合让你在多个领域都有竞争力', irreplaceable: '中', emoji: '🎮', match: 75 });
    }
  }

  // 按匹配度排序，取前5
  majors.sort((a, b) => b.match - a.match);
  return majors.slice(0, 5);
}

Page({
  data: {
    questions: parentQuestions,
    currentQuestion: 0,
    selected: null,
    totalScore: 0,
    showResult: false,
    isStudentMode: false,
    // 家长模式结果
    riskLevel: null,
    riskClass: '',
    riskName: '',
    riskPercent: '',
    resultDesc: '',
    gaugeRotation: 0,
    riskFactors: [],
    protections: [],
    // 学生模式结果
    recommendedMajors: [],
    hotMajors: hotMajors,
    recommendRotation: 0,
    // 通用
    progress: 0,
    dimensionScores: {}
  },

  onLoad: function () {
    const userRole = wx.getStorageSync('userRole') || '';
    const isStudentMode = userRole === 'student';
    this.setData({
      isStudentMode,
      questions: isStudentMode ? studentQuestions : parentQuestions,
      progress: 0
    });
  },

  selectOption: function (e) {
    this.setData({ selected: e.currentTarget.dataset.index });
  },

  submitAnswer: function () {
    const { currentQuestion, selected, questions, totalScore, dimensionScores, isStudentMode } = this.data;
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
      if (isStudentMode) {
        this.calculateStudentResult(newScore, newDimensionScores);
      } else {
        this.calculateParentResult(newScore, newDimensionScores);
      }
    }
  },

  // ========== 家长模式结果（保持原有逻辑不变）==========
  calculateParentResult: function (finalScore, dimensionScores) {
    const maxScore = parentQuestions.length * 4;
    const minScore = parentQuestions.length * 1;
    const normalizedScore = ((finalScore - minScore) / (maxScore - minScore)) * 100;
    
    let riskLevel = riskLevels.find(l => normalizedScore >= l.min) || riskLevels[riskLevels.length - 1];
    
    const gaugeRotation = (normalizedScore / 100) * 180 - 90;
    
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

  // ========== 学生模式结果 ==========
  calculateStudentResult: function (finalScore, dimensionScores) {
    const maxScore = studentQuestions.length * 4;
    const minScore = studentQuestions.length * 1;
    const normalizedScore = ((finalScore - minScore) / (maxScore - minScore)) * 100;
    
    // 推荐指数：分数越高越推荐，仪表盘左边低右边高
    const recommendRotation = (normalizedScore / 100) * 180 - 90;
    
    // 读取其他测试结果用于交叉推荐
    const allResults = wx.getStorageSync('testResults') || {};
    const personalityResult = allResults.personality || null;
    const hollandResult = allResults.careerPrefer || null;
    const aiFitResult = allResults.aiFit || null;
    
    const recommendedMajors = generateRecommendedMajors(
      dimensionScores, personalityResult, hollandResult, aiFitResult
    );
    
    // 推荐等级文案
    let recommendLevel = '';
    let recommendDesc = '';
    if (normalizedScore >= 75) {
      recommendLevel = '🌟 强烈推荐';
      recommendDesc = '综合评估显示，你具备极强的AI时代竞争力！推荐的专业方向与你的性格、兴趣和能力高度匹配，未来的发展空间巨大。';
    } else if (normalizedScore >= 50) {
      recommendLevel = '✅ 推荐';
      recommendDesc = '你在多个维度表现不错，推荐的专业方向与你的优势有较高的匹配度。建议重点发展自己的核心竞争力。';
    } else if (normalizedScore >= 25) {
      recommendLevel = '💡 建议';
      recommendDesc = '你有一定的潜力基础，但还需要在技术能力或创新思维上加强。推荐的专业可以帮助你建立AI时代的竞争力。';
    } else {
      recommendLevel = '📝 参考';
      recommendDesc = '目前综合表现还有提升空间。建议多接触新技术和实践活动，发现自己的兴趣和优势，再选择专业方向。';
    }

    this.setData({
      showResult: true,
      recommendRotation,
      recommendedMajors,
      recommendLevel,
      recommendDesc,
      recommendPercent: Math.round(normalizedScore),
      progress: 100
    });

    const results = wx.getStorageSync('testResults') || {};
    results.aiReplace = { 
      score: finalScore,
      normalized: normalizedScore,
      role: 'student',
      recommendedMajors: recommendedMajors,
      dimensionScores: dimensionScores
    };
    wx.setStorageSync('testResults', results);
  },

  goHome: function () {
    wx.navigateBack({ delta: 1 });
  },

  nextTest: function () {
    wx.navigateTo({ url: '/pages/ai-usage/ai-usage' });
  },

  // 浮动窗口事件处理
  onFloatingWindowToggle: function (e) {
    this.setData({
      isFloatingWindowOpen: e.detail.isOpen
    });
  }
});
