class Ball{

    constructor(x , y , size , color){

        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.radiusX = 0
        this.radiusY = 0
        this.endRadiusX = this.size/2
        this.endRadiusY = this.size/2

        this.spring = {

            x:.03,
            y:.01
        }

        this.acceleration = {

            x: 0,
            y: 0
        }

        this.velocity = {

            x: 0,
            y: 0
        }

        this.difference = {

            x: 0,
            y: 0

        }

        this.speed = {

            x: 0,
            y: 0
        }

        this.target = {

            x:0,
            y:0
        }

        this.distance = {

            x: 0,
            y: 0
        }

        this.easing = .05
        this.ay = 0
        this.vy = 0
        this.ttl = 4
        this.vy = 3
     
    }

    render(){

        c.save()
        c.beginPath()
        c.fillStyle = this.color;
        c.ellipse(this.x , this.y , this.size/2 , this.size/2 , 0 , 0 , 2 * Math.PI)
        c.fill()
        c.closePath()
        c.restore()

    }

    renderSpring(){

        this.difference.x = this.endRadiusX - this.radiusX 
        this.difference.y = this.endRadiusY - this.radiusY

        this.acceleration.x = this.difference.x * this.spring.x 
        this.acceleration.y = this.difference.y * this.spring.y

        this.velocity.x += this.acceleration.x 
        this.velocity.y += this.acceleration.y 

        this.velocity.x *= .98
        this.velocity.y *= .98

        this.radiusX += this.velocity.x 
        this.radiusY += this.velocity.y 

        c.save()
        c.beginPath()
        c.fillStyle = this.color;
        c.ellipse(this.x , this.y , this.radiusX , this.radiusY , 0 , 0 , 2 * Math.PI)
        c.fill()
        c.closePath()
        c.restore()

    }

    isInside(x,y){

        if(x > this.x - this.radiusX && x < this.x + this.radiusX && y > this.y - this.radiusY && y < this.y + this.radiusY){

            return true
        }
    }

    easeOut(){


        this.distance.x = this.target.x - this.x 
        this.distance.y = this.target.y - this.y
        this.speed.x = this.distance.x * this.easing
        this.speed.y = this.distance.y * this.easing
        this.x += this.speed.x 
        this.y += this.speed.y
       
      
    }

    applyGravity(){

        c.save()
        c.beginPath()
        c.fillStyle = this.color;
        c.ellipse(this.x , this.y , this.radiusX , this.radiusY , 0 , 0 , 2 * Math.PI)
        c.fill()
        c.closePath()
        c.restore()

        //when ball hits bottom screen
        if(this.y + this.radiusY + this.vy > canvas.height){

           this.vy = -this.vy * .85
           this.radiusX /= 2
           this.radiusY /= 2

        }else{

            this.vy++
        }

        this.y += this.vy

       
    }
}