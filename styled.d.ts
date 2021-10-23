// import original module declarations
import "styled-components"
import "@xstyled/system"
import {
  ITheme,
  DefaultTheme as XStyledDefaultTheme,
} from "@xstyled/styled-components"

interface AppTheme extends ITheme, XStyledDefaultTheme {
  screens: {
    _: number
    md: number
    lg: number
    xl: number
    "2xl": number
    "3xl": number
  }
  colors: XStyledDefaultTheme["colors"] & { gray: string; blue: string }
  space: {
    0: string
    1: string
    2: string
    3: string
    4: string
    5: string
    6: string
    7: string
    8: string
    9: string
    11: string
    12: string
    13: string
    14: string
    15: string
    16: string
    17: string
    18: string
    19: string
    20: string
  }
  animations: XStyledDefaultTheme["animations"] & {
    "fade-in-slow": string
    "fade-in": string
  }
}

// and extend them!
declare module "@xstyled/system" {
  export interface Theme extends AppTheme {}
}
declare module "styled-components" {
  export interface DefaultTheme extends AppTheme {}
}
