let canvas  = document.querySelector("canvas")
let c = canvas.getContext("2d")

canvas.style.width = innerWidth + "px"
canvas.style.height = innerHeight + "px"

canvas.width = innerWidth * devicePixelRatio
canvas.height = innerHeight * devicePixelRatio

//variables
let colors = ["yellow" , "white" , "magenta"]
let bubbles = []
let clickedbubble = undefined


function renderCanvas(){

    c.fillStyle = "rgba(13, 27, 58,.1)"
    c.fillRect(0 , 0 , canvas.width , canvas.height)

    //render spring and easing
    bubbles.forEach(bubble => { 

        if(bubble.ttl > 0){

            bubble.renderSpring()
            bubble.easeOut()

        }else{

            bubble.applyGravity()
        }

       
    })

    //remove bubble
    bubbles.forEach((bubble,index) => { 

        if(bubble.radiusX < .5 && bubble.radiusY < .5){

          bubbles.splice(index,1)

        }
    })

    console.log(bubbles)

    requestAnimationFrame(renderCanvas)
}


function removeBubble(bubble){

    for(var i = 0 ; i < bubbles.length ; i++){

        if(bubbles[i] === bubble){

            bubbles.splice(i,1)
        }
    }
}

function createNewbubbles(count , x , y , newsize){

    var angle = Math.PI * 2 / count

    for(var i = 0 ; i < count ; i++){
        
        var newBubble = new Ball(x , y , newsize , RandomColor(colors))
        newBubble.target.x = x + RandomNumber(500,1500) * Math.cos(angle + angle*i)
        newBubble.target.y = y + RandomNumber(500,1500) * Math.sin(angle + angle*i)
        newBubble.ttl = RandomInteger(10,20)
        bubbles.push(newBubble)
    }
}

addEventListener("click" , function(event){

    for(var i = 0 ; i < bubbles.length ; i++){

        if(bubbles[i].isInside(event.clientX * devicePixelRatio , event.clientY * devicePixelRatio)){

            clickedbubble = bubbles[i]
            
            if(clickedbubble){

                var x = clickedbubble.x 
                var y = clickedbubble.y
                var size = clickedbubble.size/2
                removeBubble(clickedbubble)
                createNewbubbles(3, x , y , size)
                clickedbubble = undefined
                
            }
          
            return

        }
    }

    var newbubble = new Ball(event.clientX * devicePixelRatio , event.clientY * devicePixelRatio , RandomNumber(100,400) , RandomColor(colors))
    newbubble.target.x = newbubble.x 
    newbubble.target.y = newbubble.y
    updateBubbles(event.clientX * devicePixelRatio , event.clientY * devicePixelRatio)
    bubbles.push(newbubble)
   

})

function updateTimeToLive(){

    for(var i = 0 ; i < bubbles.length ; i++){

        if(bubbles[i].ttl > 0){

            bubbles[i].ttl--

        }else{

            bubbles[i].ttl = 0

        }
        
    }

    setTimeout(updateTimeToLive,1000)
}


function updateBubbles(x,y){

    for(var i = 0 ; i < bubbles.length ; i++){

        var dx = x - bubbles[i].x 
        var dy = y - bubbles[i].y
        var angle = Math.atan2(dy,dx)

        bubbles[i].target.x = bubbles[i].x - 500 * Math.cos(angle)
        bubbles[i].target.y = bubbles[i].y - 500 * Math.sin(angle)

    }
}

updateTimeToLive()
renderCanvas()