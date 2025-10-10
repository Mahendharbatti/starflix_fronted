import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";
import '../Styles/homemovies.css';
import { FaArrowRight } from "react-icons/fa";
import { useState } from "react";

import { useNavigate } from "react-router-dom";


const movies = [
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

  //telugu movies
  { title: "RRR", image: "/images/movies/rrr.png", language: "TELUGU" },
  { title: "SALAAR", image: "/images/movies/salaar.png", language: "TELUGU" },
  { title: "JERSEY", image: "/images/movies/jersey.png", language: "TELUGU" },
  { title: "JAANU", image: "/images/movies/jaanu.png", language: "TELUGU" },
  { title: "KALKI 2898-AD", image: "/images/movies/kalki.png", language: "TELUGU" },
  { title: "HIT The third case", image: "/images/movies/hit3.png", language: "TELUGU" },
  { title: "MAD SQUARE", image: "/images/mad.png", language: "TELUGU" },

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


// TV SHOWS
const tvshows = [
  { title: "BIGBOSS", image: "/images/tvshows/bigboss.png" },
  { title: "STRANGER THINGS", image: "/images/tvshows/stranger.png" },
  { title: "ISMART JODI", image: "/images/tvshows/ismartjodi.png" },
  { title: "MAHA BHARATH", image: "/images/tvshows/mahabharath.png" },
  { title: "FAST & FURIOUS", image: "/images/tvshows/fastandfurious.png" },
  { title: "RANA NAIDU", image: "/images/tvshows/rananaidu.png" },
  { title: "BREAKING BAD", image: "/images/tvshows/breakingbad.png" },
];

const Homemovies = () => {
  const [selectedLang, setSelectedLang] = useState("ENGLISH");

  const languages = ["ENGLISH", "HINDI", "TELUGU", "TAMIL", "MALAYALAM"];

  const filteredMovies = movies.filter(movie => movie.language === selectedLang);


  // slug url
  const navigate = useNavigate();

  // Utility to convert title to URL-friendly slug
  const slugify = (title) =>
    title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9\-]/g, "");


  // slider
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 4 } },
      { breakpoint: 992, settings: { slidesToShow: 3.5 } },
      { breakpoint: 768, settings: { slidesToShow: 2.65 } },
      { breakpoint: 480, settings: { slidesToShow: 1.65 } },
    ]
  };

  return (
    <div>
      {/* Movies Section */}
      <div className="movie-slider">
        <div className="movieshead">
          <h4><b>MOVIES</b></h4>
          <a href="/movies"><b>VIEW ALL</b> <span><FaArrowRight /></span></a>
        </div>

        <ul>
          {languages.map((lang) => (
            <li key={lang}>
              <a
                href="#!"
                className={selectedLang === lang ? "active-language" : ""}
                onClick={() => setSelectedLang(lang)}
              >
                {lang}
              </a>
            </li>
          ))}
        </ul>

        <div className="Slider">
          <Slider {...settings}>
            {filteredMovies.map((movie, index) => (
              <div className="movie-cards" key={index}>
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
          </Slider>
        </div>
      </div>

      {/* TV Shows Section */}
      <div className="movie-slider">
        <div className="movieshead tvshows">
          <h4 className="popularhead"><b>POPULAR TV SHOWS</b></h4>
          <a href="/tvshows"><b>VIEW ALL</b> <span><FaArrowRight /></span></a>
        </div>
        <div className="Slider">
          <Slider {...settings}>
            {tvshows.map((shows, index) => (
              <div className="movie-cards" key={index}>
                <div className="hover-container"     onClick={() => navigate(`/movies/${slugify(shows.title)}`)}
                  style={{ cursor: "pointer" }}>
                  <img src={shows.image} alt={shows.title} />
                  <div className="overlay">
                    <button className="hover-button">Read More</button>
                  </div>
                </div>
                <h5>{shows.title}</h5>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Homemovies;
