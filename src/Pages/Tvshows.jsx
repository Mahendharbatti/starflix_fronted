import Header from '../Components/Header'
import Footer from '../Components/Footer'
import { FaAngleRight } from 'react-icons/fa'
import '../Styles/movies.css'

import { useNavigate } from "react-router-dom";

const alltvshows = [
    { title: "BREAKING BAD", image: "images/tvshows/breakingbad.png" },
    { title: "FAST & FURIOUS", image: "images/tvshows/fastandfurious.png" },
    { title: "BIGBOSS", image: "images/tvshows/bigboss.png" },
    { title: "STRANGER THINGS", image: "images/tvshows/stranger.png" },
    { title: "ISMART JODI", image: "images/tvshows/ismartjodi.png" },
    { title: "MAHA BHARATH", image: "images/tvshows/mahabharath.png" },

    { title: "RANA NAIDU", image: "images/tvshows/rananaidu.png" },

];




const Tvshows = () => {

    // slug url
    const navigate = useNavigate();

    // Utility to convert title to URL-friendly slug
    const slugify = (title) =>
        title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9\-]/g, "");



    return (
        <div>
            <Header />
            <section className='moviepage'>

                <div className='moviesheading'>
                    <h1>TV SHOWS</h1>
                    <p><a href="/home">HOME</a> <span> <FaAngleRight /> </span>  TV SHOWS</p>
                </div>

                <div className='totalmovies'>
                    <div className='foundtotal'>
                        <p>Found <span>1234 Tv Shows</span> in total</p>
                        <p>Sort by:</p>
                    </div>
                    <form action="" method='post'>
                        <select name='selection'>
                            <option value="popularity descending">Popularity Descending</option>
                            <option value="popularity ascending">Popularity Ascending</option>
                            <option value="rating descending">Rating Descending</option>
                            <option value="popularity ascending">Popularity Ascending</option>
                            <option value="release asc">Release Date Ascending</option>
                            <option value="release desc">Release Date Descending</option>
                        </select>
                    </form>
                </div>

                <div className='allcards'>
                    {alltvshows.map((shows, index) => (
                        <div className="movie-card " key={index}>
                            <div
                                className="hover-container"
                                onClick={() => navigate(`/movies/${slugify(shows.title)}`)}
                                style={{ cursor: "pointer" }}
                            >
                                <img src={shows.image} alt={shows.title} />
                                <div className="overlay">
                                    <button className="hover-button">Read More</button>
                                </div>
                            </div>
                            <h5>{shows.title}</h5>
                        </div>
                    ))}
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default Tvshows