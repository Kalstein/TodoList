import MyList from './content/MyList'
import SignIn from './content/SignInPage'
import SignUp from './content/SignUpPage'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  const Stack = createStackNavigator()

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SignIn"
      >
          <Stack.Screen name="Home" component={MyList} />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}