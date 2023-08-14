import './App.css';
import LandingPage from './components/LandingPage/LandingPage/LandingPage';
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Home from './components/Home/Home';
import Create from "./components/Create/Create"

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={LandingPage}/>
          <Route path="/home" component={Home}/> 
          <Route path="/recipe" component={Create}/> 

        </Switch>
        </Router>
    </div>
  );
}

export default App;
