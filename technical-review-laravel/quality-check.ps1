#!/usr/bin/env pwsh
# Code Quality Tools Execution Script for Windows

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  CODE QUALITY CHECKS" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

$ErrorCount = 0

# 1. Psalm
Write-Host "[1/2] Running Psalm (Static Analysis)..." -ForegroundColor Yellow
vendor/bin/psalm --show-info=false --no-progress
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Psalm: PASSED" -ForegroundColor Green
} else {
    Write-Host "❌ Psalm: FAILED" -ForegroundColor Red
    $ErrorCount++
}

# 2. PHPMD
Write-Host "`n[2/2] Running PHPMD..." -ForegroundColor Yellow
vendor/bin/phpmd app text phpmd.xml
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ PHPMD: PASSED" -ForegroundColor Green
} elseif ($LASTEXITCODE -eq 2) {
    Write-Host "⚠️  PHPMD: WARNINGS FOUND" -ForegroundColor Yellow
} else {
    Write-Host "❌ PHPMD: FAILED" -ForegroundColor Red
    $ErrorCount++
}

# Summary
Write-Host "`n========================================" -ForegroundColor Cyan
if ($ErrorCount -eq 0) {
    Write-Host "  ✅ ALL QUALITY CHECKS PASSED" -ForegroundColor Green
    Write-Host "========================================`n" -ForegroundColor Cyan
    exit 0
} else {
    Write-Host "  ❌ $ErrorCount CHECK(S) FAILED" -ForegroundColor Red
    Write-Host "========================================`n" -ForegroundColor Cyan
    exit 1
}
