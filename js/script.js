const body = document.querySelector('body');
const navBar = body.querySelector('.navbar');
const darkBg = body.querySelector('.dark-bg');

// console.log('Hsh');

let navItems = body.querySelector('.nav-items'),
	navBtn = body.querySelector('.nav-btn');

navBtn.addEventListener('click', () => {
	navBtn.classList.toggle('active');
	darkBg.classList.toggle('invisible');
	navItems.classList.toggle('active');
	if (navItems.classList.contains('active')) {
		body.style.overflow = 'hidden';
	}
	else {
		body.style.overflow = 'visible';
	}
});

let lastScroll = window.pageYOffset;

darkBg.addEventListener('click', () => {
	navItems.classList.remove('active')
	darkBg.classList.add('invisible')
	navBtn.classList.remove('active');
	body.style.overflow = 'visible';
})




const themeBtn = body.querySelector('.theme-btn')
const themePallete = body.querySelector('.theme-palette')
const root = document.querySelector(':root');

themeBtn.addEventListener('click', () => {
	themeBtn.parentElement.classList.toggle('active')
})
themePallete.addEventListener('click', (e) => {
	const theme = e.target.getAttribute('data-color');

	root.style.setProperty('--theme-color', theme)
	// root.style.setProperty('--bg-theme-light',theme)
})

window.addEventListener('click', (e) => {
	const clicked = themeBtn.parentElement.contains(e.target);
	// console.log(clicked)
	if (!clicked) {
		themeBtn.parentElement.classList.remove('active')
	}
})
const darkMode = body.querySelector('.dark-mode i');
darkMode.addEventListener('click', () => {
	body.classList.toggle('darkmode')
	if (body.classList.contains('darkmode')) {
		darkMode.classList.replace('fa-moon', 'fa-sun')
	} else {
		darkMode.classList.replace('fa-sun', 'fa-moon')
	}
})

const bellIcon = body.querySelector('.bell-icon');
const notification = body.querySelector('.notification')
bellIcon.addEventListener('click',()=>{
	notification.classList.toggle('invisible')
	bellIcon.querySelector('i').classList.replace('fa-bell-slash','fa-bell')
	if (
	!notification.classList.contains('invisible')
		) {
		setTimeout(()=>{
	notification.classList.add('invisible')
},4000)
	}
	
})

window.addEventListener('scroll', function(){
	if (this.scrollY > this.innerHeight) {
	bellIcon.classList.remove('invisible')
	}else{
	bellIcon.classList.add('invisible')
	}
// console.log(this.scrollY)

	let currentScroll = window.pageYOffset;
	if (window.pageYOffset == 0) {
		navBar.classList.remove('active')
	}
	else if (lastScroll > currentScroll) {
		navBar.classList.add('active')
	}
	else {
		navBar.classList.remove('active')
	}
	lastScroll = currentScroll;
})
