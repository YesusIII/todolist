import { ulTarget, taches, clearBtn, textListEmpty, full, taskInput } from './variables.js'
export function creerLi(tache) {


        const divLiMain = document.createElement('div')
        divLiMain.classList.add('li-main')
        const pAddText = document.createElement('p')
        const pEditText = document.createElement('p')
        const now = new Date()
        pAddText.textContent = "Ajouté le " + tache.date
        pEditText.textContent = ""
        
       
        const divList = document.createElement('div')
        divList.classList.add('btn-div')
        const list = document.createElement('li')
        const spanText = document.createElement('span')

        spanText.textContent = tache.texte
 
        const completeBtn = document.createElement ('button')
        const editBtn = document.createElement ('button')
        const deleteBtn = document.createElement ('button')
        
        const divEditInput = document.createElement('div')
        divEditInput.classList.add('edit-input')
        const inputEdit = document.createElement('input')
        const inputEditVal = document.createElement('button')
        const inputEditBack = document.createElement('button')



        completeBtn.textContent = "✅"
        editBtn.textContent ="✏️"
        deleteBtn.textContent = "❌"
       
        inputEditVal.textContent = "✅"
        inputEditBack.textContent = "❌"

        divList.appendChild(completeBtn)
        divList.appendChild(editBtn)
        divList.appendChild(deleteBtn)
        divLiMain.appendChild(spanText)
        
        divLiMain.appendChild(divList)
        list.appendChild(divLiMain)
        list.appendChild(pAddText)
        list.appendChild(pEditText)
        

divEditInput.appendChild(inputEdit)
divEditInput.appendChild(inputEditVal)
divEditInput.appendChild(inputEditBack)        
        list.appendChild(divEditInput)
        ulTarget.appendChild(list)
            if (tache.time) {
    pEditText.style.display = "block"
    pEditText.textContent = "Modifié le " + tache.dateEdit + " à " + tache.time}

            if (tache.complete) { list.classList.add('complete') }

    deleteBtn.addEventListener('click', function(){
        const index = Array.from(ulTarget.children).indexOf(list)
            list.remove()
            full.style.display = "none"
            taches.splice(index, 1)
            localStorage.setItem('taches', JSON.stringify(taches))
            if (ulTarget.children.length === 0) {
            clearBtn.disabled = true
            textListEmpty.style.display = "block"}
        })
    completeBtn.addEventListener('click', function(){
        const index = Array.from(ulTarget.children).indexOf(list)
                list.classList.toggle('complete')
                taches[index].complete = !taches[index].complete
                localStorage.setItem('taches', JSON.stringify(taches))
            })
    editBtn.addEventListener('click', function(){
            taskInput.classList.remove('active')
            divEditInput.classList.toggle('active')})
            inputEdit.value = spanText.textContent

            inputEditBack.addEventListener('click', function(){
            inputEdit.value = ""
            divEditInput.classList.toggle('active')})
            

    inputEditVal.addEventListener('click', function(){
        const now = new Date()
        const index = Array.from(ulTarget.children).indexOf(list)
        taches[index].texte = inputEdit.value
        taches[index].dateEdit = now.toLocaleDateString('fr-FR', {day: 'numeric', month: 'long', year: 'numeric'})
        taches[index].time = now.toLocaleTimeString('fr-FR', {hour: '2-digit', minute: '2-digit'})
        spanText.textContent = inputEdit.value
        pEditText.textContent = "Modifié le " + now.toLocaleDateString('fr-FR', {day: 'numeric', month: 'long', year: 'numeric'}) + " à " + now.toLocaleTimeString('fr-FR', {hour: '2-digit', minute: '2-digit'})
        pEditText.style.display = "block"
        localStorage.setItem('taches', JSON.stringify(taches))
        inputEdit.value = ""
        divEditInput.classList.toggle('active')
    })
        }

    
    