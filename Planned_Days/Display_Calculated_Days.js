document.addEventListener("DOMContentLoaded", function() {
    var urlParams = new URLSearchParams(window.location.search);
    var nameVillage = urlParams.get('nameVillage');
    var dayOfWeek = urlParams.get('dayOfWeek') || 0;  // Aici poți schimba ziua din Duminică în altă zi (Ziua de Duminică are ID 0)
    displayCalculatedDays(nameVillage, parseInt(dayOfWeek));
});

var village = "Satul";

function displayCalculatedDays(nameVillage, dayOfWeek) {
    document.title = `${village} ${nameVillage}`;
    var header = document.querySelector(".text-header");
    header.textContent = `${village} ${nameVillage}`;

    var container = document.getElementById("buttonsContainer");
    container.innerHTML = "";

    var days = calculateDays(dayOfWeek);

    days.forEach(function(day) {
        var button = document.createElement("button");
        button.classList.add("button");
        button.textContent = formatDate(day);
        button.addEventListener("click", function() {
            navigateToDayPage(day, nameVillage);
        });
        container.appendChild(button);
    });
}

function calculateDays(dayOfWeek) {
    var days = [];
    var currentDate = new Date();

    while (currentDate.getDay() !== dayOfWeek) {
        currentDate.setDate(currentDate.getDate() + 1);
    }

    for (var i = 0; i < 5; i++) {
        days.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 7);
    }

    return days;
}

function formatDate(date) {
    var options = { day: 'numeric', month: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('ro-RO', options);
}

function navigateToDayPage(date, nameVillage) {
    var formattedDate = formatDate(date).replace(/\s+/g, '.');
    window.location.href = "../Planned_Publishers_and_Drivers/Planned_Publishers_and_Drivers.html?date=" + 
    encodeURIComponent(formattedDate) + "&nameVillage=" + encodeURIComponent(nameVillage);
}
