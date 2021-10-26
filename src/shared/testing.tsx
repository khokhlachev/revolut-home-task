import { ReactElement, Suspense, ReactNode } from "react"
import { render, waitFor } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import { ThemeProvider } from "@xstyled/styled-components"
import { Provider as ReduxProvider } from "react-redux"
import { theme } from "@/app/config"
import { store as rootStore } from "@/app/store"

type RenderWithRouterOptions = {
  route?: string
  store?: typeof rootStore
}
export const renderWithProviders = (
  ui: ReactElement,
  { route = "/", store = rootStore }: RenderWithRouterOptions
) => {
  window.history.pushState({}, "Test page", route)

  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <ReduxProvider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Suspense fallback="test loading...">{children}</Suspense>
          </BrowserRouter>
        </ThemeProvider>
      </ReduxProvider>
    )
  }

  const utils = render(ui, {
    wrapper: Wrapper,
  })
  const finishLoading = () =>
    waitFor(() => expect(utils.queryByText("test loading...")).toBeNull())

  return {
    finishLoading,
    ...utils,
  }
}

export function generateRates(baseCode: CurrencyCode) {
  return {
    base_code: baseCode,
    conversion_rates: {
      USD: 1,
      AED: 3.6725,
      AFN: 84.9545,
      ALL: 104.8456,
      AMD: 477.7273,
      ANG: 1.79,
      AOA: 603.3659,
      ARS: 99.4766,
      AUD: 1.336,
      AWG: 1.79,
      AZN: 1.7022,
      BAM: 1.679,
      BBD: 2,
      BDT: 85.7198,
      BGN: 1.6793,
      BHD: 0.376,
      BIF: 1987.3985,
      BMD: 1,
      BND: 1.346,
      BOB: 6.9017,
      BRL: 5.6756,
      BSD: 1,
      BTN: 74.878,
      BWP: 11.1862,
      BYN: 2.4319,
      BZD: 2,
      CAD: 1.2321,
      CDF: 1991.1171,
      CHF: 0.9166,
      CLP: 818.4168,
      CNY: 6.3871,
      COP: 3769.9941,
      CRC: 629.2415,
      CUC: 1,
      CUP: 25,
      CVE: 94.6591,
      CZK: 22.0804,
      DJF: 177.721,
      DKK: 6.4045,
      DOP: 56.3962,
      DZD: 137.3149,
      EGP: 15.7027,
      ERN: 15,
      ETB: 47.3576,
      EUR: 0.8585,
      FJD: 2.0694,
      FKP: 0.7258,
      FOK: 6.4045,
      GBP: 0.7258,
      GEL: 3.1369,
      GGP: 0.7258,
      GHS: 6.0783,
      GIP: 0.7258,
      GMD: 52.7248,
      GNF: 9715.8686,
      GTQ: 7.7453,
      GYD: 209.9028,
      HKD: 7.7716,
      HNL: 24.1569,
      HRK: 6.4681,
      HTG: 99.7373,
      HUF: 313.5526,
      IDR: 14144.7881,
      ILS: 3.2227,
      IMP: 0.7258,
      INR: 74.8784,
      IQD: 1464.035,
      IRR: 42087.3042,
      ISK: 128.9451,
      JMD: 151.8603,
      JOD: 0.709,
      JPY: 113.7105,
      KES: 111.0912,
      KGS: 84.9215,
      KHR: 4085.0811,
      KID: 1.3359,
      KMF: 422.3393,
      KRW: 1177.3051,
      KWD: 0.2996,
      KYD: 0.8333,
      KZT: 426.296,
      LAK: 10178.5397,
      LBP: 1507.5,
      LKR: 200.8687,
      LRD: 163.788,
      LSL: 14.7196,
      LYD: 4.5726,
      MAD: 9.0474,
      MDL: 17.4163,
      MGA: 3974.2827,
      MKD: 53.0994,
      MMK: 1895.7562,
      MNT: 2861.3303,
      MOP: 8.0047,
      MRU: 36.3118,
      MUR: 42.6793,
      MVR: 15.4305,
      MWK: 815.7962,
      MXN: 20.2205,
      MYR: 4.1515,
      MZN: 64.1273,
      NAD: 14.7196,
      NGN: 423.3286,
      NIO: 35.2963,
      NOK: 8.3451,
      NPR: 119.8049,
      NZD: 1.3973,
      OMR: 0.3845,
      PAB: 1,
      PEN: 3.9595,
      PGK: 3.5161,
      PHP: 50.803,
      PKR: 174.1498,
      PLN: 3.9545,
      PYG: 6911.3402,
      QAR: 3.64,
      RON: 4.2438,
      RSD: 101.2375,
      RUB: 70.476,
      RWF: 1018.223,
      SAR: 3.75,
      SBD: 7.9639,
      SCR: 14.5679,
      SDG: 439.3732,
      SEK: 8.575,
      SGD: 1.346,
      SHP: 0.7258,
      SLL: 10629.996,
      SOS: 580.0731,
      SRD: 21.5379,
      SSP: 175.9032,
      STN: 21.0325,
      SYP: 1681.7769,
      SZL: 14.7196,
      THB: 33.3648,
      TJS: 11.2955,
      TMT: 3.5035,
      TND: 2.8167,
      TOP: 2.2376,
      TRY: 9.6465,
      TTD: 6.7929,
      TVD: 1.3359,
      TWD: 27.878,
      TZS: 2306.2173,
      UAH: 26.3149,
      UGX: 3600.8082,
      UYU: 43.8803,
      UZS: 10673.1272,
      VES: 4.2116,
      VND: 22797.7404,
      VUV: 110.4719,
      WST: 2.5443,
      XAF: 563.1191,
      XCD: 2.7,
      XDR: 0.7067,
      XOF: 563.1191,
      XPF: 102.4429,
      YER: 250.7846,
      ZAR: 14.7203,
      ZMW: 17.0959,
    },
  }
}
