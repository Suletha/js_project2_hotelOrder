const form = document.getElementById('my_form');
const dishInput = document.getElementById('Dish');
const amountInput = document.getElementById('Price');
const catInput = document.getElementById('category');
const msg = document.querySelector('.msg');
const enteredDetailsList = document.getElementById('enteredDetails');

// Form submit event
form.addEventListener('submit', onSubmit);

// Add item
async function onSubmit(e) {
    e.preventDefault();
    if (dishInput.value === '' || amountInput.value === '' || catInput.value === '') {
        msg.classList.add('error');
        msg.textContent = 'Please enter all fields';

        // Remove error after 3 seconds
        setTimeout(() => {
            msg.textContent = '';
            msg.classList.remove('error');
        }, 3000);
    } else {
        // Create new details object
        const newItem = {
            Dish: dishInput.value,
            Price: amountInput.value,
            category: catInput.value
        };

        try {
            // Post to crudcrud using axios
            const response = await axios.post('https://crudcrud.com/api/7a77743b4eeb476b969680810b3191c0/booking_app_app', newItem);
            newItem._id = response.data._id; // Add the _id received from the server
            showData(newItem);
        } catch (err) {
            console.error(err);
        }

        // Clear fields
        dishInput.value = '';
        amountInput.value = '';
        catInput.value = '';
    }
}

// Display data in the correct table
function showData(obj) {
    // Create new li element
    const li = document.createElement('li');
    li.id = obj._id;

    // Create del button element
    const deleteBtn = document.createElement('button');
    deleteBtn.appendChild(document.createTextNode('Delete'));
    deleteBtn.classList.add('del');

    // Create text in the desired format
    const tableText = `${obj.category}: ${obj.Dish} - $${obj.Price}`;

    // Add the text to the li element
    li.appendChild(document.createTextNode(tableText));

    // Append the li element to the enteredDetailsList
    li.appendChild(deleteBtn);
    enteredDetailsList.appendChild(li);
}

// Handle item deletion
enteredDetailsList.addEventListener('click', async (e) => {
    if (e.target.classList.contains('del')) {
        if (confirm('Are You Sure?')) {
            const li = e.target.parentElement;
            try {
                await axios.delete(`https://crudcrud.com/api/7a77743b4eeb476b969680810b3191c0/booking_app_app/${li.id}`);
                li.remove(); // Remove the item from the screen
            } catch (err) {
                console.error(err);
            }
        }
    }
});

// Run the function after the script is loaded in the browser
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await axios.get('https://crudcrud.com/api/7a77743b4eeb476b969680810b3191c0/booking_app_app');
        for (let i = 0; i < response.data.length; i++) {
            showData(response.data[i]);
        }
    } catch (err) {
        console.error(err);
    }
});
