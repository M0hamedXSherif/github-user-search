const searchInput = document.querySelector("#search-input");
const usersList = document.querySelector("#users-list");
const fetchBtn = document.querySelector("#fetch-btn");
const favList = document.querySelector("#fav-list"); // تأكد إن الـ HTML فيه عنصر بالـ ID ده

let allUsers = [];

// تحميل المفضلة عند البدء
let favorites = JSON.parse(localStorage.getItem("githubFavs")) || [];
renderFavorites();

fetchBtn.addEventListener('click', async () => {
    try {
        fetchBtn.innerHTML = "Loading...";
        const response = await fetch("https://api.github.com/users");
        allUsers = await response.json();
        renderUsers(allUsers);
        fetchBtn.innerText = "Load Users";
    } catch (error) {
        console.error("Error:", error);
        alert("Oops! it seems something went wrong");
        fetchBtn.innerText = "Try again";
    }
});

searchInput.addEventListener('input', (e) => {
    const value = e.target.value.toLowerCase();
    
    // تصحيح رقم 1: إضافة const وإزالة الأقواس {} لعمل return تلقائي
    const filteredUsers = allUsers.filter((user) => 
        user.login.toLowerCase().includes(value)
    );
    
    renderUsers(filteredUsers);
});

function renderUsers(list) {
    usersList.innerHTML = "";

    if (list.length === 0) {
        usersList.innerHTML = "<li style='text-align:center;'>No users found! 😕</li>";
        return;
    }

    list.forEach(user => {
        const li = document.createElement("li");
        
        // تصحيح رقم 2: استخدام user.login وتصحيح قفلات التاجات </div>
        li.innerHTML = `
            <div style='display:flex; align-items:center; gap:10px;'>
                <img src='${user.avatar_url}' alt='avatar' width='30px' style='border-radius:50%;'>
                <span style='font-weight:bold; font-size:0.9em;'>${user.login}</span>
            </div>
            <button class='add-fav-btn' onclick='addToFav("${user.login}")'>Add ❤️</button>
        `;
        usersList.appendChild(li);
    });
};

window.addToFav = function(username) {
    if (favorites.includes(username)) {
        alert("Oh! User is already in favorites.");
        return;
    }
    favorites.push(username);
    localStorage.setItem("githubFavs", JSON.stringify(favorites));
    renderFavorites();
};

function renderFavorites() {
    // تصحيح رقم 3: تنظيف قائمة المفضلة favList مش usersList
    favList.innerHTML = ""; 

    favorites.forEach(user => {
        const li = document.createElement("li");
        
        // تصحيح رقم 5: كتابة حرف "x" داخل الزر ليظهر
        li.innerHTML = `
            <span>${user}</span>
            <span style='color:red; font-weight:bold; cursor:pointer;' onclick='removeFav("${user}")'> ❌ </span>
        `;
        
        // تصحيح رقم 4: إضافة العنصر للقائمة فعلياً
        favList.appendChild(li); 
    });
}

window.removeFav = function(username) {
    favorites = favorites.filter(u => u !== username);
    localStorage.setItem("githubFavs", JSON.stringify(favorites));
    renderFavorites();
}