import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  inject,
  OnDestroy,
  Output,
} from '@angular/core';
import { PlatformService } from '../services/platform-service';

@Directive({
  selector: '[appInView]',
})
export class InViewDirective implements AfterViewInit, OnDestroy {
  private platform = inject(PlatformService);
  private observer: IntersectionObserver | undefined = undefined;

  @Output() inView = new EventEmitter<void>();
  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    if (this.platform.isBrowser()) {
      this.observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            this.inView.emit();
            console.log('in view...');
          }
        },
        {
          rootMargin: '0px 0px 0px 0px',
        },
      );

      this.observer.observe(this.el.nativeElement);
    }
  }

  ngOnDestroy(): void {
    if (this.platform.isBrowser()) {
      this.observer?.disconnect();
    }
  }
}
