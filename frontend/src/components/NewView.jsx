import React, { useState } from 'react';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const NewView = (props) => {

    const [startDate, setStartDate] = useState(props.startTime ? props.startTime : Date.now());

    return (
        <div>
            <h4>Add new view</h4>
            <form onSubmit={props.sendView}>
                <div className="formfield">
                    <label>Video you watched</label>
                    <select name="title">
                        {props.videos.map(video => 
                            <option key={video.id} value={video.id}>{video.name}</option>
                        )}
                    </select>
                    <label>Date</label>
                    <DatePicker name="date" selected={startDate} onChange={(date) => setStartDate(date)} />
                    <button className="sendbutton" type="submit">Add</button>
                    <button className="closebutton" type="button" onClick={props.closeView}>Close</button>
                </div>
            </form>
        </div>
    )
}

export default NewView;
