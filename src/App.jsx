import './App.css'
import {HashRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import ProductId from './pages/ProductId'
import Purcharses from './pages/Purcharses'
import Login from './pages/Login'
import AppNavBar from './components/AppNavBar'
import AppLoader from './components/AppLoader'
import { useSelector } from 'react-redux'
import "bootswatch/dist/lux/bootstrap.min.css"
import { useState } from 'react'
import SignUp from './pages/SignUp'
import Footer from './components/Footer'

function App() {
  const isLoading = useSelector(state => state.isLoading)
  const [theme, setTheme] = useState("lux")

  return (
    <div className="App">
      <HashRouter>
        <AppNavBar/>
        {isLoading && <AppLoader/>}
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/product/:id' element={<ProductId/>}/>
          <Route path='/purcharses' element={<Purcharses/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<SignUp/>}/>
        </Routes>
        <Footer/>
      </HashRouter>
    </div>
  )
}

export default App
