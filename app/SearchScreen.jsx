import { TextInput, View } from 'react-native'
import { styles } from '../style/style.jsx'


const SearchScreen = () => {
    return (
        <View style={styles.container}>

            <TextInput
                style={styles.input}
            />

        </View>
    )
}

export default SearchScreen

