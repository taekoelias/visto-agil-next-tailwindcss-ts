import { GetServerSideProps } from "next";
import { ArrowDown, ArrowUp } from "phosphor-react";
import { useEffect, useState } from "react";
import { Card, CardBody, CardHeader } from "../../../../app/common/components/containers/Card";
import { Table } from "../../../../app/common/components/containers/Table";
import { Button } from "../../../../app/common/components/elements/Button";
import { EditableLabel } from "../../../../app/common/components/forms/EditableLabel";
import { InputImage } from "../../../../app/common/components/forms/InputImage";
import { InputText } from "../../../../app/common/components/forms/InputText";
import { ItemSelect, SimpleSelect } from "../../../../app/common/components/forms/SimpleSelect";
import { TextArea } from "../../../../app/common/components/forms/TextArea";
import { useForm } from "../../../../app/common/hooks/UseForm";
import { Notification } from "../../../../app/common/libs/toast";
import { UploadedImage } from "../../../../app/common/libs/upload";
import { AdminLayout } from "../../../../app/modules/admin/layout";
import { ItemPasso, TipoItem } from "../../../../app/modules/admin/models/item-passo.model";
import { Passo } from "../../../../app/modules/admin/models/passo.model";
import { ItemPassoQuery } from "../../../../app/modules/admin/queries/item-passo.query";
import { ItemPassoService } from "../../../../app/modules/admin/services/item-passo.service";
import { PassoService } from "../../../../app/modules/admin/services/passo.service";

interface ItensPassoProps {
  passo: Passo
}

