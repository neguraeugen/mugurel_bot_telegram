function displayVillages() {
    var container = document.getElementById("villages-buttons");
    container.innerHTML = "";

    villagesList.forEach(function(nameVillage) {
        var button = document.createElement("button");
        button.className = "button";
        button.textContent = nameVillage;
        button.addEventListener("click", function() {
            window.location.href = "Planned_Days/Display_Calculated_Days.html?nameVillage=" + encodeURIComponent(nameVillage);
        });
        container.appendChild(button);
    });
}

function addVillage(nameVillage) {
    if (!villagesList.includes(nameVillage)) {
        villagesList.push(nameVillage);
        displayVillages();
    }
}

function removeVillage(nameVillage) {
    var index = villagesList.indexOf(nameVillage);
    if (index !== -1) {
        villagesList.splice(index, 1);
        displayVillages();
    }
}

document.addEventListener("DOMContentLoaded", function() {
    displayVillages();
});
