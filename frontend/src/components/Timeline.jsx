
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
import xmark from '../images/x-mark.png';
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

    const [messageTitle, setMessageTitle] = useState("");
    const [messageMessage, setMessageMessage] = useState("");

    const handleDataChange = (event) => {
        setMessageTitle(event.target.value);
    };

    const handleDataChange2 = (event) => {
        setMessageMessage(event.target.value);
    };

    const sendMessage = (event) => {
    
        event.preventDefault();
    
        const title = event.target.title.value;
        const premessage = event.target.message.value;
        const message = premessage.split("\n").map((line, index) => (
            <React.Fragment key={index}>
                {line}
                <br />
            </React.Fragment>
        ));
    
        setIsCommentOpen(false);
        props.addComment({title, message, isMessageOpen});
    
    }

    const sendView = (event) => {
    
        event.preventDefault();
    
        const date = event.target.date.value;
        const title = event.target.title.value;
    
        setIsViewOpen(false);
        props.addView({title, date});
    
    }

    const CustomEvent = ({ event }) => (

        <div className="bg-blue-500 text-white rounded-lg">
            {props.videos.map(video =>
                <>
                    {video.id === event.title &&
                        <strong onClick={() => { setIsVideoOpen(video.id); setIsMessageOpen(event.desc); } }>{video.name}</strong>
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
            desc: item.id,
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
                                <img className="film-image" src={filmimage} alt={filmimage}></img>
                                <img className="film-image x-image" onClick={() => { setIsVideoOpen(null); setIsMessageOpen(null); setIsCommentOpen(false); } } 
                                    src={xmark} alt={xmark}></img>
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
                                    onClick={() => { setIsMessageOpen(true); setIsCommentOpen(false); }}></img>
                                <div className="centered-text">
                                    {props.views.map(view =>
                                        <>
                                            {view.id === isMessageOpen &&
                                                <>
                                                {props.messages.filter(message => message.viewid === view.id).length}
                                                </>
                                            }
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="basebottom"></div>
                        </>
                    }
                </>
                )}
            </div>

            <div className={`timelinemessage ${isMessageOpen ? 'open' : 'closed'}`}>
                {props.views.map(view => 
                <>
                {isMessageOpen === view.id &&
                    <div className="topbuttons">
                        <button className="commbutton" onClick={() => { setIsCommentOpen(true); setMessageTitle(""); setMessageMessage(""); }}>Comment</button>
                        <button className="commclosebutton" onClick={() => { setIsMessageOpen(null); setIsCommentOpen(false); }}>Close</button>
                    </div>
                }

                {props.messages.map(message => 
                    <div className="basemessageb" key={message.id}>
                        {(message.viewid === view.id && isMessageOpen === view.id ) &&
                            <div className="messagetop">
                                <div className="messageup">
                                    {props.users.map(user => 
                                        <div className="messageuser" key={user.id}>
                                        {message.userid === user.id &&
                                            <p>{user.name}</p>
                                        }
                                        </div>
                                    )}
                                    <div className="messagedate">
                                        <p>{message.date.substring(0, 10)}</p>
                                        <p>{message.date.substring(11)}</p>
                                    </div>
                                </div>
                                <h4>{message.title}</h4>
                                <p>{message.message}</p>
                                <div className="reactions">
                                    <button className="replybutton" onClick={() => { setIsCommentOpen(true); 
                                        setMessageTitle("Vs:" + message.title); 
                                        setMessageMessage(">> " + message.message.replace(/<br\s*\/?>/gi, "\n").trim() + "\n\n"); } }>Reply</button>
                                    <div>
                                        {props.likes.map(like => 
                                        <>
                                            {like.messageid === message.id &&
                                            <div className="reaction" key={like.id}>
                                                {like.type === "like" &&
                                                    <div className="reaction-container">
                                                        {like.amount === 0 && <>
                                                            <img className="likeicon" src={fadelikeicon} alt={fadelikeicon} 
                                                                onClick={() => props.addLike(like.id)}></img>
                                                            <div className="side-text whitetext">
                                                                {like.amount}
                                                            </div> 
                                                        </>
                                                        }
                                                        {like.amount > 0 && <>
                                                            <img className="likeicon" src={likeicon} alt={likeicon} 
                                                                onClick={() => props.addLike(like.id)}></img>
                                                            <div className="side-text">
                                                                {like.amount}
                                                            </div>
                                                            </>
                                                        }
                                                    </div>
                                                }
                                                {like.type === "love" &&
                                                    <div className="reaction-container">
                                                        {like.amount === 0 && <>
                                                            <img className="likeicon" src={fadeloveicon} alt={fadeloveicon}  
                                                                onClick={() => props.addLike(like.id)}></img>
                                                            <div className="side-text whitetext">
                                                                {like.amount}
                                                            </div>
                                                            </>
                                                        }
                                                        {like.amount > 0 && <>
                                                            <img className="likeicon" src={loveicon} alt={loveicon}  
                                                                onClick={() => props.addLike(like.id)}></img>
                                                            <div className="side-text">
                                                                {like.amount}
                                                            </div>
                                                            </>
                                                        }
                                                    </div>
                                                }
                                                {like.type === "unlike" &&
                                                    <div className="reaction-container">
                                                        {like.amount === 0 && <>
                                                            <img className="likeicon" src={fadeunlikeicon} alt={fadeunlikeicon}
                                                                onClick={() => props.addLike(like.id)}></img>
                                                            <div className="side-text whitetext">
                                                                {like.amount}
                                                            </div>
                                                        </>
                                                        }
                                                        {like.amount > 0 && <>
                                                            <img className="likeicon" src={unlikeicon} alt={unlikeicon}
                                                                onClick={() => props.addLike(like.id)}></img>
                                                            <div className="side-text">
                                                                {like.amount}
                                                            </div>
                                                        </>
                                                        }
                                                    </div>
                                                }
                                            </div>
                                            }
                                        </>
                                        )}
                                    </div>
                                </div>
                    
                            </div>
                        }
                    </div>
                )}
                {isMessageOpen === view.id &&
                    <div className={`newcomment ${isCommentOpen ? 'open' : 'closed'}`}>
                        <NewComment messageTitle={messageTitle} messageMessage={messageMessage} 
                            handleDataChange={handleDataChange} handleDataChange2={handleDataChange2} 
                            sendMessage={sendMessage} closeMessage={() => setIsCommentOpen(false)} />
                    </div>
                }

                </>
                )}
            </div>
            {isViewOpen === true &&
                <div className={`newview ${isViewOpen ? 'open' : 'closed'}`}>
                    <NewView videos={props.videos} sendView={sendView} closeView={() => setIsViewOpen(false)}/>
                </div>
            }

        </div>

    )

}

export default Timeline;
