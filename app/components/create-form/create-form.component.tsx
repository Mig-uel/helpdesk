import { addTicket } from '@/app/(dashboard)/tickets/actions'
import SubmitButton from '../submit-button/submit-button.component'

const CreateForm = () => {
  return (
    <form className='w-1/2' action={addTicket}>
      <label htmlFor='title'>
        <span>Title:</span>
        <input name='title' required type='text' />
      </label>
      <label htmlFor='body'>
        <span>Body:</span>
        <textarea name='body' required />
      </label>
      <label htmlFor='priority'>
        <span>Priority:</span>
        <select name='priority'>
          <option value='low'>Low Priority</option>
          <option value='medium'>Medium Priority</option>
          <option value='high'>High Priority</option>
        </select>
      </label>
      <SubmitButton />
    </form>
  )
}

export default CreateForm
