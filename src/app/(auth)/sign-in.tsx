import { View } from "react-native";
import React from "react";
import { insets } from "@/src/hooks";
import { Text } from "@/src/components";

export default function SignIn() {
  const { top } = insets();

  return (
    <View style={{ paddingTop: top }} className="flex-1 bg-black">
      <View className="h-[25%] bg-black justify-center items-center">
        <View className="w-16 h-16 bg-white rounded-full" />
      </View>

      <View className="flex-1 bg-white rounded-tl-[60px] p-6">
        <Text textAlign="center" fontSize={32}>Login</Text>
        {/* Aquí van los inputs y botones */}
      </View>
    </View>
  );
}
