import React from "react";
import { Link } from "react-router-dom";

const Navbar=()=>{
    return(
        <div>
            <h2>mars pictures</h2>
            <Link to="/">go to earth</Link>
        </div>
    )
}

export default Navbar;