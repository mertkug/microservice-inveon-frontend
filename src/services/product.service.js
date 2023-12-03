import http from "../http-common";

const ProductDataService = {
    getAll: () => {
        return http.get("/products");
    },

    get: (id) => {
        return http.get(`/products/${id}`);
    },

    create: (data) => {
        console.log(data);
        return http.post("/products", data);
    },

    update: (id, data) => {
        return http.put(`/products/${id}`, data);
    },

    delete: (id) => {
        return http.delete(`/products/${id}`);
    },
};

export default ProductDataService;