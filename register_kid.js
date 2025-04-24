
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".register-form");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const dob = document.getElementById("dob").value;
        const gender = document.getElementById("gender").value;
        const age = document.getElementById("age").value;
        const height = document.getElementById("height").value;
        const weight = document.getElementById("weight").value;
        const phone = document.getElementById("phone").value.trim();
        const email = document.getElementById("email").value.trim();
        const photo = document.getElementById("photo").files[0];

        if (!name || !dob || !gender || !age || !height || !weight || !phone || !email || !photo) {
            alert("Please fill all the required fields.");
            return;
        }

        if (!isNaN(name[0])) {
            alert("Name cannot start with a number.");
            return;
        }

        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phone)) {
            alert("Phone number must be exactly 10 digits.");
            return;
        }

        const reader = new FileReader();
        reader.onload = function () {
            const photoBase64 = reader.result;

            const kidData = {
                name: name,
                dob: dob,
                gender: gender,
                age: age,
                height: height,
                weight: weight,
                phone: phone,
                email: email,
                photo: photoBase64
            };

            localStorage.setItem("kidData", JSON.stringify(kidData));

            
            let kidsArray = JSON.parse(localStorage.getItem("kids")) || [];

            const birthYear = new Date(dob).getFullYear();
            const currentYear = new Date().getFullYear();
            const calculatedAge = currentYear - birthYear;

            kidsArray.push({
                name: name,
                dob: dob,
                age: calculatedAge
            });

            localStorage.setItem("kids", JSON.stringify(kidsArray));

            
            window.location.href = "viewprint.html";
        };

        reader.readAsDataURL(photo);
    });
});
