import React, { useState } from 'react';

type GameData = {
  launchDate: string;
  [region: string]: {
    [monthYear: string]: {
      edition: string;
      price: number;
      realPrice?: number; // ✅ Novo campo adicionado
      currency: string;
      discount?: number;
      increase?: number;
      exchangeTax?: number;
      basePrice2?: number;
      exchangeTax2?: number;
      basePrice3?: number;
      exchangeTax3?: number;
    }[];
  } | string;
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
  China: 'https://flagcdn.com/w40/cn.png'
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
  const regions = Object.keys(regionsData);

  const editionsSet = new Set<string>();
  regions.forEach((region) => {
    const monthsData = regionsData[region] as {
      [monthYear: string]: {
        edition: string;
        price: number;
        realPrice?: number;
        currency: string;
        discount?: number;
        increase?: number;
        exchangeTax?: number;
        basePrice2?: number;
        exchangeTax2?: number;
        basePrice3?: number;
        exchangeTax3?: number;
      }[];
    };
    Object.values(monthsData).forEach((arr) =>
      arr.forEach((entry) => editionsSet.add(entry.edition))
    );
  });
  const editions = Array.from(editionsSet);

  const [selectedEdition, setSelectedEdition] = useState<string>('');

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>{gameTitle}</h2>
        <p style={styles.launch}>
          Launch Date: {new Date(launchDate + 'T12:00:00').toLocaleDateString()}
        </p>

        {editions.length > 1 && (
          <div style={styles.editionSelector}>
            <strong style={{ color: '#bbb' }}>Select Edition:</strong>
            <div style={styles.editionRadios}>
              <label style={styles.editionRadioLabel}>
                <input
                  type="radio"
                  name="edition"
                  checked={selectedEdition === ''}
                  onChange={() => setSelectedEdition('')}
                  style={{ marginRight: 6, cursor: 'pointer' }}
                />
                All
              </label>
              {editions.map((edition) => (
                <label key={edition} style={styles.editionRadioLabel}>
                  <input
                    type="radio"
                    name="edition"
                    checked={selectedEdition === edition}
                    onChange={() => setSelectedEdition(edition)}
                    style={{ marginRight: 6, cursor: 'pointer' }}
                  />
                  {edition}
                </label>
              ))}
            </div>
          </div>
        )}

        {regions.map((region) => {
          const monthsData = regionsData[region] as {
            [monthYear: string]: {
              edition: string;
              price: number;
              realPrice?: number;
              currency: string;
              discount?: number;
              increase?: number;
              exchangeTax?: number;
              basePrice2?: number;
              exchangeTax2?: number;
              basePrice3?: number;
              exchangeTax3?: number;
            }[];
          };

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
                  const timeDiff = parsedB.date.getTime() - parsedA.date.getTime();
                  if (timeDiff !== 0) return timeDiff;
                  return parsedA.hasMonth === parsedB.hasMonth ? 0 : parsedA.hasMonth ? -1 : 1;
                })
                .map(([month, entries]) => {
                  const filteredEntries = selectedEdition
                    ? entries.filter((e) => e.edition === selectedEdition)
                    : entries;

                  if (filteredEntries.length === 0) return null;

                  return (
                    <div key={month} style={{ marginBottom: '1rem' }}>
                      <h4 style={styles.monthTitle}>{month}</h4>
                      <ul style={styles.priceList}>
                        {filteredEntries.map((entry, idx) => (
                          <li key={idx} style={styles.priceItem}>
                            <strong style={styles.edition}>{entry.edition}</strong>
                            <div>
                              {entry.currency} {entry.price.toFixed(2)}
                              {entry.discount !== undefined && (
                                <span style={styles.discount}> [-{entry.discount}%]</span>
                              )}
                              {entry.increase !== undefined && (
                                <span style={styles.increase}> [+{entry.increase}%]</span>
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
                  );
                })}
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
    alignItems: 'center',
    flexDirection: 'column',
    padding: '1rem',
    backgroundColor: '#1e1e1e',
    minHeight: '100vh',
    fontFamily: '"Fira Code", "Courier New", monospace',
    textAlign: 'center', // ⬅️ Centraliza todo o conteúdo por padrão
  },
  card: {
    background: '#252526',
    color: '#d4d4d4',
    borderRadius: '8px',
    padding: '1rem',
    width: '100%',
    maxWidth: '600px',
    boxShadow: '0 0 10px rgba(0,0,0,0.3)',
    overflowY: 'auto',
    textAlign: 'center', // ⬅️ Centraliza o conteúdo do card
  },
  title: {
    fontSize: '1.5rem',
    marginBottom: '0.5rem',
    color: '#569cd6',
    textAlign: 'center', // ⬅️ Centraliza o título
  },
  launch: {
    fontSize: '0.85rem',
    color: '#6a9955',
    marginBottom: '1rem',
    textAlign: 'center', // ⬅️ Centraliza a data
  },
  regionSection: {
    marginBottom: '1.5rem',
    border: '1px solid #333',
    borderRadius: '6px',
    padding: '0.75rem',
    backgroundColor: '#1e1e1e',
    textAlign: 'center', // ⬅️ Centraliza tudo dentro da região
  },
  regionTitle: {
    color: '#9cdcfe',
    borderBottom: '1px solid #333',
    paddingBottom: 4,
    marginBottom: '0.75rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center', // ⬅️ Centraliza os elementos (flag + nome)
    fontWeight: 'bold',
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
  priceList: {
    listStyle: 'none',
    padding: 0,
    margin: '0 auto',
    textAlign: 'center', // ⬅️ Centraliza a lista
  },
  priceItem: {
    background: '#2d2d30',
    padding: '0.5rem',
    borderRadius: '4px',
    marginBottom: '0.5rem',
    border: '1px solid #3c3c3c',
    textAlign: 'center', // ⬅️ Centraliza o conteúdo de cada item
  },
  edition: {
    display: 'block',
    fontSize: '0.95rem',
    marginBottom: '0.2rem',
    color: '#dcdcaa',
    textAlign: 'center', // ⬅️ Centraliza o nome da edição
  },
  discount: {
    color: '#d16969',
    marginLeft: '0.5rem',
  },
  increase: {
    color: '#4ec9b0',
    marginLeft: '0.5rem',
  },
  exchange: {
    color: '#b5cea8',
    fontSize: '0.7rem',
    display: 'block',
    textAlign: 'center', // ⬅️ Centraliza as linhas de exchange
  },
  secondaryLine: {
    marginTop: '0.25rem',
  },
  realPrice: {
    color: '#ce9178',
    fontSize: '0.75rem',
    marginTop: '0.25rem',
    textAlign: 'center', // ⬅️ Centraliza o realPrice
  },
  editionSelector: {
    marginBottom: '1rem',
    textAlign: 'center', // ⬅️ Centraliza o seletor de edição
  },
  editionRadios: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '1rem',
    marginTop: '0.3rem',
    textAlign: 'center',
  },
  editionRadioLabel: {
    color: '#d4d4d4',
    cursor: 'pointer',
    userSelect: 'none',
    textAlign: 'center', // ⬅️ Centraliza o label de cada radio
  },
};
