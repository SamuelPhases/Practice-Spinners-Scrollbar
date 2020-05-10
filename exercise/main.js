class Typewriter {
  constructor(txtElements, words, wait = 3000) {
    this.txtElements = txtElements;
    this.words = words;
    this.wait = parseInt(wait, 10);
    this.wordIndex = 0;
    this.txt = "";
    this.type();
    this.isDeleting = false;
  }

  type() {
    const currentIndex = this.wordIndex % this.words.length;
    //   console.log(currentIndex);
    const fullTxt = this.words[currentIndex];
    //   console.log(fullTxt);

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    let typeSpeed = 300;
    if (this.isDeleting) {
      typeSpeed /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
      this.isDeleting = true;
      typeSpeed = this.wait;
    } else if (this.isDeleting && this.txt === "") {
      this.isDeleting = false;
      this.wordIndex++;
      typeSpeed = 500;
    }

    this.txtElements.innerHTML = `<span class="txt-cursor">${this.txt}</span>`;

    setTimeout(() => this.type(), 500);
  }
}

document.addEventListener("DOMContentLoaded", init);

function init() {
  const txtElements = document.querySelector(".txt-type");
  const wait = txtElements.getAttribute("data-wait");
  const words = JSON.parse(txtElements.getAttribute("data-words"));

  new Typewriter(txtElements, words, wait);
}
