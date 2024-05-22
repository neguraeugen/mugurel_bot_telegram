function displayAnnouncements() {
    for (var i = 0; i < announcementsList.length; i++) {
        var element = document.createElement("div");
        element.innerHTML = announcementsList[i];
        element.style.marginBottom = "15px";
        document.getElementById("display-announcements").appendChild(element);
    }
}

displayAnnouncements();
