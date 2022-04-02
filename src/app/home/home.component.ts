import { Component, OnInit } from '@angular/core';

const ThemeKey = 'color-theme';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.checkAndApplyDarkMode();
  }

  checkAndApplyDarkMode() {
    if (localStorage.getItem(ThemeKey) === 'dark' || (!(ThemeKey in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  toggleTheme() {
    const themeValue = localStorage.getItem(ThemeKey);

    console.log(themeValue);

    if (themeValue === null || themeValue === 'light') {
      localStorage.setItem(ThemeKey, 'dark');
    }
    else {
      localStorage.setItem(ThemeKey, 'light');
    }

    this.checkAndApplyDarkMode();

  }
}
