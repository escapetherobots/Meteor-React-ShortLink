import React from 'react';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';

// CONTROLLED COMPONENT
class LinksListFilter extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      showVisible: true
    }
  }

  componentDidMount(){
    this.tracker = Tracker.autorun( () => {
      const showVisible = Session.get('showVisible');
      this.setState({
        showVisible
      });
    });
  }

  componentWillUnmount(){
    console.log('stopping linkslistfilter');
    this.tracker.stop();
  }

  onUpdateSession(e){
    console.log('update on change', e);
    Session.set('showVisible', !e.target.checked);
  }

  render(){
    return (
      <div>
        <h3>Links</h3>
        <label className="checkbox">
          <input className="checkbox__box" type="checkbox" defaultChecked={!this.state.showVisible} onChange={this.onUpdateSession}/>
          Show Hidden Links
        </label>
      </div>
    );
  }

}

export default LinksListFilter;
