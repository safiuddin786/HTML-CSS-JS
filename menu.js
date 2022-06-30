if(!document.querySelector(".menu-content > div")){
    let menuContent = document.querySelector(".menu-content");
    let items = JSON.parse(localStorage.getItem('items'));
    for(let item in items){
        let element = document.createElement("div");
        element.setAttribute("class", "menu-item "+item);
        element.setAttribute("draggable", "true");
        element.setAttribute("ondragstart", "drag(event);");
        element.setAttribute("id", ""+item);
        let insideContent = `<h3>${items[item][0]}</h3>
                            <span>Price: ${items[item][1]}</span>`;
        element.innerHTML = insideContent;
        menuContent.appendChild(element);
    }
}