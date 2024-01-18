import { Box, Typography, Input, FormControl, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import Slider from '@mui/material/Slider';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { QueryFilters } from '../../../types/shared.types';


interface FormProps {
  searchProducts: any
}

const Form = ({ searchProducts }: FormProps) => {

  const [priceRange, setPriceRange] = useState<number[]>([0, 50]);
  const [checkBoxFilters, setCheckBoxFilters] = useState<Set<string>>(new Set());
  const [query, setQuery] = useState<string | null>(null)
  const hasBeenReRendered = useRef(false)

  useEffect(() => {
    if (hasBeenReRendered.current) {

      const completeQuery: QueryFilters = Array.from(checkBoxFilters).reduce((finalQuery, filter) => {
        const interimQuery: QueryFilters = { ...finalQuery, [filter]: query }
        return interimQuery
      }, {})

      completeQuery.minPrice = priceRange[0].toString()
      completeQuery.maxPrice = priceRange[1].toString()

      searchProducts(completeQuery)
    }
    hasBeenReRendered.current = true
  }, [checkBoxFilters, query, priceRange]);

  const handlePriceRangeChange = (event: Event, newPrice: number | number[]) => {
    setPriceRange(newPrice as number[])
  }

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    const queryFilter = event.target.id
    if (checked) {
      setCheckBoxFilters(previousQueryFilters => new Set(previousQueryFilters).add(queryFilter))
    } else {
      setCheckBoxFilters(previousQueryFilters => {
        const next = new Set(previousQueryFilters)
        next.delete(queryFilter)
        return next
      })
    }
  }

  const debouncedHandleQueryChange = useDebouncedCallback((event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }, 500)

  const showPriceRange = (priceRange: number[]) => {
    const [min, max] = priceRange
    return `${min}-${max} €`
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h2" color="primary">K-Tuotteet</Typography>
      <FormControl>
        <FormGroup row>
          <FormControlLabel control={<Checkbox id="name" onChange={handleCheckboxChange} />} label="Nimi" />
          <FormControlLabel control={<Checkbox id="brand" onChange={handleCheckboxChange} />} label="Brändi" />
          <FormControlLabel control={<Checkbox id="category" onChange={handleCheckboxChange} />} label="Kategoria" />
          <FormControlLabel control={<Checkbox id="ean" onChange={handleCheckboxChange} />} label="Ean-koodi" />
        </FormGroup>
        <Box sx={{ py: 2 }}>
          <Typography id="price-range-slider" gutterBottom>
            Hinta: {showPriceRange(priceRange)}
          </Typography>
          <Slider
            data-testid="price-slider"
            getAriaLabel={() => 'Hintahaarukka'}
            value={priceRange}
            onChange={handlePriceRangeChange}
            valueLabelDisplay="auto"
            min={0}
            max={50}
          />
        </Box>
        <Input id="query" color="secondary" placeholder="Mitä etsit?" onChange={debouncedHandleQueryChange} />
      </FormControl>
    </Box>
  )
}

export default Form
