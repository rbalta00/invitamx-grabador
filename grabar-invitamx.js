#!/usr/bin/env node

/**
 * Script para grabar video automático del generador InvitaMX (30 segundos)
 *
 * INSTRUCCIONES:
 * 1. Instala Node.js desde nodejs.org (si no lo tienes)
 * 2. Abre PowerShell en la carpeta donde copies este archivo
 * 3. npm install playwright
 * 4. node grabar-invitamx.js
 *
 * El video se guardará en: ./videos/invitamx-demo-30s.webm
 *
 * ⚠️ IMPORTANTE (actualizado 2026-11-20): el generador vigente es
 * `administradorinvitamx`, con dirección pública **https://invitaciones.invitamx.app**
 * (dominio nuevo desde el 19 de noviembre de 2026; el proyecto de Vercel
 * sigue siendo el mismo, administradorinvitamx.vercel.app también sigue
 * respondiendo). NO confundir con invitamx.vercel.app (ese es un repo
 * totalmente distinto, ya en pausa, sin relación con este dominio nuevo).
 * El editor completo de administradorinvitamx está protegido con HTTP Basic Auth desde el
 * 2026-07-31 (ver middleware.ts de ese repo) -- este script NO puede pasar
 * esa pantalla de login de forma automática (no trae ni debe traer la
 * contraseña del administrador escrita aquí). Para volver a grabar un video
 * de demo del editor real hace falta O BIEN: (a) correr este script contra
 * un `npm run dev` LOCAL de administradorinvitamx (sin middleware de Basic
 * Auth en modo dev), o (b) adaptarlo para que Playwright inicie sesión con
 * usuario/contraseña reales que tú mismo le pases por variable de entorno
 * en el momento de correrlo (nunca escritos en este archivo).
 *
 * Además, el flujo real del editor de administradorinvitamx ya NO es un
 * formulario lineal de 3 campos (nombre/fecha/lugar) seguido de un botón
 * "Generar" -- es un editor con varias pestañas (Quinceañera, Direcciones,
 * Agenda y Vestido, Familia, Regalos, Galería de Fotos, Invitados, A Medida)
 * y vista previa en vivo; no hay un botón único de "generar la invitación
 * completa". Los selectores de abajo se dejaron funcionales para la
 * selección de TEMA (que sí sigue siendo una grilla de botones, cada uno
 * con el nombre del tema, ej. "Dorado Clásico ✨" -- buscar "dorado" sigue
 * encontrándolo), pero el resto del flujo (llenar 3 inputs y dar "Generar")
 * ya no corresponde a esta app y necesitaría rediseñarse contra las pestañas
 * reales si se quiere automatizar de nuevo.
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  console.log('🎬 ========================================');
  console.log('   GRABADOR AUTOMÁTICO - invitamx demo');
  console.log('========================================\n');

  // Crear directorio de salida
  const outputDir = path.join(process.cwd(), 'videos');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
    console.log(`✅ Carpeta creada: ${outputDir}\n`);
  }

  const browser = await chromium.launch({ 
    headless: false, // Ver navegador en tiempo real
    slowMo: 50, // Simula movimientos humanos
  });
  
  const context = await browser.newContext({
    recordVideo: { dir: outputDir },
    viewport: { width: 1080, height: 1920 }, // Vertical para Meta Ads
  });

  const page = await context.newPage();
  let videoPath = null;

  try {
    console.log('📱 Abriendo invitaciones.invitamx.app...\n');
    console.log('⚠️  Si el editor pide usuario/contraseña (Basic Auth), este script se\n' +
                 '    quedará bloqueado ahí -- ver nota al inicio del archivo.\n');
    await page.goto('https://invitaciones.invitamx.app', { waitUntil: 'networkidle' });
    
    console.log('⏳ Tiempo 0:00-0:02 → Pantalla inicial\n');
    await page.waitForTimeout(2000);

    console.log('⏳ Tiempo 0:02-0:06 → Scrolleando temas\n');
    await page.evaluate(() => window.scrollBy(0, 400));
    await page.waitForTimeout(2000);

    console.log('🎨 Tiempo 0:06-0:08 → Seleccionando tema\n');
    
    // Intenta encontrar botón de tema por múltiples selectores
    let clicked = false;
    
    // Opción 1: data-theme
    const themeByData = await page.$('[data-theme]');
    if (themeByData) {
      await themeByData.click();
      clicked = true;
      console.log('✅ Tema clickeado (data-theme)\n');
    }
    
    // Opción 2: clase específica
    if (!clicked) {
      const themeByClass = await page.$('.tema, .theme-card, .theme-option');
      if (themeByClass) {
        await themeByClass.click();
        clicked = true;
        console.log('✅ Tema clickeado (class selector)\n');
      }
    }
    
    // Opción 3: button con texto
    if (!clicked) {
      const buttons = await page.$$('button');
      for (let btn of buttons) {
        const text = await btn.textContent();
        if (text && text.toLowerCase().includes('dorado')) {
          await btn.click();
          clicked = true;
          console.log('✅ Tema clickeado (por texto)\n');
          break;
        }
      }
    }

    if (!clicked) {
      console.log('⚠️  No se encontró botón de tema, continuando...\n');
      // Click en primer botón como fallback
      const firstBtn = await page.$('button');
      if (firstBtn) await firstBtn.click();
    }

    await page.waitForTimeout(1500);

    console.log('📝 Tiempo 0:08-0:16 → Llenando formulario\n');
    
    // Buscar solo inputs visibles y editables
    const allInputs = await page.$$('input:not([type="submit"]):not([type="hidden"]):not([type="checkbox"]):not([type="radio"])');
    const inputs = [];
    for (let input of allInputs) {
      if (await input.isVisible() && await input.isEditable()) inputs.push(input);
    }
    console.log(`  → Inputs visibles encontrados: ${inputs.length}\n`);

    if (inputs.length > 0) {
      // Campo 1: Nombre
      console.log('  → Escribiendo: "Hannia"');
      await inputs[0].scrollIntoViewIfNeeded();
      await inputs[0].click();
      await inputs[0].fill('Hannia');
      await page.waitForTimeout(400);

      // Campo 2: Fecha (si existe)
      if (inputs[1]) {
        console.log('  → Escribiendo: "15062024"');
        await inputs[1].scrollIntoViewIfNeeded();
        await inputs[1].click();
        await inputs[1].fill('15062024');
        await page.waitForTimeout(400);
      }

      // Campo 3: Lugar (si existe)
      if (inputs[2]) {
        console.log('  → Escribiendo: "Puebla, Mexico"');
        await inputs[2].scrollIntoViewIfNeeded();
        await inputs[2].click();
        await inputs[2].fill('Puebla, Mexico');
        await page.waitForTimeout(400);
      }
    }

    await page.waitForTimeout(1500);
    console.log('\n');

    console.log('⏳ Tiempo 0:16-0:18 → Scrolleando hacia botón\n');
    await page.evaluate(() => window.scrollBy(0, 250));
    await page.waitForTimeout(1200);

    console.log('🔄 Tiempo 0:18-0:22 → Generando invitación\n');
    
    // Buscar botón generar
    const buttons = await page.$$('button');
    let generarClicked = false;
    
    for (let btn of buttons) {
      const text = await btn.textContent();
      if (text && (text.toLowerCase().includes('generar') || 
                   text.toLowerCase().includes('crear') || 
                   text.toLowerCase().includes('continue'))) {
        await btn.click();
        generarClicked = true;
        console.log('✅ Botón "Generar" clickeado\n');
        break;
      }
    }

    if (!generarClicked && buttons.length > 0) {
      console.log('⚠️  Botón generar no encontrado, clickeando primer botón\n');
      await buttons[0].click();
    }

    console.log('⏳ Esperando generación (loading)...\n');
    await page.waitForTimeout(3500);

    console.log('✨ Tiempo 0:22-0:26 → Preview de invitación\n');
    await page.evaluate(() => window.scrollBy(0, 300));
    await page.waitForTimeout(2500);

    console.log('📱 Tiempo 0:26-0:30 → Opción de compartir\n');
    
    // Buscar botón compartir
    const shareButtons = await page.$$('button');
    for (let btn of shareButtons) {
      const text = await btn.textContent();
      if (text && (text.toLowerCase().includes('compartir') || 
                   text.toLowerCase().includes('whatsapp') || 
                   text.toLowerCase().includes('share'))) {
        await btn.click();
        console.log('✅ Botón "Compartir" clickeado\n');
        break;
      }
    }

    await page.waitForTimeout(2000);

  } catch (error) {
    console.error('\n❌ Error:', error.message);
  } finally {
    console.log('\n========================================');
    console.log('✅ FINALIZANDO GRABACIÓN...\n');
    
    const videoInfo = await context.close();
    await browser.close();

    // Esperar a que se escriba el archivo
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Buscar archivo de video
    const files = fs.readdirSync(outputDir);
    const videoFile = files.find(f => f.endsWith('.webm') || f.endsWith('.mp4'));
    
    if (videoFile) {
      videoPath = path.join(outputDir, videoFile);
      const stats = fs.statSync(videoPath);
      const sizeMB = (stats.size / 1024 / 1024).toFixed(2);
      
      console.log('========================================');
      console.log('✨ VIDEO GRABADO EXITOSAMENTE ✨');
      console.log('========================================\n');
      console.log(`📁 Ubicación: ${videoPath}`);
      console.log(`📊 Tamaño: ${sizeMB} MB`);
      console.log(`⏱️  Duración: ~30 segundos (formato vertical)\n`);
      console.log('Próximos pasos:');
      console.log('1. Abre CapCut');
      console.log('2. Importa el video');
      console.log('3. Agrega texto, música y transiciones');
      console.log('4. Exporta en 1080×1920 para Meta Ads\n');
    } else {
      console.log('⚠️  No se encontró archivo de video');
      console.log(`📁 Revisa: ${outputDir}\n`);
    }
  }
})();
