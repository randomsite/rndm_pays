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

// Create a table in Firebase
var projectsRef = firebase.database().ref('projects');

// Initialize app
var app = new Vue({
    el: '#app',
    data: {
        projects: {}
    },
    firebase: {
        projects: projectsRef
    },
    methods: {
        addProject: function (project) {
            projectsRef.push({
                'completed': false,
                'date_start': '',
                'date_end': '',
                'site': 'Test',
                'is_work': false,
                'is_done': false,
                'is_pay': false,
                'price': 0,
                'is_edit': true
            });
        },
        saveProject: function (project, autosave) {
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

            if(project.is_work && project.is_done && project.is_pay) {
                projectsRef.child(project['.key']).update({completed: true});
            } else {
                projectsRef.child(project['.key']).update({completed: false});
            }
        },
        editProject: function (project) {
            projectsRef.child(project['.key']).update({is_edit: true});
        },
        removeProject: function (project) {
            projectsRef.child(project['.key']).remove()
        },
        switchStatus: function (project, field_key) {
            if (event.target.classList.contains('fas')) {
                project[field_key] = false;
            } else {
                project[field_key] = true;
            }
            this.saveProject(project, false);
        }

    }
});