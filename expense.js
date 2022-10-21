let button = document.getElementById("submitButton")
button.addEventListener('click', createList)

function createList(event){   
    let amount = document.getElementById("amount").value
    let description = document.getElementById("description").value
    let category = document.getElementById("category").value
    
    let li = document.createElement("li")
    li.textContent = `${amount}-${category}-${description}`
    let editBtn = document.createElement('button')
    editBtn.textContent = 'Edit'
    editBtn.style.borderBlockColor = 'green'

    li.appendChild(editBtn)
    let delBtn = document.createElement('button')
    delBtn.textContent = 'Delete'
    delBtn.style.borderBlockColor = 'red'
    li.appendChild(delBtn)
    console.log(li)
    
    let mainList = document.getElementById("mainList")
    let expenseObj = {'Amount':amount,'Description':description,'Categoty':category }
    expenseObj_serialized = JSON.stringify(expenseObj)
    mainList.appendChild(li)
    localStorage.setItem(description,expenseObj_serialized)

    delBtn.addEventListener('click',()=>{   
        if (confirm ('Do you want to delete this expense?')){
        mainList.removeChild(li)
        localStorage.removeItem(description)
    }
    }
    )
    editBtn.addEventListener('click', ()=>{
        let newAmount = prompt('Amount')
        let newDescrition = prompt('Description')
        let newCategory = prompt('Category')
       
        li.textContent = `${newAmount}-${newCategory}-${newDescrition}`
        let expenseObj = {'Amount':newAmount,'Description':newDescrition,'Categoty':newCategory }
        expenseObj_serialized = JSON.stringify(expenseObj)
        localStorage.setItem(description,expenseObj_serialized)
        li.append(delBtn)
        li.appendChild(editBtn)
    }
    )
} 
let reload = document.addEventListener('DOMContentLoaded', ()=>{
    for(let i = 0; i < localStorage.length; i++) {   
        const newKey = localStorage.key(i)
        x = localStorage.getItem(newKey)
        y = JSON.parse(x)
        let mainList = document.getElementById("mainList")
        let li = document.createElement("li")
        li.textContent = `${y.Amount}-${y.Categoty}-${y.Description}`
        mainList.appendChild(li)
        let editBtn = document.createElement('button')
        editBtn.textContent = 'Edit'
        editBtn.style.borderBlockColor = 'green'
        editBtn.style.left = '500px'
        li.appendChild(editBtn)
        let delBtn = document.createElement('button')
        delBtn.textContent = 'Delete'
        delBtn.style.borderBlockColor = 'red'
        li.appendChild(delBtn)
        delBtn.addEventListener('click',()=>{   
            if (confirm ('Do you want to delete this expense?')){
            mainList.removeChild(li)
            localStorage.removeItem(description)
        }
        }
        )
        editBtn.addEventListener('click', ()=>{
            let newAmount = prompt('Amount')
            let newDescrition = prompt('Description')
            let newCategory = prompt('Category')
            li.textContent = `${newAmount}-${newCategory}-${newDescrition}`
            let expenseObj = {'Amount':newAmount,'Description':newDescrition,'Categoty':newCategory }
            expenseObj_serialized = JSON.stringify(expenseObj)
            localStorage.setItem(description,expenseObj_serialized)
            li.append(delBtn)
            li.appendChild(editBtn)
        }
        )
    }
})
