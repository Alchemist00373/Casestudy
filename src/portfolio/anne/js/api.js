function searchWord() {
  const wordInput = document.getElementById("wordInput");
  const resultDiv = document.getElementById("result");
  const word = wordInput.value.trim();

  if (word === "") {
    resultDiv.innerHTML = "<p class='error'>Please enter a word.</p>";
    return;
  }

  resultDiv.innerHTML = "Loading...";

  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Word not found");
      }
      return response.json();
    })
    .then(data => {
      const meaning = data[0].meanings[0];
      const definition = meaning.definitions[0];

      resultDiv.innerHTML = `
        <p class="word">${data[0].word}</p>
        <p class="part">${meaning.partOfSpeech}</p>
        <p><strong>Definition:</strong> ${definition.definition}</p>
        <p><strong>Example:</strong> ${definition.example || "No example available."}</p>
      `;
    })
    .catch(() => {
      resultDiv.innerHTML = "<p class='error'>Word not found.</p>";
    });
}
