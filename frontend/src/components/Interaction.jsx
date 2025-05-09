
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
                <div>
                {props.messages.map(message =>
                    <div className="messagetop" key={message.id}>{message.title}</div>
                )}
                </div>
                <div>
                {props.messages.map(message =>
                    <div className="messagetop" key={message.id}>{message.message}</div>
                )}
                </div>
            </Slider>
            </div>
        </div>
    )

}

export default Interaction;
