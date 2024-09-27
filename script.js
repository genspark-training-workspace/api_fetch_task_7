document.querySelector('.search-icon').addEventListener('click', () => {
    const searchQuery = document.getElementById('search-input').value.trim()
    if (searchQuery) {
        fetchCharacters(searchQuery)
    } else {
        alert('Please enter a character name')
    }
})

document
    .getElementById('search-input')
    .addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault() 
            const searchQuery = document
                .getElementById('search-input')
                .value.trim()
            if (searchQuery) {
                fetchCharacters(searchQuery)
            } else {
                alert('Please enter a character name')
            }
        }
    })

function fetchCharacters(query) {
    const url = `https://rickandmortyapi.com/api/character/?name=${encodeURIComponent(
        query
    )}`

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            displayCharacters(data.results)
        })
        .catch((error) => {
            console.error('Error fetching characters:', error)
            alert('Error fetching data. Please try again.')
        })
}


function displayCharacters(characters) {
    const characterContainer = document.getElementById('character-container')
    characterContainer.innerHTML = '' // Clear previous results

    if (characters.length === 0) {
        const noResultMessage = document.createElement('p')
        noResultMessage.textContent = 'No characters found'
        characterContainer.appendChild(noResultMessage)
        return
    }

    characters.forEach((character) => {
        const characterCard = document.createElement('div')
        characterCard.classList.add('character-card')

        const characterImage = document.createElement('img')
        characterImage.src = character.image
        characterImage.alt = character.name

        const characterName = document.createElement('p')
        characterName.classList.add('character-name')
        characterName.textContent = character.name

        characterCard.appendChild(characterImage)
        characterCard.appendChild(characterName)

        characterContainer.appendChild(characterCard)
    })
}

