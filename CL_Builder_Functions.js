//Function for updating the toneTick object
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

    //Checks if there is saved users. If there is retrieve the object and display it onto the box
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

//Makes PDF
//Upon call -> getItem("User") -> saveTopLevelInfo()
function createPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    //Retrieve saved user object
    let user = JSON.parse(localStorage.getItem("user"));
    let topLevelInfo = saveTopLevelInfo();

    //Check if a pdf can be made
    if (user == null) {
        console.log("Error: Cannot create PDF without saved user");
    } else {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        doc.setFontSize(12);

        doc.text(user.fullName, 10, 10);
        doc.text(user.email+" | ", 10, 15);
        doc.text(user.number, 67, 15);
        doc.text("Date: "+topLevelInfo.dateInput, 10, 25);
        doc.save("a4.pdf");
        

    }
}

//Saves company name + location + hiring manager name
//Returns top level info as a object
//Missing null input detection!!!
function saveTopLevelInfo() {
    const companyInput = document.getElementById("company-input");
    const locationInput = document.getElementById("location-input");
    const hiringInput = document.getElementById("hiring-input");
    const dateInput = document.getElementById("date-input")

    topLevelInfo = {
        companyName: companyInput.value,
        locationInput: locationInput.value,
        hiringInput: hiringInput.value,
        dateInput: dateInput.value
    }

    return topLevelInfo;
}

//Upon call -> formatPrompt()
function apiGenerate() {
    

    const companyInput = document.getElementById("company-input");
    const jobInput = document.getElementById("job-input");
    const experienceInput = document.getElementById("experience-input");
    let outputCL = document.getElementById("output-cl");
    //Resets the output box to its default mode
    outputCL.attribute.add("readonly");
    outputCL.classList.add("empty");

    //Checks for any null inputs required for generation.
    if (companyInput.value == "" || experienceInput.value == "" || jobInput.value == "") {
        console.log("ERROR: Missing generation prompts");
    } else {//Formats prompt
        let prompt = ("This is the company I am wokring for: "+companyInput.value+". This is the job description: "+jobInput.value+". This is my experience: "+experienceInput.value+". I want you to create a cover letter for me. Only create the body of the cover letter do not sign the letter.");

        console.log(prompt);//For debugging, shows prompts in console before sending
        promptSerialized = JSON.stringify(prompt);//Makes prompts in JSON before being sent

        outputCL.value = "Generating...";

        //API call

        fetch('http://127.0.0.1:5000/generate?prompt='+promptSerialized)
        .then((response) => {
            return response.json();
        })
        .then((myJson) => {
            console.log("Generated CL: "+myJson.result);

            //Updates the contents of the output box
            outputCL.classList.remove("empty");
            outputCL.value = myJson.result;
        });

        outputCL.attributes.remove('readonly');
      
    }
}



