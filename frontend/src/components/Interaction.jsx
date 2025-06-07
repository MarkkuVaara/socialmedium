
import React, { useState } from 'react';

import filmimage from '../images/filmreel2.png';
import retrotv from '../images/retrotv.png';
import xmark from '../images/x-mark.png';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import Comment from '../components/Comment';
import NewComment from '../components/NewComment';

const Interaction = (props) => {

    const [videoid, setVideoid] = useState(null);
    const [isMessageOpen, setIsMessageOpen] = useState(null);
    const [commentData, setCommentData] = useState({
            isOpen: false,
            title: '',
            message: '',
            prevmessage: null
    });

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        adaptiveHeight: true
    };

    const changefeed = (id) => {
        props.changePage(id);
    }

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
        console.log(event.target.message.value)

        const title = event.target.title.value;
        const premessage = event.target.message.value;
        const prevmessage = event.target.message.value;

        const almmessage = sanitizeHtml(premessage);

        const message = almmessage
            .replace(/<br\s*\/?>/gi, '\n').replace(/\n\n/g, '\n\u00A0\n');
        console.log(message)
        setCommentData({ isOpen: false, title:"", message:"", prevmessage: null });
        props.addComment({title, message, isMessageOpen, prevmessage });

    }

    const messages = props.messages.filter(message => message.prevmessage === 0).sort( function(a, b){
        let x = new Date(a.date);
        let y = new Date(b.date);
        return x-y;
    });

    const intendation = 0;

    return (
        <div className="nav">
            <h3>Comment timeline</h3>
            <div className="interactionview">
            <Slider {...sliderSettings}>
                {messages.map(message => <>
                    <div className="dateandview">
                        <p className="datep">{message.date.substring(0, 10)}</p>
                        {props.views.map(view => <>
                            {view.id === message.viewid && 
                                <div className="viewdata">
                                    <p>{view.date.substring(0, 10)}</p>
                                    {props.videos.map(video => <>
                                        {video.id === view.videoid &&
                                            <p className="videodata" onClick={() => setVideoid(video.id)}><strong>{video.name}</strong></p>
                                        } 
                                    </>
                                    )}
                                </div>
                            }
                        </> )}
                    </div>
                    <Comment message={message} messages={props.messages} likes={props.likes} 
                        addLike={props.addLike} views={props.views} intendation={intendation} />
                    </>
                )}
            </Slider>
            </div>
            {videoid && <>
                {props.videos.map(video =>
                <>
                    {video.id === videoid &&
                        <div className="interactionvideo" key={video.id}>
                            <div className="videoname">
                                <h4>{video.name}</h4>
                                {video.type === "movie" &&
                                    <img className="film-image" src={filmimage} alt={filmimage}></img>
                                }
                                {video.type === "tv" &&
                                    <img className="film-image" src={retrotv} alt={retrotv}></img>
                                }
                                <img className="film-image x-image" onClick={() => { setVideoid(null); } } 
                                    src={xmark} alt={xmark}></img>
                            </div>
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
                        </div>
                    } 
                </>
                )}
            </>
            }
            {(commentData.isOpen) && (isMessageOpen) &&
                <div className={`newinteractioncomment ${commentData.isOpen ? 'open' : 'closed'}`}>
                    <NewComment messageTitle={commentData.title} messageMessage={commentData.message} prevmessage={commentData.prevmessage} 
                        handleDataChange={handleDataChange} handleDataChange2={handleDataChange2} 
                        sendMessage={sendMessage} closeMessage={() => setCommentData({ isOpen: false, title: "", message: "", prevmessage: null })} />
                </div>
            }
        </div>
    )

}

export default Interaction;
