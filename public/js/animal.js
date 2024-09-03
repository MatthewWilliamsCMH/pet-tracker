//handle delete button
const animalDetails = document.querySelector('.animal-details')
const animalId=animalDetails.dataset.id
const animalName=animalDetails.dataset.name

document.getElementById('deleteBtn').addEventListener('click', (event) => {
    const yesDelete = window.confirm(`Are you sure you would like to delete ${animalName} from the pack?`)
    if (yesDelete) {
        fetch(`/api/animals/animal/${animalId}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw new Error(errorData.message || `Unable to delete the ${animalName}.`);
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
    