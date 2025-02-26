
import React, { useState } from 'react';

import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './CalendarStyles.css';

const locales = {
    'en-US': enUS,
};

const localizer = dateFnsLocalizer({
    format, parse, startOfWeek,
    getDay, locales,
});

import filmimage from '../images/filmreel2.png';
import message from '../images/messageicon.png';
import likeicon from '../images/likeicon.png';
import fadelikeicon from '../images/fadelikeicon.png';
import loveicon from '../images/loveicon.png';
import fadeloveicon from '../images/fadeloveicon.png';
import unlikeicon from '../images/unlikeicon.png';
import fadeunlikeicon from '../images/fadeunlikeicon.png';

import NewComment from '../components/NewComment';
import NewView from '../components/NewView';

const Timeline = (props) => {

    const [isMessageOpen, setIsMessageOpen] = useState(null);
    const [isCommentOpen, setIsCommentOpen] = useState(false);
    const [isViewOpen, setIsViewOpen] = useState(false);

    /*const events = [
        {
          title: 'Event 1',
          start: new Date(),
          end: new Date(),
        },
    ]; */

    const CustomEvent = ({ event }) => (

        <div className="bg-blue-500 text-white rounded-lg p-1">
          <strong>{event.title}</strong>
        </div>
        
    );

    const transformToEvents = (views) => {

        return views.map(item => {
          const [month, day, year] = item.date.split('/').map(Number);
          const startHour = '00';
          const startMinute = '00';
          /* const [endHour, endMinute] = item.endTime.split(':').map(Number); */
      
          return {
            title: item.videoid,
            start: new Date(year, month - 1, day, startHour, startMinute),
            end: new Date(year, month - 1, day, startHour, startMinute),
            desc: item.date,
          };
        });
    };

    const events = transformToEvents(props.views);


    return (

        <div className="timelinefeed">
            
            <Calendar
                localizer={localizer} events={events} startAccessor="start" endAccessor="end" 
                components={{ event: CustomEvent, }}
            />

            {events.map(view => 
                <>
                <p>{view.title}</p>
                <p>{view.start.toString()}</p>
                <p>{view.end.toString()}</p>
                </>
            )}

        </div>

    )

}

export default Timeline;
