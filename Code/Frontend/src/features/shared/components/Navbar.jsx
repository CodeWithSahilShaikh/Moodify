import React from 'react'
import { useAuth } from '../../auth/hooks/useAuth'
import '../styles/navbar.scss'

const Navbar = () => {
    const { user, handleLogout } = useAuth()

    return (
        <nav className="navbar">
            <div className="navbar__logo">
                Moodi<span>fy</span>
            </div>
            {user && (
                <div className="navbar__user-info">
                    <span className="navbar__email">{user.email}</span>
                    <button className="button navbar__logout-btn" onClick={handleLogout}>Logout</button>
                </div>
            )}
        </nav>
    )
}

export default Navbar
