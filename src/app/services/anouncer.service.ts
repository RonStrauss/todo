import { ElementRef, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class AnnouncerService {
	private announcementContainer?: ElementRef<HTMLDivElement>;

	private announcementQueue$ = new BehaviorSubject<string[]>([]);

	constructor() {}

	setAnnouncementContainer(container: ElementRef<HTMLDivElement>): void {
		this.announcementContainer = container;
		this.beginAnnouncementQueue();
	}

	announceNewMessage(message: string): void {
		this.announcementQueue$.next([...this.announcementQueue$.getValue(), message]);
	}

	private beginAnnouncementQueue(): void {
		if (!this.announcementContainer) {
			throw new Error('announcement container not set');
		}

		const announcementContainer = this.announcementContainer.nativeElement;

		this.announcementQueue$.subscribe(messages => {
			if (!messages.length) {
				announcementContainer.textContent = null;
				return;
			}

			announcementContainer.textContent = messages[0];

			setTimeout(() => {
				announcementContainer.textContent = null;
				this.announcementQueue$.next(messages.slice(1));
			}, 3000);
		});
	}
}
