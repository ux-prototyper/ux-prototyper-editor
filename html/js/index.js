
/*function loadYamlFile(url, func) {
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
}*/

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
  window.viewEditor = new UXProtoEditor("show_design");
  yamlText = document.getElementById('yaml_conf').innerHTML
  window.proj = YAML.parse(yamlText);
  // console.log(example);
  document.getElementById('project_name').innerHTML = proj.project.name
  document.getElementById('project_version').innerHTML = proj.project.version
  document.getElementById('project_views').innerHTML = "";
  for (var i in proj.views) {
    var v = proj.views[i];
    document.getElementById('project_views').innerHTML
      += '<div class="uxp-proj-view" onclick="click_load_view(this);" view-id="' + v.id + '">' + v.title + '</div>';
  }

  /*loadYamlFile("./example.yaml", function(yamlText) {
    console.log(yamlText);
    nativeObject = YAML.parse(yamlText);
    console.log(nativeObject);
      // TODO apply
  });*/
});


function switch_to_editor() {
  document.getElementById('tab_yaml').classList.remove('active');
  document.getElementById('tab_view_editor').classList.add('active');

  document.getElementById('show_design').style.display = '';
  document.getElementById('yaml_conf').style.display = 'none';
}

function switch_to_yaml() {
  document.getElementById('tab_yaml').classList.add('active');
  document.getElementById('tab_view_editor').classList.remove('active');

  document.getElementById('show_design').style.display = 'none';
  document.getElementById('yaml_conf').style.display = '';
}

function click_load_view(e) {
  var viewid = e.getAttribute("view-id");
  for (var i in window.proj.views) {
    var v = window.proj.views[i]
    if (v.id == viewid) {
      window.viewEditor.apply(v);
    }
  }
}
