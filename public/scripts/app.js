// Components structure
//FilterableProductTable
  //SearchBar
  //ProductTable
    //ProductCategoryRow
    //ProductRow

const ProductCategoryRow = React.createClass({
  render() {
    return (<tr><th colSpan="2">{this.props.category}</th></tr>)
  }
});

const ProductRow = React.createClass({
  render() {
    const name = this.props.product.stocked ?
      this.props.product.name :
      <span style={{color: 'red'}}>
        {this.props.product.name}
      </span>;

    return (
      <tr>
        <td>{name}</td>
        <td>{this.props.product.price}</td>
      </tr>
    );
  }
});

const ProductTable = React.createClass({
  render() {
    const rows = [];
    let lastCategory = null;
    this.props.products.forEach((product) => {
      if (product.name.indexOf(this.props.filterText) === -1 || (!product.stocked && this.props.inStockOnly)) {
        return;
      }
      if (product.category !== lastCategory) {
        rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
      }
      rows.push(<ProductRow product={product} key={product.name} />);
      lastCategory = product.category;
    }.bind(this));
    return(
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
});

const SearchBar = React.createClass({
  render() {
    return(
      <form>
        <input type="text" placeholder="Search..." value={this.props.filterText} />
        <p>
          <input type="checkbox" checked={this.props.inStockOnly} />
          {' '}
          Only show products in stock
        </p>
      </form>
    );
  }
});

const FilterableProductTable = React.createClass({
  getInitialState() {
    return {
      filterText: '',
      inStockOnly: false
    };
  },
  render() {
    return(
      <div>
        <SearchBar
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly} />

        <ProductTable
          products={this.props.products}
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly} />
      </div>
    );
  }
});

const PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

ReactDOM.render(
  <FilterableProductTable products={PRODUCTS} />,
  document.getElementById('container')
);