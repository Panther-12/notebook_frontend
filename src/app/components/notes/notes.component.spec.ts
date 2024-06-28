import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotesComponent } from './notes.component';
import { Note, NoteResponse, NotesService } from '../../services/notes.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of, throwError } from 'rxjs';
import { browser, by, element } from 'protractor';

describe('NotesComponent', () => {
  let component: NotesComponent;
  let fixture: ComponentFixture<NotesComponent>;
  let notesService: jasmine.SpyObj<NotesService>;

  beforeEach(async () => {
    const notesServiceSpy = jasmine.createSpyObj('NotesService', ['getNotes', 'addNote', 'updateNote', 'deleteNote']);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule, RouterTestingModule, NotesComponent],
      declarations: [],
      providers: [
        { provide: NotesService, useValue: notesServiceSpy },
        { provide: ActivatedRoute, useValue: { snapshot: { params: {} } } }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotesComponent);
    component = fixture.componentInstance;
    notesService = TestBed.inject(NotesService) as jasmine.SpyObj<NotesService>;
  });

  it('should create and load notes', () => {
    const mockNotes = [
      { 
        NoteID: '1',
        NoteTitle: 'Grocery List',
        NoteContent: 'Milk, Eggs, Bread, Butter, Cheese, Apples, Bananas, Oranges',
        CreatedAt: '2023-01-01'
      },
      { 
        NoteID: '2',
        NoteTitle: 'Workout Routine',
        NoteContent: 'Monday: Chest, Tuesday: Back, Wednesday: Legs, Thursday: Shoulders, Friday: Arms',
        CreatedAt: '2023-01-02'
      },
      { 
        NoteID: '4',
        NoteTitle: 'Travel Bucket List',
        NoteContent: 'Paris, Tokyo, New York, Sydney, Rome, Cape Town, Toronto',
        CreatedAt: '2023-01-04'
      },
      { 
        NoteID: '5',
        NoteTitle: 'Meeting Notes',
        NoteContent: 'Discussed project timeline, Assigned tasks, Set next meeting for Monday',
        CreatedAt: '2023-01-05'
      }
    ];
    notesService.getNotes.and.returnValue(of(mockNotes));

    fixture.detectChanges();

    expect(component).toBeTruthy();
    expect(component.notes).toEqual(mockNotes);
    expect(component.successMessage).toBe('Notes loaded successfully');
  });

  it('should handle error when loading notes', () => {
    notesService.getNotes.and.returnValue(throwError('Error loading notes'));

    component.ngOnInit();

    expect(component.notes).toEqual([]);
    expect(component.errorMessage).toBe('Could not load notes');
  });

  it('should add a new note', () => {
    const newNote: NoteResponse =       { 
        title: 'Book Recommendations',
        content: 'The Great Gatsby, To Kill a Mockingbird, 1984, The Catcher in the Rye, Moby Dick',
        created_at: '2023-01-03'
      };
    const addedNote: Note ={ 
      NoteID: '3',
      NoteTitle: 'Book Recommendations',
      NoteContent: 'The Great Gatsby, To Kill a Mockingbird, 1984, The Catcher in the Rye, Moby Dick',
      CreatedAt: '2023-01-03'
    };
    component.newNote = newNote;
    notesService.addNote.and.returnValue(of(addedNote));

    component.addNote();

    expect(component.notes).toContain(addedNote);
    expect(component.newNote).toEqual({ title: '', content: '', created_at: '' });
    expect(component.successMessage).toBe('Note added successfully');
  });

  it('should handle error when adding a note', () => {
    const newNote: NoteResponse = { title: 'New test Note', content: 'New test content added', created_at: '2023-01-01' };
    component.newNote = newNote;
    notesService.addNote.and.returnValue(throwError('Error adding note'));

    component.addNote();

    expect(component.notes).not.toContain(jasmine.objectContaining({ NoteTitle: 'New test Note' }));
    expect(component.errorMessage).toBe('Could not add note');
  });

  it('should update a note', () => {
    const noteId = '1';
    const updatedNote: NoteResponse = { title: 'Updated Note', content: 'Updated Content', created_at: '2023-01-01' };
    notesService.updateNote.and.returnValue(of(updatedNote));

    component.updateNote(noteId, updatedNote);

    expect(component.successMessage).toBe('Note updated successfully');
  });

  it('should handle error when updating a note', () => {
    const noteId = '1';
    const updatedNote: NoteResponse = { title: 'Updated Note', content: 'Updated Content', created_at: '2023-01-01' };
    notesService.updateNote.and.returnValue(throwError('Error updating note'));

    component.updateNote(noteId, updatedNote);

    expect(component.errorMessage).toBe('Could not update note');
  });

  it('should delete a note', () => {
    const noteId = '1';
    const initialNotes: Note[] = [
      { NoteID: '1', NoteTitle: 'Note 1', NoteContent: 'Content 1', CreatedAt: '2023-01-01' },
      { NoteID: '2', NoteTitle: 'Note 2', NoteContent: 'Content 2', CreatedAt: '2023-01-02' }
    ];
    component.notes = initialNotes;
    notesService.deleteNote.and.returnValue(of(undefined)); 
    component.deleteNote(noteId);

    expect(component.notes).not.toContain(jasmine.objectContaining({ NoteID: noteId }));
    expect(component.successMessage).toBe('Note deleted successfully');
  });

  it('should handle error when deleting a note', () => {
    const noteId = '1';
    notesService.deleteNote.and.returnValue(throwError('Error deleting note'));

    component.deleteNote(noteId);

    expect(component.errorMessage).toBe('Could not delete note');
  });

  it('should show an error message', () => {
    component.showError('Test error message');
    expect(component.errorMessage).toBe('Test error message');
  });

  it('should show a success message', () => {
    component.showSuccess('Test success message');
    expect(component.successMessage).toBe('Test success message');
  });
});
