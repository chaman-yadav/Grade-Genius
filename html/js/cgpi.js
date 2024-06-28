// Event listener for when the DOM content is loaded
document.addEventListener("DOMContentLoaded", function() {
    // Selecting DOM elements
   
    const proceedButton = document.getElementById("proceedButton"); // Proceed button
    const fieldsContainer = document.getElementById("fieldsContainer"); // Container for subject fields
    const calculateButtonContainer = document.getElementById("calculateButtonContainer"); // Container for calculate button
    const calculateButton = document.getElementById("calculateButton"); // Calculate button
    const spiResult = document.getElementById("spiResult"); // CPI result display area

    // Event listener for proceedButton click
    proceedButton.addEventListener("click", function() {
        // Collecting number of semesters input by the user
        const numSubjects = parseInt(document.getElementById("numSubjects").value);
// Validating number of semesters input
        if (isNaN(numSubjects) || numSubjects < 1 || numSubjects>8) {
            alert("Please enter a valid number of Semesters (minimum 1 and maximum 8).");
            return;
        }

        // Remove existing fields
        while (fieldsContainer.firstChild) {
            fieldsContainer.removeChild(fieldsContainer.firstChild);
        }

        // Create fields for each semester
        for (let i = 0; i < numSubjects; i++) {
            const field = document.createElement("div");
            field.classList.add("input-group", "horizontal");
            field.innerHTML = `
                <label for="subjectCode${i}">Semester:</label>
                <input type="text" id="subjectCode${i}" required>
                <label for="credit${i}">Credit:</label>
                <input type="number" id="credit${i}" required min="1">
                <label for="spi${i}">SPI:</label>
                <input type="number" id="spi${i}"  step="0.01" min="0" max="10" required min="1">
                
                
                
            `;
            fieldsContainer.appendChild(field);
        }

        // Show fields container
        calculateButtonContainer.style.display = "block";
    });
 // Event listener for calculateButton click
    calculateButton.addEventListener("click", function(event) {
        event.preventDefault();
        
        let totalCredits = 0;
        let totalGradePoints = 0;

        const numSubjects = parseInt(document.getElementById("numSubjects").value);
        for (let i = 0; i < numSubjects; i++) {
            const credit = parseInt(document.getElementById(`credit${i}`).value);
            const spi = parseFloat(document.getElementById(`spi${i}`).value);
            
              console.log(spi,credit);
              // Validating credit and SPI values
            if (isNaN(credit) || credit < 1) {
                alert("Please enter a valid credit value for all subjects.");
                return;
            }

            if (isNaN(spi) || spi < 0) { // Check for negative SPI
                alert("Please enter a valid SPI value (greater than or equal to 0) for all subjects.");
                return;
            }

            totalCredits += credit;
            totalGradePoints += (credit * spi);
        }
// Calculating CPI
        const cgpi = totalGradePoints / totalCredits;
        spiResult.textContent = `Your CPI is: ${cgpi.toFixed(2)}`;
    });

    
});