import React, { ElementType, useState } from "react";
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlLabel,
} from "../ui/form-control";
import { InputField, Input as GInput, InputSlot, InputIcon } from "../ui/input";
import { AlertCircleIcon, EyeIcon, EyeOffIcon } from "../ui/icon";
import { Pressable, StyleSheet, TextInputProps } from "react-native";
import { Colors } from "@/src/constants/Colors";
import { IInputFieldProps } from "@gluestack-ui/input/lib/types";
import { Text } from "../text/text.component";

interface CustomInputProps {
  label: string;
  placeholder: string;
  value?: string;
  onChangeText: (text: string) => void;
  onBlur: (e: any) => void;
  error?: string | false | undefined;
  touched?: boolean;
  size?: "sm" | "md" | "lg";
  stretch?: boolean;
  rightIcon?: boolean;
  leftIcon?: boolean;
  icon?: ElementType | undefined;
  pressable?: boolean;
  custom?: any;
  multiline?: boolean;
}

export const Input = (
  props: CustomInputProps & TextInputProps & IInputFieldProps
) => {
  const {
    label,
    placeholder,
    value,
    onChangeText,
    onBlur,
    error,
    touched,
    size = "lg",
    stretch,
    keyboardType,
    rightIcon,
    leftIcon,
    icon,
    editable = true,
    pressable = false,
    isRequired,
    style = {},
    custom = false,
    multiline = false,
  } = props;

  const [secureTextEntry, setSecureTextEntry] = useState(props.secureTextEntry);

  const InputContent = (
    <GInput
      size={size}
      variant="none"
      pointerEvents={pressable ? "none" : "auto"}
      // @ts-ignore
      style={[
        style as any,
        styles.input,
        {
          borderColor: props.isDisabled
            ? Colors.GRAY
            : error
            ? Colors.ERROR
            : Colors.LIGHT_GRAY,
          backgroundColor: props.isDisabled ? "" : "",
        },
      ]}
      isDisabled={props.isDisabled}
    >
      {leftIcon && (
        <InputSlot className="pl-3">
          {custom ? custom : <InputIcon as={icon} />}
        </InputSlot>
      )}
      <InputField
        placeholder={placeholder}
        autoFocus={props.autoFocus}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        editable={editable}
        className={`${error ? "placeholder:text-[#9A0000]" : ""}`}
        secureTextEntry={secureTextEntry}
        autoCapitalize={props.autoCapitalize}
        placeholderClassName={props.placeholder}
        style={{
          backgroundColor: props.isDisabled ? Colors.LIGHT_GRADIENT_1 : "",
          color: Colors.BLACK
        }}
        multiline={multiline}
      />
      {rightIcon && (
        <InputSlot
          className="pr-3"
          onPress={() =>
            props.secureTextEntry ? setSecureTextEntry(!secureTextEntry) : {}
          }
        >
          <InputIcon
            as={icon ? icon : secureTextEntry ? EyeIcon : EyeOffIcon}
            color={error ? Colors.ERROR : Colors.BLACK}
            size="lg"
          />
        </InputSlot>
      )}
    </GInput>
  );

  return (
    <FormControl
      isInvalid={!!error && touched}
      className={stretch ? "flex-1" : ""}
    >
      {label && (
        <FormControlLabel>
          <Text
            className={`font-semibold text-lg text-[#10524B] ${
              error && "text-[#9A0000]"
            }`}
            fontWeight={400}
          >
            {label}
          </Text>
        </FormControlLabel>
      )}
      {pressable ? (
        <Pressable onPress={props.onPress}>{InputContent}</Pressable>
      ) : (
        InputContent
      )}
      {touched && error && (
        <FormControlError className="mt-2">
          {!isRequired && (
            <FormControlErrorIcon as={AlertCircleIcon} color={Colors.ERROR} />
          )}
          <Text color={Colors.ERROR} fontWeight={300} className="flex-1">
            {isRequired ? `*${error}` : error}
          </Text>
        </FormControlError>
      )}
    </FormControl>
  );
};

const styles = StyleSheet.create({
  input: {
    minHeight: 44,
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 12,
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  },
});

export default Input;
