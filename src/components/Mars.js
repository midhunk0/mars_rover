// @ts-nocheck
import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";

const apiKey = process.env.REACT_APP_NASA_KEY;

const Mars = () => {
    const [rover, setRover] = useState("Curiosity");
    const [roverDetails, setRoverDetails] = useState(null);
    const [camera, setCamera] = useState("");
    const [cameraDetails, setCameraDetails] = useState([]);
    const [dateFrom, setDateFrom] = useState("Mars Date");
    const [sol, setSol] = useState(0);
    const [date, setDate] = useState("");
    const [image, setImage] = useState([]);

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
                const cameraData = await res.json();
                
                if (cameraData.rover && cameraData.rover.cameras) {
                    setCameraDetails(cameraData.rover.cameras);
                }
                // console.log(data)
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
                        <p key={index}>{camera.full_name}</p>
                    ))}
                </div>
            );
        }
        return null;
    };

    //image from a rover and camera on a date or sol
    const cameraSelection = () => {
        if(cameraDetails){
            return(
                <div>
                    <select className="selection" value={camera} onChange={(e) => setCamera(e.target.value)}>
                        {cameraDetails.map((camera, index) => (
                            <option key={index}>{camera.name}</option>
                        ))}
                    </select>
                </div>
            )
        }
    }

    useEffect(() => {
        const fetchImages = async () => {
            try{
                const res = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&camera=${camera}&api_key=${apiKey}`);
                const imageData = await res.json();
                setImage(imageData.photos);
                console.log(imageData.photos);
            }
            catch(error){
                console.error("Error while fetching images", error);
            }
        }
        fetchImages();
    }, [rover, sol, camera])

    return (
        <>
            <Navbar />
            <div className="main-div">
                <div className="rover-selection">
                    <p>Choose a rover: </p>
                    <select className="selection" value={rover} onChange={(e) => setRover(e.target.value)}>
                        <option>Curiosity</option>
                        <option>Opportunity</option>
                        <option>Spirit</option>
                    </select>
                </div>
                <div className="details">
                    <div className="inner-details">
                        <h2 style={{ color: "white" }}>Rover Details</h2>
                        {renderRoverDetails()}
                    </div>
                    <div className="inner-details">
                        <h2 style={{color:"white"}}>Available Cameras</h2>
                        {renderCameraDetails()}
                    </div>
                </div>
                <div className="image-selection">
                    <div className="choose">
                        <p>Choose a camers: </p>
                        {cameraSelection()}
                    </div>
                    <div className="choose">
                        <p>Earth date or Mars date: </p>
                        <select className="selection" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)}>
                            <option>Earth Date</option>
                            <option>Mars Date</option>
                        </select>
                    </div>
                    <div className="choose">
                        {dateFrom === "Earth Date" ? (
                            <>
                                <p>Enter a date in Earth</p>
                                <input className="selection" type="date" value={date} onChange={(e) => setDate(e.target.value)}/>
                            </>
                        ):(
                            <>
                                <p>Enter a date in Mars (sol)</p>
                                <input className="selection" type="number" value={sol} onChange={(e) => setSol(e.target.value)}/>
                            </>
                        )}
                    </div>
                </div>
                <div className="images">
                    {image && image.map((img, index) => (
                        <img key={index} src={img.img_src} alt={"images"}  />
                    ))}
                </div>
            </div>
        </>
    );
};

export default Mars;

