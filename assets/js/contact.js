/* =========================================
   CONTACT PAGE MODULE
   Only contact-specific features
========================================= */

export function initContactPage() {
  const isContactPage = document.body?.dataset?.page === "contact";
  if (!isContactPage) return;

  initContactForm();
}

/* =========================================
   CONTACT FORM
========================================= */

function initContactForm() {
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");
  const submitBtn = document.getElementById("contactSubmitBtn");

  if (!form || !submitBtn) return;

  /*
    Prevent duplicate submit listeners if main.js is reloaded
    or this module is initialized more than once.
  */
  if (form.dataset.contactInitialized === "true") return;
  form.dataset.contactInitialized = "true";

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    clearFormErrors(form);
    showStatus(status, "", "");

    const isValid = validateContactForm();

    if (!isValid) {
      showStatus(status, "Please complete all required fields correctly.", "error");
      return;
    }

    const formData = new FormData(form);
    const customSubject = document.getElementById("customSubject")?.value.trim();

    if (customSubject) {
      formData.set("subject", `[Portfolio Contact] ${customSubject}`);
    }

    const originalBtnHTML = submitBtn.innerHTML;

    submitBtn.disabled = true;
    submitBtn.innerHTML = `Sending... <i class="fa-solid fa-spinner fa-spin"></i>`;

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const result = await response.json();

      if (result.success) {
        showStatus(
          status,
          "Your message has been sent successfully. I will get back to you soon.",
          "success"
        );

        form.reset();
      } else {
        showStatus(
          status,
          "Something went wrong. Please try again or contact me directly.",
          "error"
        );
      }
    } catch (error) {
      showStatus(
        status,
        "Network error. Please try again or email me directly.",
        "error"
      );
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnHTML;
    }
  });
}

/* =========================================
   FORM VALIDATION
========================================= */

function validateContactForm() {
  let isValid = true;

  const requiredFields = [
    {
      id: "name",
      message: "Full name is required."
    },
    {
      id: "email",
      message: "Email ID is required."
    },
    {
      id: "phone",
      message: "Contact number is required."
    },
    {
      id: "customSubject",
      message: "Subject is required."
    },
    {
      id: "message",
      message: "Message is required."
    }
  ];

  requiredFields.forEach((item) => {
    const field = document.getElementById(item.id);

    if (!field || !field.value.trim()) {
      setFormError(field, item.message);
      isValid = false;
    }
  });

  const email = document.getElementById("email");

  if (email && email.value.trim() && !isValidEmail(email.value.trim())) {
    setFormError(email, "Please enter a valid email address.");
    isValid = false;
  }

  const phone = document.getElementById("phone");

  if (phone && phone.value.trim() && !isValidPhone(phone.value.trim())) {
    setFormError(phone, "Please enter a valid contact number.");
    isValid = false;
  }

  const message = document.getElementById("message");

  if (message && message.value.trim() && message.value.trim().length < 20) {
    setFormError(message, "Please add more context. Minimum 20 characters required.");
    isValid = false;
  }

  return isValid;
}

function setFormError(field, message) {
  if (!field) return;

  const group = field.closest(".contact-form-group");
  const error = group?.querySelector(".form-error");

  field.classList.add("is-invalid");

  if (error) {
    error.textContent = message;
  }
}

function clearFormErrors(form) {
  form.querySelectorAll(".is-invalid").forEach((field) => {
    field.classList.remove("is-invalid");
  });

  form.querySelectorAll(".form-error").forEach((error) => {
    error.textContent = "";
  });
}

function showStatus(status, message, type) {
  if (!status) return;

  status.textContent = message;
  status.className = "form-status";

  if (type) {
    status.classList.add(type);
  }
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
  const cleanedPhone = phone.replace(/\s+/g, "");
  return /^[+]?[\d-]{8,15}$/.test(cleanedPhone);
}