// Initialize Firebase
var config = {
    apiKey: "AIzaSyCfxWQvLTvZJna1o-7EOcFkymNUmmDd0AM",
    authDomain: "rndm-pays.firebaseapp.com",
    databaseURL: "https://rndm-pays.firebaseio.com",
    projectId: "rndm-pays",
    storageBucket: "",
    messagingSenderId: "868857430754"
};
firebase.initializeApp(config);

//Создаем таблицу в firebase
var projectsRef = firebase.database().ref('projects');
console.log(projectsRef)

var app = new Vue({
    el: '#app',
    data: {
        greeting: 'Welcome to your Vue.js app!',
        addNew: false,
        projects: {}
    },
    firebase: {
        projects: projectsRef
    },
    methods: {
        add: function (id) {
            projectsRef.push({
                'completed': false,
                'date_start': '',
                'date_end': '',
                'site': 'Test',
                'is_work': false,
                'is_done': false,
                'is_pay': false,
                'price': 0,
                'is_edit': true,
            });

        },
        save: function (id) {
            projectsRef.push({
                'completed': projects[id].completed,
                'date_start': projects[id].date_start,
                'date_end': projects[id].date_end,
                'site': projects[id].site,
                'is_work': projects[id].is_work,
                'is_done': projects[id].is_done,
                'is_pay': projects[id].is_pay,
                'price': projects[id].price,
                'is_edit': projects[id].is_edit,
            });
            projects[id].is_edit = false;

        },
        edit: function (id) {
            projects[id].is_edit = true;
        },
        switchWork: function (id) {
            if (event.target.classList.contains('is-ok')) {
                projects[id].is_work = false;
            } else {
                projects[id].is_work = true;
            }
            save();
        },
        switchDone: function (id) {
            if (event.target.classList.contains('is-ok')) {
                projects[id].is_done = false;
            } else {
                projects[id].is_done = true;
            }
            save();
        },
        switchPay: function (id) {
            if (event.target.classList.contains('is-ok')) {
                projects[id].is_pay = false;
            } else {
                projects[id].is_pay = true;
            }
            save();
        },
        showForm : function () {
            this.addNew = true;
        },

    }
});