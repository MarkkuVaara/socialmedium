
import React, { useState, useRef } from 'react';

import filmimage from '../images/filmreel2.png';
import retrotv from '../images/retrotv.png';
import xmark from '../images/x-mark.png';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import Comment from '../components/Comment';
import './TimelineStyles.css';

const Interaction = (props) => {

    const [videoid, setVideoid] = useState({ videoid: null, viewid: null });
    const [refresh, setRefresh] = useState(0);

    const sliderRef = useRef(null);

    const goToNext = (index) => {
        sliderRef.current.slickGoTo(index);
        setRefresh(index);
    };

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        adaptiveHeight: true,
        ref: sliderRef
    };

    const generateMonthlyTicks = (startDate, endDate) => {

        const ticks = [];
        const date = new Date(startDate);

        date.setDate(1);

        while (date <= new Date(endDate)) {
            ticks.push({
                date: new Date(date),
                label: date.toLocaleString('default', { month: 'short' })
            });
            date.setMonth(date.getMonth() + 1);
        }

        return ticks;

    }

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
        const viewid = event.target.ismessageopen.value;

        const almmessage = sanitizeHtml(premessage);

        const message = almmessage
            .replace(/<br\s*\/?>/gi, '\n').replace(/\n\n/g, '\n\u00A0\n');
        console.log(message)
        props.addComment({title, message, viewid, prevmessage });

    }

    const messages = props.messages.filter(message => message.prevcomment === 0).sort( function(a, b){
        let x = new Date(a.date);
        let y = new Date(b.date);
        return x-y;
    });

    const start = new Date(messages[0].date).getTime();
    const end = new Date(messages[messages.length - 1].date).getTime();
    const total = end - start;
    const ticks = generateMonthlyTicks(start, end);
    const intendation = 0;

    return (
        <div className="nav">
            <h3>Comment chain timeline</h3>
            <div className="timeline-container">
                <div className="timeline-line" />
                    {ticks.map((tick, i) => {
                        const pos = ((tick.date.getTime() - start) / total) * 100;

                        return (
                            <div className="timeline-tick" style={{ left: `${pos}%` }} key={i}>
                            <div className="tick-mark" />
                            {tick.date.getTime() > start &&
                                <div className="tick-label">{tick.label}</div>
                            }
                            {tick.date.getMonth() === 0 &&
                                <div className="tick-label">{tick.date.getFullYear()}</div>
                            }
                            </div>
                        );
                    })}
                    {messages.map((message, i) => {
                        const pos = ((new Date(message.date).getTime() - start) / total) * 100;

                        return (
                            <div className="timeline-event" style={{ left: `${pos}%` }} key={i}>
                                <div className="dot"
                                    style={{ backgroundColor: refresh === i ? 'red' : '#ccc' }} 
                                    onClick={() => goToNext(i)} />
                                <div className="date">{new Date(message.date).getDate()}</div>
                            </div>
                        );
                    })}
            </div>
            <div className="interactionview">
                <Slider {...sliderSettings}>
                    {messages.map(message => <>
                    <div className="dateandview">
                        <p className="datep">{message.date.substring(8, 10)}.{message.date.substring(5, 7)}.{message.date.substring(0, 4)}</p>
                        {props.views.map(view => <>
                            {view.id === message.viewid && 
                                <div className="viewdata">
                                    <p>{view.date.substring(8, 10)}.{view.date.substring(5, 7)}.{view.date.substring(0, 4)}</p>
                                    {props.videos.map(video => <>
                                        {video.id === view.videoid &&
                                            <p className="videodata" onClick={() => setVideoid({ videoid: video.id, viewid: view.id })}><strong>{video.name}</strong></p>
                                        } 
                                    </>
                                    )}
                                </div>
                            }
                        </> )}
                    </div>
                    <Comment message={message} messages={props.messages} likes={props.likes} sendMessage={sendMessage}
                        addLike={props.addLike} views={props.views} intendation={intendation} />
                    </>
                    )}
                </Slider>
            </div>
            {videoid.videoid && <>
                {props.videos.map(video =>
                <>
                    {video.id === videoid.videoid &&
                        <div className="interactionvideo" key={video.id}>
                            <div className="videoname">
                                <h4>{video.name}</h4>
                                {video.type === "movie" &&
                                    <img className="film-image" src={filmimage} alt={filmimage}></img>
                                }
                                {video.type === "tv" &&
                                    <img className="film-image" src={retrotv} alt={retrotv}></img>
                                }
                                <img className="film-image x-image" onClick={() => { setVideoid({ videoid: null, viewid: null }); } } 
                                    src={xmark} alt={xmark}></img>
                            </div>
                            {props.views.map(view => 
                                <>
                                {(view.videoid === videoid.videoid) && (view.id === videoid.viewid) && (view.partid) &&
                                    <p>Season: {view.partid} / Episode: {view.episodeid}</p>
                                }
                                </>
                            )}
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
