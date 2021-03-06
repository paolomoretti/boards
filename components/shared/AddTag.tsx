import { AutoComplete } from 'antd';
import { useState } from 'react';
import styled from 'styled-components';

const TagInput = styled(AutoComplete)`
  width: auto;
  display: inline-block !important;
  min-width: 150px;
`;
interface AddTagProps {
  options?: Array<{ value: string; }>;
  onAddTag?(name: string): void;
}
export default function AddTag({ onAddTag, options }: AddTagProps) {
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState<Array<{ value: string; }>>([]);

  const onChange = (tag: string) => {
    setValue(tag);
  };

  const onBlur = () => {
    setEdit(false);
    setValue('');
  };

  const onSelect = (tag: string) => {
    tag = tag.trim().replace(/\s/gi, '-');

    if (onAddTag) {
      onAddTag(tag);
      setValue('');
    }
  };

  const onSearch = (keyword: string) => {
    const list: Array<{ value: string; }> = [];
    if (options) {
      options.forEach(option => {
        if (option.value.toLowerCase().indexOf(keyword.toLowerCase()) > -1) {
          list.push(option);
        }
      })
    }
    if (keyword !== '') {
      list.push({ value: keyword });
    }
    setSuggestions(list);
  };

  if (edit) {
    return (
      <TagInput
        value={value}
        options={suggestions}
        onSelect={onSelect}
        onChange={onChange}
        style={{ minWidth: 120 }}
        onSearch={onSearch}
        autoFocus={true}
        placeholder={'Type tag name'}
        size={'small'}
        defaultActiveFirstOption={true}
        onBlur={onBlur}
      />
    )
  }

  return (
    <a onClick={() => setEdit(true)}>Add tag</a>
  )
}
