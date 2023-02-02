/* eslint-disable no-undef */
import axios from 'axios'
import React from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { setIsLoading } from '../store/slices/isLoading.slice'
import '../styles/login.css'

const Login = () => {
  const { register, handleSubmit } = useForm()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const submit = (data) => {
    dispatch(setIsLoading(true))
    axios.post('https://e-commerce-api-v2.academlo.tech/api/v1/users/login', data)
      .then(res => {
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('user', res.data.user.firstName + ' ' + res.data.user.lastName)
        navigate('/')
      })
      .catch(error => {
        if (error.response.status === 401) {
          Swal.fire(
            {
              icon: 'error',
              title: 'Oops...',
              text: 'Incorrect credentials',
              confirmButtonColor: '#f85555'
            }
          )
        }
      })
      .finally(() => dispatch(setIsLoading(false)))
  }

  return (
    <Container className='login-container'>
      <div className='login-card'>

        <h4 className='login-title'>Welcome! Enter your email and password to continue</h4>

        <div className='test-data'>
          <h5 className='test-title'>Test data</h5>
          <div className='data-items'>
            <i className='bx bx-envelope' />
            <span>john@gmail.com</span>
          </div>
          <div className='data-items'>
            <i className='bx bx-lock-alt' />
            <span>john1234</span>
          </div>
        </div>

        <Form onSubmit={handleSubmit(submit)}>
          <Form.Group className='mb-3' controlId='formGroupEmail'>
            <Form.Label>Email</Form.Label>
            <Form.Control {...register('email')} type='email' placeholder='Enter email' />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formGroupPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control required {...register('password')} type='password' placeholder='Password' />
          </Form.Group>
          <Button type='submit' style={{ width: '100%' }} variant='danger'>Login</Button>
        </Form>

        <span>Don't have account? <Link to='/signup'>Sign up</Link></span>

      </div>
    </Container>
  )
}

export default Login
