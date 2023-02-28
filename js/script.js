const body = document.querySelector('body');
// NAVBAR
const navBar = body.querySelector('.navbar');
const sideBar = body.querySelector('.sidebar');
const navBtn = body.querySelector('.nav-btn');
navBtn.addEventListener('click', () => {
  navBtn.classList.toggle('open-menu')
  sideBar.classList.toggle('open-menu')
  if( navBtn.classList.contains('open-menu') || sideBar.classList.contains('open-menu')){
   body.style.overflow = "hidden"
    }else{
   body.style.overflow = "visible"
    }
});
// DAY/NIGHT MODE
const themeBtn = body.querySelector('.theme-btn');
themeBtn.addEventListener('click', () => {
  body.classList.toggle('light-mode');
  if (body.classList.contains('light-mode')) {
    themeBtn.classList.replace('uil-sun', 'uil-moon')
  } else {
    themeBtn.classList.replace('uil-moon', 'uil-sun')
  }
})
// FILERABLE WORK SECTION
const categories = body.querySelectorAll('.categories .items')
categories.forEach((item) => {
  item.addEventListener('click', (e) => {
    body.querySelector('.categories .active').classList.remove('active');
    e.target.classList.add('active');
    const currctgry = e.target.getAttribute('data-category');
    const cards = body.querySelectorAll('.card');
    cards.forEach((card) => {
      const currItems = card.getAttribute('data-item')
      if (currctgry === currItems || currctgry === 'all') {
        card.classList.remove('hidden')
        card.classList.add('show')
      } else {
        card.classList.remove('show')
        card.classList.add('hidden')
      }
    })
  });
})
// CONTACT FORM VALIDATION
// NAME
const nameField = body.querySelector('.name-field'),
  nameInput = nameField.querySelector('input')

function nameCheck() {
  let nameError = nameField.querySelector('.name-error'),
    nameErrorIcon = nameField.querySelector('.error i');

  if (nameInput.value.length <= 0) {
    nameField.classList.remove('valid')
    nameErrorIcon.classList.replace('uil-check-circle', 'uil-times-circle')
    nameError.textContent = "This field can't be empty."
    return nameField.classList.add('invalid');
  }
  else if (nameInput.value.length <= 2) {
    nameError.textContent = 'Enter your full name.'
    nameField.classList.remove('valid')
    nameErrorIcon.classList.replace('uil-check-circle', 'uil-times-circle')
    return nameField.classList.add('invalid');
  }
  else {
    nameError.textContent = "Okey.";
    nameErrorIcon.classList.replace('uil-times-circle', 'uil-check-circle')
    nameField.classList.remove('invalid')
    nameField.classList.add('valid')
  }
}
// EMAIL
const emailField = body.querySelector('.email-field'),
  emailInput = emailField.querySelector('input');
function emailCheck() {
  const emaiPattern = /^[^ ]+@[^ ]+\.[com]{3}$/;
  let emailError = emailField.querySelector('.email-error'),
    emailErrorIcon = emailField.querySelector('.error i');
  if (emailInput.value.length <= 0) {
    emailField.classList.remove('valid')
    emailErrorIcon.classList.replace('uil-check-circle', 'uil-times-circle')
    emailError.textContent = "This field can't be empty."
    return emailField.classList.add('invalid');
  }
  else if (!emailInput.value.match(emaiPattern)) {
    emailField.classList.remove('valid')
    emailError.textContent = 'Enter a valid email.'
    emailErrorIcon.classList.replace('uil-check-circle', 'uil-times-circle')
    return emailField.classList.add('invalid');
  }
  else {
    emailError.textContent = "Valid.";
    emailErrorIcon.classList.replace('uil-times-circle', 'uil-check-circle')
    emailField.classList.remove('invalid')
    emailField.classList.add('valid')
  }
}

// MESSAGE
const msgField = body.querySelector('.msg-field'),
  msgInput = msgField.querySelector('input');
function msgCheck() {
  let msgError = msgField.querySelector('.msg-error'),
    msgErrorIcon = msgField.querySelector('.error i');
  if (msgInput.value.length <= 0) {
    msgField.classList.remove('valid')
    msgErrorIcon.classList.replace('uil-check-circle', 'uil-times-circle')
    msgError.textContent = "This field can't be empty."
    return msgField.classList.add('invalid');
  }
  else if (msgInput.value.length < 5) {
    msgField.classList.remove('valid')
    msgErrorIcon.classList.replace('uil-check-circle', 'uil-times-circle')
    msgError.textContent = "Messages must be a minimum of 5 characters or longer."
    return msgField.classList.add('invalid');
  }
  else {
    msgField.classList.remove('invalid')
    msgErrorIcon.classList.replace('uil-times-circle', 'uil-check-circle')
    msgError.textContent = "Okey.";
    msgField.classList.add('valid')
  }
}

// FORM
const form = body.querySelector('form')
const sentMsg = body.querySelector('.msg-sent')
form.addEventListener('submit', function(e) {
  e.preventDefault()
  nameCheck();
  emailCheck();
  msgCheck();
  nameInput.addEventListener('keyup', nameCheck)
  emailInput.addEventListener('keyup', emailCheck)
  msgInput.addEventListener('keyup', msgCheck)
  // SEND EMAIL
  if (!nameField.classList.contains('valid') && !emailField.classList.contains('valid') && !msgField.classList.contains('valid')) {
    sentMsg.classList.remove('show');
  } else {
    var params = {
      name: nameInput.value,
      email: emailInput.value,
      message: msgInput.value,
    }
    emailjs.send("service_3pp4vx6", "template_0pto5ur", params).then(function() {
      sentMsg.classList.add('show')
    })
  }
})

// CLOSE MESSAGE BOX
const closeIcon = body.querySelectorAll('.close-icon')
closeIcon.forEach(icon=>{
icon.addEventListener('click', (e) => {
  e.target.parentElement.parentElement.remove()
})
})

// AUTO CLOSE NAVBAR
window.addEventListener('click', (e) => {
  const clicked = sideBar.contains(e.target) || navBtn.contains(e.target) || sentMsg.contains(e.target)
  if (!clicked) {
    sideBar.classList.remove('open-menu');
    navBtn.classList.remove('open-menu');
    sentMsg.classList.remove('show');
    body.style.overflow = "visible"
  }
});
// SCROLLSPY
const navLinks = body.querySelectorAll('.sidebar ul a')
const sections = body.querySelectorAll('section')
window.addEventListener("scroll", () => {
  sections.forEach(section => {
    let scroll = window.scrollY;
    let offsetTop = section.offsetTop;
    let secHeight = section.offsetHeight;
    let secId = section.getAttribute('id');
    if (scroll >= offsetTop && scroll < offsetTop + secHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        document.querySelector('.sidebar ul a[href*='+secId+']').classList.add('active')
      })
    }
  })
})