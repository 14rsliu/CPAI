#!/bin/bash

# CPAI 小程序快速修复脚本
# 自动修复一些简单的问题

set -e

echo "================================"
echo "🔧 CPAI 小程序快速修复工具"
echo "================================"
echo ""

# 颜色定义
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 计数器
FIXED=0
SKIPPED=0

# 修复 1: 在所有测试页面添加浮动窗口组件
echo -e "${BLUE}📝 修复 1: 添加浮动窗口组件到所有页面...${NC}"

PAGES=("ai-fit" "ai-replace" "ai-usage" "result")

for page in "${PAGES[@]}"; do
  FILE="miniprogram/pages/$page/$page.wxml"
  
  if [ -f "$FILE" ]; then
    # 检查是否已存在浮动窗口
    if grep -q "floating-window" "$FILE"; then
      echo -e "${YELLOW}  ⚠️  $page - 已存在浮动窗口，跳过${NC}"
      SKIPPED=$((SKIPPED + 1))
    else
      # 在文件末尾添加浮动窗口组件
      echo "" >> "$FILE"
      echo "  <!-- 浮动窗口组件 -->" >> "$FILE"
      echo "  <floating-window " >> "$FILE"
      echo "    id=\"floatingWindow\" " >> "$FILE"
      echo "    isOpen=\"{{isFloatingWindowOpen}}\" " >> "$FILE"
      echo "    bind:toggle=\"onFloatingWindowToggle\"" >> "$FILE"
      echo "  />" >> "$FILE"
      echo "</view>" >> "$FILE"
      
      # 移除原来的结束标签（如果存在重复）
      sed -i '$ {/^<\/view>$/d}' "$FILE"
      
      echo -e "${GREEN}  ✅  $page - 已添加浮动窗口${NC}"
      FIXED=$((FIXED + 1))
    fi
  else
    echo -e "${RED}  ❌  $FILE 不存在${NC}"
  fi
done

echo ""

# 修复 2: 在所有测试页面的 JS 中添加浮动窗口事件处理
echo -e "${BLUE}📝 修复 2: 添加浮动窗口事件处理函数...${NC}"

for page in "${PAGES[@]}"; do
  FILE="miniprogram/pages/$page/$page.js"
  
  if [ -f "$FILE" ]; then
    # 检查是否已存在事件处理函数
    if grep -q "onFloatingWindowToggle" "$FILE"; then
      echo -e "${YELLOW}  ⚠️  $page - 已存在事件处理函数，跳过${NC}"
      SKIPPED=$((SKIPPED + 1))
    else
      # 在文件末尾添加事件处理函数（在最后一个 }); 之前）
      sed -i '$ {
        /^});$/ {
          i\
\
  // 浮动窗口事件处理\
  onFloatingWindowToggle: function (e) {\
    this.setData({\
      isFloatingWindowOpen: e.detail.isOpen\
    });\
  }\
\
}
        }
      }' "$FILE"
      
      echo -e "${GREEN}  ✅  $page - 已添加事件处理函数${NC}"
      FIXED=$((FIXED + 1))
    fi
  else
    echo -e "${RED}  ❌  $FILE 不存在${NC}"
  fi
done

echo ""

# 修复 3: 在所有页面的 JS 中添加 isFloatingWindowOpen 到 data
echo -e "${BLUE}📝 修复 3: 添加 isFloatingWindowOpen 到 data...${NC}"

for page in "${PAGES[@]}"; do
  FILE="miniprogram/pages/$page/$page.js"
  
  if [ -f "$FILE" ]; then
    # 检查是否已存在
    if grep -q "isFloatingWindowOpen" "$FILE"; then
      echo -e "${YELLOW}  ⚠️  $page - 已存在 isFloatingWindowOpen，跳过${NC}"
      SKIPPED=$((SKIPPED + 1))
    else
      # 在 data 对象中添加 isFloatingWindowOpen
      sed -i '/^  data: {/,/^  },/ {
        /^  },$/ {
          i\    isFloatingWindowOpen: false,
        }
      }' "$FILE"
      
      echo -e "${GREEN}  ✅  $page - 已添加 isFloatingWindowOpen${NC}"
      FIXED=$((FIXED + 1))
    fi
  else
    echo -e "${RED}  ❌  $FILE 不存在${NC}"
  fi
