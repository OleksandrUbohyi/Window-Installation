const tabs = (headerSelector, tabSelector, contentSelector, activeClass) => {
    const tabsHeader = document.querySelector(headerSelector),
          tab = document.querySelectorAll(tabSelector),
          content = document.querySelectorAll(contentSelector);

        function hideTabContent() {
            content.forEach(item => {
                item.style.display = 'none';
            })

            tab.forEach(item => {
                item.classList.remove(activeClass);
            })
        }

        function showTabContent(i = 0) {
            content[i].style.display = 'block';
            tab[i].classList.add(activeClass);
        }

        //call functions in case all items are shown
        hideTabContent();
        showTabContent();

        tabsHeader.addEventListener('click', e => {
            const target = e.target;
            //regexp to remove the dot in the selector
            // include parent nodes
            if (target && (target.classList.contains(tabSelector.replace(/\./, "")) ||
                target.parentNode.classList.contains(tabSelector.replace(/\./, "")))) {
                    tab.forEach((item, i) => {
                        //get clicked tab index
                        if(target === item || target.parentNode === item) {
                            hideTabContent();
                            showTabContent(i);
                        }
                    })
                }
        })


}

export default tabs;