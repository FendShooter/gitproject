// variables

class GITHUB {
  constructor() {
    this.client_id = "3dcafa0125929797a269";
    this.client_secret = "0354c9f21ba6030900e57394bfefdf36375dae85";
    this.base = "https://api.github.com/users/";
  }
  async ajaxUser(userValue) {
    const userUrl = `${this.base}${userValue}?client_id='${
      this.client_id
          }'&client_secret='${this.client_secret}'`;
      
    const reposUrl = `${this.base}${userValue}/repos?client_id='${
      this.client_id
          }'&client_secret='${this.client_secret}'`;
      
    const reposData = await fetch(reposUrl);
    const repos = await reposData.json();
  
    const response = await fetch(userUrl);
    const user = await response.json();
      return {
          user,
          repos
    }
  }
}
class UI {
  constructor() {
    this.feedback = document.querySelector(".feedback");
  }

  errorFeedback(text) {
    this.feedback.classList.add("showItems");
    this.feedback.innerHTML = text;
    setTimeout(() => {
      this.feedback.classList.remove("showItems");
      this.feedback.innerHTML = "";
    }, 3000);
  }

  // get user
  getUser(user) {
    const {
      avatar_url: image,
      html_url: link,
      public_repos: repos,
      name,
      login,
      message
    } = user;
    if (message === "Not Found") {
      this.errorFeedback("No such user, please enter a correct username");
    } else {
      this.displayUser(image, link, repos, name, login);
      const input = document.querySelector(".form-control");
      input.value= '';
    }
  }
    displayUser(image, link, repos, name, login) {
        let info = '';

        let results = document.querySelector('.results');
        info += `<div class="avatar">
            <img src="${image}" class="avatar" alt="">
        </div>
        <div class="details">
            <div class="detail">Name: <span class="name" >${name}</span></div>
            <div class="detail">Github: <span class="github" >${login}</span></div>
            <div class="detail">link: <a href="${link}">Link</a></div>
            <div class="detail">Public Repos: <span class="plbrepos" >${repos}</span></div>
        </div>
        <article class="getrepos">
            <a href="link"> Get Repos</a>
        </article>`;
        results.innerHTML = info;
    }
}

(function() {
  window.addEventListener("DOMContentLoaded", () => input.focus());

  const form = document.querySelector(".form");
  const input = document.querySelector(".form-control");

  const ui = new UI();
  const github = new GITHUB();

  form.addEventListener("submit", e => {
    e.preventDefault();
    const texteValue = input.value;
    if (texteValue === "") {
      ui.errorFeedback("please enter a correct value");
    } else {
      github.ajaxUser(texteValue).then(data => ui.getUser(data.user));
    }
  });
})();
