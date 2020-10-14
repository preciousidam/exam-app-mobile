import moment from 'moment';

export const data = [
    {id: '1', examBody: 'JAMB', subject: 'Biology', noQuestn: 50, progress: 0.7, startDate: moment(new Date()).format('MMM Do')},
    {id: '2', examBody: 'WAEC', subject: 'Physics', noQuestn: 50, progress: 0.7, startDate: moment(new Date()).format('MMMM Do')},
    {id: '3', examBody: 'NECO', subject: 'Chemistry', noQuestn: 50, progress: 0.7, startDate: moment(new Date()).format('MMMM Do')},
];

export const practise = [
    {id: '1', examBody: 'JAMB', subject: 'Biology', noQuestn: 50, duration: '60 mins', year: '2016' },
    {id: '2', examBody: 'WAEC', subject: 'Physics', noQuestn: 50, duration: '60 mins', year: '2017'},
    {id: '3', examBody: 'NECO', subject: 'Chemistry', noQuestn: 50, duration: '60 mins', year: '2018'},
    {id: '4', examBody: 'JAMB', subject: 'English', noQuestn: 50, duration: '60 mins', year: '2005' },
    {id: '5', examBody: 'WAEC', subject: 'Mathematics', noQuestn: 50, duration: '60 mins', year: '2010'},
    {id: '6', examBody: 'NECO', subject: 'Economics', noQuestn: 50, duration: '60 mins', year: '2013'},
    {id: '7', examBody: 'JAMB', subject: 'Geography', noQuestn: 50, duration: '60 mins', year: '2012' },
    {id: '8', examBody: 'WAEC', subject: 'Literature', noQuestn: 50, duration: '60 mins', year: '2016'},
    {id: '9', examBody: 'NECO', subject: 'Agriculture', noQuestn: 50, duration: '60 mins', year: '2016'},
]

export const details = [
    {id: 1,  subHeader: 'Lightening', body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
    {id: 2,  subHeader: 'Sun Drying', body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
    {id: 3,  subHeader: 'Malnourished', body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
    {id: 4,  subHeader: 'Decomposition', body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
    {id: 5,  subHeader: 'Dead Plant', body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
]

export const highlights = [
    { time: '2w', color: "color-primary-400", section: 'Lightening', paragraphs: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.']},
    { time: '30m', color: "color-info-400", section: 'Malnourished', paragraphs: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.','Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.']},
    { time: '2w', color: "color-success-400", section: 'Decomposition', paragraphs: ['Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.']},
    { time: '2h', color: "color-danger-400", section: 'Sun Drying', paragraphs: ['Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.']},
]

export const lessons = [
    {id: '1', topic: 'Photosynthesis', subject: 'Biology', noExercise: 5, duration: '60 mins', clipart: require('../assets/png/sorted/biology/0.png'), details, highlights,},
    {id: '2', topic: 'Motion Force', subject: 'Physics', noExercise: 9, duration: '60 mins', clipart: require('../assets/png/sorted/science/0.png'), details, highlights,},
    {id: '3', topic: 'Quadratic Equation', subject: 'Mathematics', noExercise: 4, duration: '60 mins', clipart: require('../assets/png/sorted/mathematics/0.png'), details, highlights,},
    {id: '4', topic: 'Chemical Equation', subject: 'Chemistry', noExercise: 3, duration: '60 mins', clipart: require('../assets/png/sorted/science/1.png'), details, highlights,},
    {id: '5', topic: 'Tenses', subject: 'English', noExercise: 1, duration: '60 mins', clipart: require('../assets/png/sorted/language/0.png'), details, highlights,},
    {id: '6', topic: 'Photosynthesis', subject: 'Biology', noExercise: 5, duration: '60 mins', clipart: require('../assets/png/sorted/biology/0.png'), details, highlights,},
    {id: '7', topic: 'Motion Force', subject: 'Physics', noExercise: 9, duration: '60 mins', clipart: require('../assets/png/sorted/science/2.png'), details, highlights,},
    {id: '8', topic: 'Simultaneous Equation', subject: 'Mathematics', noExercise: 4, duration: '60 mins', clipart: require('../assets/png/sorted/mathematics/1.png'), details, highlights,},
    {id: '9', topic: 'Periodic Table', subject: 'Chemistry', noExercise: 3, duration: '60 mins', clipart: require('../assets/png/sorted/science/4.png'), details, highlights,},
    {id: '10', topic: 'English Reading', subject: 'English', noExercise: 1, duration: '60 mins', clipart: require('../assets/png/sorted/language/1.png'), details, highlights,},
]

export const assignments = [
    {
        title: 'Recent',
        data: lessons.slice(0,3)
    },
    {
        title: 'History',
        data: lessons
    },
]

export const notifications = [
    { id: 1, read: false, title: 'Subcription expired', time: '2w', body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
    { id: 2, read: false, title: 'New Assignment', time: '1hr', body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
    { id: 3, read: false, title: 'New Assignment', time: '44m', body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
    { id: 4, read: false, title: 'New Assignment', time: '1hr', body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
    { id: 5, read: true, title: 'Recommended Lesson', time: '2w', body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
    { id: 6, read: false, title: 'Subcription expired', time: '2w', body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
    { id: 7, read: true, title: 'Subcription expired', time: '2w', body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
    { id: 8, read: false, title: 'Recommended Lesson', time: '2w', body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
    { id: 9, read: true, title: 'Subcription expired', time: '2w', body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
    { id: 10, read: true, title: 'Recommended Lesson', time: '2w', body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
]

export const notes = [
    { id: 1, category: 0, title: 'Simulteneous Equation', time: '2w', body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
    { id: 2, category: 1, title: 'Note on readings', time: '1hr', body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
    { id: 3, category: 1, title: 'Chemical balance', time: '44m', body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
    { id: 4, category: 0, title: 'Erosion', time: '1hr', body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
    { id: 5, category: 1, title: 'Shakespare', time: '2w', body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
    { id: 6, category: 1, title: 'Arms of government', time: '2w', body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
    { id: 7, category: 1, title: 'EMF', time: '2w', body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
    { id: 8, category: 1, title: 'Electrons', time: '2w', body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
    { id: 9, category: 0, title: 'Flemmimgs Rule', time: '2w', body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
    { id: 10, category: 0, title: 'Recommended Lesson', time: '2w', body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
]

export const paragraphs = [
    {id: 1, header: 'What it is', body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Non sodales neque sodales ut etiam sit amet nisl. Placerat vestibulum lectus mauris ultrices eros.'},
    {id: 3, header: 'Section Header', body: 'Diam quam nulla porttitor massa id neque aliquam vestibulum morbi. Elementum facilisis leo vel fringilla est ullamcorper. Quis commodo odio aenean sed adipiscing diam donec adipiscing. Sit amet luctus venenatis lectus. Felis eget velit aliquet sagittis. Accumsan tortor posuere ac ut consequat semper viverra. Pharetra massa massa ultricies mi. Sed sed risus pretium quam vulputate. Consequat semper viverra nam libero justo laoreet sit. Rhoncus aenean vel elit scelerisque mauris pellentesque pulvinar pellentesque. Urna condimentum mattis pellentesque id nibh tortor id aliquet. Mattis enim ut tellus elementum sagittis vitae. Vestibulum sed arcu non odio euismod lacinia at quis. Cursus euismod quis viverra nibh. A cras semper auctor neque vitae. Pellentesque pulvinar pellentesque habitant morbi.'},
]