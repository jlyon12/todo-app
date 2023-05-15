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

export { saveAllProjects, loadAllProjects };
