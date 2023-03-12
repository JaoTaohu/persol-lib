import { React } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './component/Home';
import Signin from "./component/Signin";
import Signup from "./component/Signup";
import { AuthProvider } from "./component/auth";
import Lib from './component/lib'
import Fav from "./component/Favourite";
import Upload from "./component/Upload";


function App() {

  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/upload' component={Upload} />
          <Route exact path='/signin' component={Signin} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/lib' component={Lib} />
          <Route exact path='/favourite' component={Fav} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
