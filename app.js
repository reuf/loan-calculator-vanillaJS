// Listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e){
  // Hide results
  document.getElementById('results').style.display = 'none';
  
  // Show loader
  document.getElementById('loading').style.display = 'block';
  setTimeout(calculateResults, 500);
  e.preventDefault();
});

// Calc results
function calculateResults(e){
  // Setting timer for showing loader my way
  // setTimeout(() => {
  //   document.getElementById('loading').hidden = true;
  // }, 500);
  // document.getElementById('loading').hidden = false;
  
  // Get UI vars
  const loanAmount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const yearsToRepay = document.getElementById('years');

  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  // Formulas for calculation
  const principal = parseFloat(loanAmount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const caluclatedPayments = parseFloat(yearsToRepay.value) * 12;

  // Compute monthly payments
  const x = Math.pow(1+calculatedInterest, caluclatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x-1);

  if(isFinite(monthly)){
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * caluclatedPayments).toFixed(2);
    totalInterest.value = ((monthly * caluclatedPayments) - principal).toFixed(2);

    // Show results
    document.getElementById('results').style.display = 'block';
    document.getElementById('loading').style.display = 'none';
  } else{
    showError("Please check your numbers.");
  }
}

function showError(error){
  // Hide loading and results
  document.getElementById('results').style.display = 'none';
  document.getElementById('loading').style.display = 'none';
  
  // Create a div
  const errorDiv = document.createElement('div');
  
  // Get card as parent div and put the error div above heading
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  // Add class
  errorDiv.className = 'alert alert-danger';

  // Create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));

  // Insert error  above heading
  card.insertBefore(errorDiv, heading);

  // Clear error after 3 seconds
  setTimeout(() => {
    document.querySelector('.alert').remove();
  }, 3000);
}