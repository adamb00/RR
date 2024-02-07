document.addEventListener('DOMContentLoaded', () => {
   const uploadPhotoLink = document.getElementById('activationLink');

   if (uploadPhotoLink) {
      uploadPhotoLink.addEventListener('click', async event => {
         event.preventDefault();

         const userId = uploadPhotoLink.dataset.userId;

         await fetch(`http://192.168.0.33:8000/api/v1/user/${userId}/activate-account`, {
            method: 'PATCH',
            body: { active: true },
         });
      });
   }
});
