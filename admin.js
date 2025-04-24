// في ملف JavaScript الخاص بك (مثل admin.js)
document.addEventListener('DOMContentLoaded', function() {
    const kidsList = document.querySelectorAll('.kids-row:not(.header)'); // اختيار كل الصفوف عدا الهيدر
    const visibleKids = 2; // عدد الأطفال المعروضين أولاً
    const moreButton = document.createElement('button');
    
    // إخفاء الأطفال الزائدين
    for (let i = visibleKids; i < kidsList.length; i++) {
        kidsList[i].style.display = 'none';
    }

    // إنشاء زر "More"
    moreButton.textContent = 'Show More';
    moreButton.classList.add('more-button');
    document.querySelector('.kids-widget').appendChild(moreButton);

    // حدث النقر على الزر
    moreButton.addEventListener('click', function() {
        for (let i = visibleKids; i < kidsList.length; i++) {
            if (kidsList[i].style.display === 'none') {
                kidsList[i].style.display = 'flex'; // أو 'table-row' إذا كنت تستخدم جدول
                moreButton.textContent = 'Show Less';
            } else {
                kidsList[i].style.display = 'none';
                moreButton.textContent = 'Show More';
            }
        }
    });
});