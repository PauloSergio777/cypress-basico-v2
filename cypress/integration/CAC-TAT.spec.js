/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
  beforeEach(function() {
  cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', function() {
   cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
  })

it('preenche os campos obrigatórios e envia o formulário',function(){
  const longtext='teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste'
  cy.get('#firstName').type('Paulo')
  cy.get('#lastName').type('Sergio')
  cy.get('#email').type('paulo@teste.com')
  cy.get('#open-text-area').type(longtext, {delay:0})
  
  cy.get('.button[type="submit"]').click()
  cy.get('.success').should('be.visible')//Valida que a mensagem de sucesso esta apresentando na tela
})

it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida',function(){
cy.get('#firstName').type('Paulo')
cy.get('#lastName').type('Sergio')
cy.get('#email').type('paulo@teste,com')
cy.get('#open-text-area').type('Teste')

cy.get('.button[type="submit"]').click()
cy.get('.error').should('be.visible')//Valida que a mensagem de erro esta apresentando na tela

})

it('Campo telefone vazio quando preenchido com o valor não numérico',function(){
cy.get('#phone').type('abcdefghij').should('have.value','')//Valida que o valor deve estar em branco 
})


it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário',function(){
  cy.get('#firstName').type('Paulo')
  cy.get('#lastName').type('Sergio')
  cy.get('#email').type('paulo@teste.com')
  cy.get('#phone-checkbox').click()
  cy.get('#open-text-area').type('Teste')
  
  cy.get('.button[type="submit"]').click()
  cy.get('.error').should('be.visible')//Valida que a mensagem de erro esta apresentando na tela

  })

it('preenche e limpa os campos nome, sobrenome, email e telefone',function(){
  cy.get('#firstName').type('Paulo').should('have.value','Paulo')//Verificar que o valor presente é o digitado
  .clear().should('have.value','')//verifica que o campo foi limpo e esta vazio
  cy.get('#lastName').type('Sergio').should('have.value','Sergio').clear().should('have.value','')
  cy.get('#email').type('paulo@teste.com').should('have.value','paulo@teste.com').clear().should('have.value','')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios.',function(){
  cy.contains('button', 'Enviar').click()
  cy.get('.error').should('be.visible')//Valida que a mensagem de erro esta apresentando na tela
  })

it('envia o formuário com sucesso usando um comando customizado',function(){
  cy.fillMandatoryFieldsAndSubmit()//Comando customizado na pasta de commands.js
  cy.get('.success').should('be.visible')//Valida que a mensagem de sucesso esta apresentando na tela
})
it('Usando o cy.contains para localizar o botão Enviar',function(){
  cy.contains('button', 'Enviar').click()//Usando o contains para localizar o botão de nome enviar na tela
})
it('verifica o título da aplicação', function() {
  cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
 })

it('seleciona um produto (YouTube) por seu texto',function(){
 cy.get('#firstName').type('Paulo')
 cy.get('#lastName').type('Sergio')
 cy.get('#email').type('paulo@teste.com')
 cy.get('#product').select('YouTube').should('have.value', 'youtube') //Seleção pelo texto YouTube na flag de Produtos
})

it('Seleciona um produto (Mentoria) por seu valor (value)',function(){
 cy.get('#firstName').type('Paulo')
 cy.get('#lastName').type('Sergio')
 cy.get('#email').type('paulo@teste.com')
 cy.get('#product').select('mentoria').should('have.value', 'mentoria') //Seleção pelo value Mentoria na flag de Produtos
})

it('seleciona um produto (Blog) por seu índice',function(){
 cy.get('#firstName').type('Paulo')
 cy.get('#lastName').type('Sergio')
 cy.get('#email').type('paulo@teste.com')
 cy.get('#product').select(1).should('have.value', 'blog') //Seleção pela índice na flag de Produtos
})
it('Marca o tipo de atendimento "Feedback"',function(){
  cy.get('input[type="radio"][value="feedback"]')//Seleciona o tipo do radio usando o value coletado
  .check()
  .should('have.value','feedback')//Checa se o valor correto foi selecionado conforme descrito

})
it('marca cada tipo de atendimento',function(){
  cy.get('input[type="radio"][value="feedback"]')//Seleciona o tipo do radio usando o value coletado
  .check()
  .should('have.value','feedback')//Checa se o valor correto foi selecionado conforme descrito
  cy.get('input[type="radio"][value="ajuda"]')//Seleciona o tipo do radio usando o value coletado
  .check()
  .should('have.value','ajuda')//Checa se o valor correto foi selecionado conforme descrito
  cy.get('input[type="radio"][value="elogio"]')//Seleciona o tipo do radio usando o value coletado
  .check()
  .should('have.value','elogio')//Checa se o valor correto foi selecionado conforme descrito
})

it('marca cada tipo de atendimento_Aula',function(){
cy.get('input[type="radio"]')
.check()
.should('have.length',3)//verifica se existe 3 opções de radio na tela
.each(function($radio){//Recebe a função para passar por cada um dos elementos no cy.get
cy.wrap($radio).check()//Marca cada um para pós verificação
cy.wrap($radio).should('be.checked')//verifica se a opção foi marcada
})
})


it('marca ambos checkboxes, depois desmarca o último',function(){
cy.get('input[type="checkbox"]').check()//Marcando os dois checkbox na tela
.should('be.checked') //verificou que ambos foram marcados
.last().uncheck() //Desmarcou o último dos checkboxs 
.should('not.be.checked') //Verificou que o ultimo desmarcados
})


it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário',function(){
  cy.get('#firstName').type('Paulo')
  cy.get('#lastName').type('Sergio')
  cy.get('#email').type('paulo@teste.com')
  cy.get('#phone-checkbox').check()//Valida que o check estara funcionando ao inves do click para marcar o checkbox
  cy.get('#open-text-area').type('Teste')
  
  cy.get('.button[type="submit"]').click()
  cy.get('.error').should('be.visible')//Valida que a mensagem de erro esta apresentando na tela
})
it('seleciona um arquivo da pasta fixtures',function(){
 cy.get('input[type="file"]#file-upload')//Captura do campo para input de arquivos
  .should('not.have.value')//Valida que não tem nenhum a atrelado
  .selectFile('./cypress/fixtures/example.json')//carrega o arquivo usando o caminho e o nome deste
  .should(function($input){
  expect($input[0].files[0].name).to.equal('example.json')//Valide que o arquivo esta correto
  })
})

it('Seleciona um arquivo simulando um drag-and-drop',function(){
  cy.get('input[type="file"]#file-upload')//Captura do campo para input de arquivos
   .should('not.have.value')//Valida que não tem nenhum a atrelado
   .selectFile('./cypress/fixtures/example.json',{action: 'drag-drop'})//arrasta o arquivo usando o caminho e o nome deste
   .should(function($input){
   expect($input[0].files[0].name).to.equal('example.json')//Valide que o arquivo esta correto
   })
 })


it('Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias',function(){
  cy.fixture('example.json').as('samplefile')//Alias para a fixture para pegar 
  cy.get('input[type="file"]')
    .selectFile('@samplefile')//usar o alias da fixture
    .should(function($input){
      expect($input[0].files[0].name).to.equal('example.json')//Valide que o arquivo esta correto
      })
   })

it('Verifica que a política de privacidade abre em outra aba sem a necessidade de um clique',function(){
   cy.get('#privacy a').should('have.attr','target','_blank')

   })

   
it('acessa a página da política de privacidade removendo o target e então clicando no link',function(){
    cy.get('#privacy a')
    .invoke('removeAttr','target')//Remover o target para abrir na mesma tela e não em uma nova aba
    .click()
    cy.contains('Talking About Testing').should('be.visible')//Validar um texto na tela aberta 
    })
   })
