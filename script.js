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
    characterContainer.innerHTML = ''
    if (characters.length === 0) {
        characterContainer.innerHTML = '<p>No characters found</p>'
        return
    }

    characters.forEach((character) => {
        const characterCard = document.createElement('div')
        characterCard.classList.add('character-card')

        characterCard.innerHTML = `
            <img src="${character.image}" alt="${character.name}" />
            <p class='character-name'>${character.name}</p>
        `

        characterContainer.appendChild(characterCard)
    })
}
