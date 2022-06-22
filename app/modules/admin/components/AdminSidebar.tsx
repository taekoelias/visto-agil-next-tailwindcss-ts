import { CirclesThree, Folder, House, Clipboard, Article } from 'phosphor-react'
import React, { useEffect, useState } from 'react'
import { EtapaProcesso } from '../models/etapa-processo.model'
import { Processo } from '../models/processo.model'
import { EtapaProcessoService } from '../services/etapa-processo.service'
import { ProcessoService } from '../services/processo.service'
import { ItemGroupMenuSidebar, ItemMenuSidebar, MenuSidebar } from './MenuSidebar'

export interface AdminSidebarProps {
  sidebarExpanded: boolean
}

export const AdminSidebar = ({sidebarExpanded}: AdminSidebarProps) => {

  const [etapasProcessos, setEtapasProcessos] = useState<EtapaProcesso[]>([])
  const [processos, setProcessos] = useState<Processo[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(()=>{
    const service = new EtapaProcessoService();
    service.getAll()
      .then(data=>{
        if (data) {
          const list = data.reduce(
            (total: Processo[], atual)=> {
              const index = total.findIndex(item => item.id === atual.processo.id);
              if (index > -1){
                total[index].etapas.push(atual)
              } else {
                total.push({id: atual.processo.id, nome: atual.processo.nome, etapas: [atual]})
              }
              return total;
            },[])
          setProcessos(list)
        }
      })
      .finally(()=>setIsLoading(false));
  },[])

  return (
    <nav className={` ${sidebarExpanded ? 'w-60' : 'w-0' } md:w-60 left-0 bottom-0 shadow-xl bg-white top-16 flex-row flex-nowrap justify-between absolute z-10 overflow-y-auto overflow-hidden transition-all duration-300`}>
      <div className="md:flex-col md:items-stretch md:flex-nowrap px-0 flex flex-wrap justify-between w-full mx-auto">
        
        <MenuSidebar title='Início'>
          <ItemMenuSidebar 
            icon={<House className='text-xl mr-3 float-left'/>}
            title='Painel' 
            link={'/admin'}/>
        </MenuSidebar>
        <MenuSidebar title='Atividades'>
          {isLoading ?
            <></>
            :
            (
              processos.map(item => {
                return (
                  <ItemGroupMenuSidebar 
                    key={item.id}
                    title={item.nome} 
                    icon={<Article className='text-xl mr-3 float-left'/> }
                    baseUrl={`/user/atividades/${item.id}`}>
                      {
                        item.etapas.map((subitem,index) =>{
                          return (
                            <ItemMenuSidebar
                              key={subitem.id} 
                              title={`${index+1} - ${subitem.etapa.nome}`} 
                              link={`/user/atividades/${item.id}/etapas/${subitem.etapa.id}`}/>
                          )
                        })
                      }
                  </ItemGroupMenuSidebar>
                )
              })
            )
          }
        </MenuSidebar>
        <MenuSidebar title='Operações'>
          <ItemGroupMenuSidebar 
            title='Fluxos' 
            icon={<CirclesThree className='text-xl mr-3 float-left'/> }
            baseUrl='/admin/fluxos'>
            <ItemMenuSidebar title='Processos' link={'/admin/fluxos/processos'}/>
            <ItemMenuSidebar title='Etapas' link={'/admin/fluxos/etapas'}/>
            <ItemMenuSidebar title='Passos' link={'/admin/fluxos/passos'}/>
          </ItemGroupMenuSidebar>
        </MenuSidebar>
      </div>
    </nav>
  )
}