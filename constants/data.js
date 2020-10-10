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

export const lessons = [
    {id: '1', topic: 'Photosynthesis', subject: 'Biology', noExercise: 5, duration: '60 mins', clipart: require('../assets/png/sorted/biology/0.png') },
    {id: '2', topic: 'Motion Force', subject: 'Physics', noExercise: 9, duration: '60 mins', clipart: require('../assets/png/sorted/science/0.png') },
    {id: '3', topic: 'Quadratic Equation', subject: 'Mathematics', noExercise: 4, duration: '60 mins', clipart: require('../assets/png/sorted/mathematics/0.png') },
    {id: '4', topic: 'Chemical Equation', subject: 'Chemistry', noExercise: 3, duration: '60 mins', clipart: require('../assets/png/sorted/science/1.png') },
    {id: '5', topic: 'Tenses', subject: 'English', noExercise: 1, duration: '60 mins', clipart: require('../assets/png/sorted/language/0.png') },
    {id: '6', topic: 'Photosynthesis', subject: 'Biology', noExercise: 5, duration: '60 mins', clipart: require('../assets/png/sorted/biology/0.png') },
    {id: '7', topic: 'Motion Force', subject: 'Physics', noExercise: 9, duration: '60 mins', clipart: require('../assets/png/sorted/science/2.png') },
    {id: '8', topic: 'Simultaneous Equation', subject: 'Mathematics', noExercise: 4, duration: '60 mins', clipart: require('../assets/png/sorted/mathematics/1.png') },
    {id: '9', topic: 'Periodic Table', subject: 'Chemistry', noExercise: 3, duration: '60 mins', clipart: require('../assets/png/sorted/science/4.png') },
    {id: '10', topic: 'English Reading', subject: 'English', noExercise: 1, duration: '60 mins', clipart: require('../assets/png/sorted/language/1.png') },
]