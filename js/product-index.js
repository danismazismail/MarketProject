function loadProducts() {
  if (!window.location.hash) {
    window.location = window.location + "#loaded";
    window.location.reload();
  }
  fetch("https://localhost:7294/api/Product/GetProductAsync")
    .then((response) => response.json())
    .then((data) => {
      var table = document.getElementById("products");
      table.innerHTML = "";
      data.forEach((product) => {
        var tr = document.createElement("tr");
        var td1 = document.createElement("td");
        var td2 = document.createElement("td");
        var td3 = document.createElement("td");
        var td4 = document.createElement("td");
        var td5 = document.createElement("td");
        var td6 = document.createElement("td");
        var td7 = document.createElement("td");
        var td8 = document.createElement("td");
        var td9 = document.createElement("td");
        var td10 = document.createElement("td");

        td1.appendChild(document.createTextNode(product.id));
        td2.appendChild(document.createTextNode(product.name));
        td3.appendChild(document.createTextNode(product.price));
        td4.appendChild(document.createTextNode(product.quantity));
        td5.appendChild(document.createTextNode(product.categoryName));

        td6.appendChild(
          document.createTextNode(
            new Date(product.createdDate).toLocaleString("tr-TR")
          )
        );
        td7.appendChild(
          document.createTextNode(
            product.updatedDate != null
              ? new Date(product.updatedDate).toLocaleString("tr-TR")
              : "-"
          )
        );
        td8.appendChild(
          document.createTextNode(
            product.status == 1 ? "Aktif" : "Güncellenmiş"
          )
        );
        var buttonUpdate = document.createElement("a");
        buttonUpdate.id = "updateBtn" + product.id;
        buttonUpdate.classList.add("btn");
        buttonUpdate.classList.add("btn-primary");
        buttonUpdate.href = "UpdateProduct.html?id=" + product.id;
        buttonUpdate.appendChild(document.createTextNode("Update"));
        td9.appendChild(buttonUpdate);

        var buttonDelete = document.createElement("a");
        buttonDelete.id = "deleteBtn" + product.id;
        buttonDelete.classList.add("btn");
        buttonDelete.classList.add("btn-danger");
        buttonDelete.addEventListener("click", function () {
          deleteProduct(product.id);
        });
        buttonDelete.appendChild(document.createTextNode("Delete"));
        td10.appendChild(buttonDelete);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);
        tr.appendChild(td7);
        tr.appendChild(td8);
        tr.appendChild(td9);
        tr.appendChild(td10);

        table.appendChild(tr);
      });
    });
}
function loadCategoriesIntoSelect() {
  fetch("https://localhost:7294/api/Categories/GetCategories")
    .then((response) => response.json())
    .then((categories) => {
      var select = document.getElementById("categorySelect");
      categories.forEach((category) => {
        var option = document.createElement("option");
        option.value = category.id;
        option.text = category.name;
        select.appendChild(option);
      });
    })
    .catch((error) => console.error("Error:", error));
}
function createProduct() {
  let form = document.getElementById("form1");

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(form);

      fetch("https://localhost:7294/api/Product/CreateProductAsync", {
        method: "POST",
        body: data,
      })
        .then((response) => {
          console.log(response);
        })
        .then((window.location.href = "Product-index.html"))
        .catch((error) => {
          console.error(error);
        });
    });
  }
}
function updateProductGet() {
  var queryString = decodeURIComponent(window.location.search);
  //console.log(queryString.substring(4))
  var productId = queryString.substring(4);

  fetch(
    "https://localhost:7294/api/Products/GetProductByIdAsync?id=" + productId
  )
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("id").value = data.id;
      document.getElementById("name").value = data.name;
      document.getElementById("price").value = data.price;
      document.getElementById("quantity").value = data.quantity;
    });
}
function updateProductPost(event) {
  event.preventDefault();
  let form = document.getElementById("updateProductForm");
  const data = new FormData(form);
  fetch("https://localhost:7294/api/Products/UpdateProductAsync", {
    method: "PUT",
    body: data,
  })
    .then((response) => console.log(response))
    .then(() => {
      window.location.href = "Product-index.html";
    })
    .catch((error) => console.log(error));
}
function deleteProduct(id) {
  var result = confirm("Silmek istediğinize emin misiniz?");
  if (result) {
    fetch("https://localhost:7294/api/Products/DeleteProduct?id=" + id, {
      method: "DELETE",
    })
      .then(() => {
        loadProducts();
      })
      .catch((error) => console.log(error));
  }
}

window.onload = function () {
  loadCategoriesIntoSelect();
  createProduct();
};
