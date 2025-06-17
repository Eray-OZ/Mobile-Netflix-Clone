// components/HorizontalBanner.js
import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import { TMBD_API_KEY } from '../env.js';
import { styles } from '../style/style.jsx';

export default function Banner({ title, movies }) {


    const [api] = useState(TMBD_API_KEY)

    const [trailers, setTrailers] = useState({});



    useEffect(() => {

        const fetchTrailer = async () => {

            try {

                const results = await Promise.all(
                    movies.map(async (movie) => {
                        const res = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/videos?language=en-US&api_key=${api}`);
                        const data = await res.json()
                        const trailer = data.results?.find(
                            (video) => video.type === "Trailer" && video.site === "YouTube"
                        )

                        return {
                            id: movie.id,
                            key: trailer?.key || null
                        }
                    })
                )


                let newTrailers = {}

                results.forEach(({ id, key }) => {
                    if (key) {
                        newTrailers[id] = key
                    }
                    else {
                        console.log("No trailer found " + id)
                    }
                })

                setTrailers(newTrailers)

            } catch (error) {
                console.log(`Error:: ${error}`)
            }
        }


        fetchTrailer()

    }, [movies])

    return (
        <View style={styles.bannerContainer}>
            <Text style={styles.title}>{title}</Text>
            <View style={{ marginRight: 10, flexDirection: "row" }}>
                {movies.map((movie, index) => {
                    return (
                        <Link key={index} href={`https://www.youtube.com/watch?v=${trailers[movie.id]}`} style={{ marginLeft: 10 }}>
                            <Image
                                source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
                                style={styles.image}
                                resizeMode="cover"
                            />
                        </Link>
                    )
                })}
            </View>
        </View >
    );
}

