import React from 'react';

type Platform = "Xbox" | "Playstation 5" | "Playstation 5 | Xbox";

type GameData = {
  launchDate: string;
  [region: string]:
    | {
        [monthYear: string]: {
          edition: string;
          price: number;
          realPrice?: number;
          currency: string;
          platform?: Platform | string;
          discount?: number;
          increase?: number;
          totalIncrease?: number;
          totalDiscount?: number;
          exchangeTax?: number;
          basePrice2?: number;
          exchangeTax2?: number;
          basePrice3?: number;
          exchangeTax3?: number;
        }[];
      }
    | string;
};

type Props = {
  gameTitle: string;
  data: GameData & { currentRegion?: string; currentMonthYear?: string; editionData?: any };
};

const regionFlags: Record<string, string> = {
  Brazil: 'https://flagcdn.com/w40/br.png',
  UnitedStates: 'https://flagcdn.com/w40/us.png',
  Europe: 'https://flagcdn.com/w40/eu.png',
  UnitedKingdom: 'https://flagcdn.com/w40/gb.png',
  Argentina: 'https://flagcdn.com/w40/ar.png',
  Japan: 'https://flagcdn.com/w40/jp.png',
  India: 'https://flagcdn.com/w40/in.png',
  Canada: 'https://flagcdn.com/w40/ca.png',
  China: 'https://flagcdn.com/w40/cn.png',
  Paraguay: 'https://flagcdn.com/w40/py.png',
};

function parseMonthYear(input: string): { date: Date; hasMonth: boolean } {
  const parts = input.trim().split(' ');
  if (parts.length === 2) {
    return { date: new Date(`${parts[0]} 1, ${parts[1]}`), hasMonth: true };
  } else if (parts.length === 1 && /^\d{4}$/.test(parts[0])) {
    return { date: new Date(`Jan 1, ${parts[0]}`), hasMonth: false };
  } else {
    return { date: new Date(input), hasMonth: false };
  }
}

