const secondary = '#009B9E';
const primary = '#F5AF19'
const textDarkBg = '#ffffff';
const textLightBg = '#232B28';
const highlight = '#8d8d8d';
const card = '#1D263B';
const white = '#ffffff';

export type ColorsType = {
    primary: string,
    secondary: string,
    text: string,
    border: string,
    card: string
}

export const colors = (dark: boolean): ColorsType => {
    return {primary, secondary, border:  highlight, card: dark?card:white, text: dark?textDarkBg:textLightBg}
}

export default colors;

