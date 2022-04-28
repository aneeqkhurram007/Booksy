import React, { useEffect } from 'react'
import { auth } from '../firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router'
const IndexUser = () => {
    const navigate = useNavigate()
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                navigate("/login", { replace: true })
            }
        })
    }, [])

    return (
        <div>IndexUser</div>
    )
}

export default IndexUser