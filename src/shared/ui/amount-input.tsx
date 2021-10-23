import { useCallback, forwardRef } from "react"
import NumberFormat, { NumberFormatProps } from "react-number-format"
import styled from "styled-components"

type AmountInputProps = Pick<NumberFormatProps, "prefix" | "onKeyDown"> & {
  value: number | null
  onChange?: (value: number | null) => void
}
const AmountInput = forwardRef<HTMLInputElement, AmountInputProps>(
  function AmountInput({ value, onChange, onKeyDown, ...rest }, ref) {
    const handleInputChange = useCallback(
      (e) => {
        const numAsString = (e.target.value ?? "").replace(/[^0-9.]/g, "")
        onChange?.call(
          null,
          numAsString === "" ? null : parseFloat(numAsString)
        )
      },
      [onChange]
    )

    return (
      <NumberFormatStyled
        getInputRef={ref}
        value={value ?? ""}
        thousandSeparator=","
        decimalSeparator="."
        allowNegative={false}
        decimalScale={2}
        placeholder="0"
        onChange={handleInputChange}
        {...rest}
      />
    )
  }
)

const NumberFormatStyled = styled(NumberFormat)`
  text-align: right;
  font-weight: bold;
  padding: 0;
  border: 0;
  border-radius: 0;
  outline: none;
`

export default AmountInput
