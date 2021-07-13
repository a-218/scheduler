
 export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  if (state.days.length === 0) {
    return [];
  }

  let result = [];

  const filteredDay = state.days.filter(d => d.name === day);

  if (filteredDay.length === 0) {
    return [];
  }


  for (const id of filteredDay[0].appointments) {
    result.push(state.appointments[id])
  }
  return result;
}



export function getInterview(state, interview) {
  //... returns an array of appointments for that day

  if (interview === null){
    return null;
  }




  const interviewerId = interview.interviewer;

  let student = interview.student;
  console.log(state.interviewers);
  let interviewerObject = state.interviewers[interviewerId]

  let result = {
    student,
    interviewer:interviewerObject
  }

  return result;

}


export function getInterviewersForDay(state, day) {
  //... returns an array of appointments for that day
  if (state.days.length === 0) {
    return [];
  }

  let result = [];
  const filteredDay = state.days.filter(d => d.name === day);

  if (filteredDay.length === 0) {
    return [];
  }

  const interviewerId = filteredDay[0].interviewers
  result = interviewerId.map(id =>  state.interviewers[id]);

  return result;
}
