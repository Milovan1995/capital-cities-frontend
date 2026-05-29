import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
    TestBed.flushEffects();
  });

  it('should default to aurora and write it to the document', () => {
    expect(service.currentTheme()).toBe('aurora');
    expect(document.documentElement.getAttribute('data-theme')).toBe('aurora');
  });

  it('should persist a valid theme selection', () => {
    service.setTheme('midnight');
    TestBed.flushEffects();

    expect(service.currentTheme()).toBe('midnight');
    expect(localStorage.getItem('front-capitals-theme')).toBe('midnight');
    expect(document.documentElement.getAttribute('data-theme')).toBe('midnight');
  });

  it('should ignore invalid theme values', () => {
    service.setTheme('invalid-theme');
    TestBed.flushEffects();

    expect(service.currentTheme()).toBe('aurora');
  });
});
