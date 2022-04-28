import { Button } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className='h-20 w-full flex justify-between py-1 px-2'>
            <h1>Booksy</h1>
            <div className='flex justify-center items-center space-x-2'>
                <Link to="/login">
                    LogIn
                </Link>
                <Link to="/signup">SignUp</Link>
                <Button type="primary">LogOut</Button>
            </div>
        </div>
    )
}

export default Navbar