import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {UserContext} from './UserContext';
import AddIcon from '../src/assets/Icons/AddIcon';
import ArrowDown from '../src/assets/Icons/ArrowDown';
import ArrowUp from '../src/assets/Icons/ArrowUp';
import ArrowBack from '../src/assets/Icons/ArrowBack';

const ManageUserScreen = ({navigation, route}) => {
  const {users, setUsers} = useContext(UserContext);

  const [userName, setUserName] = useState('');
  const [showAddUser, setShowAddUser] = useState(false);

  useEffect(() => {
    if (route.params?.qrCode && route.params?.userId) {
      const updatedUsers = users.map(user =>
        user.id === route.params.userId
          ? {...user, qrCode: route.params.qrCode}
          : user,
      );
      setUsers(updatedUsers);
    }
  }, [route.params?.qrCode, route.params?.userId]);

  const addUser = () => {
    if (userName.trim()) {
      const newUser = {
        id: Date.now().toString(),
        name: userName.trim(),
        avatar: require('../src/assets/images/avatar.png'),
        qrCode: '',
      };
      setUsers([...users, newUser]);
      setUserName('');
      setShowAddUser(false);
      navigation.navigate('MangeUserQrScreen', {
        user: newUser,
        mode: 'addUser',
      });
    }
  };

  const deleteUser = id => {
    Alert.alert('Delete User', 'Are you sure you want to delete this user?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'OK',
        onPress: () => setUsers(users.filter(user => user.id !== id)),
      },
    ]);
  };

  return (
    <LinearGradient colors={['#808080', '#FFFFFF']} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{paddingLeft: 12}}>
          <ArrowBack />
        </TouchableOpacity>
        <Text style={styles.headerText}>Manage Users</Text>
        <View />
        <View />
      </View>

      <View style={styles.collapsibleContainer}>
        <TouchableOpacity
          style={styles.addButtonContainer}
          onPress={() => setShowAddUser(!showAddUser)}>
          <View style={styles.addButtonContent}>
            <View style={styles.addButtonIconTextContainer}>
              <AddIcon width={24} height={24} />
              <Text style={styles.addButtonText}>Add User</Text>
            </View>
            <View style={styles.arrowIconContainer}>
              {!showAddUser ? (
                <ArrowDown width={32} height={32} />
              ) : (
                <ArrowUp width={32} height={32} />
              )}
            </View>
          </View>
        </TouchableOpacity>

        {showAddUser && (
          <View style={styles.collapsibleContent}>
            <TextInput
              style={styles.input}
              placeholderTextColor="white"
              placeholder="Enter user name"
              value={userName}
              onChangeText={setUserName}
            />
            <TouchableOpacity style={styles.confirmButton} onPress={addUser}>
              <Text style={styles.confirmButtonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.userListContainer}>
        {users.map(user => (
          <View key={user.id} style={styles.userCard}>
            <View style={{alignItems: 'center'}}>
              <Image style={styles.avatar} source={user.avatar} />
              <Text style={styles.userName}>{user.name}</Text>
            </View>
            <View style={styles.userCardActions}>
              {user.qrCode ? (
                <Text
                  style={{color: '#FAFAFA', fontWeight: 'bold', marginTop: 10}}>
                  Scan QR Code
                </Text>
              ) : (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('MangeUserQrScreen', {user})
                  }
                  style={{paddingHorizontal: 12}}>
                  <Text style={styles.scanButtonText}>Scan QR Code</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                onPress={() => deleteUser(user.id)}
                style={{paddingHorizontal: 12}}>
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 36,
  },
  headerText: {
    fontSize: 25,
    fontWeight: '500',
    color: 'black',
  },
  collapsibleContainer: {
    backgroundColor: '#605E6E',
    borderRadius: 25,
    overflow: 'hidden',
    marginBottom: 20,
    marginHorizontal: 12,
  },
  addButtonContainer: {
    paddingVertical: 15,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addButtonContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  addButtonIconTextContainer: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    gap: 12,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  cancelButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    paddingVertical: 2,
  },
  arrowIconContainer: {
    paddingHorizontal: 12,
  },
  collapsibleContent: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
    color: 'white',
  },
  confirmButton: {
    backgroundColor: '#FAFAFA',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  confirmButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  userListContainer: {},
  userCard: {
    backgroundColor: '#FAFAFA',
    marginHorizontal: 12,
    borderRadius: 12,
    alignSelf: 'center',
    paddingVertical: 12,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 15,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  userCardActions: {
    flexDirection: 'row',
    alignContent: 'space-between',
    paddingHorizontal: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scanButtonText: {
    color: '#007BFF',
    fontWeight: 'bold',
    marginTop: 10,
  },
  deleteButtonText: {
    color: 'red',
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default ManageUserScreen;
