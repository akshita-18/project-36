class Food {
    constructor () {
        this.foodStock = 0;
        this.image = loadImage("Images/Milk.png");
        this.lastFed;
    }

    updateFoodStock(foodStock) {
        this.foodStock = foodStock
    }

    deductFood() {
        if (this.foodStock > 0) {
            this.foodStock = this.foodStock-1;
        }
    }
    
    getFeedTime(lastFed) {
        this.lastFed = lastFed;
    }
   
    getFoodStock() {
        return this.foodStock;
    }
     
    dispaly() {
        var x=80, y=100;
        imageMode(CENTRE);
        this.image(this.image, 750, 750, 60, 60);

        if(this.foodStock !=0){
            for (var i=0; i<this.foodStock; i++) {
                if (i%10==0) {
                    x = 80,
                    y = y+50;
                }
                image(this.image, x, y, 50, 50);
                x = x+30;
            }
        }
    }
}