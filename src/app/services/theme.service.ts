import { DOCUMENT } from '@angular/common';
import { Injectable, computed, effect, inject, signal } from '@angular/core';

export type ThemeName = 'aurora' | 'sunset' | 'midnight';

export interface ThemeOption {
  labelKey: string;
  value: ThemeName;
}

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly storageKey = 'front-capitals-theme';
  private readonly document = inject(DOCUMENT);
  private readonly storage = this.getStorage();

  readonly themeOptions: ThemeOption[] = [
    { value: 'aurora', labelKey: 'themes.aurora' },
    { value: 'sunset', labelKey: 'themes.sunset' },
    { value: 'midnight', labelKey: 'themes.midnight' },
  ];

  readonly currentTheme = signal<ThemeName>(this.getInitialTheme());
  readonly currentThemeLabelKey = computed(
    () =>
      this.themeOptions.find(({ value }) => value === this.currentTheme())
        ?.labelKey ?? this.themeOptions[0].labelKey
  );

  constructor() {
    effect(() => {
      const theme = this.currentTheme();
      this.document.documentElement.setAttribute('data-theme', theme);
      this.storage?.setItem(this.storageKey, theme);
    });
  }

  setTheme(theme: string) {
    if (this.isThemeName(theme)) {
      this.currentTheme.set(theme);
    }
  }

  private getInitialTheme(): ThemeName {
    const storedTheme = this.storage?.getItem(this.storageKey) ?? null;
    return this.isThemeName(storedTheme) ? storedTheme : 'aurora';
  }

  private isThemeName(theme: string | null): theme is ThemeName {
    return this.themeOptions.some(({ value }) => value === theme);
  }

  private getStorage(): Storage | null {
    return typeof localStorage === 'undefined' ? null : localStorage;
  }
}
