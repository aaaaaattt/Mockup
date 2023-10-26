import './App.css';

function ProductCategoryRow({category}) {
  return (
    <tr>
      <th colSpan="2">
        {category}
      </th>
    </tr>
  );
}

function ProductRow({ product }){
  const name = product.stocked ? product.name :
    <span style={{ color: 'red'}}>
      {product.name}
    </span>;

    return(
      <tr>
        <td>{name}</td>
        <td>{product.price}</td>
      </tr>
    )
}

function ProductTable({ products }){
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    if(product.category !== lastCategory){
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category} />
      );
    }
    rows.push(
      <ProductRow
        product = {product}
        key={product.name} />
    );
    lastCategory=product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  )
}

function SearchBar() {
  return (
    <form>
      <input type="text" placeholder="Search..."></input>
      <label>
        <input type="checkbox" />
        {' '}
        Onlyshow products in stock
      </label>
    </form>
  )
}

function FilterableProductTable({products}){
  return (
    <div>
      <SearchBar />
      <ProductTable products={products}/>
    </div>
  );
}

const PRODUCTS = [
  {category: "Fruits", price: "S1", stocked: true, name: "Apple"},
  {category: "Fruits", price: "S1", stocked: true, name: "Mango"},
  {category: "Fruits", price: "S2", stocked: false, name: "Peach"},
  {category: "Alphabet", price: "S2", stocked: true, name: "D"},
  {category: "Alphabet", price: "S4", stocked: false, name: "E"},
  {category: "Alphabet", price: "S1", stocked: true, name: "F"},
]

function App() {
  return <FilterableProductTable products={PRODUCTS} />;
}

export default App;
