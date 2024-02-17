class MobileMenu {
  constructor() {
    this.menuIcon = document.querySelector(".menu-icon");
    this.menuList = document.querySelectorAll(".menu-list");
    this.hamburgerIcon = document.querySelector(".menu-icon i");

    this.initEventListeners();
  }

  initEventListeners() {
    this.menuIcon.addEventListener("click", () => this.toggleMenu());
  }

  toggleMenu() {
    this.hamburgerIcon.classList.toggle("fa-bars");
    this.hamburgerIcon.classList.toggle("fa-xmark");
    this.menuList.forEach((menuItem) => {
      menuItem.style.display = this.hamburgerIcon.classList.contains("fa-bars")
        ? "none"
        : "block";
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const mobileMenu = new MobileMenu();
});

class TwoInputChecker {
  constructor(twoInputs) {
    this.twoInputs = twoInputs;
  }

  getInputContent(input) {
    return input.value;
  }

  insertContent(htmlInput, content) {
    htmlInput.textContent = content;
  }

  addClass(htmlInput, className) {
    htmlInput.classList.add(className);
  }

  removeClass(htmlInput, className) {
    htmlInput.classList.remove(className);
  }

  InputCleaner(input1value, input2value, htmlInput) {
    if (input1value === "" && input2value === "") {
      this.insertContent(htmlInput, "");
    }
  }

  validatePassword(password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(password);
  }

  revealPassword(inputField) {
    const button = inputField.nextElementSibling;

    const togglePasswordVisibility = (event) => {
      event.preventDefault();
      inputField.type = event.type === "mousedown" ? "text" : "password";
    };

    button.addEventListener("mousedown", togglePasswordVisibility);
    button.addEventListener("mouseup", togglePasswordVisibility);
    button.addEventListener("mouseleave", togglePasswordVisibility);
  }
}

document.addEventListener("mouseup", (event) => {
  const buttons = document.querySelectorAll(".reveal-button");
  buttons.forEach((button) => {
    const inputField = button.previousElementSibling;
    if (!button.contains(event.target)) {
      inputField.type = "password";
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const passwords = document.querySelectorAll(".password-input input");
  const resultText = document.querySelector(".result-text");

  const inputChecker = new TwoInputChecker(passwords);

  passwords.forEach((oneInput) => {
    inputChecker.revealPassword(oneInput);
    oneInput.addEventListener("input", (event) => {
      const password1value = inputChecker.getInputContent(passwords[0]);
      const password2value = inputChecker.getInputContent(passwords[1]);

      if (password1value && password2value) {
        const isValid =
          inputChecker.validatePassword(password1value) &&
          password1value === password2value;

        if (isValid) {
          inputChecker.insertContent(
            resultText,
            "Passwords are matching and valid"
          );
          inputChecker.removeClass(resultText, "not-matching");
          inputChecker.addClass(resultText, "matching");
        } else {
          inputChecker.insertContent(
            resultText,
            "Passwords are not matching or not valid"
          );
          inputChecker.removeClass(resultText, "matching");
          inputChecker.addClass(resultText, "not-matching");
        }

        inputChecker.InputCleaner(password1value, password2value, resultText);
      }
    });

    oneInput.type = "password";
  });
});

class ThemeChanger {
  constructor(btnLight, btnDark, body, h1, h2, footerElements, nav) {
    this.btnLight = btnLight;
    this.btnDark = btnDark;
    this.body = body;
    this.h1 = h1;
    this.h2 = h2;
    this.footerElements = footerElements;
    this.nav = nav;

    this.btnLight.addEventListener("click", this.setLightMode.bind(this));
    this.btnDark.addEventListener("click", this.setDarkMode.bind(this));
  }

  setLightMode() {
    this.body.style.backgroundColor = "var(--white)";
    this.body.style.color = "var(--background)";
    this.nav.style.backgroundImage =
      "repeating-linear-gradient(45deg, var(--dark-grey), var(--background) 2px, var(--background) 2px, var(--background) 10px)";

    document.querySelectorAll("h1, h2").forEach((e) => {
      e.style.textShadow = "none";
      e.style.color = "var(--dark-green)";
    });

    document.querySelector("footer").style.color = "var(--white)";
    document.querySelector("footer").style.backgroundColor =
      "var(--background)";
  }

  setDarkMode() {
    this.body.style.backgroundColor = "var(--background)";
    this.body.style.color = "var(--light-grey)";
    this.nav.style.backgroundImage =
      "repeating-linear-gradient(45deg, var(--background), var(--dark-grey) 2px, var(--dark-grey) 2px, var(--dark-grey) 10px)";

    document.querySelectorAll("h1, h2").forEach((e) => {
      e.style.textShadow = "4px 4px 8px black";
      e.style.color = "var(--green)";
    });
    document.querySelector("footer").style.backgroundColor = "var(--dark-grey)";
  }
}

const btnLight = document.querySelector(".light");
const btnDark = document.querySelector(".dark");
const body = document.body;
const headline1 = document.querySelector("h1");
const headline2 = document.querySelector("h2");
const footerElements = document.querySelector("footer");
const nav = document.querySelector("nav");

const themeChanger = new ThemeChanger(
  btnLight,
  btnDark,
  body,
  headline1,
  headline2,
  footerElements,
  nav
);

class ScrollManager {
  constructor() {
    this.scrollBtn = null;
    this.initScrollButton();
    window.addEventListener("scroll", this.handleScroll.bind(this));
    this.scrollBtn.addEventListener("click", this.scrollToTop.bind(this));
  }

  initScrollButton() {
    this.scrollBtn = document.createElement("button");
    this.scrollBtn.innerHTML = "&uarr;";
    this.scrollBtn.setAttribute("id", "scroll-btn");
    document.body.appendChild(this.scrollBtn);
    this.handleScroll();
  }

  handleScroll() {
    window.scrollY > window.innerHeight / 3
      ? this.scrollBtn.classList.add("show")
      : this.scrollBtn.classList.remove("show");
  }

  scrollToTop() {
    const scrollWindow = () => {
      if (window.scrollY !== 0) {
        setTimeout(() => {
          window.scrollTo(0, window.scrollY - 50);
          scrollWindow();
        }, 10);
      }
    };
    scrollWindow();
  }
}

const scrollManager = new ScrollManager();
