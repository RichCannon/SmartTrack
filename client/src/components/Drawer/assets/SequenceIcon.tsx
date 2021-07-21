import { FC } from "react"

const Sequence: FC<{ isPressed: boolean }>  = ({isPressed}) => (
   <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill={"none"}>
      <rect x="14.5" y="7.5" width="5" height="5" rx="0.5" stroke={isPressed ? "white" : "#6AC7BE"} />
      <rect x="0.5" y="0.5" width="5" height="5" rx="0.5" stroke={isPressed ? "white" : "#6AC7BE"} />
      <rect x="0.5" y="7.5" width="5" height="5" rx="0.5" stroke={isPressed ? "white" : "#6AC7BE"} />
      <rect x="7.5" y="0.5" width="5" height="5" rx="0.5" stroke={isPressed ? "white" : "#6AC7BE"} />
      <rect x="14.5" y="0.5" width="5" height="5" rx="0.5" stroke={isPressed ? "white" : "#6AC7BE"} />
      <rect x="21.5" y="0.5" width="5" height="5" rx="0.5" stroke={isPressed ? "white" : "#6AC7BE"} />
      <rect x="0.5" y="14.5" width="5" height="5" rx="0.5" stroke={isPressed ? "white" : "#6AC7BE"} />
      <rect x="7.5" y="14.5" width="5" height="5" rx="0.5" stroke={isPressed ? "white" : "#6AC7BE"} />
      <rect x="7.5" y="21.5" width="5" height="5" rx="0.5" stroke={isPressed ? "white" : "#6AC7BE"} />
      <rect x="14.5" y="14.5" width="5" height="5" rx="0.5" stroke={isPressed ? "white" : "#6AC7BE"} />
      <rect x="21.5" y="14.5" width="5" height="5" rx="0.5" stroke={isPressed ? "white" : "#6AC7BE"} />
      <rect x="14.5" y="21.5" width="5" height="5" rx="0.5" stroke={isPressed ? "white" : "#6AC7BE"} />
      <rect x="21.5" y="7.5" width="5" height="5" rx="0.5" stroke={isPressed ? "white" : "#6AC7BE"} />
   </svg>
)

export default Sequence