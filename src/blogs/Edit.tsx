import React, { Fragment } from 'react';
import Form from './Form';
import { Link } from 'react-router-dom';

const Edit: React.FC = () => {
  return (
    <Fragment>
      <Link to="/" style={{ textDecoration: "none", color: "gray" }}>TOPに戻る</Link>
      <Form userId={localStorage.getItem("id")} />
    </Fragment>
  );
};

export default Edit;
