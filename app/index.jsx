// app/index.js (veya sayfan nerede ise)
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';
import Banner from '../components/Banner.jsx';
import NavBar from '../components/NavBar.jsx';
import { TMBD_API_KEY } from '../env.js';
import { styles } from '../style/style.jsx';


export default function Index() {

    const [popularMovies, setPopularMovies] = useState([])

    const [topRatedMovies, setTopRatedMovies] = useState([])

    const [upcomingMovies, setUpcomingMovies] = useState([])

    const [popularMoviesContinue, setPopularMoviesContinue] = useState([])

    const [popularSeries, setPopularSeries] = useState([])

    const [loading, setLoading] = useState(true);

    const [api] = useState(TMBD_API_KEY)


    useEffect(() => {


        const fetchData = async () => {

            try {
                const [popularRes, topRatedRes, upcomingRes, popularCRes, popularSeriesRes] = await Promise.all([
                    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${api}&language=en-US&page=1`),
                    fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${api}&language=en-US&page=1`),
                    fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${api}&language=en-US&page=1`),
                    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${api}&language=en-US&page=2`),
                    fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${api}&language=en-US&page=1`)
                ])


                const [popularData, topRatedData, upcomingData, popularCData, popularSeriesData] = await Promise.all([
                    popularRes.json(),
                    topRatedRes.json(),
                    upcomingRes.json(),
                    popularCRes.json(),
                    popularSeriesRes.json()
                ])

                setPopularMovies(popularData.results)
                setTopRatedMovies(topRatedData.results)
                setUpcomingMovies(upcomingData.results)
                setPopularMoviesContinue(popularCData.results)
                setPopularSeries(popularSeriesData.results)

            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }

        }
        fetchData()

    }, [])



    if (loading) return <ActivityIndicator size="large" color="#fff" style={{ marginTop: 50 }} />;


    const DATA = [
        { id: 1, title: "Popular Movies", data: popularMovies },
        { id: 2, title: "Top Rated Movies", data: topRatedMovies },
        { id: 3, title: "Upcoming Movies", data: upcomingMovies },
        { id: 4, title: "More Popular Movies", data: popularMoviesContinue },
        { id: 5, title: "Popular TV Series", data: popularSeries }
    ]


    const renderItem = ({ item }) => (
        <Banner
            key={item.id}
            title={item.title}
            movies={item.data}
            horizontal={true}
            showsHorizontalScrollIndicator={false} />
    )



    return (

        <View style={styles.container}>

            <NavBar />

            <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
            />


            <View style={{ marginTop: 20, height: 30 }}></View>

        </View>
    );
}


