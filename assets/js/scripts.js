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

var app = new Vue({
    el: '#app',
    data: {
        projects: {}
    },
    firebase: {
        projects: projectsRef
    },
    methods: {
        add: function (project) {
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
        save: function (project, autosave) {
            projectsRef.child(project['.key']).update({
                'date_start': project.date_start,
                'date_end': project.date_end,
                'site': project.site,
                'is_work': project.is_work,
                'is_done': project.is_done,
                'is_pay': project.is_pay,
                'price': project.price,
                'is_edit': project.is_edit,
            });

            if(autosave) {   projectsRef.child(project['.key']).update({is_edit: false}); }


        },
        removeProject: function (project) {
            projectsRef.child(project['.key']).remove()
        },
        edit: function (project) {
            projectsRef.child(project['.key']).update({is_edit: true})
        },
        switchStatus: function (project, field_key) {
            if (event.target.classList.contains('is-ok')) {
                project[field_key] = false;
            } else {
                project[field_key] = true;
            }
            this.save(project, false);
        }

    }
});