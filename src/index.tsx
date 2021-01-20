import React from 'react';
import ReactDOM from 'react-dom';
import Index from './blogs/Index';
import Show from './blogs/Show';
import New from './blogs/New';
import Edit from './blogs/Edit';
import SignIn from './login/SignIn';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Route exact path="/" component={Index} />
      <Route path="/new" component={New} />
      <Route exact path="/:id(\d+)" component={Show} />
      <Route path="/:id(\d+)/edit" component={Edit} />
      <Route path="/sign_in" component={SignIn} />
    </BrowserRouter>
    <BrowserRouter>
      <Route path="/:id(\d+)/edit" component={Edit} />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
