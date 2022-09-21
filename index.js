    const fetchPokemon = async (pokemonIndex) => {
         try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonIndex}`) 
            const pokemonData = await response.json();
            console.log(pokemonData)

            // Search pokemon in search bar
            function handleSubmit(e){
                e.preventDefault();
                let pokemonName = e.target.search.value;
                fetchPokemon(pokemonName)
                let index = 1;
            }

            let form = document.querySelector('form');
            form.addEventListener('submit', handleSubmit)
        
            // Title
            const pokemonTitle = document.querySelector('#pokemonName'); // select the pokemon name
            pokemonTitle.textContent = pokemonData.name; 
            // load the name of the pokemon in the browser
            pokemonTitle.style.textTransform = "capitalize"; //capitalize the name
            // pokemonTitle.textContent = pokemonData.name[0].toUppercase() + pokemonData.name.substring(1); 

            // Images
            const pokemonImage = document.querySelector('#pokeImage'); // select the pokemon image
            pokemonImage.src = pokemonData.sprites.front_default; // assign the image to a src and load the image of the pokemon in the browser
            const pokemonImageBack = document.querySelector('#pokeImageBack'); 
            pokemonImageBack.src = pokemonData.sprites.back_default;

            // Moves List
            const movesList = document.querySelector('#list');

            // Clear list after pressing button
            movesList.innerHTML = " "

            for(let i=0; i < 5; i++) {
                // create a list item every time we go through the loop. 5 list items
                let listItem = document.createElement('li')
                
                // assign the textContent of each list item to the name of the move
                listItem.textContent = pokemonData.moves[i].move.name;

                // append the list item to the list
                movesList.append(listItem)
            }
            index = pokemonData.id
        } catch(error){
            console.log(error)
        }
    }

    fetchPokemon(1)

    // Generates the next pokemon in the index
    const pokemonButton = document.getElementById('nextPokemon');
    pokemonButton.addEventListener('click', () => {
        index++
        fetchPokemon(index);
    })
