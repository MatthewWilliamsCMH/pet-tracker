const addAnimal = document.getElementById('addAnimalBtn')
    //should just load an empty new page into main.handlebars
    alert("Hello")
    fetch('/new')
    // .then(response => response.text())
    // .then(html => {
    //   contentDiv.innerHTML = html;
    // })
    // .catch(error => {
    //   console.error('Error loading additional template:', error);
    // });

    // const response = await fetch('/api/users/new', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    // });
  
    // if (response.ok) {
    //   alert('You have been logged out')
    //   document.location.replace('/');
    // } else {
    //   alert(response.statusText);
    // }
  };
  
  document.getElementById('addAnimalBtn').addEventListener('click', addAnimal);