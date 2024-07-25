import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import TodoDataService from '../services/todo';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

function AddTodo(props){
  let editing = false;
  let initialTodoTitle = "";
  let initialTodoMemo = "";

  const location = useLocation();

  if(location.state && location.state.currentTodo){
    editing = true
    initialTodoTitle = location.state.currentTodo.title
    initialTodoMemo = location.state.currentTodo.memo
  }

  const[title, setTitle] = useState(initialTodoTitle)
  const[memo, setMemo] = useState(initialTodoMemo);
  const[submitted, setSubmitted] = useState(false)

  const onChangeTitle = event => {
    setTitle(event.target.value);
  }

  const onChangeMemo = event => {
    setMemo(event.target.value);
  }

  const saveTodo = () => {
    var data = {
      title: title,
      memo: memo,
      completed: false
    }

    if(editing){
      TodoDataService.updateTodo(location.state.currentTodo.id, data, props.token)
      .then(response => {
        setSubmitted(true);
      })
      .catch(error => {
        console.log(error);
      })
    }else {
      TodoDataService.createTodo(data, props.token)
      .then(response => {
        setSubmitted(true);
      })
      .catch(error => {
        console.log(error);
      })
    }
  }

  return (
   <Container>
      {submitted ? (
        <div>
          <h4>Todo submitted successfully</h4>
          <Link to={"/todos"}> Back to Todos </Link>
        </div>
      ):(
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>{editing ? "Edit":"Create"}</Form.Label>
          <Form.Control type="text" required placeholder="e.g. Go Shopping" value={title} onChange={onChangeTitle}/>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} value={memo} onChange={onChangeMemo} />
        </Form.Group>
        <Button variant="info" onClick={saveTodo}>{editing ? "Edit":"Add"}</Button>
      </Form>
    )}
   </Container>
  );
}

export default AddTodo;