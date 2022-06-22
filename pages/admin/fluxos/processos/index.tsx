import { useRouter } from 'next/router';
import React from 'react';
import { Card, CardBody, CardHeader } from '../../../../app/common/components/containers/Card';
import { Table } from '../../../../app/common/components/containers/Table';
import { Button } from '../../../../app/common/components/elements/Button';
import { InputText } from '../../../../app/common/components/forms/InputText';
import { useForm } from '../../../../app/common/hooks/UseForm';
import { AdminLayout } from '../../../../app/modules/admin/layout';
import { Processo } from '../../../../app/modules/admin/models/processo.model';
import { ProcessoQuery } from '../../../../app/modules/admin/queries/processo.query';
import { Notification } from '../../../../app/common/libs/toast';

const Processos = () => {
  const router = useRouter();
  const query = new ProcessoQuery();

  const {isLoading, isFetching, refetch, data: processos} = query.useQueryAll();
  const {mutate: onCreateOrUpdate} = query.createOrUpdate();
  const {mutate: onDelete} = query.remove();

  const {
    handleSubmit,
    handleChange,
    data,
    setData,
    errors
  } = useForm<Processo>({
      initialValues: {
        nome: ''
      },
      validations: {
        nome: {
          required: {
            value: true,
            message: 'Informe um nome para o processo'
          }
        }
      },
      onSubmit: () => {
        onCreateOrUpdate(data,{
          onSuccess: (processo) => {
            Notification.Success('Processo criado com sucesso')
            router.push(`/admin/fluxos/processos/${processo.id}`)
          },
          onError: (error) => {
            Notification.Error('Ocorreu um erro ao cadastrar o processo');
            Notification.Error(`${error}`);
          }
        })
      }
    })

  const updateItem = (item: Processo) => {
    router.push(`/admin/fluxos/processos/${item.id}`)
  }

  const removeItem = (item: Processo) => {
    onDelete(item.id, {
      onSuccess: () => {
        refetch()
        Notification.Success("Processo removido com sucesso.");
      },
      onError: (error) => {
        Notification.Error("Ocorreu um erro ao remover o processo.");
        Notification.Error(error.message)
      }
    })
  }

  return (
    <AdminLayout>
      <Card>
        <CardHeader>
          <h1 className="text-xl font-medium">Processos</h1>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit}>
            <InputText 
              label='Processo' 
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
            (processos && 
              <Table.Container>
                <Table.Header>
                  <Table.HeaderColumn>Processo</Table.HeaderColumn>
                  <Table.HeaderColumn>
                    <span className="sr-only">Actions</span>
                  </Table.HeaderColumn>
                </Table.Header>
                <Table.Body>
                  {processos.map(item => {
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

export default Processos