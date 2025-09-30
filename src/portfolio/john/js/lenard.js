document.addEventListener('DOMContentLoaded', function () {
  emailjs.init("t-TVKXpygBu9st5lL");


  const form = document.getElementById('contact-form');
  if (!form) {
    console.error("Form with id='contact-form' not found");
    return;
  }


  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const serviceID = 'service_a2woqce';
    const templateID = 'template_5c6y6dm';

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
