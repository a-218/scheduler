
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


    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };


    return axios.put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then(response => {
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
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };


    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then(response => {
        setState({
          ...state,
          appointments
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