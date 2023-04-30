import React, { useEffect } from "react";
import { StyleSheet, FlatList, ScrollView, RefreshControl, LogBox } from "react-native";

import Item from './Componentes/Item';
import Topo from './Componentes/Topo';
import NovaCategoria from "./Componentes/NovaCategoria";
import { selectCategories, selectLink } from "../../database/queries";

let  categoriesList = []

async function updateCategory(usuario){
    let json = await selectCategories(usuario)
    categoriesList = []
    for (let i = 0; i < json.length; i++){
        categoriesList.push({
            usuario: usuario,
            nome: json[i]["category"],
            cor: json[i]["color"]
        })
    }
    return(categoriesList.sort((a, b) => a["nome"].localeCompare(b["nome"])))
}

export default function HomePage({ navigation, route}){
    LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
    LogBox.ignoreAllLogs();//Ignore all log notifications
    const {user} = route.params;
    const [refreshing, setRefreshing] = React.useState(false);

    updateCategory(user)

    useEffect(() => {
        setRefreshing(true);
        wait(500).then(() => setRefreshing(false));
    }, [])

    const wait = timeout => {
        return new Promise(resolve => setTimeout(resolve, timeout));
        };
    
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(800).then(() => setRefreshing(false));
    });

    return <ScrollView style={estilos.container}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            <FlatList
                data={categoriesList}
                renderItem={({ item }) => {
                    return <Item nome={item.nome} cor={item.cor} usuario={user}/>
                }}
                keyExtractor={({nome}) => nome}
                ListHeaderComponent={() => {
                    return <>
                        <Topo usuario={user}/>
                        <NovaCategoria usuario={user}/>
                    </>
                }}
            />
    </ScrollView>
}

const estilos = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignContent: "center",
        alignSelf: "center",
      },
    categoria: {
        height: 40,
        width: 350,
        margin: 5,
        padding: 10,
        borderRadius: 20,
        alignItems: "center",
    },
    texto: {
        color: "#000000",
        fontSize: 16,
        fontWeight: "bold",
    }
})