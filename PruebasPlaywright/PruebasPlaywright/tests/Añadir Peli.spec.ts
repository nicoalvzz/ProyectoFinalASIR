import { test, expect } from '@playwright/test';

test('Añadir película Gladiator y comprobar que solo se añade una vez', async ({ page }) => {
  const movieTitle = 'Gladiator';
  const movieSelector = '.movie-card h2';

  // Ir a la página
  await page.goto('https://frontend.taekwondo4all.cat/');

  // Esperar a que las películas se hayan renderizado
  await page.waitForSelector(movieSelector);

  // Comprobar cuántas veces aparece Gladiator al inicio
  const movieCards = page.locator(movieSelector, { hasText: movieTitle });
  const countBefore = await movieCards.count();

  // Si ya está, comprobar que sigue estando la misma cantidad y salir
  if (countBefore > 0) {
    console.log(`ℹ️ La película "${movieTitle}" ya existe (${countBefore}). No se añadió de nuevo.`);
    await expect(movieCards).toHaveCount(countBefore);
    return;
  }

  // Abrir formulario
  await page.click('.toggle-form > .btn');

  // Rellenar formulario
  await page.fill('#title', movieTitle);
  await page.fill('#description', 'A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.');
  await page.fill('#genre', 'Action, Drama, Adventure');
  await page.fill('#director', 'Ridley Scott');
  await page.fill('#releaseDate', '2000-05-05');
  await page.fill('#rating', '8.5');
  await page.fill('#actors', 'Russell Crowe, Joaquin Phoenix, Connie Nielsen');
  await page.fill('#posterUrl', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDq66Co-asItMEZEokWJ_PX53koKSgJdbqbQ&s');

  // Enviar formulario y esperar a que se actualice la lista
  await Promise.all([
    page.waitForResponse(resp => resp.url().includes('/api') && resp.status() === 200),
    page.click('.movie-form > .btn')
  ]);

  // Esperar a que la nueva película aparezca
  await expect(movieCards).toHaveCount(1, { timeout: 5000 });

  console.log('✅ La película Gladiator se ha añadido correctamente sin duplicados.');
});
