if(!localStorage.getItem('items')){
    var items = {
        "chickenTikka": ["Chicken Tikka", 160],
        "chickenFaham": ["Chicken Faham", 220],
        "softDrink": ["Soft Drink", 20],
        "waterBottle": ["Water Bottle", 20],
        "chickenBiryani": ["Chicken Biryani", 120],
        "rumaliRoti": ["Rumali Roti", 15],
        "muttonBiryani": ["Mutton Biryani", 150]
    };
    localStorage.setItem('items', JSON.stringify(items));
}

if(!sessionStorage.getItem('table1')){
    sessionStorage.setItem('table1', JSON.stringify({}));
    sessionStorage.setItem('table2', JSON.stringify({}));
    sessionStorage.setItem('table3', JSON.stringify({}));
    sessionStorage.setItem('table4', JSON.stringify({}));
}

if(!document.querySelector(".menu-content > div")){
    let script = document.createElement("script");
    script.setAttribute("src", "menu.js");
    document.querySelector("body").appendChild(script);
}

function searchTable(){
    var tables = document.querySelectorAll(".tables");
    var searchInput = document.querySelector(".drawer > input").value.toUpperCase();
    for(let table of tables){
        if(table.querySelector("h2").textContent.toUpperCase().indexOf(searchInput) > -1){
            table.style.display = "";
        }else{
            table.style.display = "none";
        }
    }
}

function searchMenu(){
    if(document.querySelector(".menu-content > div")){
        var menuItems = document.querySelectorAll(".menu-content > .menu-item");
        var searchInput = document.querySelector(".menu > input").value.toUpperCase();
        for(let item of menuItems){
            if(item.querySelector("h3").textContent.toUpperCase().indexOf(searchInput) > -1){
                item.style.display = "";
            }else{
                item.style.display = "none";
            }
        }
    }
}

function drag(ev){
    ev.dataTransfer.setData("item-select", ev.target.id);
}

function drop(ev){
    ev.preventDefault();
    var data = ev.dataTransfer.getData("item-select");
    let selectedTable = ev.target;
    if(selectedTable.id == ""){
        selectedTable = selectedTable.parentElement;
    }

    // create the new item and insert
    let localData = JSON.parse(localStorage.getItem("items"));
    let price = localData[data][1];
    let name = localData[data][0];

    let totalPrice = selectedTable.querySelector(".total-price");
    let totalItems = selectedTable.querySelector(".total-items");
    let tempStore = JSON.parse(sessionStorage.getItem(selectedTable.id));
    if(tempStore == null || Object.keys(tempStore).length == 0){
        let items = {};
        items[name] = 1;
        tempStore = {
            "total": price,
            "items": items,
            "count": 1
        };
    }else{
        tempStore["total"] += price;
        if(tempStore["items"][name] == undefined){
            tempStore["count"]++;
        }
        tempStore["items"][name] = (tempStore["items"][name] == undefined)?1:tempStore["items"][name]+1;
    }
    sessionStorage.setItem(selectedTable.id, JSON.stringify(tempStore));

    totalPrice.textContent = tempStore["total"];
    totalItems.textContent = tempStore["count"];
}