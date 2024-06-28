function validateInputs() {
    const n = parseInt(document.getElementById("nsem").value);
    const exp = parseFloat(document.getElementById("exp").value);

    return !isNaN(n) && !isNaN(exp) && exp >= 0 && exp <= 10;
}

function clearTable() {
    const tableContainer = document.getElementById("spiInputTableContainer");
    if (tableContainer) {
        tableContainer.remove();
    }
}

function no_sems() {
    if (validateInputs()) {
        const n = parseInt(document.getElementById("nsem").value);
        const exp = parseFloat(document.getElementById("exp").value);
        console.log("Number of semesters:", n);
        console.log("Expected CPI:", exp);
        console.log("Valid Number of semesters:", n);
        console.log("Valid Expected CPI:", exp);
        clearTable();
        generateSPIInputTable(n);
    } else {
        alert("Please enter a valid input for the CPI (between 0 and 10).");
    }
}

function generateSPIInputTable(n) {
    const tableContainer = document.createElement("div");
    tableContainer.id = "spiInputTableContainer";

    const table = document.createElement("table");
    table.classList.add("table");
    table.id = "spiInputTable";

    for (let i = 1; i <= n; i++) {
        const row = document.createElement("tr");

        const semesterCell = document.createElement("td");
        semesterCell.textContent = "Semester " + i;
        row.appendChild(semesterCell);

        const spiInputCell = document.createElement("td");
        const spiInput = document.createElement("input");
        spiInput.type = "number";
        spiInput.min = "0";
        spiInput.max = "10"; // Add max attribute to limit SPI value to 10
        spiInput.step = "0.01";
        spiInput.placeholder = "Enter SPI for Semester " + i;
        spiInputCell.appendChild(spiInput);
        row.appendChild(spiInputCell);
        console.log("Created SPI input field:", spiInput);
        console.log("Appended SPI input field to cell:", spiInputCell);
        console.log("Appended cell to row:", row);

        const creditsInputCell = document.createElement("td");
        const creditsInput = document.createElement("input");
        creditsInput.type = "number";
        creditsInput.min = "0";
        creditsInput.placeholder = "Credits for Semester " + i;
        creditsInputCell.appendChild(creditsInput);
        row.appendChild(creditsInputCell);

        table.appendChild(row);
    }

    const creditsNextSemesterRow = document.createElement("tr");
    const creditsNextSemesterCell = document.createElement("td");
    creditsNextSemesterCell.textContent = "Credits for Next Semester:";
    creditsNextSemesterRow.appendChild(creditsNextSemesterCell);

    const creditsNextSemesterInputCell = document.createElement("td");
    const creditsNextSemesterInput = document.createElement("input");
    creditsNextSemesterInput.type = "number";
    creditsNextSemesterInput.id = "nextSemesterCredits";
    creditsNextSemesterInput.min = "0";
    creditsNextSemesterInput.placeholder = "Enter Credits for Next Semester";
    creditsNextSemesterInputCell.appendChild(creditsNextSemesterInput);
    creditsNextSemesterRow.appendChild(creditsNextSemesterInputCell);

    table.appendChild(creditsNextSemesterRow);

    const submitButtonRow = document.createElement("tr");
    const submitButtonCell = document.createElement("td");
    submitButtonCell.colSpan = "3";
    const submitButton = document.createElement("button");
    submitButton.textContent = "Submit";
    submitButton.classList.add("btn");
    submitButton.onclick = saveSPIInputs;
    submitButtonCell.appendChild(submitButton);
    submitButtonRow.appendChild(submitButtonCell);
    table.appendChild(submitButtonRow);

    tableContainer.appendChild(table);
    document.getElementById("inp1").appendChild(tableContainer);
}

function saveSPIInputs(event) {
    event.preventDefault(); // Prevent form submission if button is in a form

    const spiInputs = [];
    const creditInputs = [];
    let negativeSPI = false; // Flag to track if negative SPI is found
    let invalidSPI = false; // Flag to track if SPI is invalid

    const tableRows = document.querySelectorAll("#spiInputTable tr");

    tableRows.forEach(row => {
        const spiInput = row.querySelector("input[type='number']");
        const creditsInput = row.querySelectorAll("input[type='number']")[1];

        // Check if input elements are not null before accessing their value
        if (spiInput && creditsInput) {
            const spiValue = parseFloat(spiInput.value) || 0;
            const creditsValue = parseInt(creditsInput.value) || 0;

            if (spiValue < 0) { // Check if SPI is negative
                negativeSPI = true;
            }
            if (spiValue < 0 || spiValue > 10) { // Check if SPI is out of range
                invalidSPI = true;
            }

            spiInputs.push(spiValue); // default to 0 if parsing fails
            creditInputs.push(creditsValue); // default to 0 if parsing fails
        }
    });

    if (negativeSPI) {
        alert("Please enter a valid input for SPI (greater than or equal to 0).");
        return; // Stop further processing
    }

    if (invalidSPI) {
        alert("Please enter valid SPI values between 0 and 10.");
        return; // Stop further processing
    }

    console.log("SPI Inputs:", spiInputs);
    console.log("Credits Inputs:", creditInputs);

    calculateNextSemester();
}

function calculateNextSemester() {
    const creditsNextSemesterInput = document.getElementById("nextSemesterCredits");
    const creditsNextSemester = creditsNextSemesterInput.value.trim();

    if (creditsNextSemester === "" || isNaN(parseInt(creditsNextSemester))) {
        alert("Invalid input. Please enter a valid number for credits.");
        return;
    }

    const exp = parseFloat(document.getElementById("exp").value);
    const tableRows = document.querySelectorAll("#spiInputTable tr");

    let totalCredits = 0;
    let totalCreditsTimesSPI = 0;

    tableRows.forEach(row => {
        const inputs = row.querySelectorAll("input[type='number']");
        if (inputs.length === 2) {
            const credits = parseInt(inputs[1].value);
            const spi = parseFloat(inputs[0].value);

            if (!isNaN(credits) && !isNaN(spi)) {
                totalCredits += credits;
                totalCreditsTimesSPI += credits * spi;
            }
        }
    });

    const numerator = exp * (parseFloat(creditsNextSemester) + totalCredits) - totalCreditsTimesSPI;
    const c = numerator / parseFloat(creditsNextSemester);

    let resultText;
    if (c >= 0 && c <= 10) {
        resultText = `SPI of the next semester should be ${c.toFixed(2)}`; //fixing it two two decimal places
    } else {
        resultText = "Sorry, but it is not possible to attain this CPI with your previous credits";
    }

    document.getElementById("span_re_ga").textContent = resultText;
}
