import React from 'react';
import {Text, View, TouchableOpacity, Button, Image, StyleSheet, Dimensions} from 'react-native';
import { Camera, Permissions, FaceDetector, Audio } from 'expo';
import { getPixelRGBA } from 'react-native-get-pixel';
import {Player} from 'react-native-audio-player-recorder-no-linking';
import C3 from './sounds/c3.mp3'
import D3 from './sounds/d3.mp3'
import E3 from './sounds/e3.mp3'
import F3 from './sounds/f3.mp3'
import G3 from './sounds/g3.mp3'
import C_LOW from './sounds/lowcmajor.mp3';
import F_MAJ from './sounds/fmajor.mp3';
import G_MAJ from './sounds/gmajor.mp3';
import A_MIN from './sounds/aminor.mp3';
import C_HIGH from './sounds/highcmajor.mp3';

import SongHolder from './components/SongHolder';

var faceLocations = [];
var sounds1 =[G3, F3, E3, D3, C3];
var sounds2 = [C_HIGH, A_MIN, G_MAJ, F_MAJ, C_LOW];
var soundNum = 0;
var numSeen = 0;
var sounds = [sounds1, sounds2];
var num = 5;

export function getsoundNum() {
    return soundNum;
}



export default class CameraScreen extends React.Component {
    state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
        image: null,
        faces: 0,
        recording: false
    };

    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        await Audio.setIsEnabledAsync(true);
        this.snap();
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    snap = async () => {
        if (this.camera) {
            let photo = await this.camera.takePictureAsync({base64: true, quality: 0, exif: true});
            console.log(photo);
            // this.setState({image: photo});
            setTimeout(this.snap, 0);
        }
    };

    test = (faceData) => {
        console.log(faceData);
    };

    resetImage = () => {
        this.setState({
            image: null
        })
    };

    async playSound(note) {
        try {
            console.log(note);
            const soundObject = new Expo.Audio.Sound();
            await soundObject.loadAsync(sounds[soundNum][note]);
            // if (note === 0) {
            //     await soundObject.loadAsync(require('./sounds/c3.mp3'));
            // } else if (note === 1) {
            //     await soundObject.loadAsync(require('./sounds/d3.mp3'));
            // } else if (note === 2) {
            //     await soundObject.loadAsync(require('./sounds/e3.mp3'));
            // } else if (note === 3) {
            //     await soundObject.loadAsync(require('./sounds/f3.mp3'));
            // } else {
            //     await soundObject.loadAsync(require('./sounds/g3.mp3'));
            // }
            { shouldPlay: true }

            this.audioPlayer6  = soundObject;

            this.audioPlayer6.playAsync();

            this.audioPlayer6.setPositionAsync(0);
        } catch(err) {
            console.log(err);
        }
    }

    writeToSongHolder(note) {
        var d = new Date();
        d.getHours(); // => 9
        d.getMinutes(); // =>  30
        d.getSeconds(); // => 51
    }


    handlePlay = async (faceData) => {
        if (this.state.faces === num) {
            numSeen = faceData.faces.length;
            if (faceData.faces.length === num) {
                faceLocations = faceData.faces.map(face => face.bounds.origin);
            }
            if (faceData.faces.length < num) {
                try {
                    faceLocations.forEach(location => {
                        if (faceData.faces.filter(face => {
                                return Math.abs(location.x - face.bounds.origin.x) <= 20
                            }).length === 0) {
                            var numSmaller = 0;
                            faceLocations.forEach(compareToLocation => {
                                if (location.x > compareToLocation.x) {
                                    numSmaller += 1;
                                }
                            });
                            SongHolder.writeNote(numSmaller);
                            this.playSound(numSmaller);

                        }
                    });
                    faceLocations = [];
                    this.setState({
                        faces: faceData.faces.length
                    });

                } catch (error) {
                    console.log(error);
                }
            } else {

            }
        } else if (faceData.faces.length > this.state.faces) {
            this.setState({
                faces: faceData.faces.length
            })
        }
    }

    incrementSounds = () => {
        soundNum = (soundNum + 1) % sounds.length
    };

    toggleRecord = () => {
        this.setState({
            recording: !this.state.recording
        })
        SongHolder.toggleRecord();
    }

    render() {
        // return <TabNavigation/>
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <Camera ref={ref => {this.camera = ref; }} style={{ flex: 1 }}
                            type={this.state.type}
                            options={{base64: true, quality: 0.5, exif: true}}
                            onFacesDetected={a => this.handlePlay(a)}
                            faceDetectorSettings={{
                                mode: FaceDetector.Constants.Mode.fast,
                                detectLandmarks: FaceDetector.Constants.Mode.none,
                                runClassifications: FaceDetector.Constants.Mode.none
                            }}

                    >
                        <View
                            style={{
                                flex: 1,
                                backgroundColor: 'transparent',
                                flexDirection: 'row',
                            }}>
                            <TouchableOpacity
                                style={{
                                    flex: 0.1,
                                    alignSelf: 'flex-end',
                                    alignItems: 'center',
                                }}
                                onPress={() => {
                                    this.setState({
                                        type: this.state.type === Camera.Constants.Type.back
                                            ? Camera.Constants.Type.front
                                            : Camera.Constants.Type.back,
                                    });
                                }}>
                                {/*<Text*/}
                                    {/*style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>*/}
                                    {/*{' '}Flip{' '}*/}
                                {/*</Text>*/}
                            </TouchableOpacity>
                        </View>
                    </Camera>
                    <View style={{backgroundColor: this.state.faces === num ? "green" : "red"}}><Text/></View>
                    <View style={{position: 'absolute', bottom: '3%', left: '1%', display: 'flex', flexDirection: 'row'}}>
                        <View style={styles.buttonBorder}>
                            <TouchableOpacity style={styles.button}>
                                <Button onPress={this.toggleRecord}
                                        title={this.state.recording ? "Stop Recording" : "Start Recording"}/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.buttonBorder}>
                            <TouchableOpacity style={styles.button}>
                                <Button onPress={this.incrementSounds}
                                        style={{position: 'relative', left: '50%', top: 10}}
                                        title={"Change sounds"}/>
                            </TouchableOpacity>
                        </View>


                    </View>
                </View>
            );
        }
    }
}

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
        paddingRight: 5
    },
    button: {
        borderRadius: 20,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 20,
        paddingRight: 20,
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