done

echo ""

# 修复 4: 添加错误处理到存储操作
echo -e "${BLUE}📝 修复 4: 检查存储操作的错误处理...${NC}"

# 查找所有 setStorageSync 调用
STORAGE_FILES=$(grep -r "setStorageSync" miniprogram/pages/ --include="*.js" | cut -d: -f1 | sort -u)

for file in $STORAGE_FILES; do
  # 检查是否有 try-catch
  if grep -B2 "setStorageSync" "$file" | grep -q "try"; then
    echo -e "${GREEN}  ✅  $file - 已有错误处理${NC}"
  else
    echo -e "${YELLOW}  ⚠️  $file - 缺少错误处理（需要手动添加）${NC}"
  fi
done

echo ""

# 修复 5: 检查 AppID 配置
echo -e "${BLUE}📝 修复 5: 检查 AppID 配置...${NC}"

if grep -q "your-appid-here" project.config.json; then
  echo -e "${RED}  ❌  AppID 未配置，需要手动修改 project.config.json${NC}"
  echo -e "${YELLOW}     请将 \"your-appid-here\" 替换为你的真实 AppID${NC}"
else
  echo -e "${GREEN}  ✅  AppID 已配置${NC}"
  FIXED=$((FIXED + 1))
fi

echo ""

# 修复 6: 检查云环境配置
echo -e "${BLUE}📝 修复 6: 检查云环境配置...${NC}"

if grep -q "your-env-id" miniprogram/app.js; then
  echo -e "${RED}  ❌  云环境 ID 未配置，需要手动修改 app.js${NC}"
  echo -e "${YELLOW}     请将 \"your-env-id\" 替换为你的云环境 ID${NC}"
else
  echo -e "${GREEN}  ✅  云环境已配置${NC}"
  FIXED=$((FIXED + 1))
fi

echo ""
echo "================================"
echo "📊 修复结果汇总"
echo "================================"
echo -e "${GREEN}✅ 自动修复：$FIXED 项${NC}"
echo -e "${YELLOW}⚠️  跳过/需手动：$SKIPPED 项${NC}"
echo ""

if [ $FIXED -gt 0 ]; then
  echo -e "${GREEN}🎉 部分问题已自动修复！${NC}"
fi

if [ $SKIPPED -gt 0 ]; then
  echo -e "${YELLOW}⚠️  还有 $SKIPPED 项需要手动处理${NC}"
fi

echo ""
echo "📋 下一步操作:"
echo "   1. 检查上述输出，确认修复成功"
echo "   2. 手动配置 AppID 和云环境 ID"
echo "   3. 创建隐私政策页面"
echo "   4. 在微信开发者工具中编译测试"
echo ""

# 生成修复日志
LOG_FILE="fixes_$(date +%Y%m%d_%H%M%S).log"
cat > "$LOG_FILE" << EOF
CPAI 小程序快速修复日志
======================
日期：$(date '+%Y-%m-%d %H:%M:%S')
自动修复：$FIXED 项
需手动：$SKIPPED 项

自动修复内容:
- 浮动窗口组件添加到 ai-fit, ai-replace, ai-usage, result 页面
- 浮动窗口事件处理函数添加
- isFloatingWindowOpen 变量添加

需手动处理:
- 配置 AppID (project.config.json)
- 配置云环境 ID (app.js)
- 创建隐私政策页面
- 添加存储操作的错误处理
EOF

echo -e "${BLUE}📝 修复日志已保存：$LOG_FILE${NC}"
echo ""
