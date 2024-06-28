describe('Notes Component', () => {
  beforeEach(() => {
    cy.visit('/notes');
  });

  it('should load notes', () => {
    cy.get('.note-item').should('exist');
  });

  it('should show success message when notes are loaded', () => {
    cy.get('.success-toast').should('be.visible');
    cy.get('.success-toast').should('contain', 'Notes loaded successfully');
  });

  it('should add a new note', () => {
    cy.get('.note-form input').type('Test Note');
    cy.get('.note-form textarea').type('This is a test note.');
    cy.get('.note-form button').click();

    cy.get('.note-item').should('contain', 'Test Note');
    cy.get('.note-item').should('contain', 'This is a test note.');
  });

  it('should update a note', () => {
    cy.get('.note-item input').clear().type('Updated Note');
    cy.get('.note-item textarea').clear().type('This is an updated note.');
    cy.get('.note-item button').contains('Update').click();

    cy.get('.note-item').should('contain', 'Updated Note');
    cy.get('.note-item').should('contain', 'This is an updated note.');
  });

  it('should delete a note', () => {
    cy.get('.note-item button').contains('Delete').click();
    cy.get('.note-item').should('not.exist');
  });

  // it('should show error message', () => {
  //   // Trigger the error condition here

  //   cy.get('.error-toast').should('be.visible');
  //   cy.get('.error-toast').should('contain', 'Your error message'); // replace with your actual error message
  // });

});