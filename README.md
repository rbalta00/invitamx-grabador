# 🎬 GRABADOR AUTOMÁTICO invitamx — 30 SEGUNDOS

**¿Qué hace?** Abre Chrome, entra a invitamx, llena datos y graba TODO en video. Sin que hagas nada.

---

## ⚡ INICIO RÁPIDO (3 PASOS)

### **PASO 1: Verifica que tengas Node.js instalado**

Abre **PowerShell** y escribe:

```powershell
node --version
```

Si ve algo como `v18.0.0` → ✅ Tienes Node.js

**Si dice "no se reconoce el comando":**
- Descarga Node.js: https://nodejs.org (versión LTS recomendada)
- Instala y reinicia PowerShell

---

### **PASO 2: Instala las herramientas**

En esta carpeta (`invitamx-grabador`), abre **PowerShell** y escribe:

```powershell
npm install
```

Presiona Enter. **Espera 2-3 minutos** mientras descarga Playwright y Chrome.

*(Verás líneas que dicen "added X packages")*

---

### **PASO 3: Ejecuta el grabador**

En la misma PowerShell, escribe:

```powershell
npm start
```

O simplemente:

```powershell
node grabar-invitamx.js
```

---

## 🎥 ¿QUÉ PASA AHORA?

1. **Chrome se abre automáticamente** ← Mira tu pantalla
2. Entra a invitaciones.invitamx.app
3. Elige tema "Dorado Clásico"
4. Llena datos (nombre: Hannia, fecha, lugar)
5. Clickea "Generar invitación"
6. Ve el resultado
7. Clickea "Compartir"

**TODO ESTO SE GRABA EN VIDEO.** Tú solo ves cómo sucede.

---

## ✅ VIDEO LISTO

Cuando termina, verás:

```
========================================
✨ VIDEO GRABADO EXITOSAMENTE ✨
========================================

📁 Ubicación: invitamx-grabador\videos\invitamx-demo-30s.webm
📊 Tamaño: 45.23 MB
⏱️  Duración: ~30 segundos (formato vertical)
```

---

## 📁 ARCHIVOS IMPORTANTES

```
invitamx-grabador/
├── grabar-invitamx.js        ← El script robot
├── package.json               ← Configuración
├── README.md                  ← Este archivo
├── INICIO_RAPIDO.bat          ← Atajo para Windows (opcional)
└── videos/                    ← Aquí aparece tu video
    └── invitamx-demo-30s.webm ← Tu video grabado
```

---

## 🎬 PRÓXIMOS PASOS: EDITAR EN CAPCUT

1. **Abre CapCut** en tu PC
2. **Nuevo proyecto** → Formato vertical
3. **Importa el video:** `videos\invitamx-demo-30s.webm`
4. **Agrega:**
   - Texto: "¿XV años en 3 meses?"
   - Texto: "Con invitamx, lo haces en MINUTOS"
   - Música energética (30 segundos)
   - Transiciones entre clips
5. **Exporta:** 1080×1920, 30fps, formato MP4

---

## 🆘 TROUBLESHOOTING

### ❌ "node: no se reconoce el comando"
**Solución:** Node.js no está instalado. Descarga desde https://nodejs.org

### ❌ "npm: no se reconoce el comando"
**Solución:** Reinicia PowerShell después de instalar Node.js

### ❌ Error descargando Playwright
**Solución:** Revisa conexión a internet. Si sigue fallando, ejecuta:
```powershell
npm install -g @playwright/test
npx playwright install chromium
```

### ❌ Chrome no abre
**Solución:** Revisa que no tengas Chrome con más de 10 pestañas abiertas. Ciérralo y vuelve a intentar.

### ❌ El video no aparece en la carpeta `videos/`
**Solución:** Revisa que la carpeta tenga permisos de escritura. Si no, copia `videos/` a `C:\Temp\` y vuelve a intentar.

---

## 🎯 DATOS POR DEFECTO

El script usa estos datos (puedes modificar en `grabar-invitamx.js`):

- **Nombre quinceañera:** Hannia
- **Fecha:** 15062024 (15 de junio 2024)
- **Lugar:** Puebla, Mexico
- **Tema:** Dorado Clásico (primer tema)

Para cambiar, abre `grabar-invitamx.js` con bloc de notas y busca estas líneas:

```javascript
await page.keyboard.type('Hannia', { delay: 60 });
await page.keyboard.type('15062024', { delay: 100 });
await page.keyboard.type('Puebla, Mexico', { delay: 60 });
```

---

## ⚙️ CONFIGURACIÓN AVANZADA

**Cambiar resolución del video:**

En `grabar-invitamx.js`, busca:
```javascript
viewport: { width: 1080, height: 1920 }
```

Cambia a:
- `1440x1080` para horizontal
- `720x1280` para móvil pequeño

**Cambiar velocidad de typing:**

Busca `{ delay: 60 }` y cambia el número:
- 30 = más rápido
- 100 = más lento

---

## 📞 ¿ALGO NO FUNCIONA?

1. **Copia el error exacto** que ves en PowerShell
2. **Toma screenshot** de la pantalla
3. **Mándalo a Isaac**

---

## 📝 HISTORIAL DE CAMBIOS

- **v1.0** (2024) - Versión inicial
  - Graba 30 segundos automáticamente
  - Soporta invitamx.vercel.app
  - Video vertical 1080×1920

---

**¡Listo! Ejecuta `npm start` y disfruta de tu video. 🚀**
