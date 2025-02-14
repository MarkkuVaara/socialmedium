
import React, { useState } from 'react';

import message from '../images/messageicon.png';
import likeicon from '../images/likeicon.png';
import fadelikeicon from '../images/fadelikeicon.png';
import loveicon from '../images/loveicon.png';
import fadeloveicon from '../images/fadeloveicon.png';
import unlikeicon from '../images/unlikeicon.png';
import fadeunlikeicon from '../images/fadeunlikeicon.png';
import NewComment from '../components/NewComment';
import NewView from '../components/NewView';

const Base = (props) => {

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


    return (

        <div className="basefeed">
            
            <div className="leftbase">
                <div className="newviewbutton">
                    <button className="navbutton" onClick={() => setIsViewOpen(true)}>Add new view</button>
                </div>
                <div className="newviewbutton">
                    <button className="navbutton">A</button>
                </div>
                <div className="newviewbutton">
                    <button className="navbutton">V</button>
                </div> 
            </div>

            <div className="centerbase">
            {props.views.map(view => 
                <div className="baseview" key={view.id}>
                    <p className="basedate">{view.date.substring(0, 10)}</p>

                    {props.videos.map(video => 
                        <> 
                        {video.id === view.videoid &&
                            <>
                            <div className="basevideo" key={video.id}>
                                <h4>{video.name}</h4>
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
                                    <p className="messagedate">{message.date.substring(0, 10)}</p>
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
                    </div>

                </div>
            )}
            {isViewOpen === true &&
                <div className={`newview ${isViewOpen ? 'open' : 'closed'}`}>
                    <NewView videos={props.videos}
                        sendView={sendView} closeView={() => setIsViewOpen(false)}/>
                </div>
            }
            </div>

            <div className="rightbase">
                <div className="newviewbutton">
                    <button className="navbutton">O</button>
                </div>
                <div className="newviewbutton">
                    <button className="navbutton">A</button>
                </div>
                <div className="newviewbutton">
                    <button className="navbutton">V</button>
                </div> 
            </div>

        </div>
    )

}

export default Base;
