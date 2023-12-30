  // assign event listeners

  const assignListeners = () => { 
    let activeLink = document.querySelector('.active');
    const links = Array.from(document.getElementById('primary-navigation').children);
    // when I click on a link to navigate to a new page, I want to remove the active class from the current link
    // and add the active class to the clicked link
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        //e.preventDefault();
        activeLink.classList.remove('active');
        link.classList.add('active');
        activeLink = link;
      });
    });
  }


  //assignListeners();