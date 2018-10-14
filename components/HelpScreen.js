import React from 'react';
import { StyleSheet, Dimensions, Text, View, TouchableOpacity, Image, Button, StatusBar, KeyboardAvoidingView, Keyboard, TextInput } from 'react-native';

export default class HelpScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = { number: '' };
    }

    render() {

        return(
            <View style={styles.baby}>
                <StatusBar barStyle="light-content" />
                <View style={styles.header}>
                    <Text style={styles.description}>
                        Welcome to Pocket Pills
                    </Text>
                </View>

                <View style = {styles.pillimage}>
                    <Image style={styles.stretch} source={require('../assets/splash.png')} />
                </View>

                <KeyboardAvoidingView behavior="padding" style={styles.form}>

                    <TextInput
                        style={styles.input}
                        value={this.state.number}
                        onChangeText={number => this.setState({number})}
                        ref={ref => {this._numberInput = ref}}
                        placeholder="Enter your phone number"
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="numeric"
                        returnKeyType="send"
                        //onEndEditing={this._submit}
                        blurOnSubmit={true}
                    />
                    <View style={styles.buttonBorder}>
                        <TouchableOpacity style={styles.button}>
                            <Button title="Let's Get Started!"  color="#336699"
                                    onPress={ () => {
                                        Keyboard.dismiss();
                                        this.props.navigation.navigate('Medications');
                                    }}
                            />
                        </TouchableOpacity>
                        <Text style={styles.legal}>
                            We will text to remind you when it's time to take your pills!
                        </Text>

                    </View>
                </KeyboardAvoidingView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    pillimage: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    stretch: {
        width: 100,
        height: 100
    },
    buttonBorder: {
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
        backgroundColor: '#ecf0f1'
    },
    header: {
        paddingTop: 100,
        padding: 20,
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
        // justifyContent: 'center'
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