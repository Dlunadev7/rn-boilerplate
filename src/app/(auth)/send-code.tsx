import { Pressable, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { insets } from '@/src/hooks';
import { Button, KeyboardContainer, Text } from '@/src/components';
import { router } from 'expo-router';
import { AuthRoutesLink } from '@/src/utils/enum';
import { VStack } from '@/src/components/ui/vstack';
import OTPInput from '@/src/components/otp/otp.component';
import useTimer from '@/src/hooks/useTimer.hook';
import { Colors } from '@/src/constants/Colors';
import { ArrowLeft } from '@/assets/svg';
import { HStack } from '@/src/components/ui/hstack';

export default function SendCode() {
  const { top, bottom } = insets();
  const { formattedTime, reset, start, stop } = useTimer(120);
  const [showTimer, setShowTimer] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);

  useEffect(() => {
    if (showTimer) {
      start();
      setIsCodeSent(true);
    }
  }, [showTimer]);

  useEffect(() => {
    if (formattedTime === '00:00') {
      setShowTimer(false);
      setIsCodeSent(false);
      reset();
      stop();
    }
  }, [formattedTime]);

  const [otp, setOtp] = useState('');

  const handleVerifyOTP = () => {
    console.log('Código ingresado:', otp);
  };

  return (
    <View style={{ paddingTop: top }} className="flex-1 bg-black">
      <KeyboardContainer>
        <View className="h-[15%] justify-center items-center">
          <View className="w-16 h-16 bg-white rounded-full" />
        </View>

        <View className="flex-1 bg-white rounded-tl-[60px] p-6">
          <VStack className="gap-2">
            <Text textAlign="center" fontSize={32}>
              Por favor, revise su email.
            </Text>
          </VStack>
          <View className="mt-12 gap-4 mb-8 items-center">
            <OTPInput value={otp} onCodeChange={setOtp} />
          </View>
          <VStack className="gap-4">
            <HStack className="gap-2">
              <Button onPress={() => router.back()}>
                <ArrowLeft color={Colors.WHITE} />
              </Button>
              <Button
                onPress={() => {
                  handleVerifyOTP();
                  router.push(AuthRoutesLink.RESET_PASSWORD);
                }}
                flex
              >
                Verificar código
              </Button>
            </HStack>
            <Text textAlign="center">
              Aun no te llego el codigo?{' '}
              {showTimer ? (
                <Text fontSize={14} fontWeight={300} color={Colors.BLACK}>
                  <Text fontSize={14} fontWeight={500} color={Colors.BLACK}>
                    {formattedTime}
                  </Text>
                </Text>
              ) : (
                <Text fontWeight={600} onPress={() => setShowTimer(true)}>
                  Reenviar código
                </Text>
              )}
            </Text>
          </VStack>
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
