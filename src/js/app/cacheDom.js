const cacheDom = (() => {
	const btnToggleSidebar = document.getElementById('btnToggleSidebar');
	const projectSidebar = document.querySelector('.project-container');
	const taskContainer = document.querySelector('.tasks-container');

	// Task Elements
	const taskCollectionTitle = document.getElementById('taskCollectionTitle');
	const addTaskIcon = document.getElementById('addTaskIcon');
	const btnNewTask = document.getElementById('btnNewTask');
	const taskCollection = document.getElementById('taskCollection');
	const btnsDeleteTasks = () => document.querySelectorAll('.btnDeleteTask');
	const btnsMarkComplete = () => document.querySelectorAll('.btnMarkComplete');
	const btnsEditTasks = () => document.querySelectorAll('.btnEditTask');
	const getTaskWrappers = () => document.querySelectorAll('.task-wrapper');
	// Task Filter Elements
	const allTasksFilter = document.getElementById('allTaskFilter');
	const inboxFilter = document.getElementById('inboxFilter');
	const todayFilter = document.getElementById('todayFilter');
	const weekFilter = document.getElementById('weekFilter');
	const completedFilter = document.getElementById('completedFilter');

	// Project List and New Project Form elements
	const listProjects = document.getElementById('listProjects');
	const listItemsProjects = listProjects.childNodes;
	const linksProjects = () => document.querySelectorAll('.projectLink');
	const formProject = document.getElementById('formProject');
	const projectNameInput = document.getElementById('projectName');
	const btnAddProject = document.getElementById('btnAddProject');
	const btnEditProjectSubmit = document.getElementById('btnEditProjectSubmit');
	const btnsDeleteProject = () =>
		document.querySelectorAll('.btnDeleteProject');
	const btnsEditProject = () => document.querySelectorAll('.btnEditProject');

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
		taskContainer,
		// Functions for updating nodeLists
		btnsDeleteTasks,
		btnsEditTasks,
		btnsMarkComplete,
		linksProjects,
		btnsDeleteProject,
		btnsEditProject,
		getTaskWrappers,
		// Links for Project Filters
		allTasksFilter,
		inboxFilter,
		todayFilter,
		weekFilter,
		completedFilter,
		// Project Form and Project Elements
		btnToggleSidebar,
		projectSidebar,
		formProject,
		listProjects,
		listItemsProjects,
		projectNameInput,
		btnAddProject,
		btnEditProjectSubmit,

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
		taskCollectionTitle,
	};
})();

export default cacheDom;
