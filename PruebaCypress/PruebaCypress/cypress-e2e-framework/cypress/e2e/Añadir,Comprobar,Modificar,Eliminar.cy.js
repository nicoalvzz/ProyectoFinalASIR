describe('Test Completo Frontend', () => {

  it('Añadir y Comprobar película', () => {
    cy.visit('https://frontend.taekwondo4all.cat/')

    cy.get('.toggle-form > .btn').click();

    cy.get('#title').type("The Prestige");
    cy.get('#description').type("Two rival magicians in 19th-century London battle each other for supremacy, each obsessed with uncovering the secrets of the other's tricks — with deadly consequences.");
    cy.get('#genre').type("Drama, Misterio, Sci-Fi")
    cy.get('#director').type("Christopher Nolan")
    cy.get('#releaseDate').type('2006-10-20')
    cy.get('#rating').type("8.5")
    cy.get('#actors').type("Christian Bale, Hugh Jackman, Scarlett Johansson")
    cy.get('#posterUrl').type("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFC5ZanQtpVbs47alvbVMZV0qukmz_a9yEnA&s")
    cy.get('.movie-form > .btn').click()

    cy.wait(2000)

    cy.get('.movie-list')
      .should('contain.text', 'The Prestige')
      .then(() => {
        cy.log('Existe la película The Prestige');
      });
  });

  it('Actualizar película The Prestige', () => {
    cy.visit('https://frontend.taekwondo4all.cat/')

    cy.wait(1000);

    // Primero nos aseguramos de que existe
    cy.get('.movie-list')
      .contains('The Prestige')
      .parents('.movie-card')
      .within(() => {
        cy.get('button').contains('Edit').click();
      });

    // Cambiar título y guardar
    cy.get('#title').clear().type("El truco final");
    cy.get('.movie-form > .btn').click();

    cy.wait(1000);

    cy.get('.movie-list')
      .should('contain.text', 'El truco final')
      .then(() => {
        cy.log('Película actualizada correctamente');
      });
  });

  it('Eliminar película The Prestige', () => {
    cy.visit('https://frontend.taekwondo4all.cat/')

    cy.wait(1000)

    cy.get('.movie-list')
      .contains('El truco final')
      .parents('.movie-card')
      .within(() => {
        cy.get('button').contains('Eliminar').click();
      });

    cy.wait(1000);

    cy.get('.movie-list')
      .should('not.contain.text', 'El truco final')
      .then(() => {
        cy.log('Película eliminada correctamente');
      });
  });

  

});
