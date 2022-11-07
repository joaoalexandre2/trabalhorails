import axios from 'axios';

class CarsHelpers {
    static url='http://127.0.0.1:3000/cars';
    static async create(model,year,brand_id) {
        return axios.post(this.url,{
            "model": model,
            "year": year,
            "brand_id": brand_id
          }
        )
    }
    static async get(id) {
        return axios.get(this.url+"/"+id);
    }
    static async  all() {
        return axios.get(this.url);
    }
    static async update(id,model,year, brand_id) {
        return axios.put(this.url+"/"+id,{
            "model": model,
            "year": year,
            "brand_id": brand_id
          }
        )
    }
    static async delete(id) {
        return axios.delete(this.url+"/"+id);
    }
}
  
  export default CarsHelpers