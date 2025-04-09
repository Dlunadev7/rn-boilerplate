import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';

type ExtendedLocationObject = Location.LocationObject & {
  address?: string;
};

interface GlobalContextType {
  userId: string;
  token: string | null;
  refreshToken: string | null;
  location: Location.LocationObject | null;
  selectedAddress: {
    latitude: number;
    longitude: number;
    address: string;
  } | null;
  setSelectedAddress: React.Dispatch<React.SetStateAction<{
    latitude: number;
    longitude: number;
    address: string;
} | null>>;
  setAuthData: (token: string, refreshToken: string) => Promise<void>;
  setLocation: (newLocation: Location.LocationObject) => void;
  requestLocation: () => Promise<Location.LocationObject | null>;
  logout: () => Promise<void>;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<{
    latitude: number;
    longitude: number;
    address: string;
  } | null>(null);

  const userId = 'fake-user-1234';

  useEffect(() => {
    const loadAuthData = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('authToken');
        const storedRefreshToken = await AsyncStorage.getItem('refreshToken');
        if (storedToken && storedRefreshToken) {
          setToken(storedToken);
          setRefreshToken(storedRefreshToken);
        }
      } catch (error) {
        console.error('Error cargando datos de autenticación:', error);
      }
    };

    loadAuthData();
  }, []);

  const setAuthData = async (newToken: string, newRefreshToken: string) => {
    try {
      await AsyncStorage.setItem('authToken', newToken);
      await AsyncStorage.setItem('refreshToken', newRefreshToken);
      setToken(newToken);
      setRefreshToken(newRefreshToken);
    } catch (error) {
      console.error('Error guardando datos de autenticación:', error);
    }
  };

  const requestLocation = async (): Promise<Location.LocationObject | null> => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      return null;
    }

    const currentLocation = await Location.getCurrentPositionAsync({});
    setLocation(currentLocation);
    return currentLocation;
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('authToken');
      await AsyncStorage.removeItem('refreshToken');
      setToken(null);
      setRefreshToken(null);
      setLocation(null);
    } catch (error) {
      console.error('Error durante el cierre de sesión:', error);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        userId,
        token,
        refreshToken,
        location,
        selectedAddress,
        setAuthData,
        setLocation,
        requestLocation,
        logout,
        setSelectedAddress,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalContext debe usarse dentro de un GlobalProvider');
  }
  return context;
};
