export default function Fruit({ name, price, emoji }) {
    return (
    <li>
        {emoji} {name} {price}
    </li>
    );
}