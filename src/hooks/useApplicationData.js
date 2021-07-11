
import { useEffect, useState } from "react";
import axios from "axios";

export default function useApplicationData() {



  const [state, setState] = useState(
    {
      day: "Monday",
      days: [],
      appointments: {
        "1": {
          id: 1,
          time: "12pm",
          interview: null
        }
      },
      interviewers: {}
    }

  );

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ]).then((all) => {

      setState(prev => (
        console.log('prev over ', prev),
        { ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }))
    })
  }, [])


  function bookInterview(id, interview) {    // async function with index .js async function to wait for api responce



    console.log('ddsfdsfds', id,  '8****************', interview);
    
    
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    console.log('THE sTATE', state);


    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    console.log('appointments form being [pass back', appointments)
    //state.day is the current day

    let dayArrayId = 0; 
    for( const day in state.days){
      if (state.days[day].name === state.day) {

        console.log('this is day', state.days[day].name, 'with the current day, ',state.day, 'with spots', state.days[day].spots)
        dayArrayId  = day; //which array index of day need to be changed for the spot update
      
      }
  
    }
    console.log('after the iteration', state.days, 'and the ', dayArrayId)
 

    return axios.put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then(response => {
        if (state.appointments[id].interview === null){
          const days = state.days;
          days[dayArrayId].spots -= 1;
        }
        setState({
          ...state,
          appointments
        });
        return response;

      })
  };


  function cancelInterview(id, interview) {


    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };


    let dayId = 0;
    for (const day in state.days) {
      if (state.days[day].name === state.day) {
        dayId = day;
      }
    }

    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then(response => {
        const days = state.days;
        days[dayId].spots += 1;
        setState({
          ...state,
          appointments,
        });
        return response;
      })

  };


  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };





}