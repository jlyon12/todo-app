/* eslint-disable no-underscore-dangle */
export default class Project {
	constructor(name, tasks = []) {
		this._name = name;
		this._tasks = tasks;
	}

	get name() {
		return this._name;
	}

	set name(value) {
		this._name = value;
	}

	get tasks() {
		return this._tasks;
	}

	set tasks(value) {
		this._tasks = value;
	}
}
