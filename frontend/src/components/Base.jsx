
import React, { useState } from 'react';

import filmimage from '../images/filmreel2.png';
import filmcamera from '../images/filmcamera.png';
import retrotv from '../images/retrotv.png';

import message from '../images/messageicon.png';
import likeicon from '../images/likeicon.png';
import fadelikeicon from '../images/fadelikeicon.png';
import loveicon from '../images/loveicon.png';
import fadeloveicon from '../images/fadeloveicon.png';
import unlikeicon from '../images/unlikeicon.png';
import fadeunlikeicon from '../images/fadeunlikeicon.png';

import downarrow from '../images/downarrow.png';
import uparrow from '../images/uparrow.png';

import NewComment from '../components/NewComment';
import NewView from '../components/NewView';

const Base = (props) => {

    const [isMessageOpen, setIsMessageOpen] = useState(null);
    const [isViewOpen, setIsViewOpen] = useState(false);
    const [order, setOrder] = useState(false);

    const [commentData, setCommentData] = useState({
        isOpen: false,
        title: '',
        message: '',
        prevmessage: null,
    });

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
        const prevmessage = event.target.prevmessage.value;

        const almmessage = sanitizeHtml(premessage);

        const message = almmessage
            .replace(/<br\s*\/?>/gi, '\n').replace(/\n\n/g, '\n\u00A0\n');
        console.log(message)
        setCommentData({ isOpen: false, title:"", message:"", prevmessage: null });
        props.addComment({title, message, isMessageOpen, prevmessage});

    }

    const sendView = (event) => {

        event.preventDefault();

        const date = event.target.date.value;
        const title = event.target.title.value;

        setIsViewOpen(false);
        setOrder(false);
        props.addView({title, date});

    }

    const changeOrder = () => {
        props.changeViewOrder();
    }

    const changeOrderD = () => {
        props.changeViewOrderD();
    }


    return (

        <div className="basefeed">
            
            <div className="leftbase">
                <div className="newviewbutton">
                    <button className="navbutton" onClick={() =>  setIsViewOpen(true)}>
                        <p>Add new view</p>
                        <img className="arrowicon" style={{ "background-color": "white", "border-radius": "10px" }} src={filmcamera} alt={filmcamera}></img>
                    </button>
                </div>
                <div className="newviewbutton">
                    <button className="navbutton" onClick={() => { changeOrderD(); setOrder(false); } }>
                        <p>Latest view to the top</p>
                        <img className="arrowicon" src={uparrow} alt={uparrow}></img>
                    </button>
                </div>
                <div className="newviewbutton">
                    <button className="navbutton" onClick={() => { changeOrder(); setOrder(true); } }>
                        <p>Earliest view to the top</p>
                        <img className="arrowicon" src={downarrow} alt={downarrow}></img>
                    </button>
                </div>
            </div>

            <div className={`centerbase ${order ? 'asc' : 'dsc'}`}>
            {props.views.map(view => 
                <div className="baseview" key={view.id}>
                    <p className="basedate">{view.date.substring(0, 10)}</p>

                    {props.videos.map(video => 
                        <> 
                        {video.id === view.videoid &&
                            <>
                            <div className="basevideo" key={video.id}>
                                <div className="videoname">
                                    <h4>{video.name}</h4>
                                    {video.type === "movie" &&
                                        <img className="film-image" src={filmimage} alt={filmimage}></img>
                                    }
                                    {video.type === "tv" &&
                                        <img className="film-image" src={retrotv} alt={retrotv}></img>
                                    }
                                </div>
                                {view.partid &&
                                    <p>Season: {view.partid} / Episode: {view.episodeid}</p>
                                }
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
                                        onClick={() => { setIsMessageOpen(view.id);
                                            setCommentData({ isOpen: false, title: "", message: "", prevmessage: null }); 
                                         }}></img>
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
                                <button className="commbutton" onClick={() => setCommentData({
                                    isOpen: true,
                                    title: "",
                                    message: "", prevmessage: "0"
                                })}>Comment</button>
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
                                        <button className="replybutton" onClick={() => setCommentData({
                                            isOpen: true,
                                            title: "Vs:" + message.title,
                                            message: message.date + "\n\n" + message.message.trim() + "\n\n",
                                            prevmessage: message.prevmessage
                                        })}>Reply</button>
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
                        {(isMessageOpen === view.id) && (commentData.isOpen) &&
                            <div className={`newcomment ${commentData.isOpen ? 'open' : 'closed'}`}>
                                <NewComment messageTitle={commentData.title} messageMessage={commentData.message} prevmessage={commentData.prevmessage}
                                    handleDataChange={handleDataChange} handleDataChange2={handleDataChange2} 
                                    sendMessage={sendMessage} closeMessage={() => setCommentData({ isOpen: false, title: "", message: "", prevmessage: null })} />
                            </div>
                        }
                    </div>

                </div>
            )}
            {isViewOpen === true &&
                <div className={`newview ${isViewOpen ? 'open' : 'closed'}`}>
                    <NewView videos={props.videos} sendView={sendView} closeView={() => setIsViewOpen(false)}/>
                </div>
            }
            </div>

            <div className="rightbase">
                <div className="newviewbutton">
                    <button className="navbutton">TBD</button>
                </div>
                <div className="newviewbutton">
                    <button className="navbutton">TBD</button>
                </div>
                <div className="newviewbutton">
                    <button className="navbutton">TBD</button>
                </div> 
            </div>

        </div>
    )

}

export default Base;
