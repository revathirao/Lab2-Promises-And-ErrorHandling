import { fetchProductCatalog, fetchProductReviews, fetchSalesReport } from "./apiSimulator.js";

//  call Fetch Product Catalog

fetchProductCatalog()
.then(products =>{
    console.log("Product Catalog:", products);


        //  call Fetch reviews for each product
        products.forEach(product=>{
            fetchProductReviews(product.id)
            .then(review => console.log(`Reviews for $(product.name)`, review))
            .catch(error=> console.error("Review Error",error.message))
            .finally(()=> console.log("Completed Review"))
            });
        })

  .catch(error => console.error("Catalog Error:", error.message))
  .finally(()=> console.log("Completed product catalog"));

//// Fetch Sales Report
fetchSalesReport()
.then(report =>console.log("Sales Report:", report))
    .catch(error => console.error("Sales Report Error:", error.message))
    .finally(()=> console.log("Completed Sales report"));

