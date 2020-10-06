import React from 'react'
import { isPropertySignature} from 'typescript'
import '../css/MultiSelect.css'

type MultiSelectOption = string
type Selected = Set<string>

interface MultiSelectProps {
  options: MultiSelectOption[],
  initial_option: string,
}

interface TagProps {
  text: string,
  remove: (arg: any) => void
}

const MultiSelect = ({options, initial_option}: MultiSelectProps) => {
  const [selected, setSelected] = React.useState<Selected>(new Set([]))
  const [value, setValue] = React.useState<string>()
  
  const handleSelectChange = (e: any) => {
    //e.preventDefault()
    addSelected(e.target.value)
    setValue(e.target.value)
    
  }

  const addSelected = (text: string) => {
    setSelected(prev => new Set(prev.add(text)))
  }

  const removeSelected = (text: string) => {
    setSelected(prev => new Set(Array.from(prev).filter(x => x !== text)))
  }

  const resetValue = () => {
    setValue(initial_option)
  }

  const header = <option disabled>{value}</option>
  const opts = [header].concat(options.map(o => <option>{o}</option>))
  const tags = Array.from(selected).map(s => {
     return <Tag text={s} remove={removeSelected} />
  })

  React.useEffect(() => {
    if (selected.size === 0) {
      resetValue()
    }
  }, [selected])

  return (
    <div className="multi-select">
      <select value={value} onChange={handleSelectChange}>
        {opts}
      </select>
      <div className='tags-container'>
        {tags}
      </div>
    </div>
  )
}

const Tag = ({text, remove}: TagProps) => {

  const handleCrossClick = () => {
    remove(text)
  }

  return (
    <div className="tag">
      <span className="tag-text">{text}</span>
      <span onClick={handleCrossClick} className="tag-delete">X</span>
    </div>
  )
}

export default MultiSelect