import '../styles/home.css'

const ItemFilter = ({ index, content, check, onChangeFilter }) => {

    return <>
        <div key={index} onClick={() => onChangeFilter(index)} className={check ? "wrap-filter-component-checked" : "wrap-filter-component"}>
            {content}
        </div>
    </>
}
export default ItemFilter