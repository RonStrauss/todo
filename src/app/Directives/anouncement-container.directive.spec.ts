import { AnouncementContainerDirective } from './anouncement-container.directive';
import { Renderer2 } from '@angular/core';
import { AnnouncerService } from '../services/anouncer.service';
import { ElementRef } from '@angular/core';

describe('AnouncementContainerDirective', () => {
	let anouncerServiceMock: jasmine.SpyObj<AnnouncerService>;
	let elementRefMock: jasmine.SpyObj<ElementRef>;
	let rendererMock: jasmine.SpyObj<Renderer2>;
	let directive: AnouncementContainerDirective;

	beforeEach(() => {
		rendererMock = jasmine.createSpyObj('Renderer2', ['setAttribute', 'setStyle']);
		anouncerServiceMock = jasmine.createSpyObj('AnouncerService', ['setAnouncementContainer']);
		elementRefMock = jasmine.createSpyObj('ElementRef', [], { nativeElement: document.createElement('div') });

		directive = new AnouncementContainerDirective(elementRefMock, rendererMock, anouncerServiceMock);
	});

	it('should create an instance', () => {
		expect(directive).toBeTruthy();
	});

	it('should set aria-live attribute to polite', () => {
		directive.ngAfterViewInit();
		expect(rendererMock.setAttribute).toHaveBeenCalledWith(elementRefMock.nativeElement, 'aria-live', 'polite');
	});

	it('should set aria-atomic attribute to true', () => {
		directive.ngAfterViewInit();
		expect(rendererMock.setAttribute).toHaveBeenCalledWith(elementRefMock.nativeElement, 'aria-atomic', 'true');
	});

	it('should set width style to 1px', () => {
		directive.ngAfterViewInit();
		expect(rendererMock.setStyle).toHaveBeenCalledWith(elementRefMock.nativeElement, 'width', '1px');
	});

	it('should set height style to 1px', () => {
		directive.ngAfterViewInit();
		expect(rendererMock.setStyle).toHaveBeenCalledWith(elementRefMock.nativeElement, 'height', '1px');
	});

	it('should set overflow style to hidden', () => {
		directive.ngAfterViewInit();
		expect(rendererMock.setStyle).toHaveBeenCalledWith(elementRefMock.nativeElement, 'overflow', 'hidden');
	});

	it('should call setAnouncementContainer on AnouncerService', () => {
		directive.ngAfterViewInit();
		expect(anouncerServiceMock.setAnouncementContainer).toHaveBeenCalledWith(elementRefMock);
	});
});
