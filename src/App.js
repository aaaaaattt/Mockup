import './App.css';
import { useState } from 'react';

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

function ProductTable({ products ,filterText  ,inStockOnly}){
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    if(
      product.name.toLowerCase().indexOf(
        filterText.toLowerCase()
      ) === -1
    ) {
      return;
    }

    if(inStockOnly && !product.stocked){
      return;
    }

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



function SearchBar({
  filterText,
  inStockOnly,
  onfilterTextChange,
  onInStockOnlyChange
}) {
  return (
    <form>
      <input
      type="text"
      placeholder="Search..."
      value={filterText}  
      onChange={(e) => onfilterTextChange(e.target.value )}
        ></input>
      <label>
        <input 
        type="checkbox"
        checked={inStockOnly}
        onChange={(e) => onInStockOnlyChange(e.target.checked)}
         />
        {' '}
        Onlyshow products in stock
      </label>
    </form>
  )
}

function FilterableProductTable({products}){
    const [filterText, setFilterText] = useState('');
    const [inStockOnly, setInstockOnly] = useState(false);

  return (
    <div>
      <SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly}
        onfilterTextChange={setFilterText}
        onInStockOnlyChange={setInstockOnly} 
       />
      <ProductTable
       products={products}
       filterText={filterText}
       inStockOnly={inStockOnly}
       />
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
