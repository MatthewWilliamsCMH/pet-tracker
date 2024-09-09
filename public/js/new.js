document.addEventListener('DOMContentLoaded', function() {
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
          'Content-Type': 'application/json',
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

  //Handle breeds dropdown list
  fetch('/api/breeds')
    .then(response => response.json())
    .then (data => {
      const breedSelect = document.getElementById('breed');
      data.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed.id;
        option.textContent = breed.breed;
        breedSelect.appendChild(option)
      })
    })

  //Handle species dropdown list
  fetch('/api/species')
  .then(response => response.json())
  .then (data => {
    const speciesSelect = document.getElementById('species');
    data.forEach(species => {
      const option = document.createElement('option');
      option.value = species.id;
      option.textContent = species.species;
      speciesSelect.appendChild(option)
    })
  })

  //Handle color dropdown list
  fetch('/api/color')
  .then(response => response.json())
  .then (data => {
    const colorSelect = document.getElementById('color');
    data.forEach(color => {
      const option = document.createElement('option');
      option.value = color.id;
      option.textContent = color.color;
      colorSelect.appendChild(option)
    })
  })



});