
import React, { useState } from 'react';

import message from '../images/messageicon.png';

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
                                <img className="messageicon" 
                                    src={message} alt={message}
                                    onClick={() => setIsMessageOpen(view.id)}></img>
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
                                    <h4>{message.title}</h4>
                                    <p>{message.message}</p>
                                </div>
                            }
                            </div>
                        )}
                    </div>
                    {props.likes.map(like => 
                        <>
                        {like.viewid === view.id &&
                            <>
                                <p>{like.type}</p>
                            </>
                        }
                        </>
                    )}
                </div>
            )}
        </div>
    )

}

export default Base;
