import { useEffect, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { api } from '@/lib/axios';

interface Prompt {
  id: string
  title: string
  template: string
}

interface PromptSelectProps {
  onPromptSelected: (template: string) => void
}

export function PromptSelect({ onPromptSelected }: PromptSelectProps) {
  const [prompts, setPrompts] = useState<Prompt[] | null>(null);

  useEffect(() => {
    api.get('/prompts').then(response => {
      setPrompts(response.data)
    })
  }, [])

  return (
    <Select onValueChange={onPromptSelected}>
      <SelectTrigger>
        <SelectValue placeholder="Selecione um prompt..." />
      </SelectTrigger>
      <SelectContent>
        {prompts?.map(prompt => (
          <SelectItem key={prompt.id} value={prompt.template}>{prompt.title}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}