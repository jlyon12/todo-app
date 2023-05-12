/* eslint-disable no-use-before-define */
import projectModule from '../components/project';
import taskModule from '../components/task';
import cacheDom from './cacheDom';
import {
	renderProjectList,
	renderInboxTasks,
	hideTaskForm,
	showTaskForm,
	renderProjectSelectOptions,
	getTaskFormValues,
	updateFormValuesWithCurrentTask,
	updateFormToEditTaskMode,
	updateFormToAddNewTaskMode,
	renderAllTasks,
	renderProjectTasks,
	renderTodayTasks,
	renderWeekTasks,
} from './domManipulator';

const {
	btnNewTask,
	formProject,
	projectNameInput,
	btnsDeleteProject,
	btnsDeleteTasks,
	btnsMarkComplete,
	btnsEditTasks,
	btnSubmitUpdatedTask,
	linksProjects,
	btnCloseModule,
	formTask,
	allTasksFilter,
	todayFilter,
	inboxFilter,
	weekFilter,
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
	projectModule.createProject(projectNameInput.value);
	renderProjectList();
	renderProjectSelectOptions();
	formProject.reset();
	addClickListenersToRenderedNodes();
});

const deleteProjectClick = (e) => {
	const projectId = e.target.parentNode.id;
	const projectName = projectId.replace(/-/g, ' ');
	projectModule.deleteProject(projectName);
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
		taskModule.createTask(
			title,
			description,
			priority,
			dueDate,
			taskCompleted,
			associatedProject
		);
	} else if (!btnSubmitUpdatedTask.classList.contains('hidden')) {
		const { taskTitle, projectName } = formProject.dataset;
		taskModule.editTask(
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
	taskModule.deleteTask(projectName, taskTitle);
	renderAllTasks();
	addClickListenersToRenderedNodes();
};

const markTaskCompleteClick = (e) => {
	const { taskTitle, projectName } = e.target.parentNode.parentNode.dataset;
	taskModule.markTaskCompleted(projectName, taskTitle);
	renderAllTasks();
	addClickListenersToRenderedNodes();
};
