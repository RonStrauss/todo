import { ElementRef, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class AnouncerService {
	private anouncementContainer?: ElementRef<HTMLDivElement>;

	private anouncementQueue$ = new BehaviorSubject<string[]>([]);

	constructor() {}

	setAnouncementContainer(container: ElementRef<HTMLDivElement>): void {
		this.anouncementContainer = container;
		this.beginAnouncementQueue();
	}

	anounceNewMessage(message: string): void {
		this.anouncementQueue$.next([...this.anouncementQueue$.getValue(), message]);
	}

	private beginAnouncementQueue(): void {
		if (!this.anouncementContainer) {
			throw new Error('Anouncement container not set');
		}

		const anouncementContainer = this.anouncementContainer.nativeElement;

		this.anouncementQueue$.subscribe(messages => {
			if (!messages.length) {
				anouncementContainer.textContent = null;
				return;
			}

			anouncementContainer.textContent = messages[0];

			setTimeout(() => {
				anouncementContainer.textContent = null;
				this.anouncementQueue$.next(messages.slice(1));
			}, 3000);
		});
	}
}
