// @ts-nocheck
import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";

const apiKey = process.env.REACT_APP_NASA_KEY;

const Mars = () => {
    const [rover, setRover] = useState("Curiosity");
    const [roverDetails, setRoverDetails] = useState(null);
    const [camera, setCamera] = useState("");
    const [cameraDetails, setCameraDetails] = useState([]);


    //rover details
    useEffect(() => {
        const fetchRoverData = async () => {
            try {
                const res = await fetch(`https://api.nasa.gov/mars-photos/api/v1/manifests/${rover}?api_key=${apiKey}`);
                const roverData = await res.json();
                // console.log(roverData);
                setRoverDetails(roverData.photo_manifest);
            } 
            catch (error) {
                console.error("Error fetching rover data:", error);
            }
        };
        fetchRoverData();
    }, [rover]);

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

    //camera details
    useEffect(() => {
        const fetchCameras = async () => {
            try {
                const res = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}?api_key=${apiKey}`);
                const data = await res.json();
                
                if (data.rover && data.rover.cameras) {
                    setCameraDetails(data.rover.cameras);
                }
                console.log(data)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchCameras();
    }, [rover]);

    const renderCameraDetails = () => {
        if (cameraDetails) {
            return (
                <div style={{color:"white"}}>
                    {cameraDetails.map((camera, index) => (
                        <p>{camera.full_name}</p>
                    ))}
                </div>
            );
        }
        return null;
    };

    const cameraSelection = () => {
        if(cameraDetails){
            return(
                <div>
                    <select value={camera} onChange={(e) => setCamera(e.target.value)}>
                        {cameraDetails.map((camera, index) => (
                            <option>{camera.name}</option>
                        ))}
                    </select>
                </div>
            )
        }
    }

    return (
        <>
            <Navbar />
            <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", alignItems: "center", height: "30px" }}>
                    <p style={{ color: "white", margin: "10px" }}>Choose a rover: </p>
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
                        <h2 style={{color:"white"}}>Available Cameras</h2>
                        {renderCameraDetails()}
                    </div>
                </div>
                <div style={{display:"flex", alignItems: "center", height: "30px"}}>
                    <p style={{ color: "white", margin: "10px" }}>Choose a camers: </p>
                    {cameraSelection()}
                </div>
            </div>
        </>
    );
};

export default Mars;
