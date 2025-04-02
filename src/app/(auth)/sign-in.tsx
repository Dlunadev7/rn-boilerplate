import { Pressable, View } from 'react-native';
import React, { useState } from 'react';
import { insets } from '@/src/hooks';
import { Text, Input, KeyboardContainer, Button } from '@/src/components';
import { router } from 'expo-router';
import { AuthRoutesLink } from '@/src/utils/enum';
import { Toast, useToast } from '@/src/components/ui/toast';
import { Apple, Facebook, Google } from '@/assets/svg';

export default function SignIn() {
  const { top, bottom } = insets();
  const toast = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);

    if (!email || !password) {
      toast.show({
        placement: 'top',
        duration: 3000,
        render: ({ id }) => {
          const uniqueToastId = 'toast-' + id;
          return (
            <Toast className="min-w-[95%] m-auto" nativeID={uniqueToastId} action="error" variant="outline">
              <View>
                <Text className="text-foreground font-semibold text-lg">Error</Text>
                <Text className="text-muted-foreground text-sm">Por favor, completa todos los campos.</Text>
              </View>
            </Toast>
          );
        },
      });

      setLoading(false);
      return;
    }

    // Simulación de inicio de sesión falso
    setTimeout(() => {
      if (email !== 'test@example.com' || password !== '123456') {
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
        // router.push(AuthRoutesLink.); // Redirección en caso de éxito
      }

      setLoading(false); // Desactivamos el loading después de la validación
    }, 1500);
  };

  const icons = [
    {
      icon: Google,
    },
    {
      icon: Apple,
    },
    {
      icon: Facebook,
    },
  ];

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
          <View className="mt-16 gap-4 mb-8">
            <Input
              onBlur={() => {}}
              label="Email"
              value={email}
              onChangeText={setEmail}
              placeholder="Tu correo electrónico"
              keyboardType="email-address"
            />
            <Input
              onBlur={() => {}}
              label="Contraseña"
              value={password}
              onChangeText={setPassword}
              placeholder="Tu contraseña"
              secureTextEntry={true}
              rightIcon
            />
            <Pressable onPress={() => router.push(AuthRoutesLink.RECOVERY_PASSWORD)}>
              <Text textAlign="right">¿Olvidaste tu contraseña?</Text>
            </Pressable>
          </View>
          <Button onPress={handleLogin} stretch loading={loading}>
            Iniciar sesión{' '}
          </Button>
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
