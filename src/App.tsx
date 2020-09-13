import React from 'react';
import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import rotas from './rotas';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <div className="logo_acerta">
        <img src="/img/logo_acerta.svg" alt="Logo da Acerta" />
      </div>
      <Router>
        <Switch>
          {rotas.map((rota: any) => {
            return <Route key={rota.path} path={rota.path} component={rota.component} />
          })}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
