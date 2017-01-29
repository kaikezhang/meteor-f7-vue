import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Tasks } from './collections';

Meteor.methods({
  'tasks.insert'(name) {
    check(name, String);

    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Tasks.insert({
      name,
      isPublic: false,
      isDone: false,
      createdAt: new Date(),
      owner: this.userId,
    });
  },
  'tasks.remove'(taskId) {
    check(taskId, String);
    
    const task = Tasks.findOne(taskId);

    if (task.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    Tasks.remove(taskId);
  },
  'tasks.setDone'(taskId, setDone) {
    check(taskId, String);
    check(setDone, Boolean);

    Tasks.update(taskId, { $set: { isDone: setDone } });
  },
  'tasks.setPublic'(taskId, setPublic) {
    check(taskId, String);
    check(setPublic, Boolean);

    const task = Tasks.findOne(taskId);

    if (task.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Tasks.update(taskId, { $set: { isPublic: setPublic } });
  },
});
