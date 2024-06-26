const searchBox = document.querySelector('.searchBox');
const searchbtn = document.querySelector('.searchbtn');
const recipe = document.querySelector('.recipe-cont');
const recipecontent = document.querySelector('.recipe-content');
const closebtn = document.querySelector('.closebtn');

// get recipes
const fetchRecipes = async (query) => {
  recipe.innerHTML = "fetching recipies..."
  try{
  const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
  const response = await data.json();
  //console.log(response);

  recipe.innerHTML = "";
  response.meals.forEach(meal => {
    //console.log(meal);
    // create div from api
    const recipediv = document.createElement('div');
    recipediv.classList.add('recipe');
    recipediv.innerHTML = ` 
        <div class="card" style="width: 18rem;">
        <img src="${meal.strMealThumb}" class="card-img-top ${'img-fluid'}" alt="...">
        <div class="card-body">
          <h5 class="card-title">${meal.strMeal}</h5>
          <p class="card-text"><span>${meal.strArea}</span> Dish</p>
          <p>Belong to <span>${meal.strCategory}</span> Category</p>
          
        </div>
      </div>
        
        `
    //  <img src="${meal.strMealThumb}" class="${'img-fluid'}">
    //  <h3>${meal.strMeal}</h3>
    //  <p><span>${meal.strArea}</span> Dish</p>
    //  <p>Belong to <span>${meal.strCategory}</span> Category</p>
    //add button
    const button = document.createElement('button');
    button.textContent = "view Recipe";
    recipediv.appendChild(button);

    button.addEventListener('click', () => {
      opendetail(meal);
    })
    recipe.appendChild(recipediv);
  })}
  catch{
    recipe.innerHTML = `<h2>Not found recipes</h2>`
  }
}


const fetchingredents = (meal) => {
  console.log(meal);
  let ingredenitslist = " ";
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    if (ingredient) {
      const measure = meal[`strMeasure${i}`];
      ingredenitslist += `<li>${measure} ${ingredient}</li>`;

    } else {
      break;
    }
  }
  return ingredenitslist;
}
// open popop for recepies
const opendetail = (meal) => {

  recipecontent.innerHTML = `
  
       <h2 class="recipename">${meal.strMeal}</h2>
       <h3>Ingredents:</h3>
       <ul class="ingredientlist">${fetchingredents(meal)}</ul>
         <div>
    <h3>Instructions:</h3>
    <p class="instructions">${meal.strInstructions}</p>
     </div>

  `

  recipecontent.parentElement.style.display = 'block';
}

closebtn.addEventListener('click',()=>{
  recipecontent.parentElement.style.display = "none";
})
searchbtn.addEventListener('click', (e) => {
  e.preventDefault();
  const searchInput = searchBox.value.trim();
  if(!searchInput){
    recipe.innerHTML = `<h2>Type the meal what you want to search..</h2>`;
    return;
  }
  fetchRecipes(searchInput);
  //console.log('btn clicked');
})