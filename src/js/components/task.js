/* eslint-disable no-underscore-dangle */
import format from 'date-fns/format';
import startOfWeek from 'date-fns/startOfWeek';
import endOfWeek from 'date-fns/endOfWeek';
import projectModule from './project';

const taskModule = (() => {
	let allTasks = [];
	const getAllTasks = () => {
		allTasks = [];
		projectModule.allProjects.forEach((project) => {
			allTasks = allTasks.concat(project.tasks);
		});
		return allTasks;
	};
	class Task {
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

	const createTask = (
		title,
		description,
		priority,
		dueDate,
		isCompleted,
		associatedProject
	) => {
		const task = new Task(
			title,
			description,
			priority,
			dueDate,
			isCompleted,
			associatedProject
		);
		const projectIndex = projectModule.getProjectIndex(associatedProject);
		projectModule.allProjects.at(projectIndex).tasks.push(task);
		return task;
	};

	const getTaskIndex = (projectName, taskTitle) => {
		const projectIndex = projectModule.getProjectIndex(projectName);
		const parentProject = projectModule.allProjects[projectIndex];
		const projectTasks = parentProject.tasks;
		const taskIndex = projectTasks.findIndex(
			(task) => task.title === taskTitle
		);

		return { projectTasks, taskIndex };
	};
	const returnThisTask = (projectName, taskTitle) => {
		const { taskIndex } = getTaskIndex(projectName, taskTitle);
		const { projectTasks } = getTaskIndex(projectName, taskTitle);
		return projectTasks.at(taskIndex);
	};

	const deleteTask = (projectName, taskTitle) => {
		const { taskIndex } = getTaskIndex(projectName, taskTitle);
		const { projectTasks } = getTaskIndex(projectName, taskTitle);
		return projectTasks.splice(taskIndex, 1);
	};

	const markTaskCompleted = (projectName, taskTitle) => {
		const { taskIndex } = getTaskIndex(projectName, taskTitle);
		const { projectTasks } = getTaskIndex(projectName, taskTitle);
		if (projectTasks.at(taskIndex).isCompleted === false) {
			projectTasks.at(taskIndex).isCompleted = true;
		} else projectTasks.at(taskIndex).isCompleted = false;
		return projectTasks.at(taskIndex).isCompleted;
	};
	const moveTaskToProject = (taskTitle, oldProject, newProject) => {
		const { taskIndex } = getTaskIndex(oldProject, taskTitle);
		const oldProjectIndex = projectModule.getProjectIndex(oldProject);
		const newProjectIndex = projectModule.getProjectIndex(newProject);
		const oldProjectTasks = projectModule.allProjects[oldProjectIndex].tasks;
		const newProjectTasks = projectModule.allProjects[newProjectIndex].tasks;
		newProjectTasks.push(oldProjectTasks[taskIndex]);
		oldProjectTasks.splice(taskIndex, 1);
	};
	const editTask = (
		projectName,
		taskTitle,
		newTitle,
		newDescription,
		newPriority,
		newDueDate,
		newIsCompleted,
		newAssociatedProject
	) => {
		const { taskIndex, projectTasks } = getTaskIndex(projectName, taskTitle);
		projectTasks.at(taskIndex).title = newTitle;
		projectTasks.at(taskIndex).description = newDescription;
		projectTasks.at(taskIndex).priority = newPriority;
		projectTasks.at(taskIndex).dueDate = newDueDate;
		projectTasks.at(taskIndex).isCompleted = newIsCompleted;
		projectTasks.at(taskIndex).associatedProject = newAssociatedProject;
		moveTaskToProject(taskTitle, projectName, newAssociatedProject);
	};
	const getTodaysTasks = () => {
		const dateFormatted = format(new Date(), 'yyyy-MM-dd');
		const todayCollection = Object.values(getAllTasks()).filter(
			(task) => task.dueDate === dateFormatted
		);
		return todayCollection;
	};

	const getWeekTasks = () => {
		const weekStart = format(
			startOfWeek(new Date(), { weekStartsOn: 1 }),
			'yyyy-MM-dd'
		);
		const weekEnd = format(
			endOfWeek(new Date(), { weekStartsOn: 1 }),
			'yyyy-MM-dd'
		);
		const weekCollection = Object.values(getAllTasks()).filter(
			(task) => task.dueDate >= weekStart && task.dueDate <= weekEnd
		);

		return weekCollection;
	};

	return {
		Task,
		allTasks,
		getAllTasks,
		createTask,
		getTaskIndex,
		deleteTask,
		markTaskCompleted,
		editTask,
		returnThisTask,
		getTodaysTasks,
		getWeekTasks,
	};
})();

export default taskModule;
