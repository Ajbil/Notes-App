// i need to add note from here i.e using js using addnote btn  i.e DYNAMICALLY
//otherwise if i replicate this below code for one note n times i get n notes but iit iis not the way  
/* <div class="note">
            <div class="tool">
            <i class="fas fa-save"></i>
            <i class="fas fa-trash"></i>
        </div>
        <textarea></textarea>
    </div>
*/
//so i need to basically implement thhis html code for adding a note via js code , which mainly done in addNote function defined below 

//selector
const addBtn =document.querySelector("#addBtn")  //This line selects the button element with the id "addBtn" and assigns it to the variable addBtn.
const main = document.querySelector("#main")
addBtn.addEventListener(
    "click",
    function(){
        //alert()
        addNote() //  When the button is clicked, the anonymous function is called, which in turn calls the addNote() function. 
    }
)

//makijg saveNotes function 
const saveNotes =() => {
    // wen need current notes content to putt in local storage so firslty i select all textare and put them in notes object 
    // then initially data is empty and for each note i push content into data object 
    const notes =document.querySelectorAll(".note textarea");
    console.log(notes);
    const data = [];
    notes.forEach(
        (note) => {
            data.push(note.value)
        }
    )
    console.log(data) //yaha pe hamarre pass content jo bhi hai notes mai vo data variable mai aa gaya hai noew i need to put them in LOCAL STORAGE
    
    //here if data  is empty then i remove everything from local strogae so that in self calaling fucntion at last lsnotes === null get true and addNote() is called so that ek note area toh hamesha rahega paeg pe when we reload 
    if(data.length ===0){
        localStorage.removeItem("notes")
    }else{      
        localStorage.setItem("notes", JSON.stringify(data))
    }
}


const addNote =(text ="") => { // initially addnote fucntion passed empty string as parameter (default value it is )
    const note =document.createElement("div"); //creates a new div elemnt and assign it to variable note. This div will serve as the container for our note. 
    note.classList.add("note") //adds the CSS class "note" to the note div ele,mmntn 
    note.innerHTML = `
    <div class="tool">
        <i class="save fas fa-save"></i>
        <i class="trash fas fa-trash"></i>
    </div>
    <textarea>${text}</textarea>  
    `;
//The ${text} syntax is used to insert the value of the text parameter into the textarea element.This allows you to prepopulate the textarea with a specific text if provided will be used when we refresh page and we need to retrieve previously saved data 
    
    //now i need fucntionilyt like delete 
    note.querySelector(".trash").addEventListener(
        "click",
        function(){
            note.remove()
            saveNotes()
        }
    )

    //now i need fucntionilyt like save
    note.querySelector(".save").addEventListener(
        "click",
        function(){
            saveNotes() //funciton called 
        }
    )

    note.querySelector("textarea").addEventListener(
        "focusout",
        function(){
            saveNotes()  //means when we end up wriitng somehtin in a note then when we move cursor out it get automatialcly saved no ned to cleick save icon
        }
    )


    main.appendChild(note);//is responsible for adding the newly created note div element to the DOM as a child of the main element
    saveNotes() //i.e jaise hi user ek note apppend karta hai we call save note fucntions 
}

//i need that page load hote hi notes jo pehle the vo dkhe so i need to make a self calling fucntion 
(
    function(){
//sabse pehle page load hote hi yeah fucntion chekc karge local storage vale item ko jo ki "notes" mai dala maine 
//aur ab vo string hai toh parse karke unka object banake lsnotes mai daal dunga and if local storgare emopty tha then addnote() i call without any parameterr 
//otherwise i call addnote(lsnotes) with this parameter taki lsnotes mai jo hai vo page reload hote hi dikh jaye 
        const lsNotes = JSON.parse(localStorage.getItem("notes"));
        if(lsNotes === null){
            addNote()
        }
        else{
            lsNotes.forEach(
                (lsNote) => {
                    addNote(lsNote)
                }
            )
        }
    }
)()