import { useEffect, useCallback, useRef, useState } from "react"
import styled from "styled-components"
import { drawPlot } from "../helpers/drawPlot"

const Plot = () => {
  // See this article for more reference:
  // https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [canvasWidth, setCanvasWidth] = useState(window.innerWidth - 130)
  const [canvasHeight, setCanvasHeight] = useState(window.innerHeight - 80)

  const resizeHandler = useCallback(() => {
    setCanvasWidth(window.innerWidth - 130)
    setCanvasHeight(window.innerHeight - 80)

    // Re-draw plot
    drawPlot(canvasRef.current as HTMLCanvasElement)
  }, [])

  useEffect(() => {
    // Event listener to set width and height of canvas programatically
    window.addEventListener("resize", resizeHandler)
    drawPlot(canvasRef.current as HTMLCanvasElement)

    // Cleanup for resize handler
    return () => window.removeEventListener("resize", resizeHandler)
  }, [resizeHandler])

  return <Canvas ref={canvasRef} height={canvasHeight} width={canvasWidth} />
}

export default Plot

const Canvas = styled.canvas`
  border-radius: 5px;
  background-color: var(--color-grey-lightest);
`
