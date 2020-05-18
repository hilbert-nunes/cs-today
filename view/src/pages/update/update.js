import React, { Component } from 'react';
import api from '../../services/services';
import { Redirect, Link } from 'react-router-dom';
import { Form, Row, Col, Button, Jumbotron, Card } from 'react-bootstrap';
import './update.css';
import styles from '../container.module.css';

class EditarCurso extends Component {
  constructor(props) {
    super(props);

    this.state = {
      curso: {
        nome: "",
        description: "",
        mainInfo: "",
        psInfo: "",
        occupationArea: "",
        mediaSal: {
          intern: 0,
          traineer: 0,
          junior: 0,
          pleno: 0,
          senior: 0,
          master: 0
        },
      },
      redirect: false,
    }
  }

  componentDidMount() {
    this.loadAdmin();
    this.loadCurso()
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

  async loadCurso() {
    const { id } = this.props.match.params;
    const response = await api.get(`/cursos/${id}`);
    this.setState({ curso: response.data });
  }

  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to={`/`} />
    } else {
      return (
        <div className={`${styles.container}`}>
          <Jumbotron style={{ fontFamily: "Roboto,Georgia" }}>
            <Form onSubmit={this.handleSubmit}>
              <legend>Editar Curso</legend>
              <Form.Group htmlFor="nome" controlId="nome">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  name="nome"
                  minLength="3"
                  maxLength="100"
                  required
                  value={this.state.curso.nome}
                  onChange={this.handleInputChange}
                  placeholder="Insira seu Nome" />
              </Form.Group>

              <Form.Group htmlFor="description" controlId="description">
                <Form.Label>Descrição</Form.Label>
                <Form.Control
                  as="textarea" rows="3"
                  id="description"
                  name="description"
                  minLength="3"
                  maxLength="1000"
                  required
                  value={this.state.curso.description}
                  onChange={this.handleInputChange}
                  placeholder="Insira uma Descrição" />
              </Form.Group>

              <Row>
                <Col>
                  <Form.Label htmlFor="mainInfo" >Informações gerais</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows="3"
                    id="mainInfo"
                    name="mainInfo"
                    placeholder=""
                    minLength="1"
                    maxLength="10000"
                    required
                    value={this.state.curso.mainInfo}
                    onChange={this.handleInputChange} />
                </Col>
                <Col>
                  <Form.Label htmlFor="occupationArea" >Área Ocupacional</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows="3"
                    id="occupationArea"
                    name="occupationArea"
                    placeholder=""
                    minLength="1"
                    maxLength="10000"
                    required
                    value={this.state.curso.occupationArea}
                    onChange={this.handleInputChange} />
                </Col>
              </Row>

              <Form.Group htmlFor="psInfo" controlId="psInfo">
                <Form.Label>Outras Informações</Form.Label>
                <Form.Control
                  as="textarea" rows="3"
                  id="psInfo"
                  name="psInfo"
                  minLength="3"
                  maxLength="1000"
                  required
                  value={this.state.curso.psInfo}
                  onChange={this.handleInputChange}
                  placeholder="" />
              </Form.Group>

              <div className="media-salarial-card d-flex flex-row bd-highlight mb-3 flex-wrap">
                <Card className="card  shadow-sm  bg-white rounded " style={{ maxWidth: "150px" }}>
                  <Card.Body>
                    <Card.Title>Estagiário</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">0 a 2 anos</Card.Subtitle>
                    <Card.Text>
                      <label htmlFor="intern" controlId="intern" className="input-group input-group-sm mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text">R$</span>
                        </div>
                        <input
                          id="intern"
                          name="intern"
                          minLength="1"
                          maxLength="9999999"
                          required
                          value={this.state.curso.mediaSal.intern}
                          onInput={this.handleInputChangeSalary}
                          type="text" className="input-salario form-control" aria-label="Amount (to the nearest dollar)" />
                      </label>
                    </Card.Text>
                  </Card.Body>
                </Card>

                <Card className="card shadow-sm  bg-white rounded" style={{ maxWidth: "150px" }}>
                  <Card.Body>
                    <Card.Title>Traineer</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">0 a 2 anos	</Card.Subtitle>
                    <Card.Text>
                      <label htmlFor="traineer" controlId="traineer" className="input-group input-group-sm mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text">R$</span>
                        </div>
                        <input
                          id="traineer"
                          name="traineer"
                          minLength="1"
                          maxLength="999999"
                          required
                          value={this.state.curso.mediaSal.traineer}
                          onChange={this.handleInputChangeSalary}
                          type="text" className="input-salario form-control" aria-label="Amount (to the nearest dollar)" />
                      </label>
                    </Card.Text>
                  </Card.Body>
                </Card>

                <Card className="card shadow-sm  bg-white rounded" style={{ maxWidth: "150px" }}>
                  <Card.Body>
                    <Card.Title>Júnior</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">até 5 anos	</Card.Subtitle>
                    <Card.Text>
                      <label htmlFor="junior" controlId="junior" className="input-group input-group-sm mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text">R$</span>
                        </div>
                        <input
                          id="junior"
                          name="junior"
                          minLength="1"
                          maxLength="999999"
                          required
                          value={this.state.curso.mediaSal.junior}
                          onChange={this.handleInputChangeSalary}
                          type="text" className="input-salario form-control" aria-label="Amount (to the nearest dollar)" />
                      </label>
                    </Card.Text>
                  </Card.Body>
                </Card>

                <Card className="card shadow-sm  bg-white rounded" style={{ maxWidth: "150px" }}>
                  <Card.Body>
                    <Card.Title>Pleno</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">6 a 9 anos</Card.Subtitle>
                    <Card.Text>
                      <label htmlFor="pleno" controlId="pleno" className="input-group input-group-sm mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text">R$</span>
                        </div>
                        <input
                          id="pleno"
                          name="pleno"
                          minLength="1"
                          maxLength="999999"
                          required
                          value={this.state.curso.mediaSal.pleno}
                          onChange={this.handleInputChangeSalary}
                          type="text" className="input-salario form-control" aria-label="Amount (to the nearest dollar)" />
                      </label>
                    </Card.Text>
                  </Card.Body>
                </Card>

                <Card className="card shadow-sm  bg-white rounded" style={{ maxWidth: "150px" }}>
                  <Card.Body>
                    <Card.Title>Sênior</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">a partir de 10 anos</Card.Subtitle>
                    <Card.Text>
                      <label htmlFor="senior" controlId="senior" className="input-group input-group-sm mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text">R$</span>
                        </div>
                        <input
                          id="senior"
                          name="senior"
                          minLength="1"
                          maxLength="999999"
                          required
                          value={this.state.curso.mediaSal.senior}
                          onChange={this.handleInputChangeSalary}
                          type="text" className="input-salario form-control" aria-label="Amount (to the nearest dollar)" />
                      </label>
                    </Card.Text>
                  </Card.Body>
                </Card>

                <Card className="card shadow-sm  bg-white rounded" style={{ maxWidth: "150px" }}>
                  <Card.Body>
                    <Card.Title>Master</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">15 anos ou mais</Card.Subtitle>
                    <Card.Text>
                      <label htmlFor="master" controlId="master" className="input-group input-group-sm mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text">R$</span>
                        </div>
                        <input
                          id="master"
                          name="master"
                          minLength="1"
                          maxLength="999999"
                          required
                          value={this.state.curso.mediaSal.master}
                          onChange={this.handleInputChangeSalary}
                          type="text" className="input-salario form-control" aria-label="Amount (to the nearest dollar)" />
                      </label>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>

              <Form.Group as={Row}>
                <Col sm={{ span: 10 }}>
                  <Button variant="secondary" className="btn" style={{ transition: "all 0.5s", color: "#333", fontSize: "1.2em" }} type="submit">Editar</Button>
                  <Button variant="secondary" type="submit">
                    <Link to={`/cursosadmin/${this.props.match.params.id}`} >Voltar</Link>
                  </Button>
                </Col>
              </Form.Group>

            </Form>
          </Jumbotron>
        </div>
      )
    }
  }

  handleInputChange = event => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState(prevState => ({
      curso: { ...prevState.curso, [name]: value }
    }));

    console.log(this.state)
  }

  handleInputChangeSalary = event => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState(prevState => {
      const curso = {
        ...prevState.curso
      };
      curso.mediaSal[name] = value;
      return { curso }
    })
  }


  handleSubmit = event => {
    const { id } = this.props.match.params;

    fetch(`http://localhost:3001/sistema/cursos/${id}`, {
      method: 'put',
      id: id,
      body: JSON.stringify(this.state.curso),
      headers: { 'Content-Type': 'application/json' }
    })

      .then(data => {
        if (data.ok) {
          this.setState({ redirect: true });
        }
      })

    event.preventDefault();
  }

}

export default EditarCurso;