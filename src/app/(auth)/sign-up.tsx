import { Keyboard, Pressable, StyleSheet, View } from 'react-native';
import React, { useRef, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { insets } from '@/src/hooks';
import { Button, Input, KeyboardContainer, Text } from '@/src/components';
import { router } from 'expo-router';
import { AuthRoutesLink } from '@/src/utils/enum';
import { Colors } from '@/src/constants/Colors';
import { messages } from '@/src/utils/password-validate.message';
import { ArrowLeft, Check, Cross } from '@/assets/svg';
import { HStack } from '@/src/components/ui/hstack';
import { useRoute } from '@react-navigation/native';

const validatePassword = (password: string) => {
  return {
    isLengthValid: password.length >= 8 && password.length <= 20,
    hasLowerCase: /[a-z]/.test(password),
    hasUpperCase: /[A-Z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('El nombre es obligatorio'),
  lastName: Yup.string().required('El apellido es obligatorio'),
  email: Yup.string().email('Correo inválido').required('El email es obligatorio'),
  password: Yup.string().required('La contraseña es obligatoria'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), ''], 'Las contraseñas no coinciden')
    .required('Confirmar contraseña es obligatorio'),
});

export default function SignUp() {
  const { top, bottom } = insets();
  const [loading, setLoading] = useState(false);
  
  const handleRegister = (values: any) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push(AuthRoutesLink.ADDITIONAL_INFO);
    }, 2000);
  };


  return (
    <View style={{ paddingTop: top }} className="flex-1 bg-black">
      <KeyboardContainer>
        <View className="h-[15%] justify-center items-center">
          <View className="w-16 h-16 bg-white rounded-full" />
        </View>

        <View className="mb-[50px] bg-white rounded-tl-[60px] p-6">
          <Text color={Colors.BLACK} textAlign="center" fontSize={32}>
            Registro
          </Text>

          <Formik
            initialValues={{ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }}
            validationSchema={validationSchema}
            onSubmit={handleRegister}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => {
              const validations = validatePassword(values.password);
              const isPasswordEqual = values.password === values.confirmPassword;
              return (
                <View className="mt-8 gap-8 pb-8">
                  <Input
                    label="Nombre"
                    value={values.firstName}
                    onBlur={handleBlur('firstName')}
                    onChangeText={handleChange('firstName')}
                    placeholder=""
                    error={touched.firstName && errors.firstName ? errors.firstName : ''}
                    touched={touched.firstName}
                  />
                  <Input
                    label="Apellido"
                    value={values.lastName}
                    onBlur={handleBlur('lastName')}
                    onChangeText={handleChange('lastName')}
                    placeholder=""
                    error={touched.lastName && errors.lastName ? errors.lastName : ''}
                    touched={touched.lastName}
                  />
                  <Input
                    label="Email"
                    value={values.email}
                    onBlur={handleBlur('email')}
                    onChangeText={handleChange('email')}
                    placeholder=""
                    keyboardType="email-address"
                    error={touched.email && errors.email ? errors.email : ''}
                    touched={touched.email}
                  />
                  <Input
                    label="Contraseña"
                    value={values.password}
                    onBlur={handleBlur('password')}
                    onChangeText={handleChange('password')}
                    placeholder=""
                    secureTextEntry={true}
                    rightIcon
                    error={touched.password && errors.password ? errors.password : ''}
                    touched={touched.password}
                  />
                  <Input
                    label="Confirmar contraseña"
                    value={values.confirmPassword}
                    onBlur={handleBlur('confirmPassword')}
                    onChangeText={handleChange('confirmPassword')}
                    placeholder=""
                    secureTextEntry={true}
                    rightIcon
                    error={touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : ''}
                    touched={touched.confirmPassword}
                  />
                  <View>
                    {Object.entries(validations).map(([key, isValid]) => (
                      <View key={key} className="flex-row items-center gap-2">
                        {isValid === null ? (
                          <Text className="text-gray-500">●</Text>
                        ) : isValid ? (
                          <Check width={16} height={16} color={Colors.BLACK} />
                        ) : (
                          <Cross width={16} height={16} color={Colors.BLACK} />
                        )}

                        <Text style={[styles.text]} fontWeight={300}>
                          {messages[key as keyof typeof messages]}
                        </Text>
                      </View>
                    ))}

                    <View className="flex-row items-center gap-2">
                      {isPasswordEqual === null ? (
                        <Text className="text-gray-500">●</Text>
                      ) : isPasswordEqual ? (
                        <Check width={16} height={16} color={Colors.BLACK} />
                      ) : (
                        <Cross width={16} height={16} color={Colors.BLACK} />
                      )}

                      <Text style={[styles.text]} fontWeight={300}>
                        {messages.passwordEqual}
                      </Text>
                    </View>
                  </View>
                  <View style={{ paddingBottom: bottom }} className="gap-4 mt-8">
                    <HStack className="flex-1 gap-2">
                      <Button onPress={() => router.back()}>
                        <ArrowLeft color={Colors.WHITE} />
                      </Button>
                      {/* <Button onPress={() => handleSubmit()} flex={true} loading={loading} submit> */}
                      <Button
                        onPress={() => router.push(AuthRoutesLink.ADDITIONAL_INFO)}
                        flex={true}
                        loading={loading}
                        submit
                      >
                        Registrarse
                      </Button>
                    </HStack>
                    <Pressable className="items-center justify-end">
                      <Text fontWeight={400}>
                        Ya tenes cuenta?{' '}
                        <Text fontWeight={600} onPress={() => router.push(AuthRoutesLink.SIGN_IN)}>
                          Inicia Sesión
                        </Text>
                      </Text>
                    </Pressable>
                  </View>
                </View>
              );
            }}
          </Formik>
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
