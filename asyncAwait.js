function saveToLocalStorage(event) {
    event.preventDefault();
    const amount = event.target.amount.value;
    const description = event.target.description.value;
    const category = event.target.category.value;
    const obj = {
        amount,description,category
    };
    const getPost = async () => {
        try {
            const result = await axios.post("https://crudcrud.com/api/429c22663a7f4e5b84a013252e083b12/expenseTracker", obj)
            showScreenUser(result.data)
        } catch (err) {
            console.log(err)
        }
    }
    getPost();
}
window.addEventListener("DOMContentLoaded", () => {
    const getfunc = async () => {
        try {
            const result = await axios.get("https://crudcrud.com/api/429c22663a7f4e5b84a013252e083b12/expenseTracker")
            console.log(result)
            for (var i = 0; i < result.data.length; i++) {
                delScreenUser(result.data[i])
            }
        } catch (err) {
            console.log(err)
        }
        getfunc();
    }
})
function showScreenUser(user) {
    document.getElementById('description').value = '';
    document.getElementById('amount').value = '';

    if (localStorage.getItem(user.description) !== null) {
        delScreenUser(user.description)
    }
    const parentNode = document.getElementById('showOn');
    const childNode = `<li id=${user._id}> ${user.amount} - ${user.description} - ${user.category}
                                 <button onclick=deleteUser('${user._id}')> Delete Data </button>   
                                 <button onclick=editUser('${user.description}','${user.amount}','${user._id}')> Edit Data </button>        
                                    </li>`
    parentNode.innerHTML = parentNode.innerHTML + childNode;
}
function editUserDetails(description, amount, userId) {
    document.getElementById('description').value = description;
    document.getElementById('amount').value = amount;
    deleteUser(userId);
}
async function deleteUser(userId) {
    try {
        const result = await axios.delete(`https://crudcrud.com/api/429c22663a7f4e5b84a013252e083b12/expenseTracker/${userId}`)
        console.log(result)
        delScreenUser(userId)
    } catch(err) {
        console.log(err)
    }
}
deleteUser();
function delScreenUser(userId) {
    const parentNode = document.getElementById('showOn');
    const childNodeToBeDeleted = document.getElementById(userId);
    if (childNodeToBeDeleted) {
        parentNode.removeChild(childNodeToBeDeleted);
    }
}
