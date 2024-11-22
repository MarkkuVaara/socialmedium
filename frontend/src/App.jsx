
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

  const [videos, setVideos] = useState(props.videos);
  const [views, setViews] = useState(props.views);
  const [messages, setMessages] = useState(props.messages);
  const [likes, setLLikes] = useState(props.likes);
  const [user, setUser] = useState(null);

  const pageTurner = useSelector((state) => state);
  const dispatch = useDispatch();

  return (

    <div className="mainapp">
      <div className="banner">
        <h1>Movie social</h1>
        <p>Welcome to the social media for movie, tv and streaming watchers!</p>
        <img className="filmlogo" src={Filmreel} alt={Filmreel}></img>
      </div>
      <div className="nav">
        <h2>Navigation</h2>
        <button onClick={() => dispatch({type: 'BASE'})}>Base</button>
        <button onClick={() => dispatch({type: 'TIMELINE'})}>Timeline</button>
        <button onClick={() => dispatch({type: 'INTERACTION'})}>Interaction</button>
      </div>
      <div className="main">
        {pageTurner === 0
          &&
          <div className="nav">
            <Base videos={videos} views={views} messages={messages} likes={likes} />
          </div>
        }
        {pageTurner === 1
          && 
          <div className="nav">
            <Timeline videos={videos} views={views} messages={messages} likes={likes} />
          </div>
        }
        {pageTurner === 2
          && 
          <div className="nav">
            <Interaction videos={videos} views={views} messages={messages} likes={likes} />
          </div>
        }
      </div>
    </div>

  )

};

export default App;
