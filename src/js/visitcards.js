// import { Visit, VisitCardiologist, VisitDantist, VisitTherapists } from './components/index.js';

class Visit {
    constructor({id, title, doctor, fio, description, urgency}){
        this.id = id
        this.title = title
        this.doctor = doctor
        this.fio = fio
        this.description = description
        this.urgency = urgency
    }


}

class VisitCardiologist extends Visit {
    constructor({id, title, doctor, fio, description, urgency, normalpreasure, massindex, diseases, age}){
        super({id, title, doctor, fio, description, urgency})
        this.normalpreasure = normalpreasure
        this.massindex = massindex
        this.diseases = diseases
        this.age = age
    }

    render(){
        return `<div class="visit-card" data-id="${this.id}">
                    <p>Пациент: ${this.fio}</p>
                    <p>Доктор: ${this.doctor}</p>
                    <p class="open-visit">Скрыть</p>
                    <div>
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
    constructor({id, title, doctor, fio, description, urgency, data}){
        super({id, title, doctor, fio, description, urgency})
        this.data = data
    }

    render(){
        return `<div class="visit-card" data-id="${this.id}">
                    <p>Пациент: ${this.fio}</p>
                    <p>Доктор: ${this.doctor}</p>
                    <p class="open-visit">Скрыть</p>
                    <div>
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
    constructor({id, title, doctor, fio, description, urgency, age}){
        super({id, title, doctor, fio, description, urgency})
        this.age = age
    }

    render(){
        return `<div class="visit-card" data-id="${this.id}">
                    <p>Пациент: ${this.fio}</p>
                    <p>Доктор: ${this.doctor}</p>
                    <p class="open-visit">Скрыть</p>
                    <div>
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



//этот кусок что бы тупо добавить карточки на сервер ---------------
async function addCard(body) {
    await axios({    
            method: 'post', 
            url: 'https://cards.danit.com.ua/cards',    
            headers: { Authorization: "Bearer f770b22f3318"},
            data: body
        })
        .then(response => console.log(response))
        .catch(error => console.log(error));
}

const cardUser = {
    "title": "Визит к дантисту",    
    "description": 'Плановый визит',
    "doctor": "Dentist",
    "fio": "Петров Перт Петрович",
    "urgency": "normal",
    "data": "завтра"      
}
// addCard(cardUser);
//----------------------------------------------------------------------------



function addCardVisit (visit){
    const visitBoard = document.querySelector('.visit-board');
    let newVisit
    switch (visit.doctor){
        case 'Dentist':
            newVisit = new VisitDentist(visit);
            visitBoard.insertAdjacentHTML('beforeend', newVisit.render());
        break;
        case 'Cardiologist':
            newVisit = new VisitCardiologist(visit);
            visitBoard.insertAdjacentHTML('beforeend', newVisit.render());
        break;
        case 'Therapists':
            newVisit = new VisitTherapists(visit);
            visitBoard.insertAdjacentHTML('beforeend', newVisit.render());
        break;
        default:
            throw new Error('not exists that doctor');
    }
}


async function loadCards(){
    await axios.get(
        'https://cards.danit.com.ua/cards',
        {
            headers: { "Authorization" : "Bearer f770b22f3318" } 
        })
        .then(response => response.data.forEach(visit => addCardVisit(visit)));

        
        addMessage(document.querySelectorAll('.visit-card').length, document.querySelector('.visit-board' ));
        showHideVisit(document.querySelectorAll('.open-visit'));
        deleteCard(document.querySelectorAll('.btn-delete'))
}
    

loadCards()




//addMessage  - удаляет/добавляет сообщение о наличии бланков
function addMessage(countElem, onElement){
    if (countElem === 0 && !document.getElementById('noitem')) {
        onElement.insertAdjacentHTML(
            'beforeend', `<p id="noitem">No items have been added</p>`
        );
    }
    else if (countElem > 0 && document.getElementById('noitem'))
    {
        onElement.removeChild(document.getElementById('noitem'));
    }
}

// showHideVisit   - регулирует полное/частичное отображение бланков визитов

function showHideVisit(arrayVisits){
    arrayVisits.forEach((elem)=>{
        elem.addEventListener('click',(event)=>{
            event.currentTarget.nextElementSibling.classList.toggle("visit-card-hide")
            if (event.currentTarget.nextElementSibling.classList.contains('visit-card-hide')){
                event.currentTarget.innerText = 'Показать';                
            }  
            else{
                event.currentTarget.innerText = 'Скрыть';                
            }
            event.stopImmediatePropagation();
        });
    });
}

// deleteCard() - удалить карточку
function deleteCard(arrayVisits){
    arrayVisits.forEach((elem)=>{
        elem.addEventListener('click',(event)=>{
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
        headers: { Authorization: "Bearer f770b22f3318"}
    })
    .then(response => {
        if (response.data.status === "Success"){
            card.remove();
        }       
        else {
            throw new Error('не удалось удалить карточку')
        }
    })
    .catch(error => console.log(error));
}

// changeCard() - удалить карточку - нужно модальное окно
//  функция зарос:

async function requestDeleteCard(cardId, body) {
    await axios({
        method: 'PUT',
        url: `http://cards.danit.com.ua/cards/${cardId}`,
        headers: { Authorization: "Bearer f770b22f3318"},
        data: body
    })
    .then(response => {
        if (response.data.status === "Success"){
            console.log('получилось!')
        }       
        else {
            throw new Error('не удалось удалить карточку')
        }
    })
    .catch(error => console.log(error));
}

// addCard(cardUser);

const alteredCardUser = {
    "title": "Визит к терапевту",    
    "description": 'Плановый визит',
    "doctor": "Therapists",
    "fio": "Николаев Николай Николаевич",
    "urgency": "normal",
    "data": "10-10-20"      
}
requestDeleteCard(9724, alteredCardUser);
