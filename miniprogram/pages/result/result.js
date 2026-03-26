// pages/result/result.js

// AI智能职业/专业推荐引擎
function generateAICareerPlan(results, userRole) {
  const plans = [];
  
  const personality = results.personality || null;
  const careerPrefer = results.careerPrefer || null;
  const aiFit = results.aiFit || null;
  const aiReplace = results.aiReplace || null;
  
  // 提取关键维度
  const mbti = personality ? (personality.type || '') : '';
  const hollandCode = careerPrefer ? (careerPrefer.code || '') : '';
  const hollandTypes = hollandCode.split('').filter(c => ['R','I','A','S','E','C'].includes(c));
  const aiFitScore = aiFit ? (aiFit.score || 50) : 50;
  const isStudent = userRole === 'student';

  // 第一组：基于 MBTI + 霍兰德 + AI适配度 的交叉推荐
  const isE = mbti.includes('E');
  const isI = mbti.includes('I');
  const isN = mbti.includes('N');
  const isT = mbti.includes('T');
  const isF = mbti.includes('F');
  const isJ = mbti.includes('J');
  const hasI = hollandTypes.includes('I');
  const hasA = hollandTypes.includes('A');
  const hasS = hollandTypes.includes('S');
  const hasE_h = hollandTypes.includes('E');
  const hasR = hollandTypes.includes('R');
  const hasC = hollandTypes.includes('C');

  // 推荐规则（按优先级排列）
  
  // 规则1: INTJ/INTP + 研究型 + 高AI适配 → AI/科技
  if ((mbti === 'INTJ' || mbti === 'INTP') && hasI && aiFitScore >= 70) {
    plans.push({
      name: isStudent ? '人工智能' : 'AI算法工程师',
      match: 95,
      reason: isStudent 
        ? '你的逻辑思维和钻研精神完美匹配AI领域，未来可成为AI科学家'
        : '你的战略思维和技术能力在AI时代极具竞争力',
      majors: ['人工智能', '计算机科学', '数学', '统计学'],
      emoji: '🤖'
    });
    plans.push({
      name: isStudent ? '计算机科学与技术' : '系统架构师',
      match: 90,
      reason: isStudent
        ? '系统化思维是你学习计算机科学的天然优势'
        : '擅长从全局视角设计复杂系统',
      majors: ['计算机科学', '软件工程', '信息安全'],
      emoji: '💻'
    });
    plans.push({
      name: isStudent ? '数据科学与大数据' : '数据科学家',
      match: 87,
      reason: '善于从复杂数据中发现规律和洞察',
      majors: ['数据科学', '统计学', '数学', '信息管理'],
      emoji: '📊'
    });
  }

  // 规则2: ENFJ/ESFJ + 社会型 → 教育/心理
  if ((mbti === 'ENFJ' || mbti === 'ESFJ' || mbti === 'ISFJ') && hasS) {
    plans.push({
      name: isStudent ? '心理学' : '心理咨询师/培训师',
      match: 93,
      reason: '你对他人的情感有天然的洞察力，这是AI最难替代的能力',
      majors: ['心理学', '教育学', '社会工作'],
      emoji: '🧠'
    });
    plans.push({
      name: isStudent ? '教育学' : '教育管理者',
      match: 88,
      reason: '你的领导力和共情力让你在教育领域如鱼得水',
      majors: ['教育学', '学前教育', '教育技术'],
      emoji: '📚'
    });
    plans.push({
      name: isStudent ? '人力资源管理' : 'HRBP/组织发展',
      match: 82,
      reason: '人际协调和组织管理需要复杂的社会智能',
      majors: ['人力资源管理', '工商管理', '劳动关系'],
      emoji: '👥'
    });
  }

  // 规则3: ESFP/ENFP/ISFP + 艺术型 → 创意方向
  if ((mbti === 'ESFP' || mbti === 'ENFP' || mbti === 'ISFP' || mbti === 'INFP') && hasA) {
    plans.push({
      name: isStudent ? '数字媒体艺术' : '创意总监',
      match: 90,
      reason: '你的审美直觉和创意表达是AI无法复制的核心竞争力',
      majors: ['数字媒体艺术', '视觉传达', '动画'],
      emoji: '🎨'
    });
    plans.push({
      name: isStudent ? '交互设计' : 'UX设计师',
      match: 86,
      reason: '对人性的理解让你能设计出真正好用的产品',
      majors: ['交互设计', '工业设计', '数字媒体技术'],
      emoji: '✨'
    });
    plans.push({
      name: isStudent ? '影视编导' : '内容制作人',
      match: 82,
      reason: '故事叙事和情感共鸣需要真实的人类体验作为基础',
      majors: ['广播电视编导', '戏剧影视文学', '数字媒体'],
      emoji: '🎬'
    });
  }

  // 规则4: ENTJ/ESTJ + 企业型 → 商业管理
  if ((mbti === 'ENTJ' || mbti === 'ESTJ') && hasE_h) {
    plans.push({
      name: isStudent ? '金融学' : '投资经理/战略顾问',
      match: 88,
      reason: '你的决策力和战略思维在商业领域极具价值',
      majors: ['金融学', '经济学', '投资学'],
      emoji: '💰'
    });
    plans.push({
      name: isStudent ? '工商管理' : '企业管理者',
      match: 85,
      reason: '天生的领导力和执行力让你在管理岗位如鱼得水',
      majors: ['工商管理', '市场营销', '国际商务'],
      emoji: '💼'
    });
    plans.push({
      name: isStudent ? '法学' : '律师/法务',
      match: 80,
      reason: '法律推理和伦理判断需要深度的人类智慧',
      majors: ['法学', '知识产权', '国际法'],
      emoji: '⚖️'
    });
  }

  // 规则5: ISTP/ESTP + 现实型 → 工程/技术
  if ((mbti === 'ISTP' || mbti === 'ESTP') && hasR) {
    plans.push({
      name: isStudent ? '机器人工程' : '机器人工程师',
      match: 89,
      reason: '动手能力和技术直觉让你在机器人领域有天然优势',
      majors: ['机器人工程', '自动化', '机械工程'],
      emoji: '🦾'
    });
    plans.push({
      name: isStudent ? '新能源科学与工程' : '新能源工程师',
      match: 84,
      reason: '绿色能源领域需要大量动手实践型人才',
      majors: ['新能源科学与工程', '电气工程', '能源与动力'],
      emoji: '⚡'
    });
  }

  // 规则6: INTP/INTJ + 高AI适配 → 数据/研究
  if ((mbti === 'INTP' || mbti === 'INTJ') && aiFitScore >= 65 && hasI) {
    plans.push({
      name: isStudent ? '信息安全' : '安全工程师',
      match: 88,
      reason: '创造性攻防思维是AI只能辅助的核心能力',
      majors: ['信息安全', '网络空间安全', '密码学'],
      emoji: '🔐'
    });
    plans.push({
      name: isStudent ? '生物信息学' : '生物信息分析师',
      match: 83,
      reason: 'AI+生物的交叉领域是未来最有前途的方向',
      majors: ['生物信息学', '生物医学工程', '基因组学'],
      emoji: '🧬'
    });
  }

  // 规则7: ENFP/ENTP + 高AI适配 → 创业/创新
  if ((mbti === 'ENFP' || mbti === 'ENTP') && aiFitScore >= 60 && (hasE_h || hasA)) {
    plans.push({
      name: isStudent ? '新闻传播学' : '内容创业者',
      match: 84,
      reason: '内容创作和舆论引导需要真实的人类洞察',
      majors: ['新闻学', '传播学', '网络与新媒体'],
      emoji: '📺'
    });
    plans.push({
      name: isStudent ? '电子商务' : '电商运营总监',
      match: 80,
      reason: '商业洞察+创意能力的组合让你在电商领域有独特优势',
      majors: ['电子商务', '市场营销', '国际贸易'],
      emoji: '🛒'
    });
  }

  // 规则8: 社会型 + 情感型 → 医疗/护理
  if (hasS && isF && !hasI) {
    plans.push({
      name: isStudent ? '临床医学' : '临床医生',
      match: 90,
      reason: '医患关系和手术操作需要人类的情感和精细动作',
      majors: ['临床医学', '口腔医学', '中医学'],
      emoji: '🏥'
    });
    plans.push({
      name: isStudent ? '护理学' : '高级护理师',
      match: 86,
      reason: '人文关怀和身体护理是AI无法替代的核心价值',
      majors: ['护理学', '康复治疗学', '老年护理'],
      emoji: '💉'
    });
  }

  // 规则9: INFP + 艺术型 → 人文
  if (mbti === 'INFP' && hasA) {
    plans.push({
      name: isStudent ? '中国语言文学' : '作家/编辑',
      match: 88,
      reason: '深度的人文思考和文学创作是人类独有的精神活动',
      majors: ['汉语言文学', '创意写作', '比较文学'],
      emoji: '📖'
    });
    plans.push({
      name: isStudent ? '哲学' : '研究学者',
      match: 82,
      reason: '哲学思辨和伦理判断是AI时代最不可替代的智慧',
      majors: ['哲学', '社会学', '思想史'],
      emoji: '🤔'
    });
  }

  // 规则10: 综合型 - 基于AI适配度推荐
  if (plans.length === 0) {
    if (aiFitScore >= 70) {
      plans.push({
        name: isStudent ? '人工智能' : 'AI产品经理',
        match: 85,
        reason: '你的AI适应能力强，适合在AI领域深耕',
        majors: ['人工智能', '计算机科学', '数据科学'],
        emoji: '🤖'
      });
      plans.push({
        name: isStudent ? '信息管理与信息系统' : '数字化转型顾问',
        match: 80,
        reason: '管理+技术的复合背景让你在AI时代游刃有余',
        majors: ['信息管理与信息系统', '电子商务', '大数据管理'],
        emoji: '📊'
      });
      plans.push({
        name: isStudent ? '软件工程' : '全栈工程师',
        match: 78,
        reason: '工程化思维和学习能力是软件行业的核心要求',
        majors: ['软件工程', '计算机科学', '信息安全'],
        emoji: '⚙️'
      });
    } else {
      plans.push({
        name: isStudent ? '建筑学' : '建筑师',
        match: 80,
        reason: '融合艺术、工程和社会理解，AI短期内难以替代',
        majors: ['建筑学', '城乡规划', '风景园林'],
        emoji: '🏛️'
      });
      plans.push({
        name: isStudent ? '工业设计' : '产品设计师',
        match: 77,
        reason: '兼具审美和工程思维的设计人才是最稀缺的',
        majors: ['工业设计', '产品设计', '交互设计'],
        emoji: '🏗️'
      });
      plans.push({
        name: isStudent ? '学前教育' : '幼儿教育专家',
        match: 75,
        reason: '幼儿教育需要大量的情感交流和身体互动',
        majors: ['学前教育', '特殊教育', '小学教育'],
        emoji: '👶'
      });
    }
  }

  // 如果学生模式下aiReplace已有推荐专业，合并进来
  if (aiReplace && aiReplace.role === 'student' && aiReplace.recommendedMajors) {
    const existingNames = new Set(plans.map(p => p.name));
    aiReplace.recommendedMajors.forEach(m => {
      if (!existingNames.has(m.name)) {
        plans.push({
          name: m.name,
          match: m.match,
          reason: m.reason,
          majors: [m.name],
          emoji: m.emoji
        });
      }
    });
  }

  // 去重并按匹配度排序
  const seen = new Set();
  const uniquePlans = plans.filter(p => {
    if (seen.has(p.name)) return false;
    seen.add(p.name);
    return true;
  });
  uniquePlans.sort((a, b) => b.match - a.match);
  return uniquePlans.slice(0, 5);
}

