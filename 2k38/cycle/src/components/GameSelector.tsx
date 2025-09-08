// GameSelector.tsx
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
    sub: false, game: false, car: false, console: false, product: false, coin: false,
  });
  const [groupFilter, setGroupFilter] = useState<string>('All');
  const [regionFilter, setRegionFilter] = useState<string>('All');
  const [editionFilter, setEditionFilter] = useState<string>('All');
  const [launchDateStart, setLaunchDateStart] = useState<string>('');
  const [launchDateEnd, setLaunchDateEnd] = useState<string>('');

  const toggleGroup = (type: ItemType) => setOpenGroups(prev => ({ ...prev, [type]: !prev[type] }));
  const closeAllGroups = () => setOpenGroups({ sub:false, game:false, car:false, console:false, product:false, coin:false });
  const handleSelect = (type: ItemType, title: string) => { setSelected({ type, title }); closeAllGroups(); };
  const goHome = () => {
    setSelected({ type: 'all' });
    setGroupFilter('All'); setRegionFilter('All'); setEditionFilter('All');
    setLaunchDateStart(''); setLaunchDateEnd('');
    closeAllGroups();
  };

  const getData = (type: ItemType, title: string) => {
    switch(type){
      case 'game': return games[title as GameTitle];
      case 'sub': return subs[title as SubTitle];
      case 'car': return cars[title as CarTitle];
      case 'console': return consoles[title as ConsoleTitle];
      case 'product': return products[title as ProductTitle];
      case 'coin': return coins[title as CoinTitle];
      default: return null;
    }
  };

  // Todas as regiões únicas
  const allRegions = Array.from(new Set(
    dataGroups.flatMap(g => Object.values(g.items).flatMap((item:any)=>Object.keys(item).filter(k=>k!=='launchDate')))
  )).sort();

  // Todas as edições únicas
  const allEditions = Array.from(new Set(
    dataGroups.flatMap(g => Object.values(g.items).flatMap((item:any) =>
      Object.entries(item as Record<string, any>)
        .filter(([region]) => region!=='launchDate')
        .flatMap(([_, regionData]) => Object.values(regionData as Record<string, any>)
          .flatMap((arr:any) => Array.isArray(arr) ? arr.map(x=>x.edition).filter(Boolean):[])
        )
    ))
  )).sort();

  // Filtragem completa
  const allItems = dataGroups
    .filter(g => groupFilter==='All' || g.label===groupFilter)
    .flatMap(group => Object.entries(group.items).map(([title, data]) => {
      const filteredData: Record<string, any> = {};

      for (const [region, regionData] of Object.entries(data)) {
        if(region==='launchDate') { filteredData[region] = regionData; continue; }
        if(regionFilter!=='All' && region!==regionFilter) continue;

        const monthFiltered: Record<string, any> = {};
        for (const [monthYear, items] of Object.entries(regionData as Record<string, any>)) {
          if(!Array.isArray(items)) continue;
          const filteredItems = editionFilter==='All' ? items : items.filter((x:any)=>x.edition===editionFilter);
          if(filteredItems.length>0) monthFiltered[monthYear] = filteredItems;
        }

        if(Object.keys(monthFiltered).length>0) filteredData[region] = monthFiltered;
      }

      // Filtragem Launch Date
      if(launchDateStart || launchDateEnd){
        const launchStr = filteredData.launchDate;
        if(launchStr){
          const dateObj = new Date(launchStr);
          if(launchDateStart && dateObj < new Date(launchDateStart)) return null;
          if(launchDateEnd && dateObj > new Date(launchDateEnd)) return null;
        }
      }

      // Só incluir se houver meses/regiões com itens
      const hasItems = Object.entries(filteredData).some(([r, rData]) => r!=='launchDate' && Object.keys(rData).length>0);
      if(!hasItems) return null;

      return [title, filteredData] as const;
    }))
    .filter((i): i is [string, any] => i!==null);

  return (
    <div style={styles.container}>
      <div style={styles.navbar}>
        <button onClick={goHome} style={styles.homeButton}>🏠 Home</button>
        <h2 style={styles.navTitle}>👟 Pick a Shoe</h2>
      </div>

      {selected.type==='all' && <>
        <div style={styles.filterContainer}>
          <div>
            <label>Group: </label>
            <select value={groupFilter} onChange={e=>setGroupFilter(e.target.value)}>
              <option value="All">All</option>
              {dataGroups.map(g=><option key={g.label} value={g.label}>{g.label}</option>)}
            </select>
          </div>
          <div>
            <label>Region: </label>
            <select value={regionFilter} onChange={e=>setRegionFilter(e.target.value)}>
              <option value="All">All</option>
              {allRegions.map(r=><option key={r} value={r}>{r}</option>)}
            </select>
          </div>
        </div>

        <div style={styles.filterEdition}>
          <label>Edition: </label>
          <select value={editionFilter} onChange={e=>setEditionFilter(e.target.value)}>
            <option value="All">All</option>
            {allEditions.map(e=><option key={e} value={e}>{e}</option>)}
          </select>
        </div>

        <div style={styles.filterEdition}>
          <label>Launch Date: </label>
          <div style={styles.datePickerContainer}>
            <div style={styles.dateInputWrapper}>
              <input type="date" value={launchDateStart} onChange={e=>setLaunchDateStart(e.target.value)} style={styles.dateInput}/>
              <span style={styles.calendarIcon}>📅</span>
            </div>
            <span>→</span>
            <div style={styles.dateInputWrapper}>
              <input type="date" value={launchDateEnd} onChange={e=>setLaunchDateEnd(e.target.value)} style={styles.dateInput}/>
              <span style={styles.calendarIcon}>📅</span>
            </div>
          </div>
        </div>
      </>}

      {dataGroups.map(({label,type,items,emoji})=>{
        return <div key={type} style={styles.group}>
          <button onClick={()=>toggleGroup(type)} style={{...styles.groupButton, ...(openGroups[type]?styles.groupButtonActive:{})}}>{emoji} {label} ({Object.keys(items).length})</button>
          {openGroups[type] && <ul style={styles.itemList}>
            {Object.keys(items).sort().map(title=>(
              <li key={`${type}|${title}`}>
                <button onClick={()=>handleSelect(type,title)} style={{...styles.itemButton, ...(selected.type===type && selected.title===title?styles.itemButtonSelected:{})}}>{title}</button>
              </li>
            ))}
          </ul>}
        </div>
      })}

      <div style={styles.cardWrapper}>
        {selected.type==='all' ? 
          (allItems.length>0 ? allItems.map(([title,data])=>
            <div key={title} style={{marginBottom:'0.5rem', overflowX:'auto'}}>
              <CardGame gameTitle={title} data={data}/>
            </div>
          ) : <div style={{color:'#999'}}>Nenhum item encontrado</div>)
        :
          (()=>{ const data = getData(selected.type, selected.title!); return data && Object.keys(data).length>0 ? <CardGame gameTitle={selected.title!} data={data}/> : <div style={{color:'#999'}}>Nenhum item encontrado</div> })()
        }
      </div>
    </div>
  );
};

