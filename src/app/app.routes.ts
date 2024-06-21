import { Routes } from '@angular/router';
import { NotesComponent } from './components/notes/notes.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { RegisterComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { ReverseCardComponent } from './components/reverse-card/reverse-card.component';

export const routes: Routes = [
    { path: '', redirectTo:'home', pathMatch: 'full' },
    { path: 'home', component: LandingpageComponent},
    { path: 'notes', component: NotesComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'login', component: LoginComponent},
    { path: 'reverse', component: ReverseCardComponent}
];
