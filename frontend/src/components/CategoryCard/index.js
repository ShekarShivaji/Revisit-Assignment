import "./index.css"

const CategoryCard = (props) => {
    const {item} = props
    const {name, img, count} = item
     console.log(img)
    return (
        <li className="category-card">
            <img src={img} alt={name} className="image" />
            <p className="text">{name}</p>
            <p className="text">{count} items</p>
        </li>
    )
}

export default CategoryCard