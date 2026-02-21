@echo off
title SmartNutri
color 0A

echo ========================================
echo   SmartNutri - Abrindo no Navegador
echo ========================================
echo.

cd /d "%~dp0"

REM Verifica se o servidor já está rodando
powershell -Command "$response = try { Invoke-WebRequest -Uri 'http://localhost:5173' -TimeoutSec 1 -UseBasicParsing; $true } catch { $false }; if ($response) { Start-Process 'http://localhost:5173' } else { Write-Host 'Servidor nao esta rodando. Execute ABRIR.bat primeiro!' }"

timeout /t 3
