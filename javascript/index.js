const components = {
    navbar: NavBar,
    content: Content,
};

const pages = {
    game: Game,
    records: Records,
    rules: Rules,
};

//module
const mySPA = (function() {
    //View
    function ModuleView() {
        let myModuleContainer = null;
        let menu = null;
        let contentContainer = null;
        let pagesObj = null;
    
        this.init = function(container, pages) {
            myModuleContainer = container;
            pagesObj = pages;
            menu = myModuleContainer.querySelector("#menu");
            contentContainer = myModuleContainer.querySelector("#content"); // контейнер контента
        }
    
        this.renderContent = function(hashPageName) {
            let pagesName = null;
            if (hashPageName.length > 0) pagesName = hashPageName;
    
            contentContainer.innerHTML = pagesObj[pagesName].render(); // у каждого св-ва из pages вызывем метод render и вставляем верстку в contentContainer
            if(pagesName=="game"){
                startGame();
            };

            this.updateButtons(pagesObj[pagesName].id);
        }
    
        this.updateButtons = function(currentPage) {
            const menuLinks = menu.querySelectorAll(".menu__link");
    
            for (let link of menuLinks) {
                currentPage === link.getAttribute("href").slice(1) ? link.classList.add("active") : link.classList.remove("active");
            }
        }
    };
    //model
    function ModuleModel () { // связываем Controller и View, чтобы не обращаться напрямую
        let myModuleView = null;
  
        this.init = function(view) { // передаем View
            myModuleView = view;
        }
  
        this.updateState = function(pageName) { // во View вызываем renderContent с названием хэша страницы
            myModuleView.renderContent(pageName);
        }
    }
     //controller
    function ModuleController () {
        let myModuleContainer = null;
        let myModuleModel = null;

        this.init = function(container, model) { // передаем основной контейнер и Model
        myModuleContainer = container;
        myModuleModel = model;

        // вешаем слушателей на событие hashchange и кликам по пунктам меню
        window.addEventListener("hashchange", this.updateState);
        
        window.addEventListener("load", (e) => {
            location.hash.slice(1).toLowerCase() ? this.updateState() : location.hash = "#rules";
        });
        }

        this.updateState = function() {
            const hashPageName = location.hash.slice(1).toLowerCase();
            if (hashPageName){
            myModuleModel.updateState(hashPageName); // в Model вызываем updateState с названием хэша страницы
            }
        }
    };

    return{ // object
        init: function({container, pages, components}) {
            this.renderComponents(container, components);
    
            const view = new ModuleView();
            const model = new ModuleModel();
            const controller = new ModuleController();

            //связываем части модуля

            view.init(document.getElementById(container), pages);
            model.init(view);
            controller.init(document.getElementById(container), model);
        },
    
        renderComponents: function (container, components) {
            const root = document.getElementById(container);
            const componentsList = Object.keys(components); //ищем все ключи в объекте components
            for (let item of componentsList) { 
              root.innerHTML += components[item].render(); // у каждого св-ва из components вызывем метод render и вставляем верстку в root
            }
        },
    };
}());

document.addEventListener("DOMContentLoaded", mySPA.init({
    container: "main", // id основного контейнера 
    pages: pages,
    components: components
}));