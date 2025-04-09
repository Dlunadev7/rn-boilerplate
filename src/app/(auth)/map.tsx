import { ArrowLeft, Location } from '@/assets/svg';
import { Button, Input, Text } from '@/src/components';
import { VStack } from '@/src/components/ui/vstack';
import { darkMapStyle } from '@/src/constants/map-theme';
import { useGlobalContext } from '@/src/context/global.context';
import { insets } from '@/src/hooks';
import { View, StyleSheet, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useEffect, useState } from 'react';
import { EXPO_PUBLIC_MAPBOX_KEY, PUBLIC_MAPBOX_API_URL } from '@/config';
import axios from 'axios';
import { Colors } from '@/src/constants/Colors';
import { StatusBar } from 'expo-status-bar';
import { HStack } from '@/src/components/ui/hstack';
import { router } from 'expo-router';
import { AuthRoutesLink } from '@/src/utils/enum';

export default function Map() {
  const { bottom } = insets();
  const { location, setSelectedAddress, selectedAddress } = useGlobalContext();
  const [loading, setLoading] = useState(false);
  const DEFAULT_LATITUDE = -38.0055;
  const DEFAULT_LONGITUDE = -57.5426;

  const [selectedLocation, setSelectedLocation] = useState<{
    latitude: number;
    longitude: number;
    address: string;
  } | null>(null);

  const fetchAddressFromCoordinates = async (latitude: number, longitude: number) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${PUBLIC_MAPBOX_API_URL}/${longitude},${latitude}.json?access_token=${EXPO_PUBLIC_MAPBOX_KEY}`
      );

      const placeName = response.data.features[0].place_name.split(',').slice(0, 3).join(',');
      const address = response.data.features.length > 0 ? placeName : 'Ubicación desconocida';

      const newLocation = { latitude, longitude, address };
      setSelectedLocation(newLocation);
      setSelectedAddress(newLocation);
    } catch (error) {
      const fallbackLocation = { latitude, longitude, address: 'Ubicación no encontrada' };
      setSelectedLocation(fallbackLocation);
      setSelectedAddress(fallbackLocation);
    }
    setLoading(false);
  };

  // Manejar clic en el mapa
  const handleMapPress = (event: any) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    fetchAddressFromCoordinates(latitude, longitude);
    if (location?.coords) {
      setSelectedAddress({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        address: selectedLocation?.address ?? '',
      });
    }
  };

  useEffect(() => {
    if (selectedAddress) {
      fetchAddressFromCoordinates(selectedAddress?.latitude, selectedAddress?.longitude);
    }
    if (location?.coords) {
      fetchAddressFromCoordinates(location.coords.latitude, location.coords.longitude);
      setSelectedAddress({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        address: selectedLocation?.address ?? '',
      });
    }
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <MapView
        // provider={PROVIDER_GOOGLE} //
        style={styles.map}
        customMapStyle={darkMapStyle}
        region={{
          latitude: location?.coords.latitude ?? DEFAULT_LATITUDE,
          longitude: location?.coords.longitude ?? DEFAULT_LONGITUDE,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
        onPress={handleMapPress}
      >
        {(selectedLocation || location?.coords) && (
          <Marker
            coordinate={
              selectedLocation ?? { latitude: location?.coords.latitude!, longitude: location?.coords.longitude! }
            }
            title="Ubicación seleccionada"
          >
            <Image source={require('@/assets/images/gentleman.png')} style={styles.marker} />
          </Marker>
        )}
      </MapView>

      <View style={[styles.actionSheet, { paddingBottom: bottom + 24 }]}>
        <Text fontSize={24} fontWeight={400} className="mb-6">
          Indica tu dirección en el mapa
        </Text>
        <VStack className="gap-5">
          <Input
            label=""
            value={selectedLocation?.address || ''}
            editable={false}
            placeholder="Selecciona una ubicación"
            custom={<Location color={Colors.BLACK} />}
            leftIcon
            onChangeText={() => {}}
            onBlur={() => {}}
            multiline={Boolean(selectedLocation?.address)}
          />
          <HStack className="flex-1 gap-2">
            <Button onPress={() => router.back()}>
              <ArrowLeft color={Colors.WHITE} />
            </Button>
            <Button
              onPress={() => {
                router.dismiss();
                router.replace(AuthRoutesLink.ADDITIONAL_INFO);
              }}
              loading={loading}
              flex
            >
              Aceptar
            </Button>
          </HStack>
        </VStack>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  actionSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    paddingVertical: 28,
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 30,
  },
  marker: { width: 40, height: 40 },
});
