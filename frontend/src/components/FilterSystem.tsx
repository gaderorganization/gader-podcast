"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "./ui/button"

export interface Category {
  id: number
  name: string
  color: string
}

export function FilterSystem({ categories }: { categories: Category[] }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const currentCategoryIds = searchParams.getAll("category")

  const toggleCategory = (id: string) => {
    const params = new URLSearchParams(searchParams)
    
    // If "All" is selected (empty ID), clear all categories
    if (!id) {
      params.delete("category")
    } else {
      if (currentCategoryIds.includes(id)) {
        params.delete("category", id) // Note: delete with value is supported in newer URLSearchParams, otherwise we need to rebuild
      } else {
        params.append("category", id)
      }
    }
    
    router.push(`/?${params.toString()}`, { scroll: false })
  }

  // Workaround for URLSearchParams delete specific value
  const toggle = (id: string) => {
    const params = new URLSearchParams(searchParams)
    if (!id) {
      params.delete("category")
    } else {
      let existing = params.getAll("category")
      params.delete("category")
      if (existing.includes(id)) { existing = existing.filter(e => e !== id) }
      else { existing.push(id) }
      existing.forEach(e => params.append("category", e))
    }
    router.push(`/?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="flex flex-wrap gap-2 mb-8 items-center justify-center">
      <Button 
        variant={currentCategoryIds.length === 0 ? "default" : "outline"}
        onClick={() => toggle("")}
        className="rounded-full"
      >
        All Categories
      </Button>
      
      {categories.map(cat => {
        const isActive = currentCategoryIds.includes(cat.id.toString())
        return (
          <Button
            key={cat.id}
            variant={isActive ? "default" : "outline"}
            onClick={() => toggle(cat.id.toString())}
            className="rounded-full"
            style={isActive ? { backgroundColor: cat.color || 'var(--color-primary)' } : { borderColor: cat.color || 'var(--color-primary)', color: cat.color || 'var(--color-primary)' }}
          >
            {cat.name}
          </Button>
        )
      })}
    </div>
  )
}
