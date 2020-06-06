import React from "react"
import { Link } from "react-router-dom"

export const UserLeft = () => {
    return (
        <div>
            <p>One of the Players left</p>
            <Link to='/'>Login Again</Link>
        </div>
    )
}