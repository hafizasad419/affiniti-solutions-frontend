import { useState, useRef, useEffect } from "react"

interface SliderProps {
  className?: string
  defaultValue?: number | number[]
  value?: number | number[]
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  orientation?: "horizontal" | "vertical"
  onValueChange?: (value: number | number[]) => void
  onValueCommit?: (value: number | number[]) => void
  [key: string]: any
}

function Slider({
  className = "",
  defaultValue,
  value,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  orientation = "horizontal",
  onValueChange,
  onValueCommit,
  ...props
}: SliderProps) {
  const [internalValue, setInternalValue] = useState<number[]>(() => {
    if (value !== undefined) {
      return Array.isArray(value) ? value : [value]
    }
    if (defaultValue !== undefined) {
      return Array.isArray(defaultValue) ? defaultValue : [defaultValue]
    }
    return [min]
  })

  const [isDragging, setIsDragging] = useState<number | null>(null)
  const [isFocused, setIsFocused] = useState<number | null>(null)
  const sliderRef = useRef<HTMLDivElement>(null)
  const thumbRefs = useRef<(HTMLDivElement | null)[]>([])

  // Update internal value when controlled value changes
  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(Array.isArray(value) ? value : [value])
    }
  }, [value])

  const currentValue = value !== undefined ? (Array.isArray(value) ? value : [value]) : internalValue

  // Utility function to clamp value between min and max
  const clamp = (val: number) => Math.min(Math.max(val, min), max)

  // Utility function to round to step
  const roundToStep = (val: number) => Math.round(val / step) * step

  // Get position as percentage
  const getPosition = (val: number) => ((val - min) / (max - min)) * 100

  // Get value from position
  const getValueFromPosition = (position: number) => {
    const percentage = orientation === "horizontal" ? position : 100 - position
    const value = min + (percentage / 100) * (max - min)
    return roundToStep(clamp(value))
  }

  // Get position from event
  const getPositionFromEvent = (event: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) => {
    if (!sliderRef.current) return 0

    const rect = sliderRef.current.getBoundingClientRect()
    const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX
    const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY

    if (orientation === "horizontal") {
      return ((clientX - rect.left) / rect.width) * 100
    } else {
      return ((clientY - rect.top) / rect.height) * 100
    }
  }

  // Update value at specific index
  const updateValue = (index: number, newValue: number) => {
    const newValues = [...currentValue]
    newValues[index] = newValue
    newValues.sort((a, b) => a - b) // Keep values sorted
    
    if (value === undefined) {
      setInternalValue(newValues)
    }
    
    if (onValueChange) {
      onValueChange(newValues.length === 1 ? newValues[0] : newValues)
    }
  }

  // Handle mouse/touch down
  const handlePointerDown = (event: React.MouseEvent | React.TouchEvent, index: number) => {
    if (disabled) return
    
    event.preventDefault()
    setIsDragging(index)
    
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if (isDragging === null) return
      
      const position = getPositionFromEvent(e)
      const newValue = getValueFromPosition(position)
      updateValue(index, newValue)
    }

    const handlePointerUp = () => {
      setIsDragging(null)
      if (onValueCommit) {
        onValueCommit(currentValue.length === 1 ? currentValue[0] : currentValue)
      }
      document.removeEventListener('mousemove', handlePointerMove)
      document.removeEventListener('mouseup', handlePointerUp)
      document.removeEventListener('touchmove', handlePointerMove)
      document.removeEventListener('touchend', handlePointerUp)
    }

    document.addEventListener('mousemove', handlePointerMove)
    document.addEventListener('mouseup', handlePointerUp)
    document.addEventListener('touchmove', handlePointerMove)
    document.addEventListener('touchend', handlePointerUp)
  }

  // Handle track click
  const handleTrackClick = (event: React.MouseEvent) => {
    if (disabled) return
    
    const position = getPositionFromEvent(event)
    const newValue = getValueFromPosition(position)
    
    // Find the closest thumb to update
    let closestIndex = 0
    let minDistance = Infinity
    
    currentValue.forEach((val, index) => {
      const distance = Math.abs(getPosition(val) - position)
      if (distance < minDistance) {
        minDistance = distance
        closestIndex = index
      }
    })
    
    updateValue(closestIndex, newValue)
  }

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (disabled) return
    
    let newValue = currentValue[index]
    
    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowDown':
        event.preventDefault()
        newValue = clamp(newValue - step)
        break
      case 'ArrowRight':
      case 'ArrowUp':
        event.preventDefault()
        newValue = clamp(newValue + step)
        break
      case 'Home':
        event.preventDefault()
        newValue = min
        break
      case 'End':
        event.preventDefault()
        newValue = max
        break
      case 'PageDown':
        event.preventDefault()
        newValue = clamp(newValue - step * 10)
        break
      case 'PageUp':
        event.preventDefault()
        newValue = clamp(newValue + step * 10)
        break
      default:
        return
    }
    
    updateValue(index, newValue)
  }

  // Generate CSS classes
  const baseClasses = [
    "relative flex w-full touch-none items-center select-none",
    orientation === "vertical" ? "h-full min-h-44 w-auto flex-col" : "w-full",
    disabled ? "opacity-50" : "",
    className
  ].filter(Boolean).join(" ")

  const trackClasses = [
    "bg-gray-300 relative grow overflow-hidden rounded-full",
    orientation === "horizontal" ? "h-1.5 w-full" : "h-full w-1.5"
  ].join(" ")

  const rangeClasses = [
    "bg-blue-500 absolute",
    orientation === "horizontal" ? "h-full" : "w-full"
  ].join(" ")

  const thumbClasses = [
    "border-blue-500 bg-white ring-blue-200/50 block size-4 shrink-0 rounded-full border shadow-sm",
    "transition-all duration-200 hover:ring-4 focus:ring-4 focus:outline-none",
    disabled ? "pointer-events-none opacity-50" : "cursor-pointer"
  ].join(" ")

  return (
    <div
      ref={sliderRef}
      className={baseClasses}
      data-orientation={orientation}
      data-disabled={disabled}
      {...props}
    >
      <div
        className={trackClasses}
        onClick={handleTrackClick}
        role="presentation"
      >
        <div
          className={rangeClasses}
          style={{
            [orientation === "horizontal" ? "width" : "height"]: `${getPosition(currentValue[currentValue.length - 1])}%`,
            [orientation === "horizontal" ? "left" : "bottom"]: "0"
          }}
        />
      </div>
      
      {currentValue.map((val, index) => (
                 <div
           key={index}
           ref={(el) => {
             thumbRefs.current[index] = el
           }}
           className={thumbClasses}
          style={{
            [orientation === "horizontal" ? "left" : "bottom"]: `${getPosition(val)}%`,
            transform: orientation === "horizontal" ? "translateX(-50%)" : "translateY(50%)"
          }}
          role="slider"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={val}
          aria-valuetext={val.toString()}
          aria-orientation={orientation}
          tabIndex={disabled ? -1 : 0}
          onMouseDown={(e) => handlePointerDown(e, index)}
          onTouchStart={(e) => handlePointerDown(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onFocus={() => setIsFocused(index)}
          onBlur={() => setIsFocused(null)}
        />
      ))}
    </div>
  )
}

export default Slider 