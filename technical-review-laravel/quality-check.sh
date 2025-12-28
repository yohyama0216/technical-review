#!/bin/bash
# Code Quality Tools Execution Script for Linux/Mac

echo ""
echo "========================================"
echo "  CODE QUALITY CHECKS"
echo "========================================"
echo ""

ERROR_COUNT=0

# 1. Psalm
echo "[1/2] Running Psalm (Static Analysis)..."
vendor/bin/psalm --show-info=false --no-progress
if [ $? -eq 0 ]; then
    echo "✅ Psalm: PASSED"
else
    echo "❌ Psalm: FAILED"
    ((ERROR_COUNT++))
fi

# 2. PHPMD
echo ""
echo "[2/2] Running PHPMD..."
vendor/bin/phpmd app text phpmd.xml
if [ $? -eq 0 ]; then
    echo "✅ PHPMD: PASSED"
elif [ $? -eq 2 ]; then
    echo "⚠️  PHPMD: WARNINGS FOUND"
else
    echo "❌ PHPMD: FAILED"
    ((ERROR_COUNT++))
fi

# Summary
echo ""
echo "========================================"
if [ $ERROR_COUNT -eq 0 ]; then
    echo "  ✅ ALL QUALITY CHECKS PASSED"
    echo "========================================"
    echo ""
    exit 0
else
    echo "  ❌ $ERROR_COUNT CHECK(S) FAILED"
    echo "========================================"
    echo ""
    exit 1
fi
