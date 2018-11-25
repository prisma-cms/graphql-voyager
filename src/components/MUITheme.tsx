import { createMuiTheme } from 'material-ui/styles';
import cyan from 'material-ui/colors/cyan';
import yellow from 'material-ui/colors/yellow';

import variables from './variables.css';

export const theme = createMuiTheme({
  palette: {
    primary: cyan,
    secondary: yellow,
  },
  typography: {
    fontSize: 12,
  },
  overrides: {
    MuiCheckbox: {
      root: {
        width: '30px',
        height: '15px',
      },
    },
    MuiIconButton: {
      root: {
        width: variables.iconsSize,
        height: variables.iconSize,
      },
    },
    MuiInput: {
      root: {
        marginBottom: '10px',
      },
    },
    MuiTooltip: {
      tooltip: {
        fontSize: variables.baseFontSize - 2,
      },
    },
    MuiSnackbar: {
      anchorOriginBottomLeft: {
        [variables.bigViewport]: {
          left: '340px',
          right: '20px',
          bottom: '20px',
        },
      },
    },
    MuiSnackbarContent: {
      root: {
        width: '50%',
        backgroundColor: variables.alertColor,
      },
    },
  },
});
