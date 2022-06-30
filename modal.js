let modal = document.querySelector(".modal");
let span = document.querySelector(".close");
refreshMain();

span.onclick = function(){
    modal.style.display="none";
    refreshMain();
}

window.onclick = function(event){
    if(event.target == modal){
        modal.style.display="none";
        refreshMain();
    }
}

function refreshMain(){
    let tableClassNames = ["table1", "table2", "table3", "table4"];
    for(let tableClassName of tableClassNames){
        let tempStore = JSON.parse(sessionStorage.getItem(tableClassName));
        if(tempStore != null && tempStore.length != 0){
            let element = document.querySelector("."+tableClassName);
            element.querySelector(".total-price").textContent = tempStore["total"];
            element.querySelector(".total-items").textContent = tempStore["count"];
        }
    }
}

if(sessionStorage.getItem("table1")){
    let tableClassNames = ["table1", "table2", "table3", "table4"];
    for(let tableClassName of tableClassNames){
        let element = document.querySelector("."+tableClassName);
        element.onclick = function(){
            modal.style.display="block";
            let tempStore = JSON.parse(sessionStorage.getItem(tableClassName));
            fillTable(tempStore, tableClassName);
            
            // change the textContent at Total
            let totalBill = document.querySelector(".table-total");
            totalBill.textContent = (tempStore["total"]==undefined)?0:tempStore["total"];

            let checkOutBtn = document.querySelector(".check-out");
            checkOutBtn.onclick = function(){
                let total = JSON.parse(sessionStorage.getItem(tableClassName))["total"];
                total = (total==undefined)?0:total;
                alert("Your Bill is "+total);
                sessionStorage.setItem(tableClassName, JSON.stringify({}));
                document.querySelector(".close").click();
            }
        }
    }
}

function fillTable(tempStore, tableClassName){
    let tableBody = document.querySelector(".table-body");
    let innerTableBody = "";
    if(tempStore != null && Object.keys(tempStore).length != 0){
        for(let item of Object.keys(tempStore["items"])){
            innerTableBody += `<tr>
                                <td>${item}</td>
                                <td>${tempStore["items"][item]}</td>
                                <td><button class="minus" onclick="removeItem('${item}', '${tableClassName}');">-</button><button class="plus" onclick="addItem('${item}', '${tableClassName}');">+</button></td>
                                </tr>`;
        }
    }
    tableBody.innerHTML = innerTableBody;
}

function addItem(...args){
    let tableContent = JSON.parse(sessionStorage.getItem(args[1]));
    tableContent["items"][args[0]]+=1;
    let listData = args[0].split(" ");
    listData[0] = listData[0].toLowerCase();
    // console.log(listData);
    let price = JSON.parse(localStorage.getItem("items"))[listData.join("")][1];
    tableContent["total"]+=price;

    sessionStorage.setItem(args[1], JSON.stringify(tableContent));
    fillTable(tableContent, args[1]);
    
    // change the textContent at Total
    let totalBill = document.querySelector(".table-total");
    totalBill.textContent = tableContent["total"];
}

function removeItem(...args){
    let tableContent = JSON.parse(sessionStorage.getItem(args[1]));
    tableContent["items"][args[0]]-=1;
    let listData = args[0].split(" ");
    listData[0] = listData[0].toLowerCase();
    let price = JSON.parse(localStorage.getItem("items"))[listData.join("")][1];
    tableContent["total"]-=price;
    if(tableContent["items"][args[0]] == 0){
        delete tableContent["items"][args[0]];
        tableContent["count"]--;
    }

    sessionStorage.setItem(args[1], JSON.stringify(tableContent));
    fillTable(tableContent, args[1]);

    // change the textContent at Total
    let totalBill = document.querySelector(".table-total");
    totalBill.textContent = tableContent["total"];
}