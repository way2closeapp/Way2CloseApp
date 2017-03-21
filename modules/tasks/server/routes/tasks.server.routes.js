'use strict';

/**
 * Module dependencies
 */
var tasksPolicy = require('../policies/tasks.server.policy'),
  tasks = require('../controllers/tasks.server.controller');

module.exports = function(app) {
  // Tasks Routes
  app.route('/api/tasks').all(tasksPolicy.isAllowed)
    .get(tasks.list)
    .post(tasks.create);
app.route('/api/tasks/property/:pId').all(tasksPolicy.isAllowed)
	.get(tasks.listPropertyy)
	.post(tasks.listPropertyy);
  app.route('/api/tasks/:taskId').all(tasksPolicy.isAllowed)
    .get(tasks.read)
    .put(tasks.update)
    .delete(tasks.delete);
app.route('/api/tasksbyuser').all(tasksPolicy.isAllowed)
	.post(tasks.byUser)
	.get(tasks.byUser)
	.put(tasks.byUser);
  // Finish by binding the Task middleware
  app.param('taskId', tasks.taskByID);
  app.param('pId', tasks.listProperty);
};
