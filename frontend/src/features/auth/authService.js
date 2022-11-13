import axios from 'axios'

const API_URL = '/api/users/'

// Register user

const register = async (userData) => {
    const response = await axios.post(API_URL, userData)

   if(response.data) {
    // save it to LS. It can only hold strings so to stringify is a requirement.
        localStorage.setItem('user', JSON.stringify(response.data))
   }
   return response.data
}

//Login user

const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData)

   if(response.data) {
    // save it to LS. It can only hold strings so to stringify is a requirement.
        localStorage.setItem('user', JSON.stringify(response.data))
   }
   return response.data
}
// Logout user
const logout = () => localStorage.removeItem('user')

const authService = {
    register,
    logout,
    login
}

export default authService