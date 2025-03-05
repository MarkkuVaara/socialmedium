
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

    const [isVideoOpen, setIsVideoOpen] = useState(null);
    const [isMessageOpen, setIsMessageOpen] = useState(null);
    const [isCommentOpen, setIsCommentOpen] = useState(false);
    const [isViewOpen, setIsViewOpen] = useState(false);

    const CustomEvent = ({ event }) => (

        <div className="bg-blue-500 text-white rounded-lg">
            {props.videos.map(video =>
                <>
                    {video.id === event.title &&
                        <strong onClick={() => setIsVideoOpen(video.id)}>{video.name}</strong>
                    }
                </>
            )}
        </div>
        
    );

    const parseTime = (timeStr) => {

        const [time, period] = timeStr.split(' ');
        let [hour, minute, second] = time.split(':').map(Number);

        if (period === 'PM' && hour !== 12) hour += 12;
        if (period === 'AM' && hour === 12) hour = 0;

        return { hour, minute, second };
    };

    const transformToEvents = (views) => {

        return views.map(item => {
          const [datePart, timePart] = item.date.split(' ');
          const [month, day, year] = datePart.split('/').map(Number);
          const { hour, minute, second } = parseTime(timePart);

          return {
            title: item.videoid,
            start: new Date(year, month - 1, day, hour, minute, second),
            end: new Date(year, month - 1, day, hour + 2, minute, second),
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

            <div className="timelineview">
                {props.videos.map(video => 
                <> 
                    {video.id === isVideoOpen &&
                        <>
                        <div className="timelinevideo" key={video.id}>
                            <div className="videoname">
                                <h4>{video.name}</h4>
                                <img className="film-image" onClick={() => setIsVideoOpen(null)} 
                                    src={filmimage} alt={filmimage}></img>
                            </div>
                            <p>Year: {video.year}</p>
                            <p>Director: {video.director}</p>
                            <p>Actors: {video.actors.map(actor => 
                            <span className="videoactor" key={video.id}>
                                <p>{actor}</p>
                            </span>)}
                            </p>
                            <p>Length: {video.length} min</p>
                            <div className="image-container">
                                <img className="messageicon" 
                                    src={message} alt={message}
                                    onClick={() => { setIsMessageOpen(null); setIsCommentOpen(false); }}></img>
                                <div className="centered-text">
                                    {props.messages.filter(message => message.viewid === null).length}
                                </div>
                            </div>
                        </div>
                        <div className="basebottom"></div>
                        </>
                    }
                </>
                )}
            </div>

            {events.map(view => 
                <>
                <p>{view.title}</p>
                <p>{view.start.toString()}</p>
                <p>{view.end.toString()}</p>
                <p>{view.desc}</p>
                </>
            )}

        </div>

    )

}

export default Timeline;
