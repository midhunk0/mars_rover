// @ts-nocheck
import React, { useEffect, useState } from "react";

const apiKey = process.env.REACT_APP_NASA_KEY;

const Mars = () => {
    const [marsPhoto, setMarsPhoto] = useState(null);

    useEffect(() => {
        fetchMarsPhoto();
        async function fetchMarsPhoto() {
            try {
                const result = await fetch(
                    `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2016-07-29&api_key=${apiKey}`
                );
                const data = await result.json();
                setMarsPhoto(data);
                console.log(data);
            } catch (error) {
                console.error("Error fetching Mars photo:", error);
            }
        }
    }, []); // Empty dependency array to run the effect only once

    return (
        <div>
    {marsPhoto && marsPhoto.photos.length() > 0 ? (
        <>
            <h1>{marsPhoto.photos[0].earth_date}</h1>
            <div>
                <h5>Landing Date: {marsPhoto.photos[0].rover.landing_date}</h5>
                <h5>Launch Date: {marsPhoto.photos[0].rover.launch_date}</h5>
                <h5>Max Date: {marsPhoto.photos[0].rover.max_date}</h5>
                <h5>Rover Name: {marsPhoto.photos[0].rover.name}</h5>
                <h5>Status: {marsPhoto.photos[0].rover.status}</h5>
            </div> {/* Show the earth_date of the first photo */}
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








