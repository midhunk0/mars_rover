// @ts-nocheck
import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";

const apiKey = process.env.REACT_APP_NASA_KEY;

const Mars = () => {
    const [rover, setRover] = useState("Curiosity");
    const [roverDetails, setRoverDetails] = useState(null);
    const [camera, setCamera] = useState("");
    const [cameraDetails, setCameraDetails] = useState([]);
    const [dateFrom, setDateFrom] = useState("Earth Date");
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
                        <p>{camera.full_name}</p>
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
                    <select value={camera} onChange={(e) => setCamera(e.target.value)}>
                        {cameraDetails.map((camera, index) => (
                            <option>{camera.name}</option>
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
                // console.log(data);
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
            <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", alignItems: "center", height: "30px" }}>
                    <p style={{ color: "white", margin: "10px" }}>Choose a rover: </p>
                    <select value={rover} onChange={(e) => setRover(e.target.value)}>
                        <option>Curiosity</option>
                        <option>Opportunity</option>
                        <option>Spirit</option>
                    </select>
                </div>
                <div style={{display:"flex", gap:"10px", margin:"10px"}}>
                    <div style={{width:"50%", border:"1px solid white", borderRadius:"10px", padding:"20px", background:"#F45050"}}>
                        <h2 style={{ color: "white" }}>Rover Details</h2>
                        {renderRoverDetails()}
                    </div>
                    <div style={{width:"50%", border:"1px solid white", borderRadius:"10px", padding:"20px", background:"#F45050"}}>
                        <h2 style={{color:"white"}}>Available Cameras</h2>
                        {renderCameraDetails()}
                    </div>
                </div>
                <div style={{display:"flex", alignItems: "center", height: "30px"}}>
                    <p style={{ color: "white", margin: "10px" }}>Choose a camers: </p>
                    {cameraSelection()}
                    <p style={{color:"white", margin:"10px"}}>Earth date or Mars date</p>
                    <select value={dateFrom} onChange={(e) => setDateFrom(e.target.value)}>
                        <option>Earth Date</option>
                        <option>Mars Date</option>
                    </select>
                    {dateFrom === "Earth Date" ? (
                        <>
                            <p style={{color:"white", margin:"10px"}}>Enter a date in Earth</p>
                            <input type="date" value={date} onChange={(e) => setDate(e.target.value)}/>
                        </>
                        ):(
                        <>
                            <p style={{color:"white", margin:"10px"}}>Enter a date in Mars (sol)</p>
                            <input type="number" value={sol} onChange={(e) => setSol(e.target.value)}/>
                        </>
                    )}
                </div>
                <div style={{display:"grid", placeItems:"center", marginTop:"20px", gap:"10px"}}>
                    {/* Render the fetched images */}
                    {image.map((img, index) => (
                        <img key={index} src={img.img_src} alt={"images"} style={{ maxWidth: "100%" }} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default Mars;
