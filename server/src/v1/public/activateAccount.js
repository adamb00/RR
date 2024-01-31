//TODO CREATE FUNCTION FOR ACTIVATE ACCOUNT
async function activateAccount() {
   const userId = document.querySelector('.activate__account').id;

   console.log(userId);
   document.addEventListener('DOMContentLoaded', function () {
      document.querySelector('.activate__account').addEventListener('click', async function () {
         try {
            const response = await fetch(`/api/v1/${userId}/activate-account`, {
               method: 'PATCH',
               data: { active: true },
            });
            const responseData = await response.json();

            console.log(responseData);
         } catch (err) {
            console.log(err);
         }
      });
   });
}
