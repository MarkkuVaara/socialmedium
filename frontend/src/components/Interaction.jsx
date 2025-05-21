
import React, { useState } from 'react';

import filmimage from '../images/filmreel2.png';
import retrotv from '../images/retrotv.png';
import xmark from '../images/x-mark.png';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import NewComment from '../components/NewComment';

const Interaction = (props) => {

    const [videoid, setVideoid] = useState(null);
    const [isMessageOpen, setIsMessageOpen] = useState(null);
    const [commentData, setCommentData] = useState({
            isOpen: false,
            title: '',
            message: '',
    });

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false
    };

    const changefeed = (id) => {
        props.changePage(id);
    }

    const handleDataChange = (event) => {
        setCommentData({ isOpen: true, 
            title: event.target.value, 
            message: commentData.message 
        });
    };
        
    const handleDataChange2 = (value) => {
        setCommentData({ isOpen: true,
            title: commentData.title,
            message: value 
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

        const almmessage = sanitizeHtml(premessage);

        const message = almmessage
            .replace(/<br\s*\/?>/gi, '\n').replace(/\n\n/g, '\n\u00A0\n');
        console.log(message)
        setCommentData({ isOpen: false, title:"", message:"" });
        props.addComment({title, message, isMessageOpen});

    }

    const messages = props.messages.sort( function(a, b){
        let x = new Date(a.date);
        let y = new Date(b.date);
        return x-y;
    });

    return (
        <div className="nav">
            <h3>Comment timeline</h3>
            <div className="interactionview">
            <Slider {...sliderSettings}>
                {messages.map(message =>
                    <>
                    <p className="datep">{message.date.substring(0, 10)}</p>
                    <div className="commentview" key={message.id}>
                        <div className="commenttitle">
                            <h4>{message.title}</h4>
                            <div><p>{message.date.substring(0, 10)}</p><p>{message.date.substring(10)}</p></div>
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
                        <div className="commentmessagewrap">
                            <div className="commentmessage">
                                <p style={{ whiteSpace: 'pre-wrap' }}
                                    dangerouslySetInnerHTML={{ __html: message.message }} ></p>
                            </div>
                            {props.views.map(view => <>
                                {view.id === message.viewid && 
                                    <div className="commentbuttons">
                                        <button className="replybutton" onClick={() => { setCommentData({
                                            isOpen: true,
                                            title: "Vs:" + message.title,
                                            message: message.date + "\n\n" + message.message.trim() + "\n\n"
                                        }); setIsMessageOpen(view.id); } }>Reply</button>
                                        <button className="replybutton">Show chain</button>
                                    </div>
                                }
                            </> )}
                        </div>
                    </div>
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
                    <NewComment messageTitle={commentData.title} messageMessage={commentData.message} 
                        handleDataChange={handleDataChange} handleDataChange2={handleDataChange2} 
                        sendMessage={sendMessage} closeMessage={() => setCommentData({ isOpen: false, title: "", message: "" })} />
                </div>
            }
        </div>
    )

}

export default Interaction;
