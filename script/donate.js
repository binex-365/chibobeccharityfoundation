import {sideY} from './toggle.js';

// Copy Account Number
function copyAccountNumber() {
  const accNum = document.getElementById('accountNumber').textContent;
  navigator.clipboard.writeText(accNum);
  const btn = document.querySelector('.copy-btn');
  const text = btn.querySelector('.copy-text');
  text.textContent = "Copied!";
  btn.classList.add('copied');
  setTimeout(() => {
    text.textContent = "Copy";
    btn.classList.remove('copied');
  }, 1200);
}

// Flutterwave Payment Integration
const donateForm = document.getElementById('paystackForm');
const sentSuccess = document.getElementById('sentSuccess');
donateForm.addEventListener('submit', function(e) {
  e.preventDefault();
  let donorName = document.getElementById('donorName').value;
  let donorEmail = document.getElementById('donorEmail').value;
  let amount = document.getElementById('amount').value;

  if (!donorName || !donorEmail || !amount || amount < 100) {
    alert("Please fill all fields and enter a valid amount (minimum ₦100).");
    return;
  }

  FlutterwaveCheckout({
    public_key: "FLWPUBK_TEST-10fe7586ee7f207eada460f86cee1e66-X", // <-- Replace with your real Flutterwave public key!
    tx_ref: "CHIBOBEC-" + Date.now(),
    amount: parseInt(amount),
    currency: "NGN",
    payment_options: "card,ussd,banktransfer",
    customer: {
      email: donorEmail,
      name: donorName,
    },
    customizations: {
      title: "Chibobec Charity Foundation",
      description: "Donation",
      logo: "images/log.png",
    },
    callback: function (data) {
      donateForm.style.display = 'none';
      sentSuccess.style.display = 'flex';
    },
    onclose: function() {
      alert('Payment window closed.');
    }
  });
});

sideY();