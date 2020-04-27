
function loadYamlFile(url, func) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.send();
  
    request.onreadystatechange = function() {
      if (this.readyState != 4) return;
    
      if (this.status != 200) {
        console.log('Ошибка: ' + (this.status ? this.statusText : 'запрос не удался'));
        return;
      }
      func(this.responseText);
    }
}

function loadComponents() {
  var el = document.getElementById('list_components');
  for (var c_name in window.components) {
    var c = window.components[c_name];
    el.innerHTML += `<div class="component-info noselect">
    ` + c["name"] + `
    </div>`;
  }
}

document.addEventListener("DOMContentLoaded", function(event) {
  loadComponents();
  // TODO scroll
  // loadComponents()
  // loadComponents()
  // loadComponents()
  initCanvas();

  loadYamlFile("./example.yaml", function(yamlText) {
    console.log(yamlText);
    nativeObject = YAML.parse(yamlText);
    console.log(nativeObject);
      // TODO apply
  });
});