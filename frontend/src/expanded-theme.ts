import '@mui/material/styles';
import {PaletteColor, SimplePaletteColorOptions} from "@mui/material";

declare module '@mui/material/styles' {
    interface Palette {
        mainGradient: PaletteColor;
    }
    interface PaletteOptions {
        mainGradient?: SimplePaletteColorOptions;
    }
}