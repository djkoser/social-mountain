import React, { Component } from 'react';
import CompanyIcon from 'react-icons/lib/md/filter-hdr';
import ProfileIcon from 'react-icons/lib/md/person-outline';
import axios from 'axios';
import './Header.css';
import Search from './Search/Search';

//////////////////////////////////////////////////////// THIS COMPONENT IS BEING RENDERED IN THE *APP* COMPONENT

export default class Header extends Component {
  
  filterPosts = (filterText) => {
    if (filterText==='') {
      this.props.applyFilterFn(null,true)
    } else {
      axios.get('https://practiceapi.devmountain.com/api/posts/filter?text='+encodeURI(filterText))
      .then(res=>this.props.applyFilterFn(res.data,false))
      .catch(err=>console.log(err));
    };
  } ;

  render() {
    return (
      <section className="Header__parent">
        <section className="Header__content">

          {/* Displays the mountain icon in the header */}
          <div className="Header__company-info">
            <CompanyIcon id="Header__company-icon" />
            <span>Social Mountain</span>
          </div>

          {/* Displays the search bar */}
          <div className="Header__right">
            <Search filterPosts={this.filterPosts}/>

            {/* Displays the profile icon */}
            <div className="Header__profile">
              <ProfileIcon />
            </div>
          </div>

        </section>
      </section>
    )
  }
}