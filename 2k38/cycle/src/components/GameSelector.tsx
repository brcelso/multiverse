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
  type: ItemType | 'all';
  title?: string; // undefined quando type === 'all'
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

  const closeAllGroups = () => {
    setOpenGroups({
      sub: false,
      game: false,
      car: false,
      console: false,
      product: false,
      coin: false,
    });
  };

  const handleSelect = (type: ItemType, title: string) => {
    setSelected({ type, title });
    closeAllGroups();
  };

  const handleSelectAll = () => {
    setSelected({ type: 'all' });
    closeAllGroups();
  };

  const getData = (type: ItemType, title: string) => {
    switch (type) {
      case 'game':
        return games[title as GameTitle];
      case 'sub':
        return subs[title as SubTitle];
      case 'car':
        return cars[title as CarTitle];
      case 'console':
        return consoles[title as ConsoleTitle];
      case 'product':
        return products[title as ProductTitle];
      case 'coin':
        return coins[title as CoinTitle];
      default:
        return null;
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Pick a Card</h2>

      {/* Botão para mostrar todos os cards */}
      <div style={{ marginBottom: '1rem' }}>
        <button onClick={handleSelectAll} style={{ ...styles.groupButton }}>
          📋 All Items
        </button>
      </div>

      {/* Grupos normais */}
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
                      onClick={() => handleSelect(type, title)}
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

      {/* Cards renderizados */}
      <div style={styles.cardWrapper}>
        {selected &&
          (selected.type === 'all'
            ? dataGroups.map(({ type, items }) =>
                Object.keys(items).map((title) => (
                  <div key={`${type}|${title}`} style={{ marginBottom: '1rem' }}>
                    <CardGame
                      gameTitle={title}
                      data={getData(type, title)!}
                    />
                  </div>
                ))
              )
            : getData(selected.type as ItemType, selected.title!) && (
                <CardGame
                  gameTitle={selected.title!}
                  data={getData(selected.type as ItemType, selected.title!)!}
                />
              ))}
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: '0.75rem',
    fontFamily: '"Fira Code", "Courier New", monospace',
    maxWidth: '800px',
    margin: 'auto',
    color: '#d4d4d4',
    backgroundColor: '#1e1e1e',
    borderRadius: '6px',
    boxShadow: '0 0 6px rgba(0,0,0,0.4)',
    textAlign: 'center',
  },
  header: {
    color: '#627d8fff',
    fontSize: '1.25rem',
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
    padding: '0.4rem 0.75rem',
    borderRadius: '5px',
    fontWeight: 'bold',
    textAlign: 'left',
    cursor: 'pointer',
    userSelect: 'none',
    fontSize: '0.85rem',
    transition: 'background 0.2s',
  },
  groupButtonActive: {
    background: '#444444',
  },
  itemList: {
    listStyle: 'none',
    margin: 0,
    paddingLeft: '0.5rem',
    maxHeight: '150px',
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
    padding: '0.25rem 0.5rem',
    textAlign: 'left',
    cursor: 'pointer',
    borderRadius: '4px',
    fontSize: '0.8rem',
    transition: 'background 0.2s, color 0.2s',
  },
  itemButtonSelected: {
    background: '#3c3c3c',
    color: '#9cdcfe',
  },
  cardWrapper: {
    marginTop: '1rem',
    display: 'block', // Cards empilhados verticalmente
  },
};
