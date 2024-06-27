
'use client'
import { Button, toast } from 'keep-react'

export const ToastComponent = () => {
  return (
    <div className="flex items-center gap-3">
      <Button
        size="sm"
        color="secondary"
        className="bg-metal-900">
        <span>Product updated Succesfully</span>
      </Button>
      
    </div>
  )
}
