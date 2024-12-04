
const Base = (props) => {

    return (
        <div className="nav">
            <h3>Base</h3>
            {props.views.map(view => 
                <div className="baseview" key={view.id}>
                    <p className="basedate">{view.date}</p>
                    {props.videos.map(video => 
                        <> 
                        {video.id === view.videoid &&
                            <>
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
                            <div className="basebottom"></div>
                            </>
                        }
                        </>
                    )}
                    {props.messages.map(message => 
                        <>
                        {message.viewid === view.id &&
                            <div className="basemessage">
                                <h4>{message.title}</h4>
                                <p>{message.message}</p>
                            </div>
                        }
                        </>
                    )}
                    {props.likes.map(like => 
                        <>
                        {like.viewid === view.id &&
                            <>
                                <p>{like.type}</p>
                            </>
                        }
                        </>
                    )}
                </div>
            )}
        </div>
    )

}

export default Base;
