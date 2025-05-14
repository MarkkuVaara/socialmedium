
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const Interaction = (props) => {

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false
    };

    return (
        <div className="nav">
            <h3>Comment timeline</h3>
            <div className="interactionview">
            <Slider {...sliderSettings}>
                {props.messages.map(message =>
                    <>
                    <p className="datep">{message.date.substring(0, 10)}</p>
                    <div className="commentview" key={message.id}>
                        <div className="commenttitle">
                            <h4>{message.title}</h4>
                            <p>{message.date}</p>
                            {props.views.map(view => <>
                                {view.id === message.viewid && 
                                    <div className="viewdata">
                                        <p>{view.date.substring(0, 10)}</p>
                                        {props.videos.map(video => <>
                                            {video.id === view.videoid &&
                                                <p><strong>{video.name}</strong></p>
                                            } 
                                        </>
                                        )}
                                    </div>
                                }
                            </> )}
                        </div>
                        <div className="commentmessagewrap">
                            <div className="commentmessage">
                                <p style={{ whiteSpace: 'pre-wrap' }}
                                    dangerouslySetInnerHTML={{ __html: message.message }} ></p>
                            </div>
                        </div>
                    </div>
                    </>
                )}
            </Slider>
            </div>
        </div>
    )

}

export default Interaction;
