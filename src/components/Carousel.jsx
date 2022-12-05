import Carousel from "react-bootstrap/Carousel";
import jacket from "../images/denim_jacket.png";
import tshirt from "../images/tshirt.png";
import pants from "../images/pants.png";
import shirt from "../images/pants2.png";
import "../styles/Carousel.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

function ProductCarousel(args) {
  function handleClick(event, argID) {
    args.updateFunction(event.target.src, argID);
  }

  return (
    <Container>
      <Row className="justify-content-md-center">
        {/* <Col md={{ span: 3, offset: 3 }}> */}
        <Carousel
          className="carousel-inner"
          slide={false}
          controls={true}
          prevLabel={"Previous"}
          style={{ color: "black" }}
        >
          <Carousel.Item className="item">
            <img
              className="img-thumbnail"
              id="one"
              src={jacket}
              alt="First slide"
              style={{ width: 550 }}
              onClick={(e) => {
                handleClick(e, 2);
              }}
            />

            <Carousel.Caption></Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item className="item">
            <img
              id="two"
              src={tshirt}
              alt="Second slide"
              style={{ width: 550 }}
              onClick={(e) => {
                handleClick(e, 2);
              }}
            />
            <Carousel.Caption></Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item className="item">
            <img
              id="three"
              src={pants}
              alt="Third slide"
              style={{ width: 550 }}
              onClick={(e) => {
                handleClick(e, 2);
              }}
            />
            <Carousel.Caption></Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item className="item">
            <img
              id="four"
              src={shirt}
              alt="Third slide"
              style={{ width: 550 }}
              onClick={(e) => {
                handleClick(e, 2);
              }}
            />
            <Carousel.Caption></Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        {/* </Col> */}
      </Row>
    </Container>
  );
}

export default ProductCarousel;
