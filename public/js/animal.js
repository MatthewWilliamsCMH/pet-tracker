const animalDetails = document.querySelector('.animal-details')
const animalId=animalDetails.dataset.id
const animalName=animalDetails.dataset.name
const updateBtn = document.getElementById('updateBtn');
const saveBtn = document.getElementById('saveBtn');

//handle the delete button
document.getElementById('deleteBtn').addEventListener('click', (event) => {
    const yesDelete = window.confirm(`Are you sure you would like to delete ${animalName} from the pack?`)
    if (yesDelete) {
        fetch(`/api/animals/animal/${animalId}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw new Error(errorData.message || `Unable to delete ${animalName}.`);
                });
            }
            window.location.pathname = '/packroute'
            return response.json();
        })
        .catch(error => {
            console.error('There was an error!', error);
        })
    }
})

//handle the update button
//get the animal in html for the page update
updateBtn.addEventListener('click', (event) => {
    fetch(`/api/animals/animal/update/${animalId}`, {
        method: 'GET'
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(errorData => {
                throw new Error(errorData.message || `Unable to update ${animalName}.`);
            });
        }
        return response.text();
    })
    .then(html => {
        document.querySelector('body').innerHTML = html;

        // Load additional script
        const script = document.createElement('script');
        script.src = '/js/update.js';
        script.onload = () => {
            console.log('Script loaded successfully');
        };
        script.onerror = (error) => {
            console.error('Script loading error:', error);
        };
        document.body.appendChild(script);
    
        //This is still hitting the wrong route
        // Fetch animal data
        return fetch(`/api/animals/animal/update/${animalId}`, {
            method: 'GET'
        });
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(errorData => {
                throw new Error(errorData.message || `Unable to retrieve animal.`);
            });
        }
        return response.json();
    })
    .then(animalData => {
        document.querySelector('#color').value = animalData.color;
    })
    .catch(error => {
        console.error('There was an error!', error);
    });
});

//There is no save  button on the animal details page
//handle the save button
// saveBtn.addEventListener('click', (event) => {
//     //set the state of the page element back to their defaults
//     const elements = document.querySelectorAll('td');
//     elements.forEach(function(element) {
//         element.removeAttribute('contenteditable');
//     })
//     saveBtn.classList.add('hidden');
//     editBtn.classList.remove('hidden');

//     //collect the data
//     const animalId = document.querySelector('.animal-details').getAttribute('data-id');
//     const name = document.querySelector('#name').innerText;
//     const chip = document.querySelector('#chip').innerText;
//     const species = document.querySelector('#species').innerText;
//     const breed = document.querySelector('#breed').innerText;
//     const sex = document.querySelector('#sex').innerText;
//     const altered = document.querySelector('#altered').innerText;
//     const color = document.querySelector('#color').innerText;
//     const kennel = document.querySelector('#kennel').innerText;
//     const behaviorElements = document.querySelectorAll('#behavior');
//     const behaviors = Array.from(behaviorElements).map(el => el.innerText);

//     //create json object to send to endpoint
//     const data = {
//         id: animalId,
//         name: name,
//         chip: chip,
//         species: species,
//         breed: breed,
//         sex: sex,
//         altered: altered,
//         color: color,
//         kennel: kennel,
//         behaviors: behaviors
//     }

//     //send data
//     fetch(`/api/animals/animal/${animalId}`, {
//         method: 'PUT',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify(data)
//     })
//     .then(response => response.json())
//     .then(result => {
//         if (result.success) {
//             alert(`${name} has been updated.`);
//         } else {
//             alert(`Unable to update ${name}`);
//         }
//     })
//     .catch(error => {
//         console.error('Error:', error);
//         alert(`Error updating ${name}`);
//     });
// });

// function populateDropdowns() {
//     // Handle color dropdown list
//     fetch('/api/color')
//     .then(response => response.json())
//     .then(data => {
//         const colorSelect = document.getElementById('color');
//         if (!colorSelect) {
//             console.error('Color select element not found');
//             return;
//         }
//         colorSelect.innerHTML = ''; // Clear existing options
//         data.forEach(color => {
//             const option = document.createElement('option');
//             option.value = color.id;
//             option.textContent = color.color;
//             colorSelect.appendChild(option);
//         });
//         console.log('Colors populated successfully');
//     })
//     .catch(error => {
//         console.error('Error fetching colors:', error);
//     });
// }

// function updateFormFields() {
//     // Handle color dropdown list
//     const colorSelect = document.getElementById('color');
//     if (!colorSelect) {
//         console.error('Color select element not found');
//         return;
//     }
//     colorSelect.value = data.colorId; // Clear existing options
// }