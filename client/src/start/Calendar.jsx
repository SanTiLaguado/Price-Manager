import React, { useState, useEffect } from 'react';

const months = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

const Calendar = () => {
  const [today, setToday] = useState(new Date());
  const [activeDay, setActiveDay] = useState(null);
  const [eventsArr, setEventsArr] = useState([]);
  const [events, setEvents] = useState([]);
  const [days, setDays] = useState([]);
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [showEventForm, setShowEventForm] = useState(false);
  const [eventTitle, setEventTitle] = useState('');
  const [eventTimeFrom, setEventTimeFrom] = useState('');
  const [eventTimeTo, setEventTimeTo] = useState('');
  const [dateInput, setDateInput] = useState('');

  useEffect(() => {
    getEvents();
  }, []);

  useEffect(() => {
    initCalendar();
  }, [month, year]);

  const initCalendar = () => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
    const prevDays = prevLastDay.getDate();
    const lastDate = lastDay.getDate();
    const day = firstDay.getDay();
    const nextDays = 7 - lastDay.getDay() - 1;

    const daysArray = [];
    
    for (let x = day; x > 0; x--) {
      daysArray.push({ type: 'prev-date', day: prevDays - x + 1 });
    }

    for (let i = 1; i <= lastDate; i++) {
      const event = eventsArr.some(eventObj => 
        eventObj.day === i && eventObj.month === month + 1 && eventObj.year === year
      );
      
      daysArray.push({
        type: 'current-date',
        day: i,
        isToday: i === today.getDate() && year === today.getFullYear() && month === today.getMonth(),
        hasEvent: event
      });
    }

    for (let j = 1; j <= nextDays; j++) {
      daysArray.push({ type: 'next-date', day: j });
    }

    setDays(daysArray);
  };

  const handleDayClick = (day) => {
    setActiveDay(day);
    updateEvents(day);
  };

  const updateEvents = (date) => {
    const events = eventsArr.filter(event => 
      date === event.day && month + 1 === event.month && year === event.year
    );
    setEvents(events.length > 0 ? events : [{ title: "No hay eventos" }]);
  };

  const addEvent = () => {
    if (!eventTitle || !eventTimeFrom || !eventTimeTo) {
      alert("Please fill all the fields");
      return;
    }

    const timeFromArr = eventTimeFrom.split(":");
    const timeToArr = eventTimeTo.split(":");
    if (timeFromArr.length !== 2 || timeToArr.length !== 2 ||
        timeFromArr[0] > 23 || timeFromArr[1] > 59 ||
        timeToArr[0] > 23 || timeToArr[1] > 59) {
      alert("Invalid Time Format");
      return;
    }

    const timeFrom = convertTime(eventTimeFrom);
    const timeTo = convertTime(eventTimeTo);
    const newEvent = {
      title: eventTitle,
      time: `${timeFrom} - ${timeTo}`
    };

    setEventsArr(prevEvents => {
      const eventExist = prevEvents.some(event => 
        event.day === activeDay && event.month === month + 1 && event.year === year &&
        event.events.some(e => e.title === eventTitle)
      );

      if (eventExist) {
        alert("Event already added");
        return prevEvents;
      }

      let eventAdded = false;
      const updatedEvents = prevEvents.map(event => {
        if (event.day === activeDay && event.month === month + 1 && event.year === year) {
          event.events.push(newEvent);
          eventAdded = true;
        }
        return event;
      });

      if (!eventAdded) {
        updatedEvents.push({
          day: activeDay,
          month: month + 1,
          year: year,
          events: [newEvent]
        });
      }

      return updatedEvents;
    });

    setShowEventForm(false);
    setEventTitle('');
    setEventTimeFrom('');
    setEventTimeTo('');
    updateEvents(activeDay);
  };

  const deleteEvent = (eventTitle) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      setEventsArr(prevEvents => {
        const updatedEvents = prevEvents.map(event => {
          if (event.day === activeDay && event.month === month + 1 && event.year === year) {
            event.events = event.events.filter(item => item.title !== eventTitle);
          }
          return event;
        }).filter(event => event.events.length > 0);

        return updatedEvents;
      });

      updateEvents(activeDay);
    }
  };

  const saveEvents = () => {
    localStorage.setItem("events", JSON.stringify(eventsArr));
  };

  const getEvents = () => {
    const savedEvents = localStorage.getItem("events");
    if (savedEvents) {
      setEventsArr(JSON.parse(savedEvents));
    }
  };

  const convertTime = (time) => {
    const [hours, minutes] = time.split(":");
    const period = hours >= 12 ? "PM" : "AM";
    const convertedHours = hours % 12 || 12;
    return `${convertedHours}:${minutes} ${period}`;
  };

  const gotoDate = () => {
    const [inputMonth, inputYear] = dateInput.split("/");
    const monthIndex = parseInt(inputMonth, 10) - 1;
    const year = parseInt(inputYear, 10);
    if (monthIndex >= 0 && monthIndex < 12 && year) {
      setMonth(monthIndex);
      setYear(year);
    } else {
      alert("Fecha inválida");
    }
  };

  return (
    <div className="container">
      <div className="left">
        <div className="calendar">
          <div className="month">
            <i className="fas fa-angle-left prev" onClick={() => setMonth(month - 1)}></i>
            <div className="date">{months[month]} {year}</div>
            <i className="fas fa-angle-right next" onClick={() => setMonth(month + 1)}></i>
          </div>
          <div className="weekdays">
            <div>Dom</div>
            <div>Lun</div>
            <div>Mar</div>
            <div>Mié</div>
            <div>Jue</div>
            <div>Vie</div>
            <div>Sab</div>
          </div>
          <div className="days">
            {days.map((day, index) => (
              <div
                key={index}
                className={`day ${day.type} ${day.isToday ? 'today' : ''} ${day.hasEvent ? 'event' : ''}`}
                onClick={() => handleDayClick(day.day)}
              >
                {day.day}
              </div>
            ))}
          </div>
          <div className="goto-today">
            <div className="goto">
              <input
                type="text"
                placeholder="MM/AAAA"
                className="date-input"
                value={dateInput}
                onChange={(e) => setDateInput(e.target.value)}
              />
              <button className="goto-btn" onClick={gotoDate}>Ir</button>
            </div>
            <button className="today-btn" onClick={() => setToday(new Date())}>Hoy</button>
          </div>
        </div>
      </div>
      <div className="right">
        <div className="events">
          {events.length > 0 ? events.map((event, index) => (
            <div key={index} className="event" onClick={() => deleteEvent(event.title)}>
              <div className="title">
                <i className="fas fa-circle"></i>
                <h3 className="event-title">{event.title}</h3>
              </div>
              <div className="event-time">
                <span className="event-time">{event.time}</span>
              </div>
            </div>
          )) : <div className="no-event">
            <h3>No hay eventos</h3>
          </div>}
        </div>
        <button className="add-event" onClick={() => setShowEventForm(!showEventForm)}>Agregar Evento</button>
        {showEventForm && (
          <div className="add-event-wrapper">
            <button className="close" onClick={() => setShowEventForm(false)}>X</button>
            <input
              type="text"
              className="event-name"
              placeholder="Título del evento"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
            />
            <input
              type="text"
              className="event-time-from"
              placeholder="Hora de inicio"
              value={eventTimeFrom}
              onChange={(e) => setEventTimeFrom(e.target.value)}
            />
            <input
              type="text"
              className="event-time-to"
              placeholder="Hora de fin"
              value={eventTimeTo}
              onChange={(e) => setEventTimeTo(e.target.value)}
            />
            <button className="add-event-btn" onClick={addEvent}>Agregar Evento</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendar;
