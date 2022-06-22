import React from 'react'
import { Card, CardBody, CardHeader } from '../../../app/common/components/containers/Card'
import { AdminLayout } from '../../../app/modules/admin/layout'

const Fluxos = () => {
  return (
    <AdminLayout>
      <Card>
        <CardHeader>
          <h1 className="text-xl font-medium">Fluxos</h1>
        </CardHeader>
        <CardBody>
          <h1>Teste</h1>
        </CardBody>
      </Card>
    </AdminLayout>
  )
}

export default Fluxos