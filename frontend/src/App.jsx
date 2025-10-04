
import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Base from './components/Base';
import Timeline from './components/Timeline';
import Interaction from './components/Interaction';

import videoservice from './services/videoservice';
import viewservice from './services/viewservice';
import commentservice from './services/commentservice';
import reactionservice from './services/reactionservice';
import userservice from './services/userservice';
import loginservice from './services/loginservice';

import Filmreel from './images/filmreel.png';
import MediaSocial from './images/Media Social.png';
import { CSSTransition } from "react-transition-group";

import LoginWindow from './components/LoginWindow';

const App = () => {

  const pageTurner = useSelector((state) => state.pageTurner);
  const loginWindow = useSelector((state) => state.loginWindow);
  const tokenHandler = useSelector((state) => state.tokenHandler);
  const videos = useSelector((state) => state.videoReducer);
  const views = useSelector((state) => state.viewReducer);
  const messages = useSelector((state) => state.commentReducer);
  const likes = useSelector((state) => state.reactionReducer);
  const users = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  useEffect(() => {

    videoservice
      .getAll()
      .then(response => 
        dispatch({
          type: 'ALL_VIDEOS',
          payload: response.data
        })
      )

    viewservice
      .getAll()
      .then(response => 
        dispatch({
          type: 'ALL_VIEWS',
          payload: response.data.sort( function(a, b){
            let x = new Date(a.date);
            let y = new Date(b.date);
            return y-x;
          })
        })
      )

    commentservice
      .getAll()
      .then(response =>
        dispatch({
          type: 'ALL_COMMENTS',
          payload: response.data
        })
      )

    reactionservice
      .getAll()
      .then(response => 
        dispatch({
          type: 'ALL_REACTIONS',
          payload: response.data
        })
      )

    userservice
      .getAll()
      .then(response => 
        dispatch({
          type: 'ALL_USERS',
          payload: response.data
        })
      )

  }, []);


  const parseTime = (timePart, period) => {

    let [hour, minute, second] = timePart.split(':').map(Number);

    if (period === 'PM' && hour !== 12) { hour = hour + 12; }
    if (period === 'AM' && hour === 12) { hour = 0; }

    return { 
      hour: String(hour).padStart(2, '0'),
      minute: String(minute).padStart(2, '0'),
      second: String(second).padStart(2, '0'),
    };

  }


  const parseDate = (date) => {

    const [datePart, timePart, period] = date.split(' ');
    const [month, day, year] = datePart.split('/');
    const { hour, minute, second } = parseTime(timePart, period);

    return year + "-" + month + "-" + day + "T" + hour + ":" + minute + ":" + second;

  }


  const addNewView = ({title, date}) => {

    const newDate = parseDate(date);

    const newObject = {
      date: newDate,
      videoid: Number(title),
      userid: 1,
      partid: null,
      episodeid: null
    }

    viewservice
      .create(newObject)
      .then(response =>
        dispatch({
          type: 'NEW_VIEW',
          payload: response.data
        })
      )

  }


  const addComment = ({title, message, viewid, prevmessage}) => {

    const currentDate = new Date();
    const yyyy = currentDate.getFullYear();
    const mm = String(currentDate.getMonth() + 1).padStart(2, '0');
    const dd = String(currentDate.getDate()).padStart(2, '0');
    const hh = String(currentDate.getHours()).padStart(2, '0');
    const min = String(currentDate.getMinutes()).padStart(2, '0');
    const ss = String(currentDate.getSeconds()).padStart(2, '0');

    const today = `${yyyy}-${mm}-${dd}T${hh}:${min}:${ss}`;

    console.log(Number(prevmessage));

    const newComment = {
        userid: 1,
        date: today,
        title: title,
        message: message,
        viewid: Number(viewid),
        prevcomment: Number(prevmessage)
    }

    commentservice
      .create(newComment)
      .then(response => {

          dispatch({
            type: 'NEW_COMMENT',
            payload: {id: response.data.id,
              userid: response.data.userid,
              date: response.data.date,
              title: response.data.title,
              message: response.data.message,
              viewid: response.data.viewid,
              prevcomment: response.data.prevcomment
            }
          })

          const newLike = {
            commentId: response.data.id,
            type: "like",
            amount: 0
          }
          const newLove= {
            commentId: response.data.id,
            type: "love",
            amount: 0
          }
          const newUnlike = {
            commentId: response.data.id,
            type: "unlike",
            amount: 0
          }

         reactionservice
            .create(newLike)
            .then(response => {
              dispatch({
                type: 'NEW_BASEREACTION',
                payload: {id: response.data.id,
                commentid: response.data.commentid,
                type: "like",
                amount: 0
                }
              })

              console.log(response.data)
              }
            )
          reactionservice
            .create(newLove)
            .then(response =>
              dispatch({
                type: 'NEW_BASEREACTION',
                payload: {id: response.data.id,
                commentid: response.data.commentid,
                type: "love",
                amount: 0
                }
              })
            )
          reactionservice
            .create(newUnlike)
            .then(response =>
              dispatch({
                type: 'NEW_BASEREACTION',
                payload: {id: response.data.id,
                commentid: response.data.commentid,
                type: "unlike",
                amount: 0
                }
              })
            )

        }
      )

  }

  const addLike = (likeId) => {

    dispatch({
      type: 'NEW_REACTION',
      payload: { likeId }
    })

    const reactions = likes.filter(like => like.id == likeId );
    const reaction = reactions[0];

    const newObject = {
      id: likeId,
      commentId: reaction.commentId,
      type: reaction.type,
      amount: reaction.amount + 1
    }

    reactionservice
      .update(likeId, newObject)
      .then(response =>
        console.log(response.data)
      )

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

  const changePage = (id) => {
    dispatch({
      type: 'BASE'
    })
  }

  const logIn = () => {
    dispatch({
      type: 'OPEN'
    })
  }

  const closedIn = () => {
    dispatch({
      type: 'CLOSED'
    })
  }

  const loggingIn = async (event) => {
    event.preventDefault();

    const name = event.target.username.value;
    const password = event.target.password.value;

    try {

      const token = await loginservice.login({
        name, password,
      });
      const loginuser = users.filter(userb => userb.name == name);
      const user = loginuser[0];
      localStorage.setItem('user', JSON.stringify(user));

      dispatch({
        type: 'NEW_TOKEN',
        payload: token
      })

      dispatch({
        type: 'CLOSED'
      })

    } catch (exception) {
      alert("Wrong username and/or password. Please try again.");
      localStorage.setItem('user', null);
    }

  }

  const logOut = () => {

    dispatch({
      type: 'REMOVE_TOKEN'
    })
    localStorage.setItem('user', null);

  }


  return (

    <div className="mainapp">
      <div className="banner">
        <img className="mediasocial" src={MediaSocial} alt={MediaSocial}></img>
        <div className="log">
          <p>Welcome to the social media for movie, tv and streaming watchers!</p>
          {!tokenHandler[0] &&
            <button className="navbutton logbutton" onClick={() => logIn()}>Log in</button>
          }
          {tokenHandler[0] &&
            <button className="navbutton logoutbutton" onClick={() => logOut()}>Log out</button>
          }
          {JSON.parse(localStorage.getItem('user')) && 
            <p>Logged in as {JSON.parse(localStorage.getItem('user')).name}</p>
          }
        </div>
        <img className="filmlogo" src={Filmreel} alt={Filmreel}></img>
      </div>
      <div className="nav">
        <div className="subnav">
          <div>
          <button className={`navbutton ${pageTurner === 0 ? 'bar' : 'nobar' }` } onClick={() => dispatch({type: 'BASE'})}>Feed</button>
          <button className={`navbutton ${pageTurner === 1 ? 'bar' : 'nobar' }` } onClick={() => dispatch({type: 'TIMELINE'})}>Calendar</button>
          <button className={`navbutton ${pageTurner === 2 ? 'bar' : 'nobar' }` } onClick={() => dispatch({type: 'INTERACTION'})}>Timeline</button>
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
              addComment={addComment} addLike={addLike} addView={addNewView} />
          </div>
        }
        {pageTurner === 2
          && 
          <div className="interaction">
            <Interaction users={users} videos={videos} views={views} messages={messages} likes={likes} 
              addComment={addComment} addLike={addLike} changePage={changePage} />
          </div>
        }
      </div>
      <CSSTransition in={loginWindow} timeout={1000} classNames="fade-slide" unmountOnExit>
        <LoginWindow closedIn={closedIn} loggingIn={loggingIn}/>
      </CSSTransition>
    </div>

  )

};

export default App;
