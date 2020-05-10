
window.r_squares = [
  {
    x: 100,
    y: 100,
    width: 100,
    height: 100,
    selected: true
  }, 

  {
    x: 230,
    y: 230,
    width: 100,
    height: 100,
    selected: false
  }, 
]

window.touchPointsSize = 8

function renderSchema(canvas) {
  var ctx = canvas.getContext('2d');
  ctx.lineWidth = 1;
  ctx.fillStyle = 'rgb(255, 255, 255)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeRect(0, 0, canvas.width, canvas.height);

  // NOT selected componnets rendering
  ctx.lineWidth = 1;
  ctx.fillStyle = 'rgb(255, 255, 255)';
  for (var i in r_squares) {
    var obj = r_squares[i]
    if (!obj.selected) {
      ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
      ctx.strokeRect(obj.x, obj.y, obj.width, obj.height);
    }
  }

  // selected components rendering
  for (var i in r_squares) {
    var obj = r_squares[i]
    if (obj.selected) {
      ctx.lineWidth = 1;
      ctx.fillStyle = 'rgb(200, 200, 200)';
      ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
      ctx.strokeRect(obj.x, obj.y, obj.width, obj.height);

      ctx.fillStyle = 'rgb(100, 100, 100)';

      ctx.fillRect(obj.x - touchPointsSize/2, obj.y - touchPointsSize/2, touchPointsSize, touchPointsSize);
      ctx.strokeRect(obj.x - touchPointsSize/2, obj.y - touchPointsSize/2, touchPointsSize, touchPointsSize);

      ctx.fillRect(obj.x + obj.width - touchPointsSize/2, obj.y - touchPointsSize/2, touchPointsSize, touchPointsSize);
      ctx.strokeRect(obj.x + obj.width - touchPointsSize/2, obj.y - touchPointsSize/2, touchPointsSize, touchPointsSize);

      ctx.fillRect(obj.x + obj.width - touchPointsSize/2, obj.y + obj.height - touchPointsSize/2, touchPointsSize, touchPointsSize);
      ctx.strokeRect(obj.x + obj.width - touchPointsSize/2, obj.y + obj.height - touchPointsSize/2, touchPointsSize, touchPointsSize);

      ctx.fillRect(obj.x - touchPointsSize/2, obj.y + obj.height - touchPointsSize/2, touchPointsSize, touchPointsSize);
      ctx.strokeRect(obj.x - touchPointsSize/2, obj.y + obj.height - touchPointsSize/2, touchPointsSize, touchPointsSize);
    }
  }
}

window.allowDown = false;
window.resizeObj = null;
window.doMovingObj = false;

