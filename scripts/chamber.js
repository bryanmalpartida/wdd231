//HAMBURGUER BAR ON NAV BAR

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".navigation");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});





//LAST MODIFIED FOOTER

// giving variable to last modified
const lastModifiedDate = document.lastModified;

// using another variable so we can call lastmodified by id
const lastModifiedParagraph = document.getElementById('lastModified');

// desired text+outcome
lastModifiedParagraph.textContent = `Last Modification: ${lastModifiedDate}`;

//YEAR  ON FOOTER

//giving variable to year
const year = document.querySelector("#year");
//variable for current year 
const today = new Date();
//print
year.innerHTML = `<span class="highlight">${today.getFullYear()}</span>`;



// COURSES

const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: ['HTML', 'CSS'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: ['Python'],
        completed: false
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: ['C#'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: false
    }
];

//CALLING

document.addEventListener('DOMContentLoaded', () => {
    const coursesContainer = document.getElementById('courses-container');
    const totalCredits = document.getElementById('total-credits');
    const filterButtons = document.getElementById('filter-buttons');
    const courseDescription = document.getElementById('course-description');
    const courseTechnology = document.getElementById('course-technology');
//FILTERS
    function displayCourses(filter = 'all') {
        coursesContainer.innerHTML = '';
        let filteredCourses = courses;

        if (filter === 'wdd') {
            filteredCourses = courses.filter(course => course.subject === 'WDD');
        } else if (filter === 'cse') {
            filteredCourses = courses.filter(course => course.subject === 'CSE');
        }

        filteredCourses.forEach(course => {
            const courseCard = document.createElement('div');
            courseCard.classList.add('course-card');
            if (course.completed) {
                courseCard.classList.add('completed');
            }

            courseCard.innerHTML = `
                <h3>${course.subject} ${course.number}: ${course.title}</h3>
                <p>Credits: ${course.credits}</p>
            `;

    //DISPLAY
            courseCard.addEventListener('click', () => {
                courseDescription.textContent = course.description;
                courseTechnology.innerHTML = course.technology.map(tech => `<li>${tech}</li>`).join('');
            });

            coursesContainer.appendChild(courseCard);
        });

        const total = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
        totalCredits.textContent = total;
    }
    //BUTTON
    filterButtons.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON') {
            displayCourses(event.target.id);
        }
    });

    displayCourses();
});

//