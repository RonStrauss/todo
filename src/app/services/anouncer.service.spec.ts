import { TestBed } from '@angular/core/testing';

import { AnnouncerService } from './anouncer.service';

describe('AnouncerService', () => {
	let service: AnnouncerService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(AnnouncerService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
