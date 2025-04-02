import React from "react";
import { StyleSheet, View } from "react-native";
import {
  CodeField,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { Text } from "../text/text.component";
import { Colors } from "@/src/constants/Colors";

const CELL_COUNT = 6;

interface OTPInputProps {
  value: string;
  onCodeChange: (code: string) => void;
}

export const OTPInput: React.FC<OTPInputProps> = ({ value, onCodeChange }) => {
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue: onCodeChange, // Usar la función del padre
  });

  return (
    <CodeField
      ref={ref}
      {...props}
      value={value}
      onChangeText={onCodeChange} // Actualizar el valor en el padre
      cellCount={CELL_COUNT}
      rootStyle={styles.codeFieldRoot}
      keyboardType="number-pad"
      textContentType="oneTimeCode"
      renderCell={({ index, symbol, isFocused }) => (
        <View
          key={index}
          style={[styles.cell, isFocused && styles.focusCell]}
          onLayout={getCellOnLayoutHandler(index)}
        >
          <Text style={styles.cellText}>{symbol || "-"}</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  codeFieldRoot: {
    marginTop: 20,
    width: "90%",
  },
  cell: {
    width: 40,
    height: 50,
    lineHeight: 48,
    fontSize: 24,
    borderWidth: 2,
    borderColor: "#000",
    textAlign: "center",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  cellText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  focusCell: {
    borderColor: Colors.GRAY,
  },
});

export default OTPInput;
