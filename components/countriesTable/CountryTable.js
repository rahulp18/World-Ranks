import React,{useState} from 'react'
import Link from 'next/link'
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';
import styles from './CountryTable.module.css'


const orderBy=(countries,direction,value)=>{
  if(direction==='desc'){
    return [...countries].sort((a,b)=>a[value]>b[value] ?-1:1)
  }
  if(direction==='asc'){
      return [...countries].sort((a,b)=>a[value]>b[value] ?1:-1)
  }
  return countries;
}
const SortArrow=({direction})=>{
     
  if(!direction){
      return<></>;
  }
  else if(direction==='asc'){
      return <KeyboardArrowDown  className={styles.arrow}   />
  }
  else{
      return <KeyboardArrowUp  className={styles.arrow}  />
  }
 
}

const CountryTable = ({countries}) => {
   const[direction,setDirection]=useState('');
   const [value,setValue]=useState();

   const switchDirection=()=>{
       if(!direction){
           setDirection("desc");
       }
       else if(direction==='desc'){
           setDirection('asc');
       }
       else{
       setDirection(null);
       }
      
       
   }
   const setValueAndDirection=(value)=>{
       switchDirection();
       setValue(value);
   }

    const orderedCountry=orderBy(countries,direction,value);
    return (
        <div>
            <div className={styles.heading } >
               
                <button className={styles.heading_name } onClick={()=>{
                    switchDirection();
                    setValueAndDirection('name');
                }} >Name {value==='name' && <SortArrow direction={direction}  />} </button>
                <button className={styles.heading_population } onClick={()=>{
                    switchDirection();
                    setValueAndDirection('population');
                }}>Population {value==='population' && <SortArrow direction={direction}  />}</button>
                  <button className={styles.heading_area } onClick={()=>{
                    switchDirection();
                    setValueAndDirection('area');
                }} >Area(km<sup>2</sup>) {value==='area' && <SortArrow direction={direction}  />}  </button>
                  <button className={styles.heading_gini } onClick={()=>{
                    switchDirection();
                    setValueAndDirection('gini');
                }} >Gini {value==='gini' && <SortArrow direction={direction}  />}  </button>
            </div>
            {
                orderedCountry.map((country)=>(
                    <Link href={`/country/${country.alpha3Code}`} key={country.alpha3Code} >
                    <div className={styles.row }  >
                        <div className={styles.imageBox}>
                        <img src={country.flag} alt={country.name} />  
                        
                        </div>

                  
                        <h3 className={styles.name}>{country.name}</h3>
                     <p className={styles.population}>{country.population}</p>
                     <p className={styles.area}>{country.area}</p>
                     <p className={styles.gini}>{!country.gini?"0%":`${country.gini}%`}</p>
                   </div>
                   </Link>
                ))
            }
        </div>
    )
}

export default CountryTable
