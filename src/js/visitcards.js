// необходимые импорты из forms.js: modal, func visitCreationForm, func createVisitCreationForm, visitInputsCollection, 
// func cardiologistInputs(visitInputsCollection), func dentistInputs(visitInputsCollection), 
// func therapistInputs(visitInputsCollection), visitInputsGeneralCreation(visitInputsGeneral)

class Visit {
    constructor({
        id,
        title,
        doctor,
        fio,
        description,
        urgency
    }) {
        this.id = id
        this.title = title
        this.doctor = doctor
        this.fio = fio
        this.description = description
        this.urgency = urgency
    }


}

class VisitCardiologist extends Visit {
    constructor({
        id,
        title,
        doctor,
        fio,
        description,
        urgency,
        normalpreasure,
        massindex,
        diseases,
        age
    }) {
        super({
            id,
            title,
            doctor,
            fio,
            description,
            urgency
        })
        this.normalpreasure = normalpreasure
        this.massindex = massindex
        this.diseases = diseases
        this.age = age
    }

    render() {
        return `<div class="visit-card" data-id="${this.id}">
                    <p>Пациент: ${this.fio}</p>
                    <p>Доктор: ${this.doctor}</p>
                    <p class="open-visit">Показать</p>
                    <div class = "visit-card-hide">
                        <p>Цель визита: ${this.title}</p>
                        <p>Описание визита: ${this.description}</p>
                        <p>Срочность: ${this.urgency}</p>
                        <p>Нормальное давление: ${this.normalpreasure}</p>
                        <p>Индекс массы тела: ${this.massindex}</p>
                        <p>Перенесенные заболевания: ${this.diseases}</p>
                        <p>Возраст: ${this.age}</p>
                        <p>
                            <a href="#" class="btn-visit btn-change">Редактировать</a>
                            <a href="#" class="btn-visit btn-delete">Удалить</a>
                        </p>              
                    </div>
                </div>`

    }
}

class VisitDentist extends Visit {
    constructor({
        id,
        title,
        doctor,
        fio,
        description,
        urgency,
        data
    }) {
        super({
            id,
            title,
            doctor,
            fio,
            description,
            urgency
        })
        this.data = data
    }

    render() {
        return `<div class="visit-card" data-id="${this.id}">
                    <p>Пациент: ${this.fio}</p>
                    <p>Доктор: ${this.doctor}</p>
                    <p class="open-visit">Показать</p>
                    <div class = "visit-card-hide">
                        <p>Цель визита: ${this.title}</p>
                        <p>Описание визита: ${this.description}</p>
                        <p>Срочность: ${this.urgency}</p>
                        <p>Дата последнего визита: ${this.data}</p>
                        <p>
                            <a href="#" class="btn-visit btn-change">Редактировать</a>
                            <a href="#" class="btn-visit btn-delete">Удалить</a>
                        </p>                             
                    </div>
                </div>`
    }
}

class VisitTherapists extends Visit {
    constructor({
        id,
        title,
        doctor,
        fio,
        description,
        urgency,
        age
    }) {
        super({
            id,
            title,
            doctor,
            fio,
            description,
            urgency
        })
        this.age = age
    }

    render() {
        return `<div class="visit-card" data-id="${this.id}">
                    <p>Пациент: ${this.fio}</p>
                    <p>Доктор: ${this.doctor}</p>
                    <p class="open-visit">Показать</p>
                    <div class = "visit-card-hide">
                        <p>Цель визита: ${this.title}</p>
                        <p>Описание визита: ${this.description}</p>
                        <p>Срочность: ${this.urgency}</p>
                        <p>Возраст: ${this.age}</p>
                        <p>
                            <a href="#" class="btn-visit btn-change">Редактировать</a>
                            <a href="#" class="btn-visit btn-delete">Удалить</a>
                        </p>                              
                    </div>
                </div>`
    }
}

//добавление визита

