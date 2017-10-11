import React from 'react'
import { Card } from 'componentry'

import heart from 'media/icons/heart.svg'
import Icon from 'components/universal/Icon'
import { component } from './home-screen.scss'

export default () => (
  <div className={component}>
    <h1 className="text-center mb-5">InspireScript Demo Project</h1>
    <Card>
      <Card.Body>
        <Icon icon={heart} /> Use this demo project to get started building
        something amazing!
      </Card.Body>
    </Card>
  </div>
)
