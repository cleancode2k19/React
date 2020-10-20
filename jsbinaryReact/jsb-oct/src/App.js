import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Core from './components/Core';
import About from './components/About';
import Technology from './components/Tech';
import Nontech from './components/Nontech';
import BlogPosts from './components/BlogPosts';
import Cont from './components/Cont';
import AddPost from './components/AddPost';
function App() {
  console.log(window.location.search);
  return (
    <Router>
    <nav class="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
      <div class="container">
        <a class="navbar-brand" href="index.html">JSBinary</a>
        <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          Menu
          <i class="fas fa-bars"></i>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <a class="nav-link" href="#indexHeader">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#about">About</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#blogPosts">Blog Posts</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#tech">Technology</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#nontech">Life Beyond Technology</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#contactUs">Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <Core /> <br/> <br/>
     {window.location.pathname==='/AddPost'?
       <div> <br/>
       <Route exact path="/AddPost" component={AddPost} /> <br/>
       </div>
     :
       
      <div>
     
       <BlogPosts /> <br/> <br/>
       <About /><br/> <br/>
       <Technology/><br/> <br/>
       <Nontech/><br/> <br/>
       <Cont /><br/> <br/>
       </div>
     
    }
   
       

    
   
    
    </Router>
  );
}

export default App;
