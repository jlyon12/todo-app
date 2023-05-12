/* eslint-disable no-underscore-dangle */
export default class Task {
	constructor(
		title,
		description,
		priority,
		dueDate,
		isCompleted = false,
		associatedProject = 'Inbox'
	) {
		this._title = title;
		this._description = description;
		this._priority = priority;
		this._dueDate = dueDate;
		this._isCompleted = isCompleted;
		this._associatedProject = associatedProject;
	}

	get title() {
		return this._title;
	}

	set title(value) {
		this._title = value;
	}

	get description() {
		return this._description;
	}

	set description(value) {
		this._description = value;
	}

	get priority() {
		return this._priority;
	}

	set priority(value) {
		this._priority = value;
	}

	get dueDate() {
		return this._dueDate;
	}

	set dueDate(value) {
		this._dueDate = value;
	}

	get isCompleted() {
		return this._isCompleted;
	}

	set isCompleted(value) {
		this._isCompleted = value;
	}

	get associatedProject() {
		return this._associatedProject;
	}

	set associatedProject(value) {
		this._associatedProject = value;
	}
}
