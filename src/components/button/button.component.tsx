import React, { ReactNode } from 'react';
import { StyleSheet, GestureResponderEvent, View, ActivityIndicator, Keyboard } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Button as GButton } from '../ui/button/index';
import { Text } from '../text/text.component';

interface ButtonProps {
  children: string | ReactNode;
  onPress: (event: GestureResponderEvent) => void;
  colors?: string[];
  style?: object;
  textClassName?: object;
  submit?: boolean;
  loading?: boolean;
  stretch?: boolean;
  disabled?: boolean;
  iconLeft?: JSX.Element;
  iconRight?: JSX.Element;
  flex?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onPress,
  colors = ['#07A999', '#134641'],
  style = {},
  textClassName = {},
  submit,
  loading,
  stretch,
  disabled,
  iconLeft,
  iconRight,
  flex,
}) => {
  const width = stretch ? '100%' : 'auto';

  return (
    <GButton
      style={[styles.button, style, { width: width, flex: flex ? 1 : null }]}
      onPress={(e) => {
        onPress(e);
        submit && Keyboard.dismiss();
      }}
      disabled={disabled || loading}
    >
      <View style={styles.content}>
        {iconLeft && <View style={styles.iconLeft}>{iconLeft}</View>}
        <Text style={[styles.text, textClassName]}>
          {loading ? <ActivityIndicator color={Colors.WHITE} /> : children}
        </Text>
        {iconRight && <View style={styles.iconRight}>{iconRight}</View>}
      </View>
    </GButton>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    overflow: 'hidden',
    alignSelf: 'center',
    minHeight: 40,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
});
