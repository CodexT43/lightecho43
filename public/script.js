document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("input-form");
    const input = document.getElementById("response");
    const typedText = document.getElementById("typed-text");
    const cursor = document.getElementById("cursor");
    const feedback = document.getElementById("feedback");
  
    input.focus();
  
    document.addEventListener("click", () => input.focus());
  
    input.addEventListener("input", () => {
      typedText.textContent = input.value;
    });
  
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const value = input.value.trim().toLowerCase();
  
      if (value === "yes") {
       window.location.href = "pulse-sequence/eve-mire/index.html";

      } else {
        feedback.textContent = "Incorrect.";
        feedback.style.display = "block";
        input.value = "";
        typedText.textContent = "";
        input.focus();
  
        setTimeout(() => {
          feedback.style.display = "none";
        }, 2000);
      }
    });
  });
  