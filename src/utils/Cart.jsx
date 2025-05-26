export function loadCart(){
    let cart =localStorage.getItem("cart");   //"JSON" type data cannot be saved in a localStorage, only String data can be saved.
    if (cart == null){
        
        cart={
            orderedItems:[],
            days:1,
            startingDate:formatDate(new Date()),  // get data from "formatDate" Function //"new Date() =Today(Date and Time)"
            endingDate:formatDate(new Date())
        }
        const cartString=JSON.stringify(cart);  //Used to convert the "jason data" in the cart to a String
        localStorage.setItem("cart",cartString);//save localStorage
        return cart;//return json data
    }
    
    cart =JSON.parse (cart);   //if cart have the data
    return cart;//return json data

}

                    export function formatDate(date){   //the code to convert  a js Data object into yyyy-mm-dd format
                        const year=date.getFullYear();
                        const month=String(date.getMonth()+1).padStart(2,'0');
                        const day =String(date.getDate()).padStart(2 ,'0');
                        return `${year}-${month}-${day}`;
                    }





export function addToCart(key,qty){
    
    const cart =loadCart();                     // get data from "loadCart" Function 
    let found =false;
    console.log(cart.orderedItems)
 
    for(let i=0;  i<cart.orderedItems.length;  i++){

                    if(cart.orderedItems[i].key == key){
                        cart.orderedItems[i].qty +=qty;
                        found=true;
                    }
                }

        if(!found){
            cart.orderedItems.push({key,qty})
                                              
        }

    
    const cartString=JSON.stringify(cart);
    localStorage.setItem("cart",cartString);
    

}




export function removeFormCart(key){
    const cart =loadCart();  // get data from "loadCart" Function 
    const newCart =cart.orderedItems.filter((item)=>item.key !=key );   //Creating a new array by selecting values ​​that are not equal to the sent key
    cart.orderedItems=newCart;
    const cartString=JSON.stringify(cart);
    localStorage.setItem("cart",cartString);

}











