
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import Homemovies from '../Components/Homemovies';
import MovieSlide from '../Components/MovieSlide';
import Youtubeframe from '../Components/Youtubeframe';

function Home({ setToken }) {
    return (
        <div>
            <Header />
            <MovieSlide />
            <Homemovies />
            <Youtubeframe />

            <Footer />

        </div>
    );
}

export default Home