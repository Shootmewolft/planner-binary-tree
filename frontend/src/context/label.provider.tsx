import { ReactNode, useState } from "react";
import { LabelContext } from "./label.context";

interface Props{
  children: ReactNode
}

const EmptyLabelState = ""

export const LabelProvider = ({children}: Props) => {
  const [label, setLabel] = useState(EmptyLabelState)
  return (
    <LabelContext.Provider value={{label, setLabel}}>
      {children}
    </LabelContext.Provider>
  )
}