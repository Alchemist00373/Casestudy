document.addEventListener('DOMContentLoaded', function () {
  emailjs.init("t-TVKXpygBu9st5lL"); // Your EmailJS public key

  const form = document.getElementById('contact-form');
  if (!form) {
    console.error("Form with id='contact-form' not found");
    return;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const serviceID = 'service_zgk114s';       
    const templateID = 'template_x7q9jr9';       

    emailjs.sendForm(serviceID, templateID, form)
      .then(function (response) {
        console.log('SUCCESS', response);
        alert("✅ Message sent successfully! We'll get back to you soon.");
        form.reset();
      }, function (error) {
        console.error('FAILED', error);
        alert("❌ Failed to send message. Check console for details.");
      });
  });
});
