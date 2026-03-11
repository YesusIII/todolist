import { ulTarget, taches, clearBtn, textListEmpty, full } from './variables.js'
export function creerLi(tache) {
    console.log("ulTarget:", ulTarget)
    console.log("creerLi appelée", tache) 

        const divLiMain = document.createElement('div')
        divLiMain.classList.add('li-main')
        const pAddText = document.createElement('p')
        
        pAddText.textContent = "Ajouté le " + tache.date
       
        const divList = document.createElement('div')
        const list = document.createElement('li')
        const spanText = document.createElement('span')

        spanText.textContent = tache.texte
 
        const completeBtn = document.createElement ('button')
        const deleteBtn = document.createElement ('button')
        
        completeBtn.textContent = "✅"
        deleteBtn.textContent = "❌"
       
        divList.appendChild(completeBtn)
        divList.appendChild(deleteBtn)
        divLiMain.appendChild(spanText)
        divLiMain.appendChild(divList)
        list.appendChild(divLiMain)
        list.appendChild(pAddText)
        ulTarget.appendChild(list)

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
        }
