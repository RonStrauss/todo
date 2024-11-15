import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { By } from '@angular/platform-browser';
import { InputComponent } from '../input/input.component';
import { TodoListComponent } from '../todo-list/todo-list.component';

describe('HomeComponent', () => {
	let component: HomeComponent;
	let fixture: ComponentFixture<HomeComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [HomeComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(HomeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should have the first visible element as an h1', () => {
		const compiled = fixture.nativeElement.shadowRoot as HTMLElement;
		const firstVisibleElement = Array.from(compiled.children).find(el => el.nodeType === Node.ELEMENT_NODE && (el as HTMLElement).offsetParent !== null);
		expect(firstVisibleElement).toBeTruthy();
		expect(firstVisibleElement?.tagName).toBe('H1');
	});

	it('should contain an app-input component', () => {
		const inputComponent = fixture.debugElement.query(By.directive(InputComponent));
		expect(inputComponent).toBeTruthy();
	});

	it('should contain an app-todo-list component', () => {
		const todoListComponent = fixture.debugElement.query(By.directive(TodoListComponent));
		expect(todoListComponent).toBeTruthy();
	});
});
