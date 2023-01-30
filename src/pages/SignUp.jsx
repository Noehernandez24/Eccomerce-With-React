import React from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/login.css"

const SignUp = () => {
  return (
    <Container className="login-container">
      <div className="login-card">
        <h4 className="login-title">
          Sign up
        </h4>


        <Form>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="firts-name">
            <Form.Label>Firts Name</Form.Label>
            <Form.Control type="text" placeholder="Enter your name" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="last-name">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" placeholder="Enter your last name" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>

          <Button style={{ width: "100%" }} variant="danger">
           Sign up
          </Button>
        </Form>

        <span>
          Already have an account? <Link to="/login">Login</Link>
        </span>
      </div>
    </Container>
  );
};

export default SignUp;
