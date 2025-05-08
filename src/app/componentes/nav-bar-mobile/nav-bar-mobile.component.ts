import { Component } from '@angular/core';
import {
  AfterViewInit,
  ElementRef,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';

@Component({
  selector: 'app-nav-bar-mobile',
  imports: [],
  templateUrl: './nav-bar-mobile.component.html',
  styleUrl: './nav-bar-mobile.component.css'
})

export class NavBarMobileComponent implements AfterViewInit {
  @ViewChild('menuButton') menuButton!: ElementRef<HTMLButtonElement>;
  @ViewChild('closeMenu') closeButton!: ElementRef<HTMLButtonElement>;
  @ViewChild('mobileMenu') mobileMenu!: ElementRef<HTMLElement>;
  @ViewChild('overlay') overlay!: ElementRef<HTMLElement>;

  @ViewChildren('menuLink', { read: ElementRef }) menuLinks!: QueryList<ElementRef<HTMLAnchorElement>>;
  @ViewChildren('botaoHome', { read: ElementRef }) botaoHome!: QueryList<ElementRef<HTMLAnchorElement>>;

  ngAfterViewInit(): void {
    this.menuButton.nativeElement.addEventListener('click', () => {
      this.mobileMenu.nativeElement.classList.remove('hidden');
      this.overlay.nativeElement.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    });

    const closeMenu = () => {
      this.mobileMenu.nativeElement.classList.add('hidden');
      this.overlay.nativeElement.classList.add('hidden');
      document.body.style.overflow = 'auto';
    };

    this.closeButton.nativeElement.addEventListener('click', closeMenu);
    this.overlay.nativeElement.addEventListener('click', closeMenu);

    this.menuLinks.forEach(linkRef => {
      const link = linkRef.nativeElement;
      link.addEventListener('click', (e: MouseEvent) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        if (targetId) {
          const targetSection = document.querySelector<HTMLElement>(targetId);
          closeMenu();
          if (targetSection) {
            setTimeout(() => {
              targetSection.scrollIntoView({ behavior: 'smooth' });
            }, 500);
          }
        }
      });
    });

    this.botaoHome.forEach(linkRef => {
      const link = linkRef.nativeElement;
      link.addEventListener('click', (e: MouseEvent) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        if (targetId) {
          const targetSection = document.querySelector<HTMLElement>(targetId);
          if (targetSection) {
            setTimeout(() => {
              targetSection.scrollIntoView({ behavior: 'smooth' });
            }, 200);
          }
        }
      });
    });
  }
}
