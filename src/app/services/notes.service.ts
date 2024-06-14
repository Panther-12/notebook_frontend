import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Note {
  NoteID: string;
  NoteTitle: string;
  NoteContent: string;
  CreatedAt: string;
}

export interface NoteResponse {
  title: string;
  content: string;
  created_at: string;
}


@Injectable({
  providedIn: 'root'
})

export class NotesService {
  private apiUrl = 'http://localhost:3000/notes';

  constructor(private http: HttpClient) { }

  getNotes(): Observable<Note[]> {
    // this.http.get<NoteResponse[]>(this.apiUrl).subscribe(data => console.log(data[0]));
    return this.http.get<Note[]>(this.apiUrl);
  }

  addNote(note: NoteResponse): Observable<Note> {
    return this.http.post<Note>(this.apiUrl, note);
  }

  updateNote(id:string, note: NoteResponse): Observable<NoteResponse> {
    return this.http.put<NoteResponse>(`${this.apiUrl}/${id}`, note);
  }

  deleteNote(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
