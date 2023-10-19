const form = document.getElementById('my_form');
const orderist = document.getElementById('category');
const tab_1 = document.getElementById('t1');
const tab_2 = document.getElementById('t2');
const tab_3 = document.getElementById('t3');
const dishInput = document.getElementById('Dish');
const amountInput = document.getElementById('Price');
const catInput = document.getElementById('category');
const msg = document.querySelector('.msg');
const enteredDetailsList = document.getElementById('enteredDetails'); 

//const filter = document.getElementById('filter');

//Form submit event
form.addEventListener('submit', onSubmit);


// Add item
async function onSubmit(e){
    e.preventDefault();
  if (dishInput.value === '' || amountInput.value === '' || catInput.value === '') {
    msg.classList.add('error');
    msg.textContent = 'Please enter all fields';
''
    // Remove error after 3 seconds
    setTimeout(() => msg.remove(), 3000);
  } else {

    // Create new details object
    const newItem = {
        Dish: dishInput.value,
        Price: amountInput.value,
      category: catInput.value
    };
    await showData(newItem);

    try {
      // post to crudcrud using axios
      const response = await axios.post('https://crudcrud.com/api/ddf28f4c81be4b4a87bee128da947ee9/user_form_data', newItem);
      console.log(response);
    } catch (err) {
      console.error(err);
    }

    // Clear fields
    dishInput.value = '';
    amountInput.value = '';
    catInput.value = '';
  }
}

    
async function showData(obj) {
    // Create new li element
    const li = document.createElement("li");
    li.id = obj._id;

    // Create del button element
    const deleteBtn = document.createElement('button');
    deleteBtn.appendChild(document.createTextNode("Delete"));
    deleteBtn.classList.add('del');

    // Create text in the desired format
    const tableText = ` ${obj.category}: ${obj.Dish} - ${obj.Price}`;


    

    // Add the text to the li element
    li.appendChild(document.createTextNode(tableText));

    // Append the li element to the separate <ul> for entered details
    enteredDetailsList.appendChild(li);
    
    // Add the delete button to the li element
    li.appendChild(deleteBtn);

    // Append the li element to the appropriate table
    if (obj.category === 'Table 1')
        enteredDetailsList.appendChild(li);
    if (obj.category === 'Table 2')
        enteredDetailsList.appendChild(li);
    if (obj.category === 'Table 3')
        enteredDetailsList.appendChild(li);
}



tab_1.addEventListener('click', removeItem);
tab_2.addEventListener('click', removeItem);
tab_3.addEventListener('click', removeItem);

async function removeItem(e) {
  if (e.target.classList.contains('del')) {
    if (confirm('Are You Sure?')) {
      const li = e.target.parentElement;
      try {
        const response = await axios.delete(`https://crudcrud.com/api/ddf28f4c81be4b4a87bee128da947ee9/user_form_data/${li.id}`);
        if (response.status === 200) {
          // Successfully deleted from the API, now remove from the screen
          li.remove();
        } else {
          console.log('Deletion from API failed.');
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
}



//Run the function after the script is loaded in the browser
document.addEventListener('DOMContentLoaded', async () => {
    try {
      const response = await axios.get('https://crudcrud.com/api/ddf28f4c81be4b4a87bee128da947ee9/user_form_data');
      for (let i = 0; i < response.data.length; i++) {
        await showData(response.data[i]);
      }
    } catch (err) {
      console.log(err);
    }
  });




