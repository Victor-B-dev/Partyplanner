// create a state to hold information from api call
const state = {
  allEvents: [],
  newEvent: {}
}

// dom selectors
const main = document.querySelector('main')
const ul = document.querySelector('ul')
const addEventButton = document.querySelector(`button`)


// create function to do API call.
// it will store this data into state
// extra note - we do want to do the call renderEvents() here otherwise the call stack doesn't work in the correct order. had error for a moment
// we separate out the render events function into another block of code for easier readability.
// put the whole API call in a try catch.
const getEvents = async () => {
  try {
    const response = await fetch(`https://fsa-crud-2aa9294fe819.herokuapp.com/api/2406-FTB-ET-WEB-FT/events`);
    const events = await response.json();

    state.allEvents = events.data;
    renderEvents();
  } catch (err){
    console.log(err);
  }
}

// loop through each event stored in state array
// return displayed information will need to be in literals since we are adding each event as list item
const renderEvents = () => {
  const eventInfo = state.allEvents.map((singleEvent) => {
    return `<li> Name:${singleEvent.name} <br>
            Description: ${singleEvent.description} <br>
            Date: ${singleEvent.date} <br>
            Location: ${singleEvent.location} </li>`;
  });

  ul.innerHTML = (eventInfo.join(``));
}

// when form submit is clicked, take form information and put it into state.newEvent object
// add the object to state.allEvents array
// run renderEvents to update page

// note this add event is only locally updating the page, not adding it to the database. nor does it check if the event already exists.
addEventButton.addEventListener('click', (event)=> {
  event.preventDefault();

  let inputName = document.querySelector('#addEventName').value;
  let inputDescript = document.querySelector('form #addEventDescript').value;
  let inputDate = document.querySelector('form #addDate').value;
  let inputLoc = document.querySelector('form #addEventLoc').value;

  newEvent = {
    name: inputName,
    description: inputDescript,
    date: inputDate,
    location: inputLoc,
  }

  state.allEvents.push(newEvent);
  renderEvents();
})

// run the code
getEvents();


// regarding extra rubric critera. adding a delete button we would want to include the button when rendering each list items
//so this is line 34-38 we could include something like <br> <button>Delete This Party</button>
// write a separate function/DOM to select the clicked on LI and then remove that LI item from the state array.
// would need to add additional wrapper that isn't rendered so we could include the index # for example and use that to select the proper item from the array
// then render update i guess.