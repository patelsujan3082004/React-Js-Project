import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Route, Routes } from 'react-router'
import Header from './Header'
import Home from './Home'
import Add from './Add'
import Edit from './Edit'
function App() {


  return (
    <>
      <Router>
        <Header />
          <Routes>
              <Route path='/' element={<Home/>}></Route>
              <Route path='/Add' element={<Add/>}></Route>
              <Route path='/Edit/:id' element={<Edit/>}></Route>
          </Routes>
      </Router>
    </>
  )
}

export default App
