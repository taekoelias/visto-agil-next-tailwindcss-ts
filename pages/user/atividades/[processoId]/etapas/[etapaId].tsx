import { GetServerSideProps } from 'next';
import Image from 'next/image';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from '../../../../../app/common/components/containers/Card';
import { Modal } from '../../../../../app/common/components/containers/Modal';
import { Button } from '../../../../../app/common/components/elements/Button';
import { RedirectLink } from '../../../../../app/common/components/elements/RedirectLink';
import { CheckList } from '../../../../../app/common/components/forms/CheckList';
import { ItemLabel } from '../../../../../app/common/components/forms/ItemLabel';
import { TextArea } from '../../../../../app/common/components/forms/TextArea';
import { AdminLayout } from '../../../../../app/modules/admin/layout';
import { 
  Etapa, 
  ItemPasso, 
  Passo, 
  Processo, 
  RespostaItem, 
  TipoItem} from '../../../../../app/modules/admin/models';
import { 
  EtapaProcessoService,
  ItemPassoService,
  PassoEtapaService,
  RespostaItemService } from '../../../../../app/modules/admin/services';

interface PreenchimentoEtapaProps {
  processo: Processo;
  etapa: Etapa;
  passos: Passo[];
  itens: ItemPasso[];
  respostas: RespostaItem[];
}

const service = new RespostaItemService();

