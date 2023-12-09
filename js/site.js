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
    dropdownMenu.innerHTML ='';
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
    document.getElementById('stats-location').textContent = 'All' ;

}

function getEvents() {
    //TODO: get events from local storage
    let eventsJson = localStorage.getItem('ho-events');

    let storedEvents = events;

    if (eventsJson == null) {
        saveEvents(events);
    } else {
        storedEvents = JSON.parse(eventsJson);
    }
    
    
    return storedEvents;
}

function saveEvents(events) {

    let eventsJson = JSON.stringify(events);
    localStorage.setItem('ho-events', eventsJson);
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
        eventAttendance.innerText = event.attendance.toLocaleString();
        eventRow.appendChild(eventAttendance);

        let eventDate = document.createElement('td');
        let date = new Date(event.date);
        eventDate.innerText = date.toLocaleDateString();
        eventRow.appendChild(eventDate);

        //  - append te row to the <tbody>
        eventTable.appendChild(eventRow);
    }
}

/* function sumAttendance(events) {
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
    for (let d = events.length - 1, s = 0; s <= d; d--) {

        let max = events[s].attendance
        let min = events[d].attendance
        if (max < min) {
            s++
            d++;
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

} */

function calculatingStats(events) {
    let sum = 0; //create a base variable
    let min = events[0].attendance;
    let max = 0;

    for (let i = 0; i < events.length; i++) {
        let event = events[i];

        sum += event.attendance;

        if (event.attendance < min) {
            min = event.attendance;
        }

        if (event.attendance > max) {
            max = event.attendance;
        }

    }
    let average = sum / events.length;

    let stat = {
        sum, average, min, max
        // the same as
        // sum: sum,
        // average: average,
        // min: min,
        // max: max
    }
    return stat;
}

function displaystats(events) {
    let stats = calculatingStats(events);
    // calculating and displaying the total attenance
    document.getElementById('total-attendance').textContent = stats.sum.toLocaleString();
    // calculating and displaying the average attenance
    document.getElementById('average-attendance').textContent = Math.round(stats.average).toLocaleString();

    document.getElementById('max-attended').textContent = stats.max.toLocaleString();

    // calculating and displaying the min attenance
    document.getElementById('min-attended').textContent = stats.min.toLocaleString();

}

function filterByCity(element) {

    // figure out which city we want
    let cityName = element.textContent;
    document.getElementById('stats-location').textContent = cityName;
    // get all the events
    let allEvents = getEvents();
    // filter those events to just one city

    /* if (cityName == 'All'){
        filteredEvents = [];
    } else {
        filteredEvents = allEvents.fillter(event => event.city == cityName);
    }
    */
    let filteredEvents = [];
    for (let i = 0; i < allEvents.length; i++) {
        let event = allEvents[i];

        if (event.city == cityName || cityName == 'All') {
            filteredEvents.push(event);
        }
    }
    // call displayStats with the events for that city
    displaystats(filteredEvents);

    // call displaysEvents with the events for that city
    displayEvents(filteredEvents);

}

function saveNewEvent() {
    // at the html form elemment
    let newEventForm = document.getElementById('newEventForm');

    //create an object from input
    let formData = new FormData(newEventForm);
    let newEvent = Object.fromEntries(formData.entries());  
    // fix the formats of data
    newEvent.attendance = parseInt(newEvent.attendance);
    newEvent.date = new Date (newEvent.date).toLocaleDateString();
    // get all the current events
    let allEvents = getEvents();
    // add the new even
    allEvents.push(newEvent)
    // save all events with the new event
    saveEvents(allEvents);
    // reset the form inputs
    newEventForm.reset();
    // hide the bootstrap modal
    let modalElement = document.getElementById('addEvent');
    let bsModal = bootstrap.Modal.getInstance(modalElement);
    bsModal.hide();

    // display all events
    buildDropDown();
    
}