import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Links } from './../api/links';
import FlipMove from 'react-flip-move';

// Meteor Sessions
import { Session } from 'meteor/session';

import LinksListItem from './LinksListItem';


class LinksList extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      links: []
    };
  }

  componentDidMount(){
    // this gets called by react after the component is rendered
    this.linksTracker = Tracker.autorun( () => {
      // subscribe to meteor updates to the collection
      // use the same string set in the Meteor.publish() method
      Meteor.subscribe('links');
      const links = Links.find({
        visible: Session.get('showVisible')  // Session.get('showVisible') returns true or false
      }).fetch();
      this.setState({links: [...links]})
    });
  }

  componentWillUnmount(){
    this.linksTracker.stop();
    console.log('linksTracker stopped', this.linksTracker);
  }

  renderLinksListItems(){
    if(this.state.links.length === 0) {
      return (
        <div className="item">
          <p>There are no links</p>
        </div>
      );
    } else {
      return this.state.links.map( (link) => {
        const shortUrl = Meteor.absoluteUrl(link._id);
        return (
          <LinksListItem key={link._id} shortUrl={shortUrl} {...link}/>
        );
      });
    }

  }


  render(){
    return (
      <div>
        <FlipMove maintainContainerHeight={true} >
          {this.renderLinksListItems()}
        </FlipMove>
      </div>
    );
  }
}

export default LinksList;
