const todoInput = document.querySelector("#todo-input");
const todosContainer = document.querySelector(".todos");
const completedCount = document.querySelector(".completedCount");

let todos = [];
let elem =null;

const  changeTheme = ()=> {
  document.body.classList.toggle("light");
  console.log("clicked");
};

todoInput.addEventListener("keyup", (e) => {
  if (e.key === "enter" || e.keyCode === 13) {
    todos.push({value:e.target.value,checked:false});
    console.log(todos);
    newTodo(e.target.value);
    todoInput.value = "";
    countCompleted();
  }
});

const newTodo = (value) => {
  const todo = document.createElement("div");
  const todoText = document.createElement("p");
  const todoCheckBox = document.createElement("input");
  const todoCheckBoxlabel = document.createElement("label");
  const todoCross = document.createElement("span");

  let obj =todos.find((t) =>t.value === value);

  todoText.textContent = value;
  todoCheckBox.type = "checkbox";
  todoCheckBox.name = "ckeckbox";
  todoCheckBoxlabel.hmtlfor = "ckeckbox";
  todoCheckBoxlabel.addEventListener("click", (e) => {
    if (todoCheckBox.checked) {
      console.log("checked")
      todoCheckBox.checked = false;
      todoText.style.textDecoration = "none";
      todoCheckBoxlabel.classList.remove("active");
      obj.checked =false;
      countCompleted();

    } else {
      obj.checked =true;
      countCompleted();
      todoCheckBox.checked = true;
      todoText.style.textDecoration = "line-through";
      todoCheckBoxlabel.classList.add("active");
    }
  });
    todoCross.textContent = "X";
    todoCross.addEventListener("click", (e) => {
      e.target.parentElement.remove();
      todos =todos.filter((t) => t != obj);
      countCompleted();
    });

    todo.classList.add("todo");
    todoCheckBoxlabel.classList.add("circle");
    todoCross.classList.add("cross");

    todo.appendChild(todoCheckBox);
    todo.appendChild(todoCheckBoxlabel);
    todo.appendChild(todoText);
    todo.appendChild(todoCross);

    todo.draggable=true;
    todo.addEventListener("dragstart",(e) =>{
      e.dataTransfer.effectAllowed ="move";
      e.dataTransfer.setData("text/plain",null);
      elem= e.target;

    });
    todo.addEventListener("dragover",(e) =>{
      let el1;
      e.preventDefault();
      if(e.target.classList.contains("todo")){
        el1v =  e.target;
      }else{
        el1=e.target.parentElement;
      }
      if(isBefore(elem,el1)){
        el1.parentNode.insertBefore(elem,el1);
      }else{
        el1.parentNode.insertBefore(elem,el1,nextSibling);
      }

    });
    
    todo.addEventListener("dragend",() =>{
      elem =null;
      let index =todos.findIndex((t) => t.value === false);
        todos.splice(index,1);
      if(todo.nextSibling){
        let index1= todos.findIndex(
   (t) =>t.value === todo.nextSibling,querySelector("p").textContent
        );
        todos.splice(index1,0,{
          value:value,
          checked: todo.querySelector("input").checked,

        });
      } else{
        todos.push({
          value:value,
          checked:todo.querySelector("input").checked,
        });
      }
    });
    todosContainer.appendChild(todo);

};

 const countCompleted =()=>{
  completedCount.textContent=`${
    todos.filter((t)=> t.checked === false).length
  } items left `;
  
}


 const clearCompleted=()=>{
  document.querySelectorAll(".todo").forEach((todo) =>{
    if(todo.querySelectorAll("input").checked){
      todo.remove();
      console.log("clear")
    }
  });
}
const showAll = ()=>{
  document.querySelectorAll(".todo").forEach((todo) =>{
todo.style.display="grid";
console.log("all")

  })
};
 const filterCompleted =()=>{
   document.querySelectorAll(".todo").forEach((todo)=>{
     if(!todo.querySelector("input").checked){
       todo.display ="none";
       console.log("complted")
     }
   });
 }
 const filterActive =()=>{
   document.querySelectorAll(".todo").forEach((todo)=>{
     if(todo.querySelectorAll("input").checked){
       todo.style.display ="none";
       console.log("active")
     }
   });
 }
