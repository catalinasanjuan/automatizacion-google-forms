// Importamos Playwright
const { chromium } = require('@playwright/test');

// URL del formulario
const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSc0XHGox-Hcrxk7rboS2oV7mHKoJWbHkGeLR2xkHX8See9R5A/viewform";

// Definimos respuestas (no son necesarias en esta versión porque seleccionaremos al azar)
async function llenarGoogleForms() {
  const browser = await chromium.launch({ headless: false }); // Mostrar navegador
  const page = await browser.newPage();

  for (let i = 0; i < 10; i++) { // Cambia 10 por 50 si quieres
    console.log(`Enviando respuesta ${i + 1}...`);

    await page.goto(FORM_URL);
    await page.waitForSelector("div[role='radiogroup']", { timeout: 5000 });

    // Capturamos todas las preguntas de tipo radio group
    const preguntas = await page.$$("div[role='radiogroup']");

    for (const pregunta of preguntas) {
      const opciones = await pregunta.$$("div[role='radio']");
      if (opciones.length > 0) {
        const opcionRandom = opciones[Math.floor(Math.random() * opciones.length)];
        await opcionRandom.click();
        await page.waitForTimeout(1000); // Espera breve entre clicks
      }
    }

    // Botón de enviar
    const submitButton = await page.$("div[role='button']:has-text('Enviar')");
    if (submitButton) {
      await submitButton.click();
    }

    console.log(`Respuesta ${i + 1} enviada.`);

    // Esperamos un poco antes de intentar enviar otra respuesta
    await page.waitForTimeout(3000);
    const anotherResponseButton = await page.$("a:has-text('Enviar otra respuesta')");
    if (anotherResponseButton) {
      await anotherResponseButton.click();
      await page.waitForTimeout(2000);
    }
  }

  console.log("Finalizado: 10 respuestas enviadas.");
  await browser.close();
}

llenarGoogleForms();
