import React, { Fragment, useState, useEffect } from 'react';
import railsApi from '../config/route';
import { useParams, Link } from 'react-router-dom'

const Show: React.FC = () => {
  interface blogType {
    id: string
    title: string
    user_id: string
    content: string
  }

  const [blog, setBlog] = useState<blogType>({id: '', title: '', user_id: '', content: ''});
  const params: {id: string} = useParams();

  useEffect(() => {
    railsApi.blogsRequest.get(`/${params.id}`)
      .then(res => {
        const v = res.data
        setBlog(v)
      })
  }, []);

  return (
    <Fragment>
      <Link to="/">TOPに戻る</Link>
      <div>
        <div>
          <p>タイトル: {blog.title}</p>
          <p>内容: {blog.content}</p>
          <Link to={`/${params.id}/edit`} >編集</Link>
        </div>
      </div>
    </Fragment>
  );
}

export default Show;
