
document.addEventListener('DOMContentLoaded', function() {
    const kidsList = document.querySelector('.kids-list');
    const sortDropdown = kidsList.querySelector('select');
    
    if (!localStorage.getItem('kids')) {
        const defaultKids = [
            { name: "Ali", dob: "03/15/2013", age: 12 },
            { name: "Fatimah", dob: "11/20/2015", age: 10 },
            { name: "Omar", dob: "05/10/2017", age: 8 }
        ];
        localStorage.setItem('kids', JSON.stringify(defaultKids));
    }
    
    displayKids();
    
    sortDropdown.addEventListener('change', function() {
        displayKids(this.value);
    });
});

function displayKids(sortBy = 'name') {
    const kids = JSON.parse(localStorage.getItem('kids'));
    const kidsContainer = document.querySelector('.kids-list');
    
    while (kidsContainer.children.length > 2) {
        kidsContainer.removeChild(kidsContainer.lastChild);
    }
    
    if (sortBy === 'name-asc') {
        kids.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'name-desc') {
        kids.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBy === 'age-asc') {
        kids.sort((a, b) => Number(a.age) - Number(b.age));
    } else if (sortBy === 'age-desc') {
        kids.sort((a, b) => Number(b.age) - Number(a.age));
    }
    
    
    kids.forEach(kid => {
        const kidDiv = document.createElement('div');
        kidDiv.className = 'kid';
        
        const nameHeading = document.createElement('h3');
        nameHeading.textContent = kid.name;
        
        const dobPara = document.createElement('p');
        dobPara.textContent = `DOB: ${kid.dob}`;
        
        const agePara = document.createElement('p');
        agePara.textContent = `Age: ${kid.age}`;
        
        kidDiv.appendChild(nameHeading);
        kidDiv.appendChild(dobPara);
        kidDiv.appendChild(agePara);
        
        kidsContainer.appendChild(kidDiv);
    });
}