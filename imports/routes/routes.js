import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import Signup from '../ui/Signup';
import MyLinks from '../ui/MyLinks';
import D3Test from '../ui/D3Test';
import NotFound from '../ui/NotFound';
import Login from '../ui/Login';

//======================================================
// determine authentication
const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/links']

const onEnterPublicPage = () => {
  if (Meteor.userId()) {
    browserHistory.replace('/links');
  }
};

const onEnterPrivatePage = () => {
  if (!Meteor.userId()){
    browserHistory.replace('/');
  }
}

export const onAuthChange = (isAuthenticated) => {
  const pathname = browserHistory.getCurrentLocation().pathname;
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);

  if(isAuthenticated && isUnauthenticatedPage) {
    browserHistory.replace('/links');
  } else if (!isAuthenticated && isAuthenticatedPage) {
      browserHistory.replace('/');
  }
  console.log('isAuthenticated', isAuthenticated);
}

//======================================================
// Routes
export const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Login} onEnter={onEnterPublicPage}/>
    <Route path="/signup" component={Signup} onEnter={onEnterPublicPage}/>
    <Route path="/links" component={MyLinks} onEnter={onEnterPrivatePage}/>
    <Route path="/test" component={D3Test} />
    <Route path="*" component={NotFound} />
  </Router>
);

// window.browserHistory = browserHistory;
