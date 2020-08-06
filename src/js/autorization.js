const pageWrapper = document.querySelector('.page__wrapper');
const formAutorization = document.querySelector('.autorization');
const btnHeader = document.querySelector('.btn--header');

btnHeader.addEventListener('click', ()=>{
    formAutorization.style.display = 'block';
    pageWrapper.style.filter = 'blur(5px)';
})

formAutorization.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await axios.post('http://cards.danit.com.ua/login',{email, password});

    if (response.data.status === 'Success'){
        formAutorization.style.display = 'none';
        pageWrapper.style.filter = '';
        btnHeader.textContent = 'Создать визит'
    }
})
