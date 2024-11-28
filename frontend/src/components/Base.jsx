
const Base = (props) => {

    return (
        <div className="nav">
            <h3>Base</h3>
            {props.videos.map(video => 
                <div className="basevideo" key={video.id}>
                    <h4>{video.name}</h4>
                    <p>{video.year}</p>
                    <p>{video.director}</p>
                    <p>{video.actors.map(actor => 
                        <div className="videoactor" key={video.id}>
                            <span>{actor}</span>
                        </div>)}
                    </p>
                    <p>{video.length} min</p>
                </div>
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

export default Base;
