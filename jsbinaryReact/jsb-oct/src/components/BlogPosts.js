import React, { Component } from "react";
import Firebase from "firebase";
import config from "../fbConfig";
class BlogPosts extends Component {
  constructor() {
    super();
    this.state = {
      todos:[]
    };
  //  this.getTodos = this.getTodos.bind(this);
  }

 /* async getTodos() {
    if (!Firebase.apps.length) {
      Firebase.initializeApp(config);
    }
    let ref = Firebase.database().ref("/posts");
    let res = [];
    ref.once("value", snapshot => {
        snapshot.forEach(userSnapshot => {
          res.push(userSnapshot.val());}
        //  let key = userSnapshot.key;
        //var item = userSnapshot.val(); console.log(data);
        /*   ( <div>
                <div className="post-preview">
                  <a href="post.html">
                    <h2 className="post-title">
                    {userSnapshot.val().title}
                    </h2>
                    <h3 className="post-subtitle">
                      {userSnapshot.val().description}
                    </h3>
                  </a>
                  <p className="post-meta">Posted by
                    <a href="#">{userSnapshot.val().pby}</a>
                    on {userSnapshot.val().pon}</p>
                </div>
                <hr/> 
           </div>) 
      )

      });
      this.setState({ todos: res });
      console.log(this.state.todos)
          
  }*/

  componentDidMount() {
    if (!Firebase.apps.length) {
      Firebase.initializeApp(config);
    }
    let ref = Firebase.database().ref("/posts");
   // let res = [];
    ref.once("value", snapshot => {
      snapshot.forEach(userSnapshot => {
        var temp = this.state.todos;
        temp.push(userSnapshot.val());
        this.setState({ 'todos': temp });
      })
    });
    console.log(this.state.todos)
  }

    render() {
      
     return (
        <div className="container" id="blogPosts">
        <div className="row" >
        <div className="col-lg-8 col-md-10 mx-auto">
            <h2 className="post-title">Blog Posts Sneak Peak</h2>
            { this.state.todos && this.state.todos.map(item =>(
               <div>
                <div className="post-preview">
                  <a href="post.html">
                    <h2 className="post-title">
                    {item.title}
                    </h2>
                    <h3 className="post-subtitle">
                      {item.sdesc}
                    </h3>
                  </a>
                  <p className="post-meta">Posted by
                    <a href="#">{item.pby}</a> &nbsp; &nbsp;
                    on {item.pon}</p>
                </div>
                <hr/> 
           </div>
            ))}
          <div className="clearfix">
            <a className="btn btn-primary float-right" href="#">Older Posts &rarr;</a>
          </div>
        </div>
      </div>
    </div>
    )
     }

}

export default BlogPosts;