import { Pressable, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { insets } from '@/src/hooks';
import { Button, Input, KeyboardContainer, Text } from '@/src/components';
import { router } from 'expo-router';
import { AuthRoutesLink } from '@/src/utils/enum';
import { Colors } from '@/src/constants/Colors';
import { messages } from '@/src/utils/password-validate.message';
import { ArrowLeft, Check, Cross } from '@/assets/svg';
import { HStack } from '@/src/components/ui/hstack';
import { VStack } from '@/src/components/ui/vstack';

const validatePassword = (password: string) => {
  return {
    isLengthValid: password.length >= 8 && password.length <= 20,
    hasLowerCase: /[a-z]/.test(password),
    hasUpperCase: /[A-Z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };
};

export default function SignUp() {
  const { top, bottom } = insets();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const validations = validatePassword(password);
  const isPasswordEqual = password === confirmPassword;

  return (
    <View style={{ paddingTop: top }} className="flex-1 bg-black">
      <KeyboardContainer>
        <HStack className="h-[15%] justify-center items-center">
          <View className="w-16 h-16 bg-white rounded-full" />
        </HStack>

        <View className="flex-1 bg-white rounded-tl-[60px] p-6">
          <VStack className="gap-3 items-center">
            <Text textAlign="center" fontSize={32}>
              Restablecer contraseña
            </Text>
            <Text textAlign="center">Asegúrate de elegir una contraseña segura y fácil de recordar.</Text>
          </VStack>

          <View className="mt-8 gap-4 pb-8">
            <Input
              label="Contraseña"
              onBlur={() => {}}
              onChangeText={setPassword}
              placeholder=""
              secureTextEntry={true}
              rightIcon
            />
            <Input
              label="Confirmar contraseña"
              onBlur={() => {}}
              onChangeText={setConfirmPassword}
              placeholder=""
              secureTextEntry={true}
              rightIcon
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
                <Button
                  onPress={() => {
                    router.dismissAll();
                    router.push(AuthRoutesLink.PASSWORD_SUCCESS);
                  }}
                  flex={true}
                >
                  Reestablecer Contraseña
                </Button>
              </HStack>
              <Pressable className="items-center justify-end" onPress={() => router.push(AuthRoutesLink.SIGN_IN)}>
                <Text fontWeight={400}>
                  Ya tenes cuenta? <Text fontWeight={600}>Inicia Sesión</Text>
                </Text>
              </Pressable>
            </View>
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
