import React from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link} from 'react-router-dom';
import "../styles/login.css"


const Login = () => {
  const {register, handleSubmit} = useForm();

  const login = (data) =>{
    console.log(data);
  }

    return (
      <Container className="login-container">
        <div className="login-card">

        <h4 className='login-title'>Welcome! Enter your email and password to continue</h4>

        <div className="test-data">
            <h5 className="test-title">Test data</h5>
          <div className="data-items">
            <i className='bx bx-envelope'></i>
            <span>john@gmail.com</span>
          </div>
          <div className="data-items">
            <i className='bx bx-lock-alt' ></i>
            <span>john1234</span>
          </div>
        </div>

        <Form onSubmit={handleSubmit(login)}>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control {...register("email")} type="email" placeholder="Enter email" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control required {...register("password")} type="password" placeholder="Password" />
          </Form.Group>
          <Button type='submit' style={{width: "100%"}} variant="danger">Login</Button>
        </Form>

        <span>Don't have account? <Link to="/signup">Sign up</Link></span>

        </div>
      </Container>
    );
};

export default Login;