import React, { useState } from 'react'
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";


export default function Form(props) {

  const [name, setName] = useState(props.name || "");

  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const [error, setError] = useState("");

  const [error2, setError2] = useState("");

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
    if (interviewer === null){
      setError2("Please select an interviewer");
      return;
    }
    setError("");
    setError2("");
    props.onSave(name, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
    <section className="appointment__card-left">
    
      <form autoComplete="off" onSubmit={event => event.preventDefault()}>
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
         <section className="appointment__validation">{error}</section>
      </form>
      <InterviewerList  interviewers={props.interviewers} interviewer={interviewer} setInterviewer={setInterviewer}  />  

       {/* setInterviewer={setInterviewer} onChange={setInterviewer}*/}
       <section className="appointment__validation">{error2}</section>
    </section>

    <section className="appointment__card-right">
      <section className="appointment__actions">

      <Button danger onClick={(event) => cancel()}>Cancel</Button>
      <Button confirm onClick={(event) => validate()}>Save</Button>
      </section>
    </section>
  </main>)};