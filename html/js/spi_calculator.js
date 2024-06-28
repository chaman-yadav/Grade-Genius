document.addEventListener("DOMContentLoaded", function() {
    const proceedButton = document.getElementById("proceedButton");
    const fieldsContainer = document.getElementById("fieldsContainer");
    const calculateButtonContainer = document.getElementById("calculateButtonContainer");
    const resetButtonContainer = document.getElementById("resetContainer");
    const calculateButton = document.getElementById("calculateButton");
    const spiResult = document.getElementById("spiResult");
    const marsheetButtonContainer = document.getElementById("marksheetContainer");

    proceedButton.addEventListener("click", function() {
        const numSubjects = parseInt(document.getElementById("numSubjects").value);

        if (isNaN(numSubjects) || numSubjects < 1) {
            alert("Please enter a valid number of subjects (minimum 1).");
            return;
        }

        // Remove existing fields
        while (fieldsContainer.firstChild) {
            fieldsContainer.removeChild(fieldsContainer.firstChild);
        }

        // Create fields for each subject
        for (let i = 0; i < numSubjects; i++) {
            const field = document.createElement("div");
            field.classList.add("input-group", "horizontal");
            field.innerHTML = `
                <label for="subjectCode${i}">Subject Code:</label>
                <input type="text" id="subjectCode${i}" required>
                <label for="credit${i}">Credit:</label>
                <input type="number" id="credit${i}" required min="1">
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
        calculateButtonContainer.style.display = "block";
    });

    calculateButton.addEventListener("click", function(event) {
        event.preventDefault();
        
        let totalCredits = 0;
        let totalGradePoints = 0;

        const numSubjects = parseInt(document.getElementById("numSubjects").value);
        for (let i = 0; i < numSubjects; i++) {
            const credit = parseInt(document.getElementById(`credit${i}`).value);
            const grade = document.getElementById(`grade${i}`).value;
            if (grade === "") {
                // Show an error message or handle the case where no option is chosen
                alert("Please select a grade.");
                return;
            }

            if (isNaN(credit) || credit < 1) {
                alert("Please enter a valid credit value for all subjects.");
                return;
            }

            totalCredits += credit;
            totalGradePoints += credit * getGradePoint(grade);
            
        }

        const spi = totalGradePoints / totalCredits;
        spiResult.textContent = `Your SPI is: ${spi.toFixed(2)}`;
        marsheetButtonContainer.style.display = "block";
        resetButtonContainer.style.display = "block";
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
        let name = prompt("Please enter your name");
        while(validateText(name)==false){
            alert("Please enter valid name");
            name=prompt("Please enter your name");
        }
        let rollNo = prompt("Please enter your Roll no.");
        while(validateNumber(rollNo)==false){
            alert("Please enter valid Roll No");
            rollNo=prompt("Please enter your Roll.no");
        }
        const mcon=document.getElementById("fieldsContainerMarksheet");
        mcon.innerHTML=`  <h1 style="text-allign:center"> Marksheet</h1>
        <div style="display:flex;">

        <div style="margin-right:450px;"> Name:${name}</div>  
        <div style="float:right"> Roll Number:${rollNo}</div>
    
    </div>`

        window.print();

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
});