const PreenchimentoEtapa = ({processo, etapa, passos, itens, respostas} : PreenchimentoEtapaProps) => {
  
  const [step, setStep] = useState<number>(1);
  const [passoAtual,setPassoAtual] = useState<Passo>(passos[0]);
  const [formAtual,setFormAtual] = useState<RespostaItem[]>([]);
  
  useEffect(()=>{
    setPassoAtual(passos[step-1])
  },[step])

  useEffect(()=>{
    setFormAtual(respostas?.filter(subitem=>subitem.passo.id === passoAtual.id))
  },[passoAtual])

  useEffect(() => {
    setStep(1)
    setPassoAtual(passos[step-1])
    setFormAtual(respostas?.filter(subitem=>subitem.passo.id === passoAtual.id))
  },[passos])
  

  const savePassoAtual = () => {
    formAtual.forEach( async (resposta) => {
      let respostaAtual: RespostaItem;
      if (resposta.id === 0){
        respostaAtual = await service.create(resposta);
      } else {
        respostaAtual = await service.update(resposta);
      }

      const index = respostas.findIndex(resp => resp.passo.id === respostaAtual.passo.id 
        && resp.etapa.id === respostaAtual.etapa.id
        && resp.processo.id === respostaAtual.processo.id
        && resp.item.id === respostaAtual.item.id
        );

      if (index >= 0) {
        respostas[index] = respostaAtual;
      }
    })
  }

  const next = () => {
    if (step<passos.length){
      savePassoAtual();
      setStep(step+1);
    }
  }

  const previous = () => {
    if (step>1){
      savePassoAtual();
      setStep(step-1)
    }
  }

  const handleChange = (
    index: number
  ) => (e: ChangeEvent<HTMLInputElement & HTMLSelectElement & HTMLTextAreaElement>) => {
    const value = e.target.value;
    
    let temp = [...formAtual];
    temp[index].valor = value;
    setFormAtual(temp)
  };

  const handleCheck = (
    index: number
  ) => (value: string[]) => {
    let temp = [...formAtual];
    temp[index].valor = value.join(';');
    
    setFormAtual(temp)
  };

  return (
    <AdminLayout>
      <Card>
        <CardHeader>
          <h1 className="text-xl font-medium">
            {`${processo?.nome} - ${etapa?.nome}`}
          </h1>
        </CardHeader>
        <CardBody>
          {passoAtual &&
          <>
            <div className="border-b-2 py-4">
              <div className="uppercase tracking-wide text-xs font-bold text-gray-500 mb-1 leading-tight">Passo: {step} de {passos.length}</div>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex-1">
                  <div className="text-lg font-bold text-gray-700 leading-tight">{passoAtual.nome}</div>
                </div>
              </div>
            </div>
            <div className="py-10">
              {formAtual?.map((resposta,index)=>{
                if (resposta.item.tipo === TipoItem.TEXT){
                  return (
                    <ItemLabel key={index} label={resposta.item.label}>
                        <p className="font-sans">
                          {resposta.item.conteudo}
                        </p>
                    </ItemLabel>
                  )
                }
                if (resposta.item.tipo === TipoItem.CHECKLIST){
                  const items = resposta.item.conteudo.split(';')
                  const value = resposta.valor.split(';')
                  return (
                    <CheckList 
                      onChange={handleCheck(index)}
                      label={resposta.item.label}
                      value={value}
                      items={items}
                      key={index}/>
                  )
                }
                if (resposta.item.tipo === TipoItem.INPUT){
                  return (
                    <TextArea
                      key={index}
                      label={resposta.item.label}
                      value={resposta.valor}
                      onChange={handleChange(index)}
                      rows={5}
                    />
                  )
                }
                if (resposta.item.tipo === TipoItem.LINK){
                  if (resposta.item.conteudo){
                    return (
                      <ItemLabel key={index} label={resposta.item.label}>
                        <RedirectLink 
                          link={resposta.item.conteudo} 
                          text='Acesse aqui'/>
                      </ItemLabel>
                    )
                  }
                  return (
                    <></>
                  )
                }
                if (resposta.item.tipo === TipoItem.IMAGE){
                  if (resposta.item.conteudo){
                    return (
                      <>
                        <Modal 
                          key={index}
                          title={resposta.item.label} 
                          trigger={
                            <div className='relative h-60 w-60 p-4 border'>
                                <img
                                  className='absolute m-0 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]' 
                                  src={resposta.item.conteudo}
                                  alt={resposta.item.label} 
                                  title={resposta.item.label}/>
                            </div>
                          }>
                          <img 
                            src={resposta.item.conteudo}
                            alt={resposta.item.label} 
                            title={resposta.item.label} 
                            />
                        </Modal>
                      </>
                    )
                  }
                  return <></>
                }
                if (resposta.item.tipo === TipoItem.VIDEO){
                  if (resposta.item.conteudo){
                    return (
                      <fieldset key={index} className="mb-4">
                        <label className="inline-block text-sm mb-2">{resposta.item.label}</label>
                        <RedirectLink 
                          link={resposta.item.conteudo} 
                          text='Acesse aqui'/>
                      </fieldset>
                    )
                  }
                  return (
                    <></>
                  )
                }
                return <></>
              })}
            </div>
            <div className="flex justify-end space-x-2">
              {step>1 ? <Button type='button' onClick={()=>previous()}>Previous</Button> : <></>}
              {step<passos.length ? <Button type='button' onClick={()=>next()}>Next</Button> : <></>}
              {step===passos.length ? <Button type='button' >Finish</Button> : <></>}
            </div>
          </>
          }
        </CardBody>
      </Card>
    </AdminLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { processoId, etapaId } = context.query
  
  const service = new EtapaProcessoService();
  const etapasProcesso = await service.getAll({query: `processo.id : ${processoId} and etapa.id : ${etapaId}`})
  if (etapasProcesso){
    const etapaProcesso = etapasProcesso[0];
    const passoEtapaService = new PassoEtapaService();
    const passosEtapa = await passoEtapaService.getAll({query: `etapa.id : ${etapaId}`})
    
    let passos : Passo[] = [];
    let itens : ItemPasso[] = [];
    let respostas : RespostaItem[] = [];
    if (passosEtapa){
      passos = passosEtapa.map(item=>item.passo);
      
      try {
        const itemPassoService = new ItemPassoService();
        const data = await itemPassoService.getAll();
        if (data){
          itens = passos
            .map(passo => data.filter(item => item.passo.id === passo.id))
            .flatMap(item => item);
        }
      } catch (e) {
        console.log(e);
        new Error("erro na carga dos itens")
      }

      try {
        const respostaService = new RespostaItemService();
        const data = await respostaService.getAll();
        respostas = itens.map((item)=>{
          if (data) {
            const respostaItem = data.find(subitem=>
              subitem.item.id === item.id 
              && subitem.passo.id === item.passo.id 
              && subitem.etapa.id === etapaProcesso.etapa.id
              && subitem.processo.id === etapaProcesso.processo.id)
            if (respostaItem){
              return respostaItem;
            }
          }
          return {
            id: 0, 
            processo: etapaProcesso.processo, 
            etapa: etapaProcesso.etapa, 
            passo: item.passo,
            item: item,
            valor: ''
          }
        })
      } catch (e) {
        console.log(e);
        new Error("erro na carga de respostas")
      }
    }

    return {
      props: {
        ...etapaProcesso,
        passos,
        itens,
        respostas
      }
    }
  }

  return {
    props: {}
  }
}

export default PreenchimentoEtapa