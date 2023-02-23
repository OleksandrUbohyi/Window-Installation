const checkNumInputs = (selector) => {
    const numInputs = document.querySelectorAll(selector);

    numInputs.forEach(item => {
        item.addEventListener('input', () => {
            //regexp to enter only numbers
            item.value = item.value.replace(/\D/, '');
        })
    });
}

export default checkNumInputs;