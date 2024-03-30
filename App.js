import { FlatList, SafeAreaView, StatusBar, StyleSheet } from "react-native"
import NotaEditor from "./src/componentes/NotaEditor"
import { useEffect, useState } from "react";
import { Nota } from "./src/componentes/Nota";
import { buscaNotas, criaTabela } from "./src/services/Notas";


export default function App() {
  useEffect(() => {  
    criaTabela()
    mostraNota()  
  }, [])

  const [notaSelecionada, setNotaSelecionada] = useState({})
  const [notas, setNotas] = useState([])
  
  async function mostraNota(){
    const todasNotas  = await buscaNotas()
    setNotas(todasNotas);
  }  

  return (    
    <SafeAreaView style={estilos.container}>
      <FlatList
        data={notas}
        renderItem={(nota) => <Nota {...nota} setNotaSelecionada={setNotaSelecionada} notaSelecionada={notaSelecionada}/>}
        keyExtractor={nota => nota.id}
      />
      <NotaEditor mostrarNotas={mostraNota} notaSelecionada={notaSelecionada} setNotaSelecionada={setNotaSelecionada} />
      <StatusBar/>
    </SafeAreaView>
  )
}

const estilos = StyleSheet.create({
	container: {
    paddingTop: '5%',
		flex: 1,
		alignItems: "stretch",
		justifyContent: "flex-start",
	},
})

