import { extendTheme, Theme } from '@chakra-ui/react';

export const theme: Theme = extendTheme({
  colors: {
    brand: {
      50: '#D7DfFf',
      100: '#D7D8F9',
      200: '#B1B2F4',
      300: '#8285DE',
      400: '#5C5EBD',
      500: '#2E3092',
      600: '#21237D',
      700: '#171869',
      800: '#0E0F54',
      900: '#080946',
    },
    orange: {
      50: '#fff2db',
      100: '#ffdbb0',
      200: '#fcc481',
      300: '#faad52',
      400: '#f79521',
      500: '#de7c08',
      600: '#ac6003',
      700: '#7c4501',
      800: '#4c2800',
      900: '#1e0c00',
    },
  },
  components: {
    Popover: {
      parts: ['popper'],
      baseStyle: {
        popper: {
          zIndex: 10,
          maxW: '100%',
          w: '100%',
        },
      },
    },
  },
});
