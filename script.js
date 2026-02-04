document.addEventListener("DOMContentLoaded", () => {
  /* Mobile navigation */
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileNav = document.querySelector(".mobile-nav");
  const backdrop = document.querySelector(".backdrop");
  const closeMobileNav = document.querySelector(".close-mobile-nav");

  if (menuToggle && mobileNav && backdrop && closeMobileNav) {
    const openNav = () => {
      mobileNav.classList.add("open");
      backdrop.classList.add("visible");
      document.body.classList.add("no-scroll");
    };

    const closeNav = () => {
      mobileNav.classList.remove("open");
      backdrop.classList.remove("visible");
      document.body.classList.remove("no-scroll");
    };

    menuToggle.addEventListener("click", openNav);
    closeMobileNav.addEventListener("click", closeNav);
    backdrop.addEventListener("click", closeNav);

    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeNav);
    });
  }

  /* Apply Now modal (Courses page) */
  const applyButtons = document.querySelectorAll(".apply-btn");
  const modal = document.getElementById("applyModal");
  const modalCourseName = document.getElementById("modalCourseName");
  const contactEmailBtn = document.getElementById("contactEmailBtn");
  const contactPhoneBtn = document.getElementById("contactPhoneBtn");
  const modalClose = document.querySelector(".modal-close");

  if (
    applyButtons.length &&
    modal &&
    modalCourseName &&
    contactEmailBtn &&
    contactPhoneBtn &&
    modalClose
  ) {
    let selectedCourse = "";

    const openModal = (courseName) => {
      selectedCourse = courseName;
      modalCourseName.textContent = courseName;
      modal.classList.add("open");
      document.body.classList.add("no-scroll");
    };

    const closeModal = () => {
      modal.classList.remove("open");
      document.body.classList.remove("no-scroll");
    };

    applyButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const courseName =
          btn.dataset.course ||
          btn.closest(".course-card")?.querySelector(".course-title")
            ?.textContent ||
          "INSATECH Course";
        openModal(courseName.trim());
      });
    });

    modalClose.addEventListener("click", closeModal);

    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        closeModal();
      }
    });

    // TODO: Replace with your actual email address
    const contactEmail = "YOUR_EMAIL_HERE";
    const phoneNumber = "08033498452";

    contactEmailBtn.addEventListener("click", () => {
      const subject = `Course Application: ${selectedCourse}`;
      const bodyLines = [
        "Dear INSATECH Team,",
        "",
        "I would like to apply for the following course:",
        `Course: ${selectedCourse}`,
        "",
        "Name:",
        "Phone number:",
        "Preferred start date:",
        "Additional information:",
        "",
        "Thank you."
      ];
      const body = encodeURIComponent(bodyLines.join("\n"));

      const mailtoLink = `mailto:${encodeURIComponent(
        contactEmail
      )}?subject=${encodeURIComponent(subject)}&body=${body}`;

      window.location.href = mailtoLink;
      closeModal();
    });

    contactPhoneBtn.addEventListener("click", () => {
      window.location.href = `tel:${phoneNumber}`;
      closeModal();
    });
  }
});