function getCardFromForm() {
    const formVisit = document.querySelector('.modal')
    const newCard = {};
    newCard.doctor = document.querySelector('[name="doctors-selection"]').value;
    newCard.title = document.querySelector('#visit-purpose').value;
    newCard.description = document.querySelector('#visit-desc').value;
    newCard.urgency = document.querySelector('[name="visit-urgency"]').value;
    newCard.fio = document.querySelector('#visit-details').value;
    switch (newCard.doctor) {
        case 'cardiologist':
            newCard.normalpreasure = document.querySelector('#visit-pressure').value;
            newCard.massindex = document.querySelector('#visit-weight').value;
            newCard.diseases = document.querySelector('#visit-diseases').value;
            newCard.age = document.querySelector('#visit-age').value;
            break;
        case 'dentist':
            newCard.data = document.querySelector('#visit-date').value;
            break;
        case 'therapist':
            newCard.age = document.querySelector('#visit-age').value;
            break;
    };
    return newCard
}

async function addCard(body) {
    await axios({
            method: 'post',
            url: 'https://cards.danit.com.ua/cards',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            data: body
        })
        .then(response => {
            addCardVisit(response.data)
        })
        .catch(error => console.log(error));

    addMessage(document.querySelectorAll('.visit-card').length, document.querySelector('.visit-board'));
    showHideVisit(document.querySelectorAll('.open-visit'));
    deleteCard(document.querySelectorAll('.btn-delete'))
}



function addCardVisit (visit, position = 'beforeend'){

    const visitBoard = document.querySelector('.visit-board');
    let newVisit
    switch (visit.doctor) {
        case 'dentist':
            newVisit = new VisitDentist(visit);

            visitBoard.insertAdjacentHTML(position, newVisit.render());
        break;
        case 'cardiologist':
            newVisit = new VisitCardiologist(visit);
            visitBoard.insertAdjacentHTML(position, newVisit.render());
        break;
        case 'therapist':
            newVisit = new VisitTherapists(visit);
            visitBoard.insertAdjacentHTML(position, newVisit.render());
        break;      

    }
}



async function loadCards(){
    await axios.get('https://cards.danit.com.ua/cards',    
        {headers: { "Authorization" : `Bearer ${localStorage.getItem('token')}` } 
        })

        .then(response => response.data.forEach(visit => addCardVisit(visit)));


    addMessage(document.querySelectorAll('.visit-card').length, document.querySelector('.visit-board'));
    showHideVisit(document.querySelectorAll('.open-visit'));
    deleteCard(document.querySelectorAll('.btn-delete'))
}



//addMessage  - удаляет/добавляет сообщение о наличии бланков
function addMessage(countElem, onElement) {
    if (countElem === 0 && !document.getElementById('noitem')) {
        onElement.insertAdjacentHTML(
            'beforeend', `<p id="noitem">No items have been added</p>`
        );
    } else if (countElem > 0 && document.getElementById('noitem')) {
        onElement.removeChild(document.getElementById('noitem'));
    }
}

// showHideVisit   - регулирует полное/частичное отображение бланков визитов

function showHideVisit(arrayVisits) {
    arrayVisits.forEach((elem) => {
        elem.addEventListener('click', (event) => {
            event.currentTarget.nextElementSibling.classList.toggle("visit-card-hide")
            if (event.currentTarget.nextElementSibling.classList.contains('visit-card-hide')) {
                event.currentTarget.innerText = 'Показать';
            } else {
                event.currentTarget.innerText = 'Скрыть';
            }
            event.stopImmediatePropagation();
        });
    });
}

