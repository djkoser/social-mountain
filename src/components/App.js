import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Post from './Post/Post'
import Header from './Header/Header';
import Compose from './Compose/Compose';

// Base URL https://practiceapi.devmountain.com/api

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
    this.applyFilter= this.applyFilter.bind( this );
  }
  
  renderCurrentPostList() {
    axios.get('https://practiceapi.devmountain.com/api/posts')
    .then(res=> this.setState({posts:res.data}))
    .catch(err=> console.log(err))
  }

  // 
  componentDidMount() {
    this.renderCurrentPostList();
  }

  updatePost(id,text) {
    axios.put(`https://practiceapi.devmountain.com/api/posts?id=${id}`, {text})
    .then(res=> this.setState({posts:res.data}))
    .catch(err=> console.log(err))
  }

  deletePost(id) {
    axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${id}`)
    .then(res=>this.setState({posts:res.data}))
    .catch(err=>console.log(err))
  }

  createPost(text) {
    axios.post(`https://practiceapi.devmountain.com/api/posts`,{text})
    .then(res=>this.setState({posts:res.data}))
    .catch(err=>console.log(err))
  }

  applyFilter(posts,clearFilter) {
    if (!clearFilter) {
      this.setState({
        posts:posts
      });
    } else {this.renderCurrentPostList()}
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header applyFilterFn={this.applyFilter}/>

        <section className="App__content">

          <Compose createPostFn={this.createPost}/>

          {posts.map(el => (<Post 
          text={el.text} 
          date={el.date} 
          key={el.id}
          id={el.id} 
          updatePostFn={this.updatePost} 
          deletePostFn={this.deletePost}
          />))}
          
        </section>
      </div>
    );
  }
}

export default App;
