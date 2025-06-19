import { test, expect } from '@playwright/test';

test('Eliminar película Gladiator y comprobar que las palomitas siguen existiendo', async ({ page }) => {
  const movieTitle = 'Gladiator';
  const movieSelector = '.movie-card';
  const titleSelector = '.movie-card h2';
  const deleteButtonSelector = '.btn.red';
  const popcornSelector = '.emoji-popcorn';

  // Ir a la página
  await page.goto('https://frontend.taekwondo4all.cat/');

  // Esperar a que se carguen las películas
  await page.waitForSelector(titleSelector);

  // Buscar la tarjeta de la película Gladiator
  const gladiatorCards = page.locator(movieSelector, { hasText: movieTitle });
  const count = await gladiatorCards.count();

  if (count === 0) {
    console.log(`⚠️ La película "${movieTitle}" no se encontró para eliminar.`);
    return;
  }

  // Eliminar todas las instancias de Gladiator (por si hay más de una)
  for (let i = 0; i < count; i++) {
    const deleteBtn = gladiatorCards.nth(i).locator(deleteButtonSelector);
    await deleteBtn.click();

    // Esperar a que se actualice la UI
    await page.waitForTimeout(500); // o usar waitForResponse si hay API call
  }

  // Confirmar que ya no aparece Gladiator
  await expect(page.locator(titleSelector, { hasText: movieTitle })).toHaveCount(0);

  // Confirmar que las palomitas 🍿 siguen presentes en el título
  const popcorn = page.locator(popcornSelector);
  await expect(popcorn).toBeVisible();

  console.log('✅ La película Gladiator fue eliminada y las palomitas siguen presentes 🍿');
});
