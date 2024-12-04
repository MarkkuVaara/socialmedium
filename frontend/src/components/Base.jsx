
const Base = (props) => {

    return (
        <div className="nav">
            <h3>Base</h3>
            {props.views.map(view => 
                <>
                    <p>{view.date}</p>
                    {props.videos.map(video => 
                        <> 
                        {video.id === view.videoid &&
                            <div className="basevideo" key={video.id}>
                                <h4>{video.name}</h4>
                                <p>{video.year}</p>
                                <p>{video.director}</p>
                                <p>{video.actors.map(actor => 
                                    <span className="videoactor" key={video.id}>
                                        <p>{actor}</p>
                                    </span>)}
                                </p>
                                <p>{video.length} min</p>
                            </div>
                        }
                        </>
                    )}
                </>
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
