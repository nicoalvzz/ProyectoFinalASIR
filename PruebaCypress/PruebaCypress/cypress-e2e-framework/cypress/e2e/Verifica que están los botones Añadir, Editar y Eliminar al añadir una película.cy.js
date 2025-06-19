it('Verifica que están los botones Añadir, Editar y Eliminar al añadir una película', () => {
    cy.visit('https://frontend.taekwondo4all.cat/');
  
    // Comprobar botón "Añadir Película"
    cy.get('.toggle-form > .btn')
      .should('be.visible')
      .and('contain.text', 'Añadir Película');
  
    // Añadir película nueva (nombre único para evitar conflicto)
    cy.get('.toggle-form > .btn').click();
    cy.get('#title').type("Interstellar");
    cy.get('#description').type("A team of explorers travels through a wormhole in space in an attempt to ensure humanity's survival.");
    cy.get('#genre').type("Sci-Fi, Aventura, Drama");
    cy.get('#director').type("Christopher Nolan");
    cy.get('#releaseDate').type("2014-07-11");
    cy.get('#rating').type("8.6");
    cy.get('#actors').type("Matthew McConaughey, Anne Hathaway, Jessica Chastain");
    cy.get('#posterUrl').type("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQDKbNNnKeNhqwPP9tAvy2IjaHznBDu2VViQ&s");
    cy.get('.movie-form > .btn').click();
  
    cy.wait(1000);
  
    // Buscar la película recién añadida y comprobar los botones dentro de su tarjeta
    cy.get('.movie-list')
      .contains('Interstellar')
      .parents('.movie-card') // Ajusta si no usas .movie-card
      .within(() => {
        cy.contains('Editar').should('be.visible');
        cy.contains('Eliminar').should('be.visible');
      });
  
    cy.log('Botones Añadir, Editar y Eliminar verificados correctamente');
  });
  