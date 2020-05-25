import config from '../../config/default';
import Api from '../Api';

const productConfig = {
  host: config.services.product.host,
  productGetEndpoint: config.services.product.getEndpoint,
  productSearchEndpoint: config.services.product.searchEndpoint
};

class ProductApi extends Api {
  get(id) {
    if (!id) {
      throw new Error('Parameter id cannot be empty');
    }
    const url = `${productConfig.host}${productConfig.productGetEndpoint}${id}`;
    const options = {
      method: 'GET'
    };
    return this.call(url, options);
  }

  search(query) {
    if (!query) {
      throw new Error('Parameter q cannot be empty');
    }
    const url = `${productConfig.host}${productConfig.productSearchEndpoint}?q=${query}`;
    const options = {
      method: 'GET'
    };
    return this.call(url, options);
  }
}

export default new ProductApi();
