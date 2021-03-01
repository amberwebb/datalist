function datalistElement(id, listItems) {
  const dataListEl = document.createElement("datalist");
  dataListEl.setAttribute("id", id);
  dataListEl.setAttribute("style", "display: none");
  dataListEl.onkeydown = function(event) {
    dataListEvents(event, this, id, listItems);
  };
  document.body.appendChild(dataListEl);
}