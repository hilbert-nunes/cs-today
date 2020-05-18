import React, { Component } from 'react';
import api from '../../services/services';
import { Link, Redirect } from 'react-router-dom';
import styles from '../container.module.css';
import './details.css';
import Icon from '@mdi/react';
import { mdiAlertCircleOutline } from '@mdi/js';
import { Button, Table, Modal, Card, Jumbotron } from 'react-bootstrap';
import { HeaderUser } from '../../components/header/header';

export default class Cursos extends Component {
  state = {
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

      }
    },
    show: false,
    isAdmin: false,
    redirect: false,
  }

  componentDidMount() {
    this.loadAdmin();
    this.loadCurso();
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
    const { curso, redirect, isAdmin } = this.state;
    if (redirect) {
      return <Redirect to={`/`} />
    } else {
      return (
        <>
          <HeaderUser />
          <div className={`${styles.container}`}>
            <div className="curso-info">
              <h1 id="details-nome">{curso.nome}</h1>
              <h2 id="descricao">{curso.description}</h2>

              <div id="section-container">
                <div id="main-info-container">
                  <p id="main-info">{curso.mainInfo}</p></div>
              </div>

              <div id="occupation-container">
                <h3>Área de atuação</h3>
                <p id="occupation-Info">{curso.occupationArea}</p>
              </div>

              <Jumbotron>
                <div id="media-salarial" className="d-flex align-items-center flex-row bd-highlight mb-3">
                  <h2 id="h2-info-modal" className="p-2 bd-highlight align-self-end">Média Salarial</h2>
                  <Button variant="light" className="btn-info-modal p-2 bd-highlight">
                    <Icon path={mdiAlertCircleOutline}
                      title="Home"
                      size={1.4}
                      horizontal
                      vertical
                      rotate={180}
                      color="black"
                      onClick={e => {
                        this.showModal();
                      }}
                      id="icon"
                    />
                  </Button>
                </div>

                <Modal show={this.state.show} onHide={this.showModal} size="lg">
                  <Modal.Header closeButton>
                    <Modal.Title>Classificação:</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Table className="table" responsive striped bordered hover variant="dark">
                      <thead>
                        <tr>
                          <th>Nível</th>
                          <th>Experiência</th>
                          <th>Formação</th>
                          <th>Responsabilidades</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Estagiário</td>
                          <td>0 a 2 anos</td>
                          <td>Formando ou Recém-graduado</td>
                          <td>Tarefas de pequena ou média complexidade em área(s) específica(s). Elabora projetos (sob supervisão)</td>
                        </tr>
                        <tr>
                          <td>Junior</td>
                          <td>até 5 anos</td>
                          <td>Recém-graduado</td>
                          <td>Funções de procedimentos simples ou que não exigem profundo conhecimento em um ramo de atuação</td>
                        </tr>
                        <tr>
                          <td>Pleno</td>
                          <td>6 a 9 anos</td>
                          <td>Pós-graduado</td>
                          <td>Atividades específicas, que exigem profundo conhecimento. Toma decisões endossadas por um superior.</td>
                        </tr>
                        <tr>
                          <td>Sênior</td>
                          <td>a partir de 10 anos</td>
                          <td>Pós-graduado + Gestor</td>
                          <td>Toma decisões. Age de forma autônoma, com base no conhecimento e experiências adquiridos ao longo da carreira. Gere pessoas e projetos.</td>
                        </tr>
                        <tr>
                          <td>Master</td>
                          <td>15 anos ou mais	</td>
                          <td>Pós-graduado + Gestor + Certificações	</td>
                          <td>Atua fora do processo de supervisão ou por demandas. Gere projetos / negócios. Possui autonomia plena.</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button style={{ marginBottom: "10px" }} variant="secondary" onClick={this.showModal}>
                      Fechar
                  </Button>
                  </Modal.Footer>
                </Modal>

                <div className="media-salarial-card d-flex flex-row bd-highlight mb-3 flex-wrap">
                  <Card className="card  shadow-sm  bg-white rounded " style={{ maxWidth: "150px" }}>
                    <Card.Body>
                      <Card.Title>Estagiário</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">0 a 2 anos</Card.Subtitle>
                      <Card.Text>
                        <span>R$ </span>{curso.mediaSal.intern}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                  <Card className="card shadow-sm  bg-white rounded" style={{ maxWidth: "150px" }}>
                    <Card.Body>
                      <Card.Title>Traineer</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">0 a 2 anos</Card.Subtitle>
                      <Card.Text>
                        <span>R$ </span>{curso.mediaSal.traineer}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                  <Card className="card shadow-sm  bg-white rounded" style={{ maxWidth: "150px" }}>
                    <Card.Body>
                      <Card.Title>Júnior</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">até 5 anos	</Card.Subtitle>
                      <Card.Text>
                        <span>R$ </span>{curso.mediaSal.junior}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                  <Card className="card shadow-sm  bg-white rounded" style={{ maxWidth: "150px" }}>
                    <Card.Body>
                      <Card.Title>Pleno</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">6 a 9 anos</Card.Subtitle>
                      <Card.Text>
                        <span>R$ </span>{curso.mediaSal.pleno}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                  <Card className="card shadow-sm  bg-white rounded" style={{ maxWidth: "150px" }}>
                    <Card.Body>
                      <Card.Title>Sênior</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">a partir de 10 anos</Card.Subtitle>
                      <Card.Text>
                        <span>R$ </span>{curso.mediaSal.senior}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                  <Card className="card shadow-sm  bg-white rounded" style={{ maxWidth: "150px" }}>
                    <Card.Body>
                      <Card.Title>Master</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">15 anos ou mais	</Card.Subtitle>
                      <Card.Text>
                        <span>+ de R$ </span>{curso.mediaSal.master}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </div>

              </Jumbotron>

              <div id="occupation-container" >
                <p id="occupation-info">{curso.psInfo}</p>
              </div>

              <Button variant="secondary">
                <Link to={`/`}>Voltar</Link>< br />
              </Button>{' '}
              <Button variant="secondary">
                <Link to={`/EditarCurso/${curso._id}`}>Editar</Link><br />
              </Button>{' '}
              <Button variant="danger">
                <Link to={`/DeletarCurso/${curso._id}`}>Deletar</Link>
              </Button>{' '}
            </div>
          </div>
        </>
      )
    }
  }

  showModal = e => {
    this.setState({
      show: !this.state.show
    });
  };

}


