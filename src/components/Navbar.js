import React from "react";
import { Link } from "react-router-dom";

const Navbar=()=>{
    return(
        <div className="navbar">
            <h2 className="logo">mars pictures</h2>
            <Link className="item" to="/">go to earth</Link>
        </div>
    )
}

export default Navbar;