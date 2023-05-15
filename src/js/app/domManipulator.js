import format from 'date-fns/format';
import cacheDom from './cacheDom';
import { projectController, taskController } from './appController';
import DeleteIcon from '../../assets/images/delete-icon.svg';
import DeleteIconHover from '../../assets/images/delete-icon-hover.svg';
import EditIcon from '../../assets/images/edit-icon.svg';
import EditIconHover from '../../assets/images/edit-icon-hover.svg';

const hideTaskForm = () => {
	const { formModule } = cacheDom;
	formModule.classList.add('hidden');
};

const showTaskForm = () => {
	const { formModule } = cacheDom;
	formModule.classList.remove('hidden');
};
// Create DOM elements related to Projects
const createProjectSelectOption = (project) => {
	const { taskProjectSelect } = cacheDom;
	const selectOption = document.createElement('option');
	selectOption.value = project.name;
	selectOption.textContent = project.name;
	taskProjectSelect.appendChild(selectOption);
};

const renderProjectSelectOptions = () => {
	const { taskProjectSelect } = cacheDom;
	const defaultOption = document.createElement('option');
	defaultOption.value = 'Inbox';
	defaultOption.textContent = 'Send to Inbox';
	taskProjectSelect.textContent = '';
	taskProjectSelect.appendChild(defaultOption);
	projectController.allProjects.forEach((project) => {
		if (project.name !== 'Inbox') {
			createProjectSelectOption(project);
		}
	});
};

const createProjectWrapper = (project) => {
	const projectList = cacheDom.listProjects;
	const projectListItem = document.createElement('li');
	const projectLink = document.createElement('a');
	projectLink.classList.add('projectLink');
	projectLink.setAttribute('href', `#${project.name}`);
	projectLink.textContent = project.name;
	const btnEditProject = document.createElement('button');
	btnEditProject.setAttribute('class', `btnEditProject`);
	const editIcon = new Image();
	editIcon.src = EditIcon;

	const disableHoverEffectEditIcon = () => {
		editIcon.src = EditIcon;
	};
	const enableHoverEffectEditIcon = () => {
		editIcon.src = EditIconHover;
	};
	btnEditProject.addEventListener('mouseover', enableHoverEffectEditIcon);
	btnEditProject.addEventListener('mouseleave', disableHoverEffectEditIcon);
	btnEditProject.appendChild(editIcon);
	const btnDeleteProject = document.createElement('button');
	btnDeleteProject.setAttribute('class', `btnDeleteProject`);
	const deleteIcon = new Image();
	deleteIcon.src = DeleteIcon;

	const disableHoverEffectDeleteIcon = () => {
		deleteIcon.src = DeleteIcon;
	};
	const enableHoverEffectDeleteIcon = () => {
		deleteIcon.src = DeleteIconHover;
	};
	deleteIcon.addEventListener('mouseover', enableHoverEffectDeleteIcon);
	deleteIcon.addEventListener('mouseleave', disableHoverEffectDeleteIcon);
	btnDeleteProject.appendChild(deleteIcon);

	const formatID = project.name.replace(/ /g, '-');
	projectListItem.setAttribute('id', `${formatID}`);
	projectListItem.dataset.projectName = project.name;
	projectListItem.appendChild(projectLink);
	projectListItem.appendChild(btnEditProject);
	projectListItem.appendChild(btnDeleteProject);
	projectList.appendChild(projectListItem);
	if (project.name === 'Inbox') {
		projectListItem.classList.add('hidden');
	}
};

const renderProjectList = () => {
	const projectList = cacheDom.listProjects;
	projectList.textContent = '';
	projectController.allProjects.forEach((project) => {
		createProjectWrapper(project);
	});
};

const updateFormToEditProjectMode = () => {
	const { btnEditProjectSubmit, btnAddProject } = cacheDom;
	btnAddProject.classList.add('hidden');
	btnEditProjectSubmit.classList.remove('hidden');
};

const updateFormToAddProjectMode = () => {
	const { btnEditProjectSubmit, btnAddProject } = cacheDom;
	btnAddProject.classList.remove('hidden');
	btnEditProjectSubmit.classList.add('hidden');
};
// Create DOM elements related to Tasks
const getTaskFormValues = () => {
	const title = cacheDom.titleInput.value;
	const description = cacheDom.descriptionInput.value;
	const priority = cacheDom.priorityInput.value;
	const dueDate = cacheDom.dueDateInput.value;
	const taskCompleted = cacheDom.taskCompletedInput.checked;
	const associatedProject = cacheDom.taskProjectSelect.value;

	return {
		title,
		description,
		priority,
		dueDate,
		taskCompleted,
		associatedProject,
	};
};

const updateFormToEditTaskMode = () => {
	const { btnSubmitTask, btnSubmitUpdatedTask, spanModuleTitle } = cacheDom;
	btnSubmitTask.classList.add('hidden');
	btnSubmitUpdatedTask.classList.remove('hidden');
	spanModuleTitle.textContent = 'Edit';
};

