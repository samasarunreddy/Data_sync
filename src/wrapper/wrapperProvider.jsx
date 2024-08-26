'use client';
import { createTheme, MantineProvider } from '@mantine/core';

export default function WrapperProvider({ children }) {
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

  return <MantineProvider theme={theme}>{children}</MantineProvider>;
}
