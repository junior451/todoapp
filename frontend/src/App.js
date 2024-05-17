import React from 'react';
import { Routes, Route, Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import AddTodo from './components/add-todo';
import TodoList from './components/todo-list';
import Login from './components/login';
import Signup from './components/signup';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container  from 'react-bootstrap/Navbar';
import TodoDataService from './services/todo';

function App() {
  const[user, setUser] = React.useState(null);
  const[token, setToken] = React.useState(null);
  const[error, setError] = React.useState("");

  async function login(user=null){
    TodoDataService.login(user)
    .then(response => {
      setToken(response.data.token);
      setUser(user.username);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', user.username);
      setError('');
    })
    .catch(e =>{
      console.log("error");
      console.log('login', e);
      setError(e.toString());
    });
    console.log(error)
  }

  async function logout(){
    setUser(user)
  }

  async function signup(user = null){
    setUser(user)
  }

  return (
    <div className="App">
      <Navbar bg="primary" variant="dark">
        <div className="container-fluid">
          <Navbar.Brand>TodosApp</Navbar.Brand>
          <Nav className="me-auto">
            <Container>
              <Link class="nav-link" to={"/todos"}>Todos</Link>
              {user?(
                <Link class="nav-link">Logout({user})</Link>
              ):(
                <>
                  <Link class="nav-link" to={"/login"}>Login</Link>
                  <Link class="nav-link" to={"/signup"}>Sign Up</Link>
                </>
              )}
            </Container>
          </Nav>
        </div>
      </Navbar>
      
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<TodoList token={token} />}/>
          <Route path="/todos" element={<TodoList token={token} />}/>
          <Route path="/todos/create" element={<AddTodo token={token} />}/>
          <Route path="/todos/:id" element={<AddTodo token={token} />}/>
          <Route path="/login" element={<Login login={login} />}/>
          <Route path="/signup" element={<Signup signup={signup} />}/>
        </Routes>
      </div>

    </div>

  );
}

export default App;
