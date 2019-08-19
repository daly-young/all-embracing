// import { _get, _post } from '@/plugins/axios'
import { _get } from '@/plugins/axios'


export const getList = () => {
  return _get('/mock/list.json')
}

export const addCate = (params) => {
  return _get('/mock/addcate.json', { params })
}

export const addUrl = (params) => {
  return _get('/mock/addurl.json', { params })
}

export const deleteCate = (params) => {
  return _get('/mock/delete.json', { params })
}

export const setCateTop = (params) => {
  return _get('/mock/top.json', { params })
}