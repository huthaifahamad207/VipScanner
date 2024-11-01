import React, {useContext, useState} from 'react';
import {View, Text, TouchableOpacity, Alert, StyleSheet} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import {UserContext} from './UserContext';

const MangeUserQrScreen = ({navigation, route}) => {
  const user = route?.params?.user;
  const [scannedData, setScannedData] = useState('');
  const [overlayColor, setOverlayColor] = useState();
  const {users} = useContext(UserContext);
  const mode = route?.params?.mode;

  const handleBarCodeRead = e => {
    if (e.data !== scannedData) {
      setScannedData(e.data);

      if (mode === 'addUser') {
        navigation.navigate('ManageUserScreen', {
          userId: user.id,
          qrCode: e.data,
        });
      } else if (mode === 'scanUser') {
        const userExists = users.some(user => user.qrCode === e.data);

        if (userExists) {
          setOverlayColor('rgba(0, 255, 0, 0.5)');
          Alert.alert('VIP user', '', [
            {
              text: 'OK',
              onPress: () => {
                setScannedData('');
              },
            },
          ]);
        } else {
          setOverlayColor('rgba(255, 0, 0, 0.5)');
          Alert.alert('Cannot pass', '', [
            {
              text: 'OK',
              onPress: () => {
                setScannedData('');
              },
            },
          ]);
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
        reactivate={true} // Reactivate scanner after successful scan
        reactivateTimeout={2000} // Optional: set a delay before reactivation
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
          <View style={styles.clearArea}>
            <View style={styles.topLeftCorner} />
            <View style={styles.topRightCorner} />
            <View style={styles.bottomLeftCorner} />
            <View style={styles.bottomRightCorner} />
          </View>
          <View
            style={[styles.rightOverlay, {backgroundColor: overlayColor}]}
          />
        </View>
        <View style={[styles.bottomOverlay, {backgroundColor: overlayColor}]} />
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
    backgroundColor: 'rgba(128, 128, 128, 0.5)',
  },
  middleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftOverlay: {
    flex: 1,
    backgroundColor: 'rgba(128, 128, 128, 0.5)',
  },
  clearArea: {
    width: 300,
    height: 400,
    position: 'relative',
  },
  topLeftCorner: {
    position: 'absolute',
    top: 70,
    left: 0,
    width: 30,
    height: 30,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderColor: 'white',
    borderTopLeftRadius: 15,
  },
  topRightCorner: {
    position: 'absolute',
    top: 70,
    right: 0,
    width: 30,
    height: 30,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderColor: 'white',
    borderTopRightRadius: 15,
  },
  bottomLeftCorner: {
    position: 'absolute',
    bottom: 70,
    left: 0,
    width: 30,
    height: 30,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderColor: 'white',
    borderBottomLeftRadius: 15,
  },
  bottomRightCorner: {
    position: 'absolute',
    bottom: 70,
    right: 0,
    width: 30,
    height: 30,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderColor: 'white',
    borderBottomRightRadius: 15,
  },
  rightOverlay: {
    flex: 1,
    backgroundColor: 'rgba(128, 128, 128, 0.5)',
  },
  bottomOverlay: {
    flex: 1,
    backgroundColor: 'rgba(128, 128, 128, 0.5)',
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

export default MangeUserQrScreen;
