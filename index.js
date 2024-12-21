import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js'
import { getDatabase, ref, push , onValue , remove } from 'https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js'
const appSettings = {
    databaseURL: "https://playground-54154-default-rtdb.asia-southeast1.firebasedatabase.app/"
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")
const input = document.getElementById("input-field")
const button = document.getElementById("add-button")
const shopping = document.getElementById("shopping-list")

button.addEventListener("click", function() {
    let inputVal = input.value
    push(shoppingListInDB, inputVal)
    clear()
   
})


    onValue(shoppingListInDB, function(snapshot){
        if (snapshot.exists()){

            let itemsArray = Object.entries(snapshot.val())
        
            console.log(snapshot.val())
            
            shopping.innerHTML=""
        
            
            for(let i=0; i<itemsArray.length; i++ ){
                let item = itemsArray[i]
                
        
                //console.log(itemID)
                appendInShopping(item)
            }
        }
        else{
           shopping.innerHTML = ("Nothing here..yet")
        }
        
    })



function clear(){
     input.value = " "
}

function appendInShopping(item){
       //shopping.innerHTML += `<li>${itemVal}</li>`
        let newEl = document.createElement("li")

        let itemID = item[0]
        let itemVal = item[1]
        
        newEl.textContent = itemVal

        shopping.append(newEl)

        newEl.addEventListener("click", function(){
            let exactLocation = ref(database, `shoppingList/${itemID}`)
            remove(exactLocation)
        })
}


