import React from "react";

import "components/Appointment/styles.scss";

import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "./Form";
import Status from "./Status";

import useVisualMode from "hooks/useVisualMode";



const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
//const SAVE = "SAVE";
const SAVING = "SAVING";

export default function Appointment(props) {

     const { mode, transition, back } = useVisualMode(
          props.interview ? SHOW : EMPTY
     );

     console.log('INDEX JS APPOINTMENT ***************', props);

     async function save(name, interviewer) {
          console.log('ssssss')
          transition(SAVING);
          console.log('ssssssss')
          const interview = {
            student: name,
            interviewer
          };
          
          

         const response = await props.bookInterview(props.id, interview)
         if (response === true){
         transition(SHOW);
         }
     }

     console.log('props over here are', props)


     return (<article className="appointment">
          <Header time={props.time} />
          {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
          {mode === SHOW &&
               (<Show student={props.interview.student} 
               interviewer={props.interview.interviewer}
      
               />)
          }
          {mode === CREATE && ( <Form interviewers={props.interviewers} onCancel={back} onSave={save}/>)}
          {mode === SAVING && <Status message = "Saving"/>}

     </article>
     )
};


