import React, { useState } from 'react';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const NewView = (props) => {

    const [startDate, setStartDate] = useState(props.startTime ? props.startTime : new Date());
    const [videoselected, setVideoselected] = useState(null);

    const handleVideoChange = (e) => {
        const selectedId = parseInt(e.target.value, 10);
        const selectedVideo = props.videos.find(video => video.id === selectedId);
        setVideoselected(selectedVideo);
    };

    return (
        <div>
            <h4>Add new view</h4>
            <form onSubmit={props.sendView}>
                <div className="formfield">
                    <label>Video you watched</label>
                    <select name="title" onChange={handleVideoChange}>
                        <option value="">Select video</option>
                        {props.videos.map(video => 
                            <option key={video.id} value={video.id}>{video.name}</option>
                        )}
                    </select>
                    {videoselected && <>
                        {videoselected.type === "tv" && <>
                            <label>Season</label>
                            <select name="season">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                            </select>
                            <label>Episode</label>
                            <select name="episode">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                            </select>
                        </>} 
                    </>}
                    <label>Date</label>
                    <DatePicker name="date" 
                        selected={startDate} 
                        onChange={(date) => {
                            if (date instanceof Date && !isNaN(date)) {
                              setStartDate(date);
                            }}
                        }
                        showTimeSelect dateFormat="MM/dd/yyyy hh:mm:ss a" timeFormat="hh:mm:ss a"
                        timeIntervals={60} />
                    <button className="sendbutton" type="submit">Add</button>
                    <button className="closebutton" type="button" onClick={props.closeView}>Close</button>
                </div>
            </form>
        </div>
    )
}

export default NewView;
