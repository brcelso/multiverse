export default function Hello({person}) {
    return (
    <div>    
    <h1>
    <img 
        src={person.avatar} 
        style={{ width: '50px', height: '50px', borderRadius: '20%' }} // Definindo tamanho do avatar
      />
        {person.message} {person.emoji} {person.name} {person.seatNumbers}
    </h1>
    </div>
    );
}

/*Components + Props
add props direto na funcao
function Hello {message, emoji, name}
desestruturar props
 {message} {name}
const { message, emoji, name } = props;
adicionar props no componente
function Hello(props) {}
mostrar o props no console se o app definir 
app - <Hello name=Celso message="Hello!" />
console.log(props);
mostrar o props no app
<h1> {props.name} {props.message }</h1>

#o react so retorna 2 ou mais valores se 
estiver dentro do div

#atribuir const para mostrar no componente
const name = "Celso";
return <h1> {name} </h1>;

#atribuir uma funcao para mostrar no componente
function displayMessage() {
 } return "Wow";
 return <h1> {displayMessage()} </h1>
 */