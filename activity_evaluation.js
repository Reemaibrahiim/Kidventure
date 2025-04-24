document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.Activity-Evaluation form');
    const ratingInput = document.getElementById('rate');
    const ratingValue = document.getElementById('rating-value');

    
    ratingInput.addEventListener('input', function() {
        ratingValue.textContent = this.value;
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const activity = document.getElementById('activity').value;
        const rating = ratingInput.value; 
        const feedback = document.getElementById('feedback').value;
        
        if (!activity) {
            alert('Please select an activity!');
            return;
        }
        
        if (rating == 0) {
            alert('Please provide a rating!');
            return;
        }
        
        const activityName = document.getElementById('activity').options[document.getElementById('activity').selectedIndex].text;
        alert(`Thank you for your feedback! Your rating for ${activityName} is ${rating}`);
        
        window.location.href = 'index.html';
    });
});