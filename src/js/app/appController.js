import format from 'date-fns/format';
import startOfWeek from 'date-fns/startOfWeek';
import endOfWeek from 'date-fns/endOfWeek';
import Project from '../components/project';
import Task from '../components/task';

const projectController = (() => {
	const allProjects = [];
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

	const editProjectName = (projectName, newName) => {
		const index = getProjectIndex(projectName);
		allProjects[index].name = newName;
		allProjects[index].tasks.forEach(
			(task) => (task.associatedProject = newName)
		);
	};

	const getProjectTasks = (projectName) => {
		const index = getProjectIndex(projectName);
		const thisProject = allProjects[index];
		return thisProject.tasks;
	};

	createProject('Inbox');

	return {
		allProjects,
		createProject,
		deleteProject,
		editProjectName,
		getProjectIndex,
		getProjectTasks,
	};
})();

const taskController = (() => {
	let allTasks = [];
	const getAllTasks = () => {
		allTasks = [];
		projectController.allProjects.forEach((project) => {
			allTasks = allTasks.concat(project.tasks);
		});
		return allTasks;
	};
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
		const projectIndex = projectController.getProjectIndex(associatedProject);
		projectController.allProjects.at(projectIndex).tasks.push(task);
		return task;
	};

	const getTaskIndex = (projectName, taskTitle) => {
		const projectIndex = projectController.getProjectIndex(projectName);
		const parentProject = projectController.allProjects[projectIndex];
		const projectTasks = parentProject.tasks;
		const taskIndex = projectTasks.findIndex(
			(task) => task.title === taskTitle
		);

		return { projectTasks, taskIndex };
	};
	const returnThisTask = (projectName, taskTitle) => {
		const { taskIndex, projectTasks } = getTaskIndex(projectName, taskTitle);
		return projectTasks.at(taskIndex);
	};

	const deleteTask = (projectName, taskTitle) => {
		const { taskIndex, projectTasks } = getTaskIndex(projectName, taskTitle);
		return projectTasks.splice(taskIndex, 1);
	};

	const markTaskCompleted = (projectName, taskTitle) => {
		const { taskIndex, projectTasks } = getTaskIndex(projectName, taskTitle);
		if (projectTasks.at(taskIndex).isCompleted === false) {
			projectTasks.at(taskIndex).isCompleted = true;
		} else projectTasks.at(taskIndex).isCompleted = false;
		return projectTasks.at(taskIndex).isCompleted;
	};
	const moveTaskToProject = (taskTitle, oldProject, newProject) => {
		const { taskIndex } = getTaskIndex(oldProject, taskTitle);
		const oldProjectIndex = projectController.getProjectIndex(oldProject);
		const newProjectIndex = projectController.getProjectIndex(newProject);
		const oldProjectTasks =
			projectController.allProjects[oldProjectIndex].tasks;
		const newProjectTasks =
			projectController.allProjects[newProjectIndex].tasks;
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

export { projectController, taskController };
