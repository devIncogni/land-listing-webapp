async function getData() {
  let data = await fetch("property-cards.json");
  data = await data.json();
  console.log(data[1]);
}

getData();
