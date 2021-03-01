function selectOption(optionEl) {
  const selectedValue = optionEl.getAttribute("data-value");
  const inputId = optionEl.parentElement.getAttribute("data-inputid");
  const inputEl = document.getElementById(inputId);
  const isMultiple = inputEl.multiple;
  let values = inputEl.value;

  if (!values.length || !isMultiple) {
    inputEl.value = selectedValue;
  }

  if (values.length > 0 && isMultiple) {
    /* Check if the value in the input ends with a comma. 
    If not, it is not a valid value and can be overwritten. */

    const isCommaDelimited = isLastValueCommaDelimited(values);

    if (isCommaDelimited) {
      inputEl.value = inputEl.value += selectedValue;
    } else {
      const valueArray = inputEl.value.split(",");
      const filteredValues = [
        ...valueArray.filter((item, index) => index !== valueArray.length - 1),
        selectedValue
      ];

      if (filteredValues.length === 1) {
        inputEl.value = filteredValues[0];
      } else {
        inputEl.value = filteredValues.join(",");
      }
    }
  }

  resetDataLists();
}
