import { React } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './component/Home';
import Addpic from "./component/Addpic";
import Login from "./component/Login";
import Signup from "./component/Signup";
import { AuthProvider } from "./component/auth";
import Lib from './component/lib'


function App() {

  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/addpic' component={Addpic} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/lib' component={Lib} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
