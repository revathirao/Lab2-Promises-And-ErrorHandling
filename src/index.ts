import { fetchProductCatalog, fetchProductReviews, fetchSalesReport } from "./apiSimulator.js";
 import { NetworkError, DataError } from "./customErrors.js";


// //  call Fetch Product Catalog
// // async function apiCallsAndDisplayData()

// fetchProductCatalog()
// .then(products =>{
//     console.log("Product Catalog:", products);


//         //  call Fetch reviews for each product and Create an array of review Promises
//         const reviewPromises =products.map(product=>{
//             fetchProductReviews(product.id)
//             .then(reviews=> console.log(`Reviews for ${product.name}:`, reviews))
//             // .catch(error=> console.error("Review Error:",error.message))
//             .catch(error => console.error("Review Error:", error))
//             .finally(()=> console.log("Completed Review"))
//             });
//             return Promise.all(reviewPromises);
//         })

//   .catch(error => console.error("Catalog Error:", error.message))
//   .finally(()=> console.log("Completed product catalog"));

// //// Fetch Sales Report

// fetchSalesReport()
// .then(report =>console.log("Sales Report:", report))
//     .catch(error => console.error("Sales Report Error:", error.message))
//     .finally(()=> console.log("Completed Sales report"));

///------------------
// export function apiCallsAndDisplayData() {
//   // 1 Fetch Product Catalog
//   fetchProductCatalog()
//     .then(products => {
//       console.log("Product Catalog:", products);

//       // 2 Fetch reviews for each product (parallel)
//       const reviewPromises = products.map(product => {
//         return fetchProductReviews(product.id)
//           .then(reviews => console.log(`Reviews for ${product.name}:`, reviews))
//           .catch(error => {
//             if (error instanceof NetworkError) {
//               console.error(`Review Network Error for ${product.name}:`, error.message);
//             } else if (error instanceof DataError) {
//               console.error(`Review Data Error for ${product.name}:`, error.message);
//             } else {
//               console.error(`Unknown Review Error for ${product.name}:`, error.message);
//             }
//           })
//           .finally(() => console.log(`Completed Review for ${product.name}`));
//       });

//       return Promise.all(reviewPromises); // wait for all reviews
//     })
//     .catch(error => {
//       if (error instanceof NetworkError) {
//         console.error("Catalog Network Error:", error.message);
//       } else if (error instanceof DataError) {
//         console.error("Catalog Data Error:", error.message);
//       } else {
//         console.error("Unknown Catalog Error:", error.message);
//       }
//     })
//     .finally(() => {
//       console.log("Completed Product Catalog");
//     })
//     // 3 Fetch Sales Report after reviews
//     .then(() => {
//       return fetchSalesReport()
//         .then(report => console.log("Sales Report:", report))
//         .catch(error => {
//           if (error instanceof NetworkError) {
//             console.error("Sales Report Network Error:", error.message);
//           } else if (error instanceof DataError) {
//             console.error("Sales Report Data Error:", error.message);
//           } else {
//             console.error("Unknown Sales Report Error:", error.message);
//           }
//         })
//         .finally(() => console.log("Completed Sales Report"));
//     })
//     .finally(() => console.log("All API calls attempted"));
// }
// apiCallsAndDisplayData();
///------------------

export function apiCallsAndDisplayData() {
  fetchProductCatalog()
    .then(products => {
      console.log("Product Catalog:", products);

      // Fetch reviews for each product (parallel)
      const reviewPromises = products.map(product => {
        return fetchProductReviews(product.id)
          .then(reviews => console.log(`Reviews for ${product.name}:`, reviews))
          .catch(error => {
            // Fail silently for NetworkError
            if (error instanceof NetworkError) {
              // Do nothing
            } else if (error instanceof DataError) {
              console.error(`Review Data Error for ${product.name}:`, error.message);
            } else {
              console.error(`Unknown Review Error for ${product.name}:`, error.message);
            }
          })
          .finally(() => console.log(`Completed Review for ${product.name}`));
      });

      return Promise.all(reviewPromises);
    })
    .catch(error => {
      // Fail silently for NetworkError at catalog level
      if (error instanceof NetworkError) {
        // Do nothing
      } else if (error instanceof DataError) {
        console.error("Catalog Data Error:", error.message);
      } else {
        console.error("Unknown Catalog Error:", error.message);
      }
    })
    .finally(() => console.log("Completed Product Catalog"))
    .then(() => {
      return fetchSalesReport()
        .then(report => console.log("Sales Report:", report))
        .catch(error => {
          // Fail silently for NetworkError at sales report
          if (error instanceof NetworkError) {
            // Do nothing
          } else if (error instanceof DataError) {
            console.error("Sales Report Data Error:", error.message);
          } else {
            console.error("Unknown Sales Report Error:", error.message);
          }
        })
        .finally(() => console.log("Completed Sales Report"));
    })
    .finally(() => console.log("All API calls attempted"));
}

// Call the function
apiCallsAndDisplayData();
