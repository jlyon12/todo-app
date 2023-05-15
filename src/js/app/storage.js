import { projectController } from './appController';
import { taskController } from './appController';

const saveAllProjects = () => {
	localStorage.setItem(
		'savedProjects',
		JSON.stringify(projectController.allProjects)
	);
};

const loadAllProjects = () => {
	const savedProjects = JSON.parse(localStorage.getItem('savedProjects'));

	savedProjects.forEach((object) => {
		if (object._name !== 'Inbox') {
			projectController.createProject(object._name);
		}
	});
};

const saveAllTasks = () => {
	localStorage.setItem(
		'savedTasks',
		JSON.stringify(taskController.getAllTasks())
	);
};

const loadAllTasks = () => {
	const savedTasks = JSON.parse(localStorage.getItem('savedTasks'));

	savedTasks.forEach((object) => {
		taskController.createTask(
			object._title,
			object._description,
			object._priority,
			object._dueDate,
			object._isCompleted,
			object._associatedProject
		);
	});
};

export { saveAllProjects, loadAllProjects, saveAllTasks, loadAllTasks };
