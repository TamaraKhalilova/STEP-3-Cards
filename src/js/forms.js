const page = document.querySelector('.page');
const pageWrapper = document.querySelector('.page__wrapper');
const btnHeader = document.querySelector('.btn--header');
let visitCreationForm;
let message;
let options;
let basicOption;
let token;

const modalContent = `<form action="post" class='modal'></form>`;
const autorizationContent = `
    <div class="autorization">
        <label for="email" class="accented">Введите вашу почту:</label>
        <label for="password" class="accented">Введите ваш пароль:</label>
        <button class="btn">Отправить</button>
        <button class="btn btn--close">x</button>
        <p class="message">Ошибка авторизации</p>
    </div>
`;
const visitCreationFormContent = `
            <div class="visit-creation">
                <button class="btn btn--close">x</button>
                <div class="visit-inputs--general">
                    <label for="visit-purpose" class="accented">Цель визита:</label>

                    <label for="visit-desc" class="accented">Краткое описание визита:</label>

                    <label for="visit-details" class="accented">ФИО:</label>
                </div>

                <div class="visit-inputs cardiologist"> 
                    <label for="visit-pressure" class="accented">Oбычное давление:</label>
                    <label for="visit-weight" class="accented">Индекс массы тела:</label>
                    <label for="visit-diseases" class="accented">Перенесенные заболевания <br> сердечно-сосудистой системы:</label>

                </div>

                <div class="visit-inputs dentist"> 
                    <label for="visit-date" class="accented">Дата последнего посещения:</label>
                </div>

                <div class="visit-inputs cardiologist therapist"> 
                    <label for="visit-age" class="accented">Возраст:</label>
                </div>

                <button class="btn btn--create">Создать</button>
`;


class Form {
    constructor(formTag){
        this.formTag = formTag;
    }
    render(){ return this.formTag }
}

class Modal {
    constructor(modalDiv){
        this.modalDiv = modalDiv;
    }
    render(){ return this.modalDiv }
}

class Input {
    constructor(type, id, placeholder){
        this.type = type;
        this.id = id;

        if(placeholder) this.placeholder = placeholder;
    }

    composeTag(){
        if(this.placeholder){
            return `<input type='${this.type}' id='${this.id}' placeholder='${this.placeholder}' required'>`
        } else {
            return `<input type='${this.type}' id='${this.id}' required'>`
        }
        
    }

    render(){ return this.composeTag() }
}

class Select {
    constructor(name, options){
        this.name = name;
        this.options = options;
    }

    composeTag(){
        return `<select name="${this.name}">
                    ${this.options}
                </select>`
    }

    render(){ return this.composeTag() }
}

class Textarea {
    constructor(id, cols){
        this.id = id;
        this.cols = cols;
    }

    composeTag(){ return `<textarea id="${this.id}" cols="${this.cols}"></textarea>` }

    render(){ return this.composeTag() }
}



function createEl(content, Func, place, tag){
    let element;
    (typeof content === 'object') ? element = new Func(...content).render() : element = new Func(content).render();
    tag.insertAdjacentHTML(place, element);
}

createEl(modalContent, Form, 'beforeend', page);
const modal = document.querySelector('.modal');

createEl(autorizationContent, Modal, 'beforeend', modal);
const autorizationForm = document.querySelector('.autorization');


createEl(['email', 'email', "Type your email..."], Input, 'afterend', document.querySelector('label[for="email"]'));
createEl(['password', 'password', "Type your password..."], Input, 'afterend', document.querySelector('label[for="password"]'));

if (localStorage.getItem('token')) btnHeader.textContent = 'Создать визит';


//cобытия по нажатию кнопки в хедере
btnHeader.addEventListener('click', ()=>{

    modal.style.display = 'block';
    pageWrapper.style.filter = 'blur(5px)';
    if (btnHeader.textContent === 'Вход'){

        autorizationForm.style.display = 'block';
        message = document.querySelector('.message');
        message.style.color = 'transparent';
        modal.addEventListener('submit', getLogin);
    } else {
        autorizationForm.style.display = 'none';
        visitCreationForm = document.querySelector('.visit-creation');       
        if(visitCreationForm){
            visitCreationForm.style.display = 'flex';
            basicOption = document.querySelectorAll(`option`);    
            basicOption.forEach(el=>{
                el.removeAttribute('selected');
                if (el.getAttribute('value') === 'placeholder') el.setAttribute('selected', true);
            });
            return;
        }
        createEl(visitCreationFormContent, Modal, 'beforeend', modal);
        visitCreationForm = document.querySelector('.visit-creation');        
        options = `<option value="placeholder" value =1>Выберите врача..</option> 
        <option value="cardiologist">Кардиолог</option> 
        <option value="dentist">Стоматолог</option>
        <option value="therapist">Терапевт</option>`

        createEl(["doctors-selection", options], Select, 'afterbegin', visitCreationForm);

        modal.addEventListener('change', visitCreate);
    }

})

