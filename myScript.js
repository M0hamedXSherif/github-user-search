const searchInput = document.querySelector("#search-input");
const fetchBtn = document.querySelector("#fetch-btn");
const usersList = document.querySelector("#users-list");

// المخزن الكبير (مهم جداً يفضل موجود عشان البحث يشوفه)
let allUsers = [];

// fetchBtn.addEventListener('click', async () => {
//     try {
//         fetchBtn.innerText = "Loading..."; // تم تصحيح الكتابة

//         const response = await fetch("https://api.github.com/users");
        
//         // ✅ التعديل هنا:
//         // شلنا "const users =" واستخدمنا المتغير العالمي "allUsers ="
//         // عشان لما نيجي نبحث تحت، نلاقي فيه بيانات
//         allUsers = await response.json();

//         renderUsers(allUsers);

//         fetchBtn.innerHTML = "Load Users";
//         console.log("Users loaded successfully!");

//     } catch (error) {
//         console.error("Fetching data error:", error);
//         alert("Oops! check the internet connection.");
//         fetchBtn.innerText = "Try Again!";
//     } 
// });



fetchBtn.addEventListener('click', async () => {
    try {

    fetchBtn.innerText = 'Loading...';

    const response = await fetch("https://api.github.com/users");

    allUsers = await response.json();

    renderUsers(allUsers);

    fetchBtn.innerText = 'Load Users';
    console.log("data fetched successfully!", allUsers);

    } catch (error) {
    console.error("fetching data error", error);
    alert("Oops! check the internet connection.");
    fetchBtn.innerText = 'Try Again';
} 
});



searchInput.addEventListener('input', (e) => {
    const value = e.target.value.toLowerCase();

    // بما إن allUsers اتملت فوق، دلوقت الفلتر هيشتغل صح
    const filterdUsers = allUsers.filter((user) => {
        // return: يعني لو الاسم فيه الحرف ده، "رجعهولي" معاك في القائمة الجديدة
        return user.login.toLowerCase().includes(value);
    });

    renderUsers(filterdUsers);
});


function renderUsers(list) {
    usersList.innerHTML = "";

    if (list.length === 0) {
        usersList.innerHTML = `
        <li style="border:none; text-align:center">No users found! 😕</li>
        `;
        // return هنا معناها: وقف الدالة وماتكملش الكود اللي تحت (ماتحاولش ترسم)
        return; 
    }

    list.forEach((u) => {
        const li = document.createElement("li");

        li.innerHTML = `
        <div style="display:flex; align-items:center; gap:10px;">
            <img src="${u.avatar_url}" alt="avatar" style="width:30px; border-radius:50%;">
            <span>${u.login}</span>
        </div>
        <span style="color:#aaa; font-size:0.9em;">ID: ${u.id}</span>
        `;

        usersList.appendChild(li);
    });
};