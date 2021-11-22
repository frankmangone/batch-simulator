import { useEffect, useCallback, useRef, useState } from "react"
import styled from "styled-components"
import { drawPlot } from "../../helpers/drawPlot"
import { mobileBreakpoint } from "../../helpers/breakpoints"

interface PlotProps {
  data: Point[][]
  colors: string[]
}

const MOBILE_WIDTH_SUSTRAEND = 44
const MOBILE_HEIGHT_SUSTRAEND = 182
const DESKTOP_WIDTH_SUSTRAEND = 137
const DESKTOP_HEIGHT_SUSTRAEND = 105

const Plot = (props: PlotProps) => {
  const { colors, data } = props

  // See this article for more reference:
  // https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [canvasWidth, setCanvasWidth] = useState(() =>
    window.innerWidth <= mobileBreakpoint
      ? window.innerWidth - MOBILE_WIDTH_SUSTRAEND
      : window.innerWidth - DESKTOP_WIDTH_SUSTRAEND
  )
  const [canvasHeight, setCanvasHeight] = useState(() =>
    window.innerWidth <= mobileBreakpoint
      ? window.innerHeight - MOBILE_HEIGHT_SUSTRAEND
      : window.innerHeight - DESKTOP_HEIGHT_SUSTRAEND
  )

  const resizeHandler = useCallback(() => {
    const isMobile = window.innerWidth <= mobileBreakpoint
    const ws = isMobile ? MOBILE_WIDTH_SUSTRAEND : DESKTOP_WIDTH_SUSTRAEND
    const hs = isMobile ? MOBILE_HEIGHT_SUSTRAEND : DESKTOP_HEIGHT_SUSTRAEND
    setCanvasWidth(window.innerWidth - ws)
    setCanvasHeight(window.innerHeight - hs)

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
  background-color: var(--color-grey-lighter);
  border: 1px solid white;
`
