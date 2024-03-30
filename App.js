import { FlatList, SafeAreaView, StatusBar, StyleSheet,Text, View } from "react-native"
import NotaEditor from "./src/componentes/NotaEditor"
import { useEffect, useState } from "react";
import { Nota } from "./src/componentes/Nota";
import { buscaNotas, buscaNotasPorCategoria, criaTabela } from "./src/services/Notas";
import {Picker} from '@react-native-picker/picker';


export default function App() {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('')
  const [notaSelecionada, setNotaSelecionada] = useState({})
  const [notas, setNotas] = useState([])

  useEffect(() => {  
    criaTabela()
    mostraNota()  
  }, [])

  useEffect(() => {
    console.log(categoriaSelecionada);
    if (categoriaSelecionada == '') {
      mostraNota();
    } else {
      filtrarNotaPorCategoria();
    }
    
  }, [categoriaSelecionada])

  
  async function filtrarNotaPorCategoria(){
    console.log('1')
    const todasNotas  = await buscaNotasPorCategoria(categoriaSelecionada)
    setNotas(todasNotas);
  }

  async function mostraNota(){
    const todasNotas  = await buscaNotas()
    setNotas(todasNotas);
  }  

  return (    
    <SafeAreaView style={estilos.container}>
       <Text style={estilos.filtroSubTitulo}>Filtrar por categoria</Text>
        <View style={estilos.filtroPicker}>
        <Picker 
            selectedValue={categoriaSelecionada}
            onValueChange={novaCategoria => setCategoriaSelecionada(novaCategoria)}>
            <Picker.Item label='Todas' value='' />
            <Picker.Item label='Pessoal' value='Pessoal' />
            <Picker.Item label='Trabalho' value='Trabalho' />
            <Picker.Item label='Outros' value='Outros' />
        </Picker>
      </View>
      <FlatList
        style={estilos.lista}
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
  lista: {
    marginTop: 25,
  },  
  filtroSubTitulo: {
    fontSize: 22,
    marginBottom: 8,
    marginLeft: 10,
    fontWeight: "600",
    paddingHorizontal: '5%'
  },
  filtroPicker: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#EEEEEE",
    marginBottom: 12,
    paddingHorizontal: '5%'
  },
})