export const CardGame = ({ gameTitle, data }: Props) => {
  const { launchDate, ...regionsData } = data;
  const regions = Object.keys(regionsData).filter(
    (r) => r !== 'currentRegion' && r !== 'currentMonthYear'
  );

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>{gameTitle}</h2>
        <p style={styles.launch}>
          Launch Date: {new Date(launchDate + 'T12:00:00').toLocaleDateString()}
        </p>

        {regions.map((region) => {
          const monthsData = regionsData[region] as { [monthYear: string]: any[] };

          return (
            <section key={region} style={styles.regionSection}>
              <h3 style={styles.regionTitle}>
                <img
                  src={regionFlags[region]}
                  alt={`${region} flag`}
                  style={{
                    width: 24,
                    height: 15,
                    marginRight: 8,
                    verticalAlign: 'middle',
                  }}
                  draggable={false}
                />
                {region}
              </h3>

              {Object.entries(monthsData)
                .sort(([a], [b]) => {
                  const parsedA = parseMonthYear(a);
                  const parsedB = parseMonthYear(b);
                  const timeDiff = parsedB.date.getTime() - parsedA.date.getTime();
                  if (timeDiff !== 0) return timeDiff;
                  return parsedA.hasMonth === parsedB.hasMonth ? 0 : parsedA.hasMonth ? -1 : 1;
                })
                .map(([month, entries]) => (
                  <div key={month} style={{ marginBottom: '1rem' }}>
                    <h4 style={styles.monthTitle}>{month}</h4>
                    <ul style={styles.priceList}>
                      {entries.map((entry, idx) => (
                        <li key={idx} style={styles.priceItem}>
                          <strong style={styles.edition}>{entry.edition}</strong>

                          {entry.platform && (
                            <div style={styles.platform}>
                              <b>{entry.platform}</b>
                            </div>
                          )}

                          <div>
                            {entry.currency} {entry.price.toFixed(2)}

                            {entry.increase !== undefined && (
                              <span style={styles.increase}>
                                <b>[+{entry.increase}%]</b> 👆🏼
                              </span>
                            )}
                            {entry.discount !== undefined && (
                              <span style={styles.discount}>
                                <b>[-{entry.discount}%]</b> 👇🏼
                              </span>
                            )}
                            {entry.totalIncrease !== undefined && (
                              <span style={styles.totalIncrease}>
                                <b>[+{entry.totalIncrease}%]</b> 👆🏼👆🏼
                              </span>
                            )}
                            {entry.totalDiscount !== undefined && (
                              <span style={styles.totalDiscount}>
                                <b>[-{entry.totalDiscount}%]</b> 👇🏼👇🏼
                              </span>
                            )}
                          </div>

                          {entry.realPrice !== undefined && (
                            <div style={styles.realPrice}>
                              Real Price: {entry.currency} {entry.realPrice.toFixed(2)}
                            </div>
                          )}

                          {entry.exchangeTax !== undefined && (
                            <small style={styles.exchange}>
                              Exchange LATAM: {entry.exchangeTax.toFixed(2)}
                            </small>
                          )}

                          {entry.exchangeTax2 !== undefined && (
                            <div style={styles.secondaryLine}>
                              <small style={styles.exchange}>
                                Exchange US: {entry.exchangeTax2.toFixed(2)}
                              </small>
                            </div>
                          )}

                          {entry.exchangeTax3 !== undefined && (
                            <div style={styles.secondaryLine}>
                              <small style={styles.exchange}>
                                Exchange RealPrice: {entry.exchangeTax3.toFixed(2)}
                              </small>
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
            </section>
          );
        })}
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: '1rem',
    backgroundColor: '#1e1e1e',
    minHeight: '100vh',
    fontFamily: '"Fira Code", monospace',
    textAlign: 'center',
  },
  card: {
    background: '#252526',
    color: '#d4d4d4',
    borderRadius: '8px',
    padding: '1.5rem 0.5rem',
    width: '100%',
    maxWidth: '300px',
    boxShadow: '0 0 10px rgba(0,0,0,0.3)',
    overflowY: 'auto',
    textAlign: 'center',
  },
  title: {
    fontSize: '1.5rem',
    marginBottom: '0.5rem',
    color: '#627d8fff',
    textAlign: 'center',
  },
  launch: {
    fontSize: '0.85rem',
    color: '#6a9955',
    fontWeight: 'bold',
    marginBottom: '1rem',
    textAlign: 'center',
  },
  regionSection: {
    marginBottom: '1.5rem',
    border: '1px solid #333',
    borderRadius: '6px',
    padding: '0.75rem',
    backgroundColor: '#1e1e1e',
    textAlign: 'center',
  },
  regionTitle: {
    color: '#ffffff',
    borderBottom: '1px solid #333',
    paddingBottom: 4,
    marginBottom: '0.75rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  monthTitle: {
    color: '#c586c0',
    marginBottom: '0.5rem',
    border: '1px solid #444',
    borderRadius: '4px',
    padding: '2px 6px',
    display: 'inline-block',
    fontSize: '0.8rem',
    backgroundColor: '#2d2d30',
    textAlign: 'center',
  },
  priceList: { listStyle: 'none', padding: 0, margin: '0 auto', textAlign: 'center' },
  priceItem: {
    background: '#2d2d30',
    padding: '0.5rem',
    borderRadius: '4px',
    marginBottom: '0.5rem',
    border: '1px solid #3c3c3c',
    textAlign: 'center',
  },
  edition: {
    display: 'block',
    fontSize: '0.95rem',
    marginBottom: '0.2rem',
    color: '#dddd6aff',
    textAlign: 'center',
  },
  platform: {
    fontSize: '0.8rem',
    color: '#4fc3f7',
    marginBottom: '0.3rem',
  },
  discount: { color: '#da5757ff', fontSize: '0.85rem', marginLeft: 6 },
  increase: { color: '#18FAFA', fontSize: '0.85rem', marginLeft: 6 },
  totalIncrease: {
    color: 'deeppink',
    fontWeight: 'bold',
    fontSize: '0.95rem',
    marginLeft: 6,
  },
  totalDiscount: {
    color: 'orange',
    fontWeight: 'bold',
    fontSize: '0.95rem',
    marginLeft: 6,
  },
  exchange: { color: '#b5cea8', fontSize: '0.7rem', display: 'block', textAlign: 'center' },
  secondaryLine: { marginTop: '0.25rem' },
  realPrice: {
    color: '#ce9178',
    fontSize: '0.75rem',
    marginTop: '0.25rem',
    textAlign: 'center',
  },
};

type Platform = "Xbox" | "Playstation 5" | "Playstation 5 | Xbox";

type GameData = {
  launchDate: string;
  [region: string]:
    | {
        [monthYear: string]: {
          edition: string;
          price: number;
          realPrice?: number;
          currency: string;
          platform?: Platform | string;
          discount?: number;
          increase?: number;
          totalIncrease?: number;
          totalDiscount?: number;
          exchangeTax?: number;
          basePrice2?: number;
          exchangeTax2?: number;
          basePrice3?: number;
          exchangeTax3?: number;
        }[];
      }
    | string;
};

type Props = {
  gameTitle: string;
  data: GameData;
};

const regionFlags: Record<string, string> = {
  Brazil: 'https://flagcdn.com/w40/br.png',
  UnitedStates: 'https://flagcdn.com/w40/us.png',
  Europe: 'https://flagcdn.com/w40/eu.png',
  UnitedKingdom: 'https://flagcdn.com/w40/gb.png',
  Argentina: 'https://flagcdn.com/w40/ar.png',
  Japan: 'https://flagcdn.com/w40/jp.png',
  India: 'https://flagcdn.com/w40/in.png',
  Canada: 'https://flagcdn.com/w40/ca.png',
  China: 'https://flagcdn.com/w40/cn.png',
  Paraguay: 'https://flagcdn.com/w40/py.png',
};

function parseMonthYear(input: string): { date: Date; hasMonth: boolean } {
  const parts = input.trim().split(' ');
  if (parts.length === 2) {
    return { date: new Date(`${parts[0]} 1, ${parts[1]}`), hasMonth: true };
  } else if (parts.length === 1 && /^\d{4}$/.test(parts[0])) {
    return { date: new Date(`Jan 1, ${parts[0]}`), hasMonth: false };
  } else {
    return { date: new Date(input), hasMonth: false };
  }
}

export const CardGame = ({ gameTitle, data }: Props) => {
  const [gameData, setGameData] = useState<GameData>(data);
  const { launchDate, ...regionsData } = gameData;

  // Filtra apenas regiões que são objetos (não strings)
  const regions = Object.keys(regionsData).filter(
    (r) => typeof regionsData[r] === 'object' && regionsData[r] !== null
  );

  const handleFieldChange = (
    region: string,
    monthYear: string,
    idx: number,
    field: keyof GameData[string][string][0],
    value: any
  ) => {
    setGameData((prev) => {
      const updated = { ...prev };
      const entry = (updated[region] as any)[monthYear][idx];
      entry[field] = value;
      return updated;
    });
  };

  const addEntry = (region: string, monthYear: string) => {
    setGameData((prev) => {
      const updated = { ...prev };
      (updated[region] as any)[monthYear].push({
        edition: '',
        price: 0,
        currency: '',
      });
      return updated;
    });
  };

  const removeEntry = (region: string, monthYear: string, idx: number) => {
    setGameData((prev) => {
      const updated = { ...prev };
      (updated[region] as any)[monthYear].splice(idx, 1);
      return updated;
    });
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>{gameTitle}</h2>
        <p style={styles.launch}>
          Launch Date:{' '}
          <input
            type="date"
            value={launchDate}
            onChange={(e) =>
              setGameData((prev) => ({ ...prev, launchDate: e.target.value }))
            }
            style={styles.input}
          />
        </p>

        {regions.map((region) => {
          const monthsData = regionsData[region] as { [monthYear: string]: any[] };

          return (
            <section key={region} style={styles.regionSection}>
              <h3 style={styles.regionTitle}>
                <img
                  src={regionFlags[region]}
                  alt={`${region} flag`}
                  style={{ width: 24, height: 15, marginRight: 8, verticalAlign: 'middle' }}
                  draggable={false}
                />
                {region}
              </h3>

              {Object.entries(monthsData)
                .sort(([a], [b]) => {
                  const parsedA = parseMonthYear(a);
                  const parsedB = parseMonthYear(b);
                  return parsedB.date.getTime() - parsedA.date.getTime();
                })
                .map(([month, entries]) => (
                  <div key={month} style={{ marginBottom: '1rem' }}>
                    <h4 style={styles.monthTitle}>{month}</h4>

                    <ul style={styles.priceList}>
                      {entries.map((entry, idx) => (
                        <li key={idx} style={styles.priceItem}>
                          <input
                            type="text"
                            value={entry.edition}
                            placeholder="Edition"
                            onChange={(e) =>
                              handleFieldChange(region, month, idx, 'edition', e.target.value)
                            }
                            style={styles.input}
                          />

                          <select
                            value={entry.platform || ''}
                            onChange={(e) =>
                              handleFieldChange(region, month, idx, 'platform', e.target.value)
                            }
                            style={styles.input}
                          >
                            <option value="">None</option>
                            <option value="Xbox">Xbox</option>
                            <option value="Playstation 5">Playstation 5</option>
                            <option value="Playstation 5 | Xbox">Playstation 5 | Xbox</option>
                          </select>

                          <input
                            type="number"
                            value={entry.price}
                            placeholder="Price"
                            onChange={(e) =>
                              handleFieldChange(region, month, idx, 'price', parseFloat(e.target.value))
                            }
                            style={styles.input}
                          />

                          <input
                            type="text"
                            value={entry.currency}
                            placeholder="Currency"
                            onChange={(e) =>
                              handleFieldChange(region, month, idx, 'currency', e.target.value)
                            }
                            style={styles.input}
                          />

                          <input
                            type="number"
                            value={entry.discount || 0}
                            placeholder="Discount"
                            onChange={(e) =>
                              handleFieldChange(region, month, idx, 'discount', parseFloat(e.target.value))
                            }
                            style={styles.input}
                          />

                          <input
                            type="number"
                            value={entry.increase || 0}
                            placeholder="Increase"
                            onChange={(e) =>
                              handleFieldChange(region, month, idx, 'increase', parseFloat(e.target.value))
                            }
                            style={styles.input}
                          />

                          <button onClick={() => removeEntry(region, month, idx)}>Remove</button>
                        </li>
                      ))}
                    </ul>

                    <button onClick={() => addEntry(region, month)}>Add Entry</button>
                  </div>
                ))}
            </section>
          );
        })}
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: '1rem',
    backgroundColor: '#1e1e1e',
    minHeight: '100vh',
    fontFamily: '"Fira Code", monospace',
    textAlign: 'center',
  },
  card: {
    background: '#252526',
    color: '#d4d4d4',
    borderRadius: '8px',
    padding: '1.5rem 0.5rem',
    width: '100%',
    maxWidth: '350px',
    boxShadow: '0 0 10px rgba(0,0,0,0.3)',
    overflowY: 'auto',
    textAlign: 'center',
  },
  title: { fontSize: '1.5rem', marginBottom: '0.5rem', color: '#627d8fff' },
  launch: { fontSize: '0.85rem', color: '#6a9955', fontWeight: 'bold', marginBottom: '1rem' },
  regionSection: {
    marginBottom: '1.5rem',
    border: '1px solid #333',
    borderRadius: '6px',
    padding: '0.75rem',
    backgroundColor: '#1e1e1e',
  },
  regionTitle: { color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  monthTitle: {
    color: '#c586c0',
    marginBottom: '0.5rem',
    border: '1px solid #444',
    borderRadius: '4px',
    padding: '2px 6px',
    display: 'inline-block',
    fontSize: '0.8rem',
    backgroundColor: '#2d2d30',
  },
  priceList: { listStyle: 'none', padding: 0, margin: '0 auto', textAlign: 'center' },
  priceItem: {
    background: '#2d2d30',
    padding: '0.5rem',
    borderRadius: '4px',
    marginBottom: '0.5rem',
    border: '1px solid #3c3c3c',
    textAlign: 'center',
  },
  input: {
    padding: '0.3rem 0.5rem',
    borderRadius: '4px',
    border: '1px solid #555',
    marginBottom: '0.25rem',
    fontSize: '0.85rem',
    background: '#1e1e1e',
    color: '#d4d4d4',
    width: '90%',
  },
};