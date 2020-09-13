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
import ContainerComponent from './components/container/containerComponent';

function App() {
  return (
    <div className="App">
      <ContainerComponent>
        <Router>
          <Switch>
            {rotas.map((rota: any) => {
              return <Route key={rota.path} path={rota.path} component={rota.component} {...rota} />
            })}
          </Switch>
        </Router>
      </ContainerComponent>
    </div>
  );
}

export default App;
