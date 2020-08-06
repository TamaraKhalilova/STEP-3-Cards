const pageWrapper = document.querySelector('.page__wrapper');
const btnHeader = document.querySelector('.btn--header');
const modal = document.querySelector('.modal');
const autorizationForm = document.querySelector('.autorization');
const visitCreationForm = document.querySelector('.visit-creation');

btnHeader.addEventListener('click', ()=>{
    modal.style.display = 'block';
    pageWrapper.style.filter = 'blur(5px)';
    console.log(btnHeader.textContent);

    if (btnHeader.textContent === 'Вход'){
        autorizationForm.style.display = 'block';
        modal.addEventListener('submit', getLogin)
    } else {
        visitCreationForm.style.display = 'block';
        modal.addEventListener('submit', visitCreate)
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

async function visitCreate(e){
        e.preventDefault();
}
