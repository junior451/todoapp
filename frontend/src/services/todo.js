import axios from 'axios'

class TodoDataService{
  
  getAll(token){
    axios.defaults.headers.common["Authorization"] = "Token " + token;
    return axios.get('http://localhost:8000/api/todos/');
  }

  createTodo(data, token){
    axios.defaults.headers.common["Authorization"] = "Token " + token;
    return axios.post('http://localhost:8000/api/todos/', data);
  }

  updateTodo(id, data, token){
    axios.defaults.headers.common["Authorization"] = "Token " + token;
    return axios.put('http://localhost:8000/api/todos/${id}', data);
  }

  deleteTodo(id, token){
    axios.defaults.headers.common["Authorization"] = "Token " + token;
    return axios.delete('http://localhost:8000/api/todos/${id}');
  }

  completeTodo(id, token){
    axios.defaults.headers.common["Authorization"] = "Token " + token;
    return axios.get('http://localhost:8000/api/todos/${id}/complete');
  }

  login(user){
    return axios.post('http://localhost:8000/api/login', user);
  }

  signup(user){
    return axios.post('http://localhost:8000/api/signup', user);
  }
}

export default new TodoDataService();