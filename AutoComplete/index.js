class Autocomplete {
  constructor({ inputId, inputType, isRequired, dataListId, listItems }) {
    this.inputId = inputId;
    this.inputType = inputType;
    this.isRequired = isRequired;
    this.dataListId = dataListId;
    this.listItems = listItems;
  }

  createInputElement = function() {
    const inputEl = document.createElement("input");
    const type = this.inputType;
    const inputId = this.inputId;
    const isRequired = this.isRequired;
    inputEl.setAttribute("id", inputId);
    inputEl.setAttribute("type", type);
    inputEl.setAttribute("required", isRequired)

    if (type === "email") {
      inputEl.setAttribute("multiple", true);
    }   

    return inputEl;
  };

  createDataList = function() {
    const id = this.id;
    const listItems = this.listItems;
    const dataListEl = document.createElement("datalist");
    dataListEl.setAttribute("id", id);
    dataListEl.setAttribute("style", "display: none");
    dataListEl.onkeydown = function(event) {
      dataListEvents(event, this, id, listItems);
    };
    return dataListEl;
  };

  createAutocomplete = function() {
    const input = this.createInputElement();
    const dataList = this.createDataList();
    const inputContainer = document.createElement("div");
    inputContainer.appendChild(input)
    inputContainer.appendChild(dataList);
    return inputContainer;
  }
}
