import { useEffect, useState } from 'react';
import './App.css';
import {IoCaretBackSharp,IoCaretForwardSharp} from 'react-icons/io5';

function App() {
  const[products,setProducts] = useState([]);
  const[perPageCount,setPerPageCount] = useState(10);
  const[totalPages,setTotalPages] = useState(0);
  const[page,setPage] = useState(1); 

  const fetchData = async() => {
    // let res = await fetch(`https://dummyjson.com/products?limit=100`); 
    let res = await fetch(`https://dummyjson.com/products?limit=10&skip=${page*10-10}`); 
    let data = await res.json();

    console.log(data);
    setProducts(data.products);
    setTotalPages(data.total/perPageCount);
  } 

  const selectedPage = (selectPage) => {
    if(selectPage > 0 && selectPage <= totalPages && selectPage!==page ){
      setPage(selectPage);
    }else{return}
  }

  useEffect(()=>{
    fetchData();
  },[page]);

  return (
    <div className="App">
      <header>August Products</header>
      <section className='product_container'>
        {/* {products.length > 0 && products.slice(page*perPageCount-10,page*perPageCount).map((product,index)=>{ */}
        {products.length > 0 && products.map((product,index)=>{
          return (
            <div className='product_details' key={product.id}>
              <div className='img_container'>
                <img src={product.thumbnail} alt={`${product.title}`}/>   
              </div>
              <span>{product.title}</span>
            </div>
          )
        })}     
      </section>
      {products.length > 0 &&
      <section className='pagination_wrapper'>
        <div className='pagination_item'>
          <span className={`${page > 1 ? '' :'disabledArrow'} previous`} onClick={()=>selectedPage(page-1)}>
            <IoCaretBackSharp className='icon'/>
          </span>
          {totalPages && [...Array(totalPages)].map((_,index)=>{
            return(
                <span key={index} onClick={()=>selectedPage(index+1)}
                  className={`${index+1 === page ? 'activePage':''}`}>
                  {index + 1}
                </span>
            )
          })}
          <span className={`${page !== totalPages ? '' :'disabledArrow'} next`} onClick={()=>selectedPage(page+1)}>
            <IoCaretForwardSharp className='icon'/>
          </span>
        </div>
      </section>}
    </div>
  );
}

export default App;
