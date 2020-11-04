import React from "react";
import Home from "./views/Home";
import AddContact from "./views/AddContact";
import EditContact from "./views/EditContact";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export default function App() {

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Lista de contatos" component={Home}/>
          <Stack.Screen name="Adicione um contato" component={AddContact}/>
          <Stack.Screen name="Edite um contato" component={EditContact}/>
        </Stack.Navigator>
    </NavigationContainer>  
  );
}
