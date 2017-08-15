import React from 'react';
import { Meteor } from 'meteor/meteor';
import Modal from 'react-modal';

class AddLink extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      url: "",
      isOpen: false,
      error: '',
    }

    this.handleModalClose = this.handleModalClose.bind(this);
  }

  componentDidUpdate(){
    console.log('updating addlink', this.state.url);
  }

  onChange(e){
    this.setState({
      // url: e.target.value.trim()
      url: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const { url } = this.state;
    //trim removes leading and trailing spaces
    // const url = this.refs.url.value.trim();

    Meteor.call('links.insert', url, (err, res) => {
      if(!err){
        this.handleModalClose();
      } else {
        this.setState({error: err.reason})
      }
    });
  }

  handleModalClose(){
    this.setState({isOpen: false, url: "", error: ""})
  }

  render(){
    return (
      <div>
        <button className="button button--primaryBorder" onClick={() => this.setState({isOpen: true})} >+ Add Link</button>
        <Modal
            isOpen={this.state.isOpen}
            contentLabel="Add link"
            onAfterOpen={ () => this.refs.url.focus()}
            onRequestClose={this.handleModalClose}
            className="boxed-view__box"
            overlayClassName="boxed-view boxed-view--modal"
          >
          <h1>Add Link</h1>
          {this.state.error? <p>{this.state.error}</p> : undefined }
          <form className="boxed-view__form" onSubmit={this.onSubmit.bind(this)}>
            <input
              value={this.state.url}
              type="text"
              placeholder="Add Your URL"
              ref="url"
              onChange={this.onChange.bind(this)}
            />
            <button className="button">Add Link</button>
            <button type="button" className="button button--secondary" onClick={this.handleModalClose}>Close Modal</button>
          </form>

        </Modal>
      </div>
    );
  }
}

export default AddLink;
