import React from 'react'
import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <header>
        <nav>
            <ul>
                <li>
                    <Link to="/personas">Alumnos</Link>
                </li>
            </ul>
        </nav>
    </header>
  )
}
