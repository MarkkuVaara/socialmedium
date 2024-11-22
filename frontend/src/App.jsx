
import React, { useState, useEffect, useRef } from 'react';
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom';

import { legacy_createStore as createStore } from 'redux';

const pageTurner = (state = 0, action) => {
  switch (action.type) {
    case 'BASE':
      return 0
    case 'TIMELINE':
      return 1
    case 'INTERACTION':
      return 2
    default:
    return state
  }
};

const store = createStore(pageTurner);

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

  return (

    <div className="mainapp">
      <div className="banner">
        <h1>Movie social</h1>
        <p>Welcome to the social media for movie, tv and streaming watchers!</p>
        <img className="filmlogo" src={Filmreel} alt={Filmreel}></img>
      </div>
      <div className="nav">
        <h2>Navigation</h2>
        <button onClick={() => store.dispatch({type: 'BASE'})}>Base</button>
        <button onClick={() => store.dispatch({type: 'TIMELINE'})}>Timeline</button>
        <button onClick={() => store.dispatch({type: 'INTERACTION'})}>Interaction</button>
      </div>
      <div className="main">
        {store.getState() === 0
          &&
          <div className="nav">
            <Base videos={videos} views={views} messages={messages} likes={likes} />
          </div>
        }
        {store.getState() === 1
          && 
          <div className="nav">
            <Timeline videos={videos} views={views} messages={messages} likes={likes} />
          </div>
        }
        {store.getState() === 2
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
