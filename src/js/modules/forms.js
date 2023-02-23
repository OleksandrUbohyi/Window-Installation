import checkNumInputs from "./checkNumInputs";

const forms = (state) => {
    const form = document.querySelectorAll('form'),
          input = document.querySelectorAll('input');

          checkNumInputs('input[name="user_phone"]');

    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    //async - tell JS there are async operations so JS knows about it, and then put Await before async operations
    const postData = async (url, data) => {
        document.querySelector('.status').textContent = message.loading;
        //fetch API returns promise
        //add headers to our feth request
        // ES7 - async/await
        //we need to wait for the result to save it, so we need to Await
        let res = await fetch(url, {
            method: "POST",
            body: data
        });

        //we know server return async text data, so we have to await here as well
        return await res.text();
    }

    const clearInputs = () => {
        input.forEach(item => {
            item.value = '';
        });
    }

    form.forEach(item => {
        item.addEventListener('submit', e => {
            e.preventDefault();

            //create status message container
            let statusMessage = document.createElement('div');
            //add styles to it
            statusMessage.classList.add('status');
            //add container to the form submitted
            item.appendChild(statusMessage);

            //collect all form data including pictures, files etc.
            //we need to know what server takes: urlencoded format, json, formdata
            const formData = new FormData(item);

            if(item.getAttribute('data-calc') === 'end') {
                for(let key in state) {
                    formData.append(key, state[key])
                }
            }

            postData('assets/server.php', formData)
            .then(res => {
                console.log(res);
                statusMessage.textContent = message.success;
            })
            .catch(()=> statusMessage.textContent = message.failure)
            .finally(()=> {
                clearInputs();
                setTimeout(() => {
                   statusMessage.remove() 
                }, 5000);
            })

        })
    });
}

export default forms;