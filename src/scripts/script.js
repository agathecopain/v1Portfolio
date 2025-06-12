// dark theme
//enregistrement du theme dans local storage
function saveTheme(theme) {
  document.body.className = theme;
  localStorage.setItem(`theme`, theme);
}

//switch icone sun/moon en fonction du theme
function toggleBtn(theme) {
  const themeBtn = document.getElementById(`theme-toggle`);
  switch (theme) {
    case `dark`:
      themeBtn.innerHTML = `
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        role="img"
        aria-hidden="true"
        class="sun"
        style="font-size: 20px; height: 24px; width: 24px;fill: #fcfefe"
      >
        <path
          d="M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,2L14.39,5.42C13.65,5.15 12.84,5 12,5C11.16,5 10.35,5.15 9.61,5.42L12,2M3.34,7L7.5,6.65C6.9,7.16 6.36,7.78 5.94,8.5C5.5,9.24 5.25,10 5.11,10.79L3.34,7M3.36,17L5.12,13.23C5.26,14 5.53,14.78 5.95,15.5C6.37,16.24 6.91,16.86 7.5,17.37L3.36,17M20.65,7L18.88,10.79C18.74,10 18.47,9.23 18.05,8.5C17.63,7.78 17.1,7.15 16.5,6.64L20.65,7M20.64,17L16.5,17.36C17.09,16.85 17.62,16.22 18.04,15.5C18.46,14.77 18.73,14 18.87,13.21L20.64,17M12,22L9.59,18.56C10.33,18.83 11.14,19 12,19C12.82,19 13.63,18.83 14.37,18.56L12,22Z"
        ></path>
      </svg>`;
      break;
    case `light`:
      themeBtn.innerHTML = `
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        role="img"
        aria-hidden="true"
        class="moon"
        style="font-size: 20px; height: 24px; width: 24px; fill: #262626"
      >
        <path
          d="M17.75,4.09L15.22,6.03L16.13,9.09L13.5,7.28L10.87,9.09L11.78,6.03L9.25,4.09L12.44,4L13.5,1L14.56,4L17.75,4.09M21.25,11L19.61,12.25L20.2,14.23L18.5,13.06L16.8,14.23L17.39,12.25L15.75,11L17.81,10.95L18.5,9L19.19,10.95L21.25,11M18.97,15.95C19.8,15.87 20.69,17.05 20.16,17.8C19.84,18.25 19.5,18.67 19.08,19.07C15.17,23 8.84,23 4.94,19.07C1.03,15.17 1.03,8.83 4.94,4.93C5.34,4.53 5.76,4.17 6.21,3.85C6.96,3.32 8.14,4.21 8.06,5.04C7.79,7.9 8.75,10.87 10.95,13.06C13.14,15.26 16.1,16.22 18.97,15.95M17.33,17.97C14.5,17.81 11.7,16.64 9.53,14.5C7.36,12.31 6.2,9.5 6.04,6.68C3.23,9.82 3.34,14.64 6.35,17.66C9.37,20.67 14.19,20.78 17.33,17.97Z"
        ></path>
      </svg>`;
      break;
  }
  return themeBtn;
}

//switch entre dark et light au click
function toggleTheme() {
  const current = document.body.className;
  const next = current === `light` ? `dark` : `light`;
  saveTheme(next);
  toggleBtn(next);
}

//theme lors du chargement de la page
window.onload = () => {
  const savedTheme = localStorage.getItem(`theme`) || "light";
  saveTheme(savedTheme);
  toggleBtn(savedTheme);
};

//menu burger-------------------------------------------------------

const menuBurger = document.getElementById(`menuBurger`);
const nav = document.getElementById(`menu`);
const chevron = document.querySelector(`.chevron-compact-down`);
menuBurger.addEventListener("click", () => {
  nav.classList.toggle(`open`);
  const currentMenu = nav.className;
  const isOpen = currentMenu.includes(`open`);
  chevron.style.transform = isOpen ? "rotate(180deg)" : "rotate(0deg)";
});

