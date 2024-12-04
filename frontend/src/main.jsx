import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store';

import App from './App';
import './index.css';

const videos = [
    {
        id: 1,
        name: "Gladiator",
        type: "movie",
        director: "Ridley Scott",
        actors: ["Russell Crowe", "Joaquin Phoenix", "Connie Nielsen"],
        year: 2000,
        length: 130
    },
    {
        id: 2,
        name: "Star Wars",
        type: "movie",
        director: "George Lucas",
        actors: ["Mark Hamill", "Carrie Fisher", "Harrison Ford"],
        year: 1977,
        length: 120
    },
    {
        id: 3,
        name: "Breaking Bad",
        type: "tv",
        director: "Various",
        actors: ["Bryan Cranston"]
    }
]

const views = [
    {
        id: 1,
        date: "21112024",
        videoid: 2,
        userid: 1,
        partid: null
    },
    {
        id: 2,
        date: "28112024",
        videoid: 1,
        userid: 1,
        partid: null
    },
    {
        id: 3,
        date: "30112024",
        videoid: 3,
        userid: 1,
        partid: 19
    }
]

const messages = [
    {
        id: 1,
        viewid: 1,
        title: "Toinen kerta",
        message: "Edelleen hyvä elokuva!"
    },
    {
        id: 2,
        viewid: 2,
        title: "Ensimmäinen katselu",
        message: "Russell Crowe on paras!"
    }
]

const likes = [
    {
        id: 1,
        viewid: 1,
        messageid: 1,
        type: "like"
    }
]

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
      <App videos={videos} views={views} messages={messages} likes={likes} />
    </Provider>
);
