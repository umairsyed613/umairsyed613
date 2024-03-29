import { Component } from '@angular/core';

const ThemeKey = 'color-theme';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'umairsyed';

  constructor() {
    this.checkAndApplyDarkMode();
  }

  checkAndApplyDarkMode() {
    if (localStorage.getItem(ThemeKey) === 'dark' || (!(ThemeKey in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark')
    }
  }
}
