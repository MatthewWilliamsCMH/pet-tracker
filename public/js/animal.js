const animalDetails = document.querySelector('.animal-details')
const animalId=animalDetails.dataset.id
const animalName=animalDetails.dataset.name
const deleteBtn = document.getElementById('deleteBtn');
const updateBtn = document.getElementById('updateBtn');

//handle the delete button
deleteBtn.addEventListener('click', (event) => {
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
updateBtn.addEventListener('click', async (event) => {
    try {
        //get the animal data in HTML format for the page display
        let responseHTML = await fetch(`/api/animals/updateHTML/${animalId}`, { method: 'GET' });
        if (!responseHTML.ok) {
            let errorData = await responseHTML.json();
            throw new Error(errorData.message || `Unable to update ${animalName}.`);
        }
        let html = await responseHTML.text();
        document.querySelector('body').innerHTML = html;

        // Load additional script and wait for it to be loaded
        await new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = '/js/update.js';
            script.onload = () => resolve();
            script.onerror = (error) => reject(new Error('Script loading error:', error));
            document.body.appendChild(script);
        });

        //get the animal data in JSON format to update the fields
        let responseJSON = await fetch(`/api/animals/updateJSON/${animalId}`, { method: 'GET' });
        if (!responseJSON.ok) {
            let errorData = await responseJSON.json();
            throw new Error(errorData.message || `Unable to retrieve animal.`);
        }
        let animalData = await responseJSON.json();
        console.log(animalData)
        document.querySelector('#species').value = animalData.species.id;
        document.querySelector('#breed').value = animalData.breed.id;
        document.querySelector('#color').value = animalData.color.id;
        document.querySelector('#kennel').value = animalData.kennel.kennel;
        //not working yet.
        if (animalData.sex === 'M') {
            document.querySelector('#male').checked = true
        }
        else {
            document.querySelector('#female').checked = true
        }
        if (animalData.altered=true) {
            document.querySelector('#animal-altered-yes').checked = true
        }
        else {
            document.querySelector('#animal-altered-no').checked = true
        }
        // document.querySelector('#behavior').value = animal.behavior.id;
    } 
    catch (error) {
        console.error('There was an error!', error);
    }
});