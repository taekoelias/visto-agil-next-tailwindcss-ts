import { GetServerSideProps } from 'next'
import { ArrowDown, ArrowUp } from 'phosphor-react'
import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardHeader } from '../../../../app/common/components/containers/Card'
import { Table } from '../../../../app/common/components/containers/Table'
import { Button } from '../../../../app/common/components/elements/Button'
import { EditableLabel } from '../../../../app/common/components/forms/EditableLabel'
import { ItemSelect, SimpleSelect } from '../../../../app/common/components/forms/SimpleSelect'
import { useForm } from '../../../../app/common/hooks/UseForm'
import { AdminLayout } from '../../../../app/modules/admin/layout'
import { EtapaProcesso } from '../../../../app/modules/admin/models/etapa-processo.model'
import { Processo } from '../../../../app/modules/admin/models/processo.model'
import { EtapaProcessoQuery } from '../../../../app/modules/admin/queries/etapa-processo.query'
import { EtapaProcessoService } from '../../../../app/modules/admin/services/etapa-processo.service'
import { EtapaService } from '../../../../app/modules/admin/services/etapa.service'
import { ProcessoService } from '../../../../app/modules/admin/services/processo.service'
import { Notification } from '../../../../app/common/libs/toast'

interface EtapasProcessoProps {
  processo: Processo
}

const EtapasProcesso = ({processo}: EtapasProcessoProps) => {
  if (!processo?.nome) return null;

  const newEtapaProcesso = {
    id: 0, processo, ordem: 0, etapa: {id: 0, nome: ''}, etapaId: 0
  };

  const itemDefault = {
    key: 0, text: '-- SELECIONE --', value: 0, disabled: true
  }

  const query = new EtapaProcessoQuery();
  const etapaService= new EtapaService();
  const service = new EtapaProcessoService();
  const processoService = new ProcessoService();

  const [processoView,setProcessoView] = useState(processo)
  const [numOrdem,setNumOrdem] = useState(1);

  const {isLoading, data: etapasProcesso, refetch, isFetching} = query.useQueryAll({query: `processo.id:${processo?.id}`});
  const {mutate: onCreateOrUpdate} = query.createOrUpdate();
  const {mutate: onDelete} = query.remove();

  const [etapas,setEtapas] = useState<ItemSelect<number>[]>([])

  const isSelected = (value: string) : boolean => {
    return Number(value) > 0;
  }

  const {
    handleSubmit,
    handleChange,
    data,
    setData,
    errors
  } = useForm<EtapaProcesso>({
      initialValues: newEtapaProcesso,
      validations: {
        etapaId: {
          custom: {
            isValid: isSelected,
            message: "Selecione uma etapa."
          }
        },
      },
      onSubmit: () => {
        let etapaProcesso = {...data, etapa: {id: data.etapaId, nome: ''}}
        if (etapaProcesso.id === 0){
          etapaProcesso = {...etapaProcesso, ordem: numOrdem+1}
        }

        onCreateOrUpdate(etapaProcesso,{
          onSuccess: () => {
            refetch().then(() => {
              setData(newEtapaProcesso)
              Notification.Success("Etapa associada ao processo com sucesso.");
            })
          },
          onError: (error) => {
            Notification.Error("Ocorreu um erro ao associar a etapa ao processo.");
            Notification.Error(error.message)
          }
        })
      }
    })

  useEffect(()=>{
    etapaService.getAll().then(data=>{
      if (data){
        const itens = data.map(item => {
          return {
            key: item.id,
            text: item.nome,
            value: item.id
          } as ItemSelect<number>;
        })
        setEtapas([
          itemDefault,
          ...itens
          ])
      }
    })
  },[])

  useEffect(()=>{
    etapasProcesso ?
      setNumOrdem(etapasProcesso.length)
      :
      setNumOrdem(0);

  },[isLoading, isFetching])

  const onLabelChange = async (newLabel: string) => {
    try {
      const result = await processoService.update({...processoView, nome: newLabel});
      setProcessoView(result)
    } catch (e) {
      Notification.Error("Ocorreu um erro ao alterar o nome do processo.");
      Notification.Error(`${e}`)
    }
  }

  const updateOrdem = async (item1: EtapaProcesso, item2: EtapaProcesso) => {
    const ordem1 = item1.ordem;
    const ordem2 = item2.ordem;

    const newItem1 = {...item1, ordem: ordem2};
    const newItem2 = {...item2, ordem: ordem1};
    
    try{
      const [i1,i2] = await Promise.all([service.update(newItem1),service.update(newItem2)]);
      refetch();
    } catch (e) {
      Notification.Error("Ocorreu um erro ao alterar a ordem da etapa.");
      Notification.Error(`${e}`)
    }
  }

  const removeItem = (item: EtapaProcesso) => {
    onDelete(item.id, {
      onSuccess: () => {
        refetch()
        Notification.Success("Etapa removido do processo com sucesso.");
      },
      onError: (error) => {
        Notification.Error("Ocorreu um erro ao remover a etapa do processo.");
        Notification.Error(error.message)
      }
    })
  }
  
  const cancelItem = () => {
    setData(newEtapaProcesso);
  }

  return (
    <AdminLayout>
      <Card>
        <CardHeader>
          <h1 className="text-xl font-medium">Processo</h1>
          <EditableLabel 
            label={{value: processoView.nome}} 
            onSubmitChange={(newLabel: string) =>onLabelChange(newLabel)}/>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit}>
            <SimpleSelect
              label='Etapa'
              value={data.etapaId}
              items={etapas}
              onChange={handleChange('etapaId')}
              errors={errors.etapaId ? [errors.etapaId] : null}
            />
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
            (etapasProcesso &&
              <Table.Container>
                <Table.Header>
                  <Table.HeaderColumn>#</Table.HeaderColumn>
                  <Table.HeaderColumn>Etapa</Table.HeaderColumn>
                  <Table.HeaderColumn>Ordem</Table.HeaderColumn>
                  <Table.HeaderColumn>
                    <span className="sr-only">Action</span>
                  </Table.HeaderColumn>
                </Table.Header>
                <Table.Body>
                  {etapasProcesso.map((item,index) => {
                    return (
                      <Table.Row key={item.id}>
                        <Table.Column>{index+1}</Table.Column>
                        <Table.Column>{item.etapa?.nome}</Table.Column>
                        <Table.Column>
                          <div className="flex space-x-2 ">
                            {index > 0 ? 
                              <a onClick={()=>updateOrdem(item,etapasProcesso[index-1])}
                                href="#" 
                                className="text-cyan-600 pointer text-lg hover:text-cyan-400 focus:text-cyan-400">
                                <ArrowUp/>
                              </a> 
                              : 
                              <ArrowUp className="text-lg"/>
                              }
                            <span></span>
                            {index < etapasProcesso.length-1  ? 
                              <a onClick={()=>updateOrdem(item,etapasProcesso[index+1])} 
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
  const { processoId } = context.query
  
  const processoService = new ProcessoService();
  const processo = await processoService.getOne(Number(processoId))

  return {
    props: {processo}
  }
}

export default EtapasProcesso;