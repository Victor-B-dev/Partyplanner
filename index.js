

// push the whole API call in a try catch.

// create a state to hold information from api call
const state = {
  allEvents: [],
  selectedEvent: {}
}

// dom selectors
const main = document.querySelector('main')

// create function to do API call.
// it will store this data into state
// extra note - we do want to do the call renderEvents() here otherwise the call stack doesn't work in the correct order. had error for a moment
// we separate out the render events function into another block of code for easier readability.
const getEvents = async () => {
  const response = await fetch(`https://fsa-crud-2aa9294fe819.herokuapp.com/api/2406-FTB-ET-WEB-FT/events`);
  const events = await response.json();

  state.allEvents = events.data;
  renderEvents();
}

// loop through each event stored in state array and display the information.
// create an unordered list for the events.
// displayed information will need to be in literals since we are adding each event as list item
// add the UL into the HTML <main>.
const renderEvents = () => {
  const ul = document.createElement('ul');
  const eventInfo = state.allEvents.map((singleEvent) => {
    return `<li> Name:${singleEvent.name} <br>
            Description: ${singleEvent.description} <br>
            Date: ${singleEvent.date} <br>
            Location: ${singleEvent.location} </li>`;
  });

  
  ul.innerHTML = (eventInfo.join(``));
  main.append(ul);
}

getEvents();







