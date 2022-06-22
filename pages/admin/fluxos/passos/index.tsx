import { useRouter } from 'next/router';
import React from 'react';
import { Card, CardHeader, CardBody } from '../../../../app/common/components/containers/Card';
import { Table } from '../../../../app/common/components/containers/Table';
import { Button } from '../../../../app/common/components/elements/Button';
import { InputText } from '../../../../app/common/components/forms/InputText';
import { useForm } from '../../../../app/common/hooks/UseForm';
import { Notification } from '../../../../app/common/libs/toast';
import { AdminLayout } from '../../../../app/modules/admin/layout';
import { Passo } from '../../../../app/modules/admin/models/passo.model';
import { PassoQuery } from '../../../../app/modules/admin/queries/passo.query';

const Passos = () => {

  const router = useRouter();
  const query = new PassoQuery();

  const {isLoading, refetch, data: items} = query.useQueryAll();
  const {mutate: onCreateOrUpdate} = query.createOrUpdate();
  const {mutate: onDelete} = query.remove();

  const {
    handleSubmit,
    handleChange,
    data,
    errors
  } = useForm<Passo>({
      initialValues: {
        nome: ''
      },
      validations: {
        nome: {
          required: {
            value: true,
            message: 'Informe um nome para o passo'
          }
        }
      },
      onSubmit: () => {
        onCreateOrUpdate(data,{
          onSuccess: (passo) => {
            Notification.Success('Passo criado com sucesso.')
            router.push(`/admin/fluxos/passos/${passo.id}`)
          },
          onError: (error) => {
            Notification.Error('Ocorreu um erro ao cadastrar o passo');
            Notification.Error(`${error}`);
          }
        })
      }
    })

  const updateItem = (item: Passo) => {
    router.push(`/admin/fluxos/passos/${item.id}`)
  }

  const removeItem = (item: Passo) => {
    onDelete(item.id, {
      onSuccess: () => {
        refetch();
        Notification.Success('Passo removido com sucesso')
      },
      onError: (err) => {
        Notification.Error('Ocorreu um erro ao remover o passo');
        Notification.Error(`${err}`);
      }
    })
  }

  return (
    <AdminLayout>
      <Card>
        <CardHeader>
          <h1 className="text-xl font-medium">Passos</h1>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit}>
            <InputText 
              label='Passo' 
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
            isLoading 
            ?
            <div>Loading...</div>
            :
            (items && 
              <Table.Container>
                <Table.Header>
                  <Table.HeaderColumn>Nome</Table.HeaderColumn>
                  <Table.HeaderColumn>
                    <span className="sr-only">Actions</span>
                  </Table.HeaderColumn>
                </Table.Header>
                <Table.Body>
                  { items &&
                    items.map(item => {
                      return (
                        <Table.Row key={item.id}>
                          <Table.Column>{item.nome}</Table.Column>
                          <Table.Column>
                            <a className="px-2 font-medium text-blue-600 dark:text-blue-500 hover:underline"
                              onClick={()=>updateItem(item)}
                              href="#"
                            >
                              Edit
                            </a>
                            <a className="px-2 font-medium text-blue-600 dark:text-blue-500 hover:underline"
                              onClick={() => {if(window.confirm('Confirma a remoção do item?')){removeItem(item)}}}
                              href="#" 
                            >
                              Delete
                            </a>
                          </Table.Column>
                        </Table.Row>
                      )
                    })
                  }
                </Table.Body>
              </Table.Container>
            )
          }
        </CardBody>
      </Card>
    </AdminLayout>
  )
}

export default Passos