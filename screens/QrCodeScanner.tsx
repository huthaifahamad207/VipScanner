import React, {useState, useContext} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import {UserContext} from './UserContext';

const QrCodeScanner = ({navigation, route, mode}) => {
  const [scannedData, setScannedData] = useState('');
  const [overlayColor, setOverlayColor] = useState('rgba(128, 128, 128, 0.5)');
  const {users} = useContext(UserContext);
  const user = route?.params?.user;

  const handleBarCodeRead = e => {
    if (e.data !== scannedData) {
      setScannedData(e.data);

      if (mode === 'manageUser') {
        navigation.navigate('ManageUserScreen', {
          userId: user.id,
          qrCode: e.data,
        });
      } else if (mode === 'scanner') {
        const userExists = users.some(user => user.qrCode === e.data);
        console.log(userExists, ' userExists ');

        if (userExists) {
          setOverlayColor('rgba(0, 255, 0, 0.5)');
          Alert.alert('QR Code Scanned', 'You are a VIP user.');
        } else {
          setOverlayColor('rgba(255, 0, 0, 0.5)');
          Alert.alert('QR Code Scanned', 'You are a regular user.');
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      <QRCodeScanner
        onRead={handleBarCodeRead}
        flashMode={RNCamera.Constants.FlashMode.off}
        cameraStyle={styles.cameraStyle}
        topContent={
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => navigation.goBack()}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
        }
      />
      <View style={styles.overlay}>
        <View style={[styles.topOverlay, {backgroundColor: overlayColor}]} />
        <View style={styles.middleContainer}>
          <View style={[styles.leftOverlay, {backgroundColor: overlayColor}]} />
          <View style={styles.clearArea} />
          <View
            style={[styles.rightOverlay, {backgroundColor: overlayColor}]}
          />
        </View>
        <View style={[styles.bottomOverlay, {backgroundColor: overlayColor}]}>
          <Text style={styles.instructionText}>
            Align QR code within the frame to scan
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    borderRadius: 20,
    padding: 10,
    zIndex: 2,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cameraStyle: {
    height: '100%',
    width: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  topOverlay: {
    flex: 1,
  },
  middleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftOverlay: {
    flex: 1,
  },
  clearArea: {
    width: 250,
    height: 250,
    borderWidth: 4, // Thickness of the frame
    borderColor: 'white',
  },
  rightOverlay: {
    flex: 1,
  },
  bottomOverlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  instructionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    paddingTop: 20,
  },
});

export default QrCodeScanner;
