import React from 'react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

interface AlertBoxProps {
  children: React.ReactNode
  variant?: 'default' | 'destructive'
  className?: string
}

const AlertBox = ({
  children,
  variant = 'default',
  className,
}: AlertBoxProps) => {
  return (
    <Alert variant={variant} className={className}>
      {children}
    </Alert>
  )
}

export default AlertBox
