

export const API_ROOT = 'http://localhost:3001';
export const API_WS_ROOT = 'ws://localhost:3001/cable';
export const createHeaders = () => {
  let token = localStorage.getItem('bandToken')
  return(
  {'Content-Type': 'application/json',
  Accept: 'application/json',
  'Authorization': `Bearer ${token}`})
}
export const GET_REQUEST = () => {
  return({method: 'GET', headers: createHeaders()})
}