import CoinList from "./CoinList";

function CategorySection(props) {
    return (
        <div className="category-section">
            <div className="category-header">
                <h2 className="category-title">{props.title}</h2>
                <button className="category-button" onClick={props.onToggle}>
                    {props.isExpanded ? "Show less" : "Show more"}
                </button>
            </div>
            <div className="category-block">
                <CoinList
                    coins={props.isExpanded ? props.coins : props.coins.slice(0, 24)}
                />
            </div>
        </div>
    );
}

export default CategorySection;