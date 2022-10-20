
function renderCardsMain(arr) {
    const ul = document.querySelector('#ul_main')
    ul.innerHTML=''

    arr.forEach((element) => {
        const card = mainCardCreator(element)
        ul.appendChild(card)
    });
    
}

renderCardsMain(jobsData)


function mainCardCreator(obj) {

    const li = document.createElement('li')

    const h2 = document.createElement('h2')
    h2.classList = 'font22'
    h2.innerText = obj.title

    const span = document.createElement('span')
    span.classList = 'font14'
    span.innerText = obj.enterprise

    const span2 = document.createElement('span')
    span2.classList = 'font14'
    span2.innerText = obj.location 

    const p = document.createElement('p')
    p.innerText = obj.descrition

    const h4 = document.createElement('h4')

    h4.innerText = obj.modalities[0]
    h4.classList = 'font14 weigth400'

    const div = document.createElement('div')
    const apply = document.createElement('button')
    apply.classList = 'button bt-padding2 bt-apply'
    apply.id = `bt_apply_${obj.id}`
    apply.innerText = 'candidatar'

    if(applyExist(obj) >= 0){
        apply.innerText = "Remover candidatura";
        }else{
        apply.innerText = "Candidatar";
        }

    div.append(apply)
    li.append(h2, span, span2, p, h4, div)
    
    
    return li
}

function buttonApply() {
    let buttons = document.querySelectorAll('.bt-apply')

    buttons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault()
                let idBt = button.id.replace('bt_apply_', '');
                let job = jobsData.find(obj => obj.id === parseInt(idBt))
                
                applyAddorRemove(job, button)
                renderCardsaside(getItemLocalStorage())

            });
        })
 };


buttonApply()

function renderCardsaside(data) {
    const ul = document.querySelector('#ul_asside')
    ul.innerHTML=''
    if (data.length > 0) {
        data.forEach((element) => {
            const card = cardAsideCreator(element)
            ul.appendChild(card)
    }); 
    } else {
        const li = document.createElement('li')
        li.insertAdjacentHTML('afterbegin', `<p>Você ainda não aplicou para nenhuma vaga.</p>`)
        ul.appendChild(li)
        
    }
}   
renderCardsaside(getItemLocalStorage())


function cardAsideCreator(obj) {
    let title = obj.title
    let location = obj.location
    let enterprise = obj.enterprise
    let id = obj.id

    let li = document.createElement('li')
    let div = document.createElement('div')
    let div2 = document.createElement('div')
    let button = document.createElement('button')
    let span = document.createElement('span')
    let span2 = document.createElement('span')

    div.classList.add('flex')
    button.classList.add('img')
    span.classList.add('grey2')
    span2.classList.add('grey2')
    button.id = `bt_remove_${id}`

    div2.innerHTML = `<h2 class="font18">${title}</h2>`
    span.innerText = enterprise
    span2.innerText = location
    button.innerHTML = `<img src="assets/img/trash (1).png" alt="">`



    button.addEventListener('click', (event) => {
        event.preventDefault()
            let idBt = button.id.replace('bt_remove_', '');
            let job = jobsData.find(obj => obj.id === parseInt(idBt))
            
            applyAddorRemove(job, button)
            renderCardsaside(getItemLocalStorage())
            renderCardsMain(jobsData)
            buttonApply()

        });


        /* 
        <div class="flex">
                  <div>
                    <h2 class="font18">Pessoa desenvolvedora front-end - React JS</h2>
                  </div>
                  <button class="img">
                    <img src="assets/img/trash (1).png" alt="">
                  </button>
                </div>
                <span class="grey2">Kenzie Academy</span>
                <span class="grey2">Curitiba</span>
        */
        
    div.append(div2, button)
    li.append(div, span, span2)
    return li
}

function getItemLocalStorage() {
    return JSON.parse(localStorage.getItem('webwoman:apply-data')) || []
     
 }

function applyExist(job) {
    return getItemLocalStorage().findIndex(element => element.id === job.id)
}

function applyAddorRemove(job, button) {
    const jobExist = applyExist(job)
    let applyList = getItemLocalStorage()

    if (jobExist<0) {
        applyList = [...applyList, job]
        button.innerText = "Remover Candidatura"
    }else{
        applyList.splice(jobExist, 1)
        button.innerText = "Candidatar"
    }
    localStorage.setItem('webwoman:apply-data', JSON.stringify(applyList))
}