const updateFormToAddNewTaskMode = () => {
	const { btnSubmitTask, btnSubmitUpdatedTask, spanModuleTitle } = cacheDom;
	btnSubmitTask.classList.remove('hidden');
	btnSubmitUpdatedTask.classList.add('hidden');
	spanModuleTitle.textContent = 'Add';
};

const updateFormValuesWithCurrentTask = (projectName, taskTitle) => {
	const thisTask = taskController.returnThisTask(projectName, taskTitle);
	cacheDom.titleInput.value = thisTask.title;
	cacheDom.descriptionInput.value = thisTask.description;
	cacheDom.priorityInput.value = thisTask.priority;
	cacheDom.dueDateInput.value = thisTask.dueDate;
	cacheDom.taskCompletedInput.checked = thisTask.taskCompleted;
	cacheDom.taskProjectSelect.value = thisTask.associatedProject;
};

const createTaskWrapper = (task) => {
	const { taskCollection } = cacheDom;
	const taskWrapper = document.createElement('div');
	taskWrapper.classList.add('task-wrapper');
	const taskHeader = document.createElement('div');
	taskHeader.classList.add('task-header');
	const title = document.createElement('h3');
	title.textContent = task.title;

	const dueDate = document.createElement('p');
	const dateArray = task.dueDate.split('-');
	const formatDate = format(
		new Date(dateArray[0], dateArray[1] - 1, dateArray[2]),
		'PPP'
	);
	dueDate.textContent = formatDate;
	const btnComplete = document.createElement('input');
	btnComplete.type = 'checkbox';
	btnComplete.classList.add('btnMarkComplete');
	if (task.isCompleted === true) {
		btnComplete.checked = true;
	} else btnComplete.checked = false;

	taskHeader.appendChild(title);
	taskHeader.appendChild(dueDate);
	taskHeader.appendChild(btnComplete);
	const taskBody = document.createElement('div');
	taskBody.classList.add('task-body');
	const description = document.createElement('p');
	description.textContent = task.description;
	taskBody.appendChild(description);
	const taskFooter = document.createElement('div');
	taskFooter.classList.add('task-footer');
	const project = document.createElement('p');
	project.textContent = 'Project: ';
	const projectSpan = document.createElement('span');
	project.appendChild(projectSpan);
	projectSpan.textContent = task.associatedProject;
	if (task.associatedProject === 'Inbox') {
		projectSpan.classList.add('task-project-inbox');
	}
	const priority = document.createElement('p');
	const prioritySpan = document.createElement('span');
	prioritySpan.textContent = task.priority;
	if (task.priority === 'Low') {
		prioritySpan.classList.add('task-priority-low');
	} else if (task.priority === 'High') {
		prioritySpan.classList.add('task-priority-high');
	} else if (task.priority === 'Medium') {
		prioritySpan.classList.add('task-priority-medium');
	}
	priority.textContent = 'Priority: ';
	priority.appendChild(prioritySpan);
	const btnDelete = document.createElement('button');
	btnDelete.classList.add('button');
	btnDelete.classList.add('btnDeleteTask');
	btnDelete.textContent = 'Delete Task';
	const btnEdit = document.createElement('button');
	btnEdit.classList.add('button');
	btnEdit.classList.add('btnEditTask');
	btnEdit.textContent = 'Edit Task';
	taskWrapper.dataset.projectName = task.associatedProject;
	taskWrapper.dataset.taskTitle = task.title;
	title.addEventListener('click', () => {
		taskBody.classList.toggle('hidden');
		taskFooter.classList.toggle('hidden');
	});
	taskFooter.appendChild(project);
	taskFooter.appendChild(priority);
	taskFooter.appendChild(btnDelete);
	taskFooter.appendChild(btnEdit);
	taskWrapper.appendChild(taskHeader);
	// taskBody.classList.add('hidden');
	taskWrapper.appendChild(taskBody);
	// taskFooter.classList.add('hidden');

	taskWrapper.appendChild(taskFooter);
	taskCollection.appendChild(taskWrapper);
};

const renderAllTasks = () => {
	const { taskCollection } = cacheDom;
	taskCollection.textContent = '';
	taskController.getAllTasks().forEach((task) => {
		createTaskWrapper(task);
	});
};

const renderInboxTasks = () => {
	const { taskCollection } = cacheDom;
	taskCollection.textContent = '';
	projectController
		.getProjectTasks('Inbox')
		.forEach((task) => createTaskWrapper(task));
};

const renderProjectTasks = (projectName) => {
	const { taskCollection } = cacheDom;
	taskCollection.textContent = '';
	projectController
		.getProjectTasks(projectName)
		.forEach((task) => createTaskWrapper(task));
};
const renderTodayTasks = () => {
	const { taskCollection } = cacheDom;
	taskCollection.textContent = '';
	taskController.getTodaysTasks().forEach((task) => createTaskWrapper(task));
};

const renderWeekTasks = () => {
	const { taskCollection } = cacheDom;
	taskCollection.textContent = '';
	taskController.getWeekTasks().forEach((task) => createTaskWrapper(task));
};
export {
	hideTaskForm,
	showTaskForm,
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
};
