'use client';
import { Provider as ReduxProvider } from 'react-redux';
import { createTheme, MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import store from '../store/store';

export default function WrapperProvider({ children }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  });

  const theme = createTheme({
    colors: {
      primary: [
        '#e0e7ee',
        '#bccede',
        '#95b4cf',
        '#759ec2',
        '#618fbb',
        '#5588b8',
        '#1E3E59',
        '#4675a3',
        '#3b6992',
        '#2c5a82',
      ],
    },
    primaryColor: 'primary',
  });

  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <MantineProvider theme={theme}>{children}</MantineProvider>
      </QueryClientProvider>
    </ReduxProvider>
  );
}
