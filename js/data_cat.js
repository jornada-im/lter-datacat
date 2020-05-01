function initPage() {

  //******Initialize bootstrap tooltip
  $(function() {
    $('[data-toggle="tooltip"]').tooltip();
  });

  //******Call function to adjust tableDiv height on resize
  window.addEventListener('resize', adjustTableDiv);

  function adjustTableDiv(tmpID) {
    var tableDiv = document.getElementById("tableDiv").getBoundingClientRect();
    var footerContainer = document.getElementById("footerContainer").getBoundingClientRect();

    if(window.innerWidth < 800) {
      d3.select("#searchContainer").classed("collapse", true);
      d3.selectAll(".searchInput").classed("collapse", true);
      if(d3.select("#searchContainer").classed("show") == false) {
        d3.select(".searchButDiv").style("display", "none")
      }

      d3.select("#tableDiv").style("height", window.innerHeight - tableDiv.top - footerContainer.height - 1 + "px");
    }
    else {
      d3.select("#searchContainer").classed("collapse", false);
      d3.selectAll(".searchInput").classed("collapse", false);
      d3.select(".searchButDiv").style("display", "block");

      d3.select("#tableDiv").style("height", window.innerHeight - tableDiv.top - footerContainer.height - 12 + "px");
    }

  }

  //******Add search containers: 2 rows on wide format
  d3.select("body")
    .append("div")
    .attr("id", "narMenuDiv")
    .html('<span data-toggle="collapse" data-target="#searchContainer" aria-expanded="false" aria-controls="searchContainer" title="Click to expand/collapse filter options"><i class="fa fa-bars"></i></span>');

  d3.select("body")
    .append("div")
    .attr("class", "containerDiv collapse")
    .attr("id", "searchContainer")
      .append("div")
      .attr("id", "searchDiv1");

  //Update page after expanding/collapsing
  $('#searchContainer').on('shown.bs.collapse', function(e) { adjustTableDiv(e.target.id); d3.select(".searchButDiv").style("display", "block"); });
  $('#searchContainer').on('hide.bs.collapse', function(e) { d3.select(".searchButDiv").style("display", "none"); });
  $('#searchContainer').on('hidden.bs.collapse', function(e) { adjustTableDiv(e.target.id); });

  d3.select("#searchContainer")
    .append("div")
    .attr("id", "searchDiv2");

  //***Add search criteria to first row
  var sd = d3.select("#searchDiv1");

  //***Add EDI source
  sd.append("div")
    .attr("class", "searchCrit")
    .attr("id", "ediSource")
    .html('<div class="searchTopDiv"><h4>EDI Source'
      + '<span><i class="fa fa-info-circle" data-toggle="tooltip" data-container="body" data-placement="auto" data-html="true" title="<p><b><u>EDI Source</u></b></p><p>The EDI database to search:<br><ul><li><b>Released:</b> Data catalogs that have been released</li><li><b>Staged:</b> Data catalogs that have been uploaded but not officially released</li></ul></p>"></i></span>'
      + '</h4><span class="pullRight"><i class="narCaret fa fa-caret-down" data-toggle="collapse" data-target="#ediSourceDiv" aria-expanded="false"></i></span></div>'
    );

  d3.select("#ediSource")
    .append("div")
    .attr("class", "searchInput collapse")
    .attr("id", "ediSourceDiv")
    .append("select")
    .attr("class", "searchSel")
    .attr("id", "ediSourceSel")
    .html('<option>Released</option><option disabled>Staged</option>');


  //***Add EDI keyword
  sd.append("div")
    .attr("class", "searchCrit")
    .attr("id", "keywords")
    .html('<div class="searchTopDiv"><h4>Keywords'
      + '<span><i class="fa fa-info-circle" data-toggle="tooltip" data-container="body" data-placement="auto" data-html="true" title="<p><b><u>Keywords</u></b></p><p>Keywords associated with the data catalog\'s metadata.<br><br>For multiple keywords, the operator specifies whether all keywords must be present in a data catalog (And), or whether only one keyword must be present (Or) to qualify for the returned results.<br><br>For multiple keywords, please separate entries with a semicolon (;).</p>"></i></span>'
      + '</h4><span class="pullRight"><i class="narCaret fa fa-caret-down" data-toggle="collapse" data-target="#keywordsDiv" aria-expanded="false"></i></span></div>'
    );

  d3.select("#keywords")
    .append("div")
    .attr("class", "searchInput collapse")
    .attr("id", "keywordsDiv")
    .append("input")
    .attr("class", "searchSel")
    .attr("id", "keywordsSel");

  d3.select("#keywordsDiv")
    .append("div")
    .html('<label>Operator:<input type="radio" class="radioInput" name="keywordsOp" value="And" checked>And</input><input type="radio" class="radioInput" name="keywordsOp" value="Or">Or</input></label>');


  //***Add EDI author
  sd.append("div")
    .attr("class", "searchCrit")
    .attr("id", "authors")
    .html('<div class="searchTopDiv"><h4>Authors'
      + '<span><i class="fa fa-info-circle" data-toggle="tooltip" data-container="body" data-placement="auto" data-html="true" title="<p><b><u>Authors</u></b></p><p>Authors associated with the data catalog\'s metadata.<br><br>For multiple authors, the operator specifies whether all authors must be present in a data catalog (And), or whether only one author must be present (Or) to qualify for the returned results.<br><br>For multiple authors, please separate entries with a semicolon (;).</p>"></i></span>'
      + '</h4><span class="pullRight"><i class="narCaret fa fa-caret-down" data-toggle="collapse" data-target="#authorsDiv" aria-expanded="false"></i></span></div>'
    );

  d3.select("#authors")
    .append("div")
    .attr("class", "searchInput collapse")
    .attr("id", "authorsDiv")
    .append("input")
    .attr("class", "searchSel")
    .attr("id", "authorsSel");

  d3.select("#authorsDiv")
    .append("div")
    .html('<label>Operator:<input type="radio" class="radioInput" name="authorsOp" value="And" checked>And</input><input type="radio" class="radioInput" name="authorsOp" value="Or">Or</input></label>');


  //***Add Search criteria to second row 
  var sd = d3.select("#searchDiv2");

  //***Add EDI title
  sd.append("div")
    .attr("class", "searchCrit")
    .attr("id", "title")
    .html('<div class="searchTopDiv"><h4>Title'
      + '<span><i class="fa fa-info-circle" data-toggle="tooltip" data-container="body" data-placement="auto" data-html="true" title="<p><b><u>Title</u></b></p><p>Search by words present in the title of the data catalog.<br><br>Multiple words will be treated as a single search term.</p>"></i></span>'
      + '</h4><span class="pullRight"><i class="narCaret fa fa-caret-down" data-toggle="collapse" data-target="#titleDiv" aria-expanded="false"></i></span></div>'
    );

  d3.select("#title")
    .append("div")
    .attr("class", "searchInput collapse")
    .attr("id", "titleDiv")
    .append("input")
    .attr("class", "searchSel")
    .attr("id", "titleSel");

  d3.selectAll(".searchSel")
    .on("dblclick", function() { this.value = ""; })
    .on("keyup", function() { if(d3.event.keyCode == 13) { queryEDI(); } });

  //***Add data coverage years
  sd.append("div")
    .attr("class", "searchCrit")
    .attr("id", "years")
    .html('<div class="searchTopDiv"><h4>Data Coverage'
      + '<span><i class="fa fa-info-circle" data-toggle="tooltip" data-container="body" data-placement="auto" data-html="true" title="<p><b><u>Data Coverage</u></b></p><p>Specify from and to years to filter for datasets that contain data for some or all of that time span.<br><br>Specification of only a &#39;from&#39; year assumes an end year of the present year, while specification of only an &#39;end&#39; year assumes a from year of the earliest present in the data catalog.<br><br>Years should be entered as a 4-digit number (e.g. 1993).</p>"></i></span>'
      + '</h4><span class="pullRight"><i class="narCaret fa fa-caret-down" data-toggle="collapse" data-target="#yearsDiv" aria-expanded="false"></i></span></div>'
    );

  d3.select("#years")
    .append("div")
    .attr("class", "searchInput collapse")
    .attr("id", "yearsDiv")
    .html('From <input class="searchSel half" id="beginYearSel"></input>To <input class="searchSel half" id="endYearSel"></input>');

  d3.selectAll(".searchSel.half")
    .on("dblclick", function() { this.value = ""; })
    .on("keyup", function() { if(d3.event.keyCode == 13) { queryEDI(); } })
    .on("change", function() { yearCheck(this, 0); });


  //***Adjust table height upon expansion/collapse
  $('.searchInput').on('shown.bs.collapse', function(e) { e.stopPropagation(); adjustTableDiv(e.target.id); });
  $('.searchInput').on('hide.bs.collapse', function(e) { e.stopPropagation(); });
  $('.searchInput').on('hidden.bs.collapse', function(e) { e.stopPropagation(); adjustTableDiv(e.target.id); });

  d3.selectAll(".narCaret").on("click", function() { swapCaret(this); });


  //***Swap caret glyphs when clicked
  function swapCaret(tmpEl) {
    if(d3.select(tmpEl).classed("fa-caret-down") == true) {
      d3.select(tmpEl).classed("fa-caret-down", false);
      d3.select(tmpEl).classed("fa-caret-up", true);
    }
    else {
      d3.select(tmpEl).classed("fa-caret-up", false);
      d3.select(tmpEl).classed("fa-caret-down", true);
    }
  }

  function yearCheck(tmpEl, tmpBi) {
    var tmpVal = d3.select(tmpEl).property("value");
    var tmpId = d3.select(tmpEl).attr("id");

    if(tmpVal != "") {
      if(isNaN(tmpVal) == true || tmpVal.length !== 4) {
        alert("Please enter year as a 4-digit number");
        document.getElementById(tmpId).focus();
      }
  
      if(tmpBi == 1 && d3.select("#endYearSel").property("value") != "") {
        if(d3.select("#endYearSel").property("value") < tmpVal) {
          alert("Please ensure the 'From' year is less than or equal to the 'To' year");
          return "no";
        }
        else {
          return "yes";
        }
      }
    }
  } 

  //***Add search button
  d3.select("#searchContainer")
    .append("div")
    .attr("class", "searchButDiv")
      .append("button")
      .attr("class", "btn")
      .attr("id", "searchBut")
      .on("click", function() { queryEDI(); })
      .on("mouseenter", function() { d3.select(this).selectAll("*").style("color", "lightskyblue"); })
      .on("mouseleave", function() { d3.select(this).selectAll("*").style("color", ""); })
      .html('<i class="fa fa-search"></i><h4>Search</h4>');


  //******Add results container and table
  d3.select("body")
    .append("div")
    .attr("class", "containerDiv")
    .attr("id", "resultsContainer")
    .append("div")
    .attr("id", "tableDiv");

  d3.select("#resultsContainer")
    .append("h4")
    .attr("id", "noRecs")
    .text("No records match search criteria");

  //***Add records to show input
  d3.select("#resultsContainer")
    .append("div")
    .attr("id", "footerContainer")
    .append("div")
    .style("margin-left", "10px")
    .attr("class", "footerDiv")
    .attr("id", "recShow")
    .html('<div id="recShowText">Records to show</div><input id="recShowVal" class="searchSel" type="number" value="10" min="1" step="1"></input>');

  //***Add download option
  d3.select("#footerContainer")
    .append("div")
    .attr("class", "footerDiv")
    .attr("id", "download")
    .html('<div id="downloadText">Download to CSV</div><button id="downloadButton" class="btn btn-secondary" role="button" value="Download"><a id="downloadButtonA" href="#" download="Jornada_Basin_LTER_Data_Catalog.csv"><i class="fa fa-download"></i></a></button>');

  //***Add paging
  d3.select("#footerContainer")
    .append("div")
    .attr("class", "footerDiv")
    //.style("width", "44%")
    .attr("id", "paging")
    .html('<div id="pagingText">Showing <span id="begin"></span>-<span id="end"></span> of <span id="size"></span></div>'
      + '<button id="Prev" class="btn btn-secondary" role="button" value="Prev">Prev</button>'
      + '<button id="Next" class="btn btn-secondary" role="button" value="Next">Next</button>');
  



  //******Search function
  function queryEDI() {
    //***Check data coverage years are of correct order
    var ok = yearCheck(d3.select("#beginYearSel")._groups[0][0], 1);
    if(ok == "no") { return; };

    //***Start query with EDI Source
    if (document.getElementById("ediSourceSel").value == "Released") {
      var tmpQuery = 'https://pasta.lternet.edu/package/search/eml?defType=edismax&q=scope:knb-lter-jrn&rows=10000';
    }
    else {
      var tmpQuery = 'https://pasta-s.lternet.edu/package/search/eml?defType=edismax&q=scope:knb-lter-jrn&rows=10000';
    }

    //***Add in data fields to retrieve
      var tmpFields = ["abstract", "begindate", "doi", "enddate", "funding", "geographicdescription", "id", "methods", "packageid", "pubdate", "responsibleParties", "scope", "singledate", "site", "taxonomic", "title", "author", "coordinates", "keyword", "organization", "projectTitle", "relatedProjectTitle", "timescale"];
      tmpFields.forEach(function(field, i) {
        if (i == 0) {
          tmpQuery += "&fl=" + field;
        }
        else {
          tmpQuery += "," + field;
        }
      });

    //***Add keywords to query
    if(d3.select("#keywordsSel").property("value") !== "") {
      var tmpKeywords = splitStrip(d3.select("#keywordsSel").property("value"));
      tmpKeywords.forEach(function(key,i) {
        if(i == 0) {
          if(key.includes(" ") == true) {
            tmpQuery += '&fq=keyword:"' + key.replace(/ /g, "%20") + '"';
          }
          else {
            tmpQuery += '&fq=keyword:' + key;
          }
        }
        else {
          var tmpOp = document.querySelector('input[name="keywordsOp"]:checked').value;
          
          if(key.includes(" ") == true) {
            tmpQuery += '+' + tmpOp.toUpperCase() + '+keyword:"' + key.replace(/ /g, "%20") + '"';
          }
          else {
            tmpQuery += '+' + tmpOp.toUpperCase() + '+keyword:' + key;
          }
        }
      });
      d3.select("#keywordsSel").property("value", tmpKeywords.join("; "));
    }


    //***Add authors to query
    if(d3.select("#authorsSel").property("value") !== "") {
      var tmpAuthors = splitStrip(d3.select("#authorsSel").property("value"));
      tmpAuthors.forEach(function(key,i) {
        if(i == 0) {
          if(key.includes(" ") == true) {
            tmpQuery += '&fq=author:"' + key + '"';
          }
          else {
            tmpQuery += '&fq=author:' + key;
          }
        }
        else {
          var tmpOp = document.querySelector('input[name="authorsOp"]:checked').value;
          
          if(key.includes(" ") == true) {
            tmpQuery += '+' + tmpOp.toUpperCase() + '+author:"' + key + '"';
          }
          else {
            tmpQuery += '+' + tmpOp.toUpperCase() + '+author:' + key;
          }
        }
      });
      d3.select("#authorsSel").property("value", tmpAuthors.join("; "));
    }


    //***Add title to query
    var tmpTitle = d3.select("#titleSel").property("value");
    if(tmpTitle !== "") {
      if(tmpTitle.includes(" ") == true) {
        tmpQuery += '&fq=title:"' + tmpTitle + '"';
      }
      else {
        tmpQuery += '&fq=title:' + tmpTitle;
      }
    }

    //***Add years to query
    if(d3.select("#beginYearSel").property("value") !== "" && d3.select("#endYearSel").property("value") !== "") {
      var tmpBegin = d3.select("#beginYearSel").property("value");
      var tmpEnd = d3.select("#endYearSel").property("value");
      tmpQuery += '&fq=(begindate:%5B*+TO+' + tmpEnd + '-12-31T00:00:00Z/DAY%5D+AND+enddate:%5B' + tmpBegin + '-01-01T00:00:00Z/DAY+TO+NOW%5D)';
    }
    else if(d3.select("#beginYearSel").property("value") !== "") {
      var tmpBegin = d3.select("#beginYearSel").property("value");
      var tmpEnd = "NOW";
      tmpQuery += '&fq=(begindate:%5B*+TO+NOW%5D+AND+enddate:%5B' + tmpBegin + '-01-01T00:00:00Z/DAY+TO+NOW%5D)';
    }
    else if(d3.select("#endYearSel").property("value") !== "") {
      var tmpBegin = "*";
      var tmpEnd = d3.select("#endYearSel").property("value");
      tmpQuery += '&fq=(begindate:%5B*+TO+' + tmpEnd + '-12-31T00:00:00Z/DAY%5D+AND+enddate:%5B*+TO+NOW%5D)';
    }

console.log(tmpQuery);

    $.ajax({url: tmpQuery, dataType: "XML", success: function(tmpXML) {
      var x2js = new X2JS();
      var tmpJSON = x2js.xml2json(tmpXML);

      //***Remove old table to clear previous results and insert new table
      d3.select("#dc-table-graph").remove();

      //***Make array variable of returned records
      if(tmpJSON.resultset._numFound > 0) {
        if(tmpJSON.resultset._numFound == 1) {
          var tmpRecs = [tmpJSON.resultset.document];
        }
        else {
          var tmpRecs = tmpJSON.resultset.document;
        }

        //***Concatenate multi-value fields together and replace the initial object to allow for alphabetical ordering; Alter DOI to enable hyperlink to EDI
        tmpRecs.forEach(function(rec) {
          var mvFields = ["authors", "spatialCoverage", "keywords", "organizations", "projectTitle", "relatedProjectTitle", "timescales"];
          var mvSubField = ["author", "coordinates", "keyword", "organization", "projectTitle", "relatedProjectTitle", "timescale"];

          mvFields.forEach(function(tmpField, i) {
            var tmpRec = rec[tmpField];
            if(typeof tmpRec == "object") {
              for (var tmpVal in tmpRec) {
                if(Array.isArray(tmpRec[tmpVal]) == true) {
                  var tmpStr = tmpRec[tmpVal].join("; ");
                }
                else {
                  var tmpStr = tmpRec[tmpVal];
                }
              }
            }
            else {
              var tmpStr = tmpRec;
            }
            rec[tmpField] = tmpStr;
          });
/*
          var tmpAut = rec.authors;
          for (var aut in tmpAut) {
            if(Array.isArray(tmpAut[aut]) == true) {
              var tmpStr = tmpAut[aut].join("; ");
            }
            else {
              var tmpStr = tmpAut[aut];
            }
          }
          rec.authors = tmpStr;
*/
          rec.doi = rec.doi.replace("doi:", "https://doi.org/");
        });

        var dataTable;
        var dim = {};     // Stores all crossfilter dimensions
        var groups = {};  // Stores all crossfilter groups
        var cf;


        d3.select("#tableDiv")
          .insert("table", ":first-child")
          .attr("class", "table table-hover table-striped table-bordered")
          .attr("id", "dc-table-graph")
          .append("thead")
            .append("tr")
            .attr("class", "table-header");
      
        dataTable = new dc.dataTable("#dc-table-graph");

        //***Create table header
        if(d3.select(".table-header").selectAll("th")._groups[0].length == 0) {
          var tableHeader = d3.select(".table-header")
            .selectAll("th")
            .data([
              {label: "Title", field_name: "title", sort_state: "ascending"},
              {label: "Author", field_name: "authors", sort_state: "descending"},
              {label: "Begin Date", field_name: "begindate", sort_state: "descending"},
              {label: "End Date", field_name: "enddate", sort_state: "descending"},
              {label: "DOI", field_name: "doi", sort_state: "descending"},
            ])
            .enter()
            .append("th")
            .text(function(d) {  return d.label; })
            .classed("info", function(d) { return d.field_name == "title"; })
            .on("click", tableHeaderCallback);

          // Initialize sort state and sort icon on one of the header columns
          if(d3.select(".info").datum().sort_state == "ascending") { var tmpClass = "fa fa-sort-amount-asc"; } else { var tmpClass = "fa fa-sort-amount-desc"; }
          var tableSpans = tableHeader
            .append("span") // For Sort glyphicon on active table headers
            .classed(tmpClass , true)
            .style("visibility", function(d) { if(d.field_name == d3.select(".info").datum().field_name) { return "visible"; } else { return "hidden"; } });

          d3.select(".table-header").selectAll("th").on("mouseenter", function() { d3.select(this).select("span").style("color", "lightskyblue"); });
          d3.select(".table-header").selectAll("th").on("mouseleave", function() { d3.select(this).select("span").style("color", ""); });
        }
        
        var initField = d3.select(".info").datum().field_name;

        cf = crossfilter(tmpRecs); // Main crossfilter objects

        // Setup different dimensions for plots
        var tmpData = d3.select(".table-header").selectAll("th").data();
        tmpData.forEach(function(d) {
          var tmpField = d.field_name;
          dim[tmpField] = cf.dimension(function(data) {
            return data[tmpField];
          });
        });

        function tableHeaderCallback(d) {
          // Disable all highlighting and icons
          d3.selectAll("#dc-table-graph th") 
            .classed("info", false)
            .selectAll("span")
            .style("visibility", "hidden") // Hide glyphicon
          var activeSpan = d3.select(this) // Enable active highlight and icon for active column for sorting
            .classed("info", true)  // Set bootstrap "info" class on active header for highlight
            .select("span")
            .style("visibility", "visible");
          // Toggle sort order state to user desired state
          d.sort_state = d.sort_state === "ascending" ? "descending" : "ascending";
          var isAscendingOrder = d.sort_state === "ascending";
          dataTable
            .order(isAscendingOrder ? d3.ascending : d3.descending)
            .sortBy(function(datum) { return datum[d.field_name]; });
          // Reset glyph icon for all other headers and update this headers icon
          activeSpan.node().className = ''; // Remove all glyphicon classes
          // Toggle glyphicon based on ascending/descending sort_state
          activeSpan.classed(isAscendingOrder ? "fa fa-sort-amount-asc" : "fa fa-sort-amount-desc", true);
          updateTable();
          dataTable.redraw();
          addExtras();
          updateDownload();
        }


        // ##############################
        // Generate the dc.js dataTable
        // ##############################
        // Create generating functions for each columns
        var columnFunctions = [
          function(d) { return d.title; },
          function(d) { return d.authors; },
          function(d) { return d.begindate; },
          function(d) { return d.enddate; },
          function(d) { return d.doi; },
        ];
        // Pagination implementation inspired by:
        // https://github.com/dc-js/dc.js/blob/master/web/examples/table-pagination.html
        if(d3.select(".info").datum().sort_state == "ascending") { var tmpSort = d3.ascending; } else { var tmpSort = d3.descending }
        var tmpField = d3.select(".info").datum().field_name;
        dataTable 
          .dimension(dim[tmpField])
          //.section(function(d) { return "Dummy"}) // Must pass in. Ignored since .showSections(false)
          .size(Infinity)
          .columns(columnFunctions)
          .showSections(false)
          .sortBy(function(d){ return d[d3.select(".info").datum().field_name]; }) // Initially sort by last active column
          .order(tmpSort);

        // Data Table Pagination
        var tableOffset = 0;
        var tablePageSize = 0; //Scope the variable for the below function
        // updateTable calculates correct start and end indices for current page view
        // it slices and pulls appropriate date for current page from dataTable object
        // Finally, it updates the pagination button states depending on if more records
        // are available
        function updateTable() {
          tablePageSize = parseInt(d3.select("#recShowVal").property("value"));
          // Ensure Prev/Next bounds are correct, especially after filters applied to dc charts
          var totFilteredRecs = cf.groupAll().value();
          // Adjust values of start and end record numbers for edge cases
          tableOffset = tableOffset < 0 ? 0 : tableOffset; // In case of zero entries
          var end = tableOffset + tablePageSize > totFilteredRecs ? totFilteredRecs : tableOffset + tablePageSize;
          tableOffset = tableOffset >= totFilteredRecs ? Math.floor((totFilteredRecs - 1) / tablePageSize) * tablePageSize : tableOffset;
          // Grab data for current page from the dataTable object
          dataTable.beginSlice(tableOffset);
          dataTable.endSlice(tableOffset + tablePageSize);
          // Update Table paging buttons and footer text
          d3.select('span#begin')
            .text(end === 0 ? tableOffset : tableOffset + 1); // Correct for "Showing 1 of 0" bug
          d3.select('span#end')
            .text(end);
          d3.select('#Prev.btn')
            .attr('disabled', tableOffset - tablePageSize <= -tablePageSize ? 'true' : null);
          d3.select('#Next.btn')
            .attr('disabled', tableOffset + tablePageSize >= totFilteredRecs ? 'true' : null);
          d3.select('span#size').text(totFilteredRecs);
          dataTable.redraw();
        }

        // Callback function for clicking "Prev" page button
        function prevPage() {
          tableOffset -= tablePageSize;
          updateTable();
          addExtras();
        }
        // Callback function for clicking "Next" page button
        function nextPage() {
          tableOffset += tablePageSize;
          updateTable();
          addExtras();
        }

        //***Function to download data as a CSV file
        function updateDownload() {
          var tmpField = d3.select(".info").datum().field_name;
          if(d3.select(".info").datum().sort_state == "ascending") {
            var tmpCSV = d3.csvFormat(dim[tmpField].bottom(Infinity));
          }
          else {
            var tmpCSV = d3.csvFormat(dim[tmpField].top(Infinity));
          }
          d3.select("#downloadButtonA").attr("href", "data:attachment/csv," + encodeURIComponent(tmpCSV));
        }

        //***Function to add DOI link, abstract, methods, and geographic location to title column of table
        function addExtras() {
          $(function() {
            $('[data-toggle="tooltip"]').tooltip();
          });

          var doiArray = [];
          var tmpTD = d3.selectAll(".dc-table-column._4")._groups[0];
          tmpTD.forEach(function(cell) {
            doiArray.push(d3.select(cell).text());
          });

          dim.doi.filterFunction(function(d) { return doiArray.indexOf(d) > -1; });
          var filtDoi = dim.doi.top(Infinity);
          dim.doi.filterAll();

          var tmpTD = d3.selectAll(".dc-table-column._0")._groups[0];
          tmpTD.forEach(function(cell,i) {
            var tmpJ = -1;
            filtDoi.some(function(d,j) {
              if(d.doi == doiArray[i]) {
                tmpJ = j;
              }
              return tmpJ > -1;
            });

            var tmpText = d3.select(cell).text();
            var tmpStr = {};
            tmpStr.abstract = filtDoi[tmpJ].abstract.replace(/'/g, "&#39;").replace(/"/g,"&#34;");
            tmpStr.id = filtDoi[tmpJ].id.replace(/'/g, "&#39;").replace(/"/g,"&#34;");
            tmpStr.geographicdescription = filtDoi[tmpJ].geographicdescription.replace(/'/g, "&#39;").replace(/"/g,"&#34;");

            d3.select(cell).html('<a href="' + filtDoi[tmpJ].doi + '" target="_blank" title="Open in EDI">' + tmpText + '</a>'
              + '<span><i class="fa fa-font" data-toggle="tooltip" data-container="#resultsContainer" data-placement="auto" data-html="true" title="<p><b><u>Abstract</u></b></p><p>' + tmpStr.abstract + '</p>"></i></span>'
              + '<span><i class="fa fa-info-circle" data-toggle="tooltip" data-container="#resultsContainer" data-placement="auto" data-html="true" title="<p><b><u>ID</u></b></p><p>' + tmpStr.id + '</p>"></i></span>'
              + '<span><i class="fa fa-map-marker" data-toggle="tooltip" data-container="#resultsContainer" data-placement="auto" data-html="true" title="<p><b><u>Geographic Description</u></b></p><p>' + tmpStr.geographicdescription+ '</p>"></i></span>'
            );
          });
        }
 
        //***Assign functions to footer controls
        d3.select("#recShowVal").on("change", function() { updateTable(); addExtras(); });

        d3.select("#Prev").on("click", function() { prevPage(); });
        d3.select("#Next").on("click", function() { nextPage(); });
      
        updateTable();
        addExtras();
        updateDownload();
        d3.select("#noRecs").style("display", "none");
        d3.selectAll("#footerContainer,#tableDiv").style("display", "block");
      }
      else {
        d3.selectAll("#footerContainer,#tableDiv").style("display", "none");
        d3.select("#noRecs").style("display", "block");
      }
      adjustTableDiv("dummy");
    }});

    function splitStrip(str) {
      var tmpArray = str.replace("; ", ";").split(";");
      for (var i = tmpArray.length - 1; i >= 0; --i) {
        if(tmpArray[i] == "") {
          tmpArray.splice(i,1);
        }
      }
      return tmpArray;
    }
  }
  
  queryEDI();
  adjustTableDiv("dummy");
}
