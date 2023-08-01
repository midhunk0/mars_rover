// @ts-nocheck
import React, { useEffect, useState } from 'react';

const apiKey = process.env.REACT_APP_NASA_KEY;

const Mars = () => {
    const [rover, setRover] = useState('curiosity');
    const [camera, setCamera] = useState('fhaz');
    const [sol, setSol] = useState(0);
    const [marsPhoto, setMarsPhoto] = useState(null);

    useEffect(() => {
        fetchMarsPhoto();
        async function fetchMarsPhoto() {
        try {
            const response = await fetch(
                `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&camera=${camera}&api_key=${apiKey}`
            );
            const data = await response.json();
            console.log(data);
            setMarsPhoto(data);
        } 
        catch (error) {
            console.error('Error fetching photos:', error);
        }
        };
}, [rover, camera, sol]);

return (
    <div>
        {marsPhoto && marsPhoto.photos.length > 0 ? (
            <>
                <h1>Mars Rover Photos</h1>
                <div>
                    <label>
                        Rover:
                        <select value={rover} onChange={(e) => setRover(e.target.value)}>
                            <option value="curiosity">Curiosity</option>
                            <option value="opportunity">Opportunity</option>
                            <option value="spirit">Spirit</option>
                        </select>
                    </label>
                    <label>
                        Camera:
                        <select value={camera} onChange={(e) => setCamera(e.target.value)}>
                            <option value="fhaz">Front Hazard Avoidance Camera (FHAZ)</option>
                            <option value="rhaz">Rear Hazard Avoidance Camera (RHAZ)</option>
                            <option value="mast">Mast Camera (MAST)</option>
                            {/* Add other camera options here */}
                        </select>
                    </label>
                    <label>
                        Sol (Martian day):
                        <input type="number" value={sol} onChange={(e) => setSol(e.target.value)} />
                    </label>
                </div>
                
                <p>{marsPhoto.photos[0].earth_date}</p>
                <div>
                    <h5>Landing Date: {marsPhoto.photos[0].rover.landing_date}</h5>
                    <h5>Launch Date: {marsPhoto.photos[0].rover.launch_date}</h5>
                    <h5>Max Date: {marsPhoto.photos[0].rover.max_date}</h5>
                    <h5>Rover Name: {marsPhoto.photos[0].rover.name}</h5>
                    <h5>Status: {marsPhoto.photos[0].rover.status}</h5>
                </div> 

                {marsPhoto.photos.map((photo) => (
                    <React.Fragment key={photo.id}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <h2 style={{ color: "green" }}>
                                {photo.camera.full_name}
                            </h2>
                            <h4 style={{ color: "red" }}>
                                {photo.camera.name}
                            </h4>
                        </div>
                        <img
                            style={{ width: "100%", height: "100%" }}
                            src={photo.img_src}
                            alt={`Mars${photo.id}`}
                        />
                    </React.Fragment>
                ))}
            </>
        ) : (
            <p>No Mars photo available</p>
        )}
        </div>
    );
};

export default Mars;
