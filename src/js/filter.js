//  необходимые импорты из visitcards.js deleteVisits() addCardVisit()

function filterCardVisit(cardsArray, doctor, urgency) {
  let selectedCardsArray = [];

  for (let obj of cardsArray) {
    if (obj.fio.toLowerCase().indexOf(inputSearch.value) !== -1 || obj.title.toLowerCase().indexOf(inputSearch.value) !== -1 || obj.description.toLowerCase().indexOf(inputSearch.value) !== -1) {
      selectedCardsArray.push(obj);
    }
  }

  selectedCardsArray = selectedCardsArray.filter(item => {
    if (doctor === item.doctor || doctor === 'all') {
      return true;
    } else {
      return false;
    }
  });

  selectedCardsArray = selectedCardsArray.filter(item => {
    if (urgency === item.urgency || urgency === 'all') {
      return true;
    } else {
      return false;
    }
  });
  console.log(selectedCardsArray);
  deleteVisits();
  selectedCardsArray.forEach(visit => addCardVisit(visit))

}

const inputSearch = document.querySelector('.filter__search');
const selectDoctor = document.querySelector('#status-doctor');
const selectUrgency = document.querySelector('#status-priority');
const searchBtn = document.querySelector('.filter__search-btn');
let doctor;
let urgency;

selectDoctor.addEventListener('change', (event) => {
  doctor = event.target.value;
  return doctor;
});

selectUrgency.addEventListener('change', (event) => {
  urgency = event.target.value;
  return urgency;
});

searchBtn.addEventListener('click', async function (event){
  event.preventDefault();
  
  await axios.get('https://cards.danit.com.ua/cards',    
  {headers: { "Authorization" : `Bearer ${localStorage.getItem('token')}` } 
  })
  
  .then(response => {
    console.log(response.data, doctor, urgency)
    
    filterCardVisit(response.data, doctor, urgency);
    addMessage(document.querySelectorAll('.visit-card').length, document.querySelector('.visit-board'));
    showHideVisit(document.querySelectorAll('.open-visit'));
    deleteCard(document.querySelectorAll('.btn-delete'))
  });

});

async function delete2(cardId){
  await axios({
    method: 'DELETE',
    url: `http://cards.danit.com.ua/cards/${cardId}`,
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
})
    .then(response => {
        console.log(response.data)
    })
}