function mouseDistanceFromElement(mouseEvent, element) {
    let $n = element,
        mY = mouseEvent.pageY,
        off = $n.getBoundingClientRect(),
        ny1 = off.top + document.body.scrollTop, // top
        ny2 = ny1 + $n.offsetHeight, // bottom
        intersectY = ny2 >= mY && mY >= ny1,
        to = {
            y: intersectY ? mY : ny2 < mY ? ny2 : ny1
        },
        distY = to.y - mY;

    return Math.floor(distY); // this will output 0 when next to your element vertically.
}

const toolbox = document.getElementById("navigator-toolbox");
var height = toolbox.clientHeight;
var mouseover = false
var focusin = false

function showBar(){
    toolbox.style.height=`${height}px`;
    toolbox.style.top = `${10}px`;
    toolbox.style.overflow = "visible";
}

function hideBar(){
    toolbox.style.height = "0px";
    toolbox.style.top = "0px";
    toolbox.style.overflow = "hidden";
    // toolbox.style.height=`${0}px`;
}

toolbox.addEventListener("mouseover", function (e){
    mouseover = true
})

toolbox.addEventListener("mouseout", function (e){
    mouseover = false
})

toolbox.addEventListener("focusin", function(e){
    // make sure bar doesn't dissapear if the user moves their mouse while typeing in the searchbar
    showBar()
    focusin = true
})
toolbox.addEventListener("focusout", function(e){
    hideBar()
    focusin = false
})

document.addEventListener("mousemove", function (e) {
    var threshold = 1/80 * window.screen.availHeight;
    var distance = mouseDistanceFromElement(e, toolbox) *-1;
    console.log(distance)
    
    if (distance > height && mouseover == false && focusin == false) {
        hideBar();
    } 
    if (distance < threshold) {
        showBar();
    }
})


