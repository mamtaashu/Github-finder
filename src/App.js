import './App.css';
import axios from "axios"
import React, { useState } from 'react';

function App() {

    const [text,setText] = useState("react");
    const [repo,setData] = useState([]);
    const [total,setTotal] = useState();
    const [page,setCurrentPage] = useState(1);
    const [lastPage,setLastPage] = useState();
    const [limit,setPageLimit] = useState(10);
    const [sortOrder,setSort] = useState()
    
    const handleSearch = () => {


      axios.get(`https://api.github.com/search/repositories?q=${text}+sort%3Aupdated-${sortOrder}`)
      .then(res => {
        const data = res.data.items;
        
        setTotal(data.length)
        setData(data.slice((page - 1) * limit, page * limit));
        setLastPage(Math.ceil(data.length/limit))
        
      })

      .catch(error=>console.log(error))
       
        }

    React.useEffect(()=>{handleSearch()},[page,limit,sortOrder])
  return (
    <div >
      <div id="navbar">
        <img src="https://pnggrid.com/wp-content/uploads/2022/03/Github-Logo-White.png"/>
        <h1>GitHub Repo Finder</h1>
        </div>

        <div id='searchDiv'>
        <input value={text} type="text" onChange={(e) => {setText(e.target.value)}}/>
        <button onClick={()=>{handleSearch(); setCurrentPage(1)}}>SEARCH</button>
        </div>

        <div id="sortOption">
        <h2>Showing {total} available repository results </h2>    
       
        <div>
        <label>
        Per Page: 
        <select defaultValue={10} onChange={(e)=>{setPageLimit(e.target.value)}}>
          <option value={5}>5</option>
          <option  value={10}>10</option>
          <option value={15}>15</option>
          <option value={30}>30</option>
        </select>
       
   </label>
       
      
      <label>Sort By Last Updated:
        <select onChange={(e)=>{setSort(e.target.value)}}>
            <option >Default</option>
            <option value="asc">Latest First</option>
            <option value="des">Oldest First</option>
        </select>
       </label>
       </div>
       </div>
      <div>
        {repo.map((e)=>{
                  
                  return (
                      
                    <div id="result">
                      <a href={e.html_url} target="_blank">{e.full_name}</a>
                      <p>{e.description}</p>
                  </div>
                  )
       
              })}
          
      </div>
      <div id="navBtn">
            <button onClick={()=>{setCurrentPage((page-1))}} disabled={page === 1}>PREVIOUS</button>
            <h4>{page} / {lastPage}</h4>
            <button onClick={()=>{setCurrentPage((page+1))}} disabled={page === lastPage}>NEXT</button>
      </div>
      
    </div>
  );
}

export default App;
