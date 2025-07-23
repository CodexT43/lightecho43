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

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    const value = input.value.trim().toLowerCase();
    const currentPath = window.location.pathname;

    // 🔹 On the start page
    if (currentPath === "/" || currentPath === "/index.html") {
      if (value === "yes") {
        window.location.href = "/pulse-sequence/eve-mire/index.html";
      } else {
        showError("Incorrect.");
      }
      return;
    }

    // 🔹 On the eve-mire (Fragment 1) page
    if (currentPath.includes("/pulse-sequence/eve-mire/index.html")) {
      const res = await fetch("/api/check-key", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: value }),
      });

      const data = await res.json();

      if (data.success) {
        window.location.href = "/pulse-sequence/eve-mire/mire-fragment-2/";
      } else {
        showError("Incorrect.");
      }
      return;
    }

    // 🔹 Any other page fallback
    showError("Unhandled location.");
  });

  function showError(message) {
    feedback.textContent = message;
    feedback.style.display = "block";
    input.value = "";
    typedText.textContent = "";
    input.focus();

    setTimeout(() => {
      feedback.style.display = "none";
    }, 2000);
  }
});
