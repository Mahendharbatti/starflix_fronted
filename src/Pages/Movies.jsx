
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import { FaAngleRight } from 'react-icons/fa'
import '../Styles/movies.css'
import { useNavigate } from "react-router-dom";

const allmovies = [

  //telugu movies
  { title: "RRR", image: "/images/movies/rrr.png", language: "TELUGU" },
  { title: "SALAAR", image: "/images/movies/salaar.png", language: "TELUGU" },
  { title: "JERSEY", image: "/images/movies/jersey.png", language: "TELUGU" },
  { title: "JAANU", image: "/images/movies/jaanu.png", language: "TELUGU" },
  { title: "KALKI 2898-AD", image: "/images/movies/kalki.png", language: "TELUGU" },
  { title: "HIT The third case", image: "/images/movies/hit3.png", language: "TELUGU" },
  { title: "MAD SQUARE", image: "/images/mad.png", language: "TELUGU" },

  //english movies
  { title: "OPPENHEIMER", image: "/images/movies/oppenheimer.png", language: "ENGLISH" },
  { title: "AVATAR The way of water", image: "/images/movies/avatar.png", language: "ENGLISH" },
  { title: "AVENGERS", image: "/images/movies/avengers.png", language: "ENGLISH" },
  { title: "PIRATES of The CARIBBEAN", image: "/images/movies/piratesofthecaribbean.png", language: "ENGLISH" },
  { title: "INTERSTELLAR", image: "/images/movies/interstellar.png", language: "ENGLISH" },
  { title: "THE BATMAN", image: "/images/movies/thebatman.png", language: "ENGLISH" },
  { title: "THE MEG", image: "/images/movies/themeg.png", language: "ENGLISH" },

  // hindi movies

  { title: "DANGAL", image: "/images/movies/dangal.png", language: "HINDI" },
  { title: "FIGHTER", image: "/images/movies/fighter.png", language: "HINDI" },
  { title: "PATHAAN", image: "/images/movies/pathaan.png", language: "HINDI" },
  { title: "12 FAIL", image: "/images/movies/12fail.png", language: "HINDI" },
  { title: "TIGER 3", image: "/images/movies/tiger3.png", language: "HINDI" },
  { title: "KABIR SINGH", image: "/images/movies/kabirsingh.png", language: "HINDI" },
  { title: "CHHAAVA", image: "/images/chaava.png", language: "HINDI" },


  //tamil movies
  { title: "JAILER", image: "/images/movies/jailer.png", language: "TAMIL" },
  { title: "NILAVUKU EN MEL ENNADI KOBAM ", image: "/images/movies/nilavuku.png", language: "TAMIL" },
  { title: "DRAGON", image: "/images/movies/dragon.png", language: "TAMIL" },
  { title: "TOURIST FAMILY", image: "/images/movies/touristfamily.png", language: "TAMIL" },
  { title: "VIKRAM", image: "/images/movies/vikram.png", language: "TAMIL" },
  { title: "AMARAN", image: "/images/movies/amaran.png", language: "TAMIL" },


  //malayalam movies
  { title: "MANJUMMEL BOYS", image: "/images/movies/manjummelboys.png", language: "MALAYALAM" },
  { title: "GYMKHANA", image: "/images/movies/gymkhana.png", language: "MALAYALAM" },
  { title: "AAVESHAM", image: "/images/movies/aavesham.png", language: "MALAYALAM" },
];




const Movies = () => {

  
    // slug url
  const navigate = useNavigate();

  // Utility to convert title to URL-friendly slug
  const slugify = (title) =>
    title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9\-]/g, "");




  return (
    <div>
        <Header/>
        <section className='moviepage'>

            <div className='moviesheading'>
                <h1>MOVIES</h1>
                 <p><a href="/home">HOME</a> <span> <FaAngleRight/> </span>  MOVIES</p>
            </div>

            <div className='totalmovies'>
              <div className='foundtotal'>
                <p>Found <span>1,608 movies</span> in total</p> 
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
               {allmovies.map((movie, index) => (
              <div className="movie-card " key={index}>
                <div
                  className="hover-container"
                  onClick={() => navigate(`/movies/${slugify(movie.title)}`)}
                  style={{ cursor: "pointer" }}
                >
                  <img src={movie.image} alt={movie.title} />
                  <div className="overlay">
                    <button className="hover-button">Read More</button>
                  </div>
                </div>
                <h5>{movie.title}</h5>
              </div>
            ))}
            </div>
        </section>
        <Footer/>
    </div>
  )
}

export default Movies