//intégration compétences-------------------------------------------

//filter
const skillsWebBtn = document.getElementById(`skills-web-btn`);
const skillsProjectBtn = document.getElementById(`skills-projectmgmt-btn`);
const skillsMarketingBtn = document.getElementById(`skills-marketing-btn`);

fetch(`src/scripts/skills.json`)
  .then((response) => response.json())
  .then((skills) => {
    //Affichage par défaut
    const defaultSkills = skills.filter((e) =>
      e.categorie.includes(`Développement web`)
    );
    generateSkills(defaultSkills);
    skillsWebBtn.classList.add("activeBtn");
    skillsProjectBtn.classList.remove("activeBtn");
    skillsMarketingBtn.classList.remove("activeBtn");

    //Affichage des skills dev web en cliquant
    skillsWebBtn.addEventListener("click", () => {
      const filteredSkillsDevWeb = skills.filter((e) =>
        e.categorie.includes(`Développement web`)
      );
      generateSkills(filteredSkillsDevWeb);
      skillsWebBtn.classList.add("activeBtn");
      skillsProjectBtn.classList.remove("activeBtn");
      skillsMarketingBtn.classList.remove("activeBtn");
    });

    //Affichage des skills gestion de projet en cliquant
    skillsProjectBtn.addEventListener("click", () => {
      const filteredSkillsPM = skills.filter((e) =>
        e.categorie.includes(`Gestion de projet`)
      );
      generateSkills(filteredSkillsPM);
      skillsProjectBtn.classList.add("activeBtn");
      skillsWebBtn.classList.remove("activeBtn");
      skillsMarketingBtn.classList.remove("activeBtn");
    });

    //Affichage des skills market digital en cliquant
    skillsMarketingBtn.addEventListener("click", () => {
      const filteredSkillsMarket = skills.filter((e) =>
        e.categorie.includes(`Marketing digital`)
      );
      generateSkills(filteredSkillsMarket);
      skillsMarketingBtn.classList.add("activeBtn");
      skillsProjectBtn.classList.remove("activeBtn");
      skillsWebBtn.classList.remove("activeBtn");
    });
  })
  .catch((error) => {
    console.error(error);
  });

//fonction pour injecter les skills
const containerSkills = document.getElementById(`skills-container`);
function generateSkills(el) {
  containerSkills.innerHTML = "";
  el.forEach((skill) => {
    const divSkills = document.createElement(`div`);
    divSkills.innerHTML = `
    <h3>${skill.svg}${skill.nom}</h3>
    <p>${skill.commentaire}</p>`;
    containerSkills.appendChild(divSkills);
  });
}

//intégration expériences------------------------------------------------------

//on récupère les boutons formation et job
const formationBtn = document.querySelector(`.formation-btn`);
const jobBtn = document.querySelector(`.job-btn`);

fetch(`src/scripts/experiences.json`)
  .then((response) => response.json())
  .then((data) => {
    const defaultExperiences = data.filter((e) =>
      e.statut.includes(`Formation`)
    );
    generateExperiences(defaultExperiences);
    formationBtn.classList.add("active-xpBtn");
    jobBtn.classList.remove("active-xpBtn");
    generateModal(data);

    //Affichage des formations en cliquant
    formationBtn.addEventListener("click", () => {
      const formations = data.filter((e) => e.statut.includes(`Formation`));
      generateExperiences(formations);
      formationBtn.classList.add("active-xpBtn");
      jobBtn.classList.remove("active-xpBtn");
      generateModal(data);
    });

    //Affichage des jobs en cliquant
    jobBtn.addEventListener("click", () => {
      const jobs = data.filter((e) =>
        e.statut.includes(`Expérience professionnelle`)
      );
      generateExperiences(jobs);
      jobBtn.classList.add("active-xpBtn");
      formationBtn.classList.remove("active-xpBtn");
      generateModal(data);
    });
  })
  .catch((error) => {
    console.error(error);
  });

