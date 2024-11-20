
import React, { useState, useEffect, useRef } from 'react';
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom';

import Filmreel from './images/filmreel.png';

const App = () => {

  const [messages, setMessages] = useState([]);

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
      </div>
    </div>

  )

};

export default App;
