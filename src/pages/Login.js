import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { auth } from '../firebase'
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import { Alert, Button, Input, Switch } from 'antd'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setUserType } from '../slices/userSlice'
const Login = () => {
    const navigate = useNavigate()
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [alertMessage, setalertMessage] = useState(null)
    const [state, setstate] = useState({
        email: "",
        password: ""
    })
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate("/", { replace: true })
            }
        })
    }, [])
    useEffect(() => {
        setTimeout(() => {
            setalertMessage(null)
        }, 2000);
    }, [alertMessage])

    const loginUser = async (e) => {
        e.preventDefault()
        try {
            await signInWithEmailAndPassword(auth, state.email, state.password)
            setalertMessage({
                type: "success",
                message: "User Logged in successfully. Redirecting ..."
            })
            setTimeout(() => {
                navigate("/", { replace: true })
            }, 3000);
        } catch (error) {
            console.log(error)
            setalertMessage({
                type: "failed",
                message: error.message
            })
        }
    }
    const changeHandler = (e) => {
        setstate({ ...state, [e.target.name]: e.target.value })
    }
    const changeUser = () => {
        dispatch(setUserType({
            type: user.userType === "User" ? "Author" : "User"
        }))
    }
    return (
        <div className='flex w-full h-screen flex-col justify-center items-center'>
            {
                alertMessage?.type === "success" && (<Alert type='success' message={alertMessage.message} />)}
            {alertMessage?.type === "failed" && (<Alert
                type='error' message={alertMessage.message}
            />)
            }
            <h1 className='text-4xl'>Booksy</h1>
            <h1 className='text-4xl'>Login</h1>
            <h4 className='text-xl my-4'>{user.userType} Account</h4>
            <Switch className='bg-blue-400' checked={user.userType === "User" ? false : true} onChange={changeUser} size="default" />
            <p className='text-lg my-2'>Switch to {user.userType === "User" ? "Author" : "User"} account</p>
            <form className='flex flex-col w-1/2 my-10 space-y-4' onSubmit={loginUser}>
                <div className='flex w-full justify-center'>
                    <label className='w-1/4 font-semibold text-lg'>Email: </label>
                    <Input className='rounded' required
                        type={"email"} name="email" value={state.email} onChange={changeHandler} />
                </div>
                <div className='flex w-full justify-center'>
                    <label className='w-1/4 font-semibold text-lg'>Password: </label>
                    <Input.Password className='rounded' required name="password" value={state.password} onChange={changeHandler} />
                </div>
                <div className='flex w-full justify-center'>
                    <Button className='bg-blue-400 text-lg font-semibold p-1 px-3 rounded'
                        size='large' type="primary" htmlType='submit'>Login</Button>
                </div>
                <div className='w-full text-center'>
                    <p className='text-lg font-semibold'>Don't have an account. <Link to={"/signup"}>Sign Up</Link> </p>
                </div>
            </form>
        </div>
    )
}

export default Login