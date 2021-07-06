import React from "react";

import "components/InterviewerListItem.scss";
import classnames from "classnames";


export default function InterviewerListItem(props) {
   const interClass = classnames("interviewers__item", {
    "interviewers__item--selected": props.selected
 });

  return ( 
    <li className={interClass} onClick={() => props.setInterviewer(props.name)}>
        <img
          key = {props.id}
          className="interviewers__item-image"
          src={props.avatar}
          alt={props.name}
        />
        {props.name}
      </li>


  )
//   <li className="interviewers__item">
//   <img
//     className="interviewers__item-image"
//     src={props.avatar}
//     alt="Sylvia Palmer"
//   />
//   {props.name}
// </li>
}