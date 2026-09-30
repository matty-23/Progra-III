import { test, expect } from '@playwright/test';

test.describe('Flujo E2E - Endpoint POST de Creación', () => {

    const nombreCarpeta = `Carpeta E2E ${Date.now()}`;

    test.beforeEach(async ({ page }) => {
        await page.goto('/');


        await page.fill('input[name="username"]', 'Administrador');
        await page.fill('input[name="password"]', '123');
        await page.click('button[type="submit"]');
        await page.waitForURL('**/mi-area');
    });

    test('Debe crear una nueva carpeta mediante el endpoint POST y mostrarla en la interfaz', async ({ page }) => {

        await page.click('.btn-floating-action');

        await expect(
            page.locator('button.active', { hasText: 'Carpeta' })
        ).toBeVisible();

        await page.fill(
            'input[placeholder="Nombre de la carpeta"]',
            nombreCarpeta
        );

        const responsePromise = page.waitForResponse(response =>
            response.url().includes('/carpetas/') &&
            response.request().method() === 'POST' &&
            response.status() >= 200 &&
            response.status() < 300
        );

        await page.click('button.btn-confirm:has-text("Crear")');

        const response = await responsePromise;

        expect(response.ok()).toBeTruthy();

        const nuevaCarpetaCard = page.locator(
            '.file-card-title',
            { hasText: nombreCarpeta }
        );

        await expect(nuevaCarpetaCard).toBeVisible();
    });
});
test.describe('Flujo E2E - Validaciones y Casos Alternativos', () => {

  test.beforeEach(async ({ page }) => {
    // Login rápido para llegar a MiArea
    await page.goto('/');
    await page.fill('input[name="username"]', 'Administrador');
    await page.fill('input[name="password"]', '123');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/mi-area');
  });

  test('No debe permitir crear un elemento con el nombre vacío', async ({ page }) => {
    await page.click('.btn-floating-action');

    const inputNombre = page.locator('input[placeholder="Nombre de la carpeta"]');
    await inputNombre.fill('');

    await page.click('button.btn-confirm:has-text("Crear")');
    await expect(inputNombre).toBeVisible();

    const carpetasVacias = page.locator('.file-card-title', { hasText: /^$/ });
    await expect(carpetasVacias).toHaveCount(0);
  });

  test('Debe abortar la creación al hacer clic en Cancelar', async ({ page }) => {
    const nombreDescartado = 'Carpeta Cancelada';
    await page.click('.btn-floating-action');
    await page.fill('input[placeholder="Nombre de la carpeta"]', nombreDescartado);
    await page.click('button.btn-cancel');
    await expect(page.locator('.modal-box')).toBeHidden();
    const tarjetaCancelada = page.locator('.file-card-title', { hasText: nombreDescartado });
    await expect(tarjetaCancelada).toBeHidden();
  });
});