// localStorage
let data = [];
let fulltime = ["", "", ""];
let filter = [-1, -1, -1];
let o = 0;
let t = 0;
let s = 0;
let lastitem = "";
let input = document.getElementById("search");
let count_show = 0;
// localStorage.clear();
if (localStorage.data) {
  // console.log(localStorage.data)
  data = JSON.parse(localStorage.data);
  // console.log(localStorage.data)
  // Populate the table with data
} else {
  localStorage.data = JSON.stringify(data);
}
// add in table
function add(click, i) {
  //efect on click
  click.style.background = "green";
  setTimeout(() => {
    click.style.background = "#007bff";
    click.value = "إضافة";
  }, 1000);
  // get values from inputs
  if (i >= 0) {
    data.splice(i, 1);
    data_table(data);
    localStorage.data = JSON.stringify(data);
  }
  let name = document.getElementById("nom").value;
  let operation = document.querySelector(
    'input[name="operation"]:checked'
  ).value;
  let type = document.querySelector('input[name="type"]:checked').value;
  let gram = document.getElementById("gram").value;
  let price = document.getElementById("price").value;
  let description = document.getElementById("type").value;
  let status = document.querySelector('input[name="status"]:checked').value;
  let time =
    new Date().getDate() +
    "-" +
    (new Date().getMonth() + 1) +
    "-" +
    new Date().getFullYear();

  // console.log(name, operation, type, gram, price, description, status,time);
  // create object
  let user = {
    time: time,
    newdata: {
      name: name,
      operation: operation,
      type: type,
      gram: gram,
      price: price,
      description: description,
      status: status,
    },
  };

  // add user to local storage
  data.unshift(user);
  localStorage.data = JSON.stringify(data);
  data_table(data);
  agenda();
  // clear inputs
  document.getElementById("nom").value = "";
  document.getElementById("gram").value = "";
  document.getElementById("price").value = "";
  document.getElementById("type").value = "";
  document.querySelectorAll('input[name="operation"]')[0].checked = true;
  document.querySelectorAll('input[name="type"]')[1].checked = true;
  document.querySelectorAll('input[name="status"]')[0].checked = true;
}
function data_table(array) {
  let table = document.getElementById("tbody");
  table.innerHTML = "";
  let totale = 0 ;
  array.forEach((column, i) => {
    if (column.newdata.status == 2 || column.newdata.operation == 0) {
        totale -= Number(column.newdata.price) ;
    }else{
        totale += Number(column.newdata.price) ;
    }
    let operation =
      column.newdata.operation == 0
        ? `<td class="operation">بيع</td>
                <td class="operation hidden">إصلاح</td>
                <td class="operation hidden">تشلال</td>
                <td class="operation hidden">شراء</td>`
        : column.newdata.operation == 1
        ? `<td class="operation hidden">بيع</td>
                <td class="operation">إصلاح</td>
                <td class="operation hidden">تشلال</td>
                <td class="operation hidden">شراء</td>`
        : column.newdata.operation == 2
        ? `<td class="operation hidden">بيع</td>
                <td class="operation hidden">إصلاح</td>
                <td class="operation">تشلال</td>
                <td class="operation hidden">شراء</td>`
        : `<td class="operation hidden">بيع</td>
                <td class="operation hidden">إصلاح</td>
                <td class="operation hidden">تشلال</td>
                <td class="operation">شراء</td>`;
    let type =
      column.newdata.type == 0
        ? `<td class="type">ذهب</td>
                <td class="type hidden">فضة</td>
                <td class="type hidden">اخرى</td>`
        : column.newdata.type == 1
        ? `<td class="type hidden">ذهب</td>
                <td class="type">فضة</td>
                <td class="type hidden">اخرى</td>`
        : `<td class="type hidden">ذهب</td>
                <td class="type hidden">فضة</td>
                <td class="type">اخرى</td>`;
    let status =
      column.newdata.status == 0
        ? `<td class="status" style="--c:green"></td>
                <td class="status hidden" style="--c:orange"></td>
                <td class="status hidden" style="--c:red"></td>`
        : column.newdata.status == 1
        ? `<td class="status hidden" style="--c:green"></td>
                <td class="status" style="--c:orange"></td>
                <td class="status hidden" style="--c:red"></td>`
        : `<td class="status hidden" style="--c:green"></td>
                <td class="status hidden" style="--c:orange"></td>
                <td class="status" style="--c:red"></td>`;
    if (column.time != array[i - 1]?.time) {
      table.innerHTML += `
                <tr>
                    <td colspan="15" class="time fw-bolder">${column.time}</td>
                </tr>
                `;
    }

    table.innerHTML += `<tr>
                <td>${column.newdata.name}</td>
                ${operation}
                ${type}
                <td>${column.newdata.description}</td>
                <td>${column.newdata.gram ? column.newdata.gram + "g" : ""}</td>
                <td>${
                  column.newdata.price ? column.newdata.price + "dh" : ""
                }</td>
                ${status}
                <td><input type="submit" class="edit" style="--c:rgb(255, 179, 0);" value="تعديل" onclick="edit(${i})"><input type="submit" class="remove" style="--c:red;" value="حذف" onclick="remove(${i})"></td>
                </tr>`;
  });
  document.getElementById('totale').innerHTML = totale + 'DH' ;
}
function remove(i) {
  if (confirm("هل تريد حذف هذا العنصر؟")) {
    // remove item from data
    data.splice(i, 1);
    data_table(data);
    localStorage.data = JSON.stringify(data);
  }
}
function edit(i) {
  // get item from data
  let item = data[i];
  // fill inputs with item data
  document.getElementById("nom").value = item.newdata.name || "";
  document.getElementById("gram").value = item.newdata.gram || "";
  document.getElementById("price").value = item.newdata.price || "";
  document.getElementById("type").value = item.newdata.description || "";
  document.querySelectorAll('input[name="operation"]')[
    item.newdata.operation
  ].checked = true;
  document.querySelectorAll('input[name="status"]')[
    item.newdata.status
  ].checked = true;
  document.querySelectorAll('input[name="type"]')[
    item.newdata.type
  ].checked = true;
  document.querySelectorAll(".edit").forEach((el) => {
    el.style.opacity = "1";
  });
  document.getElementsByClassName("edit")[i].style.opacity = "0.5";
  document.getElementById("add").value = "تاكيد";
  document.getElementById("add").style.backgroundColor = "green";
  document.getElementById("add").onclick = function () {
    add(this, i);
  };
}
function incrementMonth(mode) {
  let month_name = document.getElementById("month-name");
  let month = document.getElementById("month").value;
  let months = [
    "يناير",
    "فبراير",
    "مارس",
    "أبريل",
    "ماي",
    "يونيو",
    "يوليوز",
    "غشت",
    "شتنبر",
    "أكتوبر",
    "نونبر",
    "دجنبر",
  ];
  if (mode == 1) {
    month++;
    if (month >= months.length - 1) {
      month = 0;
    }
  } else {
    month--;
    if (month < 0) {
      month = months.length - 1;
    }
  }
  fulltime = [fulltime[0], month + 1, fulltime[2]];
  month_name.innerHTML = months[month];
  document.getElementById("month").value = month;
  console.log(month);
  data_table(
    data.filter((item) => {
      // return item.time == fulltime.join('-');
      return (
        (filter[0] < 0 || item.newdata.operation == filter[0]) &&
        (filter[1] < 0 || item.newdata.type == filter[1]) &&
        (filter[2] < 0 || item.newdata.status == filter[2]) &&
        item.time == fulltime.join("-") &&
        (item.newdata.name.toLowerCase().includes(input.value.toLowerCase()) ||
          item.newdata.description
            .toLowerCase()
            .includes(input.value.toLowerCase()) ||
          item.newdata.gram.toLowerCase().includes(input.value.toLowerCase()) ||
          item.newdata.price.toLowerCase().includes(input.value.toLowerCase()))
      );
    })
  );
}
function agenda() {
  let date = new Date();
  document.querySelector(".year").value = date.getFullYear();
  let month_name = document.getElementById("month-name");
  document.getElementById("month").value = date.getMonth();
  let months = [
    "يناير",
    "فبراير",
    "مارس",
    "أبريل",
    "ماي",
    "يونيو",
    "يوليوز",
    "غشت",
    "شتنبر",
    "أكتوبر",
    "نونبر",
    "دجنبر",
  ];
  month_name.innerHTML = months[date.getMonth()];
  let days = date.getDate() - 1;
  let jours = document.querySelectorAll(".jour div");
  jours[days].classList.add("focus");
  fulltime = [date.getDate(), date.getMonth() + 1, date.getFullYear()];
  jours.forEach((jour, i) => {
    jour.onclick = () => {
      jours.forEach((j) => {
        j.classList.remove("focus");
      });
      jour.classList.add("focus");
      fulltime = [i + 1, fulltime[1], fulltime[2]];
      data_table(
        data.filter((item) => {
          return (
            (filter[0] < 0 || item.newdata.operation == filter[0]) &&
            (filter[1] < 0 || item.newdata.type == filter[1]) &&
            (filter[2] < 0 || item.newdata.status == filter[2]) &&
            item.time == fulltime.join("-") &&
            (item.newdata.name
              .toLowerCase()
              .includes(input.value.toLowerCase()) ||
              item.newdata.description
                .toLowerCase()
                .includes(input.value.toLowerCase()) ||
              item.newdata.gram
                .toLowerCase()
                .includes(input.value.toLowerCase()) ||
              item.newdata.price
                .toLowerCase()
                .includes(input.value.toLowerCase()))
          );
        })
      );
    };
  });
  document.getElementById("year").onkeyup = (event) => {
    console.log();
    fulltime = [
      fulltime[0],
      fulltime[1],
      document.getElementById("year").value,
    ];
    data_table(
      data.filter((item) => {
        return (
          (filter[0] < 0 || item.newdata.operation == filter[0]) &&
          (filter[1] < 0 || item.newdata.type == filter[1]) &&
          (filter[2] < 0 || item.newdata.status == filter[2]) &&
          item.time == fulltime.join("-") &&
          (item.newdata.name
            .toLowerCase()
            .includes(input.value.toLowerCase()) ||
            item.newdata.description
              .toLowerCase()
              .includes(input.value.toLowerCase()) ||
            item.newdata.gram
              .toLowerCase()
              .includes(input.value.toLowerCase()) ||
            item.newdata.price
              .toLowerCase()
              .includes(input.value.toLowerCase()))
        );
      })
    );
  };
}
function filter_table(item, mode, value) {
  switch (mode) {
    case "o":
      document.querySelectorAll(".o").forEach((el) => {
        el.classList.remove("clicked");
      });
      break;
    case "t":
      document.querySelectorAll(".t").forEach((el) => {
        el.classList.remove("clicked");
      });
      break;
    case "s":
      document.querySelectorAll(".s").forEach((el) => {
        el.classList.remove("clicked");
      });
      break;

    default:
      break;
  }
  item.classList.add("clicked");
  mode == "o"
    ? (filter = [value, filter[1], filter[2]])
    : mode == "t"
    ? (filter = [filter[0], value, filter[2]])
    : (filter = [filter[0], filter[1], value]);

  data_table(
    data.filter((item) => {
      return (
        (filter[0] < 0 || item.newdata.operation == filter[0]) &&
        (filter[1] < 0 || item.newdata.type == filter[1]) &&
        (filter[2] < 0 || item.newdata.status == filter[2]) &&
        item.time == fulltime.join("-") &&
        (item.newdata.name.toLowerCase().includes(input.value.toLowerCase()) ||
          item.newdata.description
            .toLowerCase()
            .includes(input.value.toLowerCase()) ||
          item.newdata.gram.toLowerCase().includes(input.value.toLowerCase()) ||
          item.newdata.price.toLowerCase().includes(input.value.toLowerCase()))
      );
    })
  );
}
function again() {
  data_table(data.filter((item) => item.time == fulltime.join("-")));
  document.querySelectorAll(".o").forEach((el) => {
    el.classList.remove("clicked");
  });
  document.querySelectorAll(".t").forEach((el) => {
    el.classList.remove("clicked");
  });
  document.querySelectorAll(".s").forEach((el) => {
    el.classList.remove("clicked");
  });
  input.value = "";
}
function search() {
  input.onkeyup = () => {
    data_table(
      data.filter((item) => {
        return (
          (filter[0] < 0 || item.newdata.operation == filter[0]) &&
          (filter[1] < 0 || item.newdata.type == filter[1]) &&
          (filter[2] < 0 || item.newdata.status == filter[2]) &&
          item.time == fulltime.join("-") &&
          (item.newdata.name
            .toLowerCase()
            .includes(input.value.toLowerCase()) ||
            item.newdata.description
              .toLowerCase()
              .includes(input.value.toLowerCase()) ||
            item.newdata.gram
              .toLowerCase()
              .includes(input.value.toLowerCase()) ||
            item.newdata.price
              .toLowerCase()
              .includes(input.value.toLowerCase()))
        );
      })
    );
  };
}
function show_main(element) {
  if (count_show % 2 == 0) {
    document.querySelector("main").style = "display:none !important ;";
    document.getElementById("filter").style.display = "block";
    count_show++;
  } else {
    document.querySelector("main").style = "display:flex;";
    count_show--;
    element.style.display = "none";
  }
}
search();
agenda();
data_table(data);
document.addEventListener('click' ,() =>  {
window.addEventListener("beforeunload", function (e) {
  e.preventDefault();
});

})
