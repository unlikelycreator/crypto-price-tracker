import {useEffect, useState} from 'react';
import axios from 'axios'
import './App.css';
import Coin from './coin'

function App() {
  const [coins, setCoins] = useState([])
  const [search, setSearch] = useState('')
  
  useEffect(() => {
    const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=true"
    axios.get(url)
    .then(res => {
        setInterval(setCoins(res.data), 10000)
        console.log(res.data)
    }).catch(error => console.log(error))
  }, [])
  
  const handleSearch = e =>{
    setSearch(e.target.value)
  }
  const filteredCoins = coins.filter(coin => 
    coin.name.toLowerCase().includes(search.toLowerCase())
    )


  return (
    <div className="App">
      <header className="header"><h1>CRYPTOLOOK</h1>
      <a className="git-btn"href='https://github.com/unlikelycreator/crypto-price-tracker' target="_blank">Github</a></header>
      <div className="coin-search">
        <h1>Search</h1>
        <form className="form">
          <input onChange={handleSearch} type="text" placeholder="Search Coin Name" className="coin-input" />
        </form>
      </div>
      {filteredCoins.map(coin =>{
        return(
          <Coin key={coin.id}
           name={coin.name}
          image={coin.image}
          symbol={coin.symbol}
          volume={coin.total_volume}
          price={coin.current_price}
          priceChange={coin.price_change_percentage_24h}
          marketcap = {coin.market_cap}
          />
        ) 
      })}
    </div>
  );
}

export default App;
