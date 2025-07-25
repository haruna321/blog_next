import * as React from 'react'
import Box from '@mui/material/Box'
import OutlinedInput from '@mui/material/OutlinedInput'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Chip from '@mui/material/Chip'
import { useEffect } from 'react'
import { TCategoryData } from '@/types'

interface Props {
  selectedCategories: TCategoryData[]
  setSelectedCategories: (categories: TCategoryData[]) => void
}

export const CategoriesSelect: React.FC<Props> = ({
  selectedCategories,
  setSelectedCategories,
}) => {
  const [categories, setCategories] = React.useState<TCategoryData[]>([])

  const handleChange = (value: number[]) => {
    value.forEach((v: number) => {
      const isSelect = selectedCategories.some((c) => c.id === v)
      if (isSelect) {
        setSelectedCategories(selectedCategories.filter((c) => c.id !== v))
        return
      }

      const category = categories.find((c) => c.id === v)
      if (!category) return
      setSelectedCategories([...selectedCategories, category])
    })
  }

  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch('/api/admin/categories')
      const { categories } = await res.json()
      setCategories(categories)
    }

    fetcher()
  }, [])

  return (
    <FormControl className="w-full">
      <Select
        multiple
        value={selectedCategories}
        onChange={(e) => handleChange((e.target.value as unknown) as number[])}
        input={<OutlinedInput />}
        renderValue={(selected: TCategoryData[]) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map((value: TCategoryData) => (
              <Chip key={value.id} label={value.name} />
            ))}
          </Box>
        )}
      >
        {categories.map((category) => (
          <MenuItem key={category.id} value={category.id}>
            {category.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
