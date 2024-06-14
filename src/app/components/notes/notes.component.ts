import { Component, OnInit } from '@angular/core';
import { NotesService, Note, NoteResponse} from '../../services/notes.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [HttpClientModule, FormsModule, CommonModule],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css'
})
export class NotesComponent implements OnInit {
  notes: Note[] = [];
  newNote: NoteResponse = { title: '', content: '', created_at: ''};
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private notesService: NotesService) { }

  ngOnInit(): void {
    this.loadNotes();
  }

  loadNotes(): void {
    this.notesService.getNotes().subscribe(
      notes => {
        this.showSuccess('Notes loaded successfully');
        this.notes = notes
      },
      error => this.showError('Could not load notes'),
    );
  }

  addNote(): void {
    if (!this.newNote.title || !this.newNote.content) {
      this.showError('Please fill out all required fields.');
      return;
    }
    this.notesService.addNote(this.newNote).subscribe(
      note => {
        this.notes.push(note);
        this.newNote = { title: '', content: '', created_at: ''};
        this.showSuccess('Note added successfully');
      },
      error => this.showError('Could not add note')
    );
  }

  updateNote(id: string, note: NoteResponse): void {
    console.log(id)
    this.notesService.updateNote(id, note).subscribe(
      () => this.showSuccess('Note updated successfully'),
      error => this.showError('Could not update note')
    );
  }

  deleteNote(id: string): void {
    this.notesService.deleteNote(id).subscribe(
      () => {
        this.notes = this.notes.filter(note => note.NoteID !== id);
        this.showSuccess('Note deleted successfully');
      },
      error => this.showError('Could not delete note')
    );
  }

  showError(message: string): void {
    this.errorMessage = message;
    setTimeout(() => this.errorMessage = null, 3000);
  }

  showSuccess(message: string): void {
    this.successMessage = message;
    setTimeout(() => this.successMessage = null, 3000);
  }
}
