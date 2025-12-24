#!/bin/bash
# CI Tools Execution Script for Linux/Mac

echo ""
echo "========================================"
echo "  CI TOOLS EXECUTION"
echo "========================================"
echo ""

ERROR_COUNT=0

# 1. Laravel Pint
echo "[1/5] Running Laravel Pint..."
vendor/bin/pint --test
if [ $? -eq 0 ]; then
    echo "✅ Pint: PASSED"
else
    echo "❌ Pint: FAILED"
    ((ERROR_COUNT++))
fi

# 2. PHPStan
echo ""
echo "[2/5] Running PHPStan Level 7..."
vendor/bin/phpstan analyse --level=7 --memory-limit=512M --no-progress
if [ $? -eq 0 ]; then
    echo "✅ PHPStan: PASSED"
else
    echo "❌ PHPStan: FAILED"
    ((ERROR_COUNT++))
fi

# 3. PHPMD
echo ""
echo "[3/5] Running PHPMD..."
vendor/bin/phpmd app/ text phpmd.xml
if [ $? -eq 0 ] || [ $? -eq 2 ]; then
    echo "✅ PHPMD: PASSED (or warnings only)"
else
    echo "⚠️  PHPMD: WARNINGS FOUND"
fi

# 4. PHP Insights
echo ""
echo "[4/5] Running PHP Insights..."
php artisan insights --no-interaction --format=console --min-quality=90 --min-complexity=90 --min-architecture=90 --min-style=85
if [ $? -eq 0 ]; then
    echo "✅ PHP Insights: PASSED"
else
    echo "❌ PHP Insights: FAILED"
    ((ERROR_COUNT++))
fi

# 5. PHPUnit Tests
echo ""
echo "[5/5] Running PHPUnit Tests..."
php artisan test
if [ $? -eq 0 ]; then
    echo "✅ Tests: PASSED"
else
    echo "❌ Tests: FAILED"
    ((ERROR_COUNT++))
fi

# Summary
echo ""
echo "========================================"
if [ $ERROR_COUNT -eq 0 ]; then
    echo "  ✅ ALL CHECKS PASSED"
    echo "========================================"
    echo ""
    exit 0
else
    echo "  ❌ $ERROR_COUNT CHECK(S) FAILED"
    echo "========================================"
    echo ""
    exit 1
fi
