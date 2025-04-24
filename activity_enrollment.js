
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.Enroll-a-Kid form');
    const kidsDropdown = document.getElementById('kid');
    const coachDropdown = document.getElementById('coach');
    const prereqDropdown = document.createElement('select');
    const activitiesContainer = document.querySelector('.activity-list');
    const enrollButton = form.querySelector('button[type="submit"]');

    prereqDropdown.id = "prerequisite";
    prereqDropdown.name = "prerequisite";
    prereqDropdown.innerHTML = '<option value="">Filter by Prerequisite</option>';
    coachDropdown.insertAdjacentElement('afterend', prereqDropdown);

    const activities = [
        { name: "Football", coach: "Emily Johnson", prerequisite: "Basic running skills", image: "images/football2.png", description: "Develop football skills with our professional coach" },
        { name: "Ballet", coach: "Sofia Martinez", prerequisite: "Flexibility", image: "images/ballet.png", description: "Learn classical ballet techniques" },
        { name: "Karate", coach: "Yuki Tanaka", prerequisite: "None", image: "images/Karate2.png", description: "Martial arts training for discipline and fitness" },
        { name: "Basketball", coach: "Michael Brown", prerequisite: "Basic ball handling", image: "images/Basketball2.png", description: "Team basketball skills development" },
        { name: "Drawing", coach: "Clara Wilson", prerequisite: "None", image: "images/drawing.png", description: "Creative art and drawing classes" },
        { name: "Swimming", coach: "James Smith", prerequisite: "Water comfort", image: "images/swimming4.jpg", description: "Swimming lessons for all skill levels" },
        { name: "yoga", coach: "Emily Johnson", prerequisite: "Flexibility", image: "images/yoga3.png", description: "A fun and gentle activity that combines stretching, balance, and breathing." }
    ];
    function populateCoachFilter() {
        while (coachDropdown.options.length > 1) {
            coachDropdown.remove(1);
        }

        const uniqueCoaches = [...new Set(activities.map(a => a.coach))].sort();
        uniqueCoaches.forEach(coach => {
            const option = document.createElement('option');
            option.value = coach;
            option.textContent = coach;
            coachDropdown.appendChild(option);
        });
    }

    function populatePrerequisiteFilter() {
        while (prereqDropdown.options.length > 1) {
            prereqDropdown.remove(1);
        }

        const uniquePrereqs = [...new Set(activities.map(a => a.prerequisite).filter(p => p !== "None"))].sort();
        uniquePrereqs.forEach(req => {
            const option = document.createElement('option');
            option.value = req;
            option.textContent = req;
            prereqDropdown.appendChild(option);
        });
    }

    function displayActivities(filterCoach = '', filterPrereq = '') {
        activitiesContainer.innerHTML = '';
        activities.forEach(activity => {
            if ((filterCoach && activity.coach !== filterCoach) ||
                (filterPrereq && activity.prerequisite !== filterPrereq)) {
                return;
            }

            const activityItem = document.createElement('div');
            activityItem.className = 'activity-item';
            activityItem.innerHTML = `
                <img src="${activity.image}" alt="${activity.name}" style="max-width:200px;">
                <h3>${activity.name}</h3>
               
                <label>
                    <input type="checkbox" name="activities" value="${activity.name}"> Select this activity
                </label>
            `;
            activitiesContainer.appendChild(activityItem);
        });
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const selectedKid = kidsDropdown.value;
        const checkedActivities = form.querySelectorAll('input[name="activities"]:checked');

        if (!selectedKid) {
            alert('Please select a kid!');
            return;
        }

        if (checkedActivities.length === 0) {
            alert('Please select at least one activity!');
            return;
        }

        const kidName = kidsDropdown.options[kidsDropdown.selectedIndex].text;
        const confirmationDiv = document.createElement('div');
        confirmationDiv.className = 'enrollment-confirmation';
        confirmationDiv.innerHTML = `
            <h2>Enrollment Confirmation</h2>
            <p><strong>Kid:</strong> ${kidName}</p>
            <h3>Selected Activities:</h3>
            <ul>
                ${Array.from(checkedActivities).map(cb => {
                    const activity = activities.find(a => a.name === cb.value);
                    return `<li><strong>${activity.name}</strong> with Coach ${activity.coach}</li>`;
                }).join('')}
            </ul>
        `;

        const prevConfirmation = form.querySelector('.enrollment-confirmation');
        if (prevConfirmation) prevConfirmation.remove();

        enrollButton.insertAdjacentElement('afterend', confirmationDiv);
        confirmationDiv.scrollIntoView({ behavior: 'smooth' });
        form.reset();
    });

    coachDropdown.addEventListener('change', () => {
        displayActivities(coachDropdown.value, prereqDropdown.value);
    });

    prereqDropdown.addEventListener('change', () => {
        displayActivities(coachDropdown.value, prereqDropdown.value);
    });

    if (localStorage.getItem('kids')) {
        const kids = JSON.parse(localStorage.getItem('kids'));
        kids.forEach(kid => {
            const option = document.createElement('option');
            option.value = kid.name;
            option.textContent = kid.name;
            kidsDropdown.appendChild(option);
        });
    }

    populateCoachFilter();
    populatePrerequisiteFilter();
    displayActivities();
});
