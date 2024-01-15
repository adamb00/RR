import { useEffect, useState } from 'react';

type Country = {
   name: {
      common: string;
   };
};

export const useGetCountriesList = () => {
   const [countries, setCountries] = useState([]);

   useEffect(() => {
      const fetchCountries = async () => {
         try {
            const response = await fetch('https://restcountries.com/v3.1/all');
            const data = await response.json();
            const countryNames = data.map((country: Country) => country.name.common);
            setCountries(countryNames);
         } catch (error) {
            console.error('Error fetching countries:', error);
         }
      };

      fetchCountries();
   }, []);

   return countries;
};
