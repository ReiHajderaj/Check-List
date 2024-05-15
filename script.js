
const form = document.querySelector('form')
const input = document.querySelector('.search-field');
const button = document.querySelector('.sub-btn');
const message = document.querySelector('.message');

const list = document.querySelector('.list');



let BtnNr = 0;
let Id;



function submit(){
    if(input.value != ''){
        message.textContent = '';
        Id = new Date().getTime().toString();
        
        generateItem(input.value, Id, false)
        
        addToLocalStorage(Id, input.value)

        input.value = '';

    } else{
        message.textContent = 'You have not enterred a value'
    }
    
}

function generateItem(value, Id, status){

    message.textContent = 'Created a Item'
    BtnNr = list.childElementCount;
    const element = document.createElement('div');
    element.classList.add('row');
    element.id = Id
    
    element.innerHTML =`
    <button class='to-do'> 
    </button>
    <p>${value}</p>
    <button class='delete'>X</button>
    `;

    
    const checkBtn = element.querySelector(`.to-do`);
    

    checkBtn.addEventListener('click', change);
    const remBtn = element.querySelector(`.delete`);
    remBtn.addEventListener('click', remove);

    const changeText = element.querySelector('p');
    changeText.addEventListener('dblclick', changeText);

    list.appendChild(element)

    if(status){
        checkBtn.classList.add('cheked')
    }
}


function remove(e){
    let elm = e.target.parentNode;
    list.removeChild(elm);
    message.textContent = 'Removed a item'

    //delete from localStorage
    removeFromLocalStorage(e.target.parentNode.id)
}

function change(e){
    let elm = e.target;

    elm.classList.toggle('cheked');

    //change local storage

    changeLocalStorage(e.target.parentNode.id);
}


function getLocalStorage(){

    return localStorage.getItem("list")?
     JSON.parse(localStorage.getItem("list"))
     :[];
}

function setupItems(){
    let items = getLocalStorage();
    if(items.length > 0){
        items.forEach(element => {
            generateItem(element.value,element.id,element.status)
        });
    }
}

function addToLocalStorage(id,value){
    const item = {id, value, status:false};

    let items = getLocalStorage()
    items.push(item);
    localStorage.setItem("list",JSON.stringify(items));


}

function changeLocalStorage(id) {
    let items = getLocalStorage();
    items = items.map((item)=>{
        if(item.id === id){

            item.status = !item.status;

        }
        return item;
    })

    localStorage.setItem("list",JSON.stringify(items));
}

function removeFromLocalStorage(id) {
    let items = getLocalStorage();
    items = items.filter((item) =>{
        if(item.id !== id){
            return item;
        }
        
    })

    localStorage.setItem("list",JSON.stringify(items))
    
}


button.addEventListener('click', submit);
input.addEventListener('keypress', (e)=>{
    if(e.key ==='Enter'){
        submit();
    }
})


window.addEventListener('DOMContentLoaded', setupItems)