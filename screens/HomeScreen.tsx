import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Spinner from 'react-native-loading-spinner-overlay';

const HomeScreen = ({navigation}) => {
  const [loading, setLoading] = useState(false);

  const handleNavigationWithDelay = screen => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate(screen);
    }, 3000);
  };

  const handelScannerPressed = () => {
    navigation.navigate('MangeUserQrScreen', {mode: 'scanUser'});
  };

  const handelMangeUserPressed = () => {
    handleNavigationWithDelay('ManageUserScreen');
  };

  return (
    <LinearGradient colors={['#808080', '#FFFFFF']} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>VIP Pass</Text>
      </View>

      {loading ? (
        <Spinner
          visible={loading}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
      ) : (
        <>
          <TouchableOpacity
            style={styles.qrContainer}
            onPress={handelScannerPressed}>
            <Image
              style={styles.qrImage}
              source={require('../src/assets/images/qr.png')}
            />
            <Text style={styles.buttonText}>Check VIP</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.qrContainer}
            onPress={handelMangeUserPressed}>
            <Image
              style={styles.qrImage}
              source={require('../src/assets/images/avatar.png')}
            />
            <Text style={styles.buttonText}>Manage Users</Text>
          </TouchableOpacity>
        </>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    marginVertical: 20,
  },
  headerText: {
    fontSize: 32,
    fontWeight: '500',
    color: '#333',
  },
  qrContainer: {
    backgroundColor: '#FAFAFA',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginVertical: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: 'black',
    textAlign: 'center',
  },
  qrImage: {
    width: 200,
    height: 150,
    resizeMode: 'contain',
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
});

export default HomeScreen;
