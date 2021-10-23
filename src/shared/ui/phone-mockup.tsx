import { FC } from "react"
import { x } from "@xstyled/styled-components"

export const PhoneMockup: FC = ({ children }) => (
  <x.div
    display="flex"
    alignItems="center"
    justifyContent="center"
    h="100vh"
    bg="black"
  >
    <x.div
      position="relative"
      display="flex"
      w="42rem"
      h="80.4rem"
      alignItems="center"
      justifyContent="center"
      bg="gray-800"
      borderRadius="5rem"
      overflow="hidden"
    >
      <x.div position="absolute" top="0" left="0" w="100%" h="100%" p="3">
        <x.div w="100%" h="100%" bg="gray-200" borderRadius="4rem" />
      </x.div>
      <x.div
        position="relative"
        zIndex="5"
        w="39rem"
        h="66.4rem"
        mx="auto"
        bg="gray"
        px="3"
        py="4"
        overflow="hidden"
      >
        {children}
      </x.div>
    </x.div>
  </x.div>
)
