import { MantineProvider, Title, AppShell, ScrollArea } from '@mantine/core';

import '@mantine/core/styles.css';
import Characters from './pages/CharactersPage';

function App() {
  return (
    <>
      <MantineProvider forceColorScheme='dark'>
        <AppShell header={{ height: 120 }} padding='md'>
          <AppShell.Header>
            {' '}
            <Title>React Coding Exercise</Title>
          </AppShell.Header>

          <AppShell.Main>
            <ScrollArea.Autosize mx='auto'>
              <Characters />
            </ScrollArea.Autosize>
          </AppShell.Main>
        </AppShell>
      </MantineProvider>
    </>
  );
}

export default App;
