// app/index.js (veya sayfan nerede ise)
import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import Banner from '../components/Banner.jsx';
import NavBar from '../components/NavBar.jsx';
import { TMBD_API_KEY } from '../env.js';
import { styles } from '../style/style.jsx';



export default function Index() {

    const [popularMovies, setPopularMovies] = useState([])

    const [topRatedMovies, setTopRatedMovies] = useState([])

    const [upcomingMovies, setUpcomingMovies] = useState([])

    const [api] = useState(TMBD_API_KEY)


    useEffect(() => {


        const fetchData = async () => {

            try {
                const [popularRes, topRatedRes, upcomingRes] = await Promise.all([
                    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${api}&language=en-US&page=1`),
                    fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${api}&language=en-US&page=1`),
                    fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${api}&language=en-US&page=1`)
                ])


                const [popularData, topRatedData, upcomingData] = await Promise.all([
                    popularRes.json(),
                    topRatedRes.json(),
                    upcomingRes.json()
                ])

                setPopularMovies(popularData.results)
                setTopRatedMovies(topRatedData.results)
                setUpcomingMovies(upcomingData.results)

            } catch (error) {
                console.log(error)
            }

        }
        fetchData()


    }, [])




    return (

        <ScrollView style={styles.container}>
            <NavBar />
            <Banner
                key={"m1"}
                title={"Popular Movies"}
                movies={popularMovies.map(movie => movie)}
            />

            <Banner
                key={"m2"}
                title={"Top Rated Movies"}
                movies={topRatedMovies.map(movie => movie)}
            />


            <Banner
                key={"m3"}
                title={"Upcoming Movies"}
                movies={upcomingMovies.map(movie => movie)}
            />
        </ScrollView>
    );
}


