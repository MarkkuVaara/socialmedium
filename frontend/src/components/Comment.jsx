
import React, { useState } from 'react';

import { CSSTransition } from "react-transition-group";

import likeicon from '../images/likeicon.png';
import fadelikeicon from '../images/fadelikeicon.png';
import loveicon from '../images/loveicon.png';
import fadeloveicon from '../images/fadeloveicon.png';
import unlikeicon from '../images/unlikeicon.png';
import fadeunlikeicon from '../images/fadeunlikeicon.png';

import NewComment from '../components/NewComment';

const Comment = (props) => {

    const [commentData, setCommentData] = useState({
        isOpen: false,
        title: '',
        message: '',
        prevcomment: null
    });
    const [isMessageOpen, setIsMessageOpen] = useState(null);

    const handleDataChange = (event) => {
        setCommentData({ isOpen: true, 
            title: event.target.value, 
            message: commentData.message,
            prevcomment: commentData.prevcomment
        });
    };
        
    const handleDataChange2 = (value) => {
        setCommentData({ isOpen: true,
            title: commentData.title,
            message: value,
            prevcomment: commentData.prevcomment
        });
    };

    const sendMessage = (event) => {
        event.preventDefault();
        setCommentData({ isOpen: false, title: "", message: "", prevcomment: null });
        props.sendMessage(event);
    }

    const message = props.message;
    const intendation = props.intendation;

    const childrenmessages = props.messages.filter(m => m.prevcomment === message.id);

    return (

        <div style={{ position: 'relative' }}>
        <div className="commentview" key={message.id} style={{ marginLeft: intendation }}>
            <div className="commenttitle">
                <div className="titlewrap"><h4>{message.title}</h4></div>
                <div><p>{message.date.substring(0, 10)}</p><p>{message.date.substring(11)}</p></div>
            </div>
            <div className="commentmessagewrap">
                <div className="commentmessage">
                    <p style={{ whiteSpace: 'pre-wrap' }}
                        dangerouslySetInnerHTML={{ __html: message.message }} ></p>
                </div>  
                <div className="commentmessage commentreactions">
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
                {props.views.map(view => <>
                    {view.id === message.viewid && 
                        <div className="commentbuttons">
                            <button className="replybutton" onClick={() => { setCommentData({
                                isOpen: true,
                                title: "Vs:" + message.title,
                                message: message.date + "\n\n" + message.message.trim() + "\n\n",
                                prevcomment: message.id
                            }); setIsMessageOpen(view.id) } }>Reply</button>
                            <button className="replybutton">TBD</button>
                        </div>
                    }
                </> )}
            </div>
        </div>
        {childrenmessages.map(message => 
            <Comment key={message.id} message={message} messages={props.messages} likes={props.likes} sendMessage={sendMessage}
                addLike={props.addLike} views={props.views} intendation={intendation + 20} />
        )}
        <CSSTransition in={commentData.isOpen} timeout={1000} classNames="fade-slide" unmountOnExit>
            <div className="newinteractioncomment open">
                <NewComment messageTitle={commentData.title} messageMessage={commentData.message} prevcomment={commentData.prevcomment} 
                    isMessageOpen={isMessageOpen} handleDataChange={handleDataChange} handleDataChange2={handleDataChange2}
                    sendMessage={sendMessage} closeMessage={() => setCommentData({ isOpen: false, title: "", message: "", prevcomment: null })} />
            </div>
        </CSSTransition>
        </div>

    )

}

export default Comment;
