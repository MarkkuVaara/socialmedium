
import React, { useState, useEffect, useRef } from 'react';
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom';

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
      </div>
      <div className="main">
        <p>Feed</p>
        {videos.map(video => 
          <p>{video.name}</p>
        )}
        {views.map(view => 
          <p>{view.date}</p>
        )}
        {messages.map(message => 
          <p>{message.title}</p>
        )}
        {likes.map(like => 
          <p>{like.type}</p>
        )}
      </div>
    </div>

  )

};

export default App;
