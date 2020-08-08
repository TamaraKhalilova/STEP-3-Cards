const page = document.querySelector('.page');
const pageWrapper = document.querySelector('.page__wrapper');
const btnHeader = document.querySelector('.btn--header');
const select = document.querySelector('.doctors-selection');
let token;

const modalContent = `<form action="post" class='modal'></form>`;
const autorizationContent = `
    <div class="autorization">
        <label for="email" class="accented">Введите вашу почту:</label>
        <input type="email" id="email" placeholder="Type your email..." required>
        <label for="password" class="accented">Введите ваш пароль:</label>
        <input type="password" id="password" placeholder="Type your password..." required>
        <button class="btn">Отправить</button>
        <p class="message">Ошибка авторизации</p>
    </div>
`;
const visitCreationFormContent = `
            <div class="visit-creation">
                <select name="doctors-selection">
                    <option value="placeholder">Выберите врача..</option> 
                    <option value="cardiologist">Кардиолог</option> 
                    <option value="dentist">Стоматолог</option>
                    <option value="therapist">Терапевт</option>
                </select>

                <div class="visit-inputs--general">
                    <label for="visit-purpose" class="accented">Цель визита:</label>
                    <input type="text" id="visit-purpose">

                    <label for="visit-desc" class="accented">Краткое описание визита:</label>
                    <textarea id="visit-desc" cols="30"></textarea>

                    <select name="visit-urgency">
                        <option value="placeholder">Срочность</option> 
                        <option value="normal">обычная</option> 
                        <option value="priority">приоритетная</option> 
                        <option value="urgent">неотложная</option>
                    </select>

                    <label for="visit-details" class="accented">ФИО:</label>
                    <input type="text" id="visit-details">
                </div>

                <div class="visit-inputs cardiologist"> 
                    <label for="visit-pressure" class="accented">Oбычное давление:</label>
                    <input type="text" id="visit-pressure">

                    <label for="visit-weight" class="accented">Индекс массы тела:</label>
                    <input type="text" id="visit-weight">

                    <label for="visit-diseases" class="accented">Перенесенные заболевания сердечно-сосудистой системы:</label>
                    <input type="text" id="visit-diseases">
                </div>

                <div class="visit-inputs dentist"> 
                    <label for="visit-date" class="accented">Дата последнего посещения:</label>
                    <input type="date" id="visit-date">
                </div>

                <div class="visit-inputs cardiologist therapist"> 
                    <label for="visit-age" class="accented">Возраст:</label>
                    <input type="number" id="visit-age">
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

function createEl(content, Func, tag){
    const element = new Func(content).render();
    tag.insertAdjacentHTML('beforeend', element);
}

createEl(modalContent, Form, page);
const modal = document.querySelector('.modal');

createEl(autorizationContent, Modal, modal);
const autorizationForm = document.querySelector('.autorization');

createEl(visitCreationFormContent, Modal, modal);
const visitCreationForm = document.querySelector('.visit-creation');

//создание общей формы в разметке
// const modalContent = `<form action="post" class='modal'></form>`;
// let modal = new Form(modalContent).render();
// page.insertAdjacentHTML('beforeend', modal);



//создание модального окна авторизации в разметке
// const autorizationContent = `
//     <div class="autorization">
//         <label for="email" class="accented">Введите вашу почту:</label>
//         <input type="email" id="email" placeholder="Type your email..." required>
//         <label for="password" class="accented">Введите ваш пароль:</label>
//         <input type="password" id="password" placeholder="Type your password..." required>
//         <button class="btn">Отправить</button>
//         <p class="message">Ошибка авторизации</p>
//     </div>
// `;
// let autorization = new Modal(autorizationContent).render();
// modal.insertAdjacentHTML('beforeend', autorization);



//создание модалного окна создания карточки в разметке
// const visitCreationFormContent = `
//             <div class="visit-creation">
//                 <select name="doctors-selection">
//                     <option value="placeholder">Выберите врача..</option> 
//                     <option value="cardiologist">Кардиолог</option> 
//                     <option value="dentist">Стоматолог</option>
//                     <option value="therapist">Терапевт</option>
//                 </select>

