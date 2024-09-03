const animalDetails = document.querySelector('.animal-details')
const animalId=animalDetails.dataset.id
const animalName=animalDetails.dataset.name
const editBtn = document.getElementById('editBtn');
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

//handle the edit button
editBtn.addEventListener('click', (event) => {
    const elements = document.querySelectorAll('td');
    elements.forEach(function(element) {
        element.setAttribute('contenteditable', 'true');
    })
    saveBtn.classList.remove('hidden');
    editBtn.classList.add('hidden');
    alert(`Edit the values on the right-hand side of the table. Click 'Save' when you are finished.`)
})

//handle the save button
saveBtn.addEventListener('click', (event) => {
    //set the state of the page element back to their defaults
    const elements = document.querySelectorAll('td');
    elements.forEach(function(element) {
        element.removeAttribute('contenteditable');
    })
    saveBtn.classList.add('hidden');
    editBtn.classList.remove('hidden');

    //collect the data
    const animalId = document.querySelector('.animal-details').getAttribute('data-id');
    const name = document.querySelector('#name').innerText;
    const chip = document.querySelector('#chip').innerText;
    const species = document.querySelector('#species').innerText;
    const breed = document.querySelector('#breed').innerText;
    const sex = document.querySelector('#sex').innerText;
    const altered = document.querySelector('#altered').innerText;
    const color = document.querySelector('#color').innerText;
    const kennel = document.querySelector('#kennel').innerText;
    const behaviorElements = document.querySelectorAll('#behavior');
    const behaviors = Array.from(behaviorElements).map(el => el.innerText);

    //create json object to send to endpoint
    const data = {
        id: animalId,
        name: name,
        chip: chip,
        species: species,
        breed: breed,
        sex: sex,
        altered: altered,
        color: color,
        kennel: kennel,
        behaviors: behaviors
    }

    //send data
    fetch(`/api/animals/animal/${animalId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            alert(`${name} has been updated.`);
        } else {
            alert(`Unable to update ${name}`);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert(`Error updating ${name}`);
    });
});