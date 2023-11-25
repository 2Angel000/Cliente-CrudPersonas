import React from 'react'
import { NavLink } from 'react-router-dom'
import "../App.css"

export default function Nav() {
  return (
    <nav className="bg-gray-800 p-4">
      <NavLink
        className={({ isActive }) =>
          `text-white mr-4 hover:text-gray-300 ${isActive ? "activado" : ""}`
        }
        exact
        to="/"
      >
        Formulario
      </NavLink>

      <NavLink
        className={({ isActive }) =>
          `text-white mr-4 hover:text-gray-300 ${isActive ? "activado" : ""}`
        }
        to="/personas"
      >
        Personas
      </NavLink>
    </nav>
  );
}