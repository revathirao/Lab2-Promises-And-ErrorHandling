
 export interface producrt{
    id: number;
    name:string;
    price: number;
}


export const fetchProductCatalog = (): Promise<producrt[]> => {
    return new Promise((resolve, reject) => {
    setTimeout(() => {
        if (Math.random() < 0.8) {
        resolve([
            { id: 1, name: "Laptop", price: 1200 },
            { id: 2, name: "Headphones", price: 200 },
        ]);
        } else {
        reject("Failed to fetch product catalog");
        }
    }, 1000);
    });
};

export const fetchProductReviews = (productID:number): Promise<string[]> => {
    return new Promise((resolve, reject) => {
    setTimeout(() => {
        if (Math.random() < 0.8) {
        resolve([
            "Good Product",
            "Good value"
        ]);
        } else {
        reject(`Failed to fetch review for productID: ${productID}`;
        }
    }, 1500);
    });
};

 export interface salesReport {
    totalSales: number;
    unitsSold: number;
    averagePrice: number;
}



export const fetchSalesReport = (): Promise<salesReport> => {
    return new Promise((resolve, reject) => {
    setTimeout(() => {
        if (Math.random() < 0.8) {
        resolve({
            totalSales: 50000,
            unitsSold: 400,
            averagePrice: 170,
        });
        } else {
        reject("FFailed to fetch sales reportailed to fetch product catalog");
        }
    }, 1000);
    });
};

