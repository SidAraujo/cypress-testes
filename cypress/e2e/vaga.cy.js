// Para autocomplete
/// <reference types="cypress" />

describe('Vaga testes', () => {
  it('deve fazer login e cadastrar uma nova notificacao', () => {
    // Abre a página de login para testes
    cy.visit('http://sacnew.ascbrazil.com.br/')

    // Busca o elemento com id login-user, e adiciona o login
    cy.get('[id=login-user]').type('user_qa')
    // Busca o elemento com id login-password, e adiciona a senha
    cy.get('[id=login-password]').type('ascQA2022')
    
    // Clica botao para login
    cy.get('#form-login > :nth-child(3) > .controls > .btn').click()

    // Navega até o botão para criar uma nova notificação
    cy.get('#side_agentes > .dropdown-toggle > .arrow').click()
    cy.get('#side_agente_notificacoes > a').click()
    cy.get('.btn-to-success > .fa').click()

    // Inicializa o server, e cria um route chamado postInserir
    cy.server()
    cy.route('POST', '**/agente-notificacoes/inserir').as('postInserir')

    // Preenche o campo necessário, e clica
    cy.get('#nom_msg').type('Criando nova notificacao')
    cy.get('.btn-info').click()

    // Espera se foi chamado o route de inserir
    // Depois cria um assert caso o xhr retorne 200
    cy.wait('@postInserir').then((xhr) =>{
      expect(xhr.status).be.eq(200);
    })
  })
})