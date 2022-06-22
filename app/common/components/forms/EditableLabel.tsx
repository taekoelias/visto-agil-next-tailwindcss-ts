import { XCircle, CheckCircle, Pencil } from 'phosphor-react';
import React, { useState } from 'react'
import { useForm } from '../../hooks/UseForm';
import { InputText } from './InputText';

type Label = {
  value: string
}

type EditableLabelProps = {
  label: Label,
  onSubmitChange: (newLabel: string) => {},
}

export const EditableLabel = ({label, onSubmitChange}: EditableLabelProps) => {

  const [isEditLabel, setIsEditLabel] = useState(false);

  const {
    handleSubmit, 
    handleChange, 
    data,
    setData,
    errors
  } = useForm<Label>({
    initialValues: label,
    validations: {
      value: {
        required: {
          value: true,
          message: "Campo de preenchimento obrigatório."
        }
      }
    },
    onSubmit: () => {
      onSubmitChange(data.value);
      setIsEditLabel(false);
    }
  })

  return (
    <>
      {isEditLabel ? 
            <form className="flex space-x-2" onSubmit={handleSubmit}>
              <InputText 
                value={data.value} 
                onChange={handleChange('value')}
                errors={errors.value ? [errors.value] : null}/>
              <button className="text-rose-700 text-2xl"
                onClick={()=>setIsEditLabel(false)}>
                <XCircle/>
              </button>
              <button className="text-emerald-700 text-2xl"
                type="submit">
                <CheckCircle/>
              </button>
            </form>
            :
            <div className="flex space-x-2">
              <p className="text-lg">{label?.value}</p>
              <a className="text-2xl pointer" 
                onClick={()=>setIsEditLabel(true)}>
                <Pencil/>
              </a>
            </div>
          }
    </>
  )
}
