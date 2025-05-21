
import React, { useState } from 'react';

import filmimage from '../images/filmreel2.png';
import retrotv from '../images/retrotv.png';
import xmark from '../images/x-mark.png';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const Interaction = (props) => {

    const [videoid, setVideoid] = useState(null);

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
                            <div className="commentbuttons">
                                <button className="replybutton">Reply</button>
                                <button className="replybutton">Show</button>
                            </div>
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
        </div>
    )

}

export default Interaction;
