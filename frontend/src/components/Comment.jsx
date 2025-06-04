
import React, { useState } from 'react';

import likeicon from '../images/likeicon.png';
import fadelikeicon from '../images/fadelikeicon.png';
import loveicon from '../images/loveicon.png';
import fadeloveicon from '../images/fadeloveicon.png';
import unlikeicon from '../images/unlikeicon.png';
import fadeunlikeicon from '../images/fadeunlikeicon.png';

const Comment = (props) => {

    const message = props.message;
    const intendation = props.intendation;

    const childrenmessages = props.messages.filter(m => m.prevmessage === message.id);

    return (

        <>
        <div className="commentview" key={message.id} style={{ marginLeft: intendation }}>
            <div className="commenttitle">
                <div className="titlewrap"><h4>{message.title}</h4></div>
                <div><p>{message.date.substring(0, 10)}</p><p>{message.date.substring(10)}</p></div>
            </div>
            <div className="commentmessagewrap">
                <div className="commentmessage">
                    <p style={{ whiteSpace: 'pre-wrap' }}
                        dangerouslySetInnerHTML={{ __html: message.message }} ></p>
                </div>  
                <div className="commentmessage commentreactions">
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
        {childrenmessages.map(message => 
            <Comment key={message.id} message={message} messages={props.messages} likes={props.likes} 
                addLike={props.addLike} views={props.views} intendation={intendation + 20} />
        )}
        </>

    )

}

export default Comment;
