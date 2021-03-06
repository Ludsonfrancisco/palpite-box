import React, { useState } from 'react'
import PageTitle from '../components/PageTitle'


const Pesquisa = () => {
  const [form, setForm] = useState({
    Nome: '',
    Email: '',
    Whatsapp: '',
    Nota: 0,
    Mensagem: ''
  })
  const notas = [0, 1, 2, 3, 4, 5]
  const [sucess, setSuccess] = useState(false)
  const [retorno, setRetorno] = useState({})
  const save = async () => {
    try {
      const response = await fetch('/api/save', {
        method: 'POST',
        body: JSON.stringify(form)
      })

      const data = await response.json()
      setSuccess(true)
      setRetorno(data)
    } catch (err) {
    }
  }
  const onChange = evt => {
    const value = evt.target.value
    const key = evt.target.name
    setForm(old => ({
      ...old,
      [key]: value
    }))
  }
  return (
    <div className='pt-6'>
      <PageTitle  title='Pesquisea '/>
      <h1 className='text-center font-bold my-4 text-2xl'>Críticas e sugestões</h1>
      <p className='text-center mb-6 '>O restauran  te X sempre busca por atender melhor seus clientes.<br />
        Por isso, estamos sempre abertos a ouvir a sua opinião.</p>
      {!sucess && <div className=' w-1/5 mx-auto'>
        <label className='font-bold'>Seu nome:</label>
        <input className=' p-4 block shadow bg-blue-100 my-2 rounded' type='text' placeholder='Nome' onChange={onChange} name='Nome' value={form.Nome} />
        <label className='font-bold'>Seu E-mail:</label>
        <input className=' p-4 block shadow bg-blue-100 my-2 rounded' type='text' placeholder='E-mail' onChange={onChange} name='Email' value={form.Email} />
        <label className='font-bold'>Seu Whatsapp:</label>
        <input className=' p-4 block shadow bg-blue-100 my-2 rounded' type='text' placeholder='Whatsapp' onChange={onChange} name='Whatsapp' value={form.Whatsapp} />
        <label className='font-bold'>Nota:</label>

        <div className='flex py-6 cursor-pointer'>  
          {notas.map(nota => {
            return (<label className='block w-1/6 text-left '>
                    {nota} <br />
                    <input type='radio' src='' name='Nota' value={nota} onChange={onChange} />
                  </label>)

          })}
        </div>

        <label className='font-bold'>Deixe sua opinião:</label>
        <textarea className=' p-4 block shadow bg-blue-100  w-72 h-40 my-2 rounded' type='text' placeholder='Deixe sua opinião' onChange={onChange} name='Mensagem' value={form.Mensagem} />

        <button className='bg-blue-400 px-12 py-4 rounded-lg font-bold shadow-lg hover:shadow' onClick={save}>Salvar</button>
      </div>}
      {sucess && <div className=' w-1/5 mx-auto'>
        <p className='mb-6 text-center bg-blue-100 boder-t border-b border-blue-500 text-blue-700 px-4 py-3'> Obrigado por contribuir com sua sujestão ou crítica</p>
        {
          retorno.showCoupon && <div className='text-center border p-4  mb-4'>
            Seu Cupom: <br />
            <span className='font-bold text-2xl'>{retorno.Cupom}</span>
          </div>
        }
        {
          retorno.showCoupon && <div className='text-center border p-4 mb-4'>
            <span className='font-bold block mb-2'>{retorno.Promo}</span>
            <br />
            <span className='italic'>Tire um print ou foto desta tela e apresente ao balcão.</span>
          </div>
        }
      </div>}
    </div>
  )
}

export default Pesquisa