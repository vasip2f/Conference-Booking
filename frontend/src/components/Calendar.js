import React, { useRef, useState } from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import ConfirmMeetingmodal from "./ConfirmMeetingmodal";
import axios from "axios"; 
import moment from "moment";


export default function () {
    const [modalOpen, setModalOpen] = useState(false);
    const [events, setEvent] = useState([])
    const calenderRef = useRef(null);


    const onEventAdded = event => {
        let calendarApi = calenderRef.current.getApi()
        calendarApi.addEvent({
            start: moment(event.start).toDate(),
            end: moment(event.end).toDate(),
            title: event.title

        });  

    }

    async function handleEventAdd(data) {
        await axios.post("/api/calendar/create-event", data.event);

     }

     async function handleDateSet(data){
         const response = await axios.get('api/calendar/get-events?start='+moment(data.start).toISOString()+"&end="+moment(data.end).toISOString());
         setEvent(response.data);
     }

    return (
        <section>
            <button onClick={() => setModalOpen(true)}>Confirm Meeting</button>
            <div style={{ position: "relative", zIndex: 0 }}>
                <FullCalendar
                    ref={calenderRef}
                    events={events}
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    eventAdd={event => handleEventAdd(event)}
                    dateSet={(date) =>handleDateSet(date)}
                    headerToolbar={
                        {
                            start: 'today prev,next', // will normally be on the left. if RTL, will be on the right
                            center: 'title',
                            end: 'dayGridMonth,timeGridWeek,timeGridDay' // will normally be on the right. if RTL, will be on the left
                        }
                    }

                    height={"80vh"}
                />


            </div>

            <ConfirmMeetingmodal isOpen={modalOpen} onClose={() => setModalOpen(false)} onEventAdded={event => onEventAdded(event)} />
        </section>
    )
}