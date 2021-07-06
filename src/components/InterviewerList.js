import React from "react";

import "components/InterviewerListItem.scss";
import classnames from "classnames";
import InterviewerListItem from "components/InterviewerListItem";
import "components/InterviewerList.scss";

export default function InterviewerList(props) {
  console.log('props over here', props);

  console.log('interviewerssssssssssss', props.interviewers)

  const interviewMap =props.interviewers.map( interviewer => {
   
    return ( 
    <InterviewerListItem 
    key = {interviewer.id}
    name = {interviewer.name} 
    avatar = {interviewer.avatar} 
    selected = {interviewer.id === props.interviewer}
    setInterviewer= {event  => props.setInterviewer(interviewer.id)}
    />
    );
  });
  return (
    <section className="interviewers">
    <h4 className="interviewers__header text--light"></h4>
    <ul className="interviewers__list">{interviewMap}</ul>
    </section>
  )
}