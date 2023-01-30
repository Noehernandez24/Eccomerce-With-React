import React from "react";
import { Breadcrumb, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../styles/purcharses.css";

const Purcharses = () => {
    const navigate = useNavigate()
  return (
    <Container className="purcharses">
      <Breadcrumb>
        <Breadcrumb.Item onClick={() => navigate("/")}>Home</Breadcrumb.Item>
        <Breadcrumb.Item active>Purcharses</Breadcrumb.Item>
      </Breadcrumb>
      
      <h3 className="purcharses__title">My purcharses</h3>

      <div className="purcharses___container">
        <div className="purcharses__card">
            <img src="https://e-commerce-api-v2.academlo.tech/uploads/c.jpg" alt="" className="purcharses__img" />
            <span className="purcharses__name">Samsumg Galaxy S22</span>
            <span className="purcharses__date">29/1/2023</span>
            <h5 className="purcharses__quantity">1</h5>
            <p className="purcharses__total">$850</p>
        </div>

        

      </div>
    </Container>
  );
};

export default Purcharses;