const containerExperiences = document.getElementById(`experiences-container`);
function generateExperiences(experiences) {
  containerExperiences.innerHTML = "";
  function compare(a, b) {
    if (a.dateStart > b.dateStart) {
      return -1;
    }
    if (a.dateStart < b.dateStart) {
      return 1;
    }
    return 0;
  }
  const sortedExperiences = experiences.concat([]).sort(compare);
  console.log(sortedExperiences);
  sortedExperiences.forEach((experience, index) => {
    const divExperiences = document.createElement(`div`);
    divExperiences.classList.add(`experience-card`);
    divExperiences.innerHTML = `
  <p class="dateXp">${experience.dates}</p>
  <div class="titleXp">
    <h3>${experience.titre}</h3>
    <p>${experience.type} · ${experience.entreprise}</p>
</div>
<div class="brefXp">
<div class="summary">
<svg xmlns="http://www.w3.org/2000/svg" width="14px" height="14px" fill="currentColor" class="bi bi-caret-right-fill" viewBox="0 0 16 16">
<path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
</svg>
<p>${experience.summary}</p>
</div>
<div class="like">
<span>🩷</span>
<p>${experience.like}</p>
</div>
</div>
<button class="modal-btn modal-trigger" data-id="${experience.id}">(+)</button>
    `;
    containerExperiences.appendChild(divExperiences);
  });
}

//Affichage modal--------------------------------------------------------------
const modalContainer = document.querySelector(".modal-container");

function generateModal(experiences) {
  modalContainer.innerHTML = "";
  const overlay = document.createElement("div");
  overlay.classList.add("overlay", "modal-trigger");
  modalContainer.appendChild(overlay);
  experiences.forEach((experience) => {
    const modal = document.createElement(`div`);
    modal.classList.add("modal");
    //on ajoute l'attribut data-id et sa valeur : id à toutes les modales
    modal.setAttribute("data-id", experience.id);
    modal.innerHTML = `
    <button class="close-modal modal-trigger">(×)</button>
    <div class="modal-header">
      <p class="modal-date">${experience.dates}</p>
      <p class="modal-entreprise">${experience.entreprise}</p>
      <p class="modal-lieu">${experience.lieu}</p>
    </div>
    <div class="modal-body">
      <h3 class="modal-titre">${experience.titre}</h3>
    </div>
    `;
    const missions = experience.mission;
    console.log(missions);
    const modalMission = document.createElement(`ul`);
    modalMission.classList.add("modal-mission")
    missions.forEach((el) => {
      modalMission.innerHTML += `
  <li>${el}</li>
      `;
      console.log(`modal-mission : `, modalMission);
      modal.appendChild(modalMission);
    });

    modalContainer.appendChild(modal);
  });

  const modalTriggers = document.querySelectorAll(".modal-trigger"); //modalTriggers est un tableau contenant les boutons d'activation des modales
  console.log(`modal triggers`, modalTriggers);

  modalTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      //on récupère l'attribut data-id du bouton sélectionnée
      const experienceId = trigger.getAttribute(`data-id`);
      console.log(experienceId);
      toggleModal(experienceId);
    });
  });

  function toggleModal(experienceId) {
    //on rend la modale visible
    modalContainer.classList.toggle("active");
    //on récupère un tableau de modales et on leur enlève la classe active
    console.log(document.querySelectorAll(".modal"));
    document.querySelectorAll(".modal").forEach((modal) => {
      modal.classList.remove("active");
    });
    //on récupère la modale et son attribut data-id équivalent à celui du bouton
    const modalToOpen = document.querySelector(
      `.modal[data-id="${experienceId}"]`
    );
    if (modalToOpen) {
      modalToOpen.classList.add("active");
    }
  }
}

//Contact btn flip-------------------------------------------------------------
const contactBtn = document.getElementById(`contact`);
contactBtn.addEventListener("click", () => {
  contactBtn.classList.toggle(`flip`);
});
