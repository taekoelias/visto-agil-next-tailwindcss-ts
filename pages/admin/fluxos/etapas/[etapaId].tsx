import { GetServerSideProps } from 'next'
import { ArrowDown, ArrowUp } from 'phosphor-react'
import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardHeader } from '../../../../app/common/components/containers/Card'
import { Table } from '../../../../app/common/components/containers/Table'
import { Button } from '../../../../app/common/components/elements/Button'
import { EditableLabel } from '../../../../app/common/components/forms/EditableLabel'
import { SimpleSelect } from '../../../../app/common/components/forms/SimpleSelect'
import { useForm } from '../../../../app/common/hooks/UseForm'
import { Notification } from '../../../../app/common/libs/toast'
import { AdminLayout } from '../../../../app/modules/admin/layout'
import { Etapa, Passo, PassoEtapa } from '../../../../app/modules/admin/models'
import { PassoService, PassoEtapaService, EtapaService } from '../../../../app/modules/admin/services'
import { PassoEtapaQuery } from '../../../../app/modules/admin/queries/passo-etapa.query'

interface PassosEtapaProps {
  etapa: Etapa
}

const query = new PassoEtapaQuery();
const passoService= new PassoService();
const service = new PassoEtapaService();
const etapaService = new EtapaService();

const PassosEtapa = ({etapa}: PassosEtapaProps) => {
  
  const [etapaView,setEtapaView] = useState(etapa)
  const [numOrdem,setNumOrdem] = useState(1);
  const [passos,setPassos] = useState<Passo[]>([])
  
  useEffect(()=>{
    passoService.getAll()
    .then(data=>{
      if (data){
        setPassos(data)
      }
    })
  },[])
  
  const {isLoading, data: passosEtapa, refetch, isFetching} = query.useQueryAll({query: `etapa.id:${etapa?.id}`});
  const {mutate: onCreateOrUpdate} = query.createOrUpdate();
  const {mutate: onDelete} = query.remove();
  
  useEffect(()=>{
    passosEtapa ?
      setNumOrdem(passosEtapa.length)
      :
      setNumOrdem(0)
  },[passosEtapa])

  const newPassoEtapa = {
    id: 0, etapa, ordem: 0, passo: {id: 0, nome: ''}, passoId: 0
  };

  const {
    handleSubmit,
    handleChange,
    data,
    setData,
    errors
  } = useForm<PassoEtapa>({
    initialValues: newPassoEtapa,
    validations: {
      passoId: {
        custom: {
          isValid: (value: string) => {
            return Number(value) > 0;
          },
          message: "Selecione um passo."
        }
      },
    },
    onSubmit: () => {
      let passoEtapa = {...data, passo: {id: data.passoId, nome:''}}
      if (passoEtapa.id === 0){
        passoEtapa = {...passoEtapa, ordem: numOrdem+1}
        setNumOrdem(numOrdem+1)
      }

      onCreateOrUpdate(passoEtapa,{
        onSuccess: (passoEtapa) => {
          refetch().then(data => {
            setData(newPassoEtapa)
          })
          Notification.Success('Passo associado a etapa com sucesso')
        },
        onError: (error) => {
          Notification.Error('Ocorreu um erro ao remover a associação do passo a etapa');
          Notification.Error(`${error}`)
        }
      })
    }
  })

  const onLabelChange = async (newLabel: string) => {
    try {
      const result = await etapaService.update({...etapaView, nome: newLabel});
      setEtapaView(result)
    } catch (e) {
      Notification.Error("Ocorreu um erro ao alterar os nome da etapa.")
      Notification.Error(`${e}`)
    }
  }

  const updateOrdem = async (item1: PassoEtapa, item2: PassoEtapa) => {
    const ordem1 = item1.ordem;
    const ordem2 = item2.ordem;

    const newItem1 = {...item1, ordem: ordem2};
    const newItem2 = {...item2, ordem: ordem1};
    
    try{
      const [i1,i2] = await Promise.all([service.update(newItem1),service.update(newItem2)]);
      refetch();
    } catch (e) {
      Notification.Error("Ocorreu um erro ao reordenar o passo.")
      Notification.Error(`${e}`)
    }
  }

  const removeItem = (item: PassoEtapa) => {
    onDelete(item.id, {
      onSuccess: (item) => {
        refetch()
        Notification.Success('Associação entre passo e etapa removidos com sucesso')
      },
      onError: (e) => {
        Notification.Error('Ocorreu um erro ao remover a associação entre passo e etapa')
        Notification.Error(`${e}`)
      }
    })
  }
  
  const cancelItem = () => {
    setData(newPassoEtapa);
  }

  return (
    <AdminLayout>
      <Card>
        <CardHeader>
          <h1 className="text-xl font-medium">Etapa</h1>
          <EditableLabel 
            label={{value: etapaView.nome}} 
            onSubmitChange={(newLabel: string) =>onLabelChange(newLabel)}/>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit}>
            <SimpleSelect
              label='Passo'
              value={data.passoId}
              onChange={handleChange('passoId')}
              errors={errors.passoId ? [errors.passoId] : null}>
                <option value="0" disabled>--SELECIONE--</option>
                {passos.map((passo,i) => {
                  return (
                    <option key={i} value={passo.id} >
                      {passo.nome}
                    </option>
                  )
                })}
            </SimpleSelect>
            <div className="flex justify-end space-x-2">
              <Button type='button' onClick={cancelItem}>Cancel</Button>
              <Button type='submit' >Add</Button>
            </div>
          </form>
          {
            (isLoading || isFetching)
            ?
            <div>Loading...</div>
            :
            (passosEtapa &&
              <Table.Container>
                <Table.Header>
                  <Table.HeaderColumn>#</Table.HeaderColumn>
                  <Table.HeaderColumn>Passo</Table.HeaderColumn>
                  <Table.HeaderColumn>Ordem</Table.HeaderColumn>
                  <Table.HeaderColumn>
                    <span className="sr-only">Action</span>
                  </Table.HeaderColumn>
                </Table.Header>
                <Table.Body>
                  {passosEtapa.map((item,index) => {
                    return (
                      <Table.Row key={item.id}>
                        <Table.Column>{index+1}</Table.Column>
                        <Table.Column>{item.passo?.nome}</Table.Column>
                        <Table.Column>
                          <div className="flex space-x-2 ">
                            {index > 0 ? 
                              <a onClick={()=>updateOrdem(item,passosEtapa[index-1])}
                                href="#" 
                                className="text-cyan-600 pointer text-lg hover:text-cyan-400 focus:text-cyan-400">
                                <ArrowUp/>
                              </a> 
                              : 
                              <ArrowUp className="text-lg"/>
                              }
                            <span></span>
                            {index < passosEtapa.length-1  ? 
                              <a onClick={()=>updateOrdem(item,passosEtapa[index+1])} 
                                href="#" 
                                className="text-cyan-600 pointer text-lg hover:text-cyan-400 focus:text-cyan-400">
                                <ArrowDown/>
                              </a> 
                              : 
                              <ArrowDown className="text-lg"/>
                              }
                          </div>
                        </Table.Column>
                        <Table.Column>
                            <a 
                              href="#" 
                              onClick={() => {if(window.confirm('Confirma a remoção do item?')){removeItem(item)}}}
                              className="px-2 font-medium text-blue-600 dark:text-blue-500 hover:underline"
                            >
                              Delete
                            </a>
                        </Table.Column>
                      </Table.Row>
                    )})
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { etapaId } = context.query
  
  const etapaService = new EtapaService();
  const etapa = await etapaService.getOne(Number(etapaId))

  return {
    props: {etapa}
  }
}

export default PassosEtapa;