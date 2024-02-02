import { Router } from "./router"
import { MantineProvider } from "@mantine/core"
import { Notifications } from '@mantine/notifications';

function App() {
  return (
    <MantineProvider defaultColorScheme="dark">
      <Notifications />
      <Router />
    </MantineProvider>
  )
}

export default App
