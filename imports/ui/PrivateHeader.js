import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { Accounts } from 'meteor/accounts-base';
import Logo from './Logo';

// PRESENTATIONAL COMPONENT
const PrivateHeader = (props) => {
  const onGoHome = () => {
    browserHistory.push('/');
  }
  const onGoSignup = () => {
    browserHistory.push('/signup');
  }
  const onGoTestPage = () => {
    browserHistory.push('/test');
  }
  const onLogout = () => {
    // browserHistory.push('/');
    Accounts.logout();
  }

  return (
    <div className="header">
      <div className="header__content">
        <Logo stylingInfo={"logo--small"} />

      
        <button className="button button--link-text" onClick={() => Accounts.logout()}>Logout</button>
      </div>
    </div>
  );
};


PrivateHeader.defaultProps = {title: 'My Generic Title'}

export default PrivateHeader;
