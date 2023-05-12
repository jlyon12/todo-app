const cacheDom = (() => {
	// Task Elements
	const addTaskIcon = document.getElementById('addTaskIcon');
	const btnNewTask = document.getElementById('btnNewTask');
	const taskCollection = document.getElementById('taskCollection');
	const btnsDeleteTasks = () => document.querySelectorAll('.btnDeleteTask');
	const btnsMarkComplete = () => document.querySelectorAll('.btnMarkComplete');
	const btnsEditTasks = () => document.querySelectorAll('.btnEditTask');

	// Task Filter Elements
	const allTasksFilter = document.getElementById('allTaskFilter');
	const inboxFilter = document.getElementById('inboxFilter');
	const todayFilter = document.getElementById('todayFilter');
	const weekFilter = document.getElementById('weekFilter');

	// Project List and New Project Form elements
	const listProjects = document.getElementById('listProjects');
	const listItemsProjects = listProjects.childNodes;
	const linksProjects = () => document.querySelectorAll('.projectLink');
	const formProject = document.getElementById('formProject');
	const projectNameInput = document.getElementById('projectName');
	const btnAddProject = document.getElementById('btnAddProject');
	const btnsDeleteProject = () =>
		document.querySelectorAll('.btnDeleteProject');

	// Form Element and Form Inputs
	const btnCloseModule = document.getElementById('btnCloseModule');
	const formModule = document.getElementById('formModule');
	const spanModuleTitle = document.getElementById('spanModuleTitle');
	const formTask = document.getElementById('formTask');
	const titleInput = document.getElementById('taskTitle');
	const descriptionInput = document.getElementById('taskDescription');
	const priorityInput = document.getElementById('taskPriority');
	const dueDateInput = document.getElementById('taskDueDate');
	const taskCompletedInput = document.getElementById('taskCompleted');
	const taskProjectSelect = document.getElementById('taskProjectSelect');
	const btnSubmitTask = document.getElementById('btnSubmitTask');
	const btnSubmitUpdatedTask = document.getElementById('btnSubmitUpdatedTask');
	const btnReset = document.getElementById('#btnResetForm');
	return {
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
		listProjects,
		listItemsProjects,
		projectNameInput,
		btnAddProject,

		// Add Task Form and related elements
		addTaskIcon,
		formModule,
		btnCloseModule,
		spanModuleTitle,
		formTask,
		titleInput,
		descriptionInput,
		priorityInput,
		dueDateInput,
		taskCompletedInput,
		taskProjectSelect,
		btnSubmitUpdatedTask,
		btnNewTask,
		btnSubmitTask,
		btnReset,
		// Task Output
		taskCollection,
	};
})();

export default cacheDom;
