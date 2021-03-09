import React, { Component } from 'react';

import './Search.css';

import SearchIcon from 'react-icons/lib/md/search';

//////////////////////////////////////////////////////// THIS COMPONENT IS BEING RENDERED IN THE *HEADER* COMPONENT

export default class Search extends Component {
  constructor (props) {
    super(props);
    this.state={
      searchInput:''
    }
  }
  handleChange = (input) => {
    this.setState({
      searchInput:input,
    })
  }
  proccessInput = () => {
    this.props.filterPosts(this.state.searchInput);
    this.setState({
      searchInput:''
    })
  }
  render() {
    return (
      <section className="Search__parent">

        <div className="Search__content">
          <input value={this.state.searchInput} onChange={event=> this.handleChange(event.target.value)}placeholder="Search Your Feed" />

          <SearchIcon onClick={this.proccessInput} id="Search__icon" />
        </div>
        
      </section>
    )
  }
}