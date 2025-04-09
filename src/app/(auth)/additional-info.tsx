import { Pressable, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { insets, useLocationPermission } from '@/src/hooks';
import { Button, Input, KeyboardContainer, PhoneNumber, Text } from '@/src/components';
import { router } from 'expo-router';
import { AuthRoutesLink } from '@/src/utils/enum';
import { HStack } from '@/src/components/ui/hstack';
import { VStack } from '@/src/components/ui/vstack';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { formatDate } from '@/src/helpers';
import { Location } from '@/assets/svg';
import { Colors } from '@/src/constants/Colors';
import { useGlobalContext } from '@/src/context/global.context';

const validationSchema = Yup.object().shape({
  phoneNumber: Yup.string().required('El número de teléfono es obligatorio'),
  address: Yup.string().required('El domicilio es obligatorio'),
  birthdate: Yup.string()
    .matches(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/, 'Formato inválido (DD/MM/YYYY)')
    .test('isValidDate', 'Fecha inválida', (value) => {
      if (!value) return false;

      const [day, month, year] = value.split('/').map(Number);
      const date = new Date(year, month - 1, day);

      // Validar si el mes/día existen realmente
      if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) {
        return false;
      }

      // No permitir fechas futuras
      if (date > new Date()) {
        return false;
      }

      // Validar años bisiestos (29/02 solo en años bisiestos)
      if (month === 2 && day === 29) {
        if (!(year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0))) {
          return false;
        }
      }

      return true;
    })
    .test('isAdult', 'Debes ser mayor de 18 años', (value) => {
      if (!value) return false;

      const [day, month, year] = value.split('/').map(Number);
      const birthDate = new Date(year, month - 1, day);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();

      if (
        age < 18 ||
        (age === 18 && today.getMonth() < birthDate.getMonth()) ||
        (age === 18 && today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())
      ) {
        return false;
      }

      return true;
    }),
});

export default function SignUp() {
  const { top, bottom } = insets();
  const { requestLocation, selectedAddress } = useGlobalContext();

  const handlePress = async () => {
    const location = await requestLocation();

    if (location) {
      router.push(AuthRoutesLink.MAP);
    }
  };

  return (
    <View style={{ paddingTop: top }} className="flex-1 bg-black">
      <KeyboardContainer>
        <HStack className="h-[15%] justify-center items-center">
          <View className="w-16 h-16 bg-white rounded-full" />
        </HStack>

        <View className="flex-1 bg-white rounded-tl-[60px] p-6">
          <VStack className="gap-3 items-center">
            <Text textAlign="center" fontSize={32}>
              Completa tu perfil
            </Text>
            <Text textAlign="center">
              Agrega algunos detalles adicionales para personalizar tu experiencia en la app.
            </Text>
          </VStack>

          <View className="mt-8 gap-4 pb-8">
            <Formik
              initialValues={{ phoneNumber: '', address: '', birthdate: '', code: '54' }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                router.push(AuthRoutesLink.PASSWORD_SUCCESS);
              }}
              validateOnChange
            >
              {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => {
                useEffect(() => {
                  if (selectedAddress) {
                    setFieldValue('address', selectedAddress.address);
                  }

                  console.log(selectedAddress);
                }, [selectedAddress, setFieldValue]);

                return (
                  <View className="gap-8">
                    <PhoneNumber
                      value={values.phoneNumber}
                      error={touched.phoneNumber ? errors.phoneNumber : ''}
                      onBlur={handleBlur('phoneNumber')}
                      onChangeText={(text) => {
                        // Filtrar solo números y limitar a 10 dígitos
                        const numericText = text.replace(/[^0-9]/g, '').slice(0, 10);
                        handleChange('phoneNumber')(numericText);
                      }}
                      placeholder="Ingrese su número"
                      phoneNumber="+54"
                      handleChangeCode={handleChange('code')}
                      touched={touched.phoneNumber}
                    />

                    <VStack className="gap-4">
                      <Input
                        label="Domicilio"
                        value={values.address}
                        error={touched.address ? errors.address : ''}
                        onBlur={handleBlur('address')}
                        onChangeText={handleChange('address')}
                        placeholder="Ingrese su domicilio"
                        touched={touched.address}
                        multiline={values.address.length > 1}
                        style={{ paddingTop: 8 }}
                      />
                      <Pressable className="items-center flex-row gap-1" onPress={handlePress}>
                        <Location color={Colors.BLACK} width={14} height={14} />
                        <Text fontSize={12} underline>
                          Elegir ubicación en el mapa
                        </Text>
                      </Pressable>
                    </VStack>

                    <Input
                      label="Fecha de cumpleaños"
                      value={values.birthdate}
                      error={touched.birthdate ? errors.birthdate : ''}
                      onBlur={handleBlur('birthdate')}
                      onChangeText={(text) => setFieldValue('birthdate', formatDate(text))}
                      placeholder="DD/MM/YYYY"
                      keyboardType="number-pad"
                      touched={touched.birthdate}
                      maxLength={10}
                    />

                    <View style={{ paddingBottom: bottom }} className="mt-8">
                      <Button onPress={() => handleSubmit()} stretch submit>
                        Continuar
                      </Button>
                    </View>
                  </View>
                );
              }}
            </Formik>
          </View>
        </View>
      </KeyboardContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    marginVertical: 2,
  },
});
