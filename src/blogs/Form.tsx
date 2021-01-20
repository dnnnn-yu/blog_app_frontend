import React, { useState, useEffect, FormEvent } from 'react';
import { TextField, Button } from '@material-ui/core';
import railsApi from '../config/route';
import { useParams } from 'react-router-dom'

type Props = {
  userId: string | null
}

const Form: React.FC<Props> = (props) => {
  const [titleValue, setTitleValue] = useState('');
  const [contentValue, setContentValue] = useState('');

  const params: {id: string } = useParams();
  const id: string | null = params.id;
  const submitTitle = id ? '編集' : '作成'

  interface Action {
    method: 'patch' | 'post'
    url: string
  }
  let action: Action;
  if (id) {
    action = { method: 'patch', url: `/${id}` };
  } else {
    action = { method: 'post', url: `/` };
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    railsApi.blogsRequest({
      method: action.method,
      headers: {
        'Content-Type': 'application/json',
        'access-token': localStorage.getItem('access-token'),
        'client': localStorage.getItem('client'),
        'uid': localStorage.getItem('uid')
      },
      url: action.url,
      data: {
        title: titleValue,
        content: contentValue,
        user_id: props.userId,
      }
    })
      .then(() => {
        window.location.href = '/';
      })
  }

  useEffect(() => {
    if (id) {
      railsApi.blogsRequest.get(`/${id}`)
        .then(res => {
          const v = res.data
          setTitleValue(v.title)
          setContentValue(v.content)
        })
    }
  }, []);

  return (
    <div>
      <form onSubmit={(event) => { handleSubmit(event) }} noValidate autoComplete="off">
        <div style={{ marginTop: '10px' }}>
          <TextField
            label="タイトル"
            name="title"
            value={titleValue || ''}
            onChange={(e) => {
              setTitleValue(e.target.value);
            }} />
        </div>
        <div style={{ marginTop: '10px' }}>
          <TextField
            label="内容"
            name="content"
            multiline
            rows={4}
            value={contentValue || ''}
            onChange={(e) => {
              setContentValue(e.target.value);
            }}
          />
        </div>
        <Button
          style={{ marginTop: '10px' }}
          type="submit"
          variant="contained"
          color="primary"
        >
          {submitTitle}
        </Button>
      </form>
    </div>
  );
};

export default Form;
