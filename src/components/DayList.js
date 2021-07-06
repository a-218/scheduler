import React from "react";

import "components/DayListItem.scss";
import classnames from "classnames";
import DayListItem from "components/DayListItem";

export default function DayList(props) {
  const mapday =props.days.map( day => {
    return ( 
    <DayListItem 
    key = {day.id}
    name={day.name} 
    spots={day.spots} 
    selected={day.name === props.day}
    setDay={props.setDay} 
    />
    );
  });
  return <ul>{mapday}</ul>; 
};
    

