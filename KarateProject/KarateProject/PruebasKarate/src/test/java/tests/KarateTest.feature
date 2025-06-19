Feature: Obtener la lista de películas

  Scenario: Obtener todas las películas desde la API
    Given url 'https://frontend.taekwondo4all.cat/api/movies'
    When method GET
    Then status 200
    And match response == '#[]'
