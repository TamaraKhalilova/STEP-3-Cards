const pageWrapper = document.querySelector('.page__wrapper');
const btnHeader = document.querySelector('.btn--header');
const modal = document.querySelector('.modal');
const select = document.querySelector('.doctors-selection');
const autorizationForm = document.querySelector('.autorization');
const visitCreationForm = document.querySelector('.visit-creation');

btnHeader.addEventListener('click', ()=>{
    modal.style.display = 'block';
    pageWrapper.style.filter = 'blur(5px)';

    if (btnHeader.textContent === 'Вход'){
        autorizationForm.style.display = 'block';
        modal.addEventListener('submit', getLogin)
    } else {
        autorizationForm.style.display = 'none';
        visitCreationForm.style.display = 'flex';
        modal.addEventListener('change', visitCreate)
    }
})

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
}

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
