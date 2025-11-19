import { fetchProductCatalog, fetchProductReviews, fetchSalesReport } from "./apiSimulator.js";
import { NetworkError, DataError } from "./customErrors.js";


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
          // I am adding this becuse otherwise i get only network error. return a fallback report
          const fallbackReport = {
            totalSales: 0,
            unitsSold: 0,
            averagePrice: 0
          };

          console.log("Sales Report (Fallback):", fallbackReport);

          return fallbackReport;
        })
        .finally(() => console.log("Completed Sales Report"));
    })
    .finally(() => console.log("All API calls attempted"));
}

// Call the function
apiCallsAndDisplayData();
