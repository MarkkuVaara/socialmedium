
const Timeline = (props) => {

    return (
        <div className="nav">
            <h3>Timeline</h3>
            {props.videos.map(video => 
                <p>{video.name}</p>
            )}
            {props.views.map(view => 
                <p>{view.date}</p>
            )}
            {props.messages.map(message => 
                <p>{message.title}</p>
            )}
            {props.likes.map(like => 
                <p>{like.type}</p>
            )}
        </div>
    )

}

export default Timeline;