//                 <div class="visit-inputs--general">
//                     <label for="visit-purpose" class="accented">Цель визита:</label>
//                     <input type="text" id="visit-purpose">

//                     <label for="visit-desc" class="accented">Краткое описание визита:</label>
//                     <textarea id="visit-desc" cols="30"></textarea>

//                     <select name="visit-urgency">
//                         <option value="placeholder">Срочность</option> 
//                         <option value="normal">обычная</option> 
//                         <option value="priority">приоритетная</option> 
//                         <option value="urgent">неотложная</option>
//                     </select>

//                     <label for="visit-details" class="accented">ФИО:</label>
//                     <input type="text" id="visit-details">
//                 </div>

//                 <div class="visit-inputs cardiologist"> 
//                     <label for="visit-pressure" class="accented">Oбычное давление:</label>
//                     <input type="text" id="visit-pressure">

//                     <label for="visit-weight" class="accented">Индекс массы тела:</label>
//                     <input type="text" id="visit-weight">

//                     <label for="visit-diseases" class="accented">Перенесенные заболевания сердечно-сосудистой системы:</label>
//                     <input type="text" id="visit-diseases">
//                 </div>

//                 <div class="visit-inputs dentist"> 
//                     <label for="visit-date" class="accented">Дата последнего посещения:</label>
//                     <input type="date" id="visit-date">
//                 </div>

//                 <div class="visit-inputs cardiologist therapist"> 
//                     <label for="visit-age" class="accented">Возраст:</label>
//                     <input type="number" id="visit-age">
//                 </div>

//                 <button class="btn btn--create">Создать</button>
// `;
// let visitCreationForm = new Modal(visitCreationFormContent).render();
// modal.insertAdjacentHTML('beforeend', visitCreationForm);




//cобытия по нажатию кнопки в хедере
btnHeader.addEventListener('click', ()=>{
    modal.style.display = 'block';
    pageWrapper.style.filter = 'blur(5px)';

    if (btnHeader.textContent === 'Вход'){
        autorizationForm.style.display = 'block';
        modal.addEventListener('submit', getLogin);
    } else {
        autorizationForm.style.display = 'none';
        visitCreationForm.style.display = 'flex';
        modal.addEventListener('change', visitCreate)
    }

})

// событие: авторизация
async function getLogin(e){
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
    
        const response = await axios.post('http://cards.danit.com.ua/login',{email, password});
    
        if (response.data.status === 'Success'){
            modal.style.display = 'none';
            pageWrapper.style.filter = '';
            btnHeader.textContent = 'Создать визит'
        } else {
            const message = document.querySelector('.message');
            message.style.color = 'red';
        } 

        token = response.data.token;
        return token
}

// событие: создание визита
function visitCreate(e){

    const visitInputsGeneral = document.querySelector('.visit-inputs--general');
    const visitInputsCollection = document.querySelectorAll('.visit-inputs');
    const btnCreate = document.querySelector('.btn--create');
    btnCreate.style.display = 'block';
    visitInputsGeneral.style.display = 'flex';

    switch (e.target.value) {
        case 'placeholder':
            Array.from(visitCreationForm.children).forEach(el => (el.tagName !== 'SELECT')? el.style.display = 'none': null);
        break;
        case 'cardiologist':
            visitInputsCollection.forEach(el => el.classList.contains('cardiologist') ? el.style.display = 'flex' : el.style.display = 'none');
        break;
        case 'dentist':
            visitInputsCollection.forEach(el => el.classList.contains('dentist') ? el.style.display = 'flex' : el.style.display = 'none')
        break;
        case 'therapist':
            visitInputsCollection.forEach(el => {
                if(el.classList.contains('cardiologist') && el.classList.contains('therapist')){
                     el.style.display = 'block' 
                } else {
                    el.style.display = 'none'
                }
            } )
        break;
    }
}
