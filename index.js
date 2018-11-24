let toDoList = getStore('toDoList');
console.log (toDoList)
let id = getStore('id');

const element = document.getElementById("toDoRoot");
const newTaskButton = document.getElementById('newTask');
const input = document.getElementById('newTaskText');
 

let startRender = function () {
    toDoList.forEach((item) => {
        render(item)
    })
};

function render(task) {
    let paragraph = document.createElement('div');
    let node2 = document.createTextNode('edit');
    let node3 = document.createTextNode('delete');
    let editInput = document.createElement('input');
    let editButton = document.createElement('button');
    let deleteButton = document.createElement('button');
    let checkBox = document.createElement('input');

    checkBox.type='checkbox';
    checkBox.className = 'checkbox'
    editInput.className = 'taskInput'
    paragraph.className = 'paragraph';
    editButton.className = 'editButton';
    deleteButton.className = 'deleteButton';
    editInput.value = task.value;
    paragraph.appendChild(editInput);
    paragraph.appendChild(checkBox);
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

newTaskButton.addEventListener('click', (event) => {
    let value = input.value;
    toDoList.push({value: value, id: id, status: 'new'});
    render({value: value, id: id, status: 'new'});
    input.value = '';
    id +=1;
    putStore(toDoList, id);
});

function editFunc(event){
    let newValue = event.target.parentNode.firstChild.value;
    let id = event.target.parentNode.name
    toDoList.forEach(function (item, index){
        if (id === item.id) {
            item.value = newValue;
             }
        })
        putStore(toDoList)

} 
function checkFunc(event){
    console.log(event);
    let id = event.target.parentNode.name
    let paragraphClass;
    if (event.target.checked) {
        paragraphClass = 'checked';
    }
    else {paragraphClass = 'new'}

    element.childNodes.forEach(function (item, index){
        console.log (item.name)
     if (id === item.name) {
        item.className = paragraphClass
        toDoList[index].status = paragraphClass
          }
    })
    putStore(toDoList)

}


function deleteFunc (event){
   let id = event.target.parentNode.name
   element.childNodes.forEach(function (item, index){
    if (id === item.name) {
        element.removeChild(item)
          toDoList.splice(index, 1)
         }
    })
    putStore(toDoList)
}



startRender();