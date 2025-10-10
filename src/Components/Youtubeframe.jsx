import React, { useState, useEffect, useRef } from 'react';
import '../Styles/youtubeframe.css';

const videos = [
    {
        title: 'Fast & Furious',
        url: 'https://www.youtube.com/embed/uisBaTkQAEs',
        duration: '3:11',
        thumbnail: '/images/tvshows/fastandfurious.png',
    },
    {
        title: 'AVATAR: The way of water',
        url: 'https://www.youtube.com/embed/d9MyW72ELq0?si=7Gm4ucvY04-mjFQD',
        duration: '2:28',
        thumbnail: '/images/movies/avatar.png',
    },
    {
        title: 'INTERSTELLAR',
        url: 'https://www.youtube.com/embed/zSWdZVtXT7E?si=0qh70EeMyzHdBVY-',
        duration: '2:54',
        thumbnail: '/images/movies/interstellar.png',
    },
    {
        title: 'CHAAVA',
        url: 'https://www.youtube.com/embed/77vRyWNqZjM?si=v-whDuX-bPTl39SI',
        duration: '3:09',
        thumbnail: '/images/chaava.png',
    },
    {
        title: 'THE MEG',
        url: 'https://www.youtube.com/embed/udm5jUA-2bs?si=fJrMTS7W3LR8TWOC',
        duration: '2:43',
        thumbnail: '/images/movies/themeg.png',
    },
];

const Youtubeframe = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemRefs = useRef([]);
    const hasUserInteracted = useRef(false);
    const autoPlayStarted = useRef(false);

    // Handle video click
    const handleSelectVideo = (index) => {
        hasUserInteracted.current = true;
        setCurrentIndex(index);
    };

    // Scroll to playlist item AFTER user interacts or arrows clicked
    useEffect(() => {
        if (!hasUserInteracted.current) return;

        const el = itemRefs.current[currentIndex];
        const playlistEl = el?.closest('.playlist');

        if (el && playlistEl && playlistEl.scrollHeight > playlistEl.clientHeight) {
            el.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'nearest',
            });
        }
    }, [currentIndex]);

    // Auto-play next video every 3s (but skip first render)
    useEffect(() => {
        if (!autoPlayStarted.current) {
            autoPlayStarted.current = true;
            return;
        }

        const timer = setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % videos.length);
        }, 10000);

        return () => clearTimeout(timer);
    }, [currentIndex]);

    return (
        <div className="video-container">
            <div className="main-video">
                <iframe
                    src={videos[currentIndex].url}
                    title={videos[currentIndex].title}
                    allow="encrypted-media"
                ></iframe>
            </div>

            <div className="playlist-wrapper">
                <div
                    className="arrow"
                    onClick={() => {
                        hasUserInteracted.current = true;
                        setCurrentIndex((prev) => (prev === 0 ? videos.length - 1 : prev - 1));
                    }}
                >
                    &#9650;
                </div>

                <div className="playlist">
                    {videos.map((video, index) => (
                        <div
                            key={index}
                            ref={(el) => (itemRefs.current[index] = el)}
                            className={`playlist-item ${currentIndex === index ? 'active' : ''}`}
                            onClick={() => handleSelectVideo(index)}
                        >
                            <img src={video.thumbnail} alt={video.title} />
                            <div className="info">
                                <p className="title">{video.title}</p>
                                <p className="duration">{video.duration}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div
                    className="arrow"
                    onClick={() => {
                        hasUserInteracted.current = true;
                        setCurrentIndex((prev) => (prev === videos.length - 1 ? 0 : prev + 1));
                    }}
                >
                    &#9660;
                </div>
            </div>
        </div>
    );
};

export default Youtubeframe;
