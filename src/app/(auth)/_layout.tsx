import React from "react";
import { Stack } from "expo-router";
import { AuthRoutes } from "@/src/utils/enum";

export default function _layout() {
  return (
    <Stack>
      <Stack.Screen name={AuthRoutes.SIGN_IN} options={{ headerShown: false }} />
      <Stack.Screen name={AuthRoutes.SIGN_UP} options={{ headerShown: false }} />
      <Stack.Screen name={AuthRoutes.RECOVERY_PASSWORD} options={{ headerShown: false }} />
    </Stack>
  );
}
