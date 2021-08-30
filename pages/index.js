 
import { useState } from 'react'
import CountryTable from '../components/countriesTable/CountryTable'
import Layout from '../components/layout/Layout'
import SearchInput from '../components/searchInput/SearchInput'
 import styles from '../styles/Home.module.css'

export default function Home({countries}) {

  const [keyWord,setKeyWord]=useState('');
  const filterdCountries=countries.filter((country)=>country.name.toLowerCase().includes(keyWord) ||country.region.toLowerCase().includes(keyWord)||country.subregion.toLowerCase().includes(keyWord));
  

  const OnInputChange=(e)=>{
  e.preventDefault();
  setKeyWord(e.target.value.toLowerCase());
  }
  
  return (
   <Layout>
  <div className={styles.main} >
   <div className={styles.flex}>
   <h4 className={styles.count}>Found {countries.length} countries</h4>
    <SearchInput placeholder='Filter by name region sub region' onChange={OnInputChange} />
   </div>
   
   <CountryTable countries={filterdCountries} />
   </div>
   </Layout>
  )
}
export const getStaticProps=async()=>{
  const response=await fetch('https://restcountries.eu/rest/v2/all');
  const countries=await response.json();
  return{
    props:{
      countries
    }
  }
}