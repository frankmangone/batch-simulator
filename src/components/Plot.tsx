import { useEffect, useCallback, useRef, useState } from "react"
import styled from "styled-components"
import type { Point } from "../hooks/useGetData"
import { drawPlot } from "../helpers/drawPlot"

interface PlotProps {
  data: Point[][]
  colors: string[]
}

const Plot = (props: PlotProps) => {
  const { colors, data } = props

  // See this article for more reference:
  // https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [canvasWidth, setCanvasWidth] = useState(window.innerWidth - 130)
  const [canvasHeight, setCanvasHeight] = useState(window.innerHeight - 80)

  const resizeHandler = useCallback(() => {
    setCanvasWidth(window.innerWidth - 130)
    setCanvasHeight(window.innerHeight - 120)

    // Re-draw plot
    drawPlot({
      canvas: canvasRef.current as HTMLCanvasElement,
      data,
      colors,
    })
    // eslint-disable-next-line
  }, [data])

  useEffect(() => {
    // Event listener to set width and height of canvas programatically
    window.addEventListener("resize", resizeHandler)
    drawPlot({
      canvas: canvasRef.current as HTMLCanvasElement,
      data,
      colors,
    })

    // Cleanup for resize handler
    return () => window.removeEventListener("resize", resizeHandler)

    // eslint-disable-next-line
  }, [resizeHandler, data])

  return <Canvas ref={canvasRef} height={canvasHeight} width={canvasWidth} />
}

export default Plot

const Canvas = styled.canvas`
  border-radius: 5px;
  background-color: var(--color-grey-lightest);
`
