import { createMuiTheme } from '@material-ui/core/styles';

const defaultTheme = createMuiTheme();

const theme = createMuiTheme({
  ...defaultTheme,
  overrides: {
    MuiCard: {
      root: {
        padding: 0,
        margin: 8
      }
    },
    MuiCardActions: {
      root: {
        display: 'flex',
        justifyContent: 'flex-end',
        padding: 8
      }
    },
    MuiCardContent: {
      root: {
        padding: 8
      }
    },
    MuiCardHeader: {
      root: {
        padding: 8
      }
    },
    MuiCardMedia: {
      root: {
        padding: '56.25% 0 0 0',
        width: '100%'
      }
    },
    MuiGrid: {
      container: {
        margin: 0,
        padding: 8
      },
      item: {
        margin: 0,
        padding: 0,
        '& .MuiCard-root': {
          margin: 0
        }
      },
      "spacing-xs-2": {
        margin: 0,
        padding: 0,
        width: '100%'
      }
    },
  },
  palette: {
    primary: {
      dark: '#348742',
      light: '#67ba75',
      main: '#4da05b'
    },
    secondary: {
      dark: '#3782af',
      light: '#6ab5e2',
      main: '#509bc8'
    },
    warning: {
      dark: '#c20303',
      light: '#f53636',
      main: '#db1c1c'
    }
  },
  typography: {
    fontFamily: [
      'Ubuntu',
      'Roboto',
      'Arial',
      'sans-serif'
    ].join(',')
  }
})

export default theme;