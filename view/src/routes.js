import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

//-------
import Index from './pages/index/index';
import Details from './pages/details/details';
import DetailsAdmin from './pages/details-admin/details';
import Insert from './pages/insert/insert';
import Update from './pages/update/update';
import Delete from './pages/delete/delete';
import Login from './pages/login/login';
//-------

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Index} />
      <Route path="/cursos/:id" component={Details} />
      <Route path="/CursosAdmin/:id" component={DetailsAdmin} />
      <Route path="/CriarCurso" component={Insert} />
      <Route path="/EditarCurso/:id" component={Update} />
      <Route path="/DeletarCurso/:id" component={Delete} />
      <Route path="/login" component={Login} />
    </Switch>
  </BrowserRouter>

)

export default Routes;