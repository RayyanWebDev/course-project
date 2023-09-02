const handleCategory = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await response.json();

  const tabContainer = document.getElementById("tab-container");

  data.data.slice(0, 4).forEach((category) => {
    console.log(category);

    const div = document.createElement("div");

    div.innerHTML = `<a onclick="handleLoadNews('${category.category_id}')" class="tab">${category.category}</a>
    `;
    tabContainer.appendChild(div);
  });

  console.log(data.data);

  const categoryButtons = document.querySelectorAll(".tab");
  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      hideBlogContent();
    });
  });
};

const handleLoadNews = async (categoryId) => {
  console.log(categoryId);

  const response = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${categoryId}`
  );
  const data = await response.json();

  const cardContainer = document.getElementById("cardId");

  cardContainer.innerHTML = "";

  data.data.forEach((news) => {
    console.log(news);
    const div = document.createElement("div");
    div.innerHTML = `
        <div class="card w-96  bg-base-100 shadow-xl gap-10 mb-10">
        <figure>
          <div class=""><img class="h-52 relative "
          src=${news.thumbnail}
          alt=""
        /></div>
          <p class="absolute top-44 left-72  text-amber-300">${news.others.posted_date}</p>
        </figure>
        <div class="card-body">
          <div class="card-title">
            <div class="avatar">
              <div class="w-9 rounded-full">
                <img src=${news.authors[0].profile_picture} />
              </div>
            </div>
            <h2 class="text-base">${news.title}</h2>
          </div>
          <div class="ml-10">
            <div class="flex w-36">
              <p>${news.authors[0].profile_name}</p>
              <p>${news.authors[0].verified}</p>
            </div>

            <p>${news.others.views}</p>
          </div>
        </div>
      </div>
      `;
    cardContainer.appendChild(div);
  });
};

const hideBlogContent = () => {
  const blogConten = document.getElementById("blogContent");
  blogConten.style.display = "none";
};

const handleBlogButtonClick = () => {
  const blogConten = document.getElementById("blogContent");

  if (blogConten.style.display === "none" || blogConten.style.display === "") {
    blogConten.style.display = "block";
  } else {
    blogConten.style.display = "none";
  }
};

const blogBtn = document.getElementById("blog");
blogBtn.addEventListener("click", handleBlogButtonClick);

handleCategory();
handleLoadNews(1000);
