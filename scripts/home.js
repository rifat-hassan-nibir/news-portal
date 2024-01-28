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

// Showing all news of category on the UI
const showNews = (allNews, categoryName) => {
  console.log(allNews);
  // Number of items in a category
  const numberOfNewsText = document.getElementById("number-of-news");
  const numberOfNewsDiv = document.getElementById("number-of-news-div");
  numberOfNewsDiv.classList.remove("hidden");
  numberOfNewsText.innerText = `${allNews.length} items found for category ${categoryName}`;

  // Showing the news
  const allNewsDiv = document.getElementById("all-news-div");
  allNewsDiv.innerHTML = ``;
  allNews.forEach((news) => {
    console.log(news);
    const singleNewsDiv = document.createElement("div");
    singleNewsDiv.innerHTML = `
    <div class="bg-white p-5 rounded-xl flex flex-col lg:flex-row gap-0 lg:gap-10 my-6">
          <div class="w-full lg:w-1/5">
            <img class="w-full" src="${news.thumbnail_url}" alt="" />
          </div>
          <div class="w-full lg:w-4/5 flex flex-col justify-between py-7 space-y-7">
            <div class="space-y-4">
              <h3 class="text-[28px] text-[#121221] font-bold">
                ${news.title}
              </h3>
              <p class="text-base text-[#949494]">
                ${news.details}
              </p>
            </div>
            <div class="flex justify-between ">
              <div class="flex items-center gap-3">
                <img class="size-10 rounded-full" src="img/user-image.png" alt="" />
                <div>
                  <h4 class="text-base text-[#2B2C34]">Jane Cooper</h4>
                  <p class="text-sm text-[#718797]">Jan 10, 2022</p>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <i class="fa-regular fa-eye text-xl text-[#515151]"></i>
                <p class="text-lg font-bold text-[#515151]">1.M</p>
              </div>
              <div class="flex items-center hidden lg:block w-[150px]">
                <a class="w-16" href="#"
                  ><i class="fa-regular fa-star"></i></i
                ></a>
                <a class="w-16" href="#"
                  ><i class="fa-regular fa-star"></i></i
                ></a>
                <a class="w-16" href="#"
                  ><i class="fa-regular fa-star"></i></i
                ></a>
                <a class="w-16" href="#"
                  ><i class="fa-regular fa-star"></i></i
                ></a>
                <a class="w-16" href="#"
                  ><i class="fa-regular fa-star"></i></i
                ></a>
              </div>
              <div class="flex items-center">
                <a class="w-16" href="#"
                  ><i class="fa-solid fa-arrow-right text-2xl text-[#515151]"></i
                ></a>
              </div>
            </div>
          </div>
        </div>
    `;
    allNewsDiv.appendChild(singleNewsDiv);
  });
};

// Showing the categories on the UI
const showCategories = (categories) => {
  categories.forEach((category) => {
    const newsCategoryContainer = document.getElementById("news-category-container");
    const categoryListItemElement = document.createElement("li");
    categoryListItemElement.innerHTML = `
    <a href='#' onclick = "loadSingleCategoryNews('${category.category_id}', '${category.category_name}')">${category.category_name}</a>
    `;
    newsCategoryContainer.appendChild(categoryListItemElement);
  });
};
