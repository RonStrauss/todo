import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoItemComponent } from './todo-item.component';
import { Todo } from 'src/app/interfaces/todo';
import { TodosService } from 'src/app/services/todos.service';

export const dummyTodo: Todo = {
	id: '1',
	title: 'Test',
	completed: false,
	timestamp: Date.now(),
};

describe('TodoItemComponent', () => {
	let component: TodoItemComponent;
	let fixture: ComponentFixture<TodoItemComponent>;
	let todosService: TodosService;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [TodoItemComponent],
			providers: [
				{
					provide: TodosService,
					useValue: {
						toggleTodoById: jasmine.createSpy('toggleTodoById'),
						removeTodoById: jasmine.createSpy('removeTodoById'),
					},
				},
			],
		}).compileComponents();

		fixture = TestBed.createComponent(TodoItemComponent);
		component = fixture.componentInstance;
		todosService = TestBed.inject(TodosService);
		component.todo = dummyTodo;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should throw error if todo input is not provided', () => {
		component.todo = undefined as any;
		expect(() => component.ngOnInit()).toThrowError('todo input is required');
	});

	it('should call toggleTodoById when toggle is called', () => {
		component.toggle();
		expect(todosService.toggleTodoById).toHaveBeenCalledWith(dummyTodo.id);
	});

	it('should call removeTodoById when remove is called', () => {
		component.remove();
		expect(todosService.removeTodoById).toHaveBeenCalledWith(dummyTodo.id);
	});

	it('should have role attribute set to listitem', () => {
		const hostElement: HTMLElement = fixture.nativeElement;
		expect(hostElement.getAttribute('role')).toBe('listitem');
	});
});
