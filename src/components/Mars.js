// @ts-nocheck
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";

const apiKey = process.env.REACT_APP_NASA_KEY;

const Mars = () => {
    const [rover, setRover] = useState("curiosity");
    const [camera, setCamera] = useState('');
    const [sol, setSol] = useState(0);
    const [marsPhoto, setMarsPhoto] = useState(null);
    const [roverData, setRoverData] = useState(null);
    const [cameraData, setCameraData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0); 

    useEffect(() => {
        const fetchRoverData = async () => {
            try {
                const response = await fetch(
                    `https://api.nasa.gov/mars-photos/api/v1/manifests/${rover}?api_key=${apiKey}`
                );
                const data = await response.json();
                console.log(data)
                setRoverData(data.photo_manifest);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching rover data: ", error);
                setIsLoading(false);
            }
        };
        fetchRoverData();
    }, [rover]);
    

    useEffect(() => {
        const fetchCameraData = async () => {
            try {
                const response = await fetch(
                    `https://api.nasa.gov/mars-photos/api/v1/rovers?api_key=${apiKey}`
                );
                const data = await response.json();
                console.log(data.rovers);

                // Find the first available camera for the selected rover
                if (data.rovers && data.rovers[rover] && data.rovers[rover].cameras.length > 0) {
                    setCamera(data.rovers[rover].cameras[0]); // Set the default camera
                }

                setCameraData(data);
            } catch (error) {
                console.error("Error fetching camera data: ", error);
            }
        };
        fetchCameraData();
    }, [rover]);

    useEffect(() => {
        const fetchMarsPhoto = async () => {
            try {
                const response = await fetch(
                    `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&camera=${camera}&api_key=${apiKey}`
                );
                const data = await response.json();
                console.log(data);
                setMarsPhoto(data);
                setCurrentIndex(0); 
            } catch (error) {
                console.error("Error fetching photos: ", error);
            }
        };
        fetchMarsPhoto();
    }, [rover, camera, sol]);

    const handleRoverChange = (event) => {
        const selectedRover = event.target.value;
        setRover(selectedRover);
        setCamera('');
    };

    const handleCameraChange = (event) => {
        setCamera(event.target.value);
    };

    const getCameraOptions = () => {
        if (isLoading) {
            return <option>Loading cameras...</option>;
        }
        if (roverData && roverData.photos && roverData.photos.length > 0) {
            const roverPhotos = roverData.photos[0];
            return roverPhotos.cameras.map((camera) => (
                <option key={camera} value={camera}>
                    {camera}
                </option>
            ));
        }
        return <option>Select a Rover first</option>;
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? marsPhoto.photos.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === marsPhoto.photos.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <>
            <Navbar />
            <div className="main-box">
                <h1>Mars Rover Photos</h1>

                <div className="top-box">
                    <label>
                        Select Rover:
                        <select className="select" value={rover} onChange={handleRoverChange}>
                            <option value="curiosity">Curiosity</option>
                            <option value="opportunity">Opportunity</option>
                            <option value="spirit">Spirit</option>
                        </select>
                    </label>
                    <label>
                        Select Camera:
                        <select className="select" value={camera} onChange={handleCameraChange}>
                            {getCameraOptions()}
                        </select>
                    </label>
                    <label>
                        Sol (Martian day):
                        <input className="select" type="number" value={sol} onChange={(e) => setSol(e.target.value)} />
                    </label>
                </div>
                {marsPhoto && marsPhoto.photos && marsPhoto.photos.length > 0 ? (
                    <div className="detail-box">
                        <div className="item-details">
                            <p>Rover Name: {marsPhoto.photos[0].rover.name}</p>
                            <p>Landing Date: {marsPhoto.photos[0].rover.landing_date}</p>
                            <p>Launch Date: {marsPhoto.photos[0].rover.launch_date}</p>
                            <p>Max Date: {marsPhoto.photos[0].rover.max_date}</p>
                            <p>Earth day: {marsPhoto.photos[0].earth_date}</p>
                            <p>Status: {marsPhoto.photos[0].rover.status}</p>
                        </div>
                        <button className="prev-btn" onClick={handlePrev}>
                            &lt; 
                        </button>
                        <div className="image-slider">
                            <div className="headings">
                                <h2 className='h2'>{marsPhoto.photos[currentIndex].camera.full_name}</h2>
                                <h4 className='h4'>{marsPhoto.photos[currentIndex].camera.name}</h4>
                            </div>
                            <img
                                className="slider-image"
                                src={marsPhoto.photos[currentIndex].img_src}
                                alt={`Mars${marsPhoto.photos[currentIndex].id}`}
                            />
                        </div>
                        <button className="next-btn" onClick={handleNext}>
                             &gt;
                        </button>
                    </div>
                ) : (
                    <p>No Mars photo available</p>
                )}
            </div>
        </>
    );
};

export default Mars;