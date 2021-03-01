function dataList(dataListId, optionsList) {
  let options = "";
  optionsList.forEach((optionList, index) => {
    const optionText = optionList.text;
    const optionValue = optionList.value;

    if (optionText && optionValue) {
      options += `<div class="list-items" tabindex=${index +
        2} onclick='selectOption(this)' data-value="${optionValue}"><div class="option-value">${optionValue}</div><div>${optionText}</div></div>`;
    } else {
      options += `<div class="list-items" onclick="selectOption(this)" data-value="${optionList}">${optionList}</div>`;
    }
  });
  document.getElementById(dataListId).innerHTML = options;
}

function loadDataList(dataListId, listItems, inputId) {
  dataList(dataListId, listItems);
}

function closeOtherDataLists(dataListId) {
  const otherOpenDatalists = Array.from(document.querySelectorAll("datalist")).filter(
    list => list.id !== dataListId && list.style.display === "block"
  );

  if (otherOpenDatalists.length) {
    otherOpenDatalists.forEach(list => {
      list.style.display = "none";
    });
  }
}

function displayDataList(inputEl, dataListId) {
  const inputValue = inputEl.value;
  const allowsMultiple = inputEl.multiple;
  // Prevent more than one datalist from being open.
  closeOtherDataLists(dataListId);
  // Prevents datalist from displaying unless comma is entered after value in element with 'multiple' property.
  const isCommaDelimited =
    allowsMultiple && isLastValueCommaDelimited(inputValue);
  if (!inputValue.length || isCommaDelimited) {
    const datalist = document.getElementById(dataListId);
    datalist.setAttribute("data-inputId", inputEl.id);
    datalist.style.display = "block";
    datalist.style.left = inputEl.offsetLeft + "px";
    datalist.style.top = inputEl.offsetTop + inputEl.offsetHeight + "px";
  }
}

function resetDataLists() {
  const dataLists = document.querySelectorAll("datalist");
  dataLists.forEach(dataList => {
    dataList.style.display = "none";
    dataList.setAttribute("tabindex", "-1");
  });
}

function filterData(inputEl, dataListId, listItems) {
  const valuesArr = inputEl.value.split(",");
  const value = valuesArr[valuesArr.length - 1];

  displayDataList(inputEl, dataListId);

  const filteredArray = listItems.reduce((acc, curr) => {
    const doesCurrentItemIncludeValue = curr.value
      ? curr.value.includes(value) || curr.text.includes(value)
      : curr.includes(value);

    if (doesCurrentItemIncludeValue) {
      acc = [...acc, curr];
    }

    return acc;
  }, []);

  // Set datalist with filtered values
  dataList(dataListId, filteredArray);
}

function handleKeyUp(inputEl, dataListId, listItems) {
  const dataListElem = document.getElementById(dataListId);
  const optionItems = dataListElem.childNodes;
  filterData(inputEl, dataListId, listItems);
  // Focus the datalist element and set the first one to selected
  if (event.keyCode === 40) {
    dataListElem.focus();
    dataListElem.setAttribute("tabindex", "1");
    optionItems[0].classList.add("active-item");
  }

  // Close datalist when esc is clicked
  if (event.keyCode === 27) {
    resetDataLists();
    dataList(dataListId, listItems);
  }
}
