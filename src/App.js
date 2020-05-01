import React, { useState } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [emailState, setEmailState] = useState('');
  const [subjectState, setSubjectState] = useState('');
  const [commentsState, setCommentsState] = useState('');

  const onEmailChange = (event) => {
    setEmailState(event.target.value);
  };

  const onSubjectChange = (event) => {
    setSubjectState(event.target.value);
  };

  const onCommentsChange = (event) => {
    setCommentsState(event.target.value);
  };

  const resetForm = () => {
    setEmailState('');
    setSubjectState('');
    setCommentsState('');
 }

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const data = {
      email: emailState,
      subject: subjectState,
      commentsState: commentsState,
    };

    fetch('http://localhost:3002/send', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.status === 'success') {
          alert('Message Sent.');
          resetForm();
        } else if (response.status === 'fail') {
          alert('Message failed to send.');
        }
      });
  };

  return (
    <div className="App">
      <form id="contact-form" method="POST" onSubmit={onSubmitHandler}>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter email"
            value={emailState}
            onChange={onEmailChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="subject">Subject</label>
          <input
            type="text"
            className="form-control"
            id="subject"
            placeholder="Subject"
            value={subjectState}
            onChange={onSubjectChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="comments">Comments</label>
          <textarea
            className="form-control"
            id="comments"
            rows="3"
            value={commentsState}
            onChange={onCommentsChange}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
