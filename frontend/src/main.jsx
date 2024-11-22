import ReactDOM from 'react-dom/client';

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
        order: 1,
        videoid: 2,
        partid: null
    }
]

const messages = [
    {
        id: 1,
        viewid: 1,
        title: "Toinen kerta",
        message: "Edelleen hyvä elokuva!"
    }
]

const likes = [
    {
        id: 1,
        viewid: null,
        messageid: 1,
        type: "like"
    }
]

ReactDOM.createRoot(document.getElementById('root'))
    .render(<App videos={videos} views={views} messages={messages} likes={likes} />);
