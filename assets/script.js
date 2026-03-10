//affichage de mon input text pour ecrire la task
const done = document.getElementById('fait')
const inputTask = document.getElementById('task')
const addBtn = document.getElementById('addTask') //mon bouton ajouter tache
const taskInput = document.querySelector('.conteneur-tasktext') //ma div
const textListEmpty = document.getElementById('textLiEmpty')
const ulTarget = document.querySelector('ul')
const full = document.getElementById('full')
const clearBtn = document.getElementById('deleteAll')
const error = document.getElementById('error')
const spanText = document.createElement('span')
let taches = []
const pCounterText= document.getElementById('counterText')
const counter = document.getElementById('counter')


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
        const divLiMain = document.createElement('div')
        divLiMain.classList.add('li-main')
        const pAddText = document.createElement('p')
        const now = new Date()
        pAddText.textContent = "Ajouté le " + now.toLocaleDateString('fr-FR', {day: 'numeric', month: 'long', year: 'numeric'})
        const divList = document.createElement('div')//on crea div (Non implantée)
        const list = document.createElement('li') //const crea li Non implantée
        const spanText = document.createElement('span') // idem span non Implanté
        spanText.textContent = inputTask.value //mon span = contenu de l'input
        taches.push({
            texte : inputTask.value, 
            complete : false,
            date: now.toLocaleDateString('fr-FR', {day: 'numeric', month: 'long', year: 'numeric'})
        }) //copie de l'input dans variable taches

        localStorage.setItem('taches', JSON.stringify(taches)) //save de ma let taches en local (sur le pc)
        const completeBtn = document.createElement ('button') //const crea btn 
        const deleteBtn = document.createElement ('button') // const crea btn 2
        completeBtn.textContent = "✅" //on ajoute le text dans le btn1
        deleteBtn.textContent = "❌"  //idem bt2
        divList.appendChild(completeBtn)
        divList.appendChild(deleteBtn)
        divLiMain.appendChild(spanText) //edit
        divLiMain.appendChild(divList)  //edit
        list.appendChild(divLiMain)
        list.appendChild(pAddText)
        ulTarget.appendChild(list) // et on place le li en dernier !!!
            //supprimer une li avec le buton X

    deleteBtn.addEventListener('click', function(){
        const index = Array.from(ulTarget.children).indexOf(list) //+const = n° index de ma li 0,1,2
            list.remove()
            full.style.display = "none"
            taches.splice(index, 1) //suprime ma valeur dans ma let taches
            localStorage.setItem('taches', JSON.stringify(taches)) //save en local
        })
            //toggle la class Css des element completés task->task finie (couleur+barré)
    completeBtn.addEventListener('click', function(){
        const index = Array.from(ulTarget.children).indexOf(list) //dans une fonction // ✅
                list.classList.toggle('complete')
                taches[index].complete = !taches[index].complete
                localStorage.setItem('taches', JSON.stringify(taches))
            })
        clearBtn.disabled = false //j'active donc False mon button clear All (#deleteAll)
        inputTask.value = "" //remet mon input vide
        done.disabled = true //remet mon bouton validation en disabled
        textListEmpty.style.display = "none" //masque le text h3 qui dis les listes vont arrivés la
        }

    else {
        
        full.style.display = "block"
    }
})

clearBtn.addEventListener('click', function(){
    if (confirm("Vous allez supprimer toutes les tâches, êtes vous sûr?")) {
        ulTarget.innerHTML = ''
        textListEmpty.style.display = "block"
        clearBtn.disabled = true
        taches = []
        localStorage.setItem('taches', JSON.stringify(taches))
    }
})



window.addEventListener('load', function() // chargement du nav
{
    const donneesSauvegardees = localStorage.getItem('taches') //const qui recupere le local host
    if (donneesSauvegardees) //condition d'execution sinon cont .. = null => erreur dans taches
        {
    taches = JSON.parse(donneesSauvegardees) //conversions des donnees en tableau js

    taches.forEach(function(tache) //pour chaque taches -> tache :
        {
        const divLiMain = document.createElement('div')
        divLiMain.classList.add('li-main')
        const pAddText = document.createElement('p')
        const now = new Date()
        pAddText.textContent = "Ajouté le " + tache.date
        const divList = document.createElement('div')
        const list = document.createElement('li')
        const spanText = document.createElement('span')
        spanText.textContent = tache.texte  // ON RECUPERE NOTRE text et le met dans le span
        const completeBtn = document.createElement ('button') //const crea btn 
        const deleteBtn = document.createElement ('button') // const crea btn 2
        completeBtn.textContent = "✅"
        deleteBtn.textContent = "❌"
        divList.appendChild(completeBtn)
        divList.appendChild(deleteBtn)
        divLiMain.appendChild(spanText) //edit
        divLiMain.appendChild(divList)  //edit
        list.appendChild(divLiMain)
        list.appendChild(pAddText)
        ulTarget.appendChild(list)

    if (tache.complete === true)  // = if (tache.complete)  Si la tache etais validée :
        {list.classList.toggle('complete')} // on reaffiche notre tache en complete (css)

    deleteBtn.addEventListener('click', function(){ //on reprend les fontions des btn qui etaient uniq dans done
            const index = Array.from(ulTarget.children).indexOf(list) //on reprend notre const index pour connaitre notre n°tache
            list.remove() // on la suppr
            full.style.display = "none" //on cache l'erreur taskfull
            taches.splice(index, 1) // on supprime la valeur dans le tableau !!!!!!!!!!
            localStorage.setItem('taches', JSON.stringify(taches)) //save local
        })
    completeBtn.addEventListener('click', function(){ // idem pour le btn complete
            const index = Array.from(ulTarget.children).indexOf(list) //idem pour le n°li à definir en complete
            list.classList.toggle('complete') // switch 2 complete
            taches[index].complete = !taches[index].complete // inverse l'état complete de la tâche dans le tableau (true <-> false)
            localStorage.setItem('taches', JSON.stringify(taches)) // save en local
        }) //je reprend ma fonction qui valide ma task


    })
        textListEmpty.style.display = "none" //je cache mon h3 empty car des elements sont presents
        clearBtn.disabled = false //je peux reutiliser le btn car des taches sont présentes
    }
})


