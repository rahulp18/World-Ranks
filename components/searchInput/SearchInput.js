import { SearchRounded } from '@material-ui/icons'
import styles from './SearchInput.module.css'
const SearchInput = ({...restProps}) => {
    return (
        <div className={styles.wrapper} >
            <SearchRounded />
            <input className={styles.input} {...restProps} />
            
        </div>
    )
}

export default SearchInput
