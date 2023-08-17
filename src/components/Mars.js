// @ts-nocheck
import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";

const apiKey = process.env.REACT_APP_NASA_KEY;

const Mars = () => {
    const [rover, setRover] = useState("Curiosity");
    const [roverDetails, setRoverDetails] = useState(null);

    //rover details
    useEffect(() => {
        const fetchRoverData = async () => {
            try {
                const res = await fetch(`https://api.nasa.gov/mars-photos/api/v1/manifests/${rover}?api_key=${apiKey}`);
                const roverData = await res.json();
                console.log(roverData);
                setRoverDetails(roverData.photo_manifest);
            } catch (error) {
                console.error("Error fetching rover data:", error);
            }
        };
        fetchRoverData();
    }, [rover]);

    const renderCameraDetails = () => {
        if (roverDetails?.photos?.length > 0) {
            const cameras = roverDetails.photos[0].cameras;
            return cameras.map((camera) => (
                <p key={camera} style={{ color: "white" }}>
                    {camera}
                </p>
            ));
        }
        return <p style={{ color: "white" }}>Select a Rover first</p>;
    };

    const renderRoverDetails = () => {
        if (roverDetails) {
            return (
                <div style={{ color: "white" }}>
                    <p>Name: {roverDetails.name}</p>
                    <p>Landing Date: {roverDetails.landing_date}</p>
                    <p>Launch Date: {roverDetails.launch_date}</p>
                    <p>Max Date: {roverDetails.max_date}</p>
                    <p>Max Sol: {roverDetails.max_sol}</p>
                    <p>Status: {roverDetails.status}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <>
            <Navbar />
            <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", alignItems: "center", height: "30px" }}>
                    <p style={{ color: "white", marginRight: "10px" }}>Choose a rover: </p>
                    <select value={rover} onChange={(e) => setRover(e.target.value)}>
                        <option>Curiosity</option>
                        <option>Opportunity</option>
                        <option>Spirit</option>
                    </select>
                </div>
                <div style={{display:"flex", justifyContent:"space-around"}}>
                    <div>
                        <h2 style={{ color: "white" }}>Rover Details</h2>
                        {renderRoverDetails()}
                    </div>
                    <div>
                        <h2 style={{ color: "white" }}>Cameras Available</h2>
                        {renderCameraDetails()}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Mars;
