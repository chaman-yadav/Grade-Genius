// Event listener for when the DOM content is loaded
document.addEventListener("DOMContentLoaded", function() {
   // Selecting DOM elements
    const proceedButton = document.getElementById("proceedButton");
    const fieldsContainer = document.getElementById("fieldsContainer");
    const calculateButtonContainer = document.getElementById("calculateButtonContainer");
    const marsheetButtonContainer = document.getElementById("marksheetContainer");
    const resetButtonContainer = document.getElementById("resetContainer");
    const calculateButton = document.getElementById("calculateButton");
    const spiResult = document.getElementById("spiResult");
    let sem=0;
// Event listener for proceedButton click
    proceedButton.addEventListener("click", function() {
        // Collecting user inputs and validating
        const numSubjects = parseInt(document.getElementById("numSubjects").value);
        sem=numSubjects;
        const branchValue=document.getElementById("branch").value;
        let branchnum=0;
         // Switch case to assign branch number
        switch(branchValue){
            // Assigning branch number based on selected branch
            case "":
                branchnum=-1;
                break;
            case "cse":
                branchnum=0;
                break;
            case "mnc":
                branchnum=1;
                 break;
            case "elec":
                branchnum=2;
                 break;
            case "mech":
                branchnum=3;
                break;                
        }
        if(branchnum==-1){
            alert("Please enter branch");
            return;
        }

        
      

        if (isNaN(numSubjects) || numSubjects < 1 || numSubjects >8 ) {
            alert("Please enter a valid number of subjects (minimum 1 and maximum 8).");
            return;
        }

        // Remove existing fields
        while (fieldsContainer.firstChild) {
            fieldsContainer.removeChild(fieldsContainer.firstChild);
        }
        const data=dataArray();
        

        

        // Create fields for each subject
        for (let i = 0; i < data[branchnum][numSubjects-1].length; i++) {
            const field = document.createElement("div");
            field.classList.add("input-group", "horizontal");
            // Creating input field elements dynamically
            field.innerHTML = `
                <label for="subjectCode${i}">Subject Code:</label>
                
                <input type="text" id="subjectCode${i}"  placeholder="${data[branchnum][numSubjects-1][i][0]}">
                <label for="credit${i}">Credit:</label>
                <input type="number" id="credit${i}"  placeholder="${data[branchnum][numSubjects-1][i][1]}">
                <label for="grade${i}">Grade:</label>
                
                <select id="grade${i}" required>
                    <option value="" disabled selected>Select Grade</option>
                    <option value="A*">A*</option>
                    <option value="A+">A+</option>
                    <option value="A">A</option>
                    <option value="B+">B+</option>
                    <option value="B">B</option>
                    <option value="C+">C+</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="E">E</option>
                    <option value="F">F</option>
                </select>
            `;
            fieldsContainer.appendChild(field);
        }
        

        // Show fields container
        // Displaying calculate button container
        calculateButtonContainer.style.display = "block";
    });
// Event listener for calculateButton click
    calculateButton.addEventListener("click", function(event) {
        event.preventDefault();
        // Calculating SPI based on user inputs
        let totalCredits = 0;// Total credits
        let totalGradePoints = 0;// Total grade points

        
        const numSubjects = parseInt(document.getElementById("numSubjects").value);// Number of subjects
       
        const branchValue=document.getElementById("branch").value;// Selected branch
        let branchnum=0;// Branch number variable
        switch(branchValue){
            case "":
                branchnum=-1;
                break;
            case "cse":
                branchnum=0;
                break;
            case "mnc":
                branchnum=1;
                 break;
            case "elec":
                branchnum=2;
                 break;
            case "mech":
                branchnum=3;
                break;                
        }
        const data=dataArray();
        // Loop through subjects
        for (let i = 0; i < data[branchnum][numSubjects-1].length; i++) {
            // Collect credit and grade for each subject
        switch(branchValue){
            case "":
                branchnum=-1;
                break;
            case "cse":
                branchnum=0;
                break;
            case "mnc":
                branchnum=1;
                 break;
            case "elec":
                branchnum=2;
                 break;
            case "mech":
                branchnum=3;
                break;                
        }
        
            const credit = data[branchnum][numSubjects-1][i][1];
            const grade = document.getElementById(`grade${i}`).value;
            if (grade === "") {
                // Show an error message or handle the case where no option is chosen
                alert("Please select a grade.");
                return;
            }
            

           
             // Calculating total credits and grade points
            totalCredits += credit;
            totalGradePoints += credit * getGradePoint(grade);
        }
          // Calculating SPI
        const spi = totalGradePoints / totalCredits;// SPI calculation
        spiResult.textContent = `Your SPI is: ${spi.toFixed(2)}`;// Displaying SPI
        marsheetButtonContainer.style.display = "block";// Displaying marksheet button
        resetButtonContainer.style.display = "block";// Displaying reset button
    });
    function validateNumber(num_text){   //to validate number input
    
        if(parseInt(num_text).toString()==="NaN")
        {return false;}
        else{
        return true;}
    }

        function validateText(text){  //to validate text input
            if(text=="")return false;
            else return true;
        }

    document.getElementById("generateButton").addEventListener("click", function(event) {
        
        event.preventDefault();
        let name = prompt("Please enter your name");// Prompt for name
        while(validateText(name)==false){
            alert("Please enter valid name");
            name=prompt("Please enter your name");
        }
        let rollNo = prompt("Please enter your Roll no.");// Prompt for roll number
        while(validateNumber(rollNo)==false){
            alert("Please enter valid Roll No");
            rollNo=prompt("Please enter your Roll.no");
        }


        const mcon=document.getElementById("fieldsContainerMarksheet");// Marksheet container
        mcon.innerHTML=`  <h1 style="text-allign:center"> Marksheet</h1>
        <div style="display:flex;">

        <div style="margin-right:450px;"> Name:${name}</div>  
        <div style="float:right"> Roll Number:${rollNo}</div>
    
    </div>`// Generating marksheet content

        window.print();// Printing marksheet

    });

    // Function to get grade points
    function getGradePoint(grade) {
        switch (grade) {
            case 'A*':
                return 10;
            case 'A+':
                return 10;
            case 'A':
                return 9;
            case 'B+':
                return 8;
            case 'B':
                return 7;
            case 'C+':
                return 6;
            case 'C':
                return 5;
            case 'D':
                return 4;
            case 'E':
                return 2;
            case 'F':
                return 0;
            default:
                return 0;
        }
    }
    function dataArray(){// Data array containing subjects for different branches
        const data=[[[["MA 101",4],["PH 101",3],["CH 101",2],["CH 102",4],["CS 101",4],["HS 101",3]],[["MA 103",2],["PH 103",2],["CS 102",3],["PH 102",3],["BIO 101",3],["ME 102",2],["MA 102",2],["EE 101",4]],[["CS 210",4],["CS 220",4],["CS 221",3],["CS 230",3],["OPEN ELECTIVE",3]],[["CS 211",4],["CS 212",4],["CS 222",4],["OPEN ELECTIVE",3]],[["CS 300",4],["CS 310",4],["CS 320",3],["CS 330",4],["OPEN ELECTIVE",3]],[["CS 331",4],["CS 321",3],["CS 311",4],["OPEN ELECTIVE",3]],[["OPEN ELECTIVE",3],["OPEN ELECTIVE",3],["PROGRAM ELECTIVE",3],["PROGRAM ELECTIVE",3]],[["OPEN ELECTIVE",3],["OPEN ELECTIVE",3],["PROGRAM ELECTIVE",3],["PROGRAM ELECTIVE",3]]],
        [[["MA 101",4],["PH 101",3],["CH 101",2],["CH 102",4],["CS 101",4],["HS 101",3]],[["MA 103",2],["PH 103",2],["CS 102",3],["PH 102",3],["BIO 101",3],["ME 102",2],["MA 102",2],["EE 101",4]],[["MTH 211",4],["MTH 221",4],["MTH 222",4],["CS 230",3],["CS 220",4]],[["MTH 212",4],["MTH 223",4],["MTH 213",4],["CS 222",4],["OPEN ELECTIVE",3]],[["MTH 332",3],["MTH 3141",2],["MTH 3142",2],["MTH 3151",2],["MTH 3152",2],["OPEN ELECTIVE",3],["OPEN ELECTIVE",3]],[["MTH 316",3],["MTH 317",3],["CS 331",4],["CS 321",3],["PROGRAM ELECTIVE",3]],[["OPEN ELECTIVE",3],["OPEN ELECTIVE",3],["PROGRAM ELECTIVE",3],["PROGRAM ELECTIVE",3]],[["OPEN ELECTIVE",3],["OPEN ELECTIVE",3],["PROGRAM ELECTIVE",3],["PROGRAM ELECTIVE",3]]],
        [[["MA 101",4],["PH 101",3],["CH 101",2],["CH 102",4],["CS 101",4],["HS 101",3]],[["MA 103",2],["PH 103",2],["EE 102",3],["PH 102",3],["BIO 101",3],["ME 102",2],["MA 102",2],["EE 101",4]],[["MTH 3151",2],["MTH 3142",2],["EE 231",4],["EE 232",4],["EE 201",3],["EE 221",3],["OPEN ELECTIVE",3]],[["EE 222",3],["EE 223",3],["EE 233",4],["EE 211",4],["OPEN ELECTIVE",3]],[["EE 321",4],["EE 301",4],["EE 322",4],["EE 311",4],["OPEN ELECTIVE",3]],[["EE 312",3],["EE 313",3],["PROGRAM ELECTIVE",3],["PROGRAM ELECTIVE",3],["OPEN ELECTIVE",3]],[["BTP I",6],["PROGRAM ELECTIVE",3],["PROGRAM ELECTIVE/OPEN ELECTIVE",3 ]],[["PROGRAM ELECTIVE/ BTP II",3],["PROGRAM ELECTIVE",3],["PROGRAM ELECTIVE / OPEN ELECTIVE",3],["OPEN ELECTIVE",3]]],
        [[["MA 101",4],["PH 101",3],["CH 101",2],["CH 102",4],["CS 101",4],["HS 101",3]],[["MA 103",2],["PH 103",2],["ME 110",3],["PH 102",3],["BIO 101",3],["ME 102",2],["MA 102",2],["EE 101",4]],[["ME 200",3],["ME 201",4],["ME 210",4],["ME 211",2],["MTH 3142",2],["OPEN ELECTIVE",3]],[["ME 212",2],["ME 220",3],["ME 221",2],["ME 222",3],["MTH 213",4],["OPEN ELECTIVE ",3]],[["ME 300",4],["ME 310",4],["ME 320",3],["ME 321",2],["OPEN ELECTIVE",3],["OPEN ELECTIVE",3]],[["ME 301",4],["ME 311",4],["ME 322",3],["ME 323",2],["PROGRAM ELECTIVE",3],["OPEN ELECTIVE",3]],[["PROGRAM ELECTIVE/OPEN ELECTIVE",3],["PROGRAM ELECTIVE",3],["PROGRAM ELECTIVE",3],["PROGRAM ELECTIVE",3]],[["PROGRAM ELECTIVE/OPEN ELECTIVE",3],["PROGRAM ELECTIVE",3],["PROGRAM ELECTIVE",3],["PROGRAM ELECTIVE",3]]]];
        return data;
    }
    
});