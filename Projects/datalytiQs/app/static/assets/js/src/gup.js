const jsonGPGUrl = '/gender_paygap_json_data';
const canvasWidth = 900;
const canvasHeight = 550;
const margin = { top: 100, right: 150, bottom: 100, left: 150 };
const width = canvasWidth + margin.left - margin.right;
const height = canvasHeight + margin.top - margin.bottom;
const animation = { duration: 500, delay: 500, ease: d3.easeLinear };

const canvas = d3.select("#casestudies-d3-canvas")
    .append("svg")
    .attr("width", canvasWidth)
    .attr("height", canvasHeight)
    .append("g")
    .attr("viewBox", [0, 0, width, height])
    .attr("transform", "translate(100, 20)");

const xScale = d3.scaleLinear().range([margin.left, width - margin.right]);
const yScale = d3.scaleBand().range([0, height]);

const fetchGPGData = async () => {
    try {
        const response = await fetch(jsonGPGUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching GPG data:', error.message);
    }
};

const createAxes = () => {
    const xAxis = d3.axisTop(xScale).ticks(10).tickFormat(d => "£" + d);
    const yAxis = d3.axisLeft(yScale);

    canvas.append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(0,0)")
        .call(xAxis)
        .attr("color", "#1f135d")
        .attr("font-style", "bold");

    canvas.append("g")
        .attr("class", "y-axis")
        .attr('transform', `translate(${margin.left},0)`)
        .call(yAxis)
        .attr("color", "#1f135d")
        .attr("font-style", "bold");
};

const updateChart = (data) => {
    xScale.domain([0, d3.max(data, d => d.maleMedianHourlyRate)]);
    yScale.domain(data.map(d => d.jobCategories));

    createAxes();

    const persons = canvas.selectAll(".businessPerson")
        .data(data, d => d.jobCategories);

    persons.exit().remove();

    const newPersons = persons.enter()
        .append("g")
        .attr("class", "businessPerson");

    newPersons.append("image")
        .attr("x", -10)
        .attr("y", 0)
        .attr("xlink:href", d => d.maleImagePath)
        .merge(persons)
        .transition()
        .duration(animation.duration)
        .delay((d, i) => i * animation.delay)
        .ease(animation.ease)
        .attr('x', d => xScale(d['maleMedianHourlyRate']))
        .attr('y', d => yScale(d.jobCategories));

    newPersons.append("title")
        .attr("class", "tooltip")
        .merge(persons.select(".tooltip"))
        .text(d => `${d['jobCategories']} - £${d['maleMedianHourlyRate']}`);
};

const gender_pay_gap_main = async () => {
    const selectedWorkType = d3.select("#select-work-type").node().value;
    const gpg_data = await fetchGPGData();
    const filteredData = gpg_data.filter(d => d['workType'] === selectedWorkType);

    updateChart(filteredData);
};

// Attach an event listener to the dropdown box
d3.select("#select-work-type").on("change", gender_pay_gap_main);

// Initial chart rendering with the default selected value
gender_pay_gap_main();