function canvasOnMouseMove(e) {
  event = e || window.event; // IE-ism

  // e = Mouse click event.
  var rect = e.target.getBoundingClientRect();
  var x = e.clientX - rect.left; //x position within the element.
  var y = e.clientY - rect.top;  //y position within the element
  // console.warn(x, y);

  if (window.doMovingObj) {
    if (window.resizeObj != null) {
      var obj = r_squares[resizeObj.id];
      if (window.resizeObj.how == 'move') {
        obj.x = x - resizeObj.diffX;
        obj.y = y - resizeObj.diffY;
        renderSchema(e.target);
        return;
      }
      if (window.resizeObj.how == 'top-left') {
        obj.width = obj.x + obj.width - x;
        obj.x = x;
        obj.height = obj.y + obj.height - y;
        obj.y = y;
        renderSchema(e.target);
        return;
      }
      if (window.resizeObj.how == 'top-right') {
        obj.width = x - obj.x;
        obj.height = obj.y + obj.height - y;
        obj.y = y;
        renderSchema(e.target);
        return;
      }

      if (window.resizeObj.how == 'bottom-left') {
        obj.width = obj.x + obj.width - x;
        obj.x = x;
        obj.height = y - obj.y;
        renderSchema(e.target);
        return;
      }

      if (window.resizeObj.how == 'bottom-right') {
        obj.width = x - obj.x;
        obj.height = y - obj.y;
        renderSchema(e.target);
        return;
      }
    }
    return;
  }

  cursor = "default";
  window.allowDown = false;
  window.resizeObj = null;
  for (var i in r_squares) {
    var obj = r_squares[i];
    if (obj.selected) {
      // move
      if (
        y >= obj.y && y <= obj.y + obj.height
        && x >= obj.x && x <= obj.x + obj.width
      ) {
        cursor = "move";
        window.allowDown = true;
        window.resizeObj = { id: i, how: 'move'};
      }

      // top left 
      if (
        y >= obj.y - touchPointsSize/2 && y <= obj.y + touchPointsSize
        && x >= obj.x - touchPointsSize/2 && x <= obj.x + touchPointsSize
      ) {
        cursor = "nwse-resize";
        window.allowDown = true;
        window.resizeObj = { id: i, how: 'top-left'};
      }

      // top right
      if (
        y >= obj.y - touchPointsSize/2 && y <= obj.y + touchPointsSize
        && x >= obj.x + obj.width - touchPointsSize/2 && x <= obj.x + obj.width + touchPointsSize
      ) {
        cursor = "nesw-resize";
        window.allowDown = true;
        window.resizeObj = { id: i, how: 'top-right'};
      }

      // bottom left
      if (
        y >= obj.y + obj.height - touchPointsSize/2 && y <= obj.y + obj.height + touchPointsSize
        && x >= obj.x - touchPointsSize/2 && x <= obj.x + touchPointsSize
      ) {
        cursor = "nesw-resize";
        window.allowDown = true;
        window.resizeObj = { id: i, how: 'bottom-left'};
      }
      
      // bottom right
      if (
        y >= obj.y + obj.height - touchPointsSize/2 && y <= obj.y + obj.height + touchPointsSize
        && x >= obj.x + obj.width - touchPointsSize/2 && x <= obj.x + obj.width + touchPointsSize
      ) {
        cursor = "nwse-resize";
        window.allowDown = true;
        window.resizeObj = { id: i, how: 'bottom-right'};
      }

      if (window.allowDown) {
        e.target.style.cursor = cursor;
        return;
      }
    }
  }

  for (var i in r_squares) {
    var obj = r_squares[i];
    if (!obj.selected) {
      // select
      if (
        y >= obj.y && y <= obj.y + obj.height
        && x >= obj.x && x <= obj.x + obj.width
      ) {
        window.allowDown = true;
        e.target.style.cursor = "pointer";
        window.resizeObj = { id: i, how: 'can-select'};
        return;
      }
    }
  }
  e.target.style.cursor = "default";
}

function canvasOnMouseDown(e) {
  event = e || window.event; // IE-ism
  var rect = e.target.getBoundingClientRect();
  var x = e.clientX - rect.left; //x position within the element.
  var y = e.clientY - rect.top;  //y position within the element

  if (window.allowDown) {
    if (window.resizeObj != null) {
      var obj = r_squares[resizeObj.id];
      if (resizeObj.how == 'can-select') {
        for (var i in r_squares) {
          r_squares[i].selected = false;
        }
        obj.selected = true;
        window.resizeObj.how = 'move';
        renderSchema(e.target);
      }
      window.doMovingObj = true;
      resizeObj.diffX = x - obj.x
      resizeObj.diffY = y - obj.y
    }
  }
}

function canvasOnMouseUp(e) {
  event = e || window.event; // IE-ism
  var rect = e.target.getBoundingClientRect();
  var x = e.clientX - rect.left; //x position within the element.
  var y = e.clientY - rect.top;  //y position within the element

  if (window.doMovingObj) {
    if (window.resizeObj != null) {
      var obj = r_squares[resizeObj.id];
      window.doMovingObj = false;
      resizeObj = null;
    }
  }
}

function initCanvas() {
  var canvas = document.getElementById("show_design");
  renderSchema(canvas)
  canvas.onmousemove = canvasOnMouseMove;
  canvas.onmousedown = canvasOnMouseDown;
  canvas.onmouseup = canvasOnMouseUp;
}
