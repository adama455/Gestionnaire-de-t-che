// Tableau pour stocker les tâches
const tasks = [];
const taskList = document.getElementById("blocListe");
const taskForm = document.getElementById("taskForm");
const title = document.getElementById("taskTitle");
const taskIdInput = document.getElementById("taskId"); //recupération du Input hidden
const btn = document.getElementById("ajoutTache");
const radio = document.getElementsByName("priorite");

function creBouton(classIcon, text, idBtn) {
  const span = document.createElement("span");
  const bouton = document.createElement("button");
  bouton.className = classIcon;
  bouton.textContent = text;
  bouton.id = idBtn;
  span.appendChild(bouton);
  return span;
}
function creDiv(classDiv, field1) {
  const div = document.createElement("div");
  div.className = classDiv;
  div.appendChild(field1);
  return div;
}

function divActions(btn1, btn2) {
  div = document.createElement("div");
  div.className = "col-3  d-flex justify-content-around align-items-end";
  div.append(btn1, btn2);
  return div;
}

function supprimerTache(index) {
  tasks.splice(index, 1);
  afficherTaches();
}

function terminerTache() {
  InputCheck = document.querySelectorAll(".terminer");
  InputCheck.forEach((elem) => {
    console.log(elem.id);
    document.getElementById(elem.id).addEventListener("click", (e) => {
      console.log("successeur::", e.target.parentElement.nextElementSibling);
      elemntSuivant = e.target.parentElement.nextElementSibling;
      titreTache = elemntSuivant.firstElementChild;
      titreTache.classList.toggle("tache_terminer");
      boutonEdit = elemntSuivant.nextElementSibling.firstElementChild.firstElementChild;
      boutonEdit.classList.toggle("desactiveBEdit");
      console.log("le titre de la tache:", titreTache);
    });
  });
}

function remplirFormulaire(index) {
  taskIdInput.value = index; //remplir la valeur de Input hidden
  title.value = tasks[index].title;
}

function creTasks(titleTask, index) {
  console.log("Nombre fils : ", taskList.childNodes.length);
  let nombre = taskList.childNodes.length + 1;
  card = document.createElement("div");
  cardBody = document.createElement("div");
  row = document.createElement("div");
  para = document.createElement("p");
  para.className = "card-text";
  para.textContent = titleTask;
  card.className = "card mb-2";
  cardBody.className = "card-body";
  card.id = `card_tache_${nombre}`;
  para.id = `tache_${nombre}`;
  row.className = "row";
  inputCk = document.createElement("input");
  inputCk.type = "checkbox";
  inputCk.name = "check";
  inputCk.className = "terminer mt-2";
  if (tasks[index].priorite == "elevee") {
    inputCk.classList.add("checkPrioElevee");
  } else {
    inputCk.classList.add("checkPrioFaible");
  }
  inputCk.id = `check_tache_${nombre}`;
  inputCheck = creDiv("col-1", inputCk);
  boutonEdit = creBouton(
    "btn btn-sm btn-info bEdit ",
    "Editer",
    `edit_tache_${nombre}`
  );
  boutonEdit.addEventListener("click", (e) => remplirFormulaire(index));
  boutonSupp = creBouton(
    "btn btn-sm btn-danger bSupp",
    "Supprimer",
    `supp_tache_${nombre}`
  );
  boutonSupp.addEventListener("click", () => supprimerTache(index));
  boutonActions = divActions(boutonEdit, boutonSupp);
  row.append(inputCheck, creDiv("col-8", para), boutonActions);
  cardBody.appendChild(row);
  card.appendChild(cardBody);

  return card;
}

function ajouterModifierTache(e) {
  e.preventDefault();
  // Récupérer les valeurs du formulaire
  const taskText = title.value.trim();
  const taskIndex = parseInt(taskIdInput.value);// Convertir la valeur en entier
  for (let i = 0; i < radio.length; i++) {
    if (radio[i].checked) {
      priorite = radio[i].value;
      if (taskText !== "") {
        if (taskIndex >= 0 && taskIndex < tasks.length) {
          // Si un index valide est fourni, modifier la tâche existante
          tasks[taskIndex].title = taskText;
          tasks[taskIndex].priorite = priorite;
          taskIdInput.value = ""; // Vider le Input hidden
        } else {
          // Sinon, ajouter une nouvelle tâche
          // Créer un objet tâche
          const newTask = {
            title: taskText,
            priorite: priorite,
          };
          // Ajouter la tâche à la liste des tâches
          tasks.push(newTask);
        }
      }
      afficherTaches();
      taskForm.reset();
    }
  }
  // Afficher les tâches dans la console pour vérification
  console.log(tasks);
}

// Fonction pour afficher les tâches dans l'interface utilisateur
function afficherTaches() {
  taskList.innerHTML = ""; // Efface les tâches précédentes

  if (tasks.length == 0) {
    const H1 = document.createElement("h1");
    H1.textContent = "Aucune tâche trouvée !";
    taskList.appendChild(H1);
  }
  tasks.forEach((task, index) => {
    console.log("mon titre---", task.title);
    const p = document.createElement("p");
    tache = creTasks(task.title, index);
    taskList.appendChild(tache);
  });

  terminerTache();
  //modifierTache();
}

// Ajouter un écouteur d'événements pour soumettre le formulaire
taskForm.addEventListener("submit", ajouterModifierTache);

// Afficher les tâches initiales au chargement de la page
afficherTaches();
