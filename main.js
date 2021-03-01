addEventListener("click", ({ target: a }) => {
  if (a.hasAttribute("data-show-cc-fields")) {
    const ccFields = document.getElementById("cc-fields");
    ccFields.replaceWith(ccFields.content),
      document.getElementById("cc").focus(),
      a.remove();
  }
});