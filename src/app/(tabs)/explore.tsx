import { View } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '@/src/components/text/text.component';
import { Colors } from '@/src/constants/Colors';

export default function TabTwoScreen() {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ paddingTop: insets.top }}>
      <Text color={Colors.PRIMARY}>asd</Text>
    </View>
  );
}
