import { View, StyleSheet, Pressable } from 'react-native';
import React, { useCallback, useState } from 'react';
import Input from '../input/input.component';
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetFlatList,
  ActionsheetItem,
} from '../ui/actionsheet';
import { SvgUri } from 'react-native-svg';
import { SearchIcon } from '../ui/icon';
import { Text } from '../text/text.component';
import { Colors } from '@/src/constants/Colors';
import useAllCountries from '@/src/hooks/useGetCountries.hook';

interface PhoneNumberProps {
  value: string;
  error?: string;
  onBlur: (e: any) => void;
  onChangeText: (text: string) => void;
  placeholder: string;
  phoneNumber: string;
  handleChangeCode: (code: string) => void;
  touched?: boolean;
}

interface CountryItem {
  label: string;
  value: string;
  image: string;
  id: string;
}

export const PhoneNumber = (props: PhoneNumberProps) => {
  const { phoneNumber, handleChangeCode } = props;
  const { countries } = useAllCountries();
  const [showActionsheet, setShowActionsheet] = useState(false);
  const [searchText, setSearchText] = useState<string>('');
  const [countryCodeSelected, setCountryCodeSelected] = useState(phoneNumber);
  const parsedCountries = countries.map((country: { name: string; codeNumber: string; flag: string }) => ({
    label: country.name,
    value: country.codeNumber,
    image: country.flag,
    id: country.codeNumber,
  }));

  const handleInputChange = (text: string) => {
    setSearchText(text);
  };

  const filteredData = useCallback(() => {
    return parsedCountries?.filter(
      (item: { label: string; value: string }) =>
        item.label.toLowerCase().includes(searchText.toLowerCase()) || item.value.includes(searchText)
    );
  }, [parsedCountries, searchText]);

  const handleClose = (number: string) => {
    setShowActionsheet(false);
    setCountryCodeSelected(number);
    handleChangeCode(number);
    setSearchText('');
  };

  const Item: React.FC<{ title: string; image: string; id: string }> = useCallback((value) => {
    return (
      <ActionsheetItem onPress={() => handleClose(value.id)} className="h-12 p-2 items-center gap-4">
        <View className="w-10 h-10">
          <SvgUri uri={value?.image} width={40} height={40} />
        </View>
        <Text color={Colors.BLACK}>{value.title}</Text>
      </ActionsheetItem>
    );
  }, []);

  return (
    <>
      <Input
        label={'Contacto'}
        custom={
          <Pressable
            style={{
              height: 40,
              borderEndWidth: 1,
              borderColor: Colors.GRAY,
              minWidth: 40,
            }}
            className="items-center justify-center pr-3"
            onPress={() => setShowActionsheet(true)}
          >
            <Text fontWeight={400} fontSize={16}>
              {countryCodeSelected}
            </Text>
          </Pressable>
        }
        leftIcon
        touched={false}
        keyboardType="number-pad"
        maxLength={10}
        {...props}
      />
      <Actionsheet isOpen={showActionsheet} onClose={() => setShowActionsheet(false)} snapPoints={[70]} useRNModal>
        <ActionsheetBackdrop />
        <ActionsheetContent className="pb-10">
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>
          <View style={styles.search_bar_container}>
            <Input
              placeholder="Search..."
              label=""
              onBlur={() => {}}
              onChangeText={handleInputChange}
              className=""
              icon={SearchIcon}
              rightIcon
              size="sm"
            />
          </View>
          <ActionsheetFlatList
            data={filteredData()}
            renderItem={({ item }: any) => <Item id={item.id} title={item.value} image={item.image} />}
            contentContainerClassName="gap-4"
            keyExtractor={(item: any) => item.id.toString()}
          />
        </ActionsheetContent>
      </Actionsheet>
    </>
  );
};

const styles = StyleSheet.create({
  search_bar_container: {
    width: '100%',
    marginBottom: 24,
    marginTop: 24,
  },
});
