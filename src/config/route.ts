import axios from 'axios';

// APIのドメインを設定する。
const baseURL = 'http://localhost:3000'

const blogsRequest = axios.create({
  baseURL: `${baseURL}/blogs`
})

const authRequest = axios.create({
  baseURL: `${baseURL}/auth`
})

const railsApi = {
  blogsRequest: blogsRequest,
  authRequest: authRequest
}

export default railsApi;
