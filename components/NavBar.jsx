import { Image, View } from 'react-native'

const NavBar = () => {
    return (
        <View style={{ marginTop: 20, height: 60 }}>
            <Image source={require("./netflix.png")} style={{ width: 140, height: 60, resizeMode: "none", marginLeft: -20 }} />
        </View>
    )
}

export default NavBar