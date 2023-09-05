import axios from 'axios'

const baseUrl = process.env.NEXT_PUBLIC_URL
  ? `${process.env.NEXT_PUBLIC_URL}/api`
  : 'http://localhost:3000/api'

export const api = axios.create({
  baseURL: baseUrl
})
