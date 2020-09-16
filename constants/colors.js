import { useColorScheme } from "react-native";

const secondary = '#009B9E';
const secondaryDark = '#006c70';
const primaryLight = '#FF9D14';
const primary = '#F5AF19'
const primaryTint = '#F8C964';
const textDarkBg = '#ffffff';
const textLightBg = '#232B28';
const highlight = '#8d8d8d';
const bgHighlight = 'rgba(245, 175, 25, .2)';
const card = '#1D263B';

export const dark = {
    primary,
    primaryTint,
    secondary,
    secondaryDark,
    card,
    text: textDarkBg,
    twitter: '#00acee',
    google: '#DB4437',
    facebook: '#4267B2',
    primaryLight,
    highlight,
    bgHighlight,
};

export const light = {
    primary,
    primaryTint,
    secondary,
    secondaryDark,
    text: textLightBg,
    twitter: '#00acee',
    google: '#DB4437',
    facebook: '#4267B2',
    primaryLight,
    highlight,
    bgHighlight,
};
