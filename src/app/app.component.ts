import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AlienNumeralConverterComponent } from './alien-numeral-converter/alien-numeral-converter.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AlienNumeralConverterComponent],
  template: `
    <main class="min-h-screen flex items-center justify-center p-4 bg-gray-100">
      <app-alien-numeral-converter></app-alien-numeral-converter>
    </main>
    <router-outlet />
  `,
  styles: []
})
export class AppComponent {
  title = 'Alien Numeral Converter';
}
