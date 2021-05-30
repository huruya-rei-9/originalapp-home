import Home from './containers/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import OpinionBox from './components/OpinionBox';
import React from 'react';
import {HashRouter, Switch, Route} from 'react-router-dom';
import {AuthProvider} from './context/AuthContext';
import LoggedInRoute from './components/LoggedInRoute';
import Administrator from './administrator';
import Chat from './components/Chat';
import UserHome from './components/UserHome';

const App = () => {
    return (
      <AuthProvider>
        <HashRouter basename={process.env.PUBLIC_URL}>
          <Switch>
            <Route exact path='/'>
              <LoggedInRoute>
                <Home />
              </LoggedInRoute>
            </Route>
            <Route exact path='/userhome'>
              <LoggedInRoute>
                <UserHome />
              </LoggedInRoute>
            </Route>
            <Route exact path='/opinionbox'>
              <LoggedInRoute>
                <OpinionBox />
              </LoggedInRoute>
            </Route>
            <Route exact path='/chat'>
              <LoggedInRoute>
                <Chat />
              </LoggedInRoute>
            </Route>
            <Route exact path='/login'>
              <Login />
            </Route>
            <Route exact path='/signup'>
              <Signup />
            </Route>
            <Route exact path='/administrator'>
              <Administrator />
            </Route>
        </Switch>
        </HashRouter>
      </AuthProvider>
  );
};

export default App;