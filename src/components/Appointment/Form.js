import React, { useState } from 'react'
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";


export default function Form(props) {


  console.log('props when pressed the edit button', props)
  console.log('the name over here ', props.name); 


  console.log('the interviewer', props.interviewer);

  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer|| null);
  const [error, setError] = useState("");

  const reset = () => {
    setName("");
    setInterviewer(null);
  };

  const cancel = () => {
    reset();
    props.onCancel();
  };

  function validate() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }

    props.onSave(name, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
    <section className="appointment__card-left">
    <section className="appointment__validation">{error}</section>
      <form autoComplete="off">
        <input
          className="appointment__create-input text--semi-bold"
          name="name"
          type="text"
          placeholder="Enter Student Name"
          value = {name}
          onChange = {(event) => setName(event.target.value)} 
          // {() => {console.log("on change")}}
          /*
            This must be a controlled component
          */
           data-testid="student-name-input"
        />
      </form>
      <InterviewerList  interviewers={props.interviewers} interviewer={interviewer} setInterviewer={setInterviewer}  />  
       {/* setInterviewer={setInterviewer} onChange={setInterviewer}*/}
    </section>
    <section className="appointment__card-right">
      <section className="appointment__actions">

      <Button danger onClick={(event) => cancel()}>Cancel</Button>
      <Button confirm onClick={(event) => validate()}>Save</Button>
      </section>
    </section>
  </main>)};