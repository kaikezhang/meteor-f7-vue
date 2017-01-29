import { Mongo } from 'meteor/mongo';

export const Tasks = new Mongo.Collection('tasks', {
  // transform(task) {
  //   task.username =  Meteor.users.find(task.owner).username;
  //   return task;
  // },
});

Tasks.schema = new SimpleSchema({
  name: {type: String},
  isDone: {type: Boolean, defaultValue: false},
  isPublic: {type: Boolean, defaultValue: false},
  owner: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
});

Tasks.helpers({
  username() {
    return Meteor.users.findOne(this.owner).username;
  },
});


if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('tasks', function publishTasks() {
    // let self = this;
    return [
      Tasks.find({
        $or: [
        { isPublic: { $eq: true } },
        { owner: this.userId },
        ],
      }),
      Meteor.users.find({}, {fields: {username: 1}}),
    ];

    // self.ready();
  });
}
