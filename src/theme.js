import { experimental_extendTheme as extendTheme } from '@mui/material/styles';


const theme = extendTheme({
    trello: {
        appBarHeight: '58px',
        boardBarHeight: '60px'
    },
    colorSchemes: {
        // light: {
        //     palette: {
        //         primary: teal,
        //         secondary: deepOrange
        //     }
        // },
        // dark: {
        //     palette: {
        //         primary: cyan,
        //         secondary: orange
        //     }
        // },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    '*::-webkit-scrollbar': {
                        width: '6px',
                        height: '6px'
                    },
                    '*::-webkit-scrollbar-thumb': {
                        backgroundColor: '#dcdde1',
                        borderRadius: '8px'
                    },
                    '*::-webkit-scrollbar-thumb:hover': {
                        backgroundColor: 'white',
                    }
                }
            }
        },
        // Name of the component
        MuiButton: {
            styleOverrides: {
                // Name of the slot
                root: {
                    // Some CSS
                    textTransform: 'none',
                    borderWidth: '1px',
                    // '&:hover': { borderWidth: '2px' }
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    fontSize: '0.875rem'
                }
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    fontSize: '0.875rem',
                    '& fieldset': {
                        borderWidth: '1px !important'
                    },
                    '&:hover fieldset': {
                        borderWidth: '2px !important'
                    }
                }
            },
        },
    }
});

export default theme;