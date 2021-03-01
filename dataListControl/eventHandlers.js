let keypressCounter = 0;

function dataListEvents(event, dataListEl, inputId, listItems) {
  const { keyCode } = event;
  const optionItems = dataListEl.childNodes;

  // Stop spacebar from scrolling the datalist
  if (keyCode === 32) {
    event.preventDefault();
  }

  // Set selected option on down arrow
  if (keyCode === 40) {
    keypressCounter += 1;
    if (optionItems[keypressCounter]) {
      optionItems[keypressCounter].classList.add("active-item");
      optionItems[keypressCounter - 1].classList.remove("active-item");
    }
  }

  // Set selected option on up arrow
  if (keyCode === 38) {
    keypressCounter -= 1;
    if (optionItems[keypressCounter]) {
      optionItems[keypressCounter].classList.add("active-item");
      optionItems[keypressCounter + 1].classList.remove("active-item");
    }
  }

  // Save selection on enter or tab
  if (keyCode === 13 || keyCode === 9) {
    event.preventDefault();
    const optionEl = Array.from(optionItems).find(option =>
      option.classList.contains("active-item")
    );
    selectOption(optionEl);
  }
}

// Close datalist when clicked outside input element
document.addEventListener("click", function(event) {
  if (event.target.nodeName !== "INPUT") {
    resetDataLists();
  }
});
