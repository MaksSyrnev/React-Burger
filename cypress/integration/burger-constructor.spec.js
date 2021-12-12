describe('burger constructor component works test', () => {
    before(() => {
        cy.visit('http://localhost:3000');
    });

    it('рендеринг компонентов бургер конструктора', () => {
        cy.contains('Соберите бургер');
    });

    it('загрузка данных ингридиентов', () => {
        cy.contains('Филе');
    });

    it('логин пользователя', () => {
        cy.visit('http://localhost:3000/login');
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(5000);
        cy.contains('Вход');
        cy.get('input').get('[name^=email]').as('email');
        cy.get('@email').type('retro@example.org').should('have.value', 'retro@example.org');
        cy.get('input').get('[name^=password]').as('pass');
        cy.get('@pass').type('123').should('have.value', '123');
        cy.get('[class^=button]').contains('Войти').as('button');
        cy.get('@button').click();
    });



    it('открытие модального окна ингридиента', () => {
        //cy.visit('http://localhost:3000');
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(2000);
        cy.get('[class^=ingredient_product_card]').as('ingredients');
        cy.get('@ingredients').contains('Краторная').first().click();
        cy.get('[class^=modal-overlay_popup]');
        cy.contains('Калории');
        cy.contains('420');
        cy.get('[class^=modal_header]').as('modal');
        cy.get('[class^=modal_button_close]').click();
    });

    it('перетаскивание ингридиентов в заказ', () => {
        cy.get('[class^=ingredient_product_card]').contains('булка').first().as('bun');
        cy.get('@bun').trigger('dragstart');
        cy.get('[class^=burger-constructor]').as('constructor');
        cy.get('@constructor').contains('добавьте булку для бургера').trigger('drop');
        cy.get('[class^=ingredient_product_card]').contains('Филе').first().as('main');
        cy.get('@main').trigger('dragstart');
        cy.get('@constructor').contains('добавьте начинку для бургера').trigger('drop');
    });

    it('оформление заказа', () => {
        cy.get('[class^=button]').contains('Оформить заказ').click();
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(5000);
        cy.contains('Вход');
        cy.get('input').get('[name^=email]').as('email');
        cy.get('@email').type('retro@example.org').should('have.value', 'retro@example.org');
        cy.get('input').get('[name^=password]').as('pass');
        cy.get('@pass').type('123').should('have.value', '123');
        cy.get('[class^=button]').contains('Войти').as('button');
        cy.get('@button').click();
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(5000);
        cy.get('[class^=button]').contains('Оформить заказ').click();
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(5000);
        cy.get('[class^=order-details]').contains('идентификатор заказа');
    });

});