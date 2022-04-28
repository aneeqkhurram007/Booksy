import React from 'react'
import { useSelector } from 'react-redux'

const IndexUser = () => {
    const user = useSelector(state => state.user)
    return (
        <div>{user.userType}</div>
    )
}

export default IndexUser