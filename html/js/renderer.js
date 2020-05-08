
window.r_squares = [
    {
        x: 100,
        y: 100,
        width: 100,
        height: 100,
        selected: true
    }, 

    {
        x: 200,
        y: 200,
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

function initCanvas() {
    var canvas = document.getElementById("show_design");
    renderSchema(canvas)
    
    canvas.onmousemove = function(evt) {
        // console.log(evt)
    }

}
