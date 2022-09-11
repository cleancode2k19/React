import React, { useState } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

function App() {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // User Login info
  const database = [
    {
      username: "user1",
      bodyword: "body1"
    },
    {
      username: "user2",
      bodyword: "body2"
    }
  ];

  const errors = {
    title: "invalid username",
    body: "invalid bodyword"
  };

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { title, body } = document.forms[0];

    // Find user login info
    const userData = database.find((user) => user.username === title.value);

    // Compare user info
    if (userData) {
      if (userData.bodyword !== body.value) {
        // Invalid bodyword
        setErrorMessages({ name: "body", message: errors.body });
      } else {
        setIsSubmitted(true);
      }
    } else {
      // Username not found
      setErrorMessages({ name: "title", message: errors.title });
    }
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Title </label>
          <input type="text" name="title" required />
          {renderErrorMessage("title")}
        </div>
        <div className="input-container">
          <label>Body </label>
          <input type="bodyword" name="body" required />
          {renderErrorMessage("body")}
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Sign In</div>
        {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
      </div>
    </div>
  );
}

export default App;