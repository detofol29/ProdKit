import { Component } from '@angular/core';
import { AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-bar-mobile',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './nav-bar-mobile.component.html',
  styleUrls: ['./nav-bar-mobile.component.css']
})
export class NavBarMobileComponent implements AfterViewInit {
  @ViewChild('menuButton') menuButton!: ElementRef<HTMLButtonElement>;
  @ViewChild('closeMenuButton') closeMenuButton!: ElementRef<HTMLButtonElement>; // Renamed from 'closeMenu'
  @ViewChild('mobileMenu') mobileMenu!: ElementRef<HTMLElement>;
  @ViewChild('overlay') overlay!: ElementRef<HTMLElement>;

  ngAfterViewInit(): void {
    this.menuButton.nativeElement.addEventListener('click', () => {
      this.openMenu();
    });

    this.closeMenuButton.nativeElement.addEventListener('click', () => {
      this.closeMenu();
    });

    this.overlay.nativeElement.addEventListener('click', () => {
      this.closeMenu();
    });
  }

  // Renamed to avoid conflict
  openMenu() {
    this.mobileMenu.nativeElement.classList.remove('hidden');
    this.overlay.nativeElement.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  closeMenu() {
    this.mobileMenu.nativeElement.classList.add('hidden');
    this.overlay.nativeElement.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }
}
