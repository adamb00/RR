import { OPTIONS } from '@/utils/helpers';

export const getImage = async (key: string) => {
   try {
      const response = await fetch(
         import.meta.env.VITE_BASE_URL + `/get-image/${key}`,
         await OPTIONS({ method: 'GET', header: 'image/png' })
      );

      if (!response.ok) return;

      const imageBlob = await response.blob();
      const imageURL = URL.createObjectURL(imageBlob);

      return imageURL;
   } catch (err) {
      console.log(err);
   }
};
