document.addEventListener('DOMContentLoaded', function () {
  emailjs.init("t-TVKXpygBu9st5lL");


  const form = document.getElementById('contact-form');
  if (!form) {
    console.error("Form with id='contact-form' not found");
    return;
  }


  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const serviceID = 'service_a2woqce';
    const templateID = 'template_5c6y6dm';

    emailjs.sendForm(serviceID, templateID, form)
      .then(function (response) {
        console.log('SUCCESS', response);
        alert("✅ Message sent successfully! We'll get back to you soon.");
        form.reset();
      }, function (error) {
        console.error('FAILED', error);
        alert("❌ Failed to send message. Check console for details.");
      });
  });
});

// Pokemon API Integration
let allPokemon = [];

// Fetch all Pokemon names for suggestions
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

    // If input is empty, hide suggestions
    if (input.length === 0) {
        suggestionsDiv.style.visibility = "hidden";
        return;
    }

    const normalizedInput = input.replace(/\s+/g, '-').replace(/_/g, '-');

    const matches = allPokemon
        .filter(name => name.startsWith(normalizedInput))
        .slice(0, 5);

    // If there are matches, show suggestions
    if (matches.length > 0) {
        suggestionsDiv.style.visibility = "visible";
    } else {
        suggestionsDiv.style.visibility = "hidden";
    }

    matches.forEach(name => {
        const div = document.createElement('div');
        div.textContent = name;

        div.onclick = () => {
            document.getElementById('pokemonName').value = name;
            suggestionsDiv.innerHTML = '';
            suggestionsDiv.style.visibility = "hidden"; // hide after click
            getPokemon(name);
        };

        suggestionsDiv.appendChild(div);
    });
}

// Main function to get Pokemon data
function getPokemon(nameFromSuggestion) {
    // If called from button click, use input value
    let name = nameFromSuggestion || document.getElementById('pokemonName').value.toLowerCase();
    name = name.replace(/\s+/g, '-').replace(/_/g, '-'); // normalize input

    // Check if name exists in official list
    if(!allPokemon.includes(name)){
        document.getElementById('result').innerHTML = `<p style="color:red;">Please select a valid Pokémon from suggestions.</p>`;
        return;
    }

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = 'Loading...';

    // Fetch main Pokemon data
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then(res => res.json())
        .then(data => {
            const types = data.types.map(t => t.type.name).join(', ');

            // Fetch weaknesses from types
            const typePromises = data.types.map(t => fetch(t.type.url).then(res => res.json()));

            // Fetch species for description
            const speciesPromise = fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`)
                .then(res => res.json());

            Promise.all([...typePromises, speciesPromise]).then(results => {
                const speciesData = results.pop(); // last result is species
                const descriptionObj = speciesData.flavor_text_entries.find(f => f.language.name === 'en');
                const description = descriptionObj ? descriptionObj.flavor_text.replace(/\n|\f/g, ' ') : 'No description';

                // Combine weaknesses
                const weaknessesSet = new Set();
                results.forEach(typeData => {
                    typeData.damage_relations.double_damage_from.forEach(w => weaknessesSet.add(w.name));
                });
                const weaknesses = Array.from(weaknessesSet).join(', ') || 'None';

                // Display results
                resultDiv.innerHTML = `
                    <h2>${data.name.toUpperCase()}</h2>
                    <img src="${data.sprites.front_default}" alt="${data.name}">
                    <p><strong>ID:</strong> ${data.id}</p>
                    <p><strong>Type:</strong> ${types}</p>
                    <p><strong>Weaknesses:</strong> ${weaknesses}</p>
                    <p><strong>Description:</strong> ${description}</p>
                `;
            });
        })
        .catch(err => {
            resultDiv.innerHTML = `<p style="color:red;">Error fetching data</p>`;
            console.error(err);
        });
}

