import { done, inputTask, addBtn, taskInput,textListEmpty, ulTarget, full, clearBtn, error, spanText, taches, pCounterText, counter } 
    from './variables.js'
import { creerLi } from './creerLi.js'


//affichage de mon input text pour ecrire la task



addBtn.addEventListener('click', function() {
        taskInput.classList.toggle('active')
})


//Activation de mon button des que chars > 0 !!!  this.value.length > 0 !!!!

inputTask.addEventListener('focus', function() {
    pCounterText.classList.add('visible')

})
inputTask.addEventListener('blur', function() {
    pCounterText.classList.remove('visible')
  
})


inputTask.addEventListener('input', function() {
    if (this.value.length > 0 ) {done.disabled = false}
    else { done.disabled = true }
    if (this.value.length > 50) {
        error.style.display = "block"
        done.disabled = true }
    else {error.style.display = "none"}
    counter.textContent = this.value.length
    //mes conditions sur les nombres de caracteres :
const len = this.value.length
        if (len > 60) {inputTask.value = inputTask.value.slice(0, 60)}

        if (len > 50) {
            counter.style.color = "red"
            counter.style.fontWeight = "bold"
            counter.style.fontSize = "1.2rem"
            counter.style.textDecoration = "underline"
        }
        else if (len > 40) {
            counter.style.color = "orange"
            counter.style.fontWeight = "bold"
            counter.style.fontSize = "1rem"
            counter.style.textDecoration = "none"
        }
        else {
            counter.style.color = "black"
            counter.style.fontWeight = "normal"
            counter.style.fontSize = "1rem"
            counter.style.textDecoration = "none"
        }
})
    //Ajout des tasks : li et bouttons//


done.addEventListener('click', function() {
    if (ulTarget.children.length < 10) 
        {
        const now = new Date()
        const tache = {
            texte: inputTask.value,
            complete: false,
            date: now.toLocaleDateString('fr-FR', {day: 'numeric', month: 'long', year: 'numeric'})
        }
        taches.push(tache)
        localStorage.setItem('taches', JSON.stringify(taches))
        creerLi(tache)

        textListEmpty.style.display = "none" //masque le text h3 qui dis les listes vont arrivés la
        clearBtn.disabled = false //j'active donc False mon button clear All (#deleteAll)
        inputTask.value = "" //remet mon input vide
        done.disabled = true //remet mon bouton validation en disabled
        if (ulTarget.children.length === 10) { done.disabled = true }} 
        else {
        full.style.display = "block"
        }})


clearBtn.addEventListener('click', function(){
    if (confirm("Vous allez supprimer toutes les tâches, êtes vous sûr?")) {
        ulTarget.innerHTML = ''
        textListEmpty.style.display = "block"
        clearBtn.disabled = true
        taches.length = 0
        localStorage.setItem('taches', JSON.stringify(taches))
    }
})


window.addEventListener('load', function() {
    const donneesSauvegardees = localStorage.getItem('taches')
    console.log("données:", donneesSauvegardees)
    if (donneesSauvegardees) {
        const data = JSON.parse(donneesSauvegardees)
        console.log("data parsée:", data)
        data.forEach(t => {
            console.log("création li:", t)
            taches.push(t)
            creerLi(t)
            textListEmpty.style.display = "none"
            clearBtn.disabled = false
        })
    }
})


