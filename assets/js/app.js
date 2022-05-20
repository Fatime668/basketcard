let params = (new URL(document.location)).searchParams;
// console.log(params.get("dataId"));
let dataid = params.get("dataId")
// console.log(dataid);
fetch(`https://jsonplaceholder.typicode.com/photos/${dataid}`).then(resp=>resp.json()).then(data=>{
        // console.log(data.title);
        let section = document.querySelector('section')
        let html = `
        <div class="container">
        <div class="row m-5">
            <div class="col-lg-5">
                <div class="img">
                    <img style="width:100%;" src="${data.url}" alt="">
                </div>
            </div>
            <div class="col-lg-6">
                <div class="details">
                    <div>
                        <h2  class="title">${data.title}</h2>
                    </div>
                    <div class="price">
                        <span style="color:black ;">$${data.id}30.00</span>
                    </div>
                    <div class="productId">
                        <span style="color:black ;">ProductId:</span> <span>${data.id}</span>
                    </div>
                    <div class="productUrl">
                        <a href="#" style="text-decoration: none;"><span style="color:black ;">productUrl:
                            </span><span>${data.thumbnailUrl}</span></a>
                    </div>
                    <div class="quantity">
                        <input type="number" name="" max="50" min="1" value="1" id="">
                    </div>
                    <div class="btn">
                        <button class="btn btn-round btn-danger add-cart" data-id="${data.id}" type="button"><i
                                class="fa fa-shopping-cart"></i> Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
        `
        


        section.innerHTML=html
        let addButtons = document.querySelectorAll(".add-cart");
        console.log(addButtons);
        document.addEventListener("DOMContentLoaded", function () {
          if (localStorage.getItem("basket") !== null) {
            calcCount();
          }
        });
        
        let basket = [];
        
        addButtons.forEach((btn) => {
          btn.addEventListener("click", function (e) {
            e.preventDefault();
            if (localStorage.getItem("basket") !== null) {
              basket = JSON.parse(localStorage.getItem("basket"));
            }
        
            let image = document.querySelector('.img img').src
            let title = document.querySelector('.title').innerHTML
            let price = document.querySelector('.price span').innerHTML
            let productId = document.querySelector('.productId span').innerHTML
            let productUrl = document.querySelector('.productUrl span').innerHTML
            let id = this.getAttribute("data-id");
            let existedProduct = basket.find((x) => x.id == id);
            console.log(id);
            if (existedProduct === undefined) {
              let product = {
                id,
                productId,
                productUrl,
                image,
                title,
                price,
                count: 1,
              };
              basket.push(product);
            } else {
              existedProduct.count++;
            }
            localStorage.setItem("basket", JSON.stringify(basket));
            calcCount();
            console.log(basket);


            localStorage.getItem("id")
            localStorage.getItem("image")
            localStorage.getItem("title")
            localStorage.getItem("price")
            localStorage.getItem("count")
           
            let navbars = `
            <div class="close p-3">
            <i class="fa-solid fa-xmark"></i>
        </div>
        <div class="shopping-cart">
            <div class="shopping ">
                <ul class="list-unstyled m-0 p-0">
                <div class="remove d-flex justify-content-end p-2">
                <i class="fa-regular fa-trash-can"></i>
                    </div>
                    <li class="my-2"><img src="${image}" alt=""></li>
                    <li class="head p-0">Title:  ${title}</li>
                    <li class="money p-0">Price: ${price}</li>
                    <li class="count p-0">Count: ${existedProduct.count}</li>
                    
                </ul>


            </div>
        </div>
            `

            bar.innerHTML = navbars
          });


        });
        let shop = document.querySelector('.shop')
        let close = document.querySelector('.close')
        let bar = document.querySelector('.bar')
        
        
        close.onclick= function () {
           bar.style.display = "none"
          }
        shop.onclick = function(){
           bar.style.display = "block"
        }
        function calcCount() {
          let basket = JSON.parse(localStorage.getItem("basket"));
          let count = basket.reduce((t, val) => {
            return (t += val.count);
          }, 0);
          let countValue = document.querySelector("sup");
          countValue.innerText = count;
        }

       
        
})  
