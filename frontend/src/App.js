import React, {useState, useEffect} from 'react';
import {  BrowserRouter as Router,  Routes,  Route,Link  } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import Login from './components/LoginForma';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Knjiga from './components/NovaKnjiga.js';
import Home from "./components/Home";
import NotFound from './components/NotFound.js';
import Knjige from './components/PrikazTablice.js'
import Logout from "./components/Odjavi.js";
import Container from 'react-bootstrap/Container';


const App = ()=> {
  const padding = { padding: 5, color: '#bdbdbd' };
  return(
    <Router>
      <div>
      <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand href="/">Knjiznica</Navbar.Brand>
              <Nav className="mr-auto">
                <Link style={padding} to="/">Home</Link>
                <Link style={padding} to="/login">Log In</Link>
                <Link style={padding} to="/knjiga">Nova knjiga</Link>
                <Link style={padding} to="/Knjige">Popis svih knjiga</Link>
                <Link style={padding} to="/Logout">Log Out</Link>
              </Nav>
            </Container>
          </Navbar>

        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/Login' element={<Login/>}>
          </Route>
          <Route path='/knjiga' element={<Knjiga/>}>
          </Route>
          <Route path='/Knjige' element={<Knjige/>}>
          </Route>
          <Route path='/Logout' element={<Logout/>}></Route>
          <Route element={<NotFound/>}></Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App;
