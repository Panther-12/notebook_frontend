import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NotesService, Note, NoteResponse } from './notes.service';

describe('NotesService', () => {
  let service: NotesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NotesService]
    });

    service = TestBed.inject(NotesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); 
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch notes', () => {
    const mockNotes: Note[] = [
      { NoteID: '1', NoteTitle: 'Note 1', NoteContent: 'Content 1', CreatedAt: '2023-01-01' },
    ];

    service.getNotes().subscribe(notes => {
      expect(notes.length).toBe(1);
      expect(notes).toEqual(mockNotes);
    });

    const req = httpMock.expectOne('http://localhost:3000/notes');
    expect(req.request.method).toBe('GET');
    req.flush(mockNotes);
  });

  it('should add a note', () => {
    const mockNote: Note = { NoteID: '2', NoteTitle: 'Note 2', NoteContent: 'Content 2', CreatedAt: '2023-01-02' };
    const mockNoteResponse: NoteResponse = { title: 'Note 2', content: 'Content 2', created_at: '2023-01-02' };

    service.addNote(mockNoteResponse).subscribe(note => {
      expect(note).toEqual(mockNote);
    });

    const req = httpMock.expectOne('http://localhost:3000/notes');
    expect(req.request.method).toBe('POST');
    req.flush(mockNote);
  });

  it('should update a note', () => {
    const mockNoteResponse: NoteResponse = { title: 'Updated Note', content: 'Updated Content', created_at: '2023-01-03' };

    service.updateNote('1', mockNoteResponse).subscribe(note => {
      expect(note).toEqual(mockNoteResponse);
    });

    const req = httpMock.expectOne('http://localhost:3000/notes/1');
    expect(req.request.method).toBe('PUT');
    req.flush(mockNoteResponse);
  });

  it('should delete a note', () => {
    service.deleteNote('1').subscribe(res => {
      expect(res).toBeNull();
    });

    const req = httpMock.expectOne('http://localhost:3000/notes/1');
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});