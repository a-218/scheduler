
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

  console.log(state);
  console.log('sdfsdf', interview);

  const interviewerId = interview.interviewer;
  console.log('sdfsdfdsfdsfdsf' ,interviewerId)
  let student = interview.student;
  console.log(state.interviewers);
  let interviewerObject = state.interviewers[interviewerId]

  let result = {
    student,
    interviewer:interviewerObject
  }

  return result;

}


