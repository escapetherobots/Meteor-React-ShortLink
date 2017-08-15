import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
// Meteor Session Package
import { Session } from 'meteor/session';
// custom error handling
import './../imports/startup/simple-schema-config';
// routes
import { onAuthChange, routes } from './../imports/routes/routes';
//tracker
import { Tracker } from 'meteor/tracker';


// 1. First Thing
// On App start check for Authentication
Tracker.autorun( () => {
  // flip value twice to give the default value as a boolean
  const isAuthenticated = !!Meteor.userId();
  onAuthChange(isAuthenticated);
});


Meteor.startup( () => {
  // Meteor.call('greetUser', (err, res) => {
  //   console.log('greet user method', err, res);
  // });
  // Meteor.call('greetUser',(err, res) => {
  //   console.log('greet user method', err, res);
  // });
  //
  // Meteor.call('addNumbers', 2, 4, (err, res) => {
  //   console.log('add numbers method', err, res);
  // });

  // Render to DOM
  // ReactDOM.render(
  //   <MyComponent name="jojo" />,
  //   document.getElementById('app')
  // );
  Session.set('showVisible', true);
  ReactDOM.render(
    routes,
    document.getElementById('app')
  );
});
