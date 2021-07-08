 export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  if(state.days.length ===0){
    return [];
  }

  let result =[];

  const filteredDay = state.days.filter(d => d.name === day);

  if(filteredDay.length === 0){
    return [];
  }


  for (const id of filteredDay[0].appointments) {
   result.push (state.appointments[id])
  }
  return  result;
} 



