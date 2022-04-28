import React, { useEffect } from 'react'
import { auth } from '../firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
const IndexAuthor = () => {
    const navigate = useNavigate()
    const user = useSelector(state => state.user)
    useEffect(() => {
        if (!user.userAuth) {
            navigate("/login", { replace: true })
        }
    }, [user.userAuth])

    return (
        <div>IndexAuthor</div>
    )
}

export default IndexAuthor