import React from "react";
import { Stack } from "expo-router";
import { AuthRoutes } from "@/src/utils/enum";
import { StatusBar } from "expo-status-bar";

export default function _layout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack>
        <Stack.Screen
          name={AuthRoutes.SIGN_IN}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={AuthRoutes.SIGN_UP}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={AuthRoutes.RECOVERY_PASSWORD}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={AuthRoutes.SEND_CODE}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={AuthRoutes.RESET_PASSWORD}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={AuthRoutes.PASSWORD_SUCCESS}
          options={{ headerShown: false }}
        />
      </Stack>
    </>
  );
}
