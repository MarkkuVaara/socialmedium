
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

    const events = [
        {
          title: 'Event 1',
          start: new Date(),
          end: new Date(),
        },
    ];

    return (

        <div className="timelinefeed">
            
            <Calendar
                localizer={localizer} events={events} startAccessor="start" endAccessor="end"
            />

            {props.videos.map(video => 
                <p>{video.name}</p>
            )}
            {props.views.map(view => 
                <p>{view.date}</p>
            )}
            {props.messages.map(message => 
                <p>{message.title}</p>
            )}
            {props.likes.map(like => 
                <p>{like.type}</p>
            )}
        </div>

    )

}

export default Timeline;
