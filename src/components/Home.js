import React from "react";
import {Link} from "react-router-dom";

const Home=()=>{
    return(
        <div className="home">
            <Link className="button" to="/mars">Go to the Mars</Link>
        </div>
    )
}

export default Home;