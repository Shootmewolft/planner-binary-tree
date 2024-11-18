import { createContext, useContext } from "react";

interface LabelContextType<T> {
  label: T | null
  setLabel: React.Dispatch<React.SetStateAction<T>>
}

export const LabelContext = createContext<LabelContextType<string>>({
  label: null,
  setLabel: () => {}
})

export const useLabelContext = () => {
  const context = useContext(LabelContext)
  if (!context) {
    throw new Error("useLabelContext must be used within a LabelProvider")
  }
  return context
}