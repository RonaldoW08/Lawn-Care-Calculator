// Add event listeners when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get button elements
    var calculateButton = document.getElementById('calculate-button');
    var resetButton = document.getElementById('reset-button');

    // Add click event listeners
    if (calculateButton) {
        calculateButton.addEventListener('click', calculateBill);
    }
    if (resetButton) {
        resetButton.addEventListener('click', resetForm);
    }
});

// Function to calculate the lawn care bill
function calculateBill() {
    // Get input values from the form
    var name = document.getElementById('customer-name').value;
    var address = document.getElementById('customer-address').value;
    var phone = document.getElementById('customer-phone').value;
    var widthInput = document.getElementById('lawn-width').value;
    var lengthInput = document.getElementById('lawn-length').value;
    var lawnCare = document.getElementById('lawn-care').value;
    var errorDiv = document.getElementById('error-message');
    var outputContainer = document.getElementById('output-container');
    var billOutput = document.getElementById('bill-output');

    // Parse width and length as numbers
    var width = parseFloat(widthInput);
    var length = parseFloat(lengthInput);

    // Validate inputs
    var errors = [];
    if (!name) errors.push("Please enter a name.");
    if (!address) errors.push("Please enter an address.");
    if (!phone) errors.push("Please enter a phone number.");
    if (isNaN(width) || width < 2 || width > 30) errors.push("Width must be a number between 2 and 30 meters.");
    if (isNaN(length) || length < 2 || length > 50) errors.push("Length must be a number between 2 and 50 meters.");
    if (!['none', 'luxury', 'standard', 'economy'].includes(lawnCare)) errors.push("Invalid lawn care selection.");

    // Display errors if any, and hide output
    if (errors.length > 0) {
        errorDiv.innerHTML = errors.join('<br>');
        outputContainer.style.display = 'none';
        return;
    } else {
        errorDiv.innerHTML = '';
    }

     // Confirm submission
    if (!confirm('Generate bill?')) return;

    // Calculate costs
    var area = width * length;
    var laborCost = area * 0.50; // £0.50 per sq.m
    var lawnCareCost = 0;
    if (lawnCare === 'luxury') lawnCareCost = area * 1.15;
    else if (lawnCare === 'standard') lawnCareCost = area * 0.80;
    else if (lawnCare === 'economy') lawnCareCost = area * 0.45;

    var totalExclVat = laborCost + lawnCareCost;
    var vat = totalExclVat * 0.20; // 20% VAT
    var totalInclVat = totalExclVat + vat;

    // Format the bill
    var bill = 'Lawn Care Bill\n' +
               '-------------\n' +
               'Name: ' + name + '\n' +
               'Address: ' + address + '\n' +
               'Phone: ' + phone + '\n' +
               '-------------\n' +
               'Area: ' + area.toFixed(2) + ' sq.m\n' +
               'Labor Cost: £' + laborCost.toFixed(2) + '\n' +
               'Lawn Care: £' + lawnCareCost.toFixed(2) + ' (' + (lawnCare === 'none' ? 'None' : lawnCare) + ')\n' +
               'Total (Excl. VAT): £' + totalExclVat.toFixed(2) + '\n' +
               'VAT (20%): £' + vat.toFixed(2) + '\n' +
               'Total (Incl. VAT): £' + totalInclVat.toFixed(2);

    // Display the bill
    billOutput.textContent = bill;
    outputContainer.style.display = 'block';
}

// Function to reset the form
function resetForm() {
    document.getElementById('customer-name').value = '';
    document.getElementById('customer-address').value = '';
    document.getElementById('customer-phone').value = '';
    document.getElementById('lawn-width').value = '';
    document.getElementById('lawn-length').value = '';
    document.getElementById('lawn-care').value = 'none';
    document.getElementById('output-container').style.display = 'none';
    document.getElementById('error-message').innerHTML = '';
}