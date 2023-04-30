import React, {useState} from 'react';
import { View, TextInput, StyleSheet } from "react-native"

import Janela from './Janela';

export default function Topo(usuario){
    const [text, setText] = useState('');
    
    return <>
        <View style={estilos.search}>
            <TextInput style={estilos.input} onChangeText={newText => setText(newText)} placeholder={"Adicionar link"}/>
            <Janela texto={text} usuario={usuario}/>
        </View>
        
        
    </>
}

const estilos = StyleSheet.create({
    input: {
        height: 50,
        width: 300,
        margin: 12,
        padding: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#AFAFAF",
        fontSize: 22,
        alignSelf: 'center',
    },
    botao: {
        height: 40,
        width: 30,
        padding: 12,
        borderRadius: 12,
    },
    search: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "center",
    },
})
