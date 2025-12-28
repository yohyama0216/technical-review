#!/bin/bash
# CI Tools Execution Script for Linux/Mac

echo ""
echo "========================================"
echo "  CI TOOLS EXECUTION"
echo "========================================"
echo ""

ERROR_COUNT=0

# 1. Laravel Pint
echo "[1/3] Running Laravel Pint..."
vendor/bin/pint --test
if [ $? -eq 0 ]; then
    echo "✅ Pint: PASSED"
else
    echo "❌ Pint: FAILED"
    ((ERROR_COUNT++))
fi

# 2. PHPStan (Larastan)
echo ""
echo "[2/3] Running PHPStan (Larastan)..."
vendor/bin/phpstan analyse --memory-limit=1G --no-progress
if [ $? -eq 0 ]; then
    echo "✅ PHPStan: PASSED"
else
    echo "❌ PHPStan: FAILED"
    ((ERROR_COUNT++))
fi

# 3. PHPUnit Tests
echo ""
echo "[3/3] Running PHPUnit Tests..."
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
