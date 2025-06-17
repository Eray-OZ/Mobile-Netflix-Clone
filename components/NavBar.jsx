import { useState } from 'react'
import { Image, View } from 'react-native'

const NavBar = () => {


    const [movie, setMovie] = useState(null)


    return (
        <View style={{ marginTop: 20, height: 60 }}>
            <Image source={require("./netflix.png")} style={{ width: 140, height: 60, resizeMode: "none", marginLeft: -20 }} />

            {/* <TextInput
                style={styles.input}
                value={movie}
                onChangeText={setMovie}
            /> */}
        </View>
    )
}

export default NavBar