const ItensPasso = ({passo}: ItensPassoProps) => {
  if (!passo?.nome) return null;

  const newItemPasso = {
    id: 0,
    label: '',
    conteudo: '',
    tipo: TipoItem.TEXT,
    passo,
    ordem: 0
  };

  const tipos = [
    {key: TipoItem.TEXT, value: TipoItem.TEXT, text: "Texto"},
    {key: TipoItem.INPUT, value: TipoItem.INPUT, text: "Campo de texto"},
    {key: TipoItem.IMAGE, value: TipoItem.IMAGE, text: "Imagem"},
    {key: TipoItem.LINK, value: TipoItem.LINK, text: "Link"},
    {key: TipoItem.VIDEO, value: TipoItem.VIDEO, text: "Video"}
  ] as ItemSelect<TipoItem>[];
  
  const query = new ItemPassoQuery();
  const service = new ItemPassoService();
  const passoService = new PassoService();

  const {isLoading, data: itensPasso, refetch, isFetching} = query.useQueryAll({query: `passo.id:${passo?.id}`});
  const {mutate: onCreateOrUpdate} = query.createOrUpdate();
  const {mutate: onDelete} = query.remove();
  
  const [numOrdem,setNumOrdem] = useState(1);

  const [passoView, setPassoView] = useState(passo);

  const [upload, setUpload] = useState<UploadedImage>();

  useEffect(()=>{
    itensPasso ?
      setNumOrdem(itensPasso.length)
      :
      setNumOrdem(0)
  },[isLoading, isFetching])

  const onLabelChange = async (newLabel: string) => {
    try {
      const result = await passoService.update({...passoView, nome: newLabel});
      setPassoView(result)
      Notification.Success("Nome do passo alterado com sucesso.");
    } catch (e) {
      Notification.Error("Ocorreu um erro ao alterar os nome do passo.");
      Notification.Error(`${e}`)
    }
  }

  const {
    handleSubmit,
    handleChange,
    data,
    setData,
    errors
  } = useForm<ItemPasso>({
      initialValues: newItemPasso,
      validations: {
        label: {
          required: {
            value: true,
            message: 'Informe um nome para o item'
          }
        },
        tipo: {
          required: {
            value: true,
            message: 'Informe um tipo para o item'
          }
        }
      },
      onSubmit: () => {
        let itemPasso = data
        if (itemPasso.id === 0){
          itemPasso = {...data, ordem: numOrdem+1}
        }

        if (data.tipo === TipoItem.IMAGE){
          itemPasso = {...itemPasso, conteudo: (upload?.base64||'')}
        }

        onCreateOrUpdate(itemPasso,{
          onSuccess: (itemPasso) => {
            refetch().then(data => {
              setData(newItemPasso)
              Notification.Success("Item cadastrado com sucesso.");
            })
          },
          onError: (error) => {
            Notification.Error("Ocorreu um erro ao cadastrar o item.");
            Notification.Error(error.message)
          }
        })
      }
    })

  const onImageUploaded = (image: UploadedImage|undefined) => {
    setUpload(image)
  }

  const removeItem = (item: ItemPasso) => {
    onDelete(item.id, {
      onSuccess: (item) => {
        refetch()
        Notification.Success("Item removido com sucesso.");
      },
      onError: (error) => {
        Notification.Error("Ocorreu um erro ao remover o item.");
        Notification.Error(error.message)
      }
    })
  }

  const updateOrdem = async (item1: ItemPasso, item2: ItemPasso) => {
    const ordem1 = item1.ordem;
    const ordem2 = item2.ordem;

    const newItem1 = {...item1, ordem: ordem2};
    const newItem2 = {...item2, ordem: ordem1};
    
    try{
      const [i1,i2] = await Promise.all([service.update(newItem1),service.update(newItem2)]);
      refetch();
    } catch (e) {
      Notification.Error("Ocorreu um erro ao reordenar o item.");
      Notification.Error(`${e}`)
    }
  }

  const cancelItem = () => {
    setData(newItemPasso);
  }

  const editItem = (item: ItemPasso) => {
    setData(item);
    if (item.tipo == TipoItem.IMAGE && item.conteudo){
      setUpload({name: '', size: 0, base64: item.conteudo, height:0, width:0})
    }

  }

  return (
    <AdminLayout>
      <Card>
        <CardHeader>
          <h1 className="text-xl font-medium">Passo</h1>
          <EditableLabel label={{value: passoView.nome}} onSubmitChange={(newLabel: string) =>onLabelChange(newLabel)}/>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit}>
            <InputText 
              label='Item' 
              value={data.label} 
              onChange={handleChange('label')}
              errors={errors.label ? [errors.label] : null}
            />
            <SimpleSelect
              label='Tipo do item'
              value={data.tipo}
              items={tipos}
              onChange={handleChange('tipo')}
              errors={errors.tipo ? [errors.tipo] : null}
            />
            {
              [TipoItem.LINK, TipoItem.VIDEO].includes(data.tipo)
              &&
              <InputText 
                label='Conteúdo' 
                value={data.conteudo} 
                onChange={handleChange('conteudo')}
                errors={errors.conteudo ? [errors.conteudo] : null}
              />
            }
            {
              TipoItem.IMAGE === data.tipo
              &&
              <InputImage 
                label="Conteudo"
                image={upload}
                onImageUploaded={onImageUploaded}
              />
            }
            {
              TipoItem.TEXT === data.tipo
              &&
              <TextArea 
                rows={5}
                label="Conteudo"
                value={data.conteudo}
                onChange={handleChange('conteudo')}
                errors={errors.conteudo ? [errors.conteudo] : null}
              />
            }
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
            (itensPasso &&
              <Table.Container>
                <Table.Header>
                  <Table.HeaderColumn>#</Table.HeaderColumn>
                  <Table.HeaderColumn>Item</Table.HeaderColumn>
                  <Table.HeaderColumn>Tipo</Table.HeaderColumn>
                  <Table.HeaderColumn>Ordem</Table.HeaderColumn>
                  <Table.HeaderColumn>
                    <span className="sr-only">Action</span>
                  </Table.HeaderColumn>
                </Table.Header>
                <Table.Body>
                  {itensPasso?.map((item,index) => {
                    return (
                      <Table.Row key={item.id}>
                        <Table.Column>{index+1}</Table.Column>
                        <Table.Column>{item.label}</Table.Column>
                        <Table.Column>{item.tipo}</Table.Column>
                        <Table.Column>
                          <div className="flex space-x-2 ">
                            {index > 0 ? 
                              <a onClick={()=>updateOrdem(item,itensPasso[index-1])}
                                href="#" 
                                className="text-cyan-600 pointer text-lg hover:text-cyan-400 focus:text-cyan-400">
                                <ArrowUp/>
                              </a> 
                              : 
                              <ArrowUp className="text-lg"/>
                              }
                            <span></span>
                            {index < itensPasso.length-1  ? 
                              <a onClick={()=>updateOrdem(item,itensPasso[index+1])} 
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
                              onClick={()=>(editItem(item))}
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
  const { passoId } = context.query
  
  const passoService = new PassoService();
  const passo = await passoService.getOne(Number(passoId))

  return {
    props: {passo}
  }
}

export default ItensPasso;