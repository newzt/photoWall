function down(e) {
    this.strX = e.pageX;
    this.strY = e.pageY;
    this.strL = this.offsetLeft;
    this.strT = this.offsetTop;
    if (this.setCapture) {
        this.setCapture();
        ztEvent.on(this, "mousemove", move);
        ztEvent.on(this, "mouseup", up);
    } else {
        this.MOVE = ztEvent.processThis(move, this);
        this.UP = ztEvent.processThis(up, this);
        ztEvent.on(document, "mousemove", this.MOVE);
        ztEvent.on(document, "mouseup", this.UP);
    }

    ztEvent.fire.call(this, "ztDragStart", e);
}

function move(e) {
    var curL = e.pageX - this.strX + this.strL;
    var curT = e.pageY - this.strY + this.strT;
    this.style.left = curL + "px";
    this.style.top = curT + "px";

    ztEvent.fire.call(this, "ztDragMove", e);
}

function up(e) {
    if (this.releaseCapture) {
        this.releaseCapture();
        ztEvent.off(this, "mousemove", move);
        ztEvent.off(this, "mouseup", up);
    } else {
        ztEvent.off(document, "mousemove", this.MOVE);
        ztEvent.off(document, "mouseup", this.UP);
    }

    ztEvent.fire.call(this, "ztDragEnd", e);
}