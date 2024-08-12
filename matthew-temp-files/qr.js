// //API: https://api.qrserver.com/v1/create-qr-code/?data=[URL-encoded-text]&size=[pixels]x[pixels]
// //docs: https://goqr.me/api/doc/create-qr-code/
// //Don't try to save the image. Write the api address into the database, and each time that animal's record is opened, have it pull the qrcode. You could have an option to print the qr code by clicking on it?


// //so, this code would run when an animal is selected by id, and the result would be displayed on the form. How would I display the resulting image on the form (it'd be a live retrieval of the qr code, not an actual image file)? In a frame?
// async function getQr() {
//     const animal_id = 1;
//     const tempUrl = `https://api.qrserver.com/v1/create-qr-code/?data=https://localhost:3001/api/animal/${animal_id}data=render&size=200x200`
//     // const url = `https://api.qrserver.com/v1/create-qr-code/?data=https://https://pet-tracker-${renderCode}.onrender.com/api/animal/${animal_id}data=render&size=200x200`;
//     try {
//         const response = await fetch(tempUrl);
//         // const response = await fetch(url);
//         if (!response.ok) {
//             throw new Error(`Response status: ${response.status}`);
//         }
//         const json = await response.json();
//         console.log(json);
//     }
//     catch (error) {
//         console.error(error.message);
//     }
// }

const printQrButtonHandler = async (event) => {
    window.print()
}

document
  .querySelector('.qrcoder')
  .addEventListener('click', printQrButtonHandler);