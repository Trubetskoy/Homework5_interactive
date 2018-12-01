let toDoList = getStore('toDoList');
console.log (toDoList)
let id = getStore('id');

const element = document.getElementById("toDoRoot");
const newTaskButton = document.getElementById('newTask');
const input = document.getElementById('newTaskText');
const enter = document.getElementById('enter');


let startRender = function () {
    for (let i=0; toDoList.length; i++){
        render(toDoList[i])
    }
};

function render(task) {
    let paragraph = document.createElement('div');
    let node2 = document.createTextNode('edit');
    let node3 = document.createTextNode('delete');
    let editInput = document.createElement('input');
    let toDoText = document.createElement('p');
    let toDoTask = document.createTextNode (task.value);
    let editButton = document.createElement('button');
    let deleteButton = document.createElement('button');
    let checkBox = document.createElement('input');

    checkBox.type='checkbox';
    checkBox.className = 'checkbox';
    editInput.className = 'taskInput';
    paragraph.className = 'paragraph';
    editButton.className = 'editButton';
    deleteButton.className = 'deleteButton';
    toDoText.className = 'toDoText';
    editInput.value = task.value;
    paragraph.appendChild(toDoText);
    paragraph.appendChild(editInput);
    paragraph.appendChild(checkBox);
    toDoText.appendChild(toDoTask);
    paragraph.name = task.id;
    paragraph.className = task.status;
    editButton.appendChild(node2);
    deleteButton.appendChild(node3);
    element.appendChild(paragraph);
    paragraph.appendChild(editButton);
    paragraph.appendChild (deleteButton);

    editButton.addEventListener('click', (event)=>{editFunc(event, task.id)});
    deleteButton.addEventListener('click', (event)=>{deleteFunc(event, task.id)});
    checkBox.addEventListener('click', (event)=> {checkFunc(event, task.id)});
    
};

function putStore(newObject, id) {
    localStorage.toDoList = JSON.stringify(newObject)
    if (id) {
        localStorage.id = JSON.stringify(id)
    }
}

function getStore(action) {
    if (action === 'id') {
       if (localStorage.id) {
        return JSON.parse(localStorage.id)
    } else {
        return 0
    } }
if (action === 'toDoList'){
    if (localStorage.toDoList) {
        return JSON.parse(localStorage.toDoList)
    } else {
        return []
        }
    }
}

enter.addEventListener('submit', (event) => {
    let value = input.value;
    toDoList.push({value: value, id: id, status: 'new'});
    render({value: value, id: id, status: 'new'});
    input.value = '';
    id +=1;
    putStore(toDoList, id);
});

function editFunc(event){
    let newValue = event.target.parentNode.getElementsByTagName('input')[0].value;
    let id = event.target.parentNode.name;
    let parentNode = event.target.parentNode.getElementsByTagName('p')[0].firstChild;
    let changeClass = event.target.parentNode.getElementsByTagName('input')[0];
         
    let array = toDoList
    for (let i = 0; i < array.length; i++){ 
        if (id === array[i].id) {
            array[i].value = newValue;
            }
        
        putStore(toDoList);
        parentNode.textContent = newValue;

        if (changeClass.className === 'taskInput') {
            changeClass.className = 'taskInputEdit'
        }
        else if (changeClass.className === 'taskInputEdit') {
                 changeClass.className = 'taskInput'
        }
        break
    }

};

function checkFunc(event){
    let id = event.target.parentNode.name
    let paragraphClass;
    if (event.target.checked) {
        paragraphClass = 'checked';
    }
    else {paragraphClass = 'new'}

    let array = element.childNodes;
    for (let i = 0; i < array.length; i++){
    if (id === array[i].name) {
        array[i].className = paragraphClass
        toDoList[i].status = paragraphClass
        break
        }
    }
    putStore(toDoList)
}

function deleteFunc (event){
   let id = event.target.parentNode.name
   let array = element.childNodes;
   
   for (let i = 0; i < array.length; i++){
        if (id === array[i].name) {
            element.removeChild(array[i])
            toDoList.splice(i, 1)
            break
            }
        }
            putStore(toDoList)
   }
       
startRender();

// function deleteFunc (event){
//     let id = event.target.parentNode.name
//     element.childNodes.forEach(function (item, index){
//      if (id === item.name) {
//          element.removeChild(item)
//            toDoList.splice(index, 1)
//           }
//      })
//      putStore(toDoList)
//  }
 