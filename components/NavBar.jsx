import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Image, TouchableOpacity, View } from 'react-native';

const NavBar = () => {


    const router = useRouter();


    return (
        <View style={{ marginTop: 20, height: 60, flexDirection: "row" }}>
            <Image source={require("./netflix.png")} style={{ width: 140, height: 60, resizeMode: "none", marginLeft: -20 }} />

            <TouchableOpacity onPress={() => router.push("/SearchScreen")}>
                <Ionicons name="search" size={24} color="white" style={{ marginLeft: 200, marginTop: 20 }} />
            </TouchableOpacity>

        </View>
    )
}

export default NavBar