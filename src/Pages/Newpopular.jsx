import Header from '../Components/Header'
import Footer from '../Components/Footer'
import { FaAngleRight } from 'react-icons/fa'
import '../Styles/movies.css'

import { useNavigate } from "react-router-dom";

const allpopular = [

  //telugu movies
  { title: "KALKI 2898-AD", image: "images/movies/kalki.png", language: "TELUGU" },
  { title: "SALAAR", image: "images/movies/salaar.png", language: "TELUGU" },
   { title: "BREAKING BAD", image: "images/tvshows/breakingbad.png" },
  { title: "TOURIST FAMILY", image: "images/movies/touristfamily.png", language: "TAMIL" },
   { title: "BIGBOSS", image: "images/tvshows/bigboss.png" },
  { title: "HIT The third case", image: "images/movies/hit3.png", language: "TELUGU" },

  //english movies
   { title: "STRANGER THINGS", image: "images/tvshows/stranger.png" },
  { title: "OPPENHEIMER", image: "images/movies/oppenheimer.png", language: "ENGLISH" },
  { title: "AVATAR The way of water", image: "images/movies/avatar.png", language: "ENGLISH" },

  // hindi movies
  { title: "CHHAAVA", image: "images/chaava.png", language: "HINDI" },
  { title: "ISMART JODI", image: "images/tvshows/ismartjodi.png" },

  //tamil movies
  { title: "NILAVUKU EN MEL ENNADI KOBAM ", image: "images/movies/nilavuku.png", language: "TAMIL" },
  { title: "DRAGON", image: "images/movies/dragon.png", language: "TAMIL" },

  //malayalam movies
  { title: "GYMKHANA", image: "images/movies/gymkhana.png", language: "MALAYALAM" },
];


const Newpopular = () => {

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
          <h1>NEW & POPULAR</h1>
          <p><a href="/home">HOME</a> <span> <FaAngleRight /> </span>  NEW & POPULAR</p>
        </div>

        <div className='totalmovies'>
          <div className='foundtotal'>
            <p>Found <span>1234 New Popular</span> in total</p>
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
          {allpopular.map((shows, index) => (
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

export default Newpopular