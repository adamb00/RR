/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { useTheme } from '@/context/ThemeContext';
import { Control, Controller, RegisterOptions } from 'react-hook-form';

interface SelectProps extends React.ComponentPropsWithoutRef<'input'> {
   name: string;
   control: Control;
   rules?: RegisterOptions;
}

interface OptionType {
   value: string;
   label: string;
}

export default function SelectCountry({ className, name, control }: SelectProps) {
   const [countries, setCountries] = useState<OptionType[]>([]);
   const [selectedCountry, setSelectedCountry] = useState<OptionType | null>(null);
   const { theme } = useTheme(),
      isDark = theme === 'dark';

   const customStyles = {
      control: (provided: any) => ({
         ...provided,
         border: 'none',
         borderBottom: '1px solid currentColor',
         borderRadius: '0',
         boxShadow: 'none',
         background: 'transparent',
         paddingRight: '0',
         paddingLeft: '2.5rem',
         position: 'relative',
         '&:hover': {
            borderBottom: '1px solid currentColor',
         },
         '&:focus': {
            borderColor: '#333',
            boxShadow: 'none',
         },
      }),
      menu: (provided: any) => ({
         ...provided,
         backgroundColor: isDark ? '#292929' : '#eeeeee',
      }),
      option: (provided: any, state: { isSelected: any }) => ({
         ...provided,
         color: isDark ? '#e9e9e9' : '#585858',
         backgroundColor: state.isSelected ? '#c5c5c5' : isDark ? '#292929' : '#eeeeee',
         '&:hover': {
            backgroundColor: state.isSelected ? 'inherit' : isDark ? '#8debcf' : '#ed535b',
            color: state.isSelected ? 'inherit' : isDark ? '#2e2e2e' : '#eeeeee',
         },
      }),
      singleValue: (provided: any) => ({
         ...provided,
         color: isDark ? '#cfcfcf' : '#434343',
         fontSize: '1.8rem',
      }),
      dropdownIndicator: (provided: any) => ({
         ...provided,
         position: 'absolute',
         left: '0',
         padding: '0.4rem',
         zIndex: 1,
         cursor: 'pointer',
         color: isDark ? '#8debcf' : '#ed535b',
         borderRight: '1px solid currentColor',
         height: '3rem',
         width: '2.8rem',

         fontSize: '12rem',
      }),
   };

   useEffect(() => {
      fetch('https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code')
         .then(response => response.json())
         .then(data => {
            setCountries(data.countries);
            setSelectedCountry(data.userSelectValue);
         });
   }, []);
   return (
      <Controller
         control={control}
         name={name}
         render={({ field: { onBlur, onChange } }) => (
            <Select
               styles={customStyles}
               onBlur={onBlur}
               className={className}
               onChange={(selectedOption: OptionType | null) => {
                  setSelectedCountry(selectedOption);
                  onChange(selectedOption?.label.split(' ')[1]);
               }}
               options={countries}
               value={selectedCountry}
               components={{ IndicatorSeparator: () => null }}
            />
         )}
      />
   );
}
