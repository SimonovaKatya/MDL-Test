const form = document.getElementById("data")
const formFields = form.elements
const themeName = "theme"
const themes = {
    primary: localStorage.getItem(themeName) === 'primary' || true,
    secondary: localStorage.getItem(themeName) === 'secondary'
}
const submitBtn = form.querySelector('[type="submit"]')
submitBtn.addEventListener('click', submitHandler)

function submitHandler(ev) {
    const [theme] = Object.entries(themes).find(([theme, isSet]) => isSet == true)
    console.log('theme', theme)
    themeSwitcher({ theme, set: true, save: true })
    // localStorage.clear()
    ev.preventDefault()
}

// Функция смены темы
function themeSwitcher({ theme = 'primary', set = true, save = false }) {
    const bodyClasses = document.body.classList
    for (const themeProp in themes) {
        if (set) bodyClasses.remove(themeProp)
        themes[themeProp] = themeProp === theme
        if (themes[themeProp]) {
          if (set) bodyClasses.add(theme)
          if (save) localStorage.setItem(themeName, theme)
        }
    }
}

function changeHandler() {
    localStorage.setItem(this.name, this.value)
}


function checkStorage() {
    let theme = null
    for (let i = 0; i < formFields.length; i++) {
        if (formFields[i].tagName !== 'button') {
            if (formFields[i].type === 'radio') {
                const radioValue = localStorage.getItem(formFields[i].name)
                const checked = (radioValue === formFields[i].value || themes[formFields[i].value])
                formFields[i].checked = checked
                if (checked) theme = formFields[i].value
                attachEvent(formFields[i], () => themeSwitcher({ theme: formFields[i].value, set: false }))
            }
            else if(formFields[i].classList.contains('field__select')) { 
                const optionIndex = [...formFields[i].options].findIndex(({value}) => value === localStorage.getItem(formFields[i].name))
                const selectedIndex = optionIndex > -1 ? optionIndex : 0;
                formFields[i].selectedIndex = selectedIndex;
                attachEvent(formFields[i], changeHandler)
            }
            else {
                formFields[i].value = localStorage.getItem(formFields[i].name)
                attachEvent(formFields[i], changeHandler)
            }
        }
    }
  
    if (theme) themeSwitcher({ theme })
}


function attachEvent(element, fn) {
    element.addEventListener('input', fn)
}

checkStorage()
