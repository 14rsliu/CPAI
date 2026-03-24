// utils/match.js - 性格与职业匹配度算法

/**
 * 计算性格类型与职业的匹配度
 * @param {string} personalityType - MBTI 性格类型 (如 INTJ)
 * @param {string} careerCode - 霍兰德职业代码 (如 EAS)
 * @returns {object} 匹配度结果 {score, level, analysis, suggestions}
 */
function calculateMatch(personalityType, careerCode) {
  if (!personalityType || !careerCode) {
    return {
      score: 0,
      level: '未评估',
      analysis: '请先完成性格测试和职业偏好测试',
      suggestions: []
    };
  }

  let score = 50; // 基础分
  const analysis = [];
  const suggestions = [];

  // 1. MBTI 维度与霍兰德维度的对应关系
  const mbtiMapping = {
    'E': ['S', 'E'], // 外向型适合社会型、企业型
    'I': ['I', 'R'], // 内向型适合研究型、现实型
    'S': ['R', 'C'], // 实觉型适合现实型、常规型
    'N': ['I', 'A'], // 直觉型适合研究型、艺术型
    'T': ['I', 'R'], // 思考型适合研究型、现实型
    'F': ['S', 'A'], // 情感型适合社会型、艺术型
    'J': ['E', 'C'], // 判断型适合企业型、常规型
    'P': ['A', 'S']  // 知觉型适合艺术型、社会型
  };

  // 2. 计算匹配度
  const mbtiChars = personalityType.split('');
  const hollandChars = careerCode.split('');

  // 检查 MBTI 各维度与霍兰德代码的匹配
  mbtiChars.forEach((dim, index) => {
    const matchedHolland = mbtiMapping[dim] || [];
    const matchCount = matchedHolland.filter(h => hollandChars.includes(h)).length;
    
    if (matchCount > 0) {
      score += matchCount * 8;
      const dimNames = {
        'E': '外向', 'I': '内向',
        'S': '实觉', 'N': '直觉',
        'T': '思考', 'F': '情感',
        'J': '判断', 'P': '知觉'
      };
      analysis.push(`${dimNames[dim]}特质与职业方向匹配`);
    }
  });

  // 3. 特殊组合加分
  const specialCombos = {
    'INTJ': ['I', 'E'], // 战略家适合研究和企业
    'ENTJ': ['E', 'I'], // 指挥官适合企业和研究
    'INFJ': ['S', 'A'], // 提倡者适合社会和艺术
    'ENFJ': ['E', 'S'], // 主人公适合企业和社会
    'INTP': ['I', 'R'], // 逻辑学家适合研究和现实
    'ENTP': ['E', 'I'], // 辩论家适合企业和研究
    'INFP': ['A', 'S'], // 调停者适合艺术和社会
    'ENFP': ['A', 'E'], // 竞选者适合艺术和企业
    'ISTJ': ['C', 'R'], // 物流师适合常规和现实
    'ESTJ': ['E', 'C'], // 总经理适合企业和常规
    'ISFJ': ['S', 'C'], // 守卫者适合社会和常规
    'ESFJ': ['S', 'E'], // 执政官适合社会和企业
    'ISTP': ['R', 'I'], // 鉴赏家适合现实和研究
    'ESTP': ['E', 'R'], // 企业家适合企业和现实
    'ISFP': ['A', 'R'], // 探险家适合艺术和现实
    'ESFP': ['S', 'A']  // 表演者适合社会和艺术
  };

  if (specialCombos[personalityType]) {
    const preferredHolland = specialCombos[personalityType];
    const matchCount = preferredHolland.filter(h => hollandChars.includes(h)).length;
    if (matchCount > 0) {
      score += matchCount * 10;
      analysis.push('性格类型与职业代码高度契合');
    }
  }

  // 4. 限制分数范围
  score = Math.min(100, Math.max(0, score));

  // 5. 确定匹配等级
  let level;
  if (score >= 85) {
    level = '极佳匹配';
    suggestions.push('这个职业方向非常适合你，可以重点发展！');
  } else if (score >= 70) {
    level = '良好匹配';
    suggestions.push('这个职业方向比较合适，建议深入了解相关技能要求');
  } else if (score >= 55) {
    level = '中等匹配';
    suggestions.push('这个职业方向可以考虑，但可能需要补充某些方面的能力');
  } else if (score >= 40) {
    level = '一般匹配';
    suggestions.push('这个职业方向与你的性格有一定差异，建议慎重考虑');
  } else {
    level = '较低匹配';
    suggestions.push('这个职业方向可能与你的性格不太匹配，建议探索其他方向');
  }

  // 6. 生成具体建议
  if (hollandChars.includes('R')) {
    if (personalityType.includes('I') || personalityType.includes('T')) {
      suggestions.push('你的分析能力适合技术类工作，可以考虑深入学习专业技能');
    }
  }
  if (hollandChars.includes('I')) {
    if (personalityType.includes('N') || personalityType.includes('T')) {
      suggestions.push('你的研究能力突出，适合需要深度思考的工作');
    }
  }
  if (hollandChars.includes('A')) {
    if (personalityType.includes('N') || personalityType.includes('F')) {
      suggestions.push('你的创造力是优势，可以在工作中发挥创意');
    }
  }
  if (hollandChars.includes('S')) {
    if (personalityType.includes('E') || personalityType.includes('F')) {
      suggestions.push('你的沟通能力适合与人打交道的工作');
    }
  }
  if (hollandChars.includes('E')) {
    if (personalityType.includes('E') || personalityType.includes('J')) {
      suggestions.push('你的领导力可以帮助你在管理岗位取得成功');
    }
  }
  if (hollandChars.includes('C')) {
    if (personalityType.includes('S') || personalityType.includes('J')) {
      suggestions.push('你的条理性适合需要精确和秩序的工作');
    }
  }

  return {
    score,
    level,
    analysis: analysis.length > 0 ? analysis : ['匹配度基于性格特质与职业特点的对应关系'],
    suggestions: suggestions.slice(0, 5)
  };
}

module.exports = {
  calculateMatch
};
