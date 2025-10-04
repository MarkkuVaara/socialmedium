
import React, { useState } from 'react';

import { CSSTransition } from "react-transition-group";

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
import retrotv from '../images/retrotv.png';
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

    const [coords, setCoords] = useState(null);

    const [isVideoOpen, setIsVideoOpen] = useState(null);
    const [isMessageOpen, setIsMessageOpen] = useState(null);
    const [commentData, setCommentData] = useState({
        isOpen: false,
        title: '',
        message: '',
        prevmessage: null,
    });
    const [isViewOpen, setIsViewOpen] = useState(false);

    const [startTime, setStartTime] = useState(null);

    const handleDataChange = (event) => {
        setCommentData({ isOpen: true, 
            title: event.target.value, 
            message: commentData.message,
            prevmessage: commentData.prevmessage
        });
    };
    
    const handleDataChange2 = (value) => {
        setCommentData({ isOpen: true,
            title: commentData.title,
            message: value,
            prevmessage: commentData.prevmessage
        });
    };
    
    const sanitizeHtml = (html) => {

        const container = document.createElement('div');
        container.innerHTML = html;

        const elements = Array.from(container.querySelectorAll('*')).reverse();

        elements.forEach((el) => {
            if (el.tagName === 'BR') {
                el.replaceWith('\n');
            } else if (el.classList?.contains('quote-block')) {
                return;
            } else {
                const text = el.textContent || '';
                const textNode = document.createTextNode(text + '\n');
                el.replaceWith(textNode);
            }
        });
      
        return container.innerHTML;

    }

    const sendMessage = (event) => {
    
        event.preventDefault();
    
        const title = event.target.title.value;
        const premessage = event.target.message.value;
        const prevmessage = event.target.prevmessage.value;
        const viewid = event.target.ismessageopen.value;

        const almmessage = sanitizeHtml(premessage);
        const message = almmessage
            .replace(/<br\s*\/?>/gi, '\n').replace(/\n\n/g, '\n\u00A0\n');
    
        setCommentData({ isOpen: false, title:"", message:"", prevmessage: null });
        props.addComment({title, message, viewid, prevmessage });
    
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

    const handleSelectSlot = ({ start, end }) => {

        setIsViewOpen(true);
        setStartTime(start);

    };

    const parseTime = (timePart) => {

        let [hour, minute, second] = timePart.split(':').map(Number);

        return { hour, minute, second };
    };

    const transformToEvents = (views) => {

        return views.map(item => {
          const [datePart, timePart] = item.date.split('T');
          const [year, month, day] = datePart.split('-').map(Number);
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
                selectable onSelectSlot={handleSelectSlot}
            />

            <div className="timelineview">
                {props.videos.map(video => 
                <> 
                    {video.id === isVideoOpen &&
                        <>
                        <div className="timelinevideo" key={video.id}>
                            <div className="videoname">
                                <h4>{video.name}</h4>
                                {video.type === "movie" &&
                                    <img className="film-image" src={filmimage} alt={filmimage}></img>
                                }
                                {video.type === "tv" &&
                                    <img className="film-image" src={retrotv} alt={retrotv}></img>
                                }
                                <img className="film-image x-image" onClick={() => { setIsVideoOpen(null); setIsMessageOpen(null); setIsCommentOpen(false); } } 
                                    src={xmark} alt={xmark}></img>
                            </div>
                            {props.views.map(view => 
                                <>
                                {(isMessageOpen === view.id) && (video.type === "tv") &&
                                    <p>Season: {view.partid} / Episode: {view.episodeid}</p>
                                }
                                </>
                            )}
                            <p>Year: {video.year}</p>
                            <p>Director: {video.director}</p>
                            <p>Actors: {video.actors.map(actor => 
                            <span className="videoactor" key={video.id}>
                                <p>{actor}</p>
                            </span>)}
                            </p>
                            {video.length &&
                                <p>Length: {video.length} min</p>
                            }
                            <div className="image-container">
                                <img className="messageicon" 
                                    src={message} alt={message}
                                    onClick={() => { setIsMessageOpen(null); setCommentData({ isOpen: false, title: "", message: "", prevmessage: null }); } }></img>
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
                        <button className="commbutton" onClick={(event) => {
                                setCommentData({ isOpen: true, title: "", message: "", prevmessage: "0" });
                                const rect = event.currentTarget.getBoundingClientRect();
                                setCoords( { top: rect.bottom + window.scrollY - 1250, right: rect.left + window.scrollX - 650 } );
                            }
                        }>Comment</button>
                        <button className="commclosebutton" onClick={() => { 
                            setIsMessageOpen(null); 
                            setCommentData({ isOpen: false, title: "", message: "", prevmessage: null }); 
                        }}>Close</button>
                    </div>
                }

                {props.messages.map(message => 
                    <div className="basemessageb" key={message.id}>
                        {(message.viewid === view.id && isMessageOpen === view.id ) &&
                            <div className="messagetop">
                                <div className="messageup">
                                    {props.users.map(user => <>
                                        {message.userid === user.id &&
                                            <div className="messageuser" key={user.id}>
                                                <p>{user.name}</p>
                                            </div>
                                        }
                                        </>
                                    )}
                                    <div className="messagedate">
                                        <p>{message.date.substring(0, 10)}</p>
                                        <p>{message.date.substring(11)}</p>
                                    </div>
                                </div>
                                <h4>{message.title}</h4>
                                <div className="messagemessage" style={{ whiteSpace: 'pre-wrap' }}
                                        dangerouslySetInnerHTML={{ __html: message.message }} ></div>
                                <div className="reactions">
                                    <button className="replybutton" onClick={(event) => {
                                        setCommentData({ isOpen: true, title: "Vs:" + message.title,
                                            message: message.date + "\n\n" + message.message.trim() + "\n\n",
                                            prevmessage: message.id });
                                        const rect = event.currentTarget.getBoundingClientRect();
                                        setCoords( { top: rect.bottom + window.scrollY - 1000, right: rect.left + window.scrollX - 650 } );
                                        }
                                    }>Reply</button>
                                    <div>
                                        {props.likes.map(like => 
                                        <>
                                            {like.commentId === message.id &&
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
                <CSSTransition in={commentData.isOpen} timeout={1000} classNames="fade-slide" unmountOnExit>
                    <div style={{ "position": "relative" }}>{isMessageOpen === view.id &&
                        <div className="newcomment open" style={{ "top": coords.top, "right": coords.right }}>
                            <NewComment messageTitle={commentData.title} messageMessage={commentData.message} prevmessage={commentData.prevmessage}
                                isMessageOpen={isMessageOpen} handleDataChange={handleDataChange} handleDataChange2={handleDataChange2} 
                                sendMessage={sendMessage} closeMessage={() => setCommentData({ isOpen: false, title: "", message: "", prevmessage: null }) } />
                        </div>
                    }</div>
                </CSSTransition>

                </>
                )}
            </div>
            <CSSTransition in={isViewOpen} timeout={1000} classNames="fade-slide" unmountOnExit>
                <div className="newview opencalendar">
                    <NewView videos={props.videos} startTime={startTime}
                        sendView={sendView} closeView={() => setIsViewOpen(false)}/>
                </div>
            </CSSTransition>

        </div>

    )

}

export default Timeline;
