import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store';

import App from './App';
import './index.css';

const users = [
    {
        id: 1,
        name: "Markku Vaara",
        number: "000000"
    },
    {
        id: 2,
        name: "Seppo Kassinen",
        number: "999999"
    }
]

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
    },
    {
        id: 4,
        name: "Deadpool & Wolverine",
        type: "movie",
        director: "Sean Lewy",
        actors: ["Ryan Reynolds", "Hugh Jackman"],
        year: 2024,
        length: 135
    },
    {
        id: 5,
        name: "Nosferatu",
        type: "movie",
        director: "Robert Eggers",
        actors: ["Nicholas Hoult", "Lily Rose-Depp", "Bill Skarsgard"],
        year: 2024,
        length: 135
    },
    {
        id: 6,
        name: "The Substance",
        type: "movie",
        director: "Nicol Farbege",
        actors: ["Demi Moore"],
        year: 2024,
        length: 145
    },
    {
        id: 7,
        name: "The Batman",
        type: "movie",
        director: "Matt Reeves",
        actors: ["Robert Pattinson"],
        year: 2022,
        length: 180
    }
]

const views = [
    {
        id: 1,
        date: "11/21/2024 9:00:00 PM",
        videoid: 2,
        userid: 1,
        partid: null
    },
    {
        id: 2,
        date: "11/28/2024 8:12:00 PM",
        videoid: 1,
        userid: 1,
        partid: null
    },
    {
        id: 3,
        date: "11/30/2024 6:18:00 PM",
        videoid: 3,
        userid: 1,
        partid: 19
    }
]

const messages = [
    {
        id: 1,
        viewid: 1,
        userid: 1,
        title: "Toinen kerta",
        message: "Edelleen hyvä elokuva!",
        date: "11/21/2024 11:00:00 PM"
    },
    {
        id: 2,
        viewid: 2,
        userid: 1,
        title: "Ensimmäinen katselu",
        message: "Russell Crowe on paras!",
        date: "11/28/2024 11:02:00 PM"
    },
    {
        id: 3,
        viewid: 2,
        userid: 2,
        title: "Vs: Ensimmäinen katselu",
        message: "Joaquin Phoenix on kans aika hyvä, itse asiassa kaikki näyttelijät ovat hyviä..",
        date: "11/30/2024 8:18:00 AM"
    },
    {
        id: 4,
        viewid: 2,
        userid: 1,
        title: "Vs: Ensimmäinen katselu",
        message: "Se Sons of Anarchy tyyppikin on tässä",
        date: "11/30/2024 8:30:00 AM"
    },
    {
        id: 5,
        viewid: 1,
        userid: 2,
        title: "Vs: Toinen kerta",
        message: "On kyllä vähän liian hidas elokuva. Ja miksi tässä on typeriä Jawoja? Imperiumin orjiksi tuommoiset!",
        date: "11/22/2024 3:00:00 PM"
    },
    {
        id: 6,
        viewid: 3,
        userid: 1,
        title: "Parhaat repliikit?",
        message: "Walter: 'I am the one who knocks!'",
        date: "12/1/2024 9:00:00 PM"
    }
]

const likes = [
    {
        id: 1,
        messageid: 1,
        type: "like",
        amount: 3
    },
    {
        id: 2,
        messageid: 1,
        type: "love",
        amount: 1
    },
    {
        id: 3,
        messageid: 1,
        type: "unlike",
        amount: 0
    },
    {
        id: 4,
        messageid: 2,
        type: "like",
        amount: 1
    },
    {
        id: 5,
        messageid: 2,
        type: "love",
        amount: 2
    },
    {
        id: 6,
        messageid: 2,
        type: "unlike",
        amount: 0
    },
    {
        id: 7,
        messageid: 3,
        type: "like",
        amount: 1
    },
    {
        id: 8,
        messageid: 3,
        type: "love",
        amount: 0
    },
    {
        id: 9,
        messageid: 3,
        type: "unlike",
        amount: 0
    },
    {
        id: 10,
        messageid: 4,
        type: "like",
        amount: 1
    },
    {
        id: 11,
        messageid: 4,
        type: "love",
        amount: 0
    },
    {
        id: 12,
        messageid: 4,
        type: "unlike",
        amount: 0
    },
    {
        id: 13,
        messageid: 5,
        type: "like",
        amount: 0
    },
    {
        id: 14,
        messageid: 5,
        type: "love",
        amount: 0
    },
    {
        id: 15,
        messageid: 5,
        type: "unlike",
        amount: 3
    },
    {
        id: 16,
        messageid: 6,
        type: "like",
        amount: 0
    },
    {
        id: 17,
        messageid: 6,
        type: "love",
        amount: 1
    },
    {
        id: 18,
        messageid: 6,
        type: "unlike",
        amount: 0
    }
]

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
      <App users={users} videos={videos} views={views} messages={messages} likes={likes} />
    </Provider>
);
