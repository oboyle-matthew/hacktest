import React from 'react';
import { StyleSheet, Dimensions, Button, Text, View, Image, TouchableOpacity, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // 6.2.2
import {
    createBottomTabNavigator,
    createStackNavigator,
    TabBarBottom
} from 'react-navigation';
import CameraScreen from '../CameraScreen';
import SongHolder from './SongHolder';
import { Card, ListItem } from 'react-native-elements';


class HomeScreen extends React.Component {
    render() {
        return (
            <View style={styles.baby}>
                <StatusBar barStyle="light-content" />
                <Image style={styles.image} source={require('../assets/logo.png')} />
                <View style={styles.buttonBorder}>
                    <TouchableOpacity style={styles.button}>
                        <Button title="Let's Get Started!"  color="#336699"
                                onPress={() => this.props.navigation.navigate('Play')}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

class SettingsScreen extends React.Component {
    render() {
        var users = ["1", "2", "3", "4"];
        return (
            <View style={styles.recordings}>
                <Text style={{marginTop: '15%', fontSize: 20, textAlign: 'center', color: 'white', fontWeight: 'bold'}}>My Songs</Text>
                {/* other code from before here */}
                {users.map((user, i) => {
                    return <ListItem key={i} title={"Recording " + user}/>
                })}
                <View style={styles.buttonBorder}>
                    <TouchableOpacity style={styles.button}>
                        <Button
                            title="Play Current Recording" color="#336699"
                            onPress={() => SongHolder.playNotes()}
                        />
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
}

const HomeStack = createStackNavigator({
    Home: HomeScreen
});

const SettingsStack = createStackNavigator({
    Songs: SettingsScreen
});

const PlayStack = createStackNavigator({
    Play: CameraScreen,
});
export default createBottomTabNavigator(
    {
        Home: HomeStack,
        Songs: SettingsStack,
        Play: PlayStack
    },
    {
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                if (routeName === 'Home') {
                    iconName = 'ios-home';
                } else if (routeName === 'Songs') {
                    iconName = 'ios-archive';
                } else if (routeName === 'Play'){
                    iconName = 'ios-musical-notes';
                }
                return <Ionicons name={iconName} size={25} color={tintColor} />;
            },
        }),
        tabBarPosition: 'bottom',
        tabBarOptions: {
            activeTintColor: '#336699',
            inactiveTintColor: 'gray',
        },
        animationEnabled: true,
        swipeEnabled: true,
    }
);

const styles = StyleSheet.create({
    pillimage: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        marginTop: '15%',
        width: '100%',
        height: '70%'
    },
    buttonBorder: {
        paddingTop: 30,
        paddingLeft: 50,
        paddingRight: 50,
        paddingBottom: 10
    },
    button: {
        borderRadius: 20,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 50,
        paddingRight: 50,
        backgroundColor: '#FFFFFF',
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOpacity: 1,
        elevation: 4,
        shadowRadius: 10 ,
        shadowOffset : { width: 0.5, height: 13},
    },
    baby: {
        flex: 1,
        backgroundColor: '#38b6ff',
        width: '100%',
        height: '100%'
    },
    recordings: {
        flex: 1,
        backgroundColor: '#38b6ff',
        width: '100%',
        height: '90%'
    },
    header: {
        backgroundColor: '#336699',
    },
    form: {
        flex: 1,
        justifyContent: 'space-between',
    },
    description: {
        fontSize: 24,
        color: 'white',
        textAlign: 'center'
    },
    input: {
        margin: 20,
        marginBottom: 0,
        height: 40,
        paddingHorizontal: 10,
        borderRadius: 4,
        borderColor: '#ccc',
        borderWidth: 1,
        fontSize: 16,
    },
    legal: {
        paddingTop: 5,
        margin: 10,
        color: '#696969',
        fontSize: 16,
        textAlign: 'center',
        paddingBottom: 10
    },
    headerviewStyle: {
        backgroundColor: '#336699',
        justifyContent: 'center',
        alignItems: 'center',
        height: 70,
        paddingTop: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        elevation: 5,
        position: 'relative'
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    camera: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    bottom: {
        width: Dimensions.get('window').width,
        position: 'absolute',
        flexDirection: 'row',
        bottom: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    take: {
        width:80,
        height: 80,
    },
    rebase: {
        position: 'absolute',
        right: 10
        // marginRight: 10,
    },
    rebaseImage: {
        width: 40,
        resizeMode: 'contain'
    },
    headertextStyle: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold'
    },
    headerContentStyle: {
        flexDirection: 'row',
        // justifyContent: 'stretch',
    },
    headerTextStyle: {
        fontSize: 18,
        color: 'grey'
    },
    cardStyle: {	borderBottomWidth: 1,
        padding: 5,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderColor: '#ddd',
        position: 'relative',
        borderRadius: 5},
});