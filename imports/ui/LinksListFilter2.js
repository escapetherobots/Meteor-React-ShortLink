import React from 'react';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';

class LinksListFilter2 extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      labelText: true
    }
  }

  componentDidMount(){
    this.tracker = Tracker.autorun( () => {
      this.setState({
        labelText: Session.get('showVisible')
      });
    });
  }

  componentWillUnmount(){
    this.tracker.stop();
  }

  componentDidUpdate(){
    console.log('link list filter 2:::', this.state.labelText);
  }

  onUpdateSession(e){
    console.log(e.target);
    // Session.set('showVisible', !Session.get('showVisible'));
    // set the value to opposite of whatever is actually checked
    const currentSession = Session.get('showVisible');
    console.log(currentSession);
    Session.set('showVisible', !currentSession);
    this.setState({
      labelText: !currentSession
    });
  };

  render(){
    return (
      <div>
        <button className="button button--secondary" onClick={this.onUpdateSession.bind(this)}>
          Show {this.state.labelText? "Hidden" : "Regular"} Links
        </button>
      </div>
    );
  }

}


export default LinksListFilter2;
