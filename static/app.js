// function for plotting
// Use D3 fetch to read the JSON file
function plotInfo(id) {
  d3.json("../samples.json").then((importedData) => {

    console.log("data from json for charts: ", importedData);

    var data = importedData;

    console.log("making sure variable worked for charts: ", data);
  
    // filter samples by index 
    var samples = data.samples.filter(s => s.id.toString() === id)[0];
        
    console.log("samples: ", samples);

    // getting the top 10 values from sample_values
    var sample_values = samples.sample_values.slice(0, 10).reverse();

    console.log("sample_values: ", sample_values);

    // getting top 10 otu ids  
    var otu_ids_raw = (samples.otu_ids.slice(0, 10)).reverse();

    console.log("top 10 otu_ids: ", otu_ids_raw);
  
    // adding "otu" to each id, matches example from homework outline
    var otu_ids = otu_ids_raw.map(d => "OTU " + d)

    console.log("otu_ids w/text added: ", otu_ids);

    // get top 10 otu labels
    var otu_labels = samples.otu_labels.slice(0, 10);

    console.log("top 10 otu_labels: ", otu_labels);

    // trace variable for bar plot
    var trace1 = {
        x: sample_values,
        y: otu_ids,
        text: otu_labels,
        marker: {
          color: "purple"},
          type:"bar",
          orientation: "h",
    };

    // data
    var data1 = [trace1];

    // Apply the group bar mode to the layout
    var layout1 = {
      margin: {
          l: 100,
          r: 50,
          t: 100,
          b: 30
      }
    };
    // Render the plot to the div tag with id "bar": BAR CHART
    Plotly.newPlot("bar", data1, layout1);


    // bubble chart stuff
    var trace2 = {
        x: samples.otu_ids,
        y: samples.sample_values,
        mode: "markers",
        marker: {
          color: samples.otu_ids,
          size: samples.sample_values
        },
        text: samples.otu_labels
    };

    // data 
    var data2 = [trace2];

    // Apply the group bar mode to the layout
    var layout2 = {
      xaxis:{
        title: "<b>OTU ID</b>",
      },
      showlegend: false
    };

    // Render the plot to the div tag with id "bar": BUBBLE CHART
    Plotly.newPlot("bubble", data2, layout2); 

  })
};  


// create function to get json data for demographic info
function demoInfo(id) {
  d3.json("../samples.json").then((data)=> {
      
    var metadata = data.metadata;

    console.log("metadata: " ,metadata)

    // filter metadata by id
    var ind_meta = metadata.filter(meta => meta.id.toString() === id)[0];

    console.log("individual metadata: ", ind_meta);

    // select metadata div 
    var demographicInfo = d3.select("#sample-metadata");
    
    // clears panel so different data can load when id changes
    demographicInfo.html("");

    // getting demographic data and appending it to panel
    Object.entries(ind_meta).forEach((meta_data) => {   
            demographicInfo.append("h6").text(meta_data[0].toLocaleLowerCase() + ": " + meta_data[1] + " \n");    
    });
  });
}


// create function for any time that a new sample is selected
function optionChanged(yeah) {
  plotInfo(yeah);
  demoInfo(yeah);
}


// create function for dropdown selection
function init() { 
  var dropdown = d3.select("#selDataset");
 
  d3.json("../samples.json").then((data)=> {
      console.log("checking to see if json loads for dropdown selection: ", data)

      // ids for dropdown
      data.names.forEach(function(name) {
          dropdown.append("option").text(name).property("value");
      });

      // functions for data from above to display after dropdown selection
      plotInfo(data.names[0]);
      demoInfo(data.names[0]);

  });
}

init();
