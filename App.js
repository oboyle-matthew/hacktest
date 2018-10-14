import React from 'react';
import { Text, View, TouchableOpacity, Button, Image } from 'react-native';
import { Camera, Permissions, FaceDetector, Audio } from 'expo';
import { getPixelRGBA } from 'react-native-get-pixel';
import {Player} from 'react-native-audio-player-recorder-no-linking';
import C3 from './sounds/c3.mp3'
import D3 from './sounds/d3.mp3'
import E3 from './sounds/e3.mp3'
import F3 from './sounds/f3.mp3'
import G3 from './sounds/g3.mp3'
// import image from "./assets/splash.png";
import TabNavigation from './components/TabNavigator';

var faceLocations = [];
var currSounds =[C3, D3, E3, F3, G3];

export default class App extends React.Component {
    state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
        image: null,
        faces: 0,
    };

    // async componentWillMount() {
    //     const { status } = await Permissions.askAsync(Permissions.CAMERA);
    //     await Audio.setIsEnabledAsync(true);
    //     this.setState({ hasCameraPermission: status === 'granted' });
    // }
    //
    // snap = async () => {
    //     if (this.camera) {
    //         let photo = await this.camera.takePictureAsync({base64: true, quality: 0, exif: true});
    //         console.log(photo);
    //         // this.setState({image: photo});
    //         setTimeout(this.snap, 0);
    //     }
    // };
    //
    // test = (faceData) => {
    //     console.log(faceData);
    // };
    //
    // resetImage = () => {
    //     this.setState({
    //         image: null
    //     })
    // };
    //
    // async playSound(note) {
    //     try {
    //         console.log(note);
    //         const soundObject = new Expo.Audio.Sound();
    //         if (note === 0) {
    //             await soundObject.loadAsync(require('./sounds/c3.mp3'));
    //         } else if (note === 1) {
    //             await soundObject.loadAsync(require('./sounds/d3.mp3'));
    //         } else if (note === 2) {
    //             await soundObject.loadAsync(require('./sounds/e3.mp3'));
    //         } else if (note === 3) {
    //             await soundObject.loadAsync(require('./sounds/f3.mp3'));
    //         } else {
    //             await soundObject.loadAsync(require('./sounds/g3.mp3'));
    //         }
    //         { shouldPlay: true }
    //
    //         this.audioPlayer6  = soundObject;
    //
    //         this.audioPlayer6.playAsync();
    //
    //         this.audioPlayer6.setPositionAsync(0);
    //     } catch(err) {
    //         console.log(err);
    //     }
    //
    //
    // }
    //
    //
    // handlePlay = async (faceData) => {
    //     // console.log(faceData.faces.length);
    //
    //     var num = 4;
    //     // console.log(faceData.faces.length);
    //     if (this.state.faces === num) {
    //         if (faceData.faces.length === num) {
    //             faceLocations = faceData.faces.map(face => face.bounds.origin);
    //         }
    //         if (faceData.faces.length < num) {
    //             try {
    //                 faceLocations.forEach(location => {
    //                     if (faceData.faces.filter(face => {
    //                         return Math.abs(location.x - face.bounds.origin.x) <= 20
    //                     }).length === 0) {
    //                         var numSmaller = 0;
    //                         faceLocations.forEach(compareToLocation => {
    //                             if (location.x > compareToLocation.x) {
    //                                 numSmaller += 1;
    //                             }
    //                         });
    //                         this.playSound(numSmaller);
    //                     }
    //                 });
    //                 faceLocations = [];
    //                 this.setState({
    //                     faces: faceData.faces.length
    //                 });
    //
    //             } catch (error) {
    //                 console.log(error);
    //             }
    //         } else {
    //
    //         }
    //     } else if (faceData.faces.length > this.state.faces) {
    //         this.setState({
    //             faces: faceData.faces.length
    //         })
    //     }
    // }

    render() {
        return <TabNavigation/>
        // const { hasCameraPermission } = this.state;
        // if (hasCameraPermission === null) {
        //     return <View />;
        // } else if (hasCameraPermission === false) {
        //     return <Text>No access to camera</Text>;
        // } else {
        //     return (
        //         <View style={{ flex: 1 }}>
        //             {this.state.image === null &&
        //             <Camera ref={ref => {this.camera = ref; }} style={{ flex: 1 }}
        //                     type={this.state.type}
        //                     options={{base64: true, quality: 0.5, exif: true}}
        //                     onFacesDetected={a => this.handlePlay(a)}
        //                     faceDetectorSettings={{
        //                         mode: FaceDetector.Constants.Mode.fast,
        //                         detectLandmarks: FaceDetector.Constants.Mode.none,
        //                         runClassifications: FaceDetector.Constants.Mode.none
        //                     }}
        //
        //             >
        //                 <View
        //                     style={{
        //                         flex: 1,
        //                         backgroundColor: 'transparent',
        //                         flexDirection: 'row',
        //                     }}>
        //                     <TouchableOpacity
        //                         style={{
        //                             flex: 0.1,
        //                             alignSelf: 'flex-end',
        //                             alignItems: 'center',
        //                         }}
        //                         onPress={() => {
        //                             this.setState({
        //                                 type: this.state.type === Camera.Constants.Type.back
        //                                     ? Camera.Constants.Type.front
        //                                     : Camera.Constants.Type.back,
        //                             });
        //                         }}>
        //                         <Text
        //                             style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
        //                             {' '}Flip{' '}
        //                         </Text>
        //                     </TouchableOpacity>
        //                 </View>
        //             </Camera>}
        //             {this.state.image === null && <Button onPress={this.snap} title={"Snap"}/>}
        //             {this.state.image !== null && <Button onPress={this.resetImage} title={"Back To Camera"}/>}
        //             {this.state.image !== null && <Image
        //                 style={{width: 500, height: 500}}
        //                 source={{uri: this.state.image.uri}}
        //             />}
        //         </View>
        //     );
        // }
    }
}