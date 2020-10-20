import React, { useState, useEffect } from "react";
import Firebase from "firebase";
import config from "../fbConfig";
import { useForm } from "react-hook-form";
function AddPost() {
    const [data, setData] = useState([]);
    if (!Firebase.apps.length) {
        Firebase.initializeApp(config);
      }
    var currentdate = new Date(); 
    var datetime = "Last Sync: " + currentdate.getDate() + "/"
                    + (currentdate.getMonth()+1)  + "/" 
                    + currentdate.getFullYear() + " @ "  
                    + currentdate.getHours() + ":"  
                    + currentdate.getMinutes() + ":" 
                    + currentdate.getSeconds();
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => {
        const resObj = {
            title: data.btitle,
            description: data.desc,
            sdesc:data.sdesc,
            pby: data.pby,
            pon:datetime
          }
        Firebase.database().ref('posts/').push(resObj);
    console.log("DATA SAVED");
    }
    return (
    <div className="container" id="AddPosts">
        <div className="row">
        <h3>{}</h3>
          <div className="col-lg-8 col-md-10 mx-auto">
              <h2 className="post-title">Add blog Post</h2>
            <p>Want to get in touch? Fill out the form below to send me a message and I will get back to you as soon as possible!</p>
            <form method='post' onSubmit={handleSubmit(onSubmit)}>
              <div className="control-group">
                <div className="form-group floating-label-form-group controls">
                  <label>Title</label>
                  <input type="text" className="form-control" placeholder="Blog Title" name="btitle" required data-validation-required-message="Please enter blog title." ref={register({ required: true, maxLength: 30 })} />
                  <p className="help-block text-danger"></p>
                </div>
              </div>
             <br/>
             <div className="control-group">
                <div className="form-group floating-label-form-group controls">
                  <label>Short Description</label>
                  <textarea rows="5" className="form-control" placeholder="Add Short Description" name="sdesc" required data-validation-required-message="Please enter the short description." ref={register({ required: true, maxLength: 300 })} ></textarea>
                  <p className="help-block text-danger"></p>
                </div>
              </div>
              <br/>
              
              <div className="control-group">
                <div className="form-group floating-label-form-group controls">
                  <label>Description</label>
                  <textarea rows="5" className="form-control" placeholder="Add Description" name="desc" required data-validation-required-message="Please enter the blog description." ref={register({ required: true, maxLength: 30000 })} ></textarea>
                  <p className="help-block text-danger"></p>
                </div>
              </div>
              <br/>
              <div className="control-group">
                <div className="form-group floating-label-form-group controls">
                  <label>Posted By</label>
                  <input type="text" className="form-control" placeholder="Posted By" name="pby" required data-validation-required-message="Please enter your name." ref={register({ required: true, maxLength: 30 })} />
                  <p className="help-block text-danger"></p>
                </div>
              </div>
              <br/>
             
              <div id="success"></div>
              <button type="submit" className="btn btn-primary" id="sendMessageButton">Send</button>
            </form>
          </div>
        </div>
      </div>

    )

}

export default AddPost;