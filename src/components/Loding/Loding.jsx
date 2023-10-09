import React from 'react'
import { ColorRing } from  'react-loader-spinner'

export default function Loding() {
  return (
    <>
        <div className='loding'>
          <ColorRing
              visible={true}
              height="100"
              width="100"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={['#438b3a', '#434b5a', '#42873a', '#a19b3a', '#b3003a']}
          />
        </div>
    </>
  )
}
