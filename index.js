function updateImage() {
    const randomWordEndpoint = 'https://random-word-api.herokuapp.com/word?number=1';
    const style = document.createElement('style');

    async function fetchRandomWord() {
        const response = await fetch(randomWordEndpoint);
        const data = await response.json();
        return data[0];
    }

    async function updateAltAndHighlight(img) {
        const altText = await fetchRandomWord();
        img.setAttribute('alt', altText);
        img.classList.add('image-update');
    }

    function addStyling() {
        style.textContent = `
      .image-update {
        outline: 2px solid red;
      }

      .image-update:active {
        outline: 2px solid green;
      }
    `;
        document.head.appendChild(style);
    }

    function handleImageClick(event) {
        const image = event.target;
        const newAltText = prompt('Enter new alt text:');
        image.setAttribute('alt', newAltText);
    }

    function updateExistingImage() {
        const imgElements = document.querySelectorAll('img');
        imgElements.forEach((img) => {
            updateAltAndHighlight(img);
            img.addEventListener('click', handleImageClick);
        });
    }

    function observeDOMChanges() {
        const observer = new MutationObserver((mutationsList) => {
            for (const mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach((el) => {
                        if (el.tagName === 'IMG') {
                            updateAltAndHighlight(el);
                            el.addEventListener('click', handleImageClick);
                        }
                    });
                }
            }
        });
        const config = { attributes: true, childList: true, subtree: true };
        observer.observe(document.body, config);
    }

    addStyling();
    updateExistingImage();
    observeDOMChanges();
}

updateImage();
