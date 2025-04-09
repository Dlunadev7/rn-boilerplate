import { useState } from 'react';
import * as Location from 'expo-location';
import { Alert, Linking } from 'react-native';

export function useLocationPermission() {
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);

  const requestLocation = async () => {
    setLoading(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === 'denied') {
        Alert.alert(
          'Permiso denegado',
          'Necesitamos acceso a la ubicación para continuar. Puedes activarlo en la configuración.',
          [
            { text: 'Cancelar', style: 'cancel' },
            { text: 'Ir a configuración', onPress: () => Linking.openSettings() },
          ]
        );
        setLoading(false);
        return;
      }

      if (status === 'granted') {
        const currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);
        return currentLocation;
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo obtener la ubicación.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { location, requestLocation, loading };
}