// estilos
const styles: { [key: string]: React.CSSProperties } = {
  container:{padding:'0.75rem',fontFamily:'"Fira Code","Courier New",monospace',maxWidth:'800px',margin:'auto',color:'#d4d4d4',backgroundColor:'#1e1e1e',borderRadius:'6px',boxShadow:'0 0 6px rgba(0,0,0,0.4)',textAlign:'center'},
  navbar:{display:'flex',justifyContent:'flex-start',alignItems:'center',background:'#333',padding:'0.375rem 0.5rem',borderRadius:'5px',marginBottom:'0.5rem',position:'sticky',top:0,zIndex:100,gap:'0.5rem'},
  navTitle:{margin:0,fontSize:'1.3rem',flexGrow:1,textAlign:'center'},
  homeButton:{background:'#555',border:'none',color:'#fff',padding:'0.2rem 0.375rem',borderRadius:'5px',fontWeight:'bold',cursor:'pointer',transition:'background 0.2s',flexShrink:0},
  group:{marginBottom:'0.375rem'},
  groupButton:{width:'100%',background:'#333',border:'none',color:'#fff',padding:'0.2rem 0.375rem',borderRadius:'5px',fontWeight:'bold',textAlign:'center',cursor:'pointer',userSelect:'none',fontSize:'0.85rem',transition:'background 0.2s'},
  groupButtonActive:{background:'#444'},
  itemList:{listStyle:'none',margin:0,paddingLeft:'0.25rem',maxHeight:'150px',overflowY:'auto',background:'#252526',borderRadius:'4px',marginTop:'0.125rem',border:'1px solid #333',textAlign:'left'},
  itemButton:{width:'100%',background:'transparent',border:'none',color:'#ccc',padding:'0.125rem 0.25rem',textAlign:'left',cursor:'pointer',borderRadius:'4px',fontSize:'0.8rem',transition:'background 0.2s,color 0.2s'},
  itemButtonSelected:{background:'#3c3c3c',color:'#9cdcfe'},
  cardWrapper:{marginTop:'0.5rem',display:'block',minHeight:'500px',width:'100%',overflowY:'auto',overflowX:'auto',paddingBottom:'0.5rem'},
  filterContainer:{display:'flex',flexDirection:'column',gap:'0.5rem',marginBottom:'0.5rem',alignItems:'center'},
  filterEdition:{marginBottom:'0.5rem',display:'flex',flexDirection:'column',alignItems:'center',gap:'0.25rem'},
  datePickerContainer:{display:'flex',gap:'0.25rem',justifyContent:'center',alignItems:'center'},
  dateInputWrapper:{position:'relative',display:'flex',alignItems:'center',background:'#2a2a2a',borderRadius:'6px',padding:'0.2rem 0.25rem',border:'1px solid #444'},
  dateInput:{background:'transparent',border:'none',color:'#d4d4d4',padding:'0.25rem 0.3rem',borderRadius:'4px',width:'120px',fontSize:'0.85rem',outline:'none'},
  calendarIcon:{marginLeft:'0.25rem',pointerEvents:'none',fontSize:'1rem'}
};
