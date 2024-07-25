import {useEffect, useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import TodoDataService from '../services/todo';
import moment from 'moment';

function TodoList(props){
  const [todos, setTodos] = useState([]);
  
  useEffect(() => {
    retriveTodos()
  }, [props.token]);

  const retriveTodos = () => {
    console.log("came here")
    console.log(props)
    TodoDataService.getAll(props.token)
      .then(res => {
        setTodos(res.data)
      });
  }

  const deleteTodo = (todoId) => {
    TodoDataService.deleteTodo(todoId, props.token)
    .catch(e => {
      console.log(e)
    })

    setTodos(
      todos.filter((todo) => {
        return todo.id != todoId
      })
    )
  }

  const completeTodo = (todoId) => {
    TodoDataService.completeTodo(todoId, props.token)
    .then(response => {
      retriveTodos()
    })
    .catch(e => {
      console.log(e)
    })
  }


  return (
    <Container>
      <Link to={"/todos/create"}>
        <Button variant="outline-info" className="mb-3">Add todo</Button>
      </Link>
      {props.token == null || props.token === "" ? (
        <Alert variant='warning'>
          You are not Logged in. Please <Link to={"/login"}>Login</Link> to see your todos
        </Alert>
      ):
      todos.map(todo => {
        return (
          <Card key={todo.id} className="mb-3">
            <Card.Body>
              <div className={`${todo.completed ? "text-decoration-line-through": ""}`}>
                <Card.Title>{todo.title}</Card.Title>
                <Card.Text><b>Memo: </b>{todo.memo}</Card.Text>
                <Card.Text>Date created: {moment(todo.created_at).format("Do MMMM YYYY")}</Card.Text>
              </div>
              <Link to={"/todos/" + todo.id}
                state={{
                  currentTodo: todo
                }}>
                <Button variant="outline-info" className="me-2">Edit</Button>
              </Link>
              <Button variant="outline-danger" onClick={() => deleteTodo(todo.id)} className="me-2">
                Delete
              </Button>
              <Button variant="outline-success" onClick={() => completeTodo(todo.id)}>Complete</Button>
            </Card.Body>
          </Card>
        )
      })}
      
    </Container>
  );
}

export default TodoList;