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
  title?: string;
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
  const [selected, setSelected] = useState<Selection>({ type: 'all' });
  const [openGroups, setOpenGroups] = useState<Record<ItemType, boolean>>({
    sub: false,
    game: false,
    car: false,
    console: false,
    product: false,
    coin: false,
  });
  const [regionFilter, setRegionFilter] = useState<string>('All');
  const [groupFilter, setGroupFilter] = useState<string>('All');

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

  const goHome = () => {
    setSelected({ type: 'all' });
    setRegionFilter('All');
    setGroupFilter('All');
    closeAllGroups();
  };

  const getData = (type: ItemType, title: string) => {
    switch (type) {
      case 'game': return games[title as GameTitle];
      case 'sub': return subs[title as SubTitle];
      case 'car': return cars[title as CarTitle];
      case 'console': return consoles[title as ConsoleTitle];
      case 'product': return products[title as ProductTitle];
      case 'coin': return coins[title as CoinTitle];
      default: return null;
    }
  };

  const allRegions = Array.from(
    new Set(
      dataGroups.flatMap((group) =>
        Object.values(group.items)
          .flatMap((item: any) =>
            Object.keys(item).filter((key) => key !== 'launchDate')
          )
      )
    )
  ).sort();

  const allItems = dataGroups
    .filter((group) => groupFilter === 'All' || group.label === groupFilter)
    .flatMap((group) =>
      Object.entries(group.items)
        .map(([title, data]) => {
          if (regionFilter === 'All') return [title, data] as const;
          const filteredData = Object.fromEntries(
            Object.entries(data as any).filter(
              ([region]) => region !== 'launchDate' && region === regionFilter
            )
          );
          return [title, filteredData] as const;
        })
        .filter(([_, data]) => Object.keys(data).length > 0)
    );

  return (
    <div style={styles.container}>
      <div style={styles.navbar}>
        <button onClick={goHome} style={styles.homeButton}>🏠 Home</button>
        <h2 style={styles.navTitle}>👟 Pick a Shoe</h2>
      </div>

      {selected.type === 'all' && (
        <div style={styles.filterContainer}>
          <div>
            <label htmlFor="group">Filter by Group: </label>
            <select
              id="group"
              value={groupFilter}
              onChange={(e) => setGroupFilter(e.target.value)}
            >
              <option value="All">All</option>
              {dataGroups
                .slice()
                .sort((a, b) => a.label.localeCompare(b.label))
                .map((group) => (
                  <option key={group.label} value={group.label}>{group.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="region">Filter by Region: </label>
            <select
              id="region"
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
            >
              <option value="All">All</option>
              {allRegions.map((region) => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      {dataGroups
        .slice()
        .sort((a, b) => a.label.localeCompare(b.label))
        .map(({ label, type, items, emoji }) => {
          // Contagem correta: apenas o número de itens no grupo
          const itemCount = Object.keys(items).length;

          return (
            <div key={type} style={styles.group}>
              <button
                onClick={() => toggleGroup(type)}
                style={{
                  ...styles.groupButton,
                  ...(openGroups[type] ? styles.groupButtonActive : {}),
                }}
              >
                {emoji} {label} ({itemCount})
              </button>
              {openGroups[type] && (
                <ul style={styles.itemList}>
                  {Object.keys(items)
                    .sort((a, b) => a.localeCompare(b))
                    .map((title) => (
                      <li key={`${type}|${title}`}>
                        <button
                          onClick={() => handleSelect(type, title)}
                          style={{
                            ...styles.itemButton,
                            ...(selected && selected.type === type && selected.title === title
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
          );
        })}

      <div style={styles.cardWrapper}>
        {selected.type === 'all'
          ? allItems.map(([title, data]) => (
              <div key={title} style={{ marginBottom: '0.5rem' }}>
                <CardGame gameTitle={title} data={data as any} />
              </div>
            ))
          : getData(selected.type, selected.title!) && (
              <CardGame
                gameTitle={selected.title!}
                data={getData(selected.type, selected.title!)!}
              />
            )}
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
  navbar: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    background: '#333333',
    padding: '0.375rem 0.5rem',
    borderRadius: '5px',
    marginBottom: '0.5rem',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    gap: '0.5rem',
  },
  navTitle: {
    margin: 0,
    fontSize: '1.3rem',
    flexGrow: 1,
    textAlign: 'center',
  },
  homeButton: {
    background: '#555555',
    border: 'none',
    color: '#ffffff',
    padding: '0.2rem 0.375rem',
    borderRadius: '5px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background 0.2s',
    flexShrink: 0,
  },
  group: { marginBottom: '0.375rem' },
  groupButton: {
    width: '100%',
    background: '#333333',
    border: 'none',
    color: '#ffffff',
    padding: '0.2rem 0.375rem',
    borderRadius: '5px',
    fontWeight: 'bold',
    textAlign: 'center',
    cursor: 'pointer',
    userSelect: 'none',
    fontSize: '0.85rem',
    transition: 'background 0.2s',
  },
  groupButtonActive: { background: '#444444' },
  itemList: {
    listStyle: 'none',
    margin: 0,
    paddingLeft: '0.25rem',
    maxHeight: '150px',
    overflowY: 'auto',
    background: '#252526',
    borderRadius: '4px',
    marginTop: '0.125rem',
    border: '1px solid #333',
    textAlign: 'left',
  },
  itemButton: {
    width: '100%',
    background: 'transparent',
    border: 'none',
    color: '#cccccc',
    padding: '0.125rem 0.25rem',
    textAlign: 'left',
    cursor: 'pointer',
    borderRadius: '4px',
    fontSize: '0.8rem',
    transition: 'background 0.2s, color 0.2s',
  },
  itemButtonSelected: { background: '#3c3c3c', color: '#9cdcfe' },
  cardWrapper: { marginTop: '0.5rem', display: 'block' },
  filterContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    marginBottom: '0.5rem',
    alignItems: 'center',
  },
};
