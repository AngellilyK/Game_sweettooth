firebase.initializeApp({
    apiKey: "AIzaSyBSwWAjMi-3g_VIYiiuqdjvZobP1lGh6go",
    authDomain: "game-project-81a89.firebaseapp.com",
    databaseURL: "https://game-project-81a89-default-rtdb.firebaseio.com",
    projectId: "game-project-81a89",
    storageBucket: "game-project-81a89.appspot.com",
    messagingSenderId: "283836054962",
    appId: "1:283836054962:web:ce38a5500559e41aadb8ab"
});

const myAppDB = firebase.database();

const myApp = (function () {
    function AppView() {

        let appContainer = null;

        this.init = function(app) {
          appContainer = app;
        }

        this.printUser = function(userList) {
            let userListContainer = document.getElementById('users-list__container');

            if (!userListContainer) {
                document.getElementById('users').innerHTML += `
                    <table id="users-list">
                        <tbody id="users-list__container"></tbody>
                    </table>
                `;
                userListContainer = document.getElementById('users-list__container');
            } else {
                userListContainer.innerHTML = '';
            }

            for (let user in userList) {
                userListContainer.appendChild(createRow(user, userList));
            }

            function createRow(user, userList) {
                let row = document.createElement('tr'),
                    td1 = document.createElement('td'),
                    td2 = document.createElement('td');
                td1.innerHTML = `${userList[user].username}`;
                td2.innerHTML = `${userList[user].score}`;
                row.appendChild(td1);
                row.appendChild(td2);

                return row;
            }
        }

        this.clearUserList = function() {
            const container = document.getElementById('users-list__container');
            if (container) container.innerHTML = '';
            }
        }

    function AppModel() {
        let myAppView = null;

        this.init = function (view) {
            myAppView = view;
        }

        this.addUser = function(username, userscore) {
            myAppDB.ref('users/' + `user_${username.replace(/\s/g, "").toLowerCase()}`).set({
                username: `${username}`,
                score: `${userscore}`
            })
            .then(function() {
                console.log("Пользователь добавлен в коллецию users");
            })
            .catch(function(error) {
                console.error("Ошибка добавления пользователя: ", error);
            });

            this.updateUsersList();
        }

        this.printUsersList = function() {
            myAppDB.ref("users/").on("value", function(snapshot) {
                myAppView.printUser(snapshot.val());

            }, function (error) {
                console.log("Error: " + error.code);
            });
        }

        this.updateUsersList = function() {
            myAppView.clearUserList();
            this.printUsersList();
        }
    }

    function AppController() {
        let myAppModel = null,
            appContainer = null,
            form = null,
            addBtn = null;

        this.init = function(app, model) {
            myAppModel = model;
            appContainer = app;

            appContainer.addEventListener('click', function(event) {
                form = appContainer.querySelector('#addNewUser');
                addBtn = appContainer.querySelector('#addBtn');

                if (event.target && event.target.id === 'addBtn') {
                    event.preventDefault();
                    event.stopPropagation();
                    myAppModel.addUser(
                        form.username.value,
                        score
                    );
                    form.username.value = '';
                    score = '';
                }

            });
        }

    };

    return {
        init: function() {
            let myAppView = new AppView(),
                myAppModel = new AppModel(),
                myAppController = new AppController();

            myAppView.init(document.getElementById('content'));
            myAppModel.init(myAppView);
            myAppController.init(document.getElementById('content'), myAppModel);
        }
    }
})();

myApp.init();