import { Pressable, View } from 'react-native';
import React from 'react';
import { insets } from '@/src/hooks';
import { Button, Input, KeyboardContainer, Text } from '@/src/components';
import { router } from 'expo-router';
import { AuthRoutesLink } from '@/src/utils/enum';
import { VStack } from '@/src/components/ui/vstack';
import { HStack } from '@/src/components/ui/hstack';
import { ArrowLeft } from '@/assets/svg';
import { Colors } from '@/src/constants/Colors';

export default function RecoveryPassword() {
  const { top, bottom } = insets();

  return (
    <View style={{ paddingTop: top }} className="flex-1 bg-black">
      <KeyboardContainer>
        <View className="h-[15%] justify-center items-center">
          <View className="w-16 h-16 bg-white rounded-full" />
        </View>

        <View className="flex-1 bg-white rounded-tl-[60px] p-6">
          <VStack className="gap-2">
            <Text textAlign="center" fontSize={32}>
              ¿Olvidaste tu contraseña?
            </Text>
            <Text textAlign="center">
              ¡No te preocupes! Estas cosas pasan. Por favor, ingresa el correo electrónico asociado a la cuenta.
            </Text>
          </VStack>
          <View className="mt-12 gap-4 mb-8">
            <Input
              label="Email"
              onBlur={() => {}}
              onChangeText={() => {}}
              placeholder=""
              keyboardType="email-address"
            />
          </View>
          <HStack className="gap-2">
            <Button onPress={() => router.back()}>
              <ArrowLeft color={Colors.WHITE} />
            </Button>
            <Button onPress={() => router.push(AuthRoutesLink.SEND_CODE)} flex={true}>
              Enviar Código
            </Button>
          </HStack>
          <Pressable className="flex-1 items-center justify-end" style={{ paddingBottom: bottom }}>
            <Text fontWeight={400}>
              Ya tenes cuenta?{' '}
              <Text fontWeight={600} onPress={() => router.push(AuthRoutesLink.SIGN_IN)}>
                Inicia sesión
              </Text>
            </Text>
          </Pressable>
        </View>
      </KeyboardContainer>
    </View>
  );
}
