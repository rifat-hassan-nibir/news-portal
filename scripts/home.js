// Loading the categories
const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/news/categories")
    .then((response) => response.json())
    .then((data) => showCategories(data.data.news_category));
};

loadCategories();

// Loading Single Categories
const loadSingleCategoryNews = (id, categoryName) => {
  loaderFunction(true);
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
              <h3 class="text-2xl lg:text-[28px] text-[#121221] font-bold">
                ${news.title}
              </h3>
              <p class="text-base text-[#949494]">
                ${news.details.slice(0, 400)}...
              </p>
            </div>
            <div class="flex justify-between ">
              <div class="flex items-center gap-3">
                <img class="size-10 rounded-full" src="${news.author.img}" alt="" />
                <div>
                  <h4 class="text-base text-[#2B2C34]">${
                    news.author.name ? news.author.name : "No data found"
                  }</h4>
                  <p class="text-sm text-[#718797]">${
                    news.author.published_date ? news.author.published_date : "No data found"
                  }</p>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <i class="fa-regular fa-eye text-xl text-[#515151]"></i>
                <p class="text-lg font-bold text-[#515151]">${
                  news.total_view ? news.total_view : "No data found"
                }</p>
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
                <a onclick="my_modal_4.showModal(); loadSingleNews('${
                  news._id
                }')" class="w-16 text-right" href="#"
                  ><i class="fa-solid fa-arrow-right text-2xl text-[#515151]"></i
                ></a>
              </div>
            </div>
          </div>
        </div>
    `;
    allNewsDiv.appendChild(singleNewsDiv);
  });
  loaderFunction();
};

// Load single news
const loadSingleNews = (id) => {
  fetch(`https://openapi.programming-hero.com/api/news/${id}`)
    .then((response) => response.json())
    .then((data) => showSingleNewsOnUI(data.data[0]));
};

// Show single news on UI
const showSingleNewsOnUI = (singleNewsData) => {
  console.log(singleNewsData);
  const modalDiv = document.getElementById("my_modal_4");
  modalDiv.innerHTML = `
  <div class="modal-box w-11/12 max-w-5xl space-y-5">
            <img class="mx-auto" src="${singleNewsData.thumbnail_url}">
            <h3 class="font-bold text-2xl">${singleNewsData.title}</h3>
            <p class="py-4">${singleNewsData.details}</p>
            <div class="modal-action">
              <form method="dialog">
                <!-- if there is a button, it will close the modal -->
                <button class="btn">Close</button>
              </form>
            </div>
          </div>
  `;
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

// Loader
const loaderFunction = (isLoading) => {
  const loaderElement = document.getElementById("loader");
  if (isLoading) {
    loaderElement.classList.remove("hidden");
  } else {
    loaderElement.classList.add("hidden");
  }
};
