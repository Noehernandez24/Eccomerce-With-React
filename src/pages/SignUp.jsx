import axios from 'axios'
import React from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { setIsLoading } from '../store/slices/isLoading.slice'
import '../styles/login.css'

const SignUp = () => {
  const { register, handleSubmit } = useForm()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const submit = (data) => {
    dispatch(setIsLoading(true))
    axios.post('https://e-commerce-api-v2.academlo.tech/api/v1/users', data)
      .then(() => navigate('/login'))
      .finally(() => dispatch(setIsLoading(false)))
  }

  return (
    <Container className='login-container'>
      <div className='login-card'>
        <h4 className='login-title'>
          Sign up
        </h4>

        <Form onSubmit={handleSubmit(submit)}>

          <Form.Group className='mb-3' controlId='firts-name'>
            <Form.Label>Firts Name</Form.Label>
            <Form.Control {...register('firstName')} type='text' placeholder='Enter your name' />
          </Form.Group>

          <Form.Group className='mb-3' controlId='last-name'>
            <Form.Label>Last Name</Form.Label>
            <Form.Control {...register('lastName')} type='text' placeholder='Enter your last name' />
          </Form.Group>

          <Form.Group className='mb-3' controlId='formGroupEmail'>
            <Form.Label>Email</Form.Label>
            <Form.Control {...register('email')} type='email' placeholder='Enter email' />
          </Form.Group>

          <Form.Group className='mb-3' controlId='formGroupPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control {...register('password')} type='password' placeholder='Password' />
          </Form.Group>

          <Form.Group className='mb-3' controlId='formGroupPhone'>
            <Form.Label>Phone</Form.Label>
            <Form.Control {...register('phone')} type='number' placeholder='Type your phone' />
          </Form.Group>

          <Button type='submit' style={{ width: '100%' }} variant='danger'>
            Sign up
          </Button>
        </Form>

        <span>
          Already have an account? <Link to='/login'>Login</Link>
        </span>
      </div>
    </Container>
  )
}

export default SignUp
