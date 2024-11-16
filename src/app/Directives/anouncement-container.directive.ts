import { AfterViewInit, Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { AnnouncerService } from '../services/anouncer.service';

@Directive({
	selector: '[appAnouncementContainer]',
	standalone: true,
})
export class AnouncementContainerDirective implements AfterViewInit {
	constructor(private element: ElementRef, private renderer: Renderer2, private _anouncer: AnnouncerService) {}

	ngAfterViewInit(): void {
		this.renderer.setAttribute(this.element.nativeElement, 'aria-live', 'polite');
		this.renderer.setAttribute(this.element.nativeElement, 'aria-atomic', 'true');
		this.renderer.setStyle(this.element.nativeElement, 'width', '1px');
		this.renderer.setStyle(this.element.nativeElement, 'height', '1px');
		this.renderer.setStyle(this.element.nativeElement, 'overflow', 'hidden');
		this._anouncer.setAnnouncementContainer(this.element);
	}
}
