import axios from 'axios'
import { ApiConfig } from '@/configs'

const client = axios.create({
	baseURL: ApiConfig.API_BASE_URL
})

export const ApiClient = {
	client
}
