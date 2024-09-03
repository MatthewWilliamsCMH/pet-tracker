function noImage(event) {
    const img=event.target;
    if (!img.src.endsWith('generic.png')) {
        img.src = '/images/generic.png';
        img.alt = 'Image not yet available.';
    }
  }
  
document.querySelector('#addAnimalBtn').addEventListener('click', function() {
    window.location.href = '/new'; // Redirect to the animals list page or any other page
});