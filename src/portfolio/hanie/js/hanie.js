document.addEventListener('DOMContentLoaded', () => {
    // Get the print button element
    const printButton = document.getElementById('printButton');

    if (printButton) {
        printButton.addEventListener('click', () => {
            window.print();
        });
    } else {
        console.error("Print button with ID 'printButton' not found.");
    }
});

    function sendMessage(e) {
    e.preventDefault();
    alert("✅ Thank you! Your message has been received.");
    e.target.reset();
    }
