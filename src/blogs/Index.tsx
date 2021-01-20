import React, { Fragment, useState, useEffect } from 'react';
import railsApi from '../config/route';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom'

const Index:React.FC = () => {
  interface blogType  {
    id: number
    title: string
    user_id: number
  }

  const [blogs, setBlogs] = useState<blogType[]>([]);

  const deleteHandler = (id: number) => {
    railsApi.blogsRequest({
      method: 'DELETE',
      url: `/${id}`,
      headers: {
        'access-token': localStorage.getItem('access-token'),
        'client': localStorage.getItem('client'),
        'uid': localStorage.getItem('uid')
      }
    })
      .then(() => {
        setBlogs(blogs.filter(blog => blog.id !== Number(id)))
      })
  }

  const loginOrNew = () => {
    if (localStorage.getItem('id')) {
      return (
        <Link to="/new" style={{ textDecoration: "none" }}>
          <Button
            style={{ marginTop: '10px' }}
            variant="contained"
            color="primary"
          >
            新規作成
          </Button>
        </Link>
      );
    } else {
      return (
        <Link to="/sign_in" style={{ textDecoration: "none" }}>
          <Button
            style={{ marginTop: '10px' }}
            variant="contained"
            color="primary"
          >
            ログイン画面へ
        </Button>
        </Link>
      );
    }
  }

  const deleteButton = (blog: blogType) => {
    if (Number(localStorage.getItem('id')) === blog.user_id) {
      console.log(blog.user_id);
      return (
        <Button
          onClick={() => deleteHandler(blog.id)}
          style={{ textAlign: "center", marginLeft: "10px" }}
        >
          削除
        </Button>
      );
    }
  }

  useEffect(() => {
    railsApi.blogsRequest.get('/')
      .then(res => {
        const v = res.data
        setBlogs(v)
      })
  }, []);

  return (
    <Fragment>
      {blogs.map((blog) => {
        return (
          <div id={`blog-${blog.id}`}>
            <Link
              to={`/${blog.id}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              {blog.title}
            </Link>
            {deleteButton(blog)}
          </div>
        )
      })}
      {loginOrNew()}
    </Fragment>
  );
}

export default Index;
