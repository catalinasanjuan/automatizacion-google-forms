// Importamos test y expect de Playwright
const { test, expect } = require('@playwright/test');

test('El formulario de Google Forms carga correctamente', async ({ page }) => {
  await page.goto('https://docs.google.com/forms/d/e/1FAIpQLSc0XHGox-Hcrxk7rboS2oV7mHKoJWbHkGeLR2xkHX8See9R5A/viewform');

  // Verificamos que el botón "Enviar" esté visible
  const submitButton = page.locator("div[role='button']:has-text('Enviar')");
  await expect(submitButton).toBeVisible();
});
