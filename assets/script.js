//affichage de mon input text pour ecrire la task
const done = document.getElementById('fait')
const inputTask = document.getElementById('task')
const addBtn = document.getElementById('addTask') //mon bouton
const taskInput = document.querySelector('.conteneur-tasktext') //ma div
const textListEmpty = document.getElementById('textLiEmpty')
const ulTarget = document.querySelector('ul')
const full = document.getElementById('full')
const clearBtn = document.getElementById('deleteAll')
const error = document.getElementById('error')
const spanText = document.createElement('span')

addBtn.addEventListener('click', function() {
        taskInput.classList.toggle('active')
})


//Activation de mon button des que chars > 0 !!!  this.value.length > 0 !!!!


inputTask.addEventListener('input', function() {
    if (this.value.length > 0 ) {done.disabled = false}
    else { done.disabled = true }
    if (this.value.length > 50) {
        error.style.display = "block"
        done.disabled = true }
    else {error.style.display = "none"}
})
    //Ajout des tasks : li et bouttons//


done.addEventListener('click', function() {
    if (ulTarget.children.length < 10) 
        {
        const divList = document.createElement('div')
        const list = document.createElement('li') //const crea li
        const spanText = document.createElement('span')
        spanText.textContent = inputTask.value //mon span = contenu de l'input
        const completeBtn = document.createElement ('button') //const crea btn 
        const deleteBtn = document.createElement ('button') // const crea btn 2
        completeBtn.textContent = "✅" //on ajoute le text dans le btn1
        deleteBtn.textContent = "❌"  //idem bt2

        divList.appendChild(completeBtn) //on place le btn 1
        divList.appendChild(deleteBtn) //puis 2
        list.appendChild(spanText) // j'ajoute mon span avant ma li
        list.appendChild(divList)
        ulTarget.appendChild(list) // et on place le li en dernier !!!
            //supprimer une li avec le buton X
        deleteBtn.addEventListener('click', function(){
            list.remove()
            full.style.display = "none"
        })
            //toggle la class Css des element completés task->task finie (couleur+barré)
            completeBtn.addEventListener('click', function(){
                list.classList.toggle('complete')
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
    }
})