import { ComponentPropsWithoutRef, forwardRef } from "react"
import { x } from "@xstyled/styled-components"
import { DownOutlined } from "@ant-design/icons"

export type UISelectOptions = { label: string; value: string }[]
export type UISelectProps = Omit<
  ComponentPropsWithoutRef<"select">,
  "options"
> & {
  options: UISelectOptions
  unselectedLabel?: string
}

const UISelect = forwardRef<HTMLSelectElement, UISelectProps>(function UISelect(
  { name, value, options, className, unselectedLabel, ...rest },
  ref
) {
  return (
    <x.div w="full" position="relative">
      <x.span display="flex" alignItems="center">
        {value || unselectedLabel}

        <x.span fontSize="12px" ml=".5em">
          <DownOutlined />
        </x.span>
      </x.span>

      <x.select
        {...rest}
        value={value}
        name={name}
        ref={ref}
        position="absolute"
        top="0"
        left="0"
        opacity="0"
        w="full"
        h="full"
        fontSize="12px"
      >
        {options?.map((option, i) => {
          return (
            <option key={i} value={option.value}>
              {option.label}
            </option>
          )
        })}
      </x.select>
    </x.div>
  )
})

export default UISelect
