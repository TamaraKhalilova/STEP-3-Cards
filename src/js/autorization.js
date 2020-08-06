const formAutorization = document.querySelector('.autorization');
const btnHeader = document.querySelector('.btn--header');
const pageWrapper = document.querySelector('.page__wrapper');

btnHeader.addEventListener('click', (e)=>{
    formAutorization.style.display = 'block';
    pageWrapper.style.filter = 'blur(5px)';
})

formAutorization.addEventListener('submit', (e)=>{
    e.preventDefault();
    axios.post('http://cards.danit.com.ua/login',{
        "email": "tamara.halilova1@gmail.com",
        "password": "Kirivtazodisldi1",
        headers: {
            'Authorization': `Bearer ae90414be9c8` 
          }
    }).then(res=>{
        if (res.data.status === 'Success'){
            formAutorization.style.display = 'none';
            pageWrapper.style.filter = '';
            btnHeader.textContent = 'Создать визит'
        }
    })
})