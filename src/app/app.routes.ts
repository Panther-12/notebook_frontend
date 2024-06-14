import { Routes } from '@angular/router';
import { NotesComponent } from './components/notes/notes.component';
import { LandingpageComponent } from './landingpage/landingpage.component';

export const routes: Routes = [
    { path: '', redirectTo:'home', pathMatch: 'full' },
    { path: 'home', component: LandingpageComponent},
    { path: 'notes', component: NotesComponent}
];
