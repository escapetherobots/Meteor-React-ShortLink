import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import Clipboard from 'clipboard';
import moment from 'moment';

class LinksListItem extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      justCopied: false
    }
  }

  componentDidMount(){
    this.clipboard = new Clipboard(this.refs.copy);

    this.clipboard.on('success', () => {
      this.setState({justCopied: true});

      setTimeout( () => this.setState({justCopied: false}), 1200);

    }).on('error', () => {
      this.setState({justCopied: false});
    });

  }

  componentWillUnmount(){
    this.clipboard.destroy();
    this.setState({justCopied: false});
  }

  onToggleVisible(){
    //create the method
    Meteor.call('links.setVisibility', this.props._id, !this.props.visible);
  }

  renderStats(){
    const visitMessage = this.props.visitedCounter === 1 ? '- visit' : '- visits';
    let visitedMessage = null;
    if(typeof this.props.lastVisitedAt === 'number') {
      visitedMessage = `(visited ${ moment(this.props.lastVisitedAd).fromNow() })`;
    }
    return (
      <p>{this.props.visitedCounter} {visitMessage} {visitedMessage}</p>
    );
  }

  render(){
    return (
      <div className="item">
        <h2>{this.props.url}</h2>
        <p>ShortURL: {this.props.shortUrl}</p>
        {/* <p>Visible: {this.props.visible.toString()}</p> */}
        {this.renderStats()}
        <a className="button button--pill button--link" href={this.props.shortUrl} target="_blank">Visit</a>
        <button className="button button--pill" ref="copy" data-clipboard-text={this.props.shortUrl} >{this.state.justCopied ? "copied" : "copy"}</button>
        <button className="button button--pill" onClick={this.onToggleVisible.bind(this)}>{this.props.visible ? 'Hide' : 'Unhide'}</button>
      </div>
    );
  }

};

LinksListItem.propTypes = {
  _id: React.PropTypes.string.isRequired,
  url: React.PropTypes.string.isRequired,
  userId: React.PropTypes.string.isRequired,
  visible: React.PropTypes.bool.isRequired,
  shortUrl: React.PropTypes.string.isRequired,
  visitedCounter: React.PropTypes.number.isRequired,
  lastVisitedAt: React.PropTypes.number
}

export default LinksListItem;
