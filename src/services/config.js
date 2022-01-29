import axios from 'axios'

export const http = axios.create({
    // headers: { "X-XSRF-TOKEN": CSRF_TOKEN },
    baseURL: 'http://localhost:8080/leilao'
})
