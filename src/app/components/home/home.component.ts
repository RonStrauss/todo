import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { InputComponent } from '../input/input.component';
import { TodoListComponent } from '../todo-list/todo-list.component';
import { AnouncementContainerDirective } from 'src/app/Directives/anouncement-container.directive';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
	standalone: true,
	imports: [InputComponent, TodoListComponent, AnouncementContainerDirective, CommonModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.ShadowDom,
})
export class HomeComponent {
	constructor() {}
}
