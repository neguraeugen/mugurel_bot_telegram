document.addEventListener("DOMContentLoaded", function() {
    var urlParams = new URLSearchParams(window.location.search);
    var date = urlParams.get('date');
    var nameVillage = urlParams.get('nameVillage');
    
    var header = document.querySelector(".text-header");
    header.textContent = `${date} - ${nameVillage}`;
    document.title = `${date} - ${nameVillage}`;

    addSetInputs(numberTransport, date, nameVillage);
});

var numberTransport = 3; // Numărul de transporturi afișate în pagină
var numberHeralds = 5; // Numărul de vestitori afișați în blocul cu transport (include și șofer-vestitor)

function createSetInput(index, date, nameVillage) {
    var setInputDiv = document.createElement("div");
    setInputDiv.classList.add("set-input");

    var textHeaderTransport = document.createElement("div");
    textHeaderTransport.classList.add("text-header-transport");
    textHeaderTransport.textContent = "Transportul Nr." + (index + 1);
    setInputDiv.appendChild(textHeaderTransport);

    for (var i = 0; i < numberHeralds; i++) {
        var input = document.createElement("input");
        input.classList.add("input");
        input.type = "text";
        input.dataset.index = `${index} - ${i}`;
        input.dataset.date = date;
        input.dataset.village = nameVillage;

        if (i === 0) {
            input.placeholder = "Planifică-te ca șofer-vestitor";
            input.dataset.role = "driver";
        } else {
            input.placeholder = "Planifică-te ca vestitor";
            input.dataset.role = "herald";
        }

        input.addEventListener("input", handleInput);
        input.addEventListener("change", handleInputChange);
        input.addEventListener("blur", handleInputClear);
        input.addEventListener("focus", handleFocus);
        input.addEventListener("blur", handleBlur);
        setInputDiv.appendChild(input);
    }

    return setInputDiv;
}

function addSetInputs(count, date, nameVillage) {
    var setInputsContainer = document.getElementById("setInputsContainer");
    for (var i = 0; i < count; i++) {
        var setInputDiv = createSetInput(i, date, nameVillage);
        setInputsContainer.appendChild(setInputDiv);
    }

    loadInputValues(date, nameVillage);
}

function handleInput(event) {
    var input = event.target;
    var role = input.dataset.role;
    var dataListId = role + "List";
    var dataList = document.getElementById(dataListId);

    if (!dataList) {
        dataList = document.createElement("datalist");
        dataList.id = dataListId;
        document.body.appendChild(dataList);
    }

    dataList.innerHTML = "";
    var filter = input.value.toLowerCase();
    var namesList = role === "driver" ? driversList : publishersList;

    namesList.forEach(function(name) {
        if (name.toLowerCase().includes(filter)) {
            var option = document.createElement("option");
            option.value = name;
            dataList.appendChild(option);
        }
    });

    input.setAttribute("list", dataListId);
}

function handleInputChange(event) {
    var input = event.target;
    var index = input.dataset.index;
    var role = input.dataset.role;
    var date = input.dataset.date;
    var nameVillage = input.dataset.village;
    var key = `${nameVillage} ${date} ${index} ${role}`;
    var value = input.value;
    localStorage.setItem(key, value);
}

function handleInputClear(event) {
    var input = event.target;
    if (input.value === "") {
        handleInputChange(event);
    }
}

function loadInputValues(date, nameVillage) {
    var inputs = document.querySelectorAll("input[data-date='" + date + "'][data-village='" + nameVillage + "']");

    inputs.forEach(function(input) {
        var index = input.dataset.index;
        var role = input.dataset.role;
        var key = `${nameVillage} ${date} ${index} ${role}`;
        var value = localStorage.getItem(key);
        if (value) {
            input.value = value;
        }
    });
}

function handleFocus(event) {
    event.target.classList.add("input-focus");
}

function handleBlur(event) {
    event.target.classList.remove("input-focus");
}
