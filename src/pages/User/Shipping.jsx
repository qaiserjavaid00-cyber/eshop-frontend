import { Button } from '@/components/ui/button';
import { ShippingAddress } from '@/components/user/ShippingAddress'
import { useCODOrder } from '@/hooks/orders/useCODOrder';
import React, { useState } from 'react'

const Shipping = () => {
  const [selectedAddress, setSelectedAddress] = useState("");
  const { mutate: placeCODOrder, isPending: isPlacingOrder } = useCODOrder();
  return (
    <div className='max-w-6xl mx-auto'>
      <ShippingAddress onAddressSelected={(addr) => setSelectedAddress(addr)} />
      <Button className="w-full mt-2">Proceeed To Checkout</Button>
    </div>
  )
}

export default Shipping