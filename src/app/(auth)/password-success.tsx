import React from "react";
import { Stars } from "@/assets/svg";
import { VStack } from "@/src/components/ui/vstack";
import { Button, Text } from "@/src/components";
import { View } from "react-native";
import { router } from "expo-router";
import { AuthRoutesLink } from "@/src/utils/enum";

export default function PasswordSuccess() {
  return (
    <VStack className="items-center justify-center flex-1 gap-4 p-6">
      <Stars />
      <View className="gap-2 items-center mb-8">
        <Text fontSize={32} fontWeight={600} textAlign="center">
          ¡Contraseña reestablecida con éxito!
        </Text>
        <Text fontWeight={400}>
          Tu contraseña se ha actualizado correctamente.
        </Text>
      </View>
      <Button
        onPress={() => {
          router.dismissAll();
          router.replace(AuthRoutesLink.SIGN_IN);
        }}
        stretch
      >
        Volver al inicio
      </Button>
    </VStack>
  );
}
