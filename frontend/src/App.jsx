
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
      payload: props.views
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


  const addGladiator = () => {

    dispatch({
      type: 'NEW_VIDEO',
      payload: {id: 20, name: "Gladiator",
        type: "movie",
        director: "Ridley Scott",
        actors: ["Russell Crowe", "Joaquin Phoenix", "Connie Nielsen"],
        year: 2000,
        length: 130}
    }); 
    
    dispatch({
      type: 'NEW_VIEW',
      payload: {id: 1000, date: "04122024",
        videoid: 1,
        userid: 1,
        partid: null}
    });

  }


  const addComment = (viewId) => {

    dispatch({
      type: 'NEW_COMMENT',
      payload: {id: messages.length + 1,
        date: "20122024",
        title: 'Testi',
        message: 'Testiviesti',
        viewid: viewId
      }
    });

  }

  const addLike = (messageId) => {

    dispatch({
      type: 'NEW_REACTION',
      payload: {id: likes.length + 1,
        type: 'like',
        amount: 1,
        messageid: messageId
      }
    })

  }


  return (

    <div className="mainapp">
      <div className="banner">
        <h1>Media social</h1>
        <p>Welcome to the social media for movie, tv and streaming watchers!</p>
        <img className="filmlogo" src={Filmreel} alt={Filmreel}></img>
      </div>
      <div className="nav">
        <div className="subnav">
          <button className="navbutton" onClick={() => dispatch({type: 'BASE'})}>Base</button>
          <button className="navbutton" onClick={() => dispatch({type: 'TIMELINE'})}>Timeline</button>
          <button className="navbutton" onClick={() => dispatch({type: 'INTERACTION'})}>Interaction</button>
          <button className="navbutton" onClick={() => addGladiator()} >Add Gladiator</button>
        </div>
      </div>
      <div className="main">
        {pageTurner === 0
          &&
          <div className="base">
            <Base users={users} videos={videos} views={views} messages={messages} likes={likes} addComment={addComment} addLike={addLike} />
          </div>
        }
        {pageTurner === 1
          && 
          <div className="timeline">
            <Timeline videos={videos} views={views} messages={messages} likes={likes} />
          </div>
        }
        {pageTurner === 2
          && 
          <div className="interaction">
            <Interaction videos={videos} views={views} messages={messages} likes={likes} />
          </div>
        }
      </div>
    </div>

  )

};

export default App;
