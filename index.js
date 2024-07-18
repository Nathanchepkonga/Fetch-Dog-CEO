document.addEventListener('DOMContentLoaded', () => {
    fetchImages();
    fetchBreeds();
    setupBreedDropdown();
});

function fetchImages() {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    fetch(imgUrl)
        .then(response => response.json())
        .then(data => {
            const imageContainer = document.getElementById('dog-image-container');
            data.message.forEach(imageUrl => {
                const img = document.createElement('img');
                img.src = imageUrl;
                imageContainer.appendChild(img);
            });
        });
}

function fetchBreeds() {
    const breedUrl = "https://dog.ceo/api/breeds/list/all";
    fetch(breedUrl)
        .then(response => response.json())
        .then(data => {
            const breeds = data.message;
            const breedList = document.getElementById('dog-breeds');
            for (const breed in breeds) {
                const li = document.createElement('li');
                li.textContent = breed;
                li.addEventListener('click', () => {
                    li.style.color = 'blue'; // Change to your preferred color
                });
                breedList.appendChild(li);
            }
        });
}

function setupBreedDropdown() {
    const dropdown = document.getElementById('breed-dropdown');
    dropdown.addEventListener('change', (event) => {
        const selectedLetter = event.target.value;
        filterBreeds(selectedLetter);
    });
}

function filterBreeds(letter) {
    const breedList = document.getElementById('dog-breeds');
    const breeds = breedList.getElementsByTagName('li');
    for (let i = 0; i < breeds.length; i++) {
        const breed = breeds[i];
        if (letter === 'all' || breed.textContent.startsWith(letter)) {
            breed.style.display = 'list-item';
        } else {
            breed.style.display = 'none';
        }
    }
}
