import Vizzu from "https://vizzu-lib-main.storage.googleapis.com/lib/vizzu.min.js";
import { CSVParser } from "../dist/mjs/index.js";
let chart;

window.addEventListener("load", async function () {
  const result = this.document.getElementById("result");

  const button = document.getElementById("testBTN");
  const textContent = document.getElementById("textArea");

  button.addEventListener("click", async function (event) {
    event.preventDefault();

    //destroy chart if it exists
    if (chart) chart.detach();

    //create new chart and add csv parser
    chart = new Vizzu("vizzu");
    chart.feature(new CSVParser(), true);
    await chart.initializing;

    // set chart options with csv text content
    const contentText = textContent.value;
    if (contentText && contentText.length > 0) {
      chart.animate({
        data: {
          csv: {
            content: contentText,
            options: {
              encoding: "utf8",
            },
          },
        },
      });

      result.innerHTML = "Loading...";

      // parse csv text content for the more information (header, delimiter, series)
      const parser = new CSVParser();
      const parsedData = await parser.parse(contentText);

      // header detection
      let content = "";
      const hasHeader = parser.hasHeader;
      if (hasHeader) {
        content += "<p><b>Header is detected</b><br>";
      } else {
        content += "<p>Header is not detected</b><br>";
      }

      // delimiter detection
      const delimiter = parser.delimiter;
      content += `<b>Delimiter</b>: <code>${JSON.stringify(
        delimiter
      )}</code></p>`;

      content += "<p><b>Series:</b><br>";

      // series detection and animation
      const animate = () => {
        const data = chart.data;

        // wait for data to be loaded
        if (parsedData.series.length !== data.series.length) {
          setTimeout(animate, 50);
          return;
        }

        // show series information
        data.series.forEach((seriesItem) => {
          content += `Name: <b>${seriesItem.name}</b><br>`;
          content += `Type: <b>${seriesItem.type}</b><br>`;
          if (seriesItem.type === "dimension") {
            content += `Categories: <b>${seriesItem.categories.join(",")}</b>`;
          } else {
            content += `Data range: <b>${seriesItem.range.min} - ${seriesItem.range.max}</b>`;
          }
          content += "</p>";
        });

        result.innerHTML = content;

        // animate chart
        const x = data.series
          .filter((seriesItem) => seriesItem.type === "dimension")
          .shift();
        if (!x) {
          console.error("No x axis");
          return;
        }

        const y = data.series
          .filter((seriesItem) => seriesItem.type === "measure")
          .pop();
        if (!y) {
          console.error("No y axis");
          return;
        }

        chart.animate({
          config: {
            channels: {
              y: {
                set: [y.name],
                //range: {max: y.range.max},
              },
              x: {
                set: [x.name], 
                range: { max: Math.min(10, x.categories.length) },
              },
            },
            color: { set: [x.name] },
          },
          data: { filter: null },
        });
      };
      animate();
    }
  });
});
