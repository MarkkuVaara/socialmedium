
import React, { useState } from 'react';

import message from '../images/messageicon.png';
import likeicon from '../images/likeicon.png';
import loveicon from '../images/loveicon.png';
import unlikeicon from '../images/unlikeicon.png';

const Base = (props) => {

    const [isMessageOpen, setIsMessageOpen] = useState(null);

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
                            <button className="navbutton" onClick={() => setIsMessageOpen(null)}>Close</button>
                        }
                        {props.messages.map(message => 
                            <div className="basemessageb" key={message.id}>
                            {(message.viewid === view.id && isMessageOpen === view.id ) &&
                                <div className="messagetop">
                                    <p className="messagedate">{message.date}</p>
                                    <h4>{message.title}</h4>
                                    <p>{message.message}</p>
                                    <div className="reactions">
                                        <button className="replybutton" onClick={() => props.addComment(view.id)}>Reply</button>
                                        <div>
                                            {props.likes.map(like => 
                                            <>
                                                {like.messageid === message.id &&
                                                    <div className="reaction">
                                                        {like.type === "like" &&
                                                        <div className="reaction-container">
                                                            <img className="likeicon" src={likeicon} alt={likeicon} 
                                                                onClick={() => props.addLike(message.id)}></img>
                                                            <div className="side-text">
                                                                {like.amount}
                                                            </div>
                                                        </div>
                                                        }
                                                        {like.type === "love" &&
                                                        <div className="reaction-container">
                                                            <img src={loveicon} alt={loveicon}></img>
                                                            <div className="side-text">
                                                                {like.amount}
                                                            </div>
                                                        </div>
                                                        }
                                                        {like.type === "unlike" &&
                                                        <div className="reaction-container">
                                                            <img src={unlikeicon} alt={unlikeicon}></img>
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
                    </div>
                </div>
            )}
        </div>
    )

}

export default Base;
