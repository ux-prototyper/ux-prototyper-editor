
function UXProtoEditor(elemId) {
  var self = this;
  self.components = [];
  self.canvasId = elemId;
  self.canvas = document.getElementById(elemId);
  self.touchPointsSize = 8
  self.allowDown = false;
  self.resizeObj = null;
  self.doMovingObj = false;

  self.render = function() {
    var ctx = self.canvas.getContext('2d');
    ctx.lineWidth = 1;
    ctx.fillStyle = 'rgb(255, 255, 255)';
    ctx.fillRect(0, 0, self.canvas.width, self.canvas.height);
    ctx.strokeRect(0, 0, self.canvas.width, self.canvas.height);

    // NOT selected componets rendering
    ctx.lineWidth = 1;
    ctx.fillStyle = 'rgb(255, 255, 255)';
    for (var i in self.components) {
      var obj = self.components[i]
      if (!obj.selected) {
        ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
        ctx.strokeRect(obj.x, obj.y, obj.width, obj.height);
      }
    }

    // selected components rendering
    for (var i in self.components) {
      var obj = self.components[i]
      if (obj.selected) {
        ctx.lineWidth = 1;
        ctx.fillStyle = 'rgb(200, 200, 200)';
        ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
        ctx.strokeRect(obj.x, obj.y, obj.width, obj.height);

        ctx.fillStyle = 'rgb(100, 100, 100)';

        ctx.fillRect(obj.x - self.touchPointsSize/2, obj.y - self.touchPointsSize/2, self.touchPointsSize, self.touchPointsSize);
        ctx.strokeRect(obj.x - self.touchPointsSize/2, obj.y - self.touchPointsSize/2, self.touchPointsSize, self.touchPointsSize);

        ctx.fillRect(obj.x + obj.width - self.touchPointsSize/2, obj.y - self.touchPointsSize/2, self.touchPointsSize, self.touchPointsSize);
        ctx.strokeRect(obj.x + obj.width - self.touchPointsSize/2, obj.y - self.touchPointsSize/2, self.touchPointsSize, self.touchPointsSize);

        ctx.fillRect(obj.x + obj.width - self.touchPointsSize/2, obj.y + obj.height - self.touchPointsSize/2, self.touchPointsSize, self.touchPointsSize);
        ctx.strokeRect(obj.x + obj.width - self.touchPointsSize/2, obj.y + obj.height - self.touchPointsSize/2, self.touchPointsSize, self.touchPointsSize);

        ctx.fillRect(obj.x - self.touchPointsSize/2, obj.y + obj.height - self.touchPointsSize/2, self.touchPointsSize, self.touchPointsSize);
        ctx.strokeRect(obj.x - self.touchPointsSize/2, obj.y + obj.height - self.touchPointsSize/2, self.touchPointsSize, self.touchPointsSize);
      }
    }
  }

  self.apply = function(v) {
    self.view_title = v.title;
    self.view_id = v.id;
    self.components = [];
    for (var i in v.components) {
      var c = v.components[i];
      self.components.push({
        id: c.id, 
        type: c.type,
        x: 100,
        y: 100,
        width: 100,
        height: 100,
        selected: false
      })
    }
    self.render();
  }

  self.canvasOnMouseMove = function(e) {
    event = e || window.event; // IE-ism
  
    // e = Mouse click event.
    var rect = e.target.getBoundingClientRect();
    var x = e.clientX - rect.left; //x position within the element.
    var y = e.clientY - rect.top;  //y position within the element
    // console.warn(x, y);
  
    if (self.doMovingObj) {
      if (self.resizeObj != null) {
        var obj = self.components[self.resizeObj.id];
        if (self.resizeObj.how == 'move') {
          obj.x = x - self.resizeObj.diffX;
          obj.y = y - self.resizeObj.diffY;
          self.render();
          return;
        }
        if (self.resizeObj.how == 'top-left') {
          obj.width = obj.x + obj.width - x;
          obj.x = x;
          obj.height = obj.y + obj.height - y;
          obj.y = y;
          self.render(e.target);
          return;
        }
        if (self.resizeObj.how == 'top-right') {
          obj.width = x - obj.x;
          obj.height = obj.y + obj.height - y;
          obj.y = y;
          self.render(e.target);
          return;
        }
  
        if (self.resizeObj.how == 'bottom-left') {
          obj.width = obj.x + obj.width - x;
          obj.x = x;
          obj.height = y - obj.y;
          self.render();
          return;
        }
  
        if (self.resizeObj.how == 'bottom-right') {
          obj.width = x - obj.x;
          obj.height = y - obj.y;
          self.render();
          return;
        }
      }
      return;
    }
  
    cursor = "default";
    self.allowDown = false;
    self.resizeObj = null;
    for (var i in self.components) {
      var obj = self.components[i];
      if (obj.selected) {
        // move
        if (
          y >= obj.y && y <= obj.y + obj.height
          && x >= obj.x && x <= obj.x + obj.width
        ) {
          cursor = "move";
          self.allowDown = true;
          self.resizeObj = { id: i, how: 'move'};
        }
  
        // top left 
        if (
          y >= obj.y - self.touchPointsSize/2 && y <= obj.y + self.touchPointsSize
          && x >= obj.x - self.touchPointsSize/2 && x <= obj.x + self.touchPointsSize
        ) {
          cursor = "nwse-resize";
          self.allowDown = true;
          self.resizeObj = { id: i, how: 'top-left'};
        }
  
        // top right
        if (
          y >= obj.y - self.touchPointsSize/2 && y <= obj.y + self.touchPointsSize
          && x >= obj.x + obj.width - self.touchPointsSize/2 && x <= obj.x + obj.width + self.touchPointsSize
        ) {
          cursor = "nesw-resize";
          self.allowDown = true;
          self.resizeObj = { id: i, how: 'top-right'};
        }
  
        // bottom left
        if (
          y >= obj.y + obj.height - self.touchPointsSize/2 && y <= obj.y + obj.height + self.touchPointsSize
          && x >= obj.x - self.touchPointsSize/2 && x <= obj.x + self.touchPointsSize
        ) {
          cursor = "nesw-resize";
          self.allowDown = true;
          self.resizeObj = { id: i, how: 'bottom-left'};
        }
        
        // bottom right
        if (
          y >= obj.y + obj.height - self.touchPointsSize/2 && y <= obj.y + obj.height + self.touchPointsSize
          && x >= obj.x + obj.width - self.touchPointsSize/2 && x <= obj.x + obj.width + self.touchPointsSize
        ) {
          cursor = "nwse-resize";
          self.allowDown = true;
          self.resizeObj = { id: i, how: 'bottom-right'};
        }
  
        if (self.allowDown) {
          e.target.style.cursor = cursor;
          return;
        }
      }
    }
  
    for (var i in self.components) {
      var obj = self.components[i];
      if (!obj.selected) {
        // select
        if (
          y >= obj.y && y <= obj.y + obj.height
          && x >= obj.x && x <= obj.x + obj.width
        ) {
          self.allowDown = true;
          e.target.style.cursor = "pointer";
          self.resizeObj = { id: i, how: 'can-select'};
          return;
        }
      }
    }
    e.target.style.cursor = "default";
  }

  self.canvasOnMouseDown = function(e) {
    event = e || window.event; // IE-ism
    var rect = e.target.getBoundingClientRect();
    var x = e.clientX - rect.left; //x position within the element.
    var y = e.clientY - rect.top;  //y position within the element

    if (self.allowDown) {
      if (self.resizeObj != null) {
        var obj = self.components[self.resizeObj.id];
        if (self.resizeObj.how == 'can-select') {
          for (var i in self.components) {
            self.components[i].selected = false;
          }
          obj.selected = true;
          self.resizeObj.how = 'move';
          self.render(e.target);
        }
        self.doMovingObj = true;
        self.resizeObj.diffX = x - obj.x
        self.resizeObj.diffY = y - obj.y
      }
    }
  }

  self.canvasOnMouseUp = function(e) {
    event = e || window.event; // IE-ism
    var rect = e.target.getBoundingClientRect();
    var x = e.clientX - rect.left; //x position within the element.
    var y = e.clientY - rect.top;  //y position within the element

    if (self.doMovingObj) {
      if (self.resizeObj != null) {
        var obj = self.components[self.resizeObj.id];
        self.doMovingObj = false;
        self.resizeObj = null;
      }
    }
  }

  self.canvas.onmousemove = self.canvasOnMouseMove;
  self.canvas.onmousedown = self.canvasOnMouseDown;
  self.canvas.onmouseup = self.canvasOnMouseUp;
}