const events = [
    {
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 240000,
        date: "06/01/2017",
    },
    {
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 250000,
        date: "06/01/2018",
    },
    {
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 257000,
        date: "06/01/2019",
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 130000,
        date: "06/01/2017",
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 140000,
        date: "06/01/2018",
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 150000,
        date: "06/01/2019",
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 40000,
        date: "06/01/2017",
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 45000,
        date: "06/01/2018",
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 50000,
        date: "06/01/2019",
    },
];

function buildDropDown() {
    // get all the event that we know about
    let currentEvents = getEvents();
    // get a list of unique city names
    let eventCities = currentEvents.map(event => event.city) // return a specific part of the array
    let uniqueCities = new Set(eventCities); // new Set() - only store unique value no repeat
    let dropDownChoices = ['All', ...uniqueCities]; // [... ] turning set into an array

    const dropdownTemplate = document.getElementById('dropdown-item-template');
    const dropdownMenu = document.getElementById('city-dropdown');
    //for eadch of those city names:
    for (let i = 0; i < dropDownChoices.length; i++) {
        let cityName = dropDownChoices[i];
        // - make a dropdown item HTML element
        let dropdownItem = dropdownTemplate.content.cloneNode(true);
        // let dropdownItem = <li><a class="dropdown-item" href="#"></a></li>;
        dropdownItem.querySelector('a').innerText = cityName;
        // - add that element to the dropdown menu
        dropdownMenu.appendChild(dropdownItem);
    }
    displayEvents(currentEvents);
    displaystats(currentEvents);
    maxAttendance(currentEvents);

}

function getEvents() {
    //TODO: get events from local storage

    return events;
}

function displayEvents(events) {

    //get the table to put the event in
    const eventTable = document.getElementById('events-table');

    //clear the table
    eventTable.innerHTML = '';

    //loop through events
    for (let i = 0; i < events.length; i++) {
        let event = events[i];

        // -fill the table with rows
        //  - make a <tr></tr>
        let eventRow = document.createElement('tr');
        //  - put the data into each <td>
        //  - make a <td> for each property
        let eventName = document.createElement('td');
        eventName.innerText = event.event;
        eventRow.appendChild(eventName);

        let eventCity = document.createElement('td');
        eventCity.innerText = event.city;
        eventRow.appendChild(eventCity);

        let eventState = document.createElement('td');
        eventState.innerText = event.state;
        eventRow.appendChild(eventState);

        let eventAttendance = document.createElement('td');
        eventAttendance.innerText = event.attendance;
        eventRow.appendChild(eventAttendance);

        let eventDate = document.createElement('td');
        eventDate.innerText = event.date;
        eventRow.appendChild(eventDate);

        //  - append te row to the <tbody>
        eventTable.appendChild(eventRow);
    }
}

function sumAttendance(events) {
    let sum = 0; //create a base variable

    for (let i = 0; i < events.length; i++) {
        let event = events[i];

        sum += event.attendance;

    }
    return sum;
}
function averageAttendance(events) {
    let sum = 0;

    for (let i = 0; i < events.length; i++) {
        let event = events[i];

        sum += event.attendance;

    }
    let average = sum / events.length;
    return Math.round(average);
}

function maxAttendance(events) {
    let most = '';
    for (let d = events.length - 1, s = 0; s < d; d--) {

        let max = events[s].attendance
        let min = events[d].attendance
        if (max < min) {
            s++
            d = d + 2;
        }
        most = max;
    }
    return most;

}
function minAttendance(events) {
    let least = '';
    for (let d = events.length - 1, s = 0; s < d; d--) {

        let min = events[s].attendance
        let max = events[d].attendance
        if (min > max) {
            s++
            d++
        }
        least = min;
    }
    return least;

}


function displaystats(events) {
    // calculationg and displaying the total attenance
    let total = sumAttendance(events);
    document.getElementById('total-attendance').innerHTML = total.toLocaleString();
    // calculationg and displaying the average attenance
    let average = averageAttendance(events);
    document.getElementById('average-attendance').innerHTML = average.toLocaleString();

    // calculationg and displaying the max attenance
    let max = maxAttendance(events);
    document.getElementById('max-attended').innerHTML = max.toLocaleString();

    // calculationg and displaying the min attenance
    let min = minAttendance(events);
    document.getElementById('min-attended').innerHTML = min.toLocaleString();

}