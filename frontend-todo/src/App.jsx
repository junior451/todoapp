import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate, } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import TodoList from './components/todo-list';
import Login from './components/login';
import AddTodo from './components/add-todo';
import Signup from './components/signup';
import TodoDataService from './services/todo';
import {useNavigate} from "react-router-dom";

function App() {
  const[user, setUser] = React.useState(null);
  const[token, setToken] = React.useState("");
  const[error, setError] = React.useState("");

  function login(user=null){
    localStorage.setItem("token", "")
    TodoDataService.login(user)
      .then(res => {
        setUser(user.username);
        setToken(res.data.token);
        localStorage.setItem('token', res.data.token)
        setError('')
      })
      .catch(error => {
        setError(error.toString());
        console.error("Authentication error: ", error);
      });
  }

  async function logout(){
    setToken("");
    localStorage.setItem('token', "");
  }

  function signup(user = null){
    localStorage.setItem("token", "");
    TodoDataService.signup(user)
      .then(res => {
        setUser(user.username);
        setToken(res.data.token);
        localStorage.setItem('token', res.data.token)
        setError('')
      })
      .catch(error => {
        setError(error.toString());
        console.error("Authentication error: ", error);
      });
  }

  return (
    <div className="App">
      <Navbar bg="primary" variant="dark">
        <div className="container-fluid">
          <Navbar.Brand>TodosApp</Navbar.Brand>
          <Nav className="me-auto">
              <Nav.Link href="/todos">Todos</Nav.Link>
              {user?(
                <Nav.Link href="/logout" onClick={logout}>Logout</Nav.Link>
              ):(
                <>
                  <Nav.Link href="/login">Login {user}</Nav.Link>
                  <Nav.Link href="/signup">SignUp</Nav.Link>
                </>
              )}
          </Nav>
        </div>
      </Navbar>
      
      <div className="container mt-4">
        <Router>
          <Routes>
            <Route exact path="/" element={<TodoList token={localStorage.getItem("token")} />} />
            <Route path="/todos" element={<TodoList token={localStorage.getItem("token")} />}/>
            <Route path="/todos/create" element={<AddTodo token={localStorage.getItem("token")} />}/>
            <Route path="/todos/:id" element={<AddTodo token={localStorage.getItem("token")} />}/>
            <Route exact path="/login" element={<Login login={login}/>} />
            <Route exact path="/logout" element={<Login login={login}/>} />
            <Route path="/signup" element={<Signup signup={signup}/>}/>
          </Routes>
        </Router>
      </div>

    </div>

  );
}

export default App;
