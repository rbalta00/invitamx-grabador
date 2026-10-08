#===========================================
# 🚀 INSTALADOR Y EJECUTOR COMPLETO
# invitamx-grabador v2.0
#===========================================

Write-Host "`n" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Green
Write-Host "🎬 GRABADOR AUTOMÁTICO invitamx" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Green
Write-Host ""

# Colores
$success = "Green"
$error = "Red"
$warning = "Yellow"
$info = "Cyan"

function Write-Success { Write-Host "✅ $args" -ForegroundColor $success }
function Write-Error { Write-Host "❌ $args" -ForegroundColor $error }
function Write-Warning { Write-Host "⚠️  $args" -ForegroundColor $warning }
function Write-Info { Write-Host "ℹ️  $args" -ForegroundColor $info }

# PASO 1: Verificar Node.js
Write-Info "PASO 1: Verificando Node.js..."
try {
    $nodeVersion = & node --version
    Write-Success "Node.js instalado: $nodeVersion"
} catch {
    Write-Error "Node.js NO está instalado"
    Write-Warning "Descargue desde: https://nodejs.org (versión LTS)"
    exit 1
}

# PASO 2: Verificar npm
Write-Info "PASO 2: Verificando npm..."
try {
    $npmVersion = & npm --version
    Write-Success "npm instalado: v$npmVersion"
} catch {
    Write-Error "npm NO está instalado"
    exit 1
}

# PASO 3: Instalar dependencias
Write-Info "PASO 3: Instalando dependencias (esto puede tomar 2-3 minutos)..."
if (!(Test-Path "node_modules")) {
    npm install
    if ($LASTEXITCODE -eq 0) {
        Write-Success "Dependencias instaladas correctamente"
    } else {
        Write-Error "Error instalando dependencias"
        exit 1
    }
} else {
    Write-Success "node_modules ya existe (saltando instalación)"
}

# PASO 4: Instalar navegadores de Playwright
Write-Info "PASO 4: Verificando navegadores de Playwright..."
try {
    & npx playwright install chromium --with-deps
    Write-Success "Playwright preparado"
} catch {
    Write-Warning "Error preparando Playwright, continuando..."
}

# PASO 5: Crear carpetas necesarias
Write-Info "PASO 5: Creando carpetas..."
if (!(Test-Path "videos")) {
    New-Item -ItemType Directory -Path "videos" -Force | Out-Null
    Write-Success "Carpeta 'videos' creada"
} else {
    Write-Success "Carpeta 'videos' ya existe"
}

if (!(Test-Path "logs")) {
    New-Item -ItemType Directory -Path "logs" -Force | Out-Null
    Write-Success "Carpeta 'logs' creada"
} else {
    Write-Success "Carpeta 'logs' ya existe"
}

# PASO 6: Crear .env si no existe
if (!(Test-Path ".env")) {
    Copy-Item ".env.example" ".env" -ErrorAction SilentlyContinue
    Write-Success "Archivo .env creado (copia de .env.example)"
    Write-Info "Edita .env para cambiar valores por defecto"
}

# PASO 7: Mostrar opciones
Write-Host "`n"
Write-Host "=====================================" -ForegroundColor Green
Write-Host "✨ ¡Sistema Listo!" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Green
Write-Host ""

Write-Info "¿Qué deseas hacer?"
Write-Host ""
Write-Host "  1) Ejecutar grabador ahora" -ForegroundColor Cyan
Write-Host "  2) Salir (ejecutar manualmente después)" -ForegroundColor Cyan
Write-Host ""

$choice = Read-Host "Elige (1 o 2)"

if ($choice -eq "1") {
    Write-Info "Iniciando grabador..."
    Write-Host ""
    npm start
} else {
    Write-Info "Para ejecutar después, usa: npm start"
    Write-Info "¡Listo para grabar! 🎬"
}

Write-Host ""
Write-Host "=====================================" -ForegroundColor Green
Write-Host "📁 Video se guardará en: ./videos/" -ForegroundColor Green
Write-Host "📋 Logs se guardarán en: ./logs/" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Green
Write-Host ""
