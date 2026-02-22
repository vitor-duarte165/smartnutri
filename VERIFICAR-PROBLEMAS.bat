@echo off
title SmartNutri - Verificando Problemas
color 0E

echo ========================================
echo   SmartNutri - Diagnostico de Problemas
echo ========================================
echo.

echo [1/5] Verificando Node.js...
where node >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [ERRO] Node.js nao encontrado!
    echo Instale o Node.js primeiro.
    pause
    exit /b 1
) else (
    echo [OK] Node.js encontrado!
    node --version
)
echo.

echo [2/5] Verificando dependencias...
if not exist "node_modules" (
    echo [AVISO] Dependencias nao encontradas!
    echo Execute: npm install
    echo.
) else (
    echo [OK] Dependencias instaladas!
)
echo.

echo [3/5] Verificando arquivos principais...
if exist "src\main.jsx" (
    echo [OK] src\main.jsx encontrado
) else (
    echo [ERRO] src\main.jsx NAO encontrado!
)
if exist "src\App.jsx" (
    echo [OK] src\App.jsx encontrado
) else (
    echo [ERRO] src\App.jsx NAO encontrado!
)
if exist "index.html" (
    echo [OK] index.html encontrado
) else (
    echo [ERRO] index.html NAO encontrado!
)
echo.

echo [4/5] Verificando servidor...
timeout /t 2 /nobreak >nul
powershell -Command "$response = try { Invoke-WebRequest -Uri 'http://localhost:5173' -TimeoutSec 1 -UseBasicParsing; $true } catch { $false }; if ($response) { Write-Host '[OK] Servidor esta rodando em http://localhost:5173' } else { Write-Host '[AVISO] Servidor nao esta rodando. Execute: npm run dev' }"
echo.

echo [5/5] Testando build...
echo Executando build de teste...
cd /d "%~dp0"
npm run build >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo [OK] Build funcionando corretamente!
) else (
    echo [ERRO] Build falhou! Verifique os erros acima.
)
echo.

echo ========================================
echo   DIAGNOSTICO CONCLUIDO
echo ========================================
echo.
echo Se houver erros acima, corrija-os.
echo Se tudo estiver OK mas o site nao abre:
echo   1. Abra o navegador
echo   2. Pressione F12
echo   3. Vá na aba Console
echo   4. Veja os erros em vermelho
echo   5. Me envie os erros!
echo.
pause
