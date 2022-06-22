import { useRouter } from 'next/router'
import React from 'react'
import { Card, CardBody, CardHeader } from '../../../../app/common/components/containers/Card'
import { Table } from '../../../../app/common/components/containers/Table'
import { Button } from '../../../../app/common/components/elements/Button'
import { InputText } from '../../../../app/common/components/forms/InputText'
import { useForm } from '../../../../app/common/hooks/UseForm'
import { Notification } from '../../../../app/common/libs/toast'
import { AdminLayout } from '../../../../app/modules/admin/layout'
import { Etapa } from '../../../../app/modules/admin/models/etapa.model'
import { EtapaQuery } from '../../../../app/modules/admin/queries/etapa.query'

const Etapas = () => {

  const router = useRouter();
  const query = new EtapaQuery();

  const {isLoading, isFetching, refetch, data: etapas} = query.useQueryAll();
  const {mutate: onCreateOrUpdate} = query.createOrUpdate();
  const {mutate: onDelete} = query.remove();

  const {
    handleSubmit,
    handleChange,
    data,
    setData,
    errors
  } = useForm<Etapa>({
      initialValues: {
        nome: ''
      },
      validations: {
        nome: {
          required: {
            value: true,
            message: 'Informe um nome para etapa'
          }
        }
      },
      onSubmit: () => {
        onCreateOrUpdate(data,{
          onSuccess: (etapa) => {
            Notification.Success('Etapa criada com sucesso.')
            router.push(`/admin/fluxos/etapas/${etapa.id}`)
          },
          onError: (error) => {
            Notification.Error('Ocorreu um erro ao cadastrar a etapa');
            Notification.Error(`${error}`);
          }
        })
      }
    })

  const updateItem = (item: Etapa) => {
    router.push(`/admin/fluxos/etapas/${item.id}`)
  }

  const removeItem = (item: Etapa) => {
    onDelete(item.id, {
      onSuccess: () => {
        refetch();
        Notification.Success('Etapa cadastrada com sucesso.')
      },
      onError: (e) => {
        Notification.Error('Ocorreu um erro ao remover a etapa')
        Notification.Error(`${e}`)
      }
    })
  }

  return (
    <AdminLayout>
      <Card>
        <CardHeader>
          <h1 className="text-xl font-medium">Etapa</h1>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit}>
            <InputText 
              label='Etapa' 
              value={data.nome} 
              onChange={handleChange('nome')}
              errors={errors.nome ? [errors.nome] : null}
            />
          <div className="flex justify-end space-x-2">
              <Button type='button' >Cancel</Button>
              <Button type='submit' >Continue</Button>
            </div>
          </form>
          {
            (isLoading || isFetching) 
            ?
            <div>Loading...</div>
            :
            (etapas && 
              <Table.Container>
                <Table.Header>
                  <Table.HeaderColumn>Etapa</Table.HeaderColumn>
                  <Table.HeaderColumn>
                    <span className="sr-only">Actions</span>
                  </Table.HeaderColumn>
                </Table.Header>
                <Table.Body>
                  {etapas.map(item => {
                    return (
                      <Table.Row key={item.id}>
                        <Table.Column>{item.nome}</Table.Column>
                        <Table.Column>
                          <a 
                            href="#" 
                            onClick={()=>(updateItem(item))}
                            className="px-2 font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          >
                            Edit
                          </a>
                          <a 
                            href="#" 
                            onClick={() => {if(window.confirm('Confirma a remoção do item?')){removeItem(item)}}}
                            className="px-2 font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          >
                            Delete
                          </a>
                        </Table.Column>
                      </Table.Row>
                    )
                  })}
                </Table.Body>
              </Table.Container>
            )
          }
        </CardBody>
      </Card>
    </AdminLayout>
  )
}

export default Etapas