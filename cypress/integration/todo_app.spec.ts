/// <reference types="cypress" />

describe('Todo App', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:5000/api/v1/testing/reset');
    cy.visit('http://localhost:5000');
  });

  it('front page can be opened', function () {
    cy.contains('Welcome to Todo App');
  });

  it('user can be created', function () {
    cy.get('#signup-link').click();
    cy.get('#name').type('sandesh');
    cy.get('#username').type('sundesz@gmail.com');
    cy.get('#password').type('sandesh');
    cy.get('#confirmPassword').type('sandesh');
    cy.get('#signup-btn').click();

    cy.get('.notification').contains('User created successfully');
  });

  describe('Login', function () {
    beforeEach(function () {
      const user = {
        username: 'sundesz@gmail.com',
        name: 'sandesh',
        password: 'sandesh',
      };
      cy.request('POST', 'http://localhost:5000/api/v1/users', user);
    });

    it('succeeds with correct credentials', function () {
      cy.get('#signin-link').click();
      cy.get('#username').type('sundesz@gmail.com');
      cy.get('#password').type('sandesh');
      cy.get('#signin-btn').click();

      cy.contains('sundesz@gmail.com');
    });

    it('fails with wrong credentials', function () {
      cy.get('#signin-link').click();
      cy.get('#username').type('sundesz@gmail.com');
      cy.get('#password').type('sandesh1');
      cy.get('#signin-btn').click();
      cy.get('.notification').contains('Invalid username or password');
    });

    describe('When logged in', function () {
      beforeEach(function () {
        cy.get('#signin-link').click();
        cy.get('#username').type('sundesz@gmail.com');
        cy.get('#password').type('sandesh');
        cy.get('#signin-btn').click();
      });

      it('task can be created', function () {
        cy.get('#task').type('This is a new test task');
        cy.get('#addtask-btn').click();

        cy.contains('This is a new test task');
      });

      it('can logout', function () {
        cy.get('#signout-link').click();
        cy.get('.notification').contains('Sign out successfully');
      });

      describe('When there is a task', function () {
        beforeEach(function () {
          cy.get('#task').type('New test task 1');
          cy.get('#addtask-btn').click();

          cy.get('#task').type('New test task 2');
          cy.get('#addtask-btn').click();

          cy.get('#task').type('New test task 3');
          cy.get('#addtask-btn').click();

          cy.get('.task-checkbox').first().click();
        });

        it('task can be marked done', function () {
          cy.get('.task-checkbox').eq(1).click();

          cy.get('#all').click();
          cy.get('.task-detail').should(($taskDetail) => {
            expect($taskDetail).to.have.length(3);
          });

          cy.get('#complete').click();
          cy.get('.task-detail').should(($taskDetail) => {
            expect($taskDetail).to.have.length(2);
          });

          cy.get('#incomplete').click();
          cy.get('.task-detail').should(($taskDetail) => {
            expect($taskDetail).to.have.length(1);
          });
        });

        it('task can be marked important', function () {
          cy.get('.task-label').eq(2).click();

          cy.get('#all').click();
          cy.get('.task-detail').should(($taskDetail) => {
            expect($taskDetail).to.have.length(3);
          });

          cy.get('#important').click();
          cy.get('.task-detail').should(($taskDetail) => {
            expect($taskDetail).to.have.length(1);
          });
        });

        it('task can be deleted', function () {
          cy.get('.task-delete').first().click();

          cy.get('.task-detail').should(($taskDetail) => {
            expect($taskDetail).to.have.length(2);
          });
        });
      });
    });
  });
});
