import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css' //install bootstrap
import {BrowserRouter, Routes, Route} from 'react-router-dom' // install react-router-dom
import Employee from './Employee'
import AddEmployee from './AddEmployee'
import ShowEmployee from './ShowEmployee'
import Invoice from './Invoice'


function App() {

  return (
    <div className='App'>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Employee/>}></Route>
            <Route path='/invoice/:id' element={<Invoice/>}></Route>
            <Route path='/add-employee' element={<AddEmployee/>}></Route>
            <Route path='/show/:id' element={<ShowEmployee/>}></Route>
          </Routes>
        </BrowserRouter>
    </div>
  )
};

export default App

