// Loading the categories
const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/news/categories")
    .then((response) => response.json())
    .then((data) => showCategories(data.data.news_category));
};

loadCategories();

// Loading Single Categories
const loadSingleCategoryNews = (id, categoryName) => {
  fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
    .then((response) => response.json())
    .then((data) => showNews(data.data, categoryName));
};

// Showing Single News on the UI
const showNews = (news, categoryName) => {
  console.log(news);
  const numberOfNews = document.getElementById("number-of-news");
  numberOfNews.innerText = `${news.length} items found for category ${categoryName}`;
};

// Showing the categories on the UI
const showCategories = (categories) => {
  console.log(categories);
  categories.forEach((category) => {
    console.log(category);

    const newsCategoryContainer = document.getElementById("news-category-container");
    const categoryListItemElement = document.createElement("li");
    categoryListItemElement.innerHTML = `
    <a href='#' onclick = "loadSingleCategoryNews('${category.category_id}', '${category.category_name}')">${category.category_name}</a>
    `;
    newsCategoryContainer.appendChild(categoryListItemElement);
  });
};
