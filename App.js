import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from "./src/screens/HomeScreen";
import PinsListScreen from "./src/screens/PinsListScreen"
import RunPage from "./src/screens/RunScreen";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
      <NavigationContainer>
          <Stack.Navigator>
              <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
              <Stack.Screen name="List" component={PinsListScreen} options={{ title: 'List of pins' }}/>
              <Stack.Screen name="Run" component={RunPage} options={{ title: "Training" }} />
          </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
