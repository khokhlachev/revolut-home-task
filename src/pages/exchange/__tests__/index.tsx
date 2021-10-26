import { generateRates, renderWithProviders } from "@/shared/testing"
import { App } from "@/app"
import { rest, RestRequest } from "msw"
import { setupServer } from "msw/node"
import userEvent from "@testing-library/user-event"
import { waitFor, within } from "@testing-library/react"

const API_URL = `https://revolut-home-task.khokhlachev.com/api`
export const handlers = [
  rest.get(`${API_URL}/rates`, (req: RestRequest, res, ctx) => {
    return res(
      ctx.json(generateRates(req.url.searchParams.get("base") as CurrencyCode)),
      ctx.delay(150)
    )
  }),
  rest.post(`${API_URL}/transaction`, (req: RestRequest, res, ctx) => {
    return res(ctx.json(req.body), ctx.delay(150))
  }),
]

const server = setupServer(...handlers)
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

function parseAmount(value: string | null) {
  return parseFloat(value?.replace(/[^0-9.]/g, "") || "0")
}

function parseAmountFromInput(input: HTMLInputElement) {
  return parseAmount(input.value)
}

describe("ExchangePage", () => {
  it("can toggle exchange action", async () => {
    const { finishLoading, getByTestId } = renderWithProviders(<App />, {
      route: "/exchange",
    })
    await finishLoading()
    const actionText = getByTestId("exchange-action")
    const button = getByTestId("transaction-button")

    expect(actionText.textContent).toMatch(/^sell/i)
    expect(button.textContent).toMatch(/^sell/i)

    userEvent.click(getByTestId("toggle-exchange-action"))

    expect(actionText.textContent).toMatch(/^buy/i)
    expect(button.textContent).toMatch(/^buy/i)
  })

  it("should keep input values in sync", async () => {
    const { finishLoading, getByTestId, getAllByTestId } = renderWithProviders(
      <App />,
      {
        route: "/exchange",
      }
    )
    await finishLoading()

    // wait for currency rates to load
    await waitFor(() =>
      expect(getByTestId("exchange-rate")).toBeInTheDocument()
    )

    const rate = parseAmount(getByTestId("exchange-rate").textContent as string)
    const [firstWidget, secondWidget] = getAllByTestId("exchange-widget")
    const firstInput = within(firstWidget).getByPlaceholderText(
      "0"
    ) as HTMLInputElement
    const secondInput = within(secondWidget).getByPlaceholderText(
      "0"
    ) as HTMLInputElement

    expect(parseAmountFromInput(secondInput)).toEqual(0)

    userEvent.type(firstInput, "100.115")

    expect(firstInput.value).toEqual("–100.11")
    expect(secondInput.value).toEqual(
      `+${(parseAmountFromInput(firstInput) * rate).toFixed(2)}`
    )

    expect(secondInput.value).toEqual(
      `+${(parseAmountFromInput(firstInput) * rate).toFixed(2)}`
    )
  })

  it("should make a transaction", async () => {
    const { finishLoading, getByTestId, getAllByTestId } = renderWithProviders(
      <App />,
      {
        route: "/exchange",
      }
    )
    await finishLoading()

    // wait for currency rates to load
    await waitFor(() =>
      expect(getByTestId("exchange-rate")).toBeInTheDocument()
    )

    const [firstWidget] = getAllByTestId("exchange-widget")

    const firstInput = within(firstWidget).getByPlaceholderText(0)
    const firstBalance = within(firstWidget).getByTestId("balance")

    const firstAmountBefore = parseAmount(firstBalance.textContent as string)

    const AMOUNT_TO_SELL = 100
    userEvent.type(firstInput, `${AMOUNT_TO_SELL}`)

    const button = getByTestId("transaction-button")

    expect(button).not.toBeDisabled()
    userEvent.click(button)

    await waitFor(() =>
      expect(getByTestId("transaction-loading-message")).toBeInTheDocument()
    )
    await waitFor(() =>
      expect(getByTestId("transaction-success-message")).toBeInTheDocument()
    )

    const backdrop = getByTestId("transaction-popup-backdrop")
    userEvent.click(backdrop)
    expect(backdrop).not.toBeInTheDocument()

    const firstAmountAfter = parseAmount(firstBalance.textContent as string)
    expect(firstAmountAfter).toEqual(firstAmountBefore - AMOUNT_TO_SELL)
  })
})
