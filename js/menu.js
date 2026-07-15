   
    // load pages
    const detailcard=document.getElementById("detailcard");
   function loadpag(path) {
    window.location.href = path;
     }
     //lisen
     function headmenu(lan){
        fetch("json/home.json")
    .then(response => response.json())
    .then(menu => {
    const menubar=document.querySelector(".menubare");
    const login=document.getElementById("login");
    const language=document.getElementById("lachooser"); 
    const menus=document.getElementById("menus");
    menus.textContent=menu[0].head.menu[lan];
    language.textContent=menu[0].button.languge[lan];
    menubar.innerHTML= `
    <a href="#"class="myLink" id="home">${menu[0].head.home[lan]}</a>
    <a href="#"class="myLink" id="special_menu">${menu[0].head.specialmenu[lan]}</a>
    <a href="#"class="myLink" id="menu">${menu[0].head.menu[lan]}</a>
 `;
 login.textContent=menu[0].button.login[lan];
  document.getElementById("home").addEventListener("click", () => {
    loadpag("menu1.html")
    });
     document.getElementById("special_menu").addEventListener("click", () => {
    loadpag("specialmenu.html")
});
      document.getElementById("menu").addEventListener("click", () => {
    loadpag("menu.html")
});
    })
     }
    
    // DISPLAY ALL MENU
    let languge="en";
    let Filtered=null;
let menuData = [];
   fetch("json/menu.json")
    .then(response => response.json())
    .then(menu => {
        menuData=menu;
        displayMenu(menuData);
    })
    .catch(error => console.error(error));  
function displayMenu(items) {
    const container = document.querySelector(".cards");
    const cancel=document.getElementById("Cancel");
    const displaycard_img=document.getElementById("displaycard_img");
    const displaycard_h2=document.getElementById("displaycard_h2");
    const detail=document.getElementById("detail");
    const displaycard_kcal=document.getElementById("displaycard_kcal");
    const displaycard_pro=document.getElementById("displaycard_pro");
    const displaycard_car=document.getElementById("displaycard_car");
    const displaycard_fat=document.getElementById("displaycard_fat");
    const displaycard_price=document.getElementById("displaycard_price");
    container.innerHTML = ""; // Clear old cards
    cancel.addEventListener("click",()=>{
        detailcard.style.display="none";
    })
    items.forEach(item => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <img src="${item.image}" alt="${item.name[languge]}">
            <h2>${item.name[languge]}</h2>
            <p>${item.title[languge]}</p>
            <span class="price">$${item.price}</span>
        `;
        card.addEventListener("click", () => {
    displaycard_img.src = item.image;
    displaycard_h2.textContent = item.name[languge];

    // clear old ingredients
    detail.innerHTML = "";

    if (item.ingredients && item.ingredients.length > 0) {
        item.ingredients.forEach(ingredient => {
            const li = document.createElement("li");
            li.textContent =ingredient.icon +" "+ingredient.name[languge];
            detail.appendChild(li);
            
        });
    } else {
        const li = document.createElement("li");
        li.textContent = "No ingredients available";
        detail.appendChild(li);
    }
    displaycard_kcal.textContent=item.nutrition[0].icon+" "+item.nutrition[0].name[languge]+":-"+item.nutrition[0].value;
    displaycard_pro.textContent=item.nutrition[1].icon+" "+item.nutrition[1].name[languge]+":-"+item.nutrition[1].value;
    displaycard_car.textContent=item.nutrition[2].icon+" "+item.nutrition[2].name[languge]+":-"+item.nutrition[2].value;
    displaycard_fat.textContent=item.nutrition[3].icon+" "+item.nutrition[3].name[languge]+":-"+item.nutrition[3].value;
    displaycard_price.textContent=item.price;
    detailcard.style.display = "block";
});
        container.appendChild(card);
    });
}function changeLanguage(lang) {
    document.querySelectorAll(".lang-text").forEach(text => {
        text.textContent= text.dataset[lang];
    });
}

    const buttons=document.querySelectorAll(".menucatagory button");
    buttons.forEach(
        button=>{
            button.addEventListener("click",()=>{
                const category = button.dataset.category;
                buttons.forEach(btn => btn.classList.remove("active"));
                button.classList.add("active");
                if(category === "ALL"){
                     Filtered = null;
                    displayMenu(menuData);
                }else{
                    const filtered = menuData.filter(item => item.category.en === category);
                    Filtered=filtered;
                    displayMenu(filtered)
                }
            })
        }
    )
    const lachooser=document.getElementById("lachooser");
    const languges=document.getElementById("languges");
    lachooser.addEventListener("click",(event)=>{
        event.stopPropagation();
        languges.style.display="flex";
    });
    languges.addEventListener("click", (event) => {
        
    event.stopPropagation(); 
});


document.addEventListener("click", () => {
    
    languges.style.display = "none";
});
    const Amharic=document.getElementById("Amharic");
    const English=document.getElementById("English");
    const Oromic=document.getElementById("Oromic");
    const Tigrinya=document.getElementById("Tigrinya");
   
    Amharic.addEventListener("click",()=>{
        languge="am";
        changeLanguage("am");
        headmenu("am");
        if(Filtered===null){
            displayMenu(menuData);
        }else{
            displayMenu(Filtered);
        }
        languges.style.display="none";
    });
     English.addEventListener("click",()=>{
        languge="en";
        changeLanguage("en");
        headmenu("en");
        if(Filtered===null){
            displayMenu(menuData);
        }else{
            displayMenu(Filtered);
        }
        languges.style.display="none";
    });
     Oromic.addEventListener("click",()=>{
        languge="om";
        changeLanguage("om");
        headmenu("om");
        if(Filtered===null){
            displayMenu(menuData);
        }else{
            displayMenu(Filtered);
        }
        languges.style.display="none";
    });
     Tigrinya.addEventListener("click",()=>{
        languge="ti";
        changeLanguage("ti");
        headmenu("ti");
        if(Filtered===null){
            displayMenu(menuData);
        }else{
            displayMenu(Filtered);
        }
        languges.style.display="none";
    });
    //------------- search ------------------------
const search = document.getElementById("search");
search.addEventListener("input", () => {
    const text = search.value.toLowerCase();
    const source = Filtered === null ? menuData : Filtered;
    const results = source.filter(item =>
        item.name[languge].toLowerCase().includes(text) ||
        item.title[languge].toLowerCase().includes(text)
    );

    displayMenu(results);
});
headmenu("en");