import { Todo } from '../interfaces/todo';
import { nanoid } from 'nanoid';
import { randomTime } from '../libs/randomTime';

const fakeTodos: string[] = ['Buy milk', 'Buy eggs', 'Buy bread', 'Buy butter', 'Buy cheese'];

export const mockTodos: Todo[] = fakeTodos.map(title => ({
	id: nanoid(),
	title,
	completed: Math.random() > 0.5,
	timestamp: randomTime(),
}));
