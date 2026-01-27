let allPokemon = [];

// Fetch all Pokémon names
fetch('https://pokeapi.co/api/v2/pokemon?limit=100000')
    .then(res => res.json())
    .then(data => {
        allPokemon = data.results.map(p => p.name);
    });

// Show search suggestions
function showSuggestions() {
    const input = document.getElementById('pokemonName').value.toLowerCase();
    const suggestionsDiv = document.getElementById('suggestions');
    suggestionsDiv.innerHTML = '';

    if (input.length === 0) {
        suggestionsDiv.style.visibility = "hidden";
        return;
    }

    const normalizedInput = input.replace(/\s+/g, '-').replace(/_/g, '-');

    const matches = allPokemon
        .filter(name => name.startsWith(normalizedInput))
        .slice(0, 5);

    suggestionsDiv.style.visibility = matches.length ? "visible" : "hidden";

    matches.forEach(name => {
        const div = document.createElement('div');
        div.textContent = name;

        div.onclick = () => {
            document.getElementById('pokemonName').value = name;
            suggestionsDiv.innerHTML = '';
            suggestionsDiv.style.visibility = "hidden";
            getPokemon(name);
        };

        suggestionsDiv.appendChild(div);
    });
}

// Main function
function getPokemon(selectedName) {
    let name = selectedName || document.getElementById('pokemonName').value.toLowerCase();
    name = name.replace(/\s+/g, '-').replace(/_/g, '-');

    if (!allPokemon.includes(name)) {
        document.getElementById('result').innerHTML =
            `<p style="color:red;">Please select a valid Pokémon from suggestions.</p>`;
        return;
    }

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = 'Loading...';

    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then(res => res.json())
        .then(data => {

            const types = data.types.map(t => t.type.name);

            // Fetch type details
            const typeRequests = types.map(type =>
                fetch(`https://pokeapi.co/api/v2/type/${type}`)
                    .then(res => res.json())
            );

            // Fetch species for description
            const speciesRequest = fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`)
                .then(res => res.json());

            Promise.all([...typeRequests, speciesRequest]).then(results => {

                const speciesData = results.pop();

                // Description
                const flavor = speciesData.flavor_text_entries.find(f => f.language.name === 'en');
                const description = flavor
                    ? flavor.flavor_text.replace(/\n|\f/g, ' ')
                    : 'No description available';

                // Strengths & Weaknesses
                const strengthsSet = new Set();
                const weaknessesSet = new Set();

                results.forEach(typeData => {
                    typeData.damage_relations.double_damage_to.forEach(t =>
                        strengthsSet.add(t.name)
                    );
                    typeData.damage_relations.double_damage_from.forEach(t =>
                        weaknessesSet.add(t.name)
                    );
                });

                const strengths = [...strengthsSet].join(', ') || 'None';
                const weaknesses = [...weaknessesSet].join(', ') || 'None';

                // Display
                resultDiv.innerHTML = `
                    <h2>${data.name.toUpperCase()}</h2>
                    <img src="${data.sprites.front_default}" alt="${data.name}">
                    <p><strong>ID:</strong> ${data.id}</p>
                    <p><strong>Type:</strong> ${types.join(', ')}</p>
                    <p><strong>Strengths:</strong> ${strengths}</p>
                    <p><strong>Weaknesses:</strong> ${weaknesses}</p>
                    <p><strong>Description:</strong> ${description}</p>
                `;
            });
        })
        .catch(() => {
            resultDiv.innerHTML = `<p style="color:red;">Error fetching Pokémon data.</p>`;
        });
}
