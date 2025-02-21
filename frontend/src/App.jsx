
import React, { useState, useEffect, useRef } from 'react';
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Base from './components/Base';
import Timeline from './components/Timeline';
import Interaction from './components/Interaction';

import Filmreel from './images/filmreel.png';
import MediaSocial from './images/Media Social.png';

const App = (props) => {

  const pageTurner = useSelector((state) => state.pageTurner);
  const videos = useSelector((state) => state.videoReducer);
  const views = useSelector((state) => state.viewReducer);
  const messages = useSelector((state) => state.commentReducer);
  const likes = useSelector((state) => state.reactionReducer);
  const users = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  useEffect(() => {

    dispatch({
      type: 'ALL_VIDEOS',
      payload: props.videos
    });
    dispatch({
      type: 'ALL_VIEWS',
      payload: props.views.sort( function(a, b){
        let x = new Date(a.date);
        let y = new Date(b.date);
        return y-x;
        })
    });
    dispatch({
      type: 'ALL_COMMENTS',
      payload: props.messages
    });
    dispatch({
      type: 'ALL_REACTIONS',
      payload: props.likes
    });
    dispatch({
      type: 'ALL_USERS',
      payload: props.users
    });

  }, []);


  const addNewView = ({title, date}) => {

    dispatch({
      type: 'NEW_VIEW',
      payload: {id: 1000 + views.length, date: date,
        videoid: Number(title),
        userid: 1,
        partid: null}
    });

  }


  const addComment = ({title, message, isMessageOpen}) => {

    const id = messages.length + 1;

    const currentDate = new Date();
    const formatter = new Intl.DateTimeFormat('en-us', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const formattedTime = formatter.format(currentDate);
    const dd = String(currentDate.getDate()).padStart(2, '0');
    const mm = String(currentDate.getMonth()+1).padStart(2, '0');
    const yyyy = currentDate.getFullYear();
  
    const today = mm + '/' + dd + '/' + yyyy + ' ' + formattedTime;

    dispatch({
      type: 'NEW_COMMENT',
      payload: {id: id,
        userid: 1,
        date: today,
        title: title,
        message: message,
        viewid: isMessageOpen
      }
    });

    dispatch({
      type: 'NEW_BASEREACTION',
      payload: {id: likes.length + 1,
        messageid: id,
        type: "like",
        amount: 0
      }
    })
    dispatch({
      type: 'NEW_BASEREACTION',
      payload: {id: likes.length + 2,
        messageid: id,
        type: "love",
        amount: 0
      }
    })
    dispatch({
      type: 'NEW_BASEREACTION',
      payload: {id: likes.length + 3,
        messageid: id,
        type: "unlike",
        amount: 0
      }
    })

  }

  const addLike = (likeId) => {

    dispatch({
      type: 'NEW_REACTION',
      payload: { likeId }
    })

  }

  const changeViewOrder = () => {
    dispatch({
      type: 'SORT_VIEWS_ASCENDING'
    })
  }

  const changeViewOrderD = () => {
    dispatch({
      type: 'SORT_VIEWS_DESCENDING'
    })
  }


  return (

    <div className="mainapp">
      <div className="banner">
        <img className="mediasocial" src={MediaSocial} alt={MediaSocial}></img>
        <p>Welcome to the social media for movie, tv and streaming watchers!</p>
        <img className="filmlogo" src={Filmreel} alt={Filmreel}></img>
      </div>
      <div className="nav">
        <div className="subnav">
          <div>
          <button className={`navbutton ${pageTurner === 0 ? 'bar' : 'nobar' }` } onClick={() => dispatch({type: 'BASE'})}>Base</button>
          <button className={`navbutton ${pageTurner === 1 ? 'bar' : 'nobar' }` } onClick={() => dispatch({type: 'TIMELINE'})}>Timeline</button>
          <button className={`navbutton ${pageTurner === 2 ? 'bar' : 'nobar' }` } onClick={() => dispatch({type: 'INTERACTION'})}>Interaction</button>
          </div>
        </div>
      </div>
      <div className="main">
        {pageTurner === 0
          &&
          <div className="base">
            <Base users={users} videos={videos} views={views} messages={messages} likes={likes} 
              addComment={addComment} addLike={addLike} addView={addNewView} changeViewOrder={changeViewOrder}
              changeViewOrderD={changeViewOrderD} />
          </div>
        }
        {pageTurner === 1
          && 
          <div className="timeline">
            <Timeline users={users} videos={videos} views={views} messages={messages} likes={likes} 
              addComment={addComment} addLike={addLike} />
          </div>
        }
        {pageTurner === 2
          && 
          <div className="interaction">
            <Interaction users={users} videos={videos} views={views} messages={messages} likes={likes} 
              addComment={addComment} addLike={addLike} />
          </div>
        }
      </div>
    </div>

  )

};

export default App;
