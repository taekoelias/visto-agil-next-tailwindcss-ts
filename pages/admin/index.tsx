import React from 'react'
import { Card, CardBody, CardHeader } from '../../app/common/components/containers/Card'
import { AdminLayout } from '../../app/modules/admin/layout'

const Dashboard = () => {
  return (
    <AdminLayout>
      <Card>
        <CardHeader>
          <h1 className="text-xl font-medium">Dashbord</h1>
        </CardHeader>
        <CardBody>
          <p>Conteudo</p>
        </CardBody>
      </Card>
    </AdminLayout>
  )
}

export default Dashboard