import axios from 'axios'

class TodoDataService{
  
  getAll(token){
    return axios.get('http://127.0.0.1:8000/api/todos/',{ headers: {'Authorization': 'Token ' + token }})
  }

  createTodo(data, token){
    return axios.post('http://localhost:8000/api/todos/', data, { headers: {'Authorization': 'Token ' + token }});
  }

  updateTodo(id, data, token){
    return axios.put(`http://localhost:8000/api/todos/${id}`, data, { headers: {'Authorization': 'Token ' + token }});
  }

  deleteTodo(id, token){
    return axios.delete(`http://localhost:8000/api/todos/${id}`, { headers: {'Authorization': 'Token ' + token }});
  }

  completeTodo(id, token){
    axios.defaults.headers.common['Authorization'] = `Token ${token}` 
    return axios.put(`http://localhost:8000/api/todos/${id}/complete`);
  }

  login(user){
    return axios.post('http://localhost:8000/api/login/', { username:user.username, password:user.password })
  }

  signup(user){
    return axios.post('http://localhost:8000/api/signup/', { username:user.username, password:user.password });
  }
}

export default new TodoDataService();