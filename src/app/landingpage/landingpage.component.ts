import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { logoIonic, easelOutline, shieldCheckmarkOutline, accessibilityOutline, peopleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-landingpage',
  standalone: true,
  imports: [RouterLink, IonIcon, HttpClientModule, HttpClientTestingModule],
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.css'
})
export class LandingpageComponent {
  constructor() {
    /**
     * On Ionicons 7.2+ this icon
     * gets mapped to a "logo-ionic" key.
     * Alternatively, developers can do:
     * addIcons({ 'logo-ionic': logoIonic });
     */
    addIcons({ logoIonic, easelOutline, shieldCheckmarkOutline, accessibilityOutline, peopleOutline});
  }

  onSubmit() {
    alert('Message sent! We will get back to you shortly.');
  }
}
