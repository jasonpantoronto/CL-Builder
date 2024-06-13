function storeTick(value) {
    console.log("Ticked Value: "+value)//For Debugging

    switch(value) {
        case "pro":
            if (toneTicks.professional == false) {
                toneTicks.professional = true;
            } else {
                toneTicks.professional = false;
            }
            break;
        case "for":
            if (toneTicks.formal == false) {
                toneTicks.formal = true;
            } else {
                toneTicks.formal = false;
            }
            break;
        case "opt":
            if (toneTicks.optimistic == false) {
                toneTicks.optimistic = true;
            } else {
                toneTicks.optimistic = false;
            }
            break;
        //Add new cases as needed
    }

    console.log(toneTicks);//For Debugging
}
//Adds the active class to newUserWindow and popupOverlay
function activateNewUserWindow() {
    newUserWindow.classList.add("active");
    popupOverlay.classList.add("active");
    
}

//Removes the active class from newUserWindow and popupOverlay
function deactivateNewUserWindow() {
    newUserWindow.classList.remove("active");
    popupOverlay.classList.remove("active");
}

//Saves the user as a object in local storage as JSON
function saveNewUser() {
    const name = document.getElementById("name-input");
    const add = document.getElementById("address-input");
    const num = document.getElementById("number-input");
    const mail = document.getElementById("email-input");

    if (checkNewUserInput(name.value, add.value, num.value, mail.value)) {//If ture

        let user = {
            fullName: name.value,
            address: add.value,
            number: num.value,
            email: mail.value  
        }

        let userSerialized = JSON.stringify(user);//Converts formate of Object to JSON so that it can be stored as local storage.

        console.log(userSerialized);//For debugging

        localStorage.setItem(("user"), userSerialized);

        fillSavedUsersBox();//For refreshing the saved user box
        deactivateNewUserWindow();

    } else { //If false
        console.log("ERROR: save user input is null.");
    }

}

//Check if any of the input has been left blank.
//Maybe add formating check in the future.
function checkNewUserInput(name, add, num, mail) {
    console.log(name, add, num, mail);//Debugging
    if (name == null || add == null || num==null || mail ==null ||name == "" || add == "" || num=="" || mail =="") {
        console.log("checkNewUserInput result: false");
        return false;
    } else {
        console.log("checkNewUserInput result: true");
        return true;
        
    }
}     

//Used to refresh or fill the saved user box
function fillSavedUsersBox() {

    console.log("Local Storage Empty: "+(localStorage.getItem("user") == null));//For Debugging

    if (localStorage.getItem("user") == null) {
        savedUsersBoxContent.textContent = "No Saved Users";
        savedUsersBoxContent.classList.add("empty");//Changes the mode of the box
        newUserButton.textContent = "Add New User";

    } else {
        newUserButton.textContent = "Edit User Info";
        savedUsersBoxContent.classList.remove("empty");
        let user_info_deserialized = JSON.parse(localStorage.getItem("user"));

        savedUsersBoxContent.setAttribute('style', 'white-space: pre;');//Idk wtf this does but it makes everything below work.

        savedUsersBoxContent.textContent = (user_info_deserialized.fullName  + "\r\n" + user_info_deserialized.address +"\r\n"+user_info_deserialized.number+"\r\n"+user_info_deserialized.email);
    }
}

//Clears local storage
function deleteUser() {
    localStorage.removeItem("user");
    fillSavedUsersBox();
}

//Gets date returns it in YYYY/MM/DD format
function getDate() {
    const date = new Date();
    return (date.getFullYear()+"/"+date.getMonth()+"/"+date.getDay());
}

function createPrompt() {
    
}