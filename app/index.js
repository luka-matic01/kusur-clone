import { Text } from 'react-native';
import {useSession,useAuth} from '@clerk/clerk-expo';

export default function Page() {
    const { signOut} = useAuth();
    const { isLoaded, isActive  } = useSession();

   
    // signOut();
  return <Text>Home page</Text>;
}