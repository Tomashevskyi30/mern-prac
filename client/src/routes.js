import React from "react";
import { Route, Switch,Redirect } from "react-router-dom";
import {LinksPage} from './pages/LinksPage'
import {CreatePage} from './pages/CreatePage'
import {DetailPage} from './pages/DetailPage'
import {AuthPage} from './pages/AuthPage'
import {CreateTodo} from "./pages/CreateTodo";
export const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/links" exact>
            <LinksPage/>
        </Route>
        <Route path="/create" exact >
            <CreatePage/>
        </Route>
        <Route path="/detail/:id">
            <DetailPage/>
        </Route>
          <Route path="/todo" exact >
              <CreateTodo/>
          </Route>
        <Redirect to="/create" />
      </Switch>
    );
  }

  return (<Switch>
      <Route path="/" exact>
          <AuthPage/>
      </Route>
      <Redirect to="/"/>
  </Switch>)
};
