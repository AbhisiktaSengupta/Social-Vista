import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import {Button, Input, Logo} from "./index"
import {useDispatch} from "react-redux"
import authService from "../appwrite/auth"
import {useForm} from "react-hook-form"
import toast from 'react-hot-toast'

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState("")

    const login = async(data) => {
        setError("")
        try {
            const session = await authService.login(data)
            //console.log(session)
            if (session) {
                const userData = await authService.getCurrentUser()
                localStorage.setItem('currentUser', userData.$id)
                console.log(userData)
                if(userData) dispatch(authLogin(userData));
                navigate("/")
                toast.success(`Congratulations ${userData.name}! You have successfully logged in`)
            }
        } catch (error) {
            setError(error.message)
            toast.error(error.message)
        }
    }

  return (
    <div
    className='flex items-center justify-center w-full'
    >
        <div className={`mx-auto w-full max-w-lg bg-[#d3d5fb] rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight text-[#350b39] font-serif">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-[#350b39] font-serif">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline text-blue-800"
                    >
                        Sign Up
                    </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center font-medium"></p>}
        <form onSubmit={handleSubmit(login)} className='mt-8'>
            <div className='space-y-5 font-bold text-[#3a3c62] font-serif'>
                <Input
                label="Email: "
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                    required: true,
                    validate: {
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                })}
                />
                <Input
                label="Password: "
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                    required: true,
                })}
                />
                <Button
                type="submit"
                className="w-full text-[rgb(225,225,216)] bg-[#2e3171] rounded-xl"
                >Sign in</Button>
            </div>
        </form>
        </div>
    </div>
  )
}

export default Login