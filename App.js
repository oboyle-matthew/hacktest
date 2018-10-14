import React from 'react';
import { Text, View, TouchableOpacity, Button, Image } from 'react-native';
import { Camera, Permissions, FaceDetector, Audio } from 'expo';
import { getPixelRGBA } from 'react-native-get-pixel';
import {Player} from 'react-native-audio-player-recorder-no-linking';

// import image from "./assets/splash.png";

var faceLocations = [];

export default class App extends React.Component {
    state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
        image: null,
        faces: 0,
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

    playSound = async (note) => {

    }

    handlePlay = async (faceData) => {

        var num = 5;
        const soundObject = new Expo.Audio.Sound();
        // console.log(faceData.faces.length);
        if (this.state.faces === num) {
            if (faceData.faces.length === num) {
                faceLocations = faceData.faces.map(face => face.bounds.origin);
            }
            if (faceData.faces.length < num) {
                try {
                    faceLocations.forEach((location, index) => {
                        if (faceData.faces.filter(face => {
                            return Math.abs(location.x - face.bounds.origin.x) <= 5
                        }).length === 0) {
                            var numSmaller = 0;
                            faceLocations.forEach(compareToLocation => {
                                if (location.x > compareToLocation.x) {
                                    numSmaller += 1;
                                }
                            });
                            console.log(numSmaller);
                        }
                    });
                    faceLocations = [];
                    this.setState({
                        faces: faceData.faces.length
                    });
                    // var num = faceData.faces[0].faceID;
                    await soundObject.loadAsync(require('./sounds/test1.mp3'));

                    // (num % 2 === 0) ? await soundObject.loadAsync(require('./sounds/test0.wav')) : await soundObject.loadAsync(require('./sounds/test1.mp3'));

                    { shouldPlay: true }

                    this.audioPlayer6  = soundObject;

                    this.audioPlayer6.playAsync();

                    this.audioPlayer6.setPositionAsync(0);

                    // this.audioPlayer6.setRateAsync(num*4, false);

                    // Your sound is playing!

                } catch (error) {
                    console.log(error);
                    // An error occurred!
                }
            } else {

            }
        } else if (faceData.faces.length > this.state.faces) {
            this.setState({
                faces: faceData.faces.length
            })
        }
    }

    render() {
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        } else {
            return (
                <View style={{ flex: 1 }}>
                    {this.state.image === null &&
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
                                <Text
                                    style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                                    {' '}Flip{' '}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </Camera>}
                    {/*<Player*/}
                        {/*style={{ flex: 1 }}*/}
                        {/*onComplete={() => console.log("COMPLETE")}*/}
                        {/*completeButtonText={'Return Home'}*/}
                        {/*uri={'http://www.hochmuth.com/mp3/Haydn_Cello_Concerto_D-1.mp3'}*/}
                        {/*showTimeStamp={true}*/}
                        {/*showDebug={true}*/}
                    {/*/>*/}
                    {/*<Player*/}
                        {/*style={{ flex: 1 }}*/}
                        {/*onComplete={() => console.log("COMPLETE")}*/}
                        {/*completeButtonText={'Return Home'}*/}
                        {/*uri={'https://www.word.today/uploads/word/pronunciation_audio/727/consistent.mp3'}*/}
                        {/*showTimeStamp={true}*/}
                        {/*showDebug={true}*/}
                    {/*/>*/}
                    {this.state.image === null && <Button onPress={this.snap} title={"Snap"}/>}
                    {this.state.image !== null && <Button onPress={this.resetImage} title={"Back To Camera"}/>}
                    {this.state.image !== null && <Image
                        style={{width: 500, height: 500}}
                        source={{uri: this.state.image.uri}}
                    />}
                </View>
            );
        }
    }
}
