import React from 'react';
import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import rotas from './rotas';
import Axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import ContainerComponent from './components/container/containerComponent';

function App() {
  Axios.defaults.baseURL="http://localhost:3333"
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
