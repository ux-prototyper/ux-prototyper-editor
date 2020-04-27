
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

document.addEventListener("DOMContentLoaded", function(event) {
    loadYamlFile("./example.yaml", function(yamlText) {
      console.log(yamlText);
      nativeObject = YAML.parse(yamlText);
      console.log(nativeObject);
        // TODO apply
    });
});