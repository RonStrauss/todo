import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoListComponent } from './todo-list.component';
import { TodosService } from 'src/app/services/todos.service';
import { of } from 'rxjs';

describe('TodoListComponent', () => {
	let component: TodoListComponent;
	let fixture: ComponentFixture<TodoListComponent>;
	let todosService: TodosService;

	beforeEach(async () => {
		const todosServiceMock = {
			todos$: of([
				{ id: '1', title: 'Test Todo 1', completed: false, timestamp: Date.now() },
				{ id: '2', title: 'Test Todo 2', completed: true, timestamp: Date.now() },
			]),
		};

		await TestBed.configureTestingModule({
			imports: [TodoListComponent],
			providers: [{ provide: TodosService, useValue: todosServiceMock }],
		}).compileComponents();

		fixture = TestBed.createComponent(TodoListComponent);
		component = fixture.componentInstance;
		todosService = TestBed.inject(TodosService);
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should have role attribute set to list', () => {
		const hostElement: HTMLElement = fixture.nativeElement;
		expect(hostElement.getAttribute('role')).toBe('list');
	});

	it('should display todos', done => {
		component.todos$.subscribe(todos => {
			expect(todos.length).toBe(2);
			expect(todos[0].title).toBe('Test Todo 1');
			expect(todos[1].title).toBe('Test Todo 2');
			done();
		});
	});
});
