import React, { Component } from 'react';
import api from '../../services/services';
import { Redirect, Link } from 'react-router-dom';
import { Modal, Button, Jumbotron } from 'react-bootstrap';
import './delete.css';
// import styles from '../container.module.css';

export default class DeletarCurso extends Component {
  constructor(props) {
    super(props);

    this.state = {
      curso: {},
      isAdmin: false,
      redirect: false,
    };
  }

  componentDidMount() {
    this.loadAdmin();
    this.loadCursos();
  }

  loadAdmin = async () => {
    try {
      const response = await api.get('/me', {
        headers: { token: window.localStorage.getItem('token') }
      });
      const { status } = response;
      if (status === 200) {
        this.setState({ isAdmin: true });
        console.log('ok');
      }
    } catch{
      console.log('n ok');
      this.setState({ redirect: true });
    }
  }

  async loadCursos() {
    const { id } = this.props.match.params;
    const response = await api.get(`/cursos/${id}`);
    this.setState({ curso: response.data });
  }

  render() {
    const { curso, redirect } = this.state;
    if (redirect) {
      return <Redirect to='/' />;
    } else {
      return (
        <Jumbotron styles={{ fontFamily: "Roboto" }}>
          <Modal.Dialog>
            <Modal.Header >
              <Modal.Title>Deletar curso</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <p>Tem certeza que deseja <span style={{ color: "red" }}>deletar</span> ? </p>
            </Modal.Body>

            <Modal.Footer>
              <Button className="btn" variant="secondary">
                <Link id="link" to={`/cursosadmin/${curso._id}`}>Voltar</Link>
              </Button>
              <Button className="btn" variant="danger" onClick={this.handleClick}>Deletar</Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Jumbotron>
      )
    }
  }

  handleClick = (e) => {
    const { id } = this.props.match.params;
    console.log(id);
    fetch(`http://localhost:3001/sistema/cursos/${id}`, {
      method: "delete",
    })
      .then(data => {
        if (data.ok) {
          this.setState({ redirect: true });
        }
      })

    e.preventDefault();
  }

}


