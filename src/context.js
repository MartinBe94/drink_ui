import React, { useState, useContext, useEffect } from 'react'
import { useCallback } from 'react'

const recipeUrl =
  'https://localhost:7001/get-recipes/page/1/pageSize/100?glutenFree=false&dairyFree=false&keto=false&vegetarian=false&vegan=false&cheap=false&veryHealthy=false'
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const [isNavbarOpen, setIsNavbarOpen] = useState(false)
  const [isMobileSize, setIsMobileSize] = useState(false)

  const [recipes, setRecipes] = useState([])
  const [selectedRecipe, setSelectedRecipe] = useState(null)

  const apiKey = process.env.REACT_APP_API_KEY
  const headers = {
    'Content-Type': 'application/json',
    'X-Api-Key': apiKey,
  }

  const fetchRecipes = useCallback(async () => {
    try {
      console.log('fetching recipes')
      const response = await fetch(recipeUrl, { headers })
      const data = await response.json()
      const myRecipes = data
      console.log(data)
      console.log(myRecipes)
      if (myRecipes) {
        const newRecipes = myRecipes.map((recipe) => ({
          id: recipe.id,
          cheap: recipe.cheap,
          cuisines: recipe.cuisines,
          dairyFree: recipe.dairyFree,
          dishTypes: recipe.dishTypes,
          drinks: recipe.drinks,
          extendedIngredients: recipe.extendedIngredients,
          glutenFree: recipe.glutenFree,
          image: recipe.image,
          ingredients: recipe.ingredients,
          instructions: recipe.instructions,
          ketogenic: recipe.ketogenic,
          readyInMinutes: recipe.readyInMinutes,
          servings: recipe.servings,
          title: recipe.title,
          vegan: recipe.vegan,
          vegetarian: recipe.vegetarian,
          veryHealthy: recipe.veryHealthy,
        }))
        console.log(newRecipes)
        setRecipes(newRecipes)
        setLoading(false)
      } else {
        setRecipes([])
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  })

  useEffect(() => {
    fetchRecipes()
  }, [])
  return (
    <AppContext.Provider
      value={{
        loading,
        recipes,
        isNavbarOpen,
        setIsNavbarOpen,
        isMobileSize,
        setIsMobileSize,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
