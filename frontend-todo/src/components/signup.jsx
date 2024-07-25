import { useState} from 'react';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import {useNavigate} from "react-router-dom";

const Signup = props => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault();
    props.signup({username:username, password:password});
    navigate("/")
  };

  return (
    <Container>
      <Form>
        <div className="mb-3">
          <Form.Group >
            <Form.Label>Username
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </Form.Label>
          </Form.Group>
          <Form.Group>
            <Form.Label>Password
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
            </Form.Label>
          </Form.Group>
          <Button variant="primary" onClick={handleSubmit}>
            Signup
          </Button>
        </div>
        
      </Form>
    </Container>
  );
}

export default Signup;