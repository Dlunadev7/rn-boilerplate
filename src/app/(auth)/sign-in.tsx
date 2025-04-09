import { Keyboard, Pressable, View } from 'react-native';
import React, { useState } from 'react';
import { insets } from '@/src/hooks';
import { Text, Input, KeyboardContainer, Button } from '@/src/components';
import { router } from 'expo-router';
import { AuthRoutesLink, TabsRoutesLink } from '@/src/utils/enum';
import { Toast, useToast } from '@/src/components/ui/toast';
import { Formik } from 'formik';
import { validationSchema } from '@/src/utils/schema/auth.schema';
import { HStack } from '@/src/components/ui/hstack';
import { VStack } from '@/src/components/ui/vstack';
import { useGlobalContext } from '@/src/context/global.context';

export default function SignIn() {
  const { top, bottom } = insets();
  const { setAuthData } = useGlobalContext();
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const handleLogin = ({ email, password }: { email: string; password: string }) => {
    setLoading(true);

    // Simulación de inicio de sesión falso
    setTimeout(() => {
      if (email !== 'dluna@gmail.com' || password !== 'Csaomsiala7#') {
        toast.show({
          placement: 'top',
          duration: 3000,
          render: ({ id }) => {
            const uniqueToastId = 'toast-' + id;
            return (
              <Toast className="min-w-[95%] m-auto" nativeID={uniqueToastId} action="error" variant="outline">
                <View>
                  <Text className="text-foreground font-semibold text-lg">Inicio de sesión fallido</Text>
                  <Text className="text-muted-foreground text-sm">Credenciales incorrectas. Intenta nuevamente.</Text>
                </View>
              </Toast>
            );
          },
        });
      } else {
        setAuthData('token', 'refreshtoken');
        router.push(TabsRoutesLink.HOME);
      }

      setLoading(false);
    }, 1500);
  };

  return (
    <View style={{ paddingTop: top }} className="flex-1 bg-black">
      <KeyboardContainer>
        <View className="h-[15%] justify-center items-center">
          <View className="w-16 h-16 bg-white rounded-full" />
        </View>

        <View className="flex-1 bg-white rounded-tl-[60px] p-6">
          <Text textAlign="center" fontSize={32}>
            Inicio de sesión
          </Text>
          <View className="mt-16 mb-8">
            <Formik
              initialValues={{ email: '', password: '' }}
              validationSchema={validationSchema}
              onSubmit={handleLogin}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => {
                return (
                  <View className="gap-4">
                    <VStack className="gap-8">
                      <Input
                        label="Email"
                        value={values.email}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        placeholder="Tu correo electrónico"
                        keyboardType="email-address"
                        error={touched.email && errors.email ? errors.email : ''}
                        touched={touched.email}
                        autoCapitalize='none'
                      />
                      <Input
                        label="Contraseña"
                        value={values.password}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        placeholder="Tu contraseña"
                        secureTextEntry
                        rightIcon
                        error={touched.password && errors.password ? errors.password : ''}
                        touched={touched.password}
                      />
                    </VStack>
                    <Pressable onPress={() => router.push(AuthRoutesLink.RECOVERY_PASSWORD)} className="mb-4">
                      <Text textAlign="right">¿Olvidaste tu contraseña?</Text>
                    </Pressable>
                    <Button onPress={() => handleSubmit()} stretch loading={loading} submit>
                      Iniciar sesión
                    </Button>
                  </View>
                );
              }}
            </Formik>
          </View>
          {/* <View className="flex-1 justify-center items-center mt-6">
            <HStack className="items-center gap-2">
              <Divider style={{ flex: 1 }} />
              <Text textAlign="center" fontSize={14} color={Colors.GRAY} fontWeight={300}>
                O inicia sesión con
              </Text>
              <Divider style={{ flex: 1 }} />
            </HStack>

            <HStack className="gap-2 items-center justify-center mt-4">
              {icons.map(({ icon: Icon }, i) => (
                <View className="w-12 h-12 items-center justify-center rounded-full border-[#8E8E8E] border">
                  <Icon color={Colors.BLACK} />
                </View>
              ))}
            </HStack>
          </View> */}
          <Pressable className="flex-1 items-center justify-end" style={{ paddingBottom: bottom }}>
            <Text fontWeight={400}>
              ¿Aún no tienes cuenta?{' '}
              <Text fontWeight={600} onPress={() => router.push(AuthRoutesLink.SIGN_UP)}>
                Regístrate
              </Text>
            </Text>
          </Pressable>
        </View>
      </KeyboardContainer>
    </View>
  );
}
