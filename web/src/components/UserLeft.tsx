import React from "react"
import { Link } from "react-router-dom"

export const UserLeft = () => {
    return (
        <div>
            <p className="user-left-info">One of the Players left :(</p>
            <p className="user-left-info">Login Again <Link to='/' className="user-left-link">here</Link></p>
        </div>
    )
}