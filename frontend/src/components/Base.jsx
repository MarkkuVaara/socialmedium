
import React, { useState } from 'react';

import message from '../images/messageicon.png';
import likeicon from '../images/likeicon.png';
import fadelikeicon from '../images/fadelikeicon.png';
import loveicon from '../images/loveicon.png';
import unlikeicon from '../images/unlikeicon.png';
import fadeunlikeicon from '../images/fadeunlikeicon.png';
import NewComment from '../components/NewComment';

const Base = (props) => {

    const [isMessageOpen, setIsMessageOpen] = useState(null);
    const [isCommentOpen, setIsCommentOpen] = useState(false);
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
        const message = event.target.message.value;

        setIsCommentOpen(false);
        props.addComment({title, message, isMessageOpen});

    }

    const sendReaction = () => {

        alert("Reaction sent!")

    }

    return (

        <div className="nav">
            <h3>Base</h3>

            {props.views.map(view => 
                <div className="baseview" key={view.id}>
                    <p className="basedate">{view.date}</p>

                    {props.videos.map(video => 
                        <> 
                        {video.id === view.videoid &&
                            <>
                            <div className="basevideo" key={video.id}>
                                <h4>{video.name}</h4>
                                <p>{video.year}</p>
                                <p>{video.director}</p>
                                <p>{video.actors.map(actor => 
                                    <span className="videoactor" key={video.id}>
                                        <p>{actor}</p>
                                    </span>)}
                                </p>
                                <p>{video.length} min</p>
                                <div className="image-container">
                                    <img className="messageicon" 
                                        src={message} alt={message}
                                        onClick={() => setIsMessageOpen(view.id)}></img>
                                    <div className="centered-text">
                                        {props.messages.filter(message => message.viewid === view.id).length}
                                    </div>
                                </div>
                            </div>
                            <div className="basebottom"></div>
                            </>
                        }
                        </>
                    )}

                    <div className={`basemessage ${isMessageOpen ? 'open' : 'closed'}`}>
                        {isMessageOpen === view.id &&
                            <div className="topbuttons">
                                <button className="commbutton" onClick={() => { setIsCommentOpen(true); setMessageTitle(""); setMessageMessage(""); }}>Comment</button>
                                <button className="commclosebutton" onClick={() => setIsMessageOpen(null)}>Close</button>
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
                                    <p className="messagedate">{message.date}</p>
                                    </div>
                                    <h4>{message.title}</h4>
                                    <p>{message.message}</p>
                                    <div className="reactions">
                                        <button className="replybutton" onClick={() => { setIsCommentOpen(true); setMessageTitle("Vs:" + message.title); setMessageMessage(">> " + message.message + "\n\n"); } }>Reply</button>
                                        <div>
                                            {props.likes.map(like => 
                                            <>
                                                {like.messageid === message.id &&
                                                    <div className="reaction" key={like.id}>
                                                        {like.type === "like" &&
                                                        <div className="reaction-container">
                                                            {like.amount === 0 &&
                                                                <img className="likeicon" src={fadelikeicon} alt={fadelikeicon} 
                                                                onClick={() => props.addLike(message.id)}></img>
                                                            }
                                                            {like.amount > 0 &&
                                                                <img className="likeicon" src={likeicon} alt={likeicon} 
                                                                    onClick={() => props.addLike(message.id)}></img>
                                                            }
                                                            <div className="side-text">
                                                                {like.amount}
                                                            </div>
                                                        </div>
                                                        }
                                                        {like.type === "love" &&
                                                        <div className="reaction-container">
                                                            <img className="likeicon" src={loveicon} alt={loveicon}  
                                                                onClick={() => props.addLove(message.id)}></img>
                                                            <div className="side-text">
                                                                {like.amount}
                                                            </div>
                                                        </div>
                                                        }
                                                        {like.type === "unlike" &&
                                                        <div className="reaction-container">
                                                            {like.amount === 0 &&
                                                            <img className="likeicon" src={fadeunlikeicon} alt={fadeunlikeicon}
                                                                onClick={() => props.addUnlike(message.id)}></img>
                                                            }
                                                            {like.amount > 0 &&
                                                            <img className="likeicon" src={unlikeicon} alt={unlikeicon}
                                                                onClick={() => props.addUnlike(message.id)}></img>
                                                            }
                                                            <div className="side-text">
                                                                {like.amount}
                                                            </div>
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
                    </div>

                </div>
            )}

        </div>
    )

}

export default Base;
