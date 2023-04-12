const today = new Date();
const thisYear = today.getFullYear();
const footer = document.querySelector("footer");
const copyright = document.createElement("p");

copyright.innerHTML = ` Alzhan Braliyev &copy ${thisYear}`;
footer.appendChild(copyright);

// -- Putting skills in HTML in ul and li
const skills = ["Java Script", "HTML", "CSS", "Node.js", "Mocha", "React", "MySQL"]; 
const skillsSection = document.getElementById("skills");
const skillsList = skillsSection.querySelector("ul");
for (let i = 0; i < skills.length; i++) {
    let skill = document.createElement("li");
    skill.innerText = skills[i];
    skillsList.appendChild(skill);
}
// -- Creating Messages form with input fields
const messageForm = document.getElementsByName("leave_message");
messageForm.item(0).addEventListener("submit", (event) => { 
    event.preventDefault();  
    const nameInput = event.target.name.value; 
    const emailInput = event.target.email.value;
    const messageInput = event.target.message.value;
    console.log(nameInput, emailInput, messageInput); 

    const messageSection = document.getElementById("messages");
    const messageList = messageSection.querySelector("ul");
    const newMessage = document.createElement("li");
   
    newMessage.innerHTML = `<a href="mailto:${emailInput}">${nameInput}</a> <span> ${messageInput} </span>`;
    messageList.appendChild(newMessage);

// -- Remove button and disappearing Messages section
    const removeButton = document.createElement("button");
    removeButton.innerText = "Remove";
    removeButton.type = "button";

    removeButton.addEventListener("click", function() {
        const entry = removeButton.parentNode;
        entry.remove();
        if (messageList.childElementCount === 0) {
            messageSection.style.display = "none";
        }
    });

    messageSection.style.display = "block"
    newMessage.appendChild(removeButton);
    messageList.appendChild(newMessage);

// -- Creating Edit button and new input prompt
    const editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.type = "button";
    editButton.addEventListener("click", () => {
        let editMessage = prompt("Enter your new message:", `${messageInput}`);
        newMessage.innerHTML = `<a href="mailto:${emailInput}">${nameInput}</a> <span> ${editMessage} </span>`;
        newMessage.appendChild(removeButton);
        newMessage.appendChild(editButton);
    })
    newMessage.appendChild(editButton);
    messageList.appendChild(newMessage);
    
    document.querySelector("form").reset();

    removeButton.style.backgroundColor = '#ff0545';
    removeButton.style.color = '#fff';
    removeButton.style.border = 'none';
    removeButton.style.borderRadius = '4px';
    removeButton.style.padding = '8px 16px';
    removeButton.style.marginRight = '8px';
    removeButton.style.cursor = 'pointer';
    removeButton.style.fontSize = 'small';
    removeButton.style.justifyContent = "center"

    editButton.style.backgroundColor = '#wa745';
    editButton.style.color = '#fff';
    editButton.style.border = 'none';
    editButton.style.borderRadius = '4px';
    editButton.style.padding = '8px 16px';
    editButton.style.marginRight = '8px';
    editButton.style.cursor = 'pointer';
    editButton.style.fontSize = 'small';
    editButton.style.justifyContent = "center"
});

// Function for fixing the date
const dateFixer = (date) => {
        return date.slice(0, 10);
}
// -- Creating new XHR object
// var githubRequest = new XMLHttpRequest();
// githubRequest.open("GET", "https://api.github.com/users/Alzhan-B/repos");
// githubRequest.send();
// githubRequest.addEventListener("load", () => {
//     var repositories = JSON.parse(githubRequest.responseText);
//     console.log(repositories);

//     const projectSection = document.getElementById("projects");
//     const projectList = projectSection.querySelector("ul");

//     for (let i=0; i<repositories.length; i++) {
//         let project = document.createElement("li");
//         project.innerText = repositories[i].name;
//         projectList.appendChild(project);
//     }
// });

// -- Fetching API by using fetch call method and .then method
fetch("https://api.github.com/users/Alzhan-B/repos")
    .then(response => response.json())
    .then(repositories => {
        const projectSection = document.getElementById("projects");
        const projectList = projectSection.querySelector("ul");
    
        repositories.forEach(repository => {
            let project = document.createElement("li");

            let projectLink = document.createElement("a");
            projectLink.innerText = repository.name;
            projectLink.href = repository.html_url;
            projectLink.target = "_blank";

            let projectDescription = document.createElement("p");
            projectDescription.innerText = repository.description;
            
            let projectDate = document.createElement("p");
            projectDate.innerText = dateFixer(repository.pushed_at)

            project.appendChild(projectLink);
            // project.appendChild(projectDescription);
            project.appendChild(projectDate);
            projectList.appendChild(project);

            project.style.listStyleType = "none";
            project.style.margin = "1rem";
        });
    })
    .catch(error => console.error(error)); // -- Strech goal: handing errors from th server