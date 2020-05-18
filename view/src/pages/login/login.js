import React, { useState } from 'react';
import api from '../../services/services';
import { Container, Form, Input } from './styles';
import { Button } from 'react-bootstrap';
import { HeaderUser } from '../../components/header/header';

import './login.css';

export default function Login({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await api.post('/login', {
        email,
        password
      });
      window.localStorage.setItem('token', response.data.token);
      history.push('/');
    } catch (err) {
      alert('Sua senha ou nome da conta está incorreto.');
      setPassword('');
    }
  }

  return (
    <>
      <HeaderUser />
      <Container>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Email"
            value={email}
            onChange={e => { setEmail(e.target.value); console.log(email) }}
          />
          <Input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button id="button-login" variant="secondary" type="submit">
            Entrar
          </Button>
        </Form>
      </Container>
    </>
  );
}