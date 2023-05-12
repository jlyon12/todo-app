/* eslint-disable no-use-before-define */
import { projectController, taskController } from './appController';
import cacheDom from './cacheDom';
import {
	hideTaskForm,
	showTaskForm,
	getTaskFormValues,
	updateFormValuesWithCurrentTask,
	updateFormToEditTaskMode,
	updateFormToAddNewTaskMode,
	renderProjectSelectOptions,
	renderProjectList,
	renderAllTasks,
	renderInboxTasks,
	renderProjectTasks,
	renderTodayTasks,
	renderWeekTasks,
} from './domManipulator';

const {
	// Functions for updating nodeLists
	btnsDeleteTasks,
	btnsEditTasks,
	btnsMarkComplete,
	linksProjects,
	btnsDeleteProject,
	// Links for Project Filters
	allTasksFilter,
	inboxFilter,
	todayFilter,
	weekFilter,
	// Project Form and Project Elements
	formProject,
	projectNameInput,
	// Add Task Form and related elements
	btnCloseModule,
	formTask,
	btnSubmitUpdatedTask,
	btnNewTask,
} = cacheDom;

const addClickListenersToRenderedNodes = () => {
	btnsDeleteProject().forEach((btn) =>
		btn.addEventListener('click', deleteProjectClick)
	);

	btnsDeleteTasks().forEach((btn) =>
		btn.addEventListener('click', deleteTaskClick)
	);
	btnsMarkComplete().forEach((btn) =>
		btn.addEventListener('click', markTaskCompleteClick)
	);

	btnsEditTasks().forEach((btn) => {
		btn.addEventListener('click', editTaskClick);
	});
	linksProjects().forEach((link) => {
		link.addEventListener('click', projectLinkClick);
	});
};

// Handle Filtering Tasks
allTasksFilter.addEventListener('click', () => {
	renderAllTasks();
	addClickListenersToRenderedNodes();
});
inboxFilter.addEventListener('click', () => {
	renderInboxTasks();
	addClickListenersToRenderedNodes();
});
todayFilter.addEventListener('click', () => {
	renderTodayTasks();
	addClickListenersToRenderedNodes();
});
weekFilter.addEventListener('click', () => {
	renderWeekTasks();
	addClickListenersToRenderedNodes();
});

// Handle Filtering per Project Basis
const projectLinkClick = (e) => {
	const { projectName } = e.target.dataset;
	renderProjectTasks(projectName);
};

// Handle Project Creation and Deletion

formProject.addEventListener('submit', (e) => {
	e.preventDefault();
	projectController.createProject(projectNameInput.value);
	renderProjectList();
	renderProjectSelectOptions();
	formProject.reset();
	addClickListenersToRenderedNodes();
});

const deleteProjectClick = (e) => {
	const projectId = e.target.parentNode.id;
	const projectName = projectId.replace(/-/g, ' ');
	projectController.deleteProject(projectName);
	renderProjectList();
	addClickListenersToRenderedNodes();
};

// Handle Task Creation and Deletion
btnNewTask.addEventListener('click', () => {
	updateFormToAddNewTaskMode();
	showTaskForm();
	btnCloseModule.addEventListener('click', hideTaskForm);
});

formTask.addEventListener('submit', (e) => {
	e.preventDefault();
	const {
		title,
		description,
		priority,
		dueDate,
		taskCompleted,
		associatedProject,
	} = getTaskFormValues();

	if (btnSubmitUpdatedTask.classList.contains('hidden')) {
		taskController.createTask(
			title,
			description,
			priority,
			dueDate,
			taskCompleted,
			associatedProject
		);
	} else if (!btnSubmitUpdatedTask.classList.contains('hidden')) {
		const { taskTitle, projectName } = formProject.dataset;
		taskController.editTask(
			projectName,
			taskTitle,
			title,
			description,
			priority,
			dueDate,
			taskCompleted,
			associatedProject
		);
		updateFormToAddNewTaskMode();
	}
	cacheDom.formTask.reset();
	hideTaskForm();
	renderAllTasks();
	addClickListenersToRenderedNodes();
});

const editTaskClick = (e) => {
	updateFormToEditTaskMode();
	const { taskTitle, projectName } = e.target.parentNode.parentNode.dataset;
	updateFormValuesWithCurrentTask(projectName, taskTitle);
	showTaskForm();
	formProject.dataset.projectName = projectName;
	formProject.dataset.taskTitle = taskTitle;
};

const deleteTaskClick = (e) => {
	const { taskTitle, projectName } = e.target.parentNode.parentNode.dataset;
	taskController.deleteTask(projectName, taskTitle);
	renderAllTasks();
	addClickListenersToRenderedNodes();
};

const markTaskCompleteClick = (e) => {
	const { taskTitle, projectName } = e.target.parentNode.parentNode.dataset;
	taskController.markTaskCompleted(projectName, taskTitle);
	renderAllTasks();
	addClickListenersToRenderedNodes();
};
