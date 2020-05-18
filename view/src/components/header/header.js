import React from 'react';
import './header.css';
import Icon from '@mdi/react';
import { mdiHome, mdiPlusThick } from '@mdi/js';

export function HeaderAdmin() {
  return (
    <header id="main">
      <nav className="nav d-flex justify-content-between">
        <a id="link" href="/">
          <Icon path={mdiHome}
            title="Home"
            size={2}
            horizontal
            vertical
            rotate={180}
            color="white"
          />
        </a>
        <div><strong>CS</strong><span style={{ color: "#9450f4" }}>today</span></div>

        <a id="link" href="/CriarCurso">
          <Icon path={mdiPlusThick}
            title="Criar Usuário"
            size={2}
            horizontal
            vertical
            rotate={180}
            color="white"
          />
        </a>
      </nav>
    </header>
  );
}

export function HeaderUser() {
  return (
    <header id="main">
      <nav className="nav d-flex justify-content-center">
        <a href="/" className="anchor-header">
          <div>
            <strong>CS</strong>
            <span style={{ color: "#9450f4" }}>today</span>
          </div>
        </a>

      </nav>
    </header>
  );
}