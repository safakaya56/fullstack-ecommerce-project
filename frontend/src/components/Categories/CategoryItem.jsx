import "./categories.css"

function CategoryItem({ category }) {
    return (
        category &&
        <div className="card shadow-md">
            <img src={category.img} alt="image" />
            <div className="title">{category.title}</div>
        </div>
    )
}

export default CategoryItem