Feature: Verificar que el frontend se carga correctamente

  Scenario: Cargar la página principal del frontend
    Given url 'https://frontend.taekwondo4all.cat/'
    When method GET
    Then status 200
    And match response.toLowerCase() contains '<!doctype html>'
