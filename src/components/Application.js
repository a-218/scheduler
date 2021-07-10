import React, { useState, useEffect } from "react";
import DayList from "components/DayList";
import "components/Application.scss";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
const axios = require("axios");


// const days = [
//   {
//     id: 1,
//     name: "Monday",
//     spots: 2,
//   },
//   {
//     id: 2,
//     name: "Tuesday",
//     spots: 5,
//   },
//   {
//     id: 3,
//     name: "Wednesday",
//     spots: 0,
//   },
// ];

// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "5pm",
//     interview: {
//       student: "Lydia ",
//       interviewer: {
//         id: 2,
//         name: "Tori Malcolm",
//         avatar: "https://i.imgur.com/Nmx0Qxo.png",
//       }
//     }
//   },
//   {
//     id: 4,
//     time: "9am",
//   },
//   {
//     id: 5,
//     time: "11pm",
//   }
// ];



export default function Application(props) {
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


    // {
    // day: 'Monday',
    // days: [],
    // appointments: {}
    // }
  );

  console.log('at application over herer //////////////')

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const dailyInterviewers = getInterviewersForDay(state, state.day);
  console.log('daily interviewers', dailyInterviewers);
  const setDay = day => setState({ ...state, day });


  async function bookInterview(id, interview) {
    console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$!!!!!!!!!!!!!!!!!!!!!!', id, interview);

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };


    const response = await axios.put(`http://localhost:8001/api/appointments/${id}`, {interview})
      .then(response => {
        setState({
          ...state,
          appointments
        });
        console.log(response);
        return true;
      })
      .catch(error => {
        console.log(error);
        return false;
      });
      if(response === true){
        return true;
      } else{
        return false;
      }
  }



  const schedule = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={dailyInterviewers}
        bookInterview={bookInterview}
      />
    );
  });

  //const interview = getInterview(state, appointment.interview);

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

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>

      <section className="schedule">
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}

        {schedule}

        <Appointment key="last" time="5pm" />


      </section>
    </main>

  );
}




