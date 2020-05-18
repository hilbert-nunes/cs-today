import React, { Component } from 'react';
import api from '../../services/services';
import { Link } from 'react-router-dom';
import './index.css';
import { Button, Form, Row, Col } from 'react-bootstrap';
import styles from '../container.module.css';
import { HeaderUser, HeaderAdmin } from '../../components/header/header';

export default class Cursos extends Component {
  state = {
    cursos: [],
    cursosInfo: {},
    page: 1,
    isAdmin: false,
    admin: ''
  };

  componentDidMount() {
    this.loadCursos();
    this.loadAdmin();
  }

  loadCursos = async (page = 1) => {
    const response = await api.get(`/cursos?page=${page}`);
    const { docs, ...cursosInfo } = response.data;
    this.setState({ cursos: docs, cursosInfo, page });
  }

  loadAdmin = async () => {
    const response = await api.get('/me', {
      headers: { token: window.localStorage.getItem('token') }
    });
    const { status } = response;
    if (status === 200) {
      this.setState({ isAdmin: true, admin: 'admin' });
    }
  }

  prevPage = () => {
    const { page } = this.state;
    if (page === 1) return;

    const pageNumber = page - 1;
    this.loadCursos(pageNumber);
  }

  nextPage = () => {
    const { page, cursosInfo } = this.state;
    if (page === cursosInfo.pages) return;

    const pageNumber = page + 1;
    this.loadCursos(pageNumber);
  }

  render() {
    const { cursos, cursosInfo, page, isAdmin, admin } = this.state;
    function Header() {
      if (isAdmin) {
        return <HeaderAdmin />
      }
      return <HeaderUser />
    }
    console.log(admin, isAdmin);

    return (
      <>
        <Header />
        <div className={`${styles.container}`}>
          <div className="curso-list">
            {cursos.map(curso => (
              <article className="curso-item" key={curso._id} >
                <strong>{curso.nome}</strong>
                <p>{curso.description}</p>
                <p><Link to={`/cursos${admin}/${curso._id}`}>Acessar</Link></p>
              </article>
            ))}

            <Form.Group as={Row}>
              <Col className="d-flex justify-content-between" >
                <Button disabled={page === 1} style={{ background: "#9450f4", color: "#333" }} className="btn" onClick={this.prevPage} >Voltar</Button>
                <Button disabled={page === cursosInfo.pages} style={{ background: "#9450f4", color: "#333" }} onClick={this.nextPage}>
                  Próxima
              </Button>
              </Col>
            </Form.Group>
          </div>
        </div>
      </>
    )
  }
}