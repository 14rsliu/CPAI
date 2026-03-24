#!/bin/bash

# CPAI 小程序项目验证脚本
# 用于检查项目文件完整性和基本配置

echo "🔍 CPAI 小程序项目验证工具 v1.1"
echo "================================"
echo ""

# 颜色定义
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 计数器
TOTAL=0
PASS=0
FAIL=0

# 检查文件是否存在
check_file() {
    TOTAL=$((TOTAL + 1))
    if [ -f "$1" ]; then
        echo -e "${GREEN}✓${NC} $1"
        PASS=$((PASS + 1))
        return 0
    else
        echo -e "${RED}✗${NC} $1 (缺失)"
        FAIL=$((FAIL + 1))
        return 1
    fi
}

# 检查目录是否存在
check_dir() {
    TOTAL=$((TOTAL + 1))
    if [ -d "$1" ]; then
        echo -e "${GREEN}✓${NC} $1/"
        PASS=$((PASS + 1))
        return 0
    else
        echo -e "${RED}✗${NC} $1/ (缺失)"
        FAIL=$((FAIL + 1))
        return 1
    fi
}

echo "📁 检查核心目录..."
check_dir "miniprogram"
check_dir "miniprogram/pages"
check_dir "miniprogram/components"
check_dir "miniprogram/utils"
echo ""

echo "📄 检查核心配置文件..."
check_file "project.config.json"
check_file "miniprogram/app.js"
check_file "miniprogram/app.json"
check_file "miniprogram/app.wxss"
check_file "miniprogram/sitemap.json"
echo ""

echo "📱 检查页面文件..."
PAGES=("index" "personality" "career-prefer" "ai-fit" "ai-replace" "ai-usage" "result")
for page in "${PAGES[@]}"; do
    check_file "miniprogram/pages/$page/$page.js"
    check_file "miniprogram/pages/$page/$page.wxml"
    check_file "miniprogram/pages/$page/$page.wxss"
    check_file "miniprogram/pages/$page/$page.json"
done
echo ""

echo "🧩 检查组件文件..."
check_file "miniprogram/components/floating-window/floating-window.js"
check_file "miniprogram/components/floating-window/floating-window.wxml"
check_file "miniprogram/components/floating-window/floating-window.wxss"
check_file "miniprogram/components/floating-window/floating-window.json"
echo ""

echo "🔧 检查工具函数..."
check_file "miniprogram/utils/match.js"
echo ""

echo "📚 检查文档文件..."
check_file "README.md"
check_file "DEPLOYMENT.md"
check_file "PROJECT_RECORD.md"
check_file "TEST_REPORT.md"
check_file "CHECKLIST.md"
check_file "UPDATE_SUMMARY.md"
echo ""

echo "🔍 检查 app.json 配置..."
if grep -q "floating-window" "miniprogram/app.json"; then
    echo -e "${GREEN}✓${NC} 浮动窗口组件已全局注册"
    PASS=$((PASS + 1))
else
    echo -e "${RED}✗${NC} 浮动窗口组件未注册"
    FAIL=$((FAIL + 1))
fi
TOTAL=$((TOTAL + 1))
echo ""

echo "================================"
echo "📊 验证结果汇总"
echo "================================"
echo "总计检查：$TOTAL 项"
echo -e "${GREEN}通过：$PASS 项${NC}"
echo -e "${RED}失败：$FAIL 项${NC}"
echo ""

if [ $FAIL -eq 0 ]; then
    echo -e "${GREEN}✅ 所有检查通过！项目结构完整。${NC}"
    echo ""
    echo "🚀 下一步:"
    echo "   1. 打开微信开发者工具"
    echo "   2. 导入项目目录"
    echo "   3. 点击「编译」按钮"
    echo "   4. 测试浮动窗口和匹配度功能"
    exit 0
else
    echo -e "${RED}❌ 发现缺失文件，请检查上述输出。${NC}"
    echo ""
    echo "💡 建议:"
    echo "   - 确认所有文件已正确创建"
    echo "   - 检查文件路径是否正确"
    echo "   - 重新运行部署脚本"
    exit 1
fi
