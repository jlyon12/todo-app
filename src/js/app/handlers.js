/* eslint-disable no-use-before-define */
import { projectController, taskController } from './appController';
import cacheDom from './cacheDom';
import {
	hideTaskForm,
	showTaskForm,
	updateTaskContainerTitle,
	getTaskFormValues,
	updateFormValuesWithCurrentTask,
	updateFormToEditTaskMode,
	updateFormToAddNewTaskMode,
	updateFormToEditProjectMode,
	updateFormToAddProjectMode,
	renderProjectSelectOptions,
	renderProjectList,
	renderAllTasks,
	renderInboxTasks,
	renderProjectTasks,
	renderTodayTasks,
	renderWeekTasks,
} from './domManipulator';

import {
	loadAllProjects,
	saveAllProjects,
	saveAllTasks,
	loadAllTasks,
} from './storage';

const {
	// Functions for updating nodeLists
	btnsDeleteTasks,
	btnsEditTasks,
	btnsMarkComplete,
	linksProjects,
	btnsDeleteProject,
	btnsEditProject,
	// Links for Project Filters
	allTasksFilter,
	inboxFilter,
	todayFilter,
	weekFilter,
	// Project Form and Project Elements
	formProject,
	projectNameInput,
	btnAddProject,
	btnEditProjectSubmit,
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

	btnsEditProject().forEach((btn) => {
		btn.addEventListener('click', editProjectClick);
	});

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
	updateTaskContainerTitle('All Tasks');
	renderAllTasks();
	addClickListenersToRenderedNodes();
});
inboxFilter.addEventListener('click', () => {
	updateTaskContainerTitle('Inbox');
	renderInboxTasks();
	addClickListenersToRenderedNodes();
});
todayFilter.addEventListener('click', () => {
	updateTaskContainerTitle('Today');
	renderTodayTasks();
	addClickListenersToRenderedNodes();
});
weekFilter.addEventListener('click', () => {
	updateTaskContainerTitle('This Week');
	renderWeekTasks();
	addClickListenersToRenderedNodes();
});

// Handle Filtering per Project Basis
const projectLinkClick = (e) => {
	const { projectName } = e.target.closest('li').dataset;
	updateTaskContainerTitle(projectName);
	renderProjectTasks(projectName);
	addClickListenersToRenderedNodes();
	updateTaskContainerTitle(projectName);
};

// Handle Project Creation and Deletion and Editing

formProject.addEventListener('submit', (e) => {
	e.preventDefault();
	if (!btnAddProject.classList.contains('hidden')) {
		projectController.createProject(projectNameInput.value);
	} else if (!btnEditProjectSubmit.classList.contains('hidden')) {
		const { projectName } = formProject.dataset;
		projectController.editProjectName(projectName, projectNameInput.value);
		updateFormToAddProjectMode();
	}
	saveAllProjects();
	renderProjectList();
	renderProjectSelectOptions();
	renderAllTasks();
	formProject.reset();
	addClickListenersToRenderedNodes();
});

const deleteProjectClick = (e) => {
	const { projectName } = e.target.closest('li').dataset;
	projectController.deleteProject(projectName);
	saveAllProjects();
	renderProjectList();
	addClickListenersToRenderedNodes();
};

const editProjectClick = (e) => {
	const { projectName } = e.target.closest('button').parentNode.dataset;
	projectNameInput.value = projectName;
	updateFormToEditProjectMode();
	formProject.dataset.projectName = projectName;
	btnsDeleteProject().forEach((btn) => (btn.disabled = true));
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
		const { taskTitle, projectName } = formTask.dataset;
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
	saveAllTasks();
	hideTaskForm();
	renderAllTasks();
	addClickListenersToRenderedNodes();
});

const editTaskClick = (e) => {
	updateFormToEditTaskMode();
	const { taskTitle, projectName } = e.target.closest('.task-wrapper').dataset;
	updateFormValuesWithCurrentTask(projectName, taskTitle);
	showTaskForm();
	btnCloseModule.addEventListener('click', hideTaskForm);
	formTask.dataset.projectName = projectName;
	formTask.dataset.taskTitle = taskTitle;
};

const deleteTaskClick = (e) => {
	const { taskTitle, projectName } = e.target.closest('.task-wrapper').dataset;
	taskController.deleteTask(projectName, taskTitle);
	saveAllTasks();
	renderAllTasks();
	addClickListenersToRenderedNodes();
};

const markTaskCompleteClick = (e) => {
	const { taskTitle, projectName } = e.target.closest('.task-wrapper').dataset;
	taskController.markTaskCompleted(projectName, taskTitle);
	saveAllTasks();
	renderAllTasks();
	addClickListenersToRenderedNodes();
};

window.addEventListener('load', () => {
	if (localStorage.getItem('savedProjects') !== null) {
		loadAllProjects();
		renderProjectList();
		renderProjectSelectOptions();
		addClickListenersToRenderedNodes();
	}
	if (localStorage.getItem('savedTasks') !== null) {
		loadAllTasks();
		renderAllTasks();
		addClickListenersToRenderedNodes();
	}
});
