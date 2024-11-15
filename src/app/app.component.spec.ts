import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import * as axe from 'axe-core';

describe('AppComponent', () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [AppComponent],
		}).compileComponents();
	});

	it('should create the app', () => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});

	it(`should have as title 'todo'`, () => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.componentInstance;
		expect(app.title).toEqual('todo');
	});
	it('should pass axe accessibility test', done => {
		const fixture = TestBed.createComponent(AppComponent);
		axe.run(fixture.nativeElement, (err, { violations }) => {
			if (err) throw err;
			if (violations.length) console.error(violations);
			expect(violations.length).toBe(0);
			done();
		});
	});
});
