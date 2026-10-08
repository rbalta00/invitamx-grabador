@echo off
chcp 65001 >nul
color 0A
cls

echo.
echo ========================================
echo   🎬 GRABADOR AUTOMÁTICO invitamx
echo ========================================
echo.

REM Verificar si Node.js está instalado
node --version >nul 2>&1
if errorlevel 1 (
    color 0C
    echo.
    echo ❌ ERROR: Node.js no está instalado
    echo.
    echo Descarga desde: https://nodejs.org (versión LTS)
    echo Después, reinicia esta carpeta
    echo.
    pause
    exit /b 1
)

echo ✅ Node.js detectado
node --version
echo.

REM Verificar si node_modules existe
if not exist node_modules (
    echo 📦 Instalando dependencias (Playwright)...
    echo    Esto toma 2-3 minutos la primera vez
    echo.
    call npm install
    if errorlevel 1 (
        color 0C
        echo.
        echo ❌ Error durante la instalación
        pause
        exit /b 1
    )
    echo ✅ Instalación completada
    echo.
)

REM Ejecutar el grabador
echo ========================================
echo   🚀 Iniciando grabación...
echo ========================================
echo.
echo 👀 Mira tu pantalla (Chrome se abrirá automáticamente)
echo ⏱️  Espera ~30 segundos
echo 📹 El video se grabará mientras sucede todo
echo.

call npm start

echo.
echo ========================================
echo   ✅ ¡LISTO!
echo ========================================
echo.
echo Tu video está en: videos\invitamx-demo-30s.webm
echo.
pause
