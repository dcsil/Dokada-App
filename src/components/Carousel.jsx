import Carousel from "react-bootstrap/Carousel";
import jacket from "../images/denim_jacket.png";
import tshirt from "../images/tshirt.png";
import pants from "../images/pants.png";
import shirt from "../images/pants2.png";

function Carousel_() {
  return (
    <Carousel>
      <Carousel.Item style={{ width: 500, height: 600 }}>
        <img className="d-block w-100" src={jacket} alt="First slide" />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>jacket</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item style={{ width: 500, height: 600 }}>
        <img className="d-block w-100" src={tshirt} alt="Second slide" />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Tshirt</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item style={{ width: 500, height: 600 }}>
        <img className="d-block w-100" src={pants} alt="Third slide" />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>Pants</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item style={{ width: 500, height: 600 }}>
        <img className="d-block w-100" src={shirt} alt="Third slide" />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>Tshirt</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Carousel_;