Page({
  data: {
    results: {},
    completedCount: 0,
    progressPercent: 0,
    suggestions: [],
    recommendedCareers: [],
    aiCareerPlan: [],
    showModal: false,
    modalData: {},
    userRole: ''
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
    const userRole = wx.getStorageSync('userRole') || '';

    // 生成综合建议
    const suggestions = this.generateSuggestions(results);
    
    // 收集推荐职业
    const recommendedCareers = this.collectCareers(results);

    // 生成AI智能职业方案（完成3个以上测试后）
    let aiCareerPlan = [];
    if (completedCount >= 3) {
      aiCareerPlan = generateAICareerPlan(results, userRole);
    }

    this.setData({
      results,
      completedCount,
      progressPercent: Math.round(progressPercent),
      suggestions,
      recommendedCareers: [...new Set(recommendedCareers)].slice(0, 10),
      aiCareerPlan,
      userRole
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
      if (level && level.includes('低')) {
        suggestions.push({
          icon: '🛡️',
          title: '保持竞争优势',
          desc: '你的工作难以被替代，继续保持学习和创新'
        });
      } else if (level && level.includes('中')) {
        suggestions.push({
          icon: '🔄',
          title: '提升不可替代性',
          desc: '建议发展创造性技能，减少重复性工作'
        });
      } else if (level) {
        suggestions.push({
          icon: '🎯',
          title: '考虑职业转型',
          desc: '建议向 AI 难以替代的领域发展，如创造性、情感交流类工作'
        });
      }

      // 学生模式的额外建议
      if (results.aiReplace.role === 'student' && results.aiReplace.recommendedMajors) {
        suggestions.push({
          icon: '🎓',
          title: '关注推荐专业方向',
          desc: 'AI时代选专业报告已为你生成专属推荐，建议重点了解排名前3的专业'
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
        if (data.role === 'student') {
          modalData = {
            title: '🎓 AI时代选专业指南',
            detail: `推荐指数：${Math.round(data.normalized)}%`,
            desc: `已为你生成 ${data.recommendedMajors ? data.recommendedMajors.length : 0} 个推荐专业`,
            careers: data.recommendedMajors ? data.recommendedMajors.map(m => m.name) : []
          };
        } else {
          modalData = {
            title: '⚠️ AI 取代风险',
            detail: `${data.level} - ${data.percent}`,
            desc: '评估你的工作被 AI 取代的风险程度',
            careers: []
          };
        }
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
      title: 'AI时代来了！快测测你家孩子适合什么专业？',
      path: '/pages/index/index'
    };
  },

  onShareTimeline: function () {
    return {
      title: 'AI时代来了！快给孩子测测适合什么专业 🔥',
      query: 'from=result'
    };
  },

  // 浮动窗口事件处理
  onFloatingWindowToggle: function (e) {
    this.setData({
      isFloatingWindowOpen: e.detail.isOpen
    });
  }
});
