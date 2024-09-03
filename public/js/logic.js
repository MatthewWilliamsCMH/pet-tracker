const modal = document.getElementById('modal');
const page = document.getElementById('page');

const logout = async () => {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert(response.statusText);
  }
};

function openModal() {
  if (sessionStorage.getItem('logged-in') === null) {
    modal.style.display = 'block';
    page.classList.add('hideContent');
    sessionStorage.setItem('logged-in', 'true')
  }
}

function closeModal() {
  modal.style.display = 'none';
  page.classList.remove('hideContent');
}
//********** changes begin **********/
// [three deleted lines]
//********** changes end **********/
window.onload = function () {
  openModal();
  setTimeout(closeModal, 4000);
};

document.getElementById('logoutBtn').addEventListener('click', logout);

document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById('add-animal-form');
  const saveButton = document.getElementById('save-button');
  const cancelButton = document.getElementById('cancel-button');

  // Handle Save button click
  form.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent default form submission

      const formData = new FormData(form); 
      const formObject = Object.fromEntries(formData.entries())
      
      fetch('/api/animals/animal', {
        method: 'POST',
        body: JSON.stringify({
          name: formObject.name,
          sex: formObject.sex,
          altered: formObject.altered,
          chip: formObject.chip,
          species_id: formObject.species,
          breed_id: formObject.breed,
          color_id: formObject.color,
          kennel_id: 1,
          behavior_id: formObject.behavior
        }),
        headers: {
          "Content-Type": "application/json",
        },
    })
    .then(response => {
      if (!response.ok) {
        // If the response is not ok (status code not in the range 200-299), throw an error
        return response.json().then(errorData => {
            throw new Error(errorData.message || 'Network response was not ok.');
        });
      }
      // Otherwise, parse the JSON response
      return response.json();
    })
    .then(data => {
      if (data) {
        alert('Animal added successfully!');
        form.reset(); // Reset form fields
        document.location.replace('/packroute')
      } 
      else {
        alert('Error adding animal: ' + data.message);
      }
    })
    .catch(error => {
      console.error('Fetch error:', error);
      alert('There was an error with the request.');
    });
  });
// //********** changes begin ***********/
//   // Handle Cancel button click
//   document.getElementById('cancel-button').addEventListener('click', function(event) {
//     form.reset(); // Reset form fields
//     window.location.href = '/packroute'; // Redirect to the animals list page or any other page
//   });

//   // Handle Delete button click
//   document.getElementById('deleteBtn').addEventListener('click', (event) => {
//     alert("hello")
//     if (confirm(`Are you sure you would like to delete ${animal.name} from the pack?`)) {
//       fetch(`/api/animals/${animal.id}`, {
//         method: 'DELETE'
//       })
//       .then(response => {
//         if (!response.ok) {
//           return response.json().then(errorData => {
//             throw new Error(errorData.message || `Unable to delete the ${animal.name}.`);
//           });
//         }
//         return response.json();
//       })
//       .catch(error => {
//         console.error('There was an error!', error);
//       });
//     };
//   });

// //********** changes end **********/
  // Handle Update Button
});