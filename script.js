"use strict";

function domRemoveParticipant(event) {
    let answer = window.confirm("Are you sure you want to delete " + event.target.parentElement.firstChild.innerText+"?");
    if (answer) {
        let participants = JSON.parse(localStorage.participants);
        participants.splice(event.target.parentElement.rowIndex-1, 1);
        localStorage.participants = JSON.stringify(participants);
        event.target.parentElement.remove();
    }
}

function domAddParticipant(participant) {
    const table = document.querySelector("#participant-table");
    const tr = document.createElement("tr");
    table.appendChild(tr);

    tr.addEventListener('dblclick', domRemoveParticipant);

    for (const key in participant) {
        const td = document.createElement("td");
        td.innerText = participant[key];
        tr.appendChild(td);
    }

}

function addParticipant(event) {
    const first = document.querySelector("#first").value;
    const last = document.querySelector("#last").value;
    const role = document.querySelector("#role").value;    

    document.querySelector("#first").value = "";
    document.querySelector("#last").value = "";
        
    // Create participant object
    const participant = {
        first: first,
        last: last,
        role: role
    };

    if (first != "" && last != "") {
        // Add participant to the HTML
        domAddParticipant(participant);

        let participants = JSON.parse(localStorage.participants);
        participants.push( {first: first,
                            last: last,
                            role: role} );
        localStorage.participants = JSON.stringify(participants);
    }

    // Move cursor to the first name input field
    document.getElementById("first").focus();
}

document.addEventListener("DOMContentLoaded", () => {
    // This function is run after the page contents have been loaded
    // Put your initialization code here
    // localStorage.clear();
    if (!localStorage.getItem("participants")) {
        localStorage.setItem("participants", "[]");
    } 
    let participants = JSON.parse(localStorage.participants);
    for (const participant of participants) {
        domAddParticipant(
            { first: participant.first,
                last: participant.last,
                role: participant.role
        });
    }
    document.getElementById("addButton").onclick = addParticipant;
})

/*
// The jQuery way of doing it
$(document).ready(() => {
    // Alternatively, you can use jQuery to achieve the same result
    $("#addButton").click(JQaddParticipant)
    if (!localStorage.getItem("participants")) {
        localStorage.setItem("participants", "[]");
    }
    let participants = JSON.parse(localStorage.participants);
    for (const participant of participants) {
        JQdomAddParticipant(
            { first: participant.first,
                last: participant.last,
                role: participant.role
        });
     }
});

function JQaddParticipant() {
    const first = $("#first").val();
    const last = $("#last").val();
    const role = $("#role").val();

    $("#first").val('');
    $("#last").val('')  

    const participant = {
        first: first,
        last: last,
        role: role
    }

    if (first != '' && last != '') {
        JQdomAddParticipant(participant);

        let participants = JSON.parse(localStorage.participants);
        participants.push( {first: first,
                            last: last,
                            role: role} );
        localStorage.participants = JSON.stringify(participants);
    }

    $("#first").focus();
}

function JQdomAddParticipant(participant) {
    const row = "<tr><td>"+participant.first+"</td>"+
                    "<td>"+participant.last+ "</td>"+
                    "<td>"+participant.role+ "</td></tr>";   

    $('#participant-table tr:last').after(row);
    $('#participant-table tr:last').click(JQdomRemoveParticipant);

}

function JQdomRemoveParticipant() {
    const name = $(this).children(":first").text();
    const answer = confirm("Are you sure you want to delete "+name+"?");
    if (answer) {
        let participants = JSON.parse(localStorage.participants);
        participants.splice($("#participant-table tr").index(this)-1, 1);
        localStorage.participants = JSON.stringify(participants);
        $(this).remove();
    }
}
*/