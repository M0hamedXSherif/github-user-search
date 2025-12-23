// // 1. تعريف العناصر (Selectors)
// const fetchBtn = document.querySelector("#fetch-btn");
// const searchInput = document.querySelector("#search-input");
// const usersList = document.querySelector("#users-list");

// // 2. المخزن الرئيسي للبيانات (Global State)
// let allUsers = [];

// // 3. دالة جلب البيانات من السيرفر (API Call)
// fetchBtn.addEventListener('click', async () => {
//     try {
//         // تغيير نص الزر ليدل على التحميل
//         fetchBtn.innerText = "Loading...";
        
//         // جلب البيانات
//         const response = await fetch("https://api.github.com/users");
        
//         // تخزين البيانات في المخزن الرئيسي
//         allUsers = await response.json();

//         // عرض البيانات
//         renderUsers(allUsers);
        
//         // إرجاع نص الزر كما كان
//         fetchBtn.innerText = "Load Users";
//         console.log("Data loaded successfully!");

//     } catch (error) {
//         console.error("Error fetching data:", error);
//         alert("فشل الاتصال بالسيرفر، تأكد من الإنترنت!");
//         fetchBtn.innerText = "Try Again";
//     }
// });



// // 4. دالة البحث المباشر (Filter Logic)
// searchInput.addEventListener('input', (e) => {
//     // أخذ النص المكتوب وتحويله لحروف صغيرة
//     const searchText = e.target.value.toLowerCase();

//     // تصفية المصفوفة الرئيسية
//     const filteredUsers = allUsers.filter((user) => {
//         // البحث بواسطة اسم المستخدم (login)
//         return user.login.toLowerCase().includes(searchText);
//     });

//     // إعادة رسم القائمة بالنتائج الجديدة
//     renderUsers(filteredUsers);
// });

// // 5. دالة الرسم (Render Function) - وظيفتها العرض فقط
// function renderUsers(list) {
//     // مسح القائمة الحالية
//     usersList.innerHTML = "";

//     // التحقق لو القائمة فارغة
//     if (list.length === 0) {
//         usersList.innerHTML = "<li style='border:none; text-align:center;'>No users found 😕</li>";
//         return;  // why this line is here ?
//     }

//     // بناء العناصر
//     list.forEach((user) => {
//         const li = document.createElement("li");
        
//         // وضع المحتوى (الاسم + الصورة من رابط الصورة في البيانات)
//         // user.avatar_url دي زيادة من عندي هدية عشان الشكل يبقى أحلى
//         li.innerHTML = `
//             <div style="display:flex; align-items:center; gap:10px;">
//                 <img src="${user.avatar_url}" alt="avatar" style="width:30px; border-radius:50%;">
//                 <span>${user.login}</span>
//             </div>
//             <span style="color:#aaa; font-size:0.9em;">ID: ${user.id}</span>
//         `;

//         usersList.appendChild(li);
//     });
// }



// 0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000

const searchInput = document.querySelector("#search-input");
const fetchBtn = document.querySelector("#fetch-btn");
const usersList = document.querySelector("#users-list");

let allUsers = [];

fetchBtn.addEventListener('click', async () => {
    try {

        fetchBtn.innerText = "loading...";

        const response = await fetch("https://api.github.com/users");

        let users = await response.json(); 

        allUsers = users;

        renderUsers(allUsers);

        fetchBtn.innerHTML = "Load Users";

        console.log("users loaded successfully!");

    } catch (error) {
        console.error("Erorr Fetching Data:", error)
        alert("Oops! Check The Internet Connection.");
        fetchBtn.innerText = "Try Again!";
    }
    

});


searchInput.addEventListener('input', (e) => {                  // ~
                                                                // |
    const value = e.target.value.toLowerCase();                 // |
                                                                // |
    const filteredUsers = allUsers.filter((user) => {           // |
                                                                // DONE
        return user.login.toLowerCase().includes(value);        // |
    //why ^ here (return)                                       // |
    })                                                          // |
    renderUsers(filteredUsers);                                 // |
});                                                             // ~



function renderUsers(list) {

    usersList.innerHTML = "";

    if (list.length === 0) {

        usersList.innerHTML ="<li style='border:none; text-align:center'>No users found 😕</li>"

        return;
    }

    list.forEach((user) => {

        const li = document.createElement("li");

        li.innerHTML = `
        <div style="display:flex; align-items:center; gap:10px;">
            <img src="${user.avatar_url}" alt="avatar" style="width:30px; border-radius:50%">
            <span>${user.login}</span>
        </div>
        <span style="color:#aaa; font-size:0.9em;">ID: ${user.id}</span>
        `;

        usersList.appendChild(li);
    });

}