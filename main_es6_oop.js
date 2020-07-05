// ES6 Class
class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }

    type() {
        console.log(`wordIndex: ${this.wordIndex}`);
        console.log(`words.length: ${this.words.length}`);

        // Nota: current indica el número del item del array words
        //         es un valor que oscila entre 0, 1, 2, n-elementos del array
        const current = this.wordIndex % this.words.length;
        console.log(`Current vale: ${current}`);

        // Get Full text of current word
        // console.log(this.words[current]);
        const fullTxt = this.words[current]
        

        // Check if deleting
        if(this.isDeleting){
            // Remove char
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            // Add char
            // Nota: this.txt se inicializa con '', por lo tanto al inicio this.txt.length = 0
            // console.log(this.txt.length);
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }
        
        // Insert txt into element
        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

        // Initial Type Speed
        // Nota: La velocidad al borrar será mayor
        //         al terminar de escribir una palabra, hará una pausa.
        let typeSpeed = 300;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        // If word is complete move to the next word

        if (!this.isDeleting && this.txt === fullTxt) {
            // Make a pause at the end of each word
            typeSpeed = this.wait;
            // Set delete to true
            this.isDeleting = true;
        } else if(this.isDeleting && this.txt === ''){
            this.isDeleting = false;
            // Move to next word
            this.wordIndex++;
            // Pause before start typing
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Init on DOM Load
document.addEventListener('DOMContentLoaded', init);

// Init App
function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    // Init TypeWriter
    new TypeWriter(txtElement, words, wait);
}