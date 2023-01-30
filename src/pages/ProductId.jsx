import axios from "axios";
import React, { useEffect, useState } from "react";
import { Breadcrumb, Button, ButtonGroup, Card, Carousel, Col, Container, Row, Stack } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setIsLoading } from "../store/slices/isLoading.slice";
import { filterProductsThunk } from "../store/slices/products.slice";


const ProductId = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const [counter, setCounter] = useState(1)
  const dispatch = useDispatch()
  const similarItems = useSelector(state => state.products)
  const filterSimilarItems = similarItems.filter(item => item.id !== Number(id))


  useEffect(() => {
    dispatch(setIsLoading(true))
    axios
      .get(`https://e-commerce-api-v2.academlo.tech/api/v1/products/${id}`)
      .then((res) => {
        setProduct(res.data)
        dispatch(filterProductsThunk(res.data.category.id))
      })
      .finally(() => dispatch(setIsLoading(false)))
  }, [id]);

  const windowTopAndNavigate = (id) =>{
    navigate(`/product/${id}`)
    window.scrollTo(0, 0)
  }

  


  // console.log(product);
  return (
    <Container className="product-detail">
      {/* BreadCumb */}
      <Breadcrumb>
        <Breadcrumb.Item onClick={() => navigate("/")}>Home</Breadcrumb.Item>
        <Breadcrumb.Item active>{product.title}</Breadcrumb.Item>
      </Breadcrumb>

      {/* Card Detail Grid */}

      <Container className="section-detail">
        <Row>
          {/* SLIDER */}
          <Col sm={12} lg={6}>
            <Carousel variant="dark">
              <Carousel.Item>
                <img
                  className="d-block w-100 image-slider"
                  src={product.images?.[0].url}
                  alt="First slide"
                />
              </Carousel.Item>

              <Carousel.Item>
                <img
                  className="d-block w-100 image-slider"
                  src={product.images?.[1].url}
                  alt="Second slide"
                />
              </Carousel.Item>

              <Carousel.Item>
                <img
                  className="d-block w-100 image-slider"
                  src={product.images?.[2].url}
                  alt="Third slide"
                />
              </Carousel.Item>
            </Carousel>
          </Col>
          {/* CARD-DESCRIPTION */}
          <Col>
            <div className="card-description-container">
              <p className="subtitle">{product.brand}</p>
              <h3 className="card-des-title">{product.title}</h3>
              <p className="description">{product.description}</p>

              <div className="product-value">
                <div className="product-item">
                  <span className="subtitle">Price</span>
                  <h4 className="price">${product.price}</h4>
                </div>

                <div className="product-item">
                  <span className="subtitle">Quantity</span>
                  <div className="btn-container">
                    <button
                      onClick={() =>
                        setCounter(counter > 0 ? counter - 1 : counter)
                      }
                      className="btn-counter"
                    >
                      -
                    </button>
                    <span className="counter">{counter}</span>
                    <button
                      onClick={() => setCounter(counter + 1)}
                      className="btn-counter"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <button className="btn-end">Add to cart</button>
            </div>
          </Col>
        </Row>
      </Container>

      <h5 className="title-similar">Discover similar items</h5>

      <Row xs={1} md={2} lg={1} xl={3} className="g-4 card-product">
        {filterSimilarItems.map((product) => (
          <Col key={product.id}>
            <Card
              onClick={() => windowTopAndNavigate(product.id)}
              className="center-card-flex"
            >
              <Card.Img variant="top" src={product.images[0].url} />
              <Card.Body>
                <Stack gap={2}>
                  <Card.Subtitle className="mb-2 text-muted">
                    {product.brand}
                  </Card.Subtitle>
                  <Card.Title>{product.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Price
                  </Card.Subtitle>
                </Stack>
                <Card.Title className="card-price">${product.price}</Card.Title>
                <Button size="sm" className="btn-shop" variant="success">
                  <i className="bx bx-cart-alt bx-sm"></i>
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductId;