// deleteCard() - удалить карточку
function deleteCard(arrayVisits) {
    arrayVisits.forEach((elem) => {
        elem.addEventListener('click', (event) => {
            let card = event.currentTarget.parentElement.parentElement.parentElement;
            let cardId = card.dataset.id;
            requestDeleteCard(cardId, card);

        });
    });
}
async function requestDeleteCard(cardId, card) {
    await axios({
        method: 'DELETE',
        url: `http://cards.danit.com.ua/cards/${cardId}`,
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then(response => {
        if (response.data.status === "Success"){
            card.remove();
            addMessage(document.querySelectorAll('.visit-card').length, document.querySelector('.visit-board' ));
        }       
        else {
            throw new Error('не удалось удалить карточку')
        }
    })
    .catch(error => console.log(error));
}

// tamara: editCard() - редактировать карточку
const visitBoard = document.querySelector('.visit-board');
visitBoard.addEventListener('click', (event) => {
    if (!event.target.classList.contains('btn-change')) return;

    localStorage.setItem('action', 'editing');
    modal.style.display = 'block';

    if (!visitCreationForm) {
        createVisitCreationForm();
        createDoctorsSlct();
    }

    visitCreationForm = document.querySelector('.visit-creation');
    visitCreationForm.style.display = 'flex';
    pageWrapper.style.filter = 'blur(5px)';



    const visitInputsGeneral = document.querySelector('.visit-inputs--general');
    const visitInputsCollection = document.querySelectorAll('.visit-inputs');

    visitInputsGeneral.style.display = 'flex';
    visitInputsGeneralCreation(visitInputsGeneral);
    
    switch (event.target.closest('.visit-card').children[1].textContent.split(' ')[1]) {
        case 'cardiologist':
            cardiologistInputs(visitInputsCollection);
            break;
        case 'dentist':
            dentistInputs(visitInputsCollection);
            break;
        case 'therapist':
            therapistInputs(visitInputsCollection);
            break;
    }

    let cardId = event.target.parentElement.parentElement.parentElement.dataset.id
    setCardOnForm(cardId) // Миронец

    const save = document.querySelector('.btn--save');

    (!save) ? createSaveBtn(visitCreationForm, cardId) : save.style.display = 'block';


        
});

// Миронец добавил dataset
function createSaveBtn(visitCreationForm, cardId){

    const save = document.createElement('a');
    save.classList.add('btn--save');
    save.classList.add('btn');
    save.textContent = 'Сохранить';
    save.dataset.id = cardId; // Миронец
    visitCreationForm.append(save);
    const createBtn = document.querySelector('.btn--create');
    if (createBtn) {
        createBtn.style.display = 'none'
    }
   
    return save
}




async function setCardOnForm(cardId) {
    await axios.get(`http://cards.danit.com.ua/cards/${cardId}`,
    {headers: { "Authorization" : `Bearer ${localStorage.getItem('token')}` } 
        })
        .then(response => {
            document.querySelector('[name="doctors-selection"]').value = response.data.doctor;
            document.querySelector('#visit-purpose').value = response.data.title 
            document.querySelector('#visit-desc').value = response.data.description;
            document.querySelector('[name="visit-urgency"]').value = response.data.urgency;
            document.querySelector('#visit-details').value = response.data.fio;
                switch (response.doctor){
                    case 'cardiologist':
                        document.querySelector('#visit-pressure').value = response.data.normalpreasure;
                        document.querySelector('#visit-weight').value = response.data.massindex;
                        document.querySelector('#visit-diseases').value = response.data.diseases;
                        document.querySelector('#visit-age').value = response.data.age;
                    break;
                    case 'dentist':
                        document.querySelector('#visit-date').value = response.data.data;
                    break;
                    case 'therapist':
                        document.querySelector('#visit-age').value = response.data.age;
                    break;
                };
        })
    

}

const form = document.querySelector('.modal');
modal.addEventListener('click', (ev)=>{
    if(!ev.target.classList.contains('btn--save')) return;

    let cardId = ev.target.dataset.id;
    
    requestChangeCard(cardId,getCardFromForm());
    modal.style.display = 'none';  
    pageWrapper.style.filter = '';

});


// changeCard() - изменить карточку - нужно модальное окно
//  функция зарос:

async function requestChangeCard(cardId, body,) {
    await axios({

        method: 'PUT',
        url: `http://cards.danit.com.ua/cards/${cardId}`,
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        data: body
    })
    .then(response => {
        if (response.status === 200){
            deleteVisits();
            loadCards();
        }       
        else {
            throw new Error('не удалось изменить карточку')
        }
    })
    .catch(error => console.log(error));
}

function deleteVisits(){
    let visits = document.querySelectorAll('.visit-card')
    visits.forEach(e => e.remove())
}




