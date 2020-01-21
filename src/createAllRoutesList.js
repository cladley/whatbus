const fetch = require("node-fetch");
const fs = require("fs");

const allRoutesUrl = "https://api.tfl.gov.uk/Line/Route?serviceTypes=Regular";

async function getAllRoutes() {
  const data = await fetch(allRoutesUrl);
  const allRoutes = await data.json();

  const routes = allRoutes
    .filter(route => route.modeName === "bus")
    .map(route => {
      return {
        id: route.id,
        name: route.name,
        sections: [
          ...new Set(
            route.routeSections
              .map(section => section.name.split("-").map(r => r.trim()))
              .flat()
          )
        ].join(" * ")
      };
    });

  fs.writeFile("routes.json", JSON.stringify(routes), err => {
    if (err) console.log(err);
    console.log("DONE");
  });
}

function run() {
  getAllRoutes();
}

run();
