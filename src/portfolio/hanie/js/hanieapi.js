let artworks = [];
        let isLoading = false;

        async function searchArtworks() {
            const searchTerm = document.getElementById('artSearch').value.trim();
            if (!searchTerm || isLoading) return;

            isLoading = true;
            const loadingContainer = document.getElementById('loadingContainer');
            const errorContainer = document.getElementById('errorContainer');
            const noResults = document.getElementById('noResults');
            const artworksGrid = document.getElementById('artworksGrid');
            const searchBtn = document.getElementById('searchBtn');

            loadingContainer.style.display = 'block';
            errorContainer.style.display = 'none';
            noResults.style.display = 'none';
            artworksGrid.innerHTML = '';
            searchBtn.disabled = true;

            try {
                const response = await fetch(
                    `https://api.artic.edu/api/v1/artworks/search?q=${encodeURIComponent(searchTerm)}&limit=12&fields=id,title,artist_display,date_display,image_id,thumbnail`
                );
                const data = await response.json();

                artworks = data.data.filter(art => art.image_id);

                loadingContainer.style.display = 'none';

                if (artworks.length === 0) {
                    noResults.style.display = 'block';
                } else {
                    displayArtworks();
                }
            } catch (err) {
                loadingContainer.style.display = 'none';
                errorContainer.textContent = 'Failed to fetch artworks. Please try again.';
                errorContainer.style.display = 'block';
            } finally {
                isLoading = false;
                searchBtn.disabled = false;
            }
        }

        function getImageUrl(imageId) {
            return `https://www.artic.edu/iiif/2/${imageId}/full/843,/0/default.jpg`;
        }

        function displayArtworks() {
            const artworksGrid = document.getElementById('artworksGrid');
            artworksGrid.innerHTML = '';

            artworks.forEach(artwork => {
                const card = document.createElement('div');
                card.className = 'artwork-card';
                
                card.innerHTML = `
                    <img 
                        src="${getImageUrl(artwork.image_id)}"
                        alt="${artwork.title}"
                        class="artwork-image"
                        loading="lazy"
                    >
                    <div class="artwork-info">
                        <div class="artwork-title">${artwork.title}</div>
                        <div class="artwork-artist">${artwork.artist_display || 'Unknown Artist'}</div>
                        <div class="artwork-date">${artwork.date_display || 'Date Unknown'}</div>
                    </div>
                `;
                
                artworksGrid.appendChild(card);
            });
        }
