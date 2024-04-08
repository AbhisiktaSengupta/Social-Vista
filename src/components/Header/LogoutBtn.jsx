import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-hot-toast'
function LogoutBtn({className=""}) {
  const navigate=useNavigate()
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
            localStorage.removeItem('currentUser')
            navigate('/')
            toast.error('Logged out successfully!')
        })
    }
  return (
    <button
    className={`inline-bock px-6 py-2 duration-200 hover:bg-[#FB88B4] hover:text-red-800 hover:font-bold rounded-full ${className}`}
    onClick={logoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn