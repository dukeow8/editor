import React from 'react'
import {render, cleanup} from '@testing-library/react'
import context from '../Auth.context'

 afterEach(cleanup)
 
 it('should take a snapshot', () => {
    const { asFragment } = render (<context />)
    
    expect(asFragment(<context/>)).toMatchSnapshot()
   
});
