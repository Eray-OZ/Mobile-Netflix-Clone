// components/HorizontalBanner.js
import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { TMBD_API_KEY } from '../env.js';
import { styles } from '../style/style.jsx';

export default function Banner({ title, movies }) {


    const [api] = useState(TMBD_API_KEY)

    const [videoKey, setVideoKey] = useState(null)

    const [trailers, setTrailers] = useState({});



    useEffect(() => {


        const fetchTrailer = async () => {

            const newTrailers = {}


            for (let movie of movies) {
                try {

                    const res = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/videos?language=en-US&api_key=${api}`)

                    const data = await res.json()

                    const trailer = data.results[0].key

                    newTrailers[movie.id] = trailer

                    setVideoKey(null)

                } catch (error) {
                    console.log(`Error:: ${movie.id} - ${error}`)
                }
            }

            setTrailers(newTrailers);
        }


        fetchTrailer()

    }, [movies])

    return (
        <View style={styles.bannerContainer}>
            <Text style={styles.title}>{title}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginRight: 10 }}>
                {movies.map((movie, index) => {
                    return (
                        <Link Link key={index} href={`https://www.youtube.com/watch?v=${trailers[movie.id]}`} style={{ marginLeft: 10 }}>
                            <Image
                                source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
                                style={styles.image}
                                resizeMode="cover"
                            />
                        </Link>
                    )
                })}
            </ScrollView>
        </View >
    );
}

