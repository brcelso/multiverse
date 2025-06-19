import { useState } from 'react';
import { CardGame } from './CardGame';
import { games, subs, cars, consoles, products, coins } from '../data';

type GameTitle = keyof typeof games;
type SubTitle = keyof typeof subs;
type CarTitle = keyof typeof cars;
type ConsoleTitle = keyof typeof consoles;
type ProductTitle = keyof typeof products;
type CoinTitle = keyof typeof coins;

type ItemType = 'game' | 'sub' | 'car' | 'console' | 'product' | 'coin';

interface Selection {
  type: ItemType;
  title: string;
}

const dataGroups: {
  label: string;
  type: ItemType;
  items: Record<string, any>;
  emoji: string;
}[] = [
  { label: 'Subscriptions', type: 'sub', items: subs, emoji: '💳' },
  { label: 'Games', type: 'game', items: games, emoji: '🎮' },
  { label: 'Cars', type: 'car', items: cars, emoji: '🚗' },
  { label: 'Consoles', type: 'console', items: consoles, emoji: '🕹️' },
  { label: 'Products', type: 'product', items: products, emoji: '📦' },
  { label: 'Coins', type: 'coin', items: coins, emoji: '🪙' },
];

export const GameSelector = () => {
  const [selected, setSelected] = useState<Selection | null>(null);
  const [openGroups, setOpenGroups] = useState<Record<ItemType, boolean>>({
    sub: false,
    game: false,
    car: false,
    console: false,
    product: false,
    coin: false,
  });

  const toggleGroup = (type: ItemType) => {
    setOpenGroups((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const getData = () => {
    if (!selected) return null;

    switch (selected.type) {
      case 'game':
        return games[selected.title as GameTitle];
      case 'sub':
        return subs[selected.title as SubTitle];
      case 'car':
        return cars[selected.title as CarTitle];
      case 'console':
        return consoles[selected.title as ConsoleTitle];
      case 'product':
        return products[selected.title as ProductTitle];
      case 'coin':
        return coins[selected.title as CoinTitle];
      default:
        return null;
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>🧭 VS Code Item Selector</h2>

      {dataGroups.map(({ label, type, items, emoji }) => (
        <div key={type} style={styles.group}>
          <button
            onClick={() => toggleGroup(type)}
            style={{
              ...styles.groupButton,
              ...(openGroups[type] ? styles.groupButtonActive : {}),
            }}
          >
            {emoji} {label}
          </button>

          {openGroups[type] && (
            <ul style={styles.itemList}>
              {Object.keys(items)
                .sort()
                .map((title) => (
                  <li key={`${type}|${title}`}>
                    <button
                      onClick={() => setSelected({ type, title })}
                      style={{
                        ...styles.itemButton,
                        ...(selected &&
                        selected.type === type &&
                        selected.title === title
                          ? styles.itemButtonSelected
                          : {}),
                      }}
                    >
                      {title}
                    </button>
                  </li>
                ))}
            </ul>
          )}
        </div>
      ))}

      {selected && getData() && (
        <div style={styles.cardWrapper}>
          <CardGame gameTitle={selected.title} data={getData()!} />
        </div>
      )}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: '0.75rem',
    fontFamily: '"Fira Code", "Courier New", monospace',
    maxWidth: '400px',               // ⬅️ Reduzido
    margin: 'auto',
    color: '#d4d4d4',
    backgroundColor: '#1e1e1e',
    borderRadius: '6px',             // ⬅️ Cantos um pouco menores
    boxShadow: '0 0 6px rgba(0,0,0,0.4)',
    textAlign: 'center',
  },
  header: {
    color: '#569cd6',
    fontSize: '1.25rem',              // ⬅️ Título menor
    marginBottom: '0.75rem',
  },
  group: {
    marginBottom: '0.75rem',
  },
  groupButton: {
    width: '100%',
    background: '#333333',
    border: 'none',
    color: '#ffffff',
    padding: '0.4rem 0.75rem',        // ⬅️ Menos padding
    borderRadius: '5px',
    fontWeight: 'bold',
    textAlign: 'left',
    cursor: 'pointer',
    userSelect: 'none',
    fontSize: '0.85rem',              // ⬅️ Menor
    transition: 'background 0.2s',
  },
  groupButtonActive: {
    background: '#444444',
  },
  itemList: {
    listStyle: 'none',
    margin: 0,
    paddingLeft: '0.5rem',
    maxHeight: '150px',               // ⬅️ Menor altura
    overflowY: 'auto',
    background: '#252526',
    borderRadius: '4px',
    marginTop: '0.25rem',
    border: '1px solid #333',
    textAlign: 'left',
  },
  itemButton: {
    width: '100%',
    background: 'transparent',
    border: 'none',
    color: '#cccccc',
    padding: '0.25rem 0.5rem',         // ⬅️ Menor padding
    textAlign: 'left',
    cursor: 'pointer',
    borderRadius: '4px',
    fontSize: '0.8rem',                // ⬅️ Texto menor
    transition: 'background 0.2s, color 0.2s',
  },
  itemButtonSelected: {
    background: '#3c3c3c',
    color: '#9cdcfe',
  },
  cardWrapper: {
    marginTop: '1rem',                // ⬅️ Menor margem
  },
};