// событие кнопки в хедере: авторизация
async function getLogin(e){
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
    
        const response = await axios.post('http://cards.danit.com.ua/login',{email, password});
        token = response.data.token;

        if (response.data.status === 'Success'){
            modal.style.display = 'none';
            pageWrapper.style.filter = '';
            btnHeader.textContent = 'Создать визит';
            localStorage.setItem('token', token);
        } else {
            // console.log('err');
            message.style.color = 'red';
        } 
        return token
}

// событие кнопки в хедере: создание визита
function visitCreate(e){
    if (e.target.getAttribute('name') !== 'doctors-selection') return;

    const visitInputsGeneral = document.querySelector('.visit-inputs--general');
    const visitInputsCollection = document.querySelectorAll('.visit-inputs');
    const btnCreate = document.querySelector('.btn--create');
    btnCreate.style.display = 'block';

    if(visitInputsGeneral.style.display !== 'flex') {
        visitInputsGeneral.style.display = 'flex';

            if(visitInputsGeneral.children.length < 7) {
                createEl(['text', 'visit-purpose'], Input, 'afterend', document.querySelector('label[for="visit-purpose"]'));
                createEl(['visit-desc', '30'], Textarea, 'afterend', document.querySelector('label[for="visit-desc"]'));
    
                options = `<option value="placeholder" selected>Срочность</option> 
                    <option value="normal">обычная</option> 
                    <option value="priority">приоритетная</option> 
                    <option value="urgent">неотложная</option>`
    
                createEl(["visit-urgency", options], Select, 'afterend', document.querySelector('textarea[id="visit-desc"]'));
                createEl(['text', 'visit-details'], Input, 'afterend', document.querySelector('label[for="visit-details"]')); 
            }
    }

    switch (e.target.value) {
        case 'placeholder':
            Array.from(visitCreationForm.children).forEach(el => (el.tagName !== 'SELECT')? el.style.display = 'none': null);
        break;
        case 'cardiologist':
            visitInputsCollection.forEach(el =>el.classList.contains('cardiologist') ? el.style.display = 'flex' : el.style.display = 'none'); 
        
            const cardiologistInputs = document.querySelector('.visit-inputs.cardiologist');

            if(cardiologistInputs.children.length < 4) {
                createEl(['text', 'visit-pressure'], Input, 'afterend', document.querySelector('label[for="visit-pressure"]'));
                createEl(['text', 'visit-weight'], Input, 'afterend', document.querySelector('label[for="visit-weight"]'));
                createEl(['text', 'visit-diseases'], Input, 'afterend', document.querySelector('label[for="visit-diseases"]'));
                createEl(['number', 'visit-age'], Input, 'afterend', document.querySelector('label[for="visit-age"]')); 
            }
        break;
        case 'dentist':
            visitInputsCollection.forEach(el => el.classList.contains('dentist') ? el.style.display = 'flex' : el.style.display = 'none');
            const cardiologistDentist = document.querySelector('.visit-inputs.dentist');

            if(cardiologistDentist.children.length < 2) createEl(['text', 'visit-date'], Input, 'afterend', document.querySelector('label[for="visit-date"]'));
        break;
        case 'therapist':
            visitInputsCollection.forEach(el => {
                if(el.classList.contains('cardiologist') && el.classList.contains('therapist')){
                     el.style.display = 'block';
                } else {
                    el.style.display = 'none'
                }
            } );

        break;
    }
}


// кнопка Х
modal.addEventListener('click', (e)=>{
    if (!e.target.classList.contains('btn--close')) return;
    e.preventDefault();
    visitCreationForm = document.querySelector('.visit-creation');
    e.target.parentElement.style.display = 'none';
    modalClose();
})

//cобытие: нажатие области вокруг модального окна
page.addEventListener('click', (event)=>{
    if(!modal.contains(event.target) && event.target !== btnHeader) {
        modal.style.display = 'none';
        modalClose();
    }
})

function modalClose(){
    if(visitCreationForm) Array.from(visitCreationForm.children).forEach(el => (el.tagName !== 'SELECT' && el.textContent !== 'x')? el.style.display = 'none' : null);
    pageWrapper.style.filter = '';
    document.querySelectorAll('input').forEach(e=>e.value ='');
    document.querySelectorAll('textarea').forEach(e=>e.value ='');
}