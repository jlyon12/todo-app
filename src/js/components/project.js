/* eslint-disable no-underscore-dangle */

const projectModule = (() => {
	const allProjects = [];

	class Project {
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

	const createProject = (name) => {
		const project = new Project(name);
		allProjects.push(project);
		return project;
	};

	const getProjectIndex = (name) => {
		const index = allProjects.findIndex((project) => project.name === name);
		return index;
	};

	const deleteProject = (name) => {
		const index = getProjectIndex(name);
		allProjects.splice(index, 1);
	};

	const editProject = (project, newName) => {
		project.name = newName;
		return project;
	};

	const getProjectTasks = (projectName) => {
		const index = getProjectIndex(projectName);
		const thisProject = allProjects[index];
		return thisProject.tasks;
	};

	createProject('Inbox');

	getProjectTasks('Inbox');
	return {
		allProjects,
		Project,
		createProject,
		getProjectIndex,
		deleteProject,
		editProject,
		getProjectTasks,
	};
})();

export default projectModule;
