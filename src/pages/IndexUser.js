import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
const IndexUser = () => {
    const navigate = useNavigate()
    const user = useSelector(state => state.user)
    useEffect(() => {
        if (!user.userAuth) {
            navigate("/login", { replace: true })
        }
    }, [user.userAuth])

    return (
        <div>IndexUser</div>
    )
}

export default IndexUser