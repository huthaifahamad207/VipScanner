import React, {createContext, useEffect, useState} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import {AppState} from 'react-native';

export const UserContext = createContext();

export const UserProvider = ({children}) => {
  const [users, setUsers] = useState([
    {
      id: '1',
      name: 'Eihab',
      avatar: require('../src/assets/images/avatar.png'),
      qrCode: 'nod://app/give/410a-9f8e-b63a4194f7d3',
    },
    {
      id: '2',
      name: 'Huthaifa',
      avatar: require('../src/assets/images/avatar.png'),
      qrCode: 'nod://app/give/4cf4-af0c-510fb8605c9e',
    },
    {
      id: '3',
      name: 'Maen',
      avatar: require('../src/assets/images/avatar.png'),
      qrCode: 'nod://app/give/413a-abbf-ae87c0efea31',
    },
  ]);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const stringifiedList = await EncryptedStorage.getItem('store');
        if (stringifiedList) {
          const retrievedStore = JSON.parse(stringifiedList);
          setUsers(retrievedStore);
          console.log('Users loaded from encrypted storage');
        }
      } catch (error) {
        console.error('Failed to load users from encrypted storage', error);
      }
    };

    loadUsers();
  }, []);

  useEffect(() => {
    const saveUsers = async () => {
      try {
        await EncryptedStorage.setItem('store', JSON.stringify(users));
        console.log('Users saved to encrypted storage');
      } catch (error) {
        console.error('Failed to save users to encrypted storage', error);
      }
    };

    saveUsers();
  }, [users]);

  useEffect(() => {
    const handleAppStateChange = nextAppState => {
      if (nextAppState === 'background' || nextAppState === 'inactive') {
        console.log('App going to background or inactive, saving users');
        EncryptedStorage.setItem('store', JSON.stringify(users))
          .then(() =>
            console.log('Users saved to encrypted storage on app state change'),
          )
          .catch(error =>
            console.error('Failed to save users on app state change', error),
          );
      }
    };

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => {
      subscription.remove();
    };
  }, [users]);

  return (
    <UserContext.Provider value={{users, setUsers}}>
      {children}
    </UserContext.Provider>
